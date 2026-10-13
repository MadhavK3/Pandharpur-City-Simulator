/**
 * Graph Validation Utilities
 */
export function validateGraphStructure(graphData) {
  const errors = [];
  const warnings = [];

  const nodeIds = new Set(graphData.nodes.map(n => n.id));

  // Check unique IDs
  if (nodeIds.size !== graphData.nodes.length) {
    errors.push('Duplicate node IDs detected.');
  }

  // Check edges
  for (const edge of graphData.edges) {
    if (!nodeIds.has(edge.source)) {
      errors.push(`Edge ${edge.id} references non-existent source node: ${edge.source}`);
    }
    if (!nodeIds.has(edge.target)) {
      errors.push(`Edge ${edge.id} references non-existent target node: ${edge.target}`);
    }
    if (edge.distanceMeters <= 0) {
      warnings.push(`Edge ${edge.id} has zero or negative distance.`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
    nodeCount: graphData.nodes.length,
    edgeCount: graphData.edges.length
  };
}
