---
name: react-three-fiber
description: >-
  Engineering guide and production patterns for React Three Fiber (v9), Drei (v10),
  Three.js (0.186), OrbitControls camera management, and 3D/2D overlay rendering.
---

# React Three Fiber & Three.js 3D Engineering Skill

This skill provides operational patterns, architectural standards, and troubleshooting procedures for building 3D simulation scenes using React 19, Three.js 0.186, `@react-three/fiber` v9, and `@react-three/drei` v10.

---

## 1. 3D/2D Stacking & Drei `<Html>` Isolation

In mixed 3D/2D applications, Drei `<Html>` allows projecting React DOM nodes to track 3D coordinates.

### The Stacking Context Trap
By default, Drei `<Html>` uses a CSS `z-index` range of `[16777271, 0]`. When not bounded, 3D landmark pins and graph badges bleed directly over fixed 2D HTML sidebars, modals, and navigation bars.

### Correct Pattern
Always set `zIndexRange={[0, 0]}` on 3D `<Html>` elements:
```jsx
import { Html } from '@react-three/drei';

function ScenePin({ position, title, color }) {
  return (
    <Html position={position} center distanceFactor={110} zIndexRange={[0, 0]}>
      <div style={{
        background: 'rgba(9, 13, 22, 0.94)',
        border: `1px solid ${color}`,
        borderRadius: '6px',
        padding: '4px 10px',
        color: color,
        pointerEvents: 'none'
      }}>
        {title}
      </div>
    </Html>
  );
}
```

---

## 2. Camera Orchestration: OrbitControls vs Programmatic Transitions

### The Continuous Lerp Conflict
Lerping `camera.position` or `controls.target` continuously inside `useFrame` will fight user drag and zoom inputs. Every frame, the lerp pulls the camera back, preventing user zooming and creating jarring rubber-banding.

### Correct Pattern: One-Shot Transition Lock
Use a boolean flag `isTransitioning.current` that deactivates upon reaching the target or when the user initiates interaction:
```jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export function CameraRig({ targetCoords }) {
  const controlsRef = useRef();
  const { camera } = useThree();
  const isTransitioning = useRef(false);
  const targetCamPos = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  useEffect(() => {
    if (targetCoords) {
      targetLookAt.current.set(...targetCoords);
      targetCamPos.current.set(targetCoords[0] + 35, targetCoords[1] + 30, targetCoords[2] + 45);
      isTransitioning.current = true;
    }
  }, [targetCoords]);

  useFrame((_, delta) => {
    if (!controlsRef.current) return;

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
      enableDamping
      dampingFactor={0.06}
      maxPolarAngle={Math.PI / 2 - 0.02}
      minDistance={2}
      maxDistance={700}
      screenSpacePanning
      onStart={() => {
        // Immediate user override releases transition lock
        isTransitioning.current = false;
      }}
    />
  );
}
```

---

## 3. WebGL Resource & Performance Hygiene

1. **Avoid Allocations in `useFrame`**:
   - Never instantiate `new THREE.Vector3()` or `new THREE.Color()` inside `useFrame`. Pre-allocate refs outside the render loop.
2. **Instanced Meshes for Density**:
   - For crowd particles, trees, or repetitive urban buildings, use `instancedMesh` rather than individual `mesh` components.
3. **Lighting & Shadows**:
   - Maintain a single primary `directionalLight` with shadows enabled (`castShadow`). Set shadow map size to `[2048, 2048]` with `shadow-bias={-0.0005}` to prevent shadow acne.

