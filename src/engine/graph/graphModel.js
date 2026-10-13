import { PANDHARPUR_GRAPH_DATA } from '../../data/pedestrianGraph.js';

/**
 * Builds an active Graph representation from PANDHARPUR_GRAPH_DATA,
 * applying edge closures, dynamic crowd weights, and cost metrics.
 */
export function buildPandharpurGraph(options = {}) {
  const {
    closedEdges = new Set(),
    crowdMultiplier = 1.0,
    costMetric = 'distance', // 'distance' | 'crowd_time' | 'scenic'
    customEdgeWeights = {}
  } = options;

  const nodeMap = new Map();
  const edgeMap = new Map();
  const adjacency = new Map();

  // Initialize nodes
  for (const node of PANDHARPUR_GRAPH_DATA.nodes) {
    nodeMap.set(node.id, {
      ...node,
      // dynamic crowd adjusted
      effectiveCrowd: Math.min(1.0, node.crowdDensity * crowdMultiplier)
    });
    adjacency.set(node.id, []);
  }

  // Initialize edges
  for (const edge of PANDHARPUR_GRAPH_DATA.edges) {
    const isClosed = !edge.isOpen || closedEdges.has(edge.id);

    // Calculate weight based on cost metric
    let baseWeight = edge.distanceMeters;
    if (customEdgeWeights[edge.id] !== undefined) {
      baseWeight = customEdgeWeights[edge.id];
    }

    let calculatedWeight = baseWeight;
    const effectiveCrowdFactor = 1.0 + (edge.crowdFactor - 1.0) * crowdMultiplier;

    if (costMetric === 'crowd_time') {
      // Walking speed base 1.2 m/s, degraded by crowd factor
      // Time in seconds: (distance / (1.2 / effectiveCrowdFactor))
      calculatedWeight = Math.round((baseWeight / 1.2) * effectiveCrowdFactor);
    } else if (costMetric === 'scenic') {
      // Prioritizes pradakshina and river ghat paths
      const scenicBonus = (edge.roadType === 'ghat_steps' || edge.roadType === 'pradakshina') ? 0.7 : 1.1;
      calculatedWeight = Math.round(baseWeight * scenicBonus);
    } else {
      // Standard distance
      calculatedWeight = baseWeight;
    }

    const processedEdge = {
      ...edge,
      isClosed,
      effectiveWeight: calculatedWeight,
      effectiveCrowdFactor
    };

    edgeMap.set(edge.id, processedEdge);

    // Bidirectional pedestrian network
    if (!isClosed) {
      if (adjacency.has(edge.source) && adjacency.has(edge.target)) {
        adjacency.get(edge.source).push({
          neighborId: edge.target,
          edgeId: edge.id,
          weight: calculatedWeight,
          distanceMeters: edge.distanceMeters,
          roadType: edge.roadType,
          streetName: edge.streetName
        });
        adjacency.get(edge.target).push({
          neighborId: edge.source,
          edgeId: edge.id,
          weight: calculatedWeight,
          distanceMeters: edge.distanceMeters,
          roadType: edge.roadType,
          streetName: edge.streetName
        });
      }
    }
  }

  return {
    nodes: Array.from(nodeMap.values()),
    edges: Array.from(edgeMap.values()),
    nodeMap,
    edgeMap,
    adjacency,
    getNode: (id) => nodeMap.get(id),
    getEdge: (id) => edgeMap.get(id),
    getNeighbors: (id) => adjacency.get(id) || []
  };
}

/**
 * Calculates straight line 3D Euclidean distance between two nodes
 */
export function getEuclideanDistance(nodeA, nodeB) {
  if (!nodeA || !nodeB) return 0;
  const dx = (nodeA.x - nodeB.x);
  const dy = (nodeA.y - nodeB.y);
  const dz = (nodeA.z - nodeB.z);
  // Admissible Euclidean lower-bound heuristic for A*
  return Math.sqrt(dx * dx + dy * dy + dz * dz) * 1.2;
}
