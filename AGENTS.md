# Pandharpur City Simulator (Pandharpur Darshan 3D) - Agent Guidelines

## 1. Project Overview
This repository couples a 3D cultural simulation of the sacred pilgrimage city of Pandharpur with an interactive Design and Analysis of Algorithms (DAA) visualizer and learning lab.

- **Stack**: React 19, Three.js 0.186, React Three Fiber (R3F) v9, Drei v10, Zustand 5, Framer Motion 12, Vite 7, Vitest 5.
- **Engine Core**:
  - 3D rendering pipeline: [CityCanvas.jsx](file:///d:/proj/Pandharpur-City-Simulator/src/components/city/CityCanvas.jsx)
  - Graph model and mutations: [graphModel.js](file:///d:/proj/Pandharpur-City-Simulator/src/engine/graph/graphModel.js)
  - Algorithm registry: [algorithmRegistry.js](file:///d:/proj/Pandharpur-City-Simulator/src/engine/algorithms/algorithmRegistry.js)
  - Central state store: [simulationStore.js](file:///d:/proj/Pandharpur-City-Simulator/src/store/simulationStore.js)

---

## 2. Mandatory Rules and Runtime Invariants

### 2.1. Writing Style and Formatting
- **Zero Emojis**: Strictly never use emojis anywhere (code comments, UI text, docstrings, markdown headings, git commits, or responses).
- **Standard Hyphens Only**: Strictly never use em-dashes or en-dashes. Use standard hyphens (-), colons, commas, or parentheses.
- **PowerShell Execution**: Primary shell is Windows PowerShell. Avoid Bash-specific syntax (`export`, `source`, `rm -rf`, `&&`).
- **Human-Written Simplicity**: Write clean, practical code without bloated abstractions, artificial simulation layers, or redundant commentary.

### 2.2. WebGL and 3D Canvas Layering
- **Drei `<Html>` Isolation**: Drei `<Html>` components must always specify `zIndexRange={[0, 0]}` or render through an isolated portal. Never allow 3D canvas labels to exceed `z-index: 0`, which breaks 2D HTML sidebars and modals.
- **OrbitControls Decoupling**: Never continuously override camera position or target via per-frame `useFrame` lerping when OrbitControls is active. Automated camera moves must use one-shot transitions and terminate immediately upon arrival or when user drag/zoom interaction starts (`onStart`).
- **Ground Plane Restraint**: OrbitControls must clamp `maxPolarAngle={Math.PI / 2 - 0.02}` to prevent the camera from piercing beneath the ground plane.

### 2.3. UI Panel Exclusivity
- Right-side panels (Landmark Details, Algorithm Lab, Mission Panel, Network Editor) must remain mutually exclusive in [simulationStore.js](file:///d:/proj/Pandharpur-City-Simulator/src/store/simulationStore.js). Opening one panel must close all other right drawers.
- The default initial state must start clean with sidebars collapsed (`isSidebarOpen: false`, `selectedLandmarkId: null`).

### 2.4. Procedural Urban Layout and Building Geometry
- **Road Clearance Footprint**: Street setbacks must account for total road footprint, calculated as:
  `Footprint = RoadWidth + (CurbWidth * 2) + (SidewalkWidth * 2) + MinimumPedestrianSetback`
  For an 8.8m road corridor, building facades must maintain a minimum setback of at least 3m to 4m beyond the curb edge.
- **Wall-Aligned Roof Geometries**: Never use 4-sided `coneGeometry` for rectangular building roofs. A 4-sided cone rotates the base 45 degrees relative to building walls, protruding diagonal corners into roads and neighboring structures. Use custom rectangular hip roofs (`BufferGeometry`) with eaves strictly clamped to <= 0.4m.
- **Clearance Around Plazas and Sanctums**: Major landmark sanctums, courtyards, and chowk circles must remain completely free of procedural secondary structures and street clutter.

### 2.5. Header and Navigation Containment
- **Zero-Wrap Brand Lockups**: Top headers with fixed height must enforce `white-space: nowrap` and `flex-shrink: 0` on brand titles and subtitles to prevent multi-line vertical wrapping and border clipping.
- **Header Overflow Containment**: Top navigation containers must specify `overflow-x: auto` and `overflow-y: hidden` with compact button styles (`.topbar-btn`) to ensure controls remain accessible across standard and narrow viewports without vertical distortion.

---

## 3. Skills and Documentation References
- Specialized Skills:
  - React Three Fiber and Three.js: [.agents/skills/react-three-fiber/SKILL.md](file:///d:/proj/Pandharpur-City-Simulator/.agents/skills/react-three-fiber/SKILL.md)
  - DAA Graph Algorithms: [.agents/skills/graph-algorithms/SKILL.md](file:///d:/proj/Pandharpur-City-Simulator/.agents/skills/graph-algorithms/SKILL.md)
  - Simulation State & UI: [.agents/skills/simulation-state/SKILL.md](file:///d:/proj/Pandharpur-City-Simulator/.agents/skills/simulation-state/SKILL.md)
  - Three.js Animation: [.agents/skills/threejs-animation/SKILL.md](file:///d:/proj/Pandharpur-City-Simulator/.agents/skills/threejs-animation/SKILL.md)
  - Three.js Fundamentals: [.agents/skills/threejs-fundamentals/SKILL.md](file:///d:/proj/Pandharpur-City-Simulator/.agents/skills/threejs-fundamentals/SKILL.md)
  - Three.js Geometry: [.agents/skills/threejs-geometry/SKILL.md](file:///d:/proj/Pandharpur-City-Simulator/.agents/skills/threejs-geometry/SKILL.md)
  - Three.js Interaction: [.agents/skills/threejs-interaction/SKILL.md](file:///d:/proj/Pandharpur-City-Simulator/.agents/skills/threejs-interaction/SKILL.md)
  - Three.js Lighting: [.agents/skills/threejs-lighting/SKILL.md](file:///d:/proj/Pandharpur-City-Simulator/.agents/skills/threejs-lighting/SKILL.md)
  - Three.js Loaders: [.agents/skills/threejs-loaders/SKILL.md](file:///d:/proj/Pandharpur-City-Simulator/.agents/skills/threejs-loaders/SKILL.md)
  - Three.js Materials: [.agents/skills/threejs-materials/SKILL.md](file:///d:/proj/Pandharpur-City-Simulator/.agents/skills/threejs-materials/SKILL.md)
  - Three.js Postprocessing: [.agents/skills/threejs-postprocessing/SKILL.md](file:///d:/proj/Pandharpur-City-Simulator/.agents/skills/threejs-postprocessing/SKILL.md)
  - Three.js Shaders: [.agents/skills/threejs-shaders/SKILL.md](file:///d:/proj/Pandharpur-City-Simulator/.agents/skills/threejs-shaders/SKILL.md)
  - Three.js Textures: [.agents/skills/threejs-textures/SKILL.md](file:///d:/proj/Pandharpur-City-Simulator/.agents/skills/threejs-textures/SKILL.md)
- Project Knowledge Base (`brain/`):
  - Architecture and coordinates: [brain/architecture.md](file:///d:/proj/Pandharpur-City-Simulator/brain/architecture.md)
  - Cultural cartography: [brain/domain_knowledge.md](file:///d:/proj/Pandharpur-City-Simulator/brain/domain_knowledge.md)
  - Algorithm specs and complexities: [brain/algorithms_reference.md](file:///d:/proj/Pandharpur-City-Simulator/brain/algorithms_reference.md)
  - Architectural Decision Records: [brain/decisions.md](file:///d:/proj/Pandharpur-City-Simulator/brain/decisions.md)
  - Technology stack details: [brain/tech_stack.md](file:///d:/proj/Pandharpur-City-Simulator/brain/tech_stack.md)

---

## 4. Verification Workflow
Always run automated tests and build verification before concluding any modification:
```powershell
npx vitest run
npm run build
```

