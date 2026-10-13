import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { GHAT_STEPS, SANDBANK_ISLANDS, DEEPAMALAS, PILGRIM_TENTS, RIVER_BOATS } from '../../data/cityLayout.js';

export function RiverEnvironment() {
  const waterRef = useRef();
  const boatGroupRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (waterRef.current) {
      // Realistic rhythmic river water ripple
      waterRef.current.position.y = -1.1 + Math.sin(t * 1.2) * 0.05;
    }
    if (boatGroupRef.current) {
      // Gentle rocking of river boats
      boatGroupRef.current.rotation.z = Math.sin(t * 1.5) * 0.02;
    }
  });

  return (
    <group name="river_environment_root">
      {/* ============================================================== */}
      {/* 1. MAJESTIC CHANDRABHAGA (BHIMA) RIVER WATER EXPANSE */}
      {/* ============================================================== */}
      <mesh
        ref={waterRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[128, -1.1, 0]}
        receiveShadow
      >
        <planeGeometry args={[85, 450, 48, 48]} />
        <meshStandardMaterial
          color="#0284c7" // Holy aquatic blue
          roughness={0.08}
          metalness={0.88}
          transparent
          opacity={0.92}
        />
      </mesh>

      {/* Riverbed Underwater Deep Basin */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[128, -2.4, 0]}
      >
        <planeGeometry args={[88, 450]} />
        <meshStandardMaterial
          color="#0f172a" // Deep riverbed
          roughness={0.95}
        />
      </mesh>

      {/* ============================================================== */}
      {/* 2. CHANDRABHAGA SACRED SAND DUNES & ISLANDS (Vāḷvaṇṭ) */}
      {/* ============================================================== */}
      {SANDBANK_ISLANDS.map(island => (
        <mesh
          key={island.id}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[island.x, island.y, island.z]}
          receiveShadow
        >
          <planeGeometry args={[island.radiusX * 2, island.radiusZ * 2, 24, 24]} />
          <meshStandardMaterial
            color="#d4b483" // Golden river silt sand
            roughness={0.92}
            metalness={0.0}
          />
        </mesh>
      ))}

      {/* Western Sand Strip connecting ghats to river (X=88 to 105) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[96, -0.75, 0]}
        receiveShadow
      >
        <planeGeometry args={[22, 420]} />
        <meshStandardMaterial
          color="#c5a880"
          roughness={0.9}
        />
      </mesh>

      {/* ============================================================== */}
      {/* 3. STONE BATHING GHATS WITH DESCENDING FLIGHTS OF STEPS */}
      {/* ============================================================== */}
      {GHAT_STEPS.map(ghat => (
        <group key={ghat.id} position={[ghat.x, ghat.y, ghat.z]}>
          {/* Stone Pavilion / Chhatri at top of ghat */}
          <group position={[-2, 1.6, 0]}>
            <mesh position={[0, 1.2, 0]}>
              <cylinderGeometry args={[2.5, 3.0, 0.4, 8]} />
              <meshStandardMaterial color="#57534e" roughness={0.8} />
            </mesh>
            {/* 4 Pillars */}
            {[-1.2, 1.2].map((px, pi) =>
              [-1.2, 1.2].map((pz, pj) => (
                <mesh key={`ghat_col_${pi}_${pj}`} position={[px, 0, pz]}>
                  <cylinderGeometry args={[0.2, 0.25, 2.4, 8]} />
                  <meshStandardMaterial color="#44403c" />
                </mesh>
              ))
            )}
            {/* Dome roof */}
            <mesh position={[0, 2.0, 0]}>
              <coneGeometry args={[2.2, 1.6, 8]} />
              <meshStandardMaterial color="#78716c" />
            </mesh>
          </group>

          {/* Stepped stone flights descending into the river water */}
          {Array.from({ length: ghat.stepsCount }).map((_, stepIdx) => (
            <mesh
              key={`step_${stepIdx}`}
              position={[stepIdx * 1.5, -stepIdx * 0.16, 0]}
              receiveShadow
            >
              <boxGeometry args={[1.8, 0.35, ghat.lengthZ]} />
              <meshStandardMaterial
                color="#57534e" // Historic carved Deccan basalt steps
                roughness={0.75}
              />
            </mesh>
          ))}
        </group>
      ))}

      {/* ============================================================== */}
      {/* 4. STONE FOOTBRIDGE (Pundalik Setu) TO RIVER ISLAND */}
      {/* ============================================================== */}
      <group position={[105, -0.4, 2]}>
        <mesh receiveShadow>
          <boxGeometry args={[20, 0.4, 3.5]} />
          <meshStandardMaterial color="#57534e" roughness={0.7} />
        </mesh>
        {/* Bridge stone piers in the water */}
        {[-6, 0, 6].map((bx, bi) => (
          <mesh key={`pier_${bi}`} position={[bx, -0.6, 0]}>
            <cylinderGeometry args={[0.8, 1.0, 1.2, 8]} />
            <meshStandardMaterial color="#44403c" />
          </mesh>
        ))}
        {/* Stone railings */}
        {[-1.6, 1.6].map((rz, ri) => (
          <mesh key={`rail_${ri}`} position={[0, 0.4, rz]}>
            <boxGeometry args={[20, 0.4, 0.15]} />
            <meshStandardMaterial color="#78716c" />
          </mesh>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 5. TALL DEEPAMALAS (STONE LAMP TOWERS) ON RIVERBANK */}
      {/* ============================================================== */}
      {DEEPAMALAS.map(deep => (
        <group key={deep.id} position={[deep.x, deep.y, deep.z]}>
          {/* Base */}
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[1.4, 1.8, 1.2, 8]} />
            <meshStandardMaterial color="#44403c" roughness={0.9} />
          </mesh>
          {/* Tapering octagonal shaft */}
          <mesh position={[0, deep.height / 2 + 0.6, 0]}>
            <cylinderGeometry args={[0.6, 1.1, deep.height, 8]} />
            <meshStandardMaterial color="#57534e" roughness={0.85} />
          </mesh>
          {/* Lamp Brackets along height */}
          {Array.from({ length: 4 }).map((_, li) => (
            <mesh key={`bracket_${li}`} position={[0, (li + 1) * (deep.height / 5) + 0.6, 0]}>
              <cylinderGeometry args={[1.2, 0.8, 0.3, 8]} />
              <meshStandardMaterial color="#78716c" />
            </mesh>
          ))}
          {/* Glowing Top Diya Flame */}
          <mesh position={[0, deep.height + 1.0, 0]}>
            <sphereGeometry args={[0.45, 12, 12]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#f97316"
              emissiveIntensity={2.8}
            />
          </mesh>
          <pointLight position={[0, deep.height + 1.2, 0]} color="#fbbf24" intensity={2.0} distance={25} />
        </group>
      ))}

      {/* ============================================================== */}
      {/* 6. WARKARI PILGRIM TENTS (RAOTEE) ON THE SANDBANK */}
      {/* ============================================================== */}
      {PILGRIM_TENTS.map(t => (
        <group key={t.id} position={[t.x, t.y, t.z]}>
          {/* Triangular Tent */}
          <mesh position={[0, 1.4, 0]} rotation={[0, Math.PI / 4, 0]}>
            <coneGeometry args={[2.5, 2.8, 4]} />
            <meshStandardMaterial color={t.color} roughness={0.7} />
          </mesh>
          {/* Saffron flag on tent peak */}
          <mesh position={[0, 3.2, 0]}>
            <coneGeometry args={[0.3, 0.8, 3]} />
            <meshStandardMaterial color="#f97316" />
          </mesh>
        </group>
      ))}

      {/* ============================================================== */}
      {/* 7. WOODEN PILGRIM RIVER BOATS (NAAV) IN CHANDRABHAGA */}
      {/* ============================================================== */}
      <group ref={boatGroupRef}>
        {RIVER_BOATS.map(b => (
          <group key={b.id} position={[b.x, b.y, b.z]} rotation={[0, b.rotation, 0]}>
            {/* Wooden Hull */}
            <mesh position={[0, 0.3, 0]} scale={[1.8, 0.8, 4.5]}>
              <sphereGeometry args={[1, 12, 8]} />
              <meshStandardMaterial color="#78350f" roughness={0.8} />
            </mesh>
            {/* Inside hollow bench */}
            <mesh position={[0, 0.4, 0]}>
              <boxGeometry args={[1.2, 0.1, 3.5]} />
              <meshStandardMaterial color="#92400e" />
            </mesh>
            {/* Oar */}
            <mesh position={[1.0, 0.5, 0]} rotation={[0.4, 0, 0.6]}>
              <cylinderGeometry args={[0.04, 0.04, 3.0, 6]} />
              <meshStandardMaterial color="#451a03" />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}
