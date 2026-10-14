import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useSimulationStore, GUIDED_TOUR_STOPS } from '../../store/simulationStore.js';

export function CameraController() {
  const controlsRef = useRef();
  const { camera, gl } = useThree();

  const cameraMode = useSimulationStore(state => state.cameraMode);
  const setCameraMode = useSimulationStore(state => state.setCameraMode);
  const focusedCoordinates = useSimulationStore(state => state.focusedCoordinates);

  const guidedTourActive = useSimulationStore(state => state.guidedTourActive);
  const guidedTourIndex = useSimulationStore(state => state.guidedTourIndex);
  const isTourPaused = useSimulationStore(state => state.isTourPaused);
  const nextTourStop = useSimulationStore(state => state.nextTourStop);

  const moveJoystickVector = useSimulationStore(state => state.moveJoystickVector);

  const targetLookAt = useRef(new THREE.Vector3(15, 0, -10));
  const targetCamPos = useRef(new THREE.Vector3(-50, 92, 138));
  const isTransitioning = useRef(false);

  // Guided tour dwell timer
  const tourDwellTime = useRef(0);

  // Ground mode position and orientation
  const groundPos = useRef(new THREE.Vector3(-20, 1.7, 25));
  const groundEuler = useRef(new THREE.Euler(0, Math.PI, 0, 'YXZ'));
  const isDraggingGround = useRef(false);
  const lastPointerPos = useRef({ x: 0, y: 0 });

  // Keyboard state for desktop ground navigation
  const keysPressed = useRef({});

  useEffect(() => {
    const handleKeyDown = (e) => {
      keysPressed.current[e.code] = true;
      if (e.code === 'Escape' && cameraMode === 'ground') {
        setCameraMode('orbit');
      }
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [cameraMode, setCameraMode]);

  // Pointer drag listeners for ground-mode look around
  useEffect(() => {
    const dom = gl.domElement;

    const onPointerDown = (e) => {
      if (cameraMode !== 'ground') return;
      isDraggingGround.current = true;
      lastPointerPos.current = { x: e.clientX, y: e.clientY };
    };

    const onPointerMove = (e) => {
      if (cameraMode !== 'ground' || !isDraggingGround.current) return;
      const dx = e.clientX - lastPointerPos.current.x;
      const dy = e.clientY - lastPointerPos.current.y;
      lastPointerPos.current = { x: e.clientX, y: e.clientY };

      // Sensitivity
      groundEuler.current.y -= dx * 0.0035;
      groundEuler.current.x = Math.max(
        -Math.PI / 2.5,
        Math.min(Math.PI / 2.5, groundEuler.current.x - dy * 0.0035)
      );
    };

    const onPointerUp = () => {
      isDraggingGround.current = false;
    };

    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);

    return () => {
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [cameraMode, gl]);

  // Handle camera mode triggers
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
      targetLookAt.current.set(15, 0, -10);
      targetCamPos.current.set(-50, 92, 138);
      isTransitioning.current = true;
    } else if (cameraMode === 'ground') {
      // Enter ground level
      if (focusedCoordinates && focusedCoordinates[0] !== 0) {
        groundPos.current.set(focusedCoordinates[0], 1.7, focusedCoordinates[2] + 5);
      }
      camera.position.copy(groundPos.current);
      camera.quaternion.setFromEuler(groundEuler.current);
      isTransitioning.current = false;
    }
  }, [cameraMode, focusedCoordinates, camera]);

  // Handle guided tour stops
  useEffect(() => {
    if (cameraMode === 'guided_tour' && guidedTourActive) {
      const stop = GUIDED_TOUR_STOPS[guidedTourIndex];
      if (stop) {
        targetCamPos.current.set(stop.camPos[0], stop.camPos[1], stop.camPos[2]);
        targetLookAt.current.set(stop.lookAt[0], stop.lookAt[1], stop.lookAt[2]);
        isTransitioning.current = true;
        tourDwellTime.current = 0;
      }
    }
  }, [cameraMode, guidedTourActive, guidedTourIndex]);

  useFrame((_, delta) => {
    // 1. GROUND-LEVEL FIRST PERSON MODE
    if (cameraMode === 'ground') {
      const moveSpeed = 16.0 * delta; // 16 m/s walk speed
      const yaw = groundEuler.current.y;

      const forward = new THREE.Vector3(-Math.sin(yaw), 0, -Math.cos(yaw));
      const right = new THREE.Vector3(Math.cos(yaw), 0, -Math.sin(yaw));

      const move = new THREE.Vector3();

      // Keyboard input
      if (keysPressed.current['KeyW'] || keysPressed.current['ArrowUp']) move.add(forward);
      if (keysPressed.current['KeyS'] || keysPressed.current['ArrowDown']) move.sub(forward);
      if (keysPressed.current['KeyD'] || keysPressed.current['ArrowRight']) move.add(right);
      if (keysPressed.current['KeyA'] || keysPressed.current['ArrowLeft']) move.sub(right);

      // Mobile touch joystick input
      if (moveJoystickVector.y !== 0) {
        move.addScaledVector(forward, -moveJoystickVector.y);
      }
      if (moveJoystickVector.x !== 0) {
        move.addScaledVector(right, moveJoystickVector.x);
      }

      if (move.lengthSq() > 0.001) {
        move.normalize().multiplyScalar(moveSpeed);
        groundPos.current.add(move);

        // Boundary clamping to keep within Pandharpur explorable boundaries
        groundPos.current.x = Math.max(-230, Math.min(100, groundPos.current.x));
        groundPos.current.z = Math.max(-170, Math.min(170, groundPos.current.z));
      }

      // Maintain eye height at 1.7m above local terrain level
      groundPos.current.y = 1.7;

      camera.position.copy(groundPos.current);
      camera.quaternion.setFromEuler(groundEuler.current);
      return;
    }

    if (!controlsRef.current) return;

    // 2. PARIKRAMA FLYOVER MODE
    if (cameraMode === 'flyover') {
      controlsRef.current.autoRotate = true;
      controlsRef.current.autoRotateSpeed = 0.6;
      controlsRef.current.update();
      return;
    }

    controlsRef.current.autoRotate = false;

    // 3. GUIDED TOUR AUTO-ADVANCE & TRANSITION
    if (cameraMode === 'guided_tour' && guidedTourActive) {
      if (isTransitioning.current) {
        controlsRef.current.target.lerp(targetLookAt.current, delta * 2.5);
        camera.position.lerp(targetCamPos.current, delta * 2.5);

        if (
          camera.position.distanceTo(targetCamPos.current) < 1.2 &&
          controlsRef.current.target.distanceTo(targetLookAt.current) < 0.6
        ) {
          isTransitioning.current = false;
        }
      } else if (!isTourPaused) {
        // Dwell at current landmark stop for 8 seconds before auto-advancing
        tourDwellTime.current += delta;
        if (tourDwellTime.current > 8.0) {
          tourDwellTime.current = 0;
          nextTourStop();
        }
      }
      controlsRef.current.update();
      return;
    }

    // 4. AUTOMATED ONE-SHOT TRANSITIONS FOR ORBIT / LANDMARK / AERIAL
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

    controlsRef.current.update();
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enabled={cameraMode !== 'ground'}
      enableDamping
      dampingFactor={0.06}
      maxPolarAngle={Math.PI / 2 - 0.02} // Prevent camera piercing beneath ground plane
      minDistance={2}
      maxDistance={700}
      screenSpacePanning
      onStart={() => {
        // Stop any automated transition when user starts dragging or zooming
        isTransitioning.current = false;
      }}
    />
  );
}

export default CameraController;
