import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useSimulationStore } from '../../store/simulationStore.js';

export function CameraController() {
  const controlsRef = useRef();
  const { camera } = useThree();
  const cameraMode = useSimulationStore(state => state.cameraMode);
  const focusedCoordinates = useSimulationStore(state => state.focusedCoordinates);

  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetCamPos = useRef(new THREE.Vector3(0, 95, 140));
  const isTransitioning = useRef(false);

  useEffect(() => {
    if (cameraMode === 'landmark' && focusedCoordinates) {
      targetLookAt.current.set(focusedCoordinates[0], focusedCoordinates[1], focusedCoordinates[2]);
      targetCamPos.current.set(
        focusedCoordinates[0] + 36,
        focusedCoordinates[1] + 32,
        focusedCoordinates[2] + 48
      );
      isTransitioning.current = true;
    } else if (cameraMode === 'aerial') {
      targetLookAt.current.set(0, 0, 0);
      targetCamPos.current.set(0, 260, 5);
      isTransitioning.current = true;
    } else if (cameraMode === 'orbit') {
      targetLookAt.current.set(0, 0, 0);
      targetCamPos.current.set(0, 95, 140);
      isTransitioning.current = true;
    }
  }, [cameraMode, focusedCoordinates]);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

    if (cameraMode === 'flyover') {
      controlsRef.current.autoRotate = true;
      controlsRef.current.autoRotateSpeed = 0.6;
    } else {
      controlsRef.current.autoRotate = false;

      // Only interpolate during active transition until settled
      if (isTransitioning.current) {
        controlsRef.current.target.lerp(targetLookAt.current, delta * 3.0);
        camera.position.lerp(targetCamPos.current, delta * 3.0);

        if (
          camera.position.distanceTo(targetCamPos.current) < 1.0 &&
          controlsRef.current.target.distanceTo(targetLookAt.current) < 0.5
        ) {
          isTransitioning.current = false;
        }
      }
    }

    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      maxPolarAngle={Math.PI / 2 - 0.02} // Prevent going beneath ground plane
      minDistance={2}
      maxDistance={700}
      screenSpacePanning
      onStart={() => {
        // Immediate user override: stop any automated transition
        isTransitioning.current = false;
      }}
    />
  );
}
