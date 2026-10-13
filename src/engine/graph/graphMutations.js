/**
 * Graph Mutation operations (Barricades, Closures, Crowd surges)
 */

export function toggleEdgeBarricade(closedEdgeSet, edgeId) {
  const next = new Set(closedEdgeSet);
  if (next.has(edgeId)) {
    next.delete(edgeId);
  } else {
    next.add(edgeId);
  }
  return next;
}

export function closeEdge(closedEdgeSet, edgeId) {
  const next = new Set(closedEdgeSet);
  next.add(edgeId);
  return next;
}

export function openEdge(closedEdgeSet, edgeId) {
  const next = new Set(closedEdgeSet);
  next.delete(edgeId);
  return next;
}

export function resetAllBarricades() {
  return new Set();
}
