import { describe, it, expect } from 'vitest';
import { buildPandharpurGraph } from '../engine/graph/graphModel.js';
import { runAStar } from '../engine/algorithms/astar.js';
import { runDijkstra } from '../engine/algorithms/dijkstra.js';

describe('A* Algorithm Tests', () => {
  const graph = buildPandharpurGraph();

  it('should find shortest route with Euclidean heuristic', () => {
    const astarResult = runAStar(graph, 'BHAKTA_NIWAS_NODE', 'RAILWAY_STATION');
    const dijkstraResult = runDijkstra(graph, 'BHAKTA_NIWAS_NODE', 'RAILWAY_STATION');

    expect(astarResult.path.length).toBeGreaterThan(0);
    expect(astarResult.path[0]).toBe('BHAKTA_NIWAS_NODE');
    expect(astarResult.path[astarResult.path.length - 1]).toBe('RAILWAY_STATION');

    // Both should find equivalent optimal distance
    expect(astarResult.totalCost).toBe(dijkstraResult.totalCost);
  });

  it('should evaluate heuristic f = g + h in open set', () => {
    const result = runAStar(graph, 'RAILWAY_STATION', 'VITTHAL_ENTRANCE');
    expect(result.steps.length).toBeGreaterThan(0);
    expect(result.steps[0].pq[0].h).toBeGreaterThan(0);
  });
});
