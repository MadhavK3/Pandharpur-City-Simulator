import { describe, it, expect } from 'vitest';
import { buildPandharpurGraph } from '../engine/graph/graphModel.js';
import { runMultiStop } from '../engine/algorithms/multiStop.js';

describe('Multi-Stop Itinerary Algorithm Tests', () => {
  const graph = buildPandharpurGraph();

  it('should chain holy yatra pilgrimage route visiting all intermediate shrines', () => {
    const stops = ['PUNDALIK_NODE', 'NAMDEV_STEPS'];
    const result = runMultiStop(graph, 'BHIMA_GHAT_MAIN', stops, 'VITTHAL_ENTRANCE');

    expect(result.path.length).toBeGreaterThan(0);
    expect(result.path[0]).toBe('BHIMA_GHAT_MAIN');
    expect(result.path.includes('PUNDALIK_NODE')).toBe(true);
    expect(result.path.includes('NAMDEV_STEPS')).toBe(true);
    expect(result.path[result.path.length - 1]).toBe('VITTHAL_ENTRANCE');
    expect(result.legs.length).toBe(3);
    expect(result.totalCost).toBeGreaterThan(0);
  });
});
