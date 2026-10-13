import React from 'react';
import { useSimulationStore } from '../../store/simulationStore.js';
import { PANDHARPUR_GRAPH_DATA } from '../../data/pedestrianGraph.js';
import { ShieldAlert, Unlock, RotateCcw, X, AlertTriangle } from 'lucide-react';

export function NetworkEditor() {
  const isNetworkEditorOpen = useSimulationStore(state => state.isNetworkEditorOpen);
  const setNetworkEditorOpen = useSimulationStore(state => state.setNetworkEditorOpen);
  const closedEdges = useSimulationStore(state => state.closedEdges);
  const toggleEdgeBarricade = useSimulationStore(state => state.toggleEdgeBarricade);
  const resetAllBarricades = useSimulationStore(state => state.resetAllBarricades);

  if (!isNetworkEditorOpen) return null;

  const edgeMap = new Map(PANDHARPUR_GRAPH_DATA.edges.map(e => [e.id, e]));
  const closedArray = Array.from(closedEdges);

  // Key bottleneck edges frequently regulated during Ashadhi Wari
  const majorChokepoints = [
    { id: 'E_NAMDEV_MAHADWAR', name: 'Mahadwar Bazar Road', desc: 'Main temple entry bottleneck' },
    { id: 'E_EAST_CIRCUM_BHIMA', name: 'Mahaghat Marg Steps', desc: 'Chandrabhaga river approach' },
    { id: 'E_NAVIPETH_SHIVAJI', name: 'Shivaji-Navi Peth Link', desc: 'Central town artery' },
    { id: 'E_VITTHAL_NAMDEV', name: 'Namdev Payari Approach', desc: 'First step darshan queue' }
  ];

  return (
    <div
      style={{
        position: 'absolute',
        top: 'calc(var(--topbar-height) + 16px)',
        right: '16px',
        bottom: '90px',
        width: '380px',
        zIndex: 25,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        background: 'rgba(9, 13, 22, 0.95)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(239, 68, 68, 0.4)',
        boxShadow: '0 16px 40px rgba(0, 0, 0, 0.8)',
        overflow: 'hidden'
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '14px 16px',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(239, 68, 68, 0.08)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={18} color="#ef4444" />
          <h2 style={{ fontSize: '1rem', fontWeight: '700', color: '#f8fafc', margin: 0 }}>
            Barricades & Crowd Control
          </h2>
        </div>
        <button
          className="btn btn-icon"
          onClick={() => setNetworkEditorOpen(false)}
          style={{ padding: '4px' }}
        >
          <X size={16} />
        </button>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Info Box */}
        <div style={{ background: 'rgba(255, 255, 255, 0.04)', borderRadius: '8px', padding: '10px' }}>
          <p style={{ fontSize: '0.74rem', color: '#cbd5e1', lineHeight: '1.45', margin: 0 }}>
            Barricading roads simulates real-time police crowd diversions during Ashadhi Ekadashi. Blocked edges are removed from the graph adjacency list, triggering dynamic rerouting algorithms.
          </p>
        </div>

        {/* Quick Barricade Chokepoints */}
        <div>
          <span style={{ fontSize: '0.76rem', fontWeight: '700', color: '#fbbf24', marginBottom: '8px', display: 'block' }}>
            High-Congestion Chokepoint Roads
          </span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {majorChokepoints.map(cp => {
              const isClosed = closedEdges.has(cp.id);
              return (
                <div
                  key={cp.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    background: isClosed ? 'rgba(239, 68, 68, 0.18)' : 'rgba(15, 23, 42, 0.7)',
                    border: isClosed ? '1px solid #ef4444' : '1px solid rgba(255, 255, 255, 0.05)'
                  }}
                >
                  <div>
                    <span style={{ fontSize: '0.78rem', fontWeight: '700', color: isClosed ? '#f87171' : '#f8fafc' }}>
                      {cp.name}
                    </span>
                    <p style={{ fontSize: '0.68rem', color: '#94a3b8', margin: 0 }}>
                      {cp.desc}
                    </p>
                  </div>
                  <button
                    className={`btn ${isClosed ? 'btn-danger' : 'btn-secondary'}`}
                    style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                    onClick={() => toggleEdgeBarricade(cp.id)}
                  >
                    {isClosed ? 'Unblock' : 'Barricade'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Currently Closed Edges List */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
            <span style={{ fontSize: '0.76rem', fontWeight: '700', color: '#f87171' }}>
              Active Barricades ({closedArray.length})
            </span>
            {closedArray.length > 0 && (
              <button
                className="btn btn-secondary"
                style={{ padding: '3px 8px', fontSize: '0.68rem' }}
                onClick={resetAllBarricades}
              >
                <RotateCcw size={12} />
                <span>Reset All</span>
              </button>
            )}
          </div>

          {closedArray.length === 0 ? (
            <p style={{ fontSize: '0.72rem', color: '#64748b', fontStyle: 'italic', margin: 0 }}>
              No roads currently barricaded. All 61 pedestrian paths are open. Click any road in 3D to barricade it.
            </p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', maxHeight: '160px', overflowY: 'auto' }}>
              {closedArray.map(id => {
                const edge = edgeMap.get(id);
                return (
                  <div
                    key={`closed_${id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '5px 8px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      borderRadius: '4px',
                      fontSize: '0.72rem'
                    }}
                  >
                    <span style={{ color: '#fca5a5' }}>⛔ {edge?.streetName || id}</span>
                    <button
                      onClick={() => toggleEdgeBarricade(id)}
                      style={{ background: 'transparent', border: 'none', color: '#34d399', cursor: 'pointer' }}
                    >
                      <Unlock size={13} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
