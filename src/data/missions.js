/**
 * 6 Gamified Pilgrimage & DAA Missions for Pandharpur Darshan 3D
 * Each mission has narrative context, algorithm requirement, start/destination,
 * auto-validation condition, and reward badge.
 */

export const MISSIONS = [
  {
    id: 'MISSION_1',
    number: 1,
    title: "The Devotee's First Darshan",
    marathiTitle: "वारकऱ्याचे प्रथम दर्शन",
    badge: "First Darshan Achiever",
    difficulty: "Beginner",
    algorithm: "DIJKSTRA",
    sourceNodeId: "RAILWAY_STATION",
    targetNodeId: "VITTHAL_ENTRANCE",
    category: "Shortest Path",
    description: "You have arrived at Pandharpur Railway Station carrying your saffron flag. The temple bells are tolling! Use Dijkstra's Algorithm to calculate the absolute shortest walking distance to Vitthal Mandir Mahadwar.",
    objectives: [
      "Select Pandharpur Railway Station as source",
      "Select Vitthal Mandir Mahadwar as destination",
      "Run Dijkstra's algorithm to compute shortest path",
      "Inspect step-by-step queue operations"
    ],
    hint: "Dijkstra guarantees the minimum total distance in meters with non-negative edge weights.",
    validate: (state) => {
      const { selectedAlgorithm, startNode, endNode, routeResult } = state;
      return (
        selectedAlgorithm === 'DIJKSTRA' &&
        startNode === 'RAILWAY_STATION' &&
        endNode === 'VITTHAL_ENTRANCE' &&
        routeResult?.path?.length > 0 &&
        routeResult.path[0] === 'RAILWAY_STATION' &&
        routeResult.path[routeResult.path.length - 1] === 'VITTHAL_ENTRANCE'
      );
    }
  },
  {
    id: 'MISSION_2',
    number: 2,
    title: "Holy Chandrabhaga Snan & Darshan Ritual",
    marathiTitle: "चंद्रभागा स्नान व दर्शन विधी",
    badge: "Pavitra Snan Puraskar",
    difficulty: "Intermediate",
    algorithm: "MULTI_STOP",
    sourceNodeId: "BHIMA_GHAT_MAIN",
    targetNodeId: "VITTHAL_ENTRANCE",
    intermediateStops: ["PUNDALIK_NODE", "NAMDEV_STEPS"],
    category: "Itinerary Optimization",
    description: "By tradition, a pilgrim must first take holy snan at Chandrabhaga Ghat, offer obeisance at Bhakta Pundalik Temple, touch Sant Namdev Payari, and finally enter the sanctum.",
    objectives: [
      "Plan multi-stop route: Chandrabhaga Ghat -> Pundalik Mandir -> Namdev Payari -> Vitthal Mandir",
      "Solve the ordered multi-target path planning",
      "Execute walk animation across the sand dunes and ghat steps"
    ],
    hint: "Use Multi-Stop Itinerary Planner. The algorithm chains optimal segments together.",
    validate: (state) => {
      const { selectedAlgorithm, startNode, endNode, multiStops, routeResult } = state;
      const hasStops = multiStops?.includes('PUNDALIK_NODE') && multiStops?.includes('NAMDEV_STEPS');
      return (
        selectedAlgorithm === 'MULTI_STOP' &&
        startNode === 'BHIMA_GHAT_MAIN' &&
        endNode === 'VITTHAL_ENTRANCE' &&
        hasStops &&
        routeResult?.path?.length > 0
      );
    }
  },
  {
    id: 'MISSION_3',
    number: 3,
    title: "Ashadhi Ekadashi Crowd Bottleneck Bypass",
    marathiTitle: "आषाढी गर्दी व पर्यायी मार्ग व्यवस्थापन",
    badge: "Smart Crowd Navigator",
    difficulty: "Advanced",
    algorithm: "ASTAR",
    sourceNodeId: "SHIVAJI_CHOWK",
    targetNodeId: "VITTHAL_ENTRANCE",
    scenario: "CROWD_SURGE",
    closedEdgeId: "E_NAMDEV_MAHADWAR",
    category: "Dynamic Rerouting",
    description: "During Ashadhi Ekadashi peak fair, Mahadwar Road is completely barricaded due to severe stampede risk. Find an optimal alternate route into the temple via Paschim Dwar or Uttar Dwar considering crowd weights.",
    objectives: [
      "Barricade/Close Mahadwar Road (or enable High Crowd mode)",
      "Set origin Shivaji Maharaj Chowk and destination Vitthal Mandir",
      "Run A* Search or Crowd-Weighted Dijkstra to discover the bypass",
      "Verify the path avoids the blocked Mahadwar bottleneck"
    ],
    hint: "Toggle road closure on Mahadwar Road in Network Editor or switch weight metric to 'Crowd Time'.",
    validate: (state) => {
      const { startNode, endNode, routeResult, closedEdges } = state;
      const avoidedBlocked = !routeResult?.path?.includes('NAMDEV_STEPS') || closedEdges?.includes('E_NAMDEV_MAHADWAR');
      return (
        startNode === 'SHIVAJI_CHOWK' &&
        endNode === 'VITTHAL_ENTRANCE' &&
        avoidedBlocked &&
        routeResult?.path?.length > 0
      );
    }
  },
  {
    id: 'MISSION_4',
    number: 4,
    title: "The Sacred Nagar Pradakshina Ring Exploration",
    marathiTitle: "पवित्र नगर प्रदक्षिणा व संकीर्तन",
    badge: "Pradakshina Parikrama Ratna",
    difficulty: "Intermediate",
    algorithm: "BFS",
    sourceNodeId: "VITTHAL_ENTRANCE",
    targetNodeId: "ISKCON_NODE",
    category: "Graph Traversal",
    description: "Explore the sacred perimeter of Pandharpur covering traditional mathas, outer ghats, and riverside shrines. Compare Breadth-First Search (BFS) vs Depth-First Search (DFS) hop-by-hop traversal frontiers.",
    objectives: [
      "Select Vitthal Mandir Mahadwar as origin",
      "Run BFS (or DFS) algorithm in Algorithm Lab",
      "Observe unweighted layer-by-layer exploration order",
      "Explore at least 15 nodes in the traversal tree"
    ],
    hint: "BFS explores neighbors level-by-level, ensuring shortest path in terms of edge hops.",
    validate: (state) => {
      const { selectedAlgorithm, startNode, routeResult } = state;
      return (
        (selectedAlgorithm === 'BFS' || selectedAlgorithm === 'DFS') &&
        startNode === 'VITTHAL_ENTRANCE' &&
        routeResult?.visitedOrder?.length >= 12
      );
    }
  },
  {
    id: 'MISSION_5',
    number: 5,
    title: "Pilgrim Annachhatra & Water Infrastructure Grid",
    marathiTitle: "अन्नछत्र व पाणीपुरवठा किमान विस्तार जाळे",
    badge: "Temple Infrastructure Architect",
    difficulty: "Advanced",
    algorithm: "KRUSKAL",
    category: "Minimum Spanning Tree",
    description: "The Pandharpur Temple Trust needs to lay an emergency water pipeline and public announcement cable connecting all 41 holy sites with the minimum total cost and zero cycles.",
    objectives: [
      "Select Kruskal's MST algorithm",
      "Execute edge sorting and Disjoint Set Union (DSU) operations",
      "Watch cycle detections and accepted spanning edges in 3D",
      "Achieve full city connectivity with minimum total weight"
    ],
    hint: "Kruskal sorts all edges and uses Union-Find (DSU) with rank to avoid cycles.",
    validate: (state) => {
      const { selectedAlgorithm, routeResult } = state;
      return (
        selectedAlgorithm === 'KRUSKAL' &&
        routeResult?.mstEdges?.length >= 25
      );
    }
  },
  {
    id: 'MISSION_6',
    number: 6,
    title: "Rapid Emergency Evacuation & Green Corridor",
    marathiTitle: "तातडीची रुग्णवाहिका व आपत्कालीन कॉरिडॉर",
    badge: "Green Corridor Master",
    difficulty: "Master",
    algorithm: "ASTAR",
    sourceNodeId: "BHAKTA_NIWAS_NODE",
    targetNodeId: "RAILWAY_STATION",
    category: "Heuristic Pathfinding",
    description: "A pilgrim at Bhakta Niwas needs urgent transit to the Railway Station medical center. Run A* Search with 3D Euclidean distance heuristic to guide the path directly toward the goal while exploring fewer nodes than Dijkstra.",
    objectives: [
      "Select Bhakta Niwas as source and Railway Station as target",
      "Select A* Algorithm with Euclidean heuristic h(n)",
      "Compare total explored nodes between A* and Dijkstra",
      "Simulate the green corridor route in 3D"
    ],
    hint: "A* uses f(n) = g(n) + h(n), where h(n) is the straight-line distance to the Railway Station.",
    validate: (state) => {
      const { selectedAlgorithm, startNode, endNode, routeResult } = state;
      return (
        selectedAlgorithm === 'ASTAR' &&
        startNode === 'BHAKTA_NIWAS_NODE' &&
        endNode === 'RAILWAY_STATION' &&
        routeResult?.path?.length > 0
      );
    }
  }
];

export function getMissionById(missionId) {
  return MISSIONS.find(m => m.id === missionId);
}
