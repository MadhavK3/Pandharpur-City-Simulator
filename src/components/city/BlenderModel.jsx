import React, { useState, useEffect, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { useGLTF } from '@react-three/drei';
import { useSimulationStore } from '../../store/simulationStore.js';

function LoadedGLTFModel({ url, version, position, rotation, scale, onClick, onPointerOver, onPointerOut }) {
  const fullUrl = version ? `${url}?v=${version}` : url;
  const { scene } = useGLTF(fullUrl);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        if (child.material) {
          child.material = child.material.clone();
          child.material.needsUpdate = true;
        }
      }
    });
    return clone;
  }, [scene, version]);

  return (
    <primitive
      object={clonedScene}
      position={position}
      rotation={rotation}
      scale={scale}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    />
  );
}

export function BlenderModel({
  src,
  modelName,
  fallback = null,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
  onClick,
  onPointerOver,
  onPointerOut
}) {
  const blenderSyncEnabled = useSimulationStore(state => state.blenderSyncEnabled);
  const activeBlenderOverrides = useSimulationStore(state => state.activeBlenderOverrides);
  const isOverridden = activeBlenderOverrides[modelName] ?? true;

  const [isAvailable, setIsAvailable] = useState(false);
  const [version, setVersion] = useState(1);

  // Check file availability on mount and upon update
  useEffect(() => {
    let isMounted = true;
    async function checkAvailability() {
      try {
        const res = await fetch(src, { method: 'HEAD' });
        if (isMounted) {
          setIsAvailable(res.ok);
        }
      } catch (err) {
        if (isMounted) {
          setIsAvailable(false);
        }
      }
    }
    checkAvailability();
    return () => {
      isMounted = false;
    };
  }, [src, version]);

  // Listen to Vite HMR model update events
  useEffect(() => {
    if (typeof window !== 'undefined' && import.meta.hot) {
      const handleModelUpdate = (data) => {
        const expectedFile = src.split('/').pop();
        if (data && (data.modelName === expectedFile || data.modelName === `${modelName}.glb`)) {
          console.log(`[Blender Live Sync] Live refreshing model: ${data.modelName}`);
          // Invalidate Drei cached model
          try {
            useGLTF.clear(src);
            if (version) {
              useGLTF.clear(`${src}?v=${version}`);
            }
          } catch (e) {
            // Ignore clear errors
          }
          setVersion(data.timestamp || Date.now());
          setIsAvailable(true);
        }
      };

      import.meta.hot.on('blender:model-updated', handleModelUpdate);
      return () => {
        import.meta.hot.off('blender:model-updated', handleModelUpdate);
      };
    }
  }, [src, modelName, version]);

  if (!blenderSyncEnabled || !isOverridden || !isAvailable) {
    return fallback;
  }

  return (
    <Suspense fallback={fallback}>
      <LoadedGLTFModel
        url={src}
        version={version}
        position={position}
        rotation={rotation}
        scale={scale}
        onClick={onClick}
        onPointerOver={onPointerOver}
        onPointerOut={onPointerOut}
      />
    </Suspense>
  );
}

export function CustomBlenderScene() {
  const blenderSyncEnabled = useSimulationStore(state => state.blenderSyncEnabled);
  const activeBlenderOverrides = useSimulationStore(state => state.activeBlenderOverrides);
  const isCustomSceneActive = activeBlenderOverrides.custom_scene ?? true;

  const [isAvailable, setIsAvailable] = useState(false);
  const [version, setVersion] = useState(1);

  useEffect(() => {
    let isMounted = true;
    async function check() {
      try {
        const res = await fetch('/models/custom_scene.glb', { method: 'HEAD' });
        if (isMounted) {
          setIsAvailable(res.ok);
        }
      } catch (e) {
        if (isMounted) setIsAvailable(false);
      }
    }
    check();
    return () => {
      isMounted = false;
    };
  }, [version]);

  useEffect(() => {
    if (typeof window !== 'undefined' && import.meta.hot) {
      const handleUpdate = (data) => {
        if (data && data.modelName === 'custom_scene.glb') {
          try {
            useGLTF.clear('/models/custom_scene.glb');
          } catch (e) {
            // Ignore
          }
          setVersion(data.timestamp || Date.now());
          setIsAvailable(true);
        }
      };
      import.meta.hot.on('blender:model-updated', handleUpdate);
      return () => {
        import.meta.hot.off('blender:model-updated', handleUpdate);
      };
    }
  }, []);

  if (!blenderSyncEnabled || !isCustomSceneActive || !isAvailable) {
    return null;
  }

  return (
    <Suspense fallback={null}>
      <LoadedGLTFModel
        url="/models/custom_scene.glb"
        version={version}
        position={[0, 0, 0]}
        rotation={[0, 0, 0]}
        scale={[1, 1, 1]}
      />
    </Suspense>
  );
}

