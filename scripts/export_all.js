import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
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
if (!fs.existsSync(MODELS_DIR)) {
  fs.mkdirSync(MODELS_DIR, { recursive: true });
}

if (!fs.existsSync(BLENDER_DIR)) {
  console.log('[Blender Export] No blender directory found.');
  process.exit(0);
}

const files = fs.readdirSync(BLENDER_DIR).filter(f => f.endsWith('.blend'));
if (files.length === 0) {
  console.log('[Blender Export] No .blend files found in blender/ directory.');
  process.exit(0);
}

for (const file of files) {
  const blendPath = path.join(BLENDER_DIR, file);
  console.log(`[Blender Export] Processing ${file}...`);
  const res = spawnSync(blenderExe, ['-b', blendPath, '--python', EXPORT_SCRIPT], {
    cwd: ROOT_DIR,
    stdio: 'inherit'
  });
  if (res.status === 0) {
    console.log(`[Blender Export] Completed ${file}`);
  } else {
    console.error(`[Blender Export] Error processing ${file}`);
  }
}

