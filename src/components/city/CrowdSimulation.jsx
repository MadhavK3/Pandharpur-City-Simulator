import React, { useRef, useMemo, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useSimulationStore } from '../../store/simulationStore.js';

export function CrowdSimulation() {
  const showCrowdParticles = useSimulationStore(state => state.showCrowdParticles);
  const crowdMultiplier = useSimulationStore(state => state.crowdMultiplier);
  const instancedMeshRef = useRef();

  // Create authentic Warkari pilgrim clusters across Pandharpur pilgrimage squares
  const pilgrimData = useMemo(() => {
    const data = [];
    const clusters = [
      { center: [-20, 20], count: 55, spread: 14, primaryDir: -Math.PI / 2 },  // Mahadwar Bazaar walking toward Mandir
      { center: [0, 16], count: 65, spread: 12, primaryDir: 0 },              // Mandir front courtyard
      { center: [95, 0], count: 60, spread: 18, primaryDir: Math.PI / 2 },     // Chandrabhaga Ghats
      { center: [-55, 0], count: 35, spread: 15, primaryDir: 0 },              // Shivaji Chowk
      { center: [115, 5], count: 30, spread: 12, primaryDir: -Math.PI / 4 },    // Pundalik Island Sands
      { center: [-100, 50], count: 25, spread: 14, primaryDir: 0 }             // Bus Stand concourse
    ];

    const palette = [
      '#ffffff', // White traditional dhoti/kurta
      '#f8fafc', // Crisp white
      '#ea580c', // Saffron Bhagva shawl
      '#f97316', // Orange pataka
      '#fbbf24', // Yellow festive silk
      '#dc2626'  // Red kumkum accent
    ];

    let id = 0;
    for (const cluster of clusters) {
      const actualCount = Math.floor(cluster.count * crowdMultiplier);
      for (let i = 0; i < actualCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * cluster.spread;
        const color = palette[Math.floor(Math.random() * palette.length)];

        data.push({
          id: id++,
          x: cluster.center[0] + Math.cos(angle) * dist,
          z: cluster.center[1] + Math.sin(angle) * dist,
          speed: 0.25 + Math.random() * 0.45,
          phase: Math.random() * Math.PI * 2,
          radius: dist,
          color: color,
          heading: cluster.primaryDir + (Math.random() * 0.8 - 0.4)
        });
      }
    }
    return data;
  }, [crowdMultiplier]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Initialize individual instance colors
  useEffect(() => {
    if (!instancedMeshRef.current || pilgrimData.length === 0) return;
    const colorObj = new THREE.Color();
    pilgrimData.forEach((p, i) => {
      colorObj.set(p.color);
      instancedMeshRef.current.setColorAt(i, colorObj);
    });
    if (instancedMeshRef.current.instanceColor) {
      instancedMeshRef.current.instanceColor.needsUpdate = true;
    }
  }, [pilgrimData]);

  useFrame(({ clock }) => {
    if (!instancedMeshRef.current || !showCrowdParticles) return;

    const t = clock.getElapsedTime();
    pilgrimData.forEach((p, i) => {
      const offsetX = Math.sin(t * p.speed + p.phase) * 0.8;
      const offsetZ = Math.cos(t * p.speed + p.phase) * 0.8;
      const bob = Math.abs(Math.sin(t * p.speed * 2.5 + p.phase)) * 0.16;

      dummy.position.set(p.x + offsetX, 0.7 + bob, p.z + offsetZ);
      dummy.rotation.set(0, p.heading + Math.sin(t * p.speed + p.phase) * 0.2, 0);
      dummy.scale.set(0.65, 1.4, 0.65);
      dummy.updateMatrix();

      instancedMeshRef.current.setMatrixAt(i, dummy.matrix);
    });

    instancedMeshRef.current.instanceMatrix.needsUpdate = true;
  });

  if (!showCrowdParticles || pilgrimData.length === 0) return null;

  return (
    <instancedMesh
      ref={instancedMeshRef}
      args={[null, null, pilgrimData.length]}
      castShadow
    >
      <capsuleGeometry args={[0.3, 0.8, 4, 8]} />
      <meshStandardMaterial roughness={0.7} metalness={0.05} />
    </instancedMesh>
  );
}

export default CrowdSimulation;
