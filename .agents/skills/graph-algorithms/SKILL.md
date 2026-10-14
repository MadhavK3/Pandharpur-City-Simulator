---
name: graph-algorithms
description: >-
  Playbook for Design and Analysis of Algorithms (DAA), pathfinding (A*, Dijkstra,
  BFS, DFS), Minimum Spanning Tree (Kruskal), multi-stop traveling solvers, and step recording.
---

# DAA Graph Algorithms & Pathfinding Skill

This skill details graph representation, pathfinding algorithms, cost function mechanics, and step-recording architectures used for interactive algorithm visualization.

---

## 1. Graph Model Architecture

The pedestrian network is represented as an adjacency map built from static cartography in [pedestrianGraph.js](file:///d:/proj/Pandharpur-City-Simulator/src/data/pedestrianGraph.js).

### Graph Builder Pattern (`buildPandharpurGraph`)
The graph builder dynamically computes edge weights based on:
1. **Physical distance**: Straight-line or road segment distance in meters.
2. **Barricades (`closedEdges`)**: Closed edges are excluded from neighbor traversal.
3. **Crowd congestion factor**: Edge traversal cost degraded by pedestrian density:
   ```javascript
   effectiveCrowdFactor = 1.0 + (edge.crowdFactor - 1.0) * crowdMultiplier;
   // Travel time in seconds:
   calculatedWeight = Math.round((baseDistance / 1.2) * effectiveCrowdFactor);
   ```
4. **Scenic weighting**: Discounter bonus (0.7) for holy ghat steps and pradakshina routes.

---

## 2. Step-by-Step Recording Contract

For the playback scrubber to inspect algorithm state at any frame, every algorithm runner must return a standard payload:

```javascript
return {
  path: finalPathArray,          // Ordered node IDs: ['A', 'B', 'C']
  totalCost: computedCost,       // Number or null if unreachable
  visitedOrder: visitedNodeList, // Order nodes were finalized
  totalSteps: steps.length,
  steps: stepsArray,
  pseudocode: PSEUDOCODE_LINES,
  metadata: METADATA_OBJECT
};
```

### Standard Step Object Structure
Each entry in `steps` captures instantaneous snapshot state:
```javascript
{
  stepIndex: 12,
  line: 9,                           // 1-indexed pseudocode line pointer
  currentNode: 'MAHADWAR_NODE',
  examiningNeighbor: 'NAMDEV_STEPS',
  currentEdge: 'EDGE_MAHADWAR_NAMDEV',
  targetNode: 'VITTHAL_ENTRANCE',
  description: 'Evaluating neighbor NAMDEV_STEPS: tentative_g = 120m.',
  visited: ['RAILWAY_STATION', 'ST_STAND_NODE'],
  distances: { 'RAILWAY_STATION': 0, 'MAHADWAR_NODE': 95 },
  frontier: ['NAMDEV_STEPS', 'PRADAKSHINA_NORTH'],
  pq: [{ nodeId: 'NAMDEV_STEPS', dist: 140, g: 120, h: 20 }],
  activeSubpath: ['RAILWAY_STATION', 'MAHADWAR_NODE']
}
```

---

## 3. Heuristic Design for A*
A* requires an **admissible heuristic** (it must never overestimate the true cost to reach the goal):
```javascript
export function getEuclideanDistance(nodeA, nodeB) {
  if (!nodeA || !nodeB) return 0;
  const dx = (nodeA.x - nodeB.x);
  const dy = (nodeA.y - nodeB.y);
  const dz = (nodeA.z - nodeB.z);
  // Euclidean straight line lower bound in meters
  return Math.sqrt(dx * dx + dy * dy + dz * dz) * 1.2;
}
```

---

## 4. Vitest Unit Verification
Verify algorithm implementations headlessly:
```powershell
npx vitest run src/test/astar.test.js
npx vitest run src/test/dijkstra.test.js
npx vitest run src/test/kruskal.test.js
```
All tests verify equivalence of optimal paths between Dijkstra and A*, MST edge counts for Kruskal, and cycle handling in DFS/BFS.

