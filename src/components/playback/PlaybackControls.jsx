import React, { useEffect } from 'react';
import { useSimulationStore } from '../../store/simulationStore.js';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Activity,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

export function PlaybackControls() {
  const routeResult = useSimulationStore(state => state.routeResult);
  const activeStepIndex = useSimulationStore(state => state.activeStepIndex);
  const setStepIndex = useSimulationStore(state => state.setStepIndex);
  const stepForward = useSimulationStore(state => state.stepForward);
  const stepBackward = useSimulationStore(state => state.stepBackward);
  const isPlaying = useSimulationStore(state => state.isPlaying);
  const togglePlay = useSimulationStore(state => state.togglePlay);
  const playbackSpeed = useSimulationStore(state => state.playbackSpeed);
  const setPlaybackSpeed = useSimulationStore(state => state.setPlaybackSpeed);

  const isSidebarOpen = useSimulationStore(state => state.isSidebarOpen);
  const isPlaybackMinimized = useSimulationStore(state => state.isPlaybackMinimized);
  const togglePlaybackMinimized = useSimulationStore(state => state.togglePlaybackMinimized);

  const steps = routeResult?.steps || [];
  const currentStep = steps[activeStepIndex] || {};

  // Handle auto-play timer
  useEffect(() => {
    let interval = null;
    if (isPlaying && steps.length > 0) {
      interval = setInterval(() => {
        const nextIdx = activeStepIndex + 1;
        if (nextIdx < steps.length) {
          setStepIndex(nextIdx);
        } else {
          togglePlay(); // stop at end
        }
      }, 800 / playbackSpeed);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, activeStepIndex, steps.length, playbackSpeed, setStepIndex, togglePlay]);

  if (!steps.length) return null;

  const dockLeftPosition = isSidebarOpen ? 'calc(50% + 80px)' : '50%';

  if (isPlaybackMinimized) {
    return (
      <div
        className="glass-panel slide-in-up"
        style={{
          position: 'absolute',
          bottom: '16px',
          left: dockLeftPosition,
          transform: 'translateX(-50%)',
          zIndex: 15,
          padding: '6px 14px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          border: '1px solid rgba(245, 158, 11, 0.35)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.65)'
        }}
      >
        <button
          className="btn btn-primary btn-icon"
          style={{ width: '28px', height: '28px', borderRadius: '50%' }}
          onClick={togglePlay}
          title={isPlaying ? 'Pause' : 'Play'}
        >
          {isPlaying ? <Pause size={13} /> : <Play size={13} />}
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Activity size={14} color="#fbbf24" />
          <span style={{ fontSize: '0.74rem', fontWeight: '700', color: '#fbbf24' }}>
            Step {activeStepIndex + 1}/{steps.length}
          </span>
          <span style={{ fontSize: '0.72rem', color: '#cbd5e1', maxWidth: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {currentStep.description || 'Simulating'}
          </span>
        </div>
        <button
          className="btn btn-icon"
          onClick={togglePlaybackMinimized}
          style={{ padding: '3px', color: '#94a3b8' }}
          title="Expand timeline controls"
        >
          <ChevronUp size={15} />
        </button>
      </div>
    );
  }

  return (
    <div
      className="glass-panel slide-in-up"
      style={{
        position: 'absolute',
        bottom: '16px',
        left: dockLeftPosition,
        transform: 'translateX(-50%)',
        width: 'min(660px, calc(100vw - 32px))',
        zIndex: 15,
        padding: '10px 16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        border: '1px solid rgba(245, 158, 11, 0.35)',
        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.7)'
      }}
    >
      {/* Top line: Current Step Description narrative */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden', flex: 1 }}>
          <Activity size={15} color="#fbbf24" style={{ flexShrink: 0 }} />
          <span style={{ fontSize: '0.74rem', fontWeight: '700', color: '#fbbf24', flexShrink: 0 }}>
            Step {activeStepIndex + 1} of {steps.length}:
          </span>
          <span
            style={{
              fontSize: '0.74rem',
              color: '#f8fafc',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {currentStep.description || 'Execution in progress...'}
          </span>
        </div>

        {/* Speed Selector & Minimize */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexShrink: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
            {[0.5, 1.0, 2.0, 4.0].map(s => (
              <button
                key={`speed_${s}`}
                className="btn btn-icon"
                style={{
                  fontSize: '0.66rem',
                  fontWeight: '700',
                  padding: '2px 5px',
                  background: playbackSpeed === s ? 'rgba(245, 158, 11, 0.3)' : 'rgba(255,255,255,0.05)',
                  color: playbackSpeed === s ? '#fbbf24' : '#94a3b8'
                }}
                onClick={() => setPlaybackSpeed(s)}
              >
                {s}x
              </button>
            ))}
          </div>
          <button
            className="btn btn-icon"
            onClick={togglePlaybackMinimized}
            style={{ padding: '3px', color: '#94a3b8' }}
            title="Minimize timeline dock"
          >
            <ChevronDown size={15} />
          </button>
        </div>
      </div>

      {/* Timeline Slider & Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Step Backward */}
        <button
          className="btn btn-icon"
          onClick={stepBackward}
          disabled={activeStepIndex === 0}
          title="Step Backward"
          style={{ padding: '5px' }}
        >
          <SkipBack size={14} />
        </button>

        {/* Play/Pause */}
        <button
          className="btn btn-primary btn-icon"
          style={{ width: '30px', height: '30px', borderRadius: '50%' }}
          onClick={togglePlay}
          title={isPlaying ? 'Pause' : 'Auto Play'}
        >
          {isPlaying ? <Pause size={14} /> : <Play size={14} />}
        </button>

        {/* Step Forward */}
        <button
          className="btn btn-icon"
          onClick={stepForward}
          disabled={activeStepIndex >= steps.length - 1}
          title="Step Forward"
          style={{ padding: '5px' }}
        >
          <SkipForward size={14} />
        </button>

        {/* Reset to Start */}
        <button
          className="btn btn-icon"
          onClick={() => setStepIndex(0)}
          title="Reset to Step 1"
          style={{ padding: '5px' }}
        >
          <RotateCcw size={13} />
        </button>

        {/* Scrubber Range Bar */}
        <input
          type="range"
          min="0"
          max={steps.length - 1}
          value={activeStepIndex}
          onChange={(e) => setStepIndex(parseInt(e.target.value, 10))}
          style={{
            flex: 1,
            accentColor: '#f59e0b',
            cursor: 'pointer'
          }}
        />

        {/* Progress Percentage Badge */}
        <span className="mono-font" style={{ fontSize: '0.7rem', color: '#94a3b8', minWidth: '38px', textAlign: 'right' }}>
          {Math.round(((activeStepIndex + 1) / steps.length) * 100)}%
        </span>
      </div>
    </div>
  );
}
