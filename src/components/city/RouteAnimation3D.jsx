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
        return node ? new THREE.Vector3(node.x, node.y + 0.65, node.z) : null;
      })
      .filter(Boolean);

    if (points.length < 2) return null;
    return new THREE.CatmullRomCurve3(points, false, 'catmullrom', 0.2);
  }, [routeResult, nodeMap]);

  useFrame((_, delta) => {
    if (curve && pilgrimRef.current) {
      progressRef.current = (progressRef.current + delta * 0.08) % 1.0;
      const point = curve.getPointAt(progressRef.current);
      const tangent = curve.getTangentAt(progressRef.current);

      pilgrimRef.current.position.copy(point);
      pilgrimRef.current.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), tangent);
    }
  });

  if (!curve) return null;

  return (
    <group name="route_animation_3d_root">
      {/* 1. Glowing Neon Path Ribbon over the road */}
      <mesh position={[0, 0, 0]}>
        <tubeGeometry args={[curve, 160, 0.45, 8, false]} />
        <meshStandardMaterial
          color="#10b981"
          emissive="#22c55e"
          emissiveIntensity={1.4}
          roughness={0.2}
        />
      </mesh>

      {/* 2. Walking Pilgrim Devotee Avatar */}
      <group ref={pilgrimRef} position={[0, 0, 0]}>
        {/* Pilgrim Robe / Dhoti */}
        <mesh position={[0, 1.0, 0]}>
          <cylinderGeometry args={[0.5, 0.7, 1.8, 8]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.8} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 2.2, 0]}>
          <sphereGeometry args={[0.38, 12, 12]} />
          <meshStandardMaterial color="#e2a76f" />
        </mesh>
        {/* Holy Tilak (Gopichandana & Tulsi) */}
        <mesh position={[0, 2.3, 0.38]}>
          <boxGeometry args={[0.08, 0.2, 0.04]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        {/* Saffron Bhagva Dhwaja carried on shoulder */}
        <group position={[0.5, 1.4, -0.2]} rotation={[0.2, 0, -0.3]}>
          <mesh position={[0, 1.6, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 3.2, 6]} />
            <meshStandardMaterial color="#b45309" />
          </mesh>
          <mesh position={[0.5, 2.6, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.6, 1.2, 3]} />
            <meshStandardMaterial color="#f97316" />
          </mesh>
        </group>
        {/* Feet glow light */}
        <pointLight color="#10b981" intensity={2.2} distance={12} />
      </group>
    </group>
  );
}
