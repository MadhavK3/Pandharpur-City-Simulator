# Architectural Decision Records (ADRs)

This document tracks fundamental architectural decisions, historical bug diagnoses, and their resolutions.

---

## ADR-001: Drei `<Html>` Z-Index Stacking Isolation

### Context
When rendering 3D landmark pins and graph badges in the scene, 3D text and pins painted directly on top of 2D HTML sidebars, modals, and the top navigation bar.

### Root Cause
`@react-three/drei`'s `<Html>` component assigns an internal CSS `z-index` default range of `[16777271, 0]`. This high value bleeds past normal UI stacking contexts.

### Decision
All `<Html>` components rendered inside 3D subtrees (e.g., `TempleLandmarks.jsx`, `GraphOverlay3D.jsx`) must explicitly declare:
```jsx
<Html position={pos} zIndexRange={[0, 0]}>
```
This restricts 3D HTML annotations to the WebGL canvas stacking layer, preventing them from bleeding over fixed HTML UI panels.

---

## ADR-002: OrbitControls vs `useFrame` Lerp Decoupling

### Context
Users reported being unable to freely zoom in, zoom out, or pan the camera; the camera repeatedly snapped back to a locked position.

### Root Cause
In `CameraController.jsx`, `useFrame` was executing `camera.position.lerp(targetCamPos.current, delta * 3.0)` on every single animation frame. This continuously overwrote OrbitControls distance changes, creating rubber-banding and locking user zoom.

### Decision
1. Automated camera moves (clicking a landmark or switching view modes) use an explicit `isTransitioning` boolean flag.
2. The lerp loop only runs while `isTransitioning.current === true`.
3. The flag is set to `false` automatically when the camera reaches within 1.0 unit of the target.
4. OrbitControls' `onStart` event immediately sets `isTransitioning.current = false`, granting total control to the user the instant they interact with the canvas.
5. Expanded OrbitControls boundaries to `minDistance={2}` and `maxDistance={700}` with `screenSpacePanning={true}`.

---

## ADR-003: UI Right Drawer Mutual Exclusivity

### Context
Opening multiple panels (Landmark Panel, Algorithm Lab, Mission Panel, Network Editor) caused drawers to stack or overlap irregularly on the right side of the screen.

### Root Cause
Independent boolean flags were toggled without dismissing sister panels.

### Decision
In `simulationStore.js`, actions that open any right drawer (`setAlgorithmLabOpen`, `setMissionPanelOpen`, `setNetworkEditorOpen`, `selectLandmark`) automatically clear the other drawer states. Only one right-side drawer can be visible at any time.

---

## ADR-004: Floating Minimizable Playback Dock

### Context
A persistent full-width playback bar obstructed the lower third of the 3D city scene and clashed with open sidebars.

### Decision
Converted playback controls into a centered, floating pill dock.
- Added `isPlaybackMinimized` state toggle.
- When minimized, collapses to a compact pill showing current algorithm and step progress (`Step 12/34`).
- Added dynamic left-offset when the left sidebar opens so the dock remains optically centered in the visible canvas area.

