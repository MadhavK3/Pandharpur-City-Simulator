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
  Info,
  Navigation,
  Footprints,
  MapPin,
  Sparkles
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
  const bloomEnabled = useSimulationStore(state => state.bloomEnabled);
  const toggleBloom = useSimulationStore(state => state.toggleBloom);

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
        padding: '0 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        zIndex: 25,
        background: 'rgba(9, 13, 22, 0.94)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(245, 158, 11, 0.25)',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)',
        overflowX: 'auto',
        overflowY: 'hidden'
      }}
    >
      {/* Brand Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
        <div
          style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #f97316, #f59e0b)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 10px rgba(245, 158, 11, 0.5)',
            flexShrink: 0
          }}
        >
          <Navigation size={17} color="#090d16" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
            <span className="holy-title" style={{ fontSize: '0.92rem', fontWeight: '800', color: '#fbbf24', letterSpacing: '0.03em', lineHeight: 1.2 }}>
              PANDHARPUR DARSHAN 3D
            </span>
            <span className="badge badge-gold" style={{ fontSize: '0.6rem', padding: '1px 5px', height: '16px' }}>DAA Sim</span>
          </div>
          <p style={{ fontSize: '0.62rem', color: '#94a3b8', margin: 0, letterSpacing: '0.02em', whiteSpace: 'nowrap', lineHeight: 1.2 }}>
            Pandharpur Heritage and Algorithm Modeling
          </p>
        </div>
      </div>

      {/* Middle: Controls & Toggles */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        {/* Time of Day Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '2px',
            borderRadius: '7px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <button
            className="btn btn-icon"
            style={{ padding: '4px 6px', background: timeOfDay === 'day' ? 'rgba(245, 158, 11, 0.25)' : 'transparent', color: timeOfDay === 'day' ? '#fbbf24' : '#94a3b8' }}
            onClick={() => setTimeOfDay('day')}
            title="Day lighting"
          >
            <Sun size={14} />
          </button>
          <button
            className="btn btn-icon"
            style={{ padding: '4px 6px', background: timeOfDay === 'evening' ? 'rgba(249, 115, 22, 0.25)' : 'transparent', color: timeOfDay === 'evening' ? '#fb923c' : '#94a3b8' }}
            onClick={() => setTimeOfDay('evening')}
            title="Sunset lighting"
          >
            <Sunset size={14} />
          </button>
          <button
            className="btn btn-icon"
            style={{ padding: '4px 6px', background: timeOfDay === 'aarti' ? 'rgba(245, 158, 11, 0.35)' : 'transparent', color: timeOfDay === 'aarti' ? '#f59e0b' : '#94a3b8' }}
            onClick={() => setTimeOfDay('aarti')}
            title="Deep Aarti lighting"
          >
            <Flame size={14} />
          </button>
          <button
            className="btn btn-icon"
            style={{ padding: '4px 6px', background: timeOfDay === 'night' ? 'rgba(59, 130, 246, 0.25)' : 'transparent', color: timeOfDay === 'night' ? '#60a5fa' : '#94a3b8' }}
            onClick={() => setTimeOfDay('night')}
            title="Night lighting"
          >
            <Moon size={14} />
          </button>
        </div>

        {/* Camera Mode Switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '2px',
            borderRadius: '7px',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <button
            className="btn btn-icon"
            style={{ padding: '4px 6px', background: cameraMode === 'orbit' ? 'rgba(16, 185, 129, 0.2)' : 'transparent', color: cameraMode === 'orbit' ? '#34d399' : '#94a3b8' }}
            onClick={() => setCameraMode('orbit')}
            title="Orbit View"
          >
            <Camera size={14} />
          </button>
          <button
            className="btn btn-icon"
            style={{ padding: '4px 6px', background: cameraMode === 'aerial' ? 'rgba(16, 185, 129, 0.2)' : 'transparent', color: cameraMode === 'aerial' ? '#34d399' : '#94a3b8' }}
            onClick={() => setCameraMode('aerial')}
            title="Top-Down Aerial Map"
          >
            <Compass size={14} />
          </button>
          <button
            className="btn btn-icon"
            style={{ padding: '4px 6px', background: cameraMode === 'ground' ? 'rgba(16, 185, 129, 0.2)' : 'transparent', color: cameraMode === 'ground' ? '#34d399' : '#94a3b8' }}
            onClick={() => setCameraMode('ground')}
            title="Ground-Level Pedestrian Walk (WASD / Touch)"
          >
            <Footprints size={14} />
          </button>
          <button
            className="btn btn-icon"
            style={{ padding: '4px 6px', background: cameraMode === 'guided_tour' ? 'rgba(245, 158, 11, 0.25)' : 'transparent', color: cameraMode === 'guided_tour' ? '#fbbf24' : '#94a3b8' }}
            onClick={() => setCameraMode('guided_tour')}
            title="Cinematic Pilgrimage Guided Tour"
          >
            <MapPin size={14} />
          </button>
          <button
            className="btn btn-icon"
            style={{ padding: '4px 6px', background: cameraMode === 'flyover' ? 'rgba(16, 185, 129, 0.2)' : 'transparent', color: cameraMode === 'flyover' ? '#34d399' : '#94a3b8' }}
            onClick={() => setCameraMode('flyover')}
            title="Parikrama Flyover"
          >
            <Eye size={14} />
          </button>
        </div>

        {/* 3D Visual Toggles */}
        <button
          className="topbar-btn"
          style={{
            background: showGraphOverlay ? 'rgba(16, 185, 129, 0.15)' : 'rgba(255,255,255,0.05)',
            borderColor: showGraphOverlay ? '#10b981' : 'transparent',
            color: showGraphOverlay ? '#34d399' : '#94a3b8'
          }}
          onClick={toggleGraphOverlay}
          title="Toggle 3D Pedestrian Graph Overlay"
        >
          <Code2 size={13} />
          <span>Graph</span>
        </button>

        <button
          className="topbar-btn"
          style={{
            background: showCrowdParticles ? 'rgba(249, 115, 22, 0.15)' : 'rgba(255,255,255,0.05)',
            borderColor: showCrowdParticles ? '#f97316' : 'transparent',
            color: showCrowdParticles ? '#fb923c' : '#94a3b8'
          }}
          onClick={toggleCrowdParticles}
          title="Toggle Pilgrim Crowd Simulation"
        >
          <Users size={13} />
          <span>Crowd</span>
        </button>

        <button
          className="topbar-btn"
          style={{
            background: bloomEnabled ? 'rgba(251, 191, 36, 0.15)' : 'rgba(255,255,255,0.05)',
            borderColor: bloomEnabled ? '#fbbf24' : 'transparent',
            color: bloomEnabled ? '#fbbf24' : '#94a3b8'
          }}
          onClick={toggleBloom}
          title="Toggle Cinematic Divine Bloom and Atmosphere"
        >
          <Sparkles size={13} />
          <span>Bloom</span>
        </button>
      </div>

      {/* Right: Modals & Panels */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
        <button
          className="topbar-btn"
          style={{
            background: isNetworkEditorOpen ? 'rgba(239, 68, 68, 0.25)' : 'rgba(255, 255, 255, 0.05)',
            borderColor: isNetworkEditorOpen ? '#ef4444' : 'rgba(255, 255, 255, 0.1)',
            color: isNetworkEditorOpen ? '#f87171' : '#94a3b8'
          }}
          onClick={() => setNetworkEditorOpen(!isNetworkEditorOpen)}
          title="Crowd and Barricades Manager"
        >
          <ShieldAlert size={13} />
          <span>Barricades</span>
        </button>

        <button
          className="topbar-btn"
          style={{
            background: isMissionPanelOpen ? 'rgba(245, 158, 11, 0.25)' : 'rgba(255, 255, 255, 0.05)',
            borderColor: isMissionPanelOpen ? '#f59e0b' : 'rgba(255, 255, 255, 0.1)',
            color: isMissionPanelOpen ? '#fbbf24' : '#94a3b8'
          }}
          onClick={() => setMissionPanelOpen(!isMissionPanelOpen)}
          title="Pilgrim Simulation Missions"
        >
          <Trophy size={13} />
          <span>Missions</span>
        </button>

        <button
          className={isAlgorithmLabOpen ? 'topbar-btn topbar-btn-primary' : 'topbar-btn topbar-btn-secondary'}
          onClick={() => setAlgorithmLabOpen(!isAlgorithmLabOpen)}
          title="Step-by-Step DAA Algorithm Lab"
        >
          <Code2 size={13} />
          <span>Algorithm Lab</span>
        </button>

        <button
          className="btn-icon"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            color: '#94a3b8',
            cursor: 'pointer',
            padding: '5px'
          }}
          onClick={() => setWelcomeModalOpen(true)}
          title="Project Guide and Info"
        >
          <Info size={15} />
        </button>
      </div>
    </header>
  );
}
