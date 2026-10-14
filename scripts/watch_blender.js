import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const BLENDER_DIR = path.join(ROOT_DIR, 'blender');
const MODELS_DIR = path.join(ROOT_DIR, 'public', 'models');
const EXPORT_SCRIPT = path.join(ROOT_DIR, 'scripts', 'export_blend.py');

function findBlenderExe() {
  if (process.env.BLENDER_PATH && fs.existsSync(process.env.BLENDER_PATH)) {
    return process.env.BLENDER_PATH;
  }

  const standardBases = [
    'C:\\Program Files\\Blender Foundation',
    'C:\\Program Files (x86)\\Blender Foundation'
  ];

  for (const base of standardBases) {
    if (fs.existsSync(base)) {
      const dirs = fs.readdirSync(base).filter(d => d.toLowerCase().startsWith('blender'));
      // Sort to prefer highest version
      dirs.sort().reverse();
      for (const dir of dirs) {
        const exePath = path.join(base, dir, 'blender.exe');
        if (fs.existsSync(exePath)) {
          return exePath;
        }
      }
    }
  }

  return 'blender';
}

const blenderExe = findBlenderExe();
console.log(`[Blender Watcher] Using Blender executable: ${blenderExe}`);

if (!fs.existsSync(BLENDER_DIR)) {
  fs.mkdirSync(BLENDER_DIR, { recursive: true });
}
if (!fs.existsSync(MODELS_DIR)) {
  fs.mkdirSync(MODELS_DIR, { recursive: true });
}

const debounceTimers = new Map();

function exportBlendFile(filePath) {
  const fileName = path.basename(filePath);
  if (!fileName.endsWith('.blend') || fileName.startsWith('.')) return;

  console.log(`[Blender Watcher] Change detected: ${fileName}. Exporting to GLB...`);

  const proc = spawn(blenderExe, ['-b', filePath, '--python', EXPORT_SCRIPT], {
    cwd: ROOT_DIR,
    stdio: 'inherit'
  });

  proc.on('close', (code) => {
    if (code === 0) {
      const modelName = fileName.replace(/\.blend$/, '.glb');
      console.log(`[Blender Watcher] Successfully updated public/models/${modelName}`);
    } else {
      console.error(`[Blender Watcher] Export failed with exit code ${code}`);
    }
  });
}

console.log(`[Blender Watcher] Watching ${BLENDER_DIR} for .blend file saves...`);

// Initial scan
try {
  const files = fs.readdirSync(BLENDER_DIR);
  for (const file of files) {
    if (file.endsWith('.blend')) {
      const glbName = file.replace(/\.blend$/, '.glb');
      const glbPath = path.join(MODELS_DIR, glbName);
      const blendPath = path.join(BLENDER_DIR, file);
      if (!fs.existsSync(glbPath) || fs.statSync(blendPath).mtimeMs > fs.statSync(glbPath).mtimeMs) {
        exportBlendFile(blendPath);
      }
    }
  }
} catch (err) {
  console.error('[Blender Watcher] Initial scan error:', err);
}

fs.watch(BLENDER_DIR, (eventType, filename) => {
  if (!filename || !filename.endsWith('.blend')) return;
  // Ignore temp files created by Blender on save
  if (filename.endsWith('.blend1') || filename.endsWith('.blend@') || filename.startsWith('.')) return;

  const fullPath = path.join(BLENDER_DIR, filename);
  if (!fs.existsSync(fullPath)) return;

  if (debounceTimers.has(fullPath)) {
    clearTimeout(debounceTimers.get(fullPath));
  }

  // Debounce by 400ms to allow Blender to finish atomic disk writes
  debounceTimers.set(
    fullPath,
    setTimeout(() => {
      debounceTimers.delete(fullPath);
      exportBlendFile(fullPath);
    }, 400)
  );
});

