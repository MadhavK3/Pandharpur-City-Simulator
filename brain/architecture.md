# System Architecture: Pandharpur City Simulator

## 1. High-Level Architecture Overview

The system is organized into three primary layers:
1. **Presentation & 3D WebGL Layer**: Three.js, React Three Fiber (R3F), Drei, and Framer Motion.
2. **State & Orchestration Layer**: Centralized Zustand store managing UI views, algorithm parameters, and playback state.
3. **DAA Algorithmic Engine**: Graph modeling, cost functions, edge barricade mutators, and step-recording pathfinding runners.

```
+-------------------------------------------------------------------------+
|                              React 19 App                               |
+-----------------------------------+-------------------------------------+
|         2D UI Overlays            |          3D WebGL Canvas            |
| - TopNavigation (Brand & Toggles) | - LightingController (Sun/Sky/Aarti)|
| - Sidebar (Algorithms & Settings) | - CityTerrain (Ground & Elevation)  |
| - PlaybackControls (Floating Dock)| - RiverEnvironment (Chandrabhaga)   |
| - LandmarkPanel (Drawer)          | - TempleLandmarks (Vitthal Mandir)  |
| - AlgorithmLab (Step Inspector)   | - RoadNetwork3D (Asphalt & Paving)  |
| - MissionPanel (Scenarios)        | - GraphOverlay3D (Nodes & Edges)    |
| - NetworkEditor (Barricades)      | - RouteAnimation3D (Active Path)    |
| - WelcomeScreen (Modal)           | - CameraController (Orbit/Focus)    |
+-----------------------------------+-------------------------------------+
                                    ^
                                    |
+-----------------------------------+-------------------------------------+
|                       Zustand State Store                               |
|                  (src/store/simulationStore.js)                         |
+-----------------------------------+-------------------------------------+
                                    ^
                                    |
+-----------------------------------+-------------------------------------+
|                      DAA Graph & Algorithm Engine                       |
| - graphModel.js (Adjacency list, dynamic crowd weights, cost metrics)  |
| - astar.js / dijkstra.js / bfs.js / dfs.js / kruskal.js / multiStop.js   |
| - pedestrianGraph.js (Nodes, coordinates, road types, crowd factors)    |
+-------------------------------------------------------------------------+
```

---

## 2. 3D Coordinate Reference Frame

The 3D world is anchored on real-world Pandharpur spatial relationships:
- **Origin `[0, 0, 0]`**: The sanctum and central courtyard of **Shri Vitthal Rukmini Mandir**.
- **X-Axis (East-West)**:
  - Positive X (`+X`): Towards the **Chandrabhaga River** and Ghats (`X ≈ +60` to `+140`).
  - Negative X (`-X`): Towards the western town districts, Railway Station, and ST Stand (`X ≈ -120` to `-260`).
- **Y-Axis (Elevation)**:
  - `Y = 0`: Base city street level.
  - `Y = -1.0` to `-3.0`: Riverbed and lower water ghat steps.
  - `Y = +15` to `+28`: Temple shikhara spires and tower peaks.
- **Z-Axis (North-South)**:
  - Positive Z (`+Z`): Southern ghats, Mahadwar bazaar corridor, and Vishnupad (`Z ≈ +20` to `+200`).
  - Negative Z (`-Z`): Northern residential alleys, Bhakta Niwas, and VIP entry.

---

## 3. UI Layering Hierarchy & Z-Index Contract

To eliminate layering collisions between WebGL canvas elements and HTML overlays:
- **Level 0 (Background)**: `<Canvas>` WebGL viewport (`z-index: 0`).
- **Level 1 (3D HTML Pins)**: Drei `<Html>` pins with `zIndexRange={[0, 0]}`.
- **Level 10 (Floating Controls)**: Quick access tabs, floating playback dock (`z-index: 20` to `30`).
- **Level 20 (Navigation & Drawers)**: Top navigation bar, left sidebar, right panels (`z-index: 40` to `50`).
- **Level 30 (Modal Dialogs)**: Welcome screen modal backdrop and dialog (`z-index: 100`).

