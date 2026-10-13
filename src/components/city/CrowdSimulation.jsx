import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useSimulationStore } from '../../store/simulationStore.js';

export function CrowdSimulation() {
  const showCrowdParticles = useSimulationStore(state => state.showCrowdParticles);
  const crowdMultiplier = useSimulationStore(state => state.crowdMultiplier);
  const instancedMeshRef = useRef();

  // Create devotee clusters across Pandharpur's active pilgrimage squares
  const pilgrimData = useMemo(() => {
    const data = [];
    const clusters = [
      { center: [-20, 20], count: 50, spread: 14 },  // Mahadwar Bazaar
      { center: [0, 15], count: 60, spread: 12 },    // Mandir front courtyard
      { center: [95, 0], count: 55, spread: 18 },    // Chandrabhaga Ghats
      { center: [-55, 0], count: 35, spread: 15 },   // Shivaji Chowk
      { center: [115, 5], count: 30, spread: 12 },   // Pundalik Island Sands
      { center: [-100, 50], count: 25, spread: 14 }  // Bus Stand concourse
    ];

    let id = 0;
    for (const cluster of clusters) {
      const actualCount = Math.floor(cluster.count * crowdMultiplier);
      for (let i = 0; i < actualCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * cluster.spread;
        data.push({
          id: id++,
          x: cluster.center[0] + Math.cos(angle) * dist,
          z: cluster.center[1] + Math.sin(angle) * dist,
          speed: 0.3 + Math.random() * 0.4,
          phase: Math.random() * Math.PI * 2,
          radius: dist,
          color: Math.random() > 0.4 ? '#f97316' : '#ffffff' // Saffron or White
        });
      }
    }
    return data;
  }, [crowdMultiplier]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!instancedMeshRef.current || !showCrowdParticles) return;

    const t = clock.getElapsedTime();
    pilgrimData.forEach((p, i) => {
      const offsetX = Math.sin(t * p.speed + p.phase) * 0.6;
      const offsetZ = Math.cos(t * p.speed + p.phase) * 0.6;
      const bob = Math.abs(Math.sin(t * p.speed * 2 + p.phase)) * 0.15;

      dummy.position.set(p.x + offsetX, 0.6 + bob, p.z + offsetZ);
      dummy.scale.set(0.6, 1.2, 0.6);
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
      <cylinderGeometry args={[0.4, 0.5, 1.1, 6]} />
      <meshStandardMaterial color="#f97316" roughness={0.7} />
    </instancedMesh>
  );
}
