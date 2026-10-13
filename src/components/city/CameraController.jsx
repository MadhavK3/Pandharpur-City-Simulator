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
  const targetCamPos = useRef(new THREE.Vector3(0, 110, 150));

  useEffect(() => {
    if (cameraMode === 'landmark' && focusedCoordinates) {
      targetLookAt.current.set(focusedCoordinates[0], focusedCoordinates[1], focusedCoordinates[2]);
      targetCamPos.current.set(
        focusedCoordinates[0] + 36,
        focusedCoordinates[1] + 32,
        focusedCoordinates[2] + 48
      );
    } else if (cameraMode === 'aerial') {
      targetLookAt.current.set(0, 0, 0);
      targetCamPos.current.set(0, 280, 5);
    } else if (cameraMode === 'orbit') {
      targetLookAt.current.set(0, 0, 0);
      targetCamPos.current.set(0, 95, 140);
    }
  }, [cameraMode, focusedCoordinates]);

  useFrame((_, delta) => {
    if (controlsRef.current) {
      if (cameraMode === 'flyover') {
        // Continuous slow orbit around the Vitthal Mandir
        controlsRef.current.autoRotate = true;
        controlsRef.current.autoRotateSpeed = 0.6;
      } else {
        controlsRef.current.autoRotate = false;
        // Smooth lerp to target lookAt and position
        controlsRef.current.target.lerp(targetLookAt.current, delta * 2.5);
        camera.position.lerp(targetCamPos.current, delta * 2.5);
      }
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      maxPolarAngle={Math.PI / 2 - 0.04} // Prevent going below ground
      minDistance={15}
      maxDistance={480}
    />
  );
}
