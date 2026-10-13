import React from 'react';
import { useSimulationStore } from '../../store/simulationStore.js';
import {
  Sun,
  Sunset,
  Moon,
  Flame,
  Camera,
  Compass,
  Eye,
  Users,
  Code2,
  Trophy,
  ShieldAlert,
  Info
} from 'lucide-react';

export function TopNavigation() {
  const timeOfDay = useSimulationStore(state => state.timeOfDay);
  const setTimeOfDay = useSimulationStore(state => state.setTimeOfDay);
  const cameraMode = useSimulationStore(state => state.cameraMode);
  const setCameraMode = useSimulationStore(state => state.setCameraMode);

  const showGraphOverlay = useSimulationStore(state => state.showGraphOverlay);
  const toggleGraphOverlay = useSimulationStore(state => state.toggleGraphOverlay);
  const showCrowdParticles = useSimulationStore(state => state.showCrowdParticles);
  const toggleCrowdParticles = useSimulationStore(state => state.toggleCrowdParticles);

  const isAlgorithmLabOpen = useSimulationStore(state => state.isAlgorithmLabOpen);
  const setAlgorithmLabOpen = useSimulationStore(state => state.setAlgorithmLabOpen);
  const isMissionPanelOpen = useSimulationStore(state => state.isMissionPanelOpen);
  const setMissionPanelOpen = useSimulationStore(state => state.setMissionPanelOpen);
  const isNetworkEditorOpen = useSimulationStore(state => state.isNetworkEditorOpen);
  const setNetworkEditorOpen = useSimulationStore(state => state.setNetworkEditorOpen);
  const setWelcomeModalOpen = useSimulationStore(state => state.setWelcomeModalOpen);

  return (
    <header
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 'var(--topbar-height)',
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        zIndex: 20,
        background: 'rgba(9, 13, 22, 0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)'
      }}
    >
      {/* Brand Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '34px',
            height: '34px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #f97316, #f59e0b)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 12px rgba(245, 158, 11, 0.6)',
            fontSize: '18px'
          }}
        >
          🚩
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="holy-title" style={{ fontSize: '1.05rem', fontWeight: '800', color: '#fbbf24' }}>
              PANDHARPUR DARSHAN 3D
            </span>
            <span className="badge badge-gold">DAA Sim</span>
          </div>
          <p style={{ fontSize: '0.68rem', color: '#94a3b8', margin: 0, letterSpacing: '0.02em' }}>
            श्री क्षेत्र पंढरपूर तीर्थक्षेत्र व अल्गोरिदम मॉडेलिंग
          </p>
        </div>
      </div>

      {/* Middle: Controls & Toggles */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        {/* Time of Day Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '3px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <button
            className="btn btn-icon"
            style={{ background: timeOfDay === 'day' ? 'rgba(245, 158, 11, 0.25)' : 'transparent', color: timeOfDay === 'day' ? '#fbbf24' : '#94a3b8' }}
            onClick={() => setTimeOfDay('day')}
            title="Day (प्रकाश)"
          >
            <Sun size={15} />
          </button>
          <button
            className="btn btn-icon"
            style={{ background: timeOfDay === 'evening' ? 'rgba(249, 115, 22, 0.25)' : 'transparent', color: timeOfDay === 'evening' ? '#fb923c' : '#94a3b8' }}
            onClick={() => setTimeOfDay('evening')}
            title="Sunset (संध्याकाळ)"
          >
            <Sunset size={15} />
          </button>
          <button
            className="btn btn-icon"
            style={{ background: timeOfDay === 'aarti' ? 'rgba(245, 158, 11, 0.35)' : 'transparent', color: timeOfDay === 'aarti' ? '#f59e0b' : '#94a3b8' }}
            onClick={() => setTimeOfDay('aarti')}
            title="Deep Aarti (आरती)"
          >
            <Flame size={15} />
          </button>
          <button
            className="btn btn-icon"
            style={{ background: timeOfDay === 'night' ? 'rgba(59, 130, 246, 0.25)' : 'transparent', color: timeOfDay === 'night' ? '#60a5fa' : '#94a3b8' }}
            onClick={() => setTimeOfDay('night')}
            title="Night (रात्र)"
          >
            <Moon size={15} />
          </button>
        </div>

        {/* Camera Mode Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '3px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <button
            className="btn btn-icon"
            style={{ background: cameraMode === 'orbit' ? 'rgba(16, 185, 129, 0.2)' : 'transparent', color: cameraMode === 'orbit' ? '#34d399' : '#94a3b8' }}
            onClick={() => setCameraMode('orbit')}
            title="Orbit View"
          >
            <Camera size={15} />
          </button>
          <button
            className="btn btn-icon"
            style={{ background: cameraMode === 'aerial' ? 'rgba(16, 185, 129, 0.2)' : 'transparent', color: cameraMode === 'aerial' ? '#34d399' : '#94a3b8' }}
            onClick={() => setCameraMode('aerial')}
            title="Top-Down Aerial Map"
          >
            <Compass size={15} />
          </button>
          <button
            className="btn btn-icon"
            style={{ background: cameraMode === 'flyover' ? 'rgba(16, 185, 129, 0.2)' : 'transparent', color: cameraMode === 'flyover' ? '#34d399' : '#94a3b8' }}
            onClick={() => setCameraMode('flyover')}
            title="Parikrama Flyover"
          >
            <Eye size={15} />
          </button>
        </div>

        {/* 3D Visual Toggles */}
        <button
          className="btn"
          style={{
            background: showGraphOverlay ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.05)',
            borderColor: showGraphOverlay ? '#10b981' : 'transparent',
            color: showGraphOverlay ? '#34d399' : '#94a3b8'
          }}
          onClick={toggleGraphOverlay}
          title="Toggle 3D Pedestrian Graph Overlay"
        >
          <Code2 size={14} />
          <span>Graph</span>
        </button>

        <button
          className="btn"
          style={{
            background: showCrowdParticles ? 'rgba(249, 115, 22, 0.15)' : 'rgba(255,255,255,0.05)',
            borderColor: showCrowdParticles ? '#f97316' : 'transparent',
            color: showCrowdParticles ? '#fb923c' : '#94a3b8'
          }}
          onClick={toggleCrowdParticles}
          title="Toggle Pilgrim Crowd Simulation"
        >
          <Users size={14} />
          <span>Crowd</span>
        </button>
      </div>

      {/* Right: Modals & Panels */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <button
          className="btn btn-secondary"
          onClick={() => setNetworkEditorOpen(!isNetworkEditorOpen)}
          title="Crowd & Barricades Manager"
        >
          <ShieldAlert size={14} />
          <span>Barricades</span>
        </button>

        <button
          className="btn btn-secondary"
          onClick={() => setMissionPanelOpen(!isMissionPanelOpen)}
          title="Holy Pilgrim Missions"
        >
          <Trophy size={14} />
          <span>Missions</span>
        </button>

        <button
          className="btn btn-primary"
          onClick={() => setAlgorithmLabOpen(!isAlgorithmLabOpen)}
          title="Step-by-Step DAA Algorithm Lab"
        >
          <Code2 size={14} />
          <span>Algorithm Lab</span>
        </button>

        <button
          className="btn btn-icon"
          onClick={() => setWelcomeModalOpen(true)}
          title="Project Guide & Info"
        >
          <Info size={16} />
        </button>
      </div>
    </header>
  );
}
