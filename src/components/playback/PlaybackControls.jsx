import React, { useEffect } from 'react';
import { useSimulationStore } from '../../store/simulationStore.js';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Zap,
  Activity
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

  return (
    <div
      className="glass-panel"
      style={{
        position: 'absolute',
        bottom: '16px',
        left: 'calc(var(--sidebar-width) + 24px)',
        right: '24px',
        zIndex: 15,
        padding: '12px 18px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        border: '1px solid rgba(245, 158, 11, 0.3)'
      }}
    >
      {/* Top line: Current Step Description narrative */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
          <Activity size={16} color="#fbbf24" />
          <span style={{ fontSize: '0.78rem', fontWeight: '700', color: '#fbbf24' }}>
            Step {activeStepIndex + 1} of {steps.length}:
          </span>
          <span
            style={{
              fontSize: '0.78rem',
              color: '#f8fafc',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {currentStep.description || 'Execution in progress...'}
          </span>
        </div>

        {/* Speed Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {[0.5, 1.0, 2.0, 4.0].map(s => (
            <button
              key={`speed_${s}`}
              className="btn btn-icon"
              style={{
                fontSize: '0.68rem',
                fontWeight: '700',
                padding: '2px 6px',
                background: playbackSpeed === s ? 'rgba(245, 158, 11, 0.3)' : 'rgba(255,255,255,0.05)',
                color: playbackSpeed === s ? '#fbbf24' : '#94a3b8'
              }}
              onClick={() => setPlaybackSpeed(s)}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Timeline Slider & Action Buttons */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Step Backward */}
        <button
          className="btn btn-icon"
          onClick={stepBackward}
          disabled={activeStepIndex === 0}
          title="Step Backward"
        >
          <SkipBack size={15} />
        </button>

        {/* Play/Pause */}
        <button
          className="btn btn-primary btn-icon"
          style={{ width: '32px', height: '32px', borderRadius: '50%' }}
          onClick={togglePlay}
          title={isPlaying ? 'Pause' : 'Auto Play'}
        >
          {isPlaying ? <Pause size={15} /> : <Play size={15} />}
        </button>

        {/* Step Forward */}
        <button
          className="btn btn-icon"
          onClick={stepForward}
          disabled={activeStepIndex >= steps.length - 1}
          title="Step Forward"
        >
          <SkipForward size={15} />
        </button>

        {/* Reset to Start */}
        <button
          className="btn btn-icon"
          onClick={() => setStepIndex(0)}
          title="Reset to Step 1"
        >
          <RotateCcw size={14} />
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
        <span className="mono-font" style={{ fontSize: '0.72rem', color: '#94a3b8', minWidth: '42px', textAlign: 'right' }}>
          {Math.round(((activeStepIndex + 1) / steps.length) * 100)}%
        </span>
      </div>
    </div>
  );
}
