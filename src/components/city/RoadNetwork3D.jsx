import React from 'react';
import * as THREE from 'three';
import { PANDHARPUR_GRAPH_DATA, ROAD_TYPES } from '../../data/pedestrianGraph.js';

export function RoadNetwork3D() {
  const nodeMap = new Map(PANDHARPUR_GRAPH_DATA.nodes.map(n => [n.id, n]));

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

        // Is it asphalt road or stone ghat?
        const isAsphalt = edge.roadType === 'arterial' || edge.roadType === 'pradakshina' || edge.roadType === 'bazaar_lane';

        return (
          <group
            key={`road_geom_${edge.id}`}
            position={[midX, midY, midZ]}
            rotation={[0, angle, 0]}
          >
            {/* 1. Main Black Asphalt Road Bed */}
            <mesh position={[0, 0, 0]} receiveShadow>
              <boxGeometry args={[roadWidth, 0.08, length]} />
              <meshStandardMaterial
                color={isAsphalt ? '#18181b' : '#57534e'} // Deep charcoal black tarmac!
                roughness={0.88}
                metalness={0.08}
              />
            </mesh>

            {/* 2. Concrete Curbs / Kerbstones on Both Sides */}
            {[-roadWidth / 2 - 0.25, roadWidth / 2 + 0.25].map((curbX, ci) => (
              <mesh key={`curb_${ci}`} position={[curbX, 0.06, 0]} receiveShadow>
                <boxGeometry args={[0.5, 0.16, length]} />
                <meshStandardMaterial color="#64748b" roughness={0.7} />
              </mesh>
            ))}

            {/* 3. Pedestrian Sidewalk Pavement */}
            {[-roadWidth / 2 - 0.95, roadWidth / 2 + 0.95].map((sideX, si) => (
              <mesh key={`sidewalk_${si}`} position={[sideX, 0.04, 0]} receiveShadow>
                <boxGeometry args={[0.9, 0.12, length]} />
                <meshStandardMaterial color="#78716c" roughness={0.85} />
              </mesh>
            ))}

            {/* 4. Road Paint Markings (Only for Asphalt roads) */}
            {isAsphalt && (
              <>
                {/* Yellow Dashed Center Line */}
                <mesh position={[0, 0.05, 0]}>
                  <boxGeometry args={[0.3, 0.01, length * 0.92]} />
                  <meshStandardMaterial color="#eab308" roughness={0.3} />
                </mesh>

                {/* White Shoulder Solid Boundary Lines */}
                {[-roadWidth / 2 + 0.4, roadWidth / 2 - 0.4].map((whiteX, wi) => (
                  <mesh key={`white_line_${wi}`} position={[whiteX, 0.05, 0]}>
                    <boxGeometry args={[0.2, 0.01, length * 0.95]} />
                    <meshStandardMaterial color="#f8fafc" roughness={0.3} />
                  </mesh>
                ))}
              </>
            )}

            {/* 5. Street Lamp Poles placed along segments longer than 40m */}
            {length > 45 && (
              <group position={[roadWidth / 2 + 1.2, 0, 0]}>
                {/* Pole */}
                <mesh position={[0, 2.5, 0]}>
                  <cylinderGeometry args={[0.08, 0.14, 5.0, 8]} />
                  <meshStandardMaterial color="#334155" metalness={0.8} />
                </mesh>
                {/* Arm & Lantern */}
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
          </group>
        );
      })}

      {/* Seamless Road Intersection Junction Fillets */}
      {PANDHARPUR_GRAPH_DATA.nodes.filter(n => n.type === 'junction' || n.type === 'transport').map(j => (
        <mesh key={`junction_fillet_${j.id}`} position={[j.x, 0.04, j.z]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[5.2, 24]} />
          <meshStandardMaterial color="#18181b" roughness={0.88} metalness={0.08} />
        </mesh>
      ))}

      {/* Decorative Traditional Yellow-Black Auto Rickshaws parked near Shivaji Chowk */}
      {[
        { x: -50, z: -8, rot: 0.4 },
        { x: -52, z: 12, rot: -0.3 },
        { x: -125, z: 46, rot: 1.2 }
      ].map((rick, ri) => (
        <group key={`rickshaw_${ri}`} position={[rick.x, 0.5, rick.z]} rotation={[0, rick.rot, 0]}>
          {/* Lower yellow body */}
          <mesh position={[0, 0.4, 0]}>
            <boxGeometry args={[1.5, 0.8, 2.6]} />
            <meshStandardMaterial color="#eab308" roughness={0.4} />
          </mesh>
          {/* Black canopy top */}
          <mesh position={[0, 1.2, 0.2]}>
            <boxGeometry args={[1.4, 0.8, 2.0]} />
            <meshStandardMaterial color="#18181b" roughness={0.6} />
          </mesh>
          {/* Windshield */}
          <mesh position={[0, 1.0, -0.9]} rotation={[0.2, 0, 0]}>
            <boxGeometry args={[1.2, 0.6, 0.1]} />
            <meshStandardMaterial color="#93c5fd" transparent opacity={0.6} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
