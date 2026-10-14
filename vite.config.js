import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import fs from 'fs';

function blenderModelHmrPlugin() {
  return {
    name: 'blender-model-hmr',
    configureServer(server) {
      const modelsDir = path.resolve(process.cwd(), 'public/models');
      if (!fs.existsSync(modelsDir)) {
        fs.mkdirSync(modelsDir, { recursive: true });
      }

      function updateManifest() {
        try {
          const files = fs.readdirSync(modelsDir).filter(f => f.endsWith('.glb'));
          const manifestPath = path.join(modelsDir, 'manifest.json');
          fs.writeFileSync(
            manifestPath,
            JSON.stringify({ models: files, updatedAt: Date.now() }, null, 2)
          );
        } catch (e) {
          // Ignore transient read errors
        }
      }

      updateManifest();
      server.watcher.add(modelsDir);

      const notifyChange = (changedPath) => {
        if (!changedPath.endsWith('.glb')) return;
        updateManifest();
        const modelName = path.basename(changedPath);
        console.log(`[Vite Blender Sync] Model updated: ${modelName}`);
        server.ws.send({
          type: 'custom',
          event: 'blender:model-updated',
          data: {
            modelName,
            timestamp: Date.now()
          }
        });
      };

      server.watcher.on('change', notifyChange);
      server.watcher.on('add', notifyChange);
    }
  };
}

export default defineConfig({
  plugins: [react(), blenderModelHmrPlugin()],
  server: {
    port: 5174,
    open: false
  },
  test: {
    globals: true,
    environment: 'node'
  }
});
