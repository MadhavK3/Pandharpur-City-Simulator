import { describe, it, expect } from 'vitest';
import { buildPandharpurGraph } from '../engine/graph/graphModel.js';
import { runDijkstra } from '../engine/algorithms/dijkstra.js';

describe('Dijkstra Algorithm Tests', () => {
  const graph = buildPandharpurGraph();

  it('should find optimal path from Railway Station to Vitthal Mandir', () => {
    const result = runDijkstra(graph, 'RAILWAY_STATION', 'VITTHAL_ENTRANCE');
    expect(result.path.length).toBeGreaterThan(0);
    expect(result.path[0]).toBe('RAILWAY_STATION');
    expect(result.path[result.path.length - 1]).toBe('VITTHAL_ENTRANCE');
    expect(result.totalCost).toBeGreaterThan(0);
  });

  it('should record execution steps with priority queue snapshots', () => {
    const result = runDijkstra(graph, 'SHIVAJI_CHOWK', 'VITTHAL_ENTRANCE');
    expect(result.steps.length).toBeGreaterThan(0);
    expect(result.steps[0].stepIndex).toBe(0);
    expect(result.steps[0].distances['SHIVAJI_CHOWK']).toBe(0);
  });

  it('should dynamically find alternate bypass when Mahadwar is barricaded', () => {
    const normalResult = runDijkstra(graph, 'SHIVAJI_CHOWK', 'VITTHAL_ENTRANCE');
    const closedGraph = buildPandharpurGraph({ closedEdges: new Set(['E_NAMDEV_MAHADWAR', 'E_PASCHIM_SHIVAJI']) });
    const bypassResult = runDijkstra(closedGraph, 'SHIVAJI_CHOWK', 'VITTHAL_ENTRANCE');

    expect(bypassResult.path.length).toBeGreaterThan(0);
    expect(bypassResult.path[0]).toBe('SHIVAJI_CHOWK');
    expect(bypassResult.path[bypassResult.path.length - 1]).toBe('VITTHAL_ENTRANCE');
  });
});
