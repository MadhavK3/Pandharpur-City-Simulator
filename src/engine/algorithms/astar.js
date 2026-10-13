import { getEuclideanDistance } from '../graph/graphModel.js';

export const ASTAR_PSEUDOCODE = [
  "1. Initialize gScore[v] = Infinity, fScore[v] = Infinity; gScore[start] = 0",
  "2. fScore[start] = heuristic(start, goal)",
  "3. openSet.insert(start, fScore[start])",
  "4. while openSet is not empty:",
  "5.   current = openSet.extractMin()",
  "6.   if current == goal: return reconstructPath(parent)",
  "7.   openSet.remove(current); closedSet.add(current)",
  "8.   for each neighbor v of current:",
  "9.     tentative_g = gScore[current] + weight(current, v)",
  "10.    if tentative_g < gScore[v]:",
  "11.      parent[v] = current; gScore[v] = tentative_g",
  "12.      fScore[v] = tentative_g + heuristic(v, goal)",
  "13.      if v not in openSet: openSet.insert(v, fScore[v])"
];

export const ASTAR_METADATA = {
  name: "A* Search Algorithm",
  type: "Informed / Heuristic Shortest Path",
  timeComplexity: "O(E) worst case O(b^d)",
  spaceComplexity: "O(V)",
  description: "Directs search towards the target using an admissible Euclidean distance heuristic h(n), exploring significantly fewer vertices than Dijkstra."
};

export function runAStar(graph, startNodeId, targetNodeId) {
  const steps = [];
  const gScore = {};
  const fScore = {};
  const parent = {};
  const closedSet = new Set();
  const openSet = []; // [ { nodeId, f, g, h } ]

  const targetNode = graph.getNode(targetNodeId);
  const startNode = graph.getNode(startNodeId);

  for (const node of graph.nodes) {
    gScore[node.id] = Infinity;
    fScore[node.id] = Infinity;
    parent[node.id] = null;
  }

  gScore[startNodeId] = 0;
  const initialH = Math.round(getEuclideanDistance(startNode, targetNode));
  fScore[startNodeId] = initialH;
  openSet.push({ nodeId: startNodeId, f: initialH, g: 0, h: initialH });

  steps.push({
    stepIndex: 0,
    line: 2,
    currentNode: startNodeId,
    targetNode: targetNodeId,
    description: `Initialized A*. Start ${startNodeId} h=${initialH}m, f=${initialH}m.`,
    visited: [],
    distances: { ...gScore },
    frontier: [startNodeId],
    pq: openSet.map(i => ({ nodeId: i.nodeId, dist: i.f, g: i.g, h: i.h })),
    currentEdge: null,
    activeSubpath: [startNodeId]
  });

  let stepCounter = 1;

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift();
    const u = current.nodeId;

    if (u === targetNodeId) {
      closedSet.add(u);
      const path = reconstructPath(parent, startNodeId, targetNodeId);
      steps.push({
        stepIndex: stepCounter++,
        line: 6,
        currentNode: u,
        targetNode: targetNodeId,
        description: `Goal reached! Found optimal route with distance ${gScore[u]}m.`,
        visited: Array.from(closedSet),
        distances: { ...gScore },
        frontier: openSet.map(i => i.nodeId),
        pq: openSet.map(i => ({ nodeId: i.nodeId, dist: i.f, g: i.g, h: i.h })),
        currentEdge: null,
        activeSubpath: path
      });
      break;
    }

    closedSet.add(u);

    steps.push({
      stepIndex: stepCounter++,
      line: 7,
      currentNode: u,
      targetNode: targetNodeId,
      description: `Exploring ${u}: g=${current.g}m, h=${current.h}m, f=${current.f}m. Added to closedSet.`,
      visited: Array.from(closedSet),
      distances: { ...gScore },
      frontier: openSet.map(i => i.nodeId),
      pq: openSet.map(i => ({ nodeId: i.nodeId, dist: i.f, g: i.g, h: i.h })),
      currentEdge: null,
      activeSubpath: reconstructPath(parent, startNodeId, u)
    });

    const neighbors = graph.getNeighbors(u);

    for (const edge of neighbors) {
      const v = edge.neighborId;
      if (closedSet.has(v)) continue;

      const tentativeG = gScore[u] + edge.weight;

      steps.push({
        stepIndex: stepCounter++,
        line: 9,
        currentNode: u,
        examiningNeighbor: v,
        currentEdge: edge.edgeId,
        targetNode: targetNodeId,
        description: `Evaluating neighbor ${v} via (${u}→${v}): tentative_g = ${gScore[u]} + ${edge.weight} = ${tentativeG}m.`,
        visited: Array.from(closedSet),
        distances: { ...gScore },
        frontier: openSet.map(i => i.nodeId),
        pq: openSet.map(i => ({ nodeId: i.nodeId, dist: i.f, g: i.g, h: i.h })),
        activeSubpath: reconstructPath(parent, startNodeId, u)
      });

      if (tentativeG < gScore[v]) {
        parent[v] = u;
        gScore[v] = tentativeG;
        const vNode = graph.getNode(v);
        const h = Math.round(getEuclideanDistance(vNode, targetNode));
        const f = tentativeG + h;
        fScore[v] = f;

        const existingOpen = openSet.find(item => item.nodeId === v);
        if (existingOpen) {
          existingOpen.g = tentativeG;
          existingOpen.f = f;
          existingOpen.h = h;
        } else {
          openSet.push({ nodeId: v, f, g: tentativeG, h });
        }

        steps.push({
          stepIndex: stepCounter++,
          line: 12,
          currentNode: u,
          examiningNeighbor: v,
          currentEdge: edge.edgeId,
          targetNode: targetNodeId,
          description: `Updated ${v}: g=${tentativeG}m, h=${h}m, f=${f}m. Added to openSet.`,
          visited: Array.from(closedSet),
          distances: { ...gScore },
          frontier: openSet.map(i => i.nodeId),
          pq: openSet.map(i => ({ nodeId: i.nodeId, dist: i.f, g: i.g, h: i.h })),
          activeSubpath: reconstructPath(parent, startNodeId, v)
        });
      }
    }
  }

  const finalPath = reconstructPath(parent, startNodeId, targetNodeId);
  const totalCost = gScore[targetNodeId];

  return {
    path: finalPath,
    totalCost: totalCost === Infinity ? null : totalCost,
    visitedOrder: Array.from(closedSet),
    totalSteps: steps.length,
    steps,
    pseudocode: ASTAR_PSEUDOCODE,
    metadata: ASTAR_METADATA
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
