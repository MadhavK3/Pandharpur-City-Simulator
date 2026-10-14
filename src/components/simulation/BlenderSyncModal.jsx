import React, { useState, useEffect } from 'react';
import { useSimulationStore } from '../../store/simulationStore.js';
import {
  Box,
  Layers,
  RefreshCw,
  FolderOpen,
  CheckCircle2,
  X,
  FileCode,
  Terminal,
  Cpu
} from 'lucide-react';
import { useGLTF } from '@react-three/drei';

export function BlenderSyncModal() {
  const isBlenderModalOpen = useSimulationStore(state => state.isBlenderModalOpen);
  const setBlenderModalOpen = useSimulationStore(state => state.setBlenderModalOpen);
  const blenderSyncEnabled = useSimulationStore(state => state.blenderSyncEnabled);
  const setBlenderSyncEnabled = useSimulationStore(state => state.setBlenderSyncEnabled);
  const activeBlenderOverrides = useSimulationStore(state => state.activeBlenderOverrides);
  const toggleBlenderOverride = useSimulationStore(state => state.toggleBlenderOverride);

  const [vitthalGlbStatus, setVitthalGlbStatus] = useState('checking');
  const [customSceneStatus, setCustomSceneStatus] = useState('checking');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const checkModels = async () => {
    try {
      const vRes = await fetch('/models/vitthal_mandir.glb', { method: 'HEAD' });
      setVitthalGlbStatus(vRes.ok ? 'ready' : 'missing');
    } catch {
      setVitthalGlbStatus('missing');
    }

    try {
      const cRes = await fetch('/models/custom_scene.glb', { method: 'HEAD' });
      setCustomSceneStatus(cRes.ok ? 'ready' : 'missing');
    } catch {
      setCustomSceneStatus('missing');
    }
  };

  useEffect(() => {
    if (isBlenderModalOpen) {
      checkModels();
    }
  }, [isBlenderModalOpen]);

  const handleForceRefresh = () => {
    setIsRefreshing(true);
    try {
      useGLTF.clear('/models/vitthal_mandir.glb');
      useGLTF.clear('/models/custom_scene.glb');
    } catch (e) {
      // Ignore
    }

    // Trigger timestamp update via custom event
    if (typeof window !== 'undefined' && window.dispatchEvent) {
      window.dispatchEvent(new CustomEvent('blender-manual-refresh'));
    }

    setTimeout(() => {
      checkModels();
      setIsRefreshing(false);
    }, 400);
  };

  if (!isBlenderModalOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        background: 'rgba(5, 8, 15, 0.85)',
        backdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '640px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '28px',
          borderRadius: '16px',
          border: '1px solid rgba(249, 115, 22, 0.4)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.85), 0 0 30px rgba(249, 115, 22, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #f97316, #ea580c)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 12px rgba(249, 115, 22, 0.5)'
              }}
            >
              <Box size={20} color="#090d16" />
            </div>
            <div>
              <h2 className="holy-title" style={{ fontSize: '1.25rem', color: '#f8fafc', margin: 0 }}>
                Blender Live Sync & 3D Bridge
              </h2>
              <p style={{ fontSize: '0.72rem', color: '#94a3b8', margin: 0 }}>
                Direct synchronization between Blender 3D and Pandharpur Simulator
              </p>
            </div>
          </div>
          <button
            onClick={() => setBlenderModalOpen(false)}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '8px',
              padding: '6px',
              color: '#94a3b8',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Status Pill */}
        <div
          style={{
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: '10px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: '#10b981',
                boxShadow: '0 0 12px #10b981'
              }}
            />
            <div>
              <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#34d399' }}>
                Live Sync Engine Active
              </div>
              <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>
                Saving (Ctrl+S) in Blender will automatically update the 3D scene in real-time.
              </div>
            </div>
          </div>
          <button
            onClick={() => setBlenderSyncEnabled(!blenderSyncEnabled)}
            style={{
              background: blenderSyncEnabled ? '#10b981' : 'rgba(255, 255, 255, 0.1)',
              color: blenderSyncEnabled ? '#090d16' : '#94a3b8',
              border: 'none',
              borderRadius: '6px',
              padding: '5px 12px',
              fontSize: '0.72rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            {blenderSyncEnabled ? 'SYNC ON' : 'SYNC OFF'}
          </button>
        </div>

        {/* Model Overrides List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#fbbf24', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Synchronized Models
          </div>

          {/* Model 1: Shree Vitthal-Rukmini Mandir */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Layers size={18} color="#f59e0b" />
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: '700', color: '#f8fafc' }}>
                  Shree Vitthal-Rukmini Mandir
                </div>
                <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                  Source: blender/vitthal_mandir.blend | Target: public/models/vitthal_mandir.glb
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '0.65rem',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: vitthalGlbStatus === 'ready' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  color: vitthalGlbStatus === 'ready' ? '#34d399' : '#f87171',
                  border: `1px solid ${vitthalGlbStatus === 'ready' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(239, 68, 68, 0.4)'}`
                }}
              >
                {vitthalGlbStatus === 'ready' ? 'GLB Ready' : 'GLB Missing'}
              </span>
              <button
                onClick={() => toggleBlenderOverride('VITTHAL_RUKMINI_MANDIR')}
                style={{
                  background: activeBlenderOverrides.VITTHAL_RUKMINI_MANDIR ? '#f97316' : 'rgba(255, 255, 255, 0.08)',
                  color: activeBlenderOverrides.VITTHAL_RUKMINI_MANDIR ? '#090d16' : '#94a3b8',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '5px 10px',
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {activeBlenderOverrides.VITTHAL_RUKMINI_MANDIR ? 'Blender Model' : 'Procedural'}
              </button>
            </div>
          </div>

          {/* Model 2: Custom City Scene */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '10px',
              padding: '12px 14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Box size={18} color="#38bdf8" />
              <div>
                <div style={{ fontSize: '0.84rem', fontWeight: '700', color: '#f8fafc' }}>
                  Custom City Assets & Environment
                </div>
                <div style={{ fontSize: '0.68rem', color: '#64748b' }}>
                  Source: blender/custom_scene.blend | Target: public/models/custom_scene.glb
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontSize: '0.65rem',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  background: customSceneStatus === 'ready' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(100, 116, 139, 0.2)',
                  color: customSceneStatus === 'ready' ? '#34d399' : '#94a3b8',
                  border: `1px solid ${customSceneStatus === 'ready' ? 'rgba(16, 185, 129, 0.4)' : 'rgba(100, 116, 139, 0.4)'}`
                }}
              >
                {customSceneStatus === 'ready' ? 'GLB Ready' : 'Empty / Optional'}
              </span>
              <button
                onClick={() => toggleBlenderOverride('custom_scene')}
                style={{
                  background: activeBlenderOverrides.custom_scene ? '#38bdf8' : 'rgba(255, 255, 255, 0.08)',
                  color: activeBlenderOverrides.custom_scene ? '#090d16' : '#94a3b8',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '5px 10px',
                  fontSize: '0.7rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {activeBlenderOverrides.custom_scene ? 'Active' : 'Muted'}
              </button>
            </div>
          </div>
        </div>

        {/* How it Works Guide */}
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.3)',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            padding: '14px'
          }}
        >
          <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#e2e8f0', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FileCode size={14} color="#f97316" />
            <span>How to Work in Blender</span>
          </div>
          <ol style={{ fontSize: '0.72rem', color: '#94a3b8', paddingLeft: '18px', margin: 0, display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <li>
              Open <code style={{ color: '#fbbf24' }}>blender/vitthal_mandir.blend</code> in Blender 5.2.
            </li>
            <li>
              Sculpt, edit geometry, add materials, or place new structures.
            </li>
            <li>
              Press <kbd style={{ background: '#1e293b', border: '1px solid #475569', borderRadius: '4px', padding: '1px 5px', color: '#f8fafc' }}>Ctrl + S</kbd> to save.
            </li>
            <li>
              The embedded auto-export script exports to GLB and Vite live-reloads the 3D scene in real-time.
            </li>
          </ol>
        </div>

        {/* Bottom Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px' }}>
          <button
            onClick={handleForceRefresh}
            disabled={isRefreshing}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderRadius: '8px',
              padding: '8px 14px',
              color: '#f8fafc',
              fontSize: '0.75rem',
              fontWeight: '600',
              cursor: 'pointer'
            }}
          >
            <RefreshCw size={13} className={isRefreshing ? 'animate-spin' : ''} />
            <span>{isRefreshing ? 'Refreshing...' : 'Force Reload Models'}</span>
          </button>

          <button
            onClick={() => setBlenderModalOpen(false)}
            className="topbar-btn topbar-btn-primary"
            style={{ padding: '8px 20px', fontSize: '0.78rem', fontWeight: '700' }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

