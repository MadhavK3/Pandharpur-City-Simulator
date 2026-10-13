import { describe, it, expect } from 'vitest';
import { PANDHARPUR_GRAPH_DATA } from '../data/pedestrianGraph.js';
import { buildPandharpurGraph } from '../engine/graph/graphModel.js';
import { validateGraphStructure } from '../engine/graph/graphValidation.js';
import { toggleEdgeBarricade } from '../engine/graph/graphMutations.js';

describe('Pandharpur Graph Integrity & Engine Tests', () => {
  it('should have 41 nodes and 61 edges in pedestrian graph data', () => {
    expect(PANDHARPUR_GRAPH_DATA.nodes.length).toBe(41);
    expect(PANDHARPUR_GRAPH_DATA.edges.length).toBe(61);
  });

  it('should pass structural validation without dangling edge references', () => {
    const report = validateGraphStructure(PANDHARPUR_GRAPH_DATA);
    expect(report.isValid).toBe(true);
    expect(report.errors).toHaveLength(0);
  });

  it('should build active graph with adjacency lists', () => {
    const graph = buildPandharpurGraph();
    expect(graph.nodes.length).toBe(41);
    expect(graph.edges.length).toBe(61);

    // Vitthal entrance should have multiple neighbors
    const vitthalNeighbors = graph.getNeighbors('VITTHAL_ENTRANCE');
    expect(vitthalNeighbors.length).toBeGreaterThan(3);
  });

  it('should exclude barricaded edges from adjacency', () => {
    const closed = new Set(['E_NAMDEV_MAHADWAR']);
    const graph = buildPandharpurGraph({ closedEdges: closed });

    const mahadwarNeighbors = graph.getNeighbors('MAHADWAR_NODE');
    const hasNamdev = mahadwarNeighbors.some(n => n.neighborId === 'NAMDEV_STEPS');
    expect(hasNamdev).toBe(false);
  });

  it('should toggle edge barricades cleanly', () => {
    let set = new Set();
    set = toggleEdgeBarricade(set, 'E_NAMDEV_MAHADWAR');
    expect(set.has('E_NAMDEV_MAHADWAR')).toBe(true);

    set = toggleEdgeBarricade(set, 'E_NAMDEV_MAHADWAR');
    expect(set.has('E_NAMDEV_MAHADWAR')).toBe(false);
  });
});
