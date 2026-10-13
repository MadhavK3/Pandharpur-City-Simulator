/**
 * Dijkstra's Algorithm with detailed Step-by-Step execution recording
 * for pedagogical DAA visualization.
 */

export const DIJKSTRA_PSEUDOCODE = [
  "1. Initialize dist[v] = Infinity for all v, dist[start] = 0",
  "2. PriorityQueue.insert(start, 0)",
  "3. while PriorityQueue is not empty:",
  "4.   u = PriorityQueue.extractMin()",
  "5.   if u == target: return reconstructPath(parent)",
  "6.   if u is already visited: continue",
  "7.   mark u as visited",
  "8.   for each neighbor v of u:",
  "9.     alt = dist[u] + weight(u, v)",
  "10.    if alt < dist[v]:",
  "11.      dist[v] = alt; parent[v] = u",
  "12.      PriorityQueue.insert(v, alt)"
];

export const DIJKSTRA_METADATA = {
  name: "Dijkstra's Algorithm",
  type: "Single-Source Shortest Path",
  timeComplexity: "O((V + E) log V)",
  spaceComplexity: "O(V)",
  description: "Finds the shortest path between nodes in a graph with non-negative edge weights using a greedy priority queue approach."
};

export function runDijkstra(graph, startNodeId, targetNodeId) {
  const steps = [];
  const distances = {};
  const parent = {};
  const visited = new Set();
  const pq = []; // Array-based min-priority queue [ { nodeId, dist } ]

  // Step 1: Initialize
  for (const node of graph.nodes) {
    distances[node.id] = Infinity;
    parent[node.id] = null;
  }
  distances[startNodeId] = 0;
  pq.push({ nodeId: startNodeId, dist: 0 });

  steps.push({
    stepIndex: 0,
    line: 1,
    currentNode: startNodeId,
    targetNode: targetNodeId,
    description: `Initialized distances. Set dist[${startNodeId}] = 0, all others = ∞.`,
    visited: Array.from(visited),
    distances: { ...distances },
    frontier: [startNodeId],
    pq: pq.map(item => ({ ...item })),
    currentEdge: null,
    activeSubpath: [startNodeId]
  });

  let stepCounter = 1;

  while (pq.length > 0) {
    // Sort to extract min
    pq.sort((a, b) => a.dist - b.dist);
    const { nodeId: u, dist: currentDist } = pq.shift();

    if (visited.has(u)) continue;

    // Line 5: Check if reached destination
    if (u === targetNodeId) {
      visited.add(u);
      const path = reconstructPath(parent, startNodeId, targetNodeId);
      steps.push({
        stepIndex: stepCounter++,
        line: 5,
        currentNode: u,
        targetNode: targetNodeId,
        description: `Target ${u} reached! Shortest path cost is ${currentDist}m.`,
        visited: Array.from(visited),
        distances: { ...distances },
        frontier: pq.map(i => i.nodeId),
        pq: pq.map(item => ({ ...item })),
        currentEdge: null,
        activeSubpath: path
      });
      break;
    }

    visited.add(u);

    steps.push({
      stepIndex: stepCounter++,
      line: 7,
      currentNode: u,
      targetNode: targetNodeId,
      description: `Extracted min vertex ${u} (dist = ${currentDist}). Marked as visited.`,
      visited: Array.from(visited),
      distances: { ...distances },
      frontier: pq.map(i => i.nodeId),
      pq: pq.map(item => ({ ...item })),
      currentEdge: null,
      activeSubpath: reconstructPath(parent, startNodeId, u)
    });

    const neighbors = graph.getNeighbors(u);

    for (const edge of neighbors) {
      const v = edge.neighborId;
      if (visited.has(v)) continue;

      const alt = currentDist + edge.weight;

      steps.push({
        stepIndex: stepCounter++,
        line: 9,
        currentNode: u,
        examiningNeighbor: v,
        currentEdge: edge.edgeId,
        targetNode: targetNodeId,
        description: `Relaxing edge (${u} → ${v}): alt = ${currentDist} + ${edge.weight} = ${alt}. Current dist[${v}] = ${distances[v] === Infinity ? '∞' : distances[v]}.`,
        visited: Array.from(visited),
        distances: { ...distances },
        frontier: pq.map(i => i.nodeId),
        pq: pq.map(item => ({ ...item })),
        activeSubpath: reconstructPath(parent, startNodeId, u)
      });

      if (alt < distances[v]) {
        distances[v] = alt;
        parent[v] = u;
        pq.push({ nodeId: v, dist: alt });

        steps.push({
          stepIndex: stepCounter++,
          line: 11,
          currentNode: u,
          examiningNeighbor: v,
          currentEdge: edge.edgeId,
          targetNode: targetNodeId,
          description: `Updated dist[${v}] = ${alt} via parent ${u}. Pushed to Priority Queue.`,
          visited: Array.from(visited),
          distances: { ...distances },
          frontier: pq.map(i => i.nodeId),
          pq: pq.map(item => ({ ...item })),
          activeSubpath: reconstructPath(parent, startNodeId, v)
        });
      }
    }
  }

  const finalPath = reconstructPath(parent, startNodeId, targetNodeId);
  const totalCost = distances[targetNodeId];

  return {
    path: finalPath,
    totalCost: totalCost === Infinity ? null : totalCost,
    visitedOrder: Array.from(visited),
    totalSteps: steps.length,
    steps,
    pseudocode: DIJKSTRA_PSEUDOCODE,
    metadata: DIJKSTRA_METADATA
  };
}

function reconstructPath(parent, startNodeId, targetNodeId) {
  const path = [];
  let curr = targetNodeId;
  while (curr) {
    path.unshift(curr);
    if (curr === startNodeId) break;
    curr = parent[curr];
  }
  return path[0] === startNodeId ? path : [];
}
