# Pandharpur City Simulator - Workspace Rules

## 1. Zero-Tolerance Style Invariants
- Strictly no emojis in code, documentation, UI labels, or messages.
- Strictly no em-dashes (—) or en-dashes (–). Use standard hyphens (-).
- Format all terminal commands for Windows PowerShell.

## 2. 3D WebGL Scene & Camera Rules
- Drei `<Html>` components rendered in 3D scene files (such as `TempleLandmarks.jsx`, `GraphOverlay3D.jsx`) must define `zIndexRange={[0, 0]}`. Without this, Drei applies a default z-index exceeding 16,000,000, which paints canvas labels over fixed 2D HTML sidebars and modals.
- OrbitControls camera controls must never fight continuous lerp updates. Any transition code in `CameraController.jsx` must set a boolean flag `isTransitioning = false` on arrival or when the user begins dragging (`onStart`).
- Minimum zoom distance is 2; maximum zoom distance is 700; `screenSpacePanning` must be enabled.

## 3. UI State Management Rules
- Maintain single-responsibility right drawers in `simulationStore.js`.
- Opening `isAlgorithmLabOpen`, `isMissionPanelOpen`, `isNetworkEditorOpen`, or selecting a landmark via `selectLandmark` must automatically dismiss competing right drawers.
- The playback dock must support minimization (`isPlaybackMinimized`) to prevent obstructing lower scene views.

## 4. Urban Geometry and Setbacks
- Never use 4-sided `coneGeometry` for rectangular roofs; use rectangular hip roofs aligned to building wall coordinates with eave overhangs <= 0.4m.
- Maintain minimum setbacks equal to road width plus curbs, sidewalks, and a 3m pedestrian clearance corridor.
- Keep landmark courtyards, circular chowks, and temple sanctums clear of procedural filler meshes.

## 5. Header and Navigation Layout
- Fixed-height topbars must set `overflow-x: auto` and `overflow-y: hidden`.
- Header brand titles and subtitles must define `white-space: nowrap` and `flex-shrink: 0` to prevent vertical text clipping.

## 6. Verification
- Verify all algorithm tests with `npx vitest run`.
- Verify production bundles with `npm run build`.

