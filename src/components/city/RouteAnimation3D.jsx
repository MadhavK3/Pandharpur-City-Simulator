import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useSimulationStore } from '../../store/simulationStore.js';
import { PANDHARPUR_GRAPH_DATA } from '../../data/pedestrianGraph.js';

export function RouteAnimation3D() {
  const routeResult = useSimulationStore(state => state.routeResult);
  const pilgrimRef = useRef();
  const progressRef = useRef(0);

  const nodeMap = useMemo(() => new Map(PANDHARPUR_GRAPH_DATA.nodes.map(n => [n.id, n])), []);

  // Construct CatmullRomCurve3 from routeResult.path
  const curve = useMemo(() => {
    if (!routeResult?.path || routeResult.path.length < 2) return null;

    const points = routeResult.path
      .map(nodeId => {
        const node = nodeMap.get(nodeId);
        return node ? new THREE.Vector3(node.x, node.y + 0.35, node.z) : null;
      })
      .filter(Boolean);

    if (points.length < 2) return null;
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.2);
  }, [routeResult, nodeMap]);

  useFrame((_, delta) => {
    if (curve && pilgrimRef.current) {
      progressRef.current = (progressRef.current + delta * 0.12) % 1.0;
      const point = curve.getPointAt(progressRef.current);
      const tangent = curve.getTangentAt(progressRef.current);

      pilgrimRef.current.position.copy(point);
      pilgrimRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent);
    }
  });

  if (!curve) return null;

  return (
    <group name="route_animation_3d_root">
      {/* 1. Glowing Neon Path Ribbon */}
      <mesh position={[0, 0, 0]}>
        <tubeGeometry args={[curve, 128, 0.22, 8, false]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#22c55e"
          emissiveIntensity={1.2}
          roughness={0.2}
        />
      </mesh>

      {/* 2. Walking Pilgrim Devotee Avatar */}
      <group ref={pilgrimRef} position={[0, 0, 0]}>
        {/* Pilgrim Robe / Dhoti */}
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.25, 0.35, 0.9, 8]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.8} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.2, 12, 12]} />
          <meshStandardMaterial color="#e2a76f" />
        </mesh>
        {/* Holy Tilak (Gopichandana & Tulsi) */}
        <mesh position={[0, 1.25, 0.2]}>
          <boxGeometry args={[0.04, 0.1, 0.02]} />
          <meshStandardMaterial color="#f59e0b" />
        </mesh>
        {/* Devotee Saffron Flag (Bhagva Dhwaja) carried on shoulder */}
        <group position={[0.25, 0.8, -0.1]} rotation={[0.2, 0, -0.3]}>
          <mesh position={[0, 0.8, 0]}>
            <cylinderGeometry args={[0.02, 0.02, 1.6, 6]} />
            <meshStandardMaterial color="#b45309" />
          </mesh>
          <mesh position={[0.25, 1.3, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.3, 0.6, 3]} />
            <meshStandardMaterial color="#f97316" />
          </mesh>
        </group>
        {/* Feet glow light */}
        <pointLight color="#10b981" intensity={1.5} distance={6} />
      </group>
    </group>
  );
}
