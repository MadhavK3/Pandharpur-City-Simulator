export const KRUSKAL_PSEUDOCODE = [
  "1. Initialize Disjoint Set DSU for all V vertices",
  "2. Sort all E edges by weight in ascending order",
  "3. Initialize MST_edges = [], totalWeight = 0",
  "4. for each edge (u, v, w) in sorted edges:",
  "5.   rootU = DSU.find(u)",
  "6.   rootV = DSU.find(v)",
  "7.   if rootU != rootV:",
  "8.     MST_edges.add((u, v, w))",
  "9.     DSU.union(rootU, rootV)",
  "10.    totalWeight += w",
  "11.  else: skip edge (cycle detected)"
];

export const KRUSKAL_METADATA = {
  name: "Kruskal's Minimum Spanning Tree (MST)",
  type: "Greedy / Minimum Spanning Forest",
  timeComplexity: "O(E log E) or O(E log V)",
  spaceComplexity: "O(V + E)",
  description: "Constructs a minimum-weight spanning tree connecting all nodes without any cycles using a greedy edge selection with Disjoint Set Union (DSU)."
};

class DisjointSet {
  constructor(nodeIds) {
    this.parent = {};
    this.rank = {};
    for (const id of nodeIds) {
      this.parent[id] = id;
      this.rank[id] = 0;
    }
  }

  find(i) {
    if (this.parent[i] === i) return i;
    this.parent[i] = this.find(this.parent[i]); // Path compression
    return this.parent[i];
  }

  union(i, j) {
    const rootI = this.find(i);
    const rootJ = this.find(j);
    if (rootI === rootJ) return false;

    // Union by rank
    if (this.rank[rootI] < this.rank[rootJ]) {
      this.parent[rootI] = rootJ;
    } else if (this.rank[rootI] > this.rank[rootJ]) {
      this.parent[rootJ] = rootI;
    } else {
      this.parent[rootJ] = rootI;
      this.rank[rootI]++;
    }
    return true;
  }
}

export function runKruskal(graph) {
  const steps = [];
  const nodeIds = graph.nodes.map(n => n.id);
  const dsu = new DisjointSet(nodeIds);

  // Extract all unique open edges
  const edgeList = graph.edges
    .filter(e => !e.isClosed)
    .map(e => ({
      edgeId: e.id,
      source: e.source,
      target: e.target,
      weight: e.effectiveWeight || e.distanceMeters,
      streetName: e.streetName,
      roadType: e.roadType
    }));

  // Step 2: Sort edges in non-decreasing order of weight
  edgeList.sort((a, b) => a.weight - b.weight);

  const mstEdges = [];
  let totalCost = 0;

  steps.push({
    stepIndex: 0,
    line: 2,
    description: `Sorted ${edgeList.length} open edges by weight. Initialized Disjoint Set.`,
    mstEdges: [],
    currentEdge: null,
    totalCost: 0,
    edgePool: edgeList.map(e => ({ id: e.edgeId, weight: e.weight }))
  });

  let stepCounter = 1;

  for (const edge of edgeList) {
    const { edgeId, source: u, target: v, weight } = edge;
    const rootU = dsu.find(u);
    const rootV = dsu.find(v);

    if (rootU !== rootV) {
      dsu.union(rootU, rootV);
      mstEdges.push(edgeId);
      totalCost += weight;

      steps.push({
        stepIndex: stepCounter++,
        line: 8,
        description: `ACCEPTED Edge ${edgeId} (${u} ↔ ${v}, ${weight}m). Different components (${rootU} != ${rootV}). Unioned!`,
        currentEdge: edgeId,
        decision: 'ACCEPTED',
        reason: 'Connects disjoint trees without cycle',
        mstEdges: [...mstEdges],
        totalCost,
        activeEdge: edge
      });
    } else {
      steps.push({
        stepIndex: stepCounter++,
        line: 11,
        description: `REJECTED Edge ${edgeId} (${u} ↔ ${v}, ${weight}m). Cycle detected! Both already in component ${rootU}.`,
        currentEdge: edgeId,
        decision: 'REJECTED',
        reason: 'Both endpoints in same set; would create cycle',
        mstEdges: [...mstEdges],
        totalCost,
        activeEdge: edge
      });
    }
  }

  return {
    mstEdges,
    totalCost,
    totalEdgesConsidered: edgeList.length,
    totalSteps: steps.length,
    steps,
    pseudocode: KRUSKAL_PSEUDOCODE,
    metadata: KRUSKAL_METADATA
  };
}
