import React, { useRef, useState } from 'react';
import { useSimulationStore, GUIDED_TOUR_STOPS } from '../../store/simulationStore.js';
import {
  Compass,
  Footprints,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  X,
  Navigation,
  Eye
} from 'lucide-react';

export function GroundControlsUI() {
  const cameraMode = useSimulationStore(state => state.cameraMode);
  const setCameraMode = useSimulationStore(state => state.setCameraMode);

  const guidedTourActive = useSimulationStore(state => state.guidedTourActive);
  const guidedTourIndex = useSimulationStore(state => state.guidedTourIndex);
  const isTourPaused = useSimulationStore(state => state.isTourPaused);
  const nextTourStop = useSimulationStore(state => state.nextTourStop);
  const prevTourStop = useSimulationStore(state => state.prevTourStop);
  const toggleTourPause = useSimulationStore(state => state.toggleTourPause);
  const stopGuidedTour = useSimulationStore(state => state.stopGuidedTour);

  const setMoveJoystickVector = useSimulationStore(state => state.setMoveJoystickVector);

  const [joystickActive, setJoystickActive] = useState(false);
  const joystickCenter = useRef({ x: 0, y: 0 });
  const [knobOffset, setKnobOffset] = useState({ x: 0, y: 0 });

  const currentTourStop = GUIDED_TOUR_STOPS[guidedTourIndex] || GUIDED_TOUR_STOPS[0];

  // Touch joystick handlers for mobile
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    joystickCenter.current = { x: cx, y: cy };
    setJoystickActive(true);
  };

  const handleTouchMove = (e) => {
    if (!joystickActive) return;
    const touch = e.touches[0];
    const dx = touch.clientX - joystickCenter.current.x;
    const dy = touch.clientY - joystickCenter.current.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const maxDist = 38;

    const angle = Math.atan2(dy, dx);
    const clampedDist = Math.min(dist, maxDist);

    const nx = Math.cos(angle) * clampedDist;
    const ny = Math.sin(angle) * clampedDist;

    setKnobOffset({ x: nx, y: ny });
    setMoveJoystickVector({ x: nx / maxDist, y: ny / maxDist });
  };

  const handleTouchEnd = () => {
    setJoystickActive(false);
    setKnobOffset({ x: 0, y: 0 });
    setMoveJoystickVector({ x: 0, y: 0 });
  };

  // Only render when in ground mode or guided tour
  if (cameraMode !== 'ground' && cameraMode !== 'guided_tour') {
    return null;
  }

  return (
    <>
      {/* 1. GUIDED PILGRIMAGE TOUR DOCK */}
      {cameraMode === 'guided_tour' && guidedTourActive && (
        <div
          className="slide-in-bottom"
          style={{
            position: 'absolute',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'min(580px, calc(100vw - 32px))',
            background: 'rgba(9, 13, 22, 0.94)',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(245, 158, 11, 0.5)',
            borderRadius: '16px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.85)',
            padding: '16px 20px',
            zIndex: 35,
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          {/* Header & Step progress */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Compass size={18} color="#fbbf24" />
              <span style={{ fontSize: '0.8rem', fontWeight: '700', color: '#fbbf24', letterSpacing: '0.04em' }}>
                PILGRIMAGE GUIDED TOUR
              </span>
              <span className="badge badge-gold" style={{ fontSize: '0.65rem' }}>
                Stop {guidedTourIndex + 1} of {GUIDED_TOUR_STOPS.length}
              </span>
            </div>
            <button
              className="btn btn-icon"
              onClick={stopGuidedTour}
              style={{ padding: '4px', color: '#94a3b8' }}
              title="Exit Guided Tour"
            >
              <X size={16} />
            </button>
          </div>

          {/* Current Stop Content */}
          <div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
              <h3 style={{ margin: 0, fontSize: '1.05rem', color: '#f8fafc', fontWeight: '800' }}>
                {currentTourStop.title}
              </h3>
              <span style={{ fontSize: '0.85rem', color: '#f59e0b', fontWeight: '600' }}>
                {currentTourStop.marathi}
              </span>
            </div>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#cbd5e1', lineHeight: '1.4' }}>
              {currentTourStop.description}
            </p>
          </div>

          {/* Navigation Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '4px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              {GUIDED_TOUR_STOPS.map((s, idx) => (
                <div
                  key={s.id}
                  style={{
                    width: idx === guidedTourIndex ? '20px' : '6px',
                    height: '6px',
                    borderRadius: '3px',
                    background: idx === guidedTourIndex ? '#fbbf24' : 'rgba(255, 255, 255, 0.2)',
                    transition: 'all 0.25s ease'
                  }}
                />
              ))}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                className="btn btn-secondary"
                onClick={prevTourStop}
                style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                title="Previous Landmark"
              >
                <SkipBack size={14} />
                <span>Prev</span>
              </button>

              <button
                className="btn btn-primary"
                onClick={toggleTourPause}
                style={{ padding: '6px 14px', fontSize: '0.78rem' }}
                title={isTourPaused ? 'Resume Auto Tour' : 'Pause Tour'}
              >
                {isTourPaused ? <Play size={14} /> : <Pause size={14} />}
                <span>{isTourPaused ? 'Play' : 'Pause'}</span>
              </button>

              <button
                className="btn btn-secondary"
                onClick={nextTourStop}
                style={{ padding: '6px 10px', fontSize: '0.78rem' }}
                title="Next Landmark"
              >
                <span>Next</span>
                <SkipForward size={14} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. GROUND-LEVEL WALK EXPLORATION HUD */}
      {cameraMode === 'ground' && (
        <>
          {/* Top Info Banner */}
          <div
            style={{
              position: 'absolute',
              top: 'calc(var(--topbar-height) + 16px)',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(9, 13, 22, 0.88)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(245, 158, 11, 0.4)',
              borderRadius: '24px',
              padding: '6px 18px',
              zIndex: 35,
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.6)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Footprints size={15} color="#34d399" />
              <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#f8fafc' }}>
                Ground Exploration (1.7m)
              </span>
            </div>
            <span style={{ fontSize: '0.74rem', color: '#94a3b8' }}>
              WASD or Arrows to walk | Drag to look around
            </span>
            <button
              className="btn btn-secondary"
              onClick={() => setCameraMode('orbit')}
              style={{ padding: '3px 10px', fontSize: '0.72rem', borderRadius: '16px' }}
              title="Return to Orbit View"
            >
              <X size={12} />
              <span>Exit (Esc)</span>
            </button>
          </div>

          {/* On-Screen Mobile Virtual Touch Joystick */}
          <div
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{
              position: 'absolute',
              bottom: '36px',
              left: '36px',
              width: '96px',
              height: '96px',
              borderRadius: '50%',
              background: 'rgba(15, 23, 42, 0.75)',
              border: '2px solid rgba(245, 158, 11, 0.5)',
              backdropFilter: 'blur(8px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 35,
              touchAction: 'none',
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.6)'
            }}
          >
            {/* Joystick Knob */}
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                boxShadow: '0 0 14px rgba(245, 158, 11, 0.7)',
                transform: `translate(${knobOffset.x}px, ${knobOffset.y}px)`,
                transition: joystickActive ? 'none' : 'transform 0.15s ease-out'
              }}
            />
          </div>
        </>
      )}
    </>
  );
}

export default GroundControlsUI;

