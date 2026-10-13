import { runDijkstra } from './dijkstra.js';

export const MULTI_STOP_PSEUDOCODE = [
  "1. Given Start S, Stops [P1, P2... Pk], Destination T",
  "2. Initialize fullRoute = [], totalCost = 0",
  "3. currentPoint = S",
  "4. for nextStop in [P1, P2... Pk, T]:",
  "5.   legResult = Dijkstra(currentPoint, nextStop)",
  "6.   append legResult.path (excluding duplicate joint)",
  "7.   totalCost += legResult.totalCost",
  "8.   currentPoint = nextStop",
  "9. return fullRoute, totalCost"
];

export const MULTI_STOP_METADATA = {
  name: "Multi-Stop Pilgrimage Itinerary Planner",
  type: "Chained Optimization / TSP Heuristic",
  timeComplexity: "O(K * (V + E) log V)",
  spaceComplexity: "O(V + K)",
  description: "Computes an optimal sequential holy yatra route passing through all ritual intermediate pilgrimage stops (e.g., River Bath → Pundalik → Namdev Steps → Vitthal Darshan)."
};

export function runMultiStop(graph, startNodeId, stopNodeIds = [], targetNodeId = null) {
  const steps = [];
  const waypoints = [startNodeId, ...stopNodeIds];
  if (targetNodeId && targetNodeId !== stopNodeIds[stopNodeIds.length - 1]) {
    waypoints.push(targetNodeId);
  }

  const fullPath = [];
  const legs = [];
  let totalCost = 0;
  let stepCounter = 0;

  steps.push({
    stepIndex: stepCounter++,
    line: 1,
    description: `Planning holy yatra through ${waypoints.length} waypoints: ${waypoints.join(' → ')}.`,
    fullPath: [],
    currentLegIndex: 0
  });

  for (let i = 0; i < waypoints.length - 1; i++) {
    const from = waypoints[i];
    const to = waypoints[i + 1];

    const legResult = runDijkstra(graph, from, to);

    if (!legResult.path || legResult.path.length === 0) {
      return {
        path: [],
        totalCost: null,
        error: `Could not find valid route between ${from} and ${to}. A road might be barricaded!`,
        steps,
        pseudocode: MULTI_STOP_PSEUDOCODE,
        metadata: MULTI_STOP_METADATA
      };
    }

    legs.push({
      legIndex: i,
      from,
      to,
      cost: legResult.totalCost,
      path: legResult.path
    });

    totalCost += legResult.totalCost || 0;

    // Concat path without repeating joint node
    if (fullPath.length === 0) {
      fullPath.push(...legResult.path);
    } else {
      fullPath.push(...legResult.path.slice(1));
    }

    steps.push({
      stepIndex: stepCounter++,
      line: 6,
      description: `Leg ${i + 1}/${waypoints.length - 1}: Completed ${from} → ${to} (${legResult.totalCost}m).`,
      fullPath: [...fullPath],
      currentLeg: { from, to, cost: legResult.totalCost },
      currentLegIndex: i + 1,
      totalCostSoFar: totalCost
    });
  }

  return {
    path: fullPath,
    totalCost,
    legs,
    waypoints,
    totalSteps: steps.length,
    steps,
    pseudocode: MULTI_STOP_PSEUDOCODE,
    metadata: MULTI_STOP_METADATA
  };
}
