# Blender Live Sync Pipeline for Pandharpur Darshan 3D

This pipeline provides two-way integration between Blender 5.2+ and the Pandharpur 3D WebGL simulator. Any changes saved in Blender are immediately exported to GLTF binary (.glb) and reflected in real-time in the browser.

---

## 1. Directory Structure

- `blender/`: Contains source Blender (.blend) project files.
  - `vitthal_mandir.blend`: Full 3D model of Shree Vitthal-Rukmini Mandir with walls, Sabha Mandap, Shikhara tower, and Kalasha finials.
  - `custom_scene.blend`: Sandbox for custom props, buildings, or river ghat details.
  - `auto_export_on_save.py`: Standalone Python script that hooks into Blender's save event.
- `public/models/`: Serves compiled GLTF/GLB models to the Three.js web application.
  - `vitthal_mandir.glb`: Active model for Vitthal Mandir.
  - `custom_scene.glb`: Active model for extra custom city environment.
  - `manifest.json`: List of available models kept in sync by Vite.
- `scripts/`:
  - `watch_blender.js`: Node.js file watcher for headless background export.
  - `export_blend.py`: Headless CLI export script for Blender.

---

## 2. Quick Start: Modeling in Blender

### Step 1: Open the Blend File
Open `blender/vitthal_mandir.blend` in Blender 5.2.

### Step 2: Edit Your 3D Model
Modify vertices, sculpt details, add pillars, or adjust materials in the Shading workspace.

### Step 3: Press Ctrl + S
Saving the file in Blender triggers the embedded `save_post` handler. It automatically exports `public/models/vitthal_mandir.glb`.

### Step 4: Instant Browser Reflection
Vite detects the updated .glb file via WebSocket HMR, invalidates the Drei Three.js model cache, and updates the 3D model on screen immediately without a full page reload or loss of camera orientation.

---

## 3. Alternative: Background File Watcher

If you create new `.blend` files or prefer not to run Python scripts inside Blender, run the background watcher in PowerShell:

```powershell
npm run blender:watch
```

The watcher listens for any save events in the `blender/` folder and invokes Blender in headless background mode to export the corresponding `.glb` into `public/models/`.

To batch-export all `.blend` files at once:

```powershell
npm run blender:export
```

---

## 4. Coordinate System & Scale Conventions

- **Units**: Metric, 1 Blender Unit = 1 Meter in Three.js.
- **Temple Plinth Center**: Coordinates `[0, 0, 0]` in Blender correspond exactly to the center of the temple jagati plinth in the simulator.
- **Axes Alignment**:
  - Blender X = Simulator X (East-West axis: +X is East toward Chandrabhaga River, -X is West toward Station).
  - Blender Y = Simulator -Z (North-South axis: +Y is North, -Y is South).
  - Blender Z = Simulator +Y (Vertical elevation above ground).
- **Export Standards**: GLTF binary (.glb), Y-Up conversion enabled, modifiers applied, materials and normals preserved.

