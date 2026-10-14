---
name: simulation-state
description: >-
  State management patterns with Zustand 5, drawer mutual exclusivity, time-travel
  playback scrubbing, dynamic barricades, and mission validation.
---

# Simulation State Management Skill (Zustand 5)

This skill covers the application state patterns, UI drawer exclusivity, playback timeline controller, and mission progress verification in `simulationStore.js`.

---

## 1. Store Architecture Principles

The store [simulationStore.js](file:///d:/proj/Pandharpur-City-Simulator/src/store/simulationStore.js) is the single source of truth for:
- Routing configurations (`selectedAlgorithm`, `startNode`, `endNode`, `multiStops`, `costMetric`)
- Graph mutations (`closedEdges`, `crowdMultiplier`)
- Playback timeline (`activeStepIndex`, `isPlaying`, `playbackSpeed`, `isPlaybackMinimized`)
- 3D camera & visuals (`cameraMode`, `focusedCoordinates`, `selectedLandmarkId`, `timeOfDay`)
- UI panels (`isSidebarOpen`, `isAlgorithmLabOpen`, `isMissionPanelOpen`, `isNetworkEditorOpen`)

---

## 2. Right Drawer Mutual Exclusivity Pattern

To prevent visual collisions between competing right drawers, open actions must automatically dismiss other active drawers:

```javascript
setAlgorithmLabOpen: (open) => set({
  isAlgorithmLabOpen: open,
  ...(open ? { selectedLandmarkId: null, isMissionPanelOpen: false, isNetworkEditorOpen: false } : {})
}),

setMissionPanelOpen: (open) => set({
  isMissionPanelOpen: open,
  ...(open ? { selectedLandmarkId: null, isAlgorithmLabOpen: false, isNetworkEditorOpen: false } : {})
}),

selectLandmark: (landmarkId) => {
  const landmark = getLandmarkById(landmarkId);
  if (landmark) {
    set({
      selectedLandmarkId: landmarkId,
      focusedCoordinates: landmark.coordinates,
      cameraMode: 'landmark',
      isAlgorithmLabOpen: false,
      isMissionPanelOpen: false,
      isNetworkEditorOpen: false
    });
  } else {
    set({ selectedLandmarkId: null });
  }
}
```

---

## 3. Timeline Playback & Clamping

Playback step index must always be clamped to the boundaries of `routeResult.steps`:

```javascript
setStepIndex: (index) => {
  const maxSteps = get().routeResult?.steps?.length || 1;
  const clamped = Math.max(0, Math.min(index, maxSteps - 1));
  set({ activeStepIndex: clamped });
},

stepForward: () => {
  const { activeStepIndex, routeResult } = get();
  if (routeResult?.steps && activeStepIndex < routeResult.steps.length - 1) {
    set({ activeStepIndex: activeStepIndex + 1 });
  }
}
```

---

## 4. Minimizable Floating Dock Pattern

The playback dock operates as a centered floating pill:
- Expanded mode: Scrubber slider, step counter, play/pause, step forward/backward buttons, speed selector.
- Minimized mode: Ultra-compact pill showing active algorithm name and step ratio (`Step 14/28`) with an expand arrow, keeping the lower 3D viewport clean.

