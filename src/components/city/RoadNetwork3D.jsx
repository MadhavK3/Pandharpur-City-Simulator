import React, { useMemo } from 'react';
import * as THREE from 'three';
import { PANDHARPUR_GRAPH_DATA, ROAD_TYPES } from '../../data/pedestrianGraph.js';
import { getBasaltStoneTexture } from '../../engine/rendering/textureUtils.js';

export function RoadNetwork3D() {
  const nodeMap = new Map(PANDHARPUR_GRAPH_DATA.nodes.map(n => [n.id, n]));
  const basaltTexture = useMemo(() => getBasaltStoneTexture(), []);

  return (
    <group name="road_network_3d_root">
      {PANDHARPUR_GRAPH_DATA.edges.map(edge => {
        const u = nodeMap.get(edge.source);
        const v = nodeMap.get(edge.target);
        if (!u || !v) return null;

        // Calculate segment midpoint and vector
        const midX = (u.x + v.x) / 2;
        const midY = 0.04; // Elevate slightly above terrain
        const midZ = (u.z + v.z) / 2;

        const dx = v.x - u.x;
        const dz = v.z - u.z;
        const length = Math.sqrt(dx * dx + dz * dz);
        const angle = Math.atan2(dx, dz);

        const roadConfig = ROAD_TYPES[edge.roadType] || { color: '#18181b', width: 6.0 };
        const roadWidth = roadConfig.width;

        const isAsphalt = edge.roadType === 'arterial' || edge.roadType === 'pradakshina';
        const isBazaar = edge.roadType === 'bazaar_lane';
        const isPedestrian = edge.roadType === 'pedestrian_walkway';
        const isGhat = edge.roadType === 'ghat_steps';

        return (
          <group
            key={`road_geom_${edge.id}`}
            position={[midX, midY, midZ]}
            rotation={[0, angle, 0]}
          >
            {/* 1. Vehicular Tarmac Roads (Arterial & Pradakshina) */}
            {isAsphalt && (
              <>
                {/* Main Asphalt Bed */}
                <mesh position={[0, 0, 0]} receiveShadow>
                  <boxGeometry args={[roadWidth, 0.08, length]} />
                  <meshStandardMaterial
                    color="#1c1917"
                    roughness={0.9}
                    metalness={0.06}
                  />
                </mesh>

                {/* Concrete Curbs */}
                {[-roadWidth / 2 - 0.25, roadWidth / 2 + 0.25].map((curbX, ci) => (
                  <mesh key={`curb_${ci}`} position={[curbX, 0.05, 0]} receiveShadow>
                    <boxGeometry args={[0.5, 0.14, length]} />
                    <meshStandardMaterial color="#64748b" roughness={0.7} />
                  </mesh>
                ))}

                {/* Sidewalk Pavement */}
                {[-roadWidth / 2 - 0.9, roadWidth / 2 + 0.9].map((sideX, si) => (
                  <mesh key={`sidewalk_${si}`} position={[sideX, 0.03, 0]} receiveShadow>
                    <boxGeometry args={[0.8, 0.1, length]} />
                    <meshStandardMaterial color="#78716c" roughness={0.85} />
                  </mesh>
                ))}

                {/* Center Road Markings */}
                <mesh position={[0, 0.045, 0]}>
                  <boxGeometry args={[0.26, 0.01, length * 0.92]} />
                  <meshStandardMaterial color="#eab308" roughness={0.3} />
                </mesh>

                {/* Solid Shoulder White Markings */}
                {[-roadWidth / 2 + 0.35, roadWidth / 2 - 0.35].map((whiteX, wi) => (
                  <mesh key={`white_line_${wi}`} position={[whiteX, 0.045, 0]}>
                    <boxGeometry args={[0.16, 0.01, length * 0.95]} />
                    <meshStandardMaterial color="#f8fafc" roughness={0.3} />
                  </mesh>
                ))}

                {/* Street Lamp Poles along Arterials */}
                {length > 60 && edge.roadType === 'arterial' && (
                  <group position={[roadWidth / 2 + 1.2, 0, 0]}>
                    <mesh position={[0, 2.5, 0]}>
                      <cylinderGeometry args={[0.08, 0.14, 5.0, 8]} />
                      <meshStandardMaterial color="#334155" metalness={0.8} />
                    </mesh>
                    <mesh position={[-0.4, 4.8, 0]} rotation={[0, 0, Math.PI / 4]}>
                      <boxGeometry args={[0.1, 0.8, 0.1]} />
                      <meshStandardMaterial color="#334155" />
                    </mesh>
                    <mesh position={[-0.7, 4.5, 0]}>
                      <sphereGeometry args={[0.22, 10, 10]} />
                      <meshStandardMaterial color="#fef08a" emissive="#facc15" emissiveIntensity={1.8} />
                    </mesh>
                    <pointLight position={[-0.7, 4.4, 0]} color="#fef08a" intensity={0.8} distance={16} />
                  </group>
                )}
              </>
            )}

            {/* 2. Historic Bazaar Flagstone Pedestrian Streets */}
            {isBazaar && (
              <>
                <mesh position={[0, 0, 0]} receiveShadow>
                  <boxGeometry args={[roadWidth, 0.08, length]} />
                  <meshStandardMaterial
                    map={basaltTexture}
                    color="#44403c"
                    roughness={0.82}
                    metalness={0.06}
                  />
                </mesh>

                {/* Weathered Stone Curb Edging */}
                {[-roadWidth / 2 - 0.2, roadWidth / 2 + 0.2].map((curbX, ci) => (
                  <mesh key={`bz_curb_${ci}`} position={[curbX, 0.05, 0]} receiveShadow>
                    <boxGeometry args={[0.4, 0.12, length]} />
                    <meshStandardMaterial map={basaltTexture} color="#383431" roughness={0.88} />
                  </mesh>
                ))}

                {/* Festive Overhead Saffron & Yellow Bunting Strings */}
                {length > 30 && (
                  <mesh position={[0, 4.6, 0]}>
                    <cylinderGeometry args={[0.02, 0.02, roadWidth, 4]} rotation={[0, 0, Math.PI / 2]} />
                    <meshStandardMaterial color="#ea580c" />
                  </mesh>
                )}
              </>
            )}

            {/* 3. Sacred Pedestrian Walkways & Sand Trails (Courtyards & Riverbank) */}
            {isPedestrian && (
              <mesh position={[0, -0.01, 0]} receiveShadow>
                <boxGeometry args={[2.8, 0.03, length]} />
                <meshStandardMaterial
                  color={u.y < -0.3 || v.y < -0.3 ? '#caa373' : '#383533'}
                  roughness={0.9}
                  metalness={0.05}
                />
              </mesh>
            )}

            {/* 4. Stone Ghat Steps Connectors */}
            {isGhat && (
              <mesh position={[0, -0.02, 0]} receiveShadow>
                <boxGeometry args={[3.2, 0.04, length]} />
                <meshStandardMaterial map={basaltTexture} color="#44403c" roughness={0.8} />
              </mesh>
            )}
          </group>
        );
      })}

      {/* Seamless Road Intersection Junction Fillets */}
      {PANDHARPUR_GRAPH_DATA.nodes.filter(n => n.type === 'junction' || n.type === 'transport').map(j => (
        <mesh key={`junction_fillet_${j.id}`} position={[j.x, 0.04, j.z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[5.2, 24]} />
          <meshStandardMaterial color="#1c1917" roughness={0.88} metalness={0.08} />
        </mesh>
      ))}

      {/* Decorative Traditional Yellow-Black Auto Rickshaws parked near Shivaji Chowk */}
      {[
        { x: -50, z: -8, rot: 0.4 },
        { x: -52, z: 12, rot: -0.3 },
        { x: -125, z: 46, rot: 1.2 }
      ].map((rick, ri) => (
        <group key={`rickshaw_${ri}`} position={[rick.x, 0.5, rick.z]} rotation={[0, rick.rot, 0]}>
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[1.5, 0.8, 2.6]} />
            <meshStandardMaterial color="#eab308" roughness={0.4} />
          </mesh>
          <mesh position={[0, 1.2, 0.2]}>
            <boxGeometry args={[1.4, 0.8, 2.0]} />
            <meshStandardMaterial color="#18181b" roughness={0.6} />
          </mesh>
          <mesh position={[0, 1.0, -0.9]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[1.2, 0.6, 0.1]} />
            <meshStandardMaterial color="#93c5fd" transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default RoadNetwork3D;
