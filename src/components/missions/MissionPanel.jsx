import React from 'react';
import { useSimulationStore } from '../../store/simulationStore.js';
import { MISSIONS } from '../../data/missions.js';
import { Trophy, CheckCircle, ArrowRight, X, Shield, Award } from 'lucide-react';

export function MissionPanel() {
  const isMissionPanelOpen = useSimulationStore(state => state.isMissionPanelOpen);
  const setMissionPanelOpen = useSimulationStore(state => state.setMissionPanelOpen);
  const activeMissionId = useSimulationStore(state => state.activeMissionId);
  const completedMissions = useSimulationStore(state => state.completedMissions);
  const startMission = useSimulationStore(state => state.startMission);

  if (!isMissionPanelOpen) return null;

  return (
    <div
      className="slide-in-right"
      style={{
        position: 'absolute',
        top: 'calc(var(--topbar-height) + 12px)',
        right: '12px',
        bottom: '80px',
        width: 'min(420px, calc(100vw - 24px))',
        zIndex: 20,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        background: 'rgba(9, 13, 22, 0.95)',
        backdropFilter: 'blur(16px)',
        border: '1px solid rgba(245, 158, 11, 0.4)',
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
          background: 'rgba(15, 23, 42, 0.6)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Trophy size={18} color="#fbbf24" />
          <h2 style={{ fontSize: '1rem', fontWeight: '700', color: '#f8fafc', margin: 0 }}>
            Holy Pilgrimage Missions (६ मोहिमा)
          </h2>
        </div>
        <button
          className="btn btn-icon"
          onClick={() => setMissionPanelOpen(false)}
          style={{ padding: '4px' }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Progress Bar */}
      <div style={{ padding: '10px 16px', background: 'rgba(245, 158, 11, 0.08)', borderBottom: '1px solid rgba(245, 158, 11, 0.15)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', marginBottom: '4px' }}>
          <span style={{ color: '#94a3b8' }}>Missions Completed</span>
          <span style={{ color: '#fbbf24', fontWeight: '700' }}>
            {completedMissions.length} / {MISSIONS.length}
          </span>
        </div>
        <div style={{ height: '6px', background: 'rgba(255,255,255,0.08)', borderRadius: '3px', overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${(completedMissions.length / MISSIONS.length) * 100}%`,
              background: 'linear-gradient(90deg, #f97316, #fbbf24)',
              transition: 'width 0.4s ease'
            }}
          />
        </div>
      </div>

      {/* Missions List */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {MISSIONS.map(m => {
          const isCompleted = completedMissions.includes(m.id);
          const isActive = activeMissionId === m.id;

          return (
            <div
              key={m.id}
              style={{
                borderRadius: '8px',
                padding: '12px',
                background: isActive ? 'rgba(245, 158, 11, 0.15)' : 'rgba(15, 23, 42, 0.7)',
                border: isCompleted
                  ? '1px solid rgba(16, 185, 129, 0.5)'
                  : isActive
                  ? '1px solid #f59e0b'
                  : '1px solid rgba(255, 255, 255, 0.06)',
                display: 'flex',
                flexDirection: 'column',
                gap: '8px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span className="badge badge-gold" style={{ fontSize: '0.66rem' }}>
                  MISSION {m.number} • {m.difficulty}
                </span>
                {isCompleted ? (
                  <span className="badge badge-green" style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <CheckCircle size={11} /> COMPLETED
                  </span>
                ) : isActive ? (
                  <span className="badge badge-blue">ACTIVE</span>
                ) : null}
              </div>

              <div>
                <h3 style={{ fontSize: '0.88rem', fontWeight: '700', color: '#f8fafc', margin: '2px 0' }}>
                  {m.title}
                </h3>
                <p style={{ fontSize: '0.72rem', color: '#fed7aa', margin: 0 }}>
                  {m.marathiTitle}
                </p>
              </div>

              <p style={{ fontSize: '0.74rem', color: '#cbd5e1', lineHeight: '1.4', margin: 0 }}>
                {m.description}
              </p>

              {/* Reward Badge info */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.7rem', color: '#fbbf24' }}>
                <Award size={13} />
                <span>Award: {m.badge}</span>
              </div>

              <button
                className={`btn ${isActive ? 'btn-secondary' : 'btn-primary'}`}
                style={{ padding: '6px 10px', fontSize: '0.75rem', marginTop: '4px' }}
                onClick={() => startMission(m.id)}
              >
                <span>{isActive ? 'Resume Mission Setup' : isCompleted ? 'Replay Mission' : 'Embark on Mission'}</span>
                <ArrowRight size={13} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
