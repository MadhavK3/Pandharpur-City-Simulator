import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSimulationStore } from '../../store/simulationStore.js';
import { Html } from '@react-three/drei';

export function TempleLandmarks() {
  const selectLandmark = useSimulationStore(state => state.selectLandmark);
  const selectedLandmarkId = useSimulationStore(state => state.selectedLandmarkId);

  const flagRef = useRef();

  useFrame(({ clock }) => {
    if (flagRef.current) {
      // Gentle waving motion of saffron Bhagva flag
      const t = clock.getElapsedTime();
      flagRef.current.rotation.y = Math.sin(t * 3) * 0.18;
      flagRef.current.rotation.z = Math.cos(t * 2) * 0.1;
    }
  });

  return (
    <group name="temple_landmarks_root">
      {/* ============================================================== */}
      {/* 1. SHREE VITTHAL-RUKMINI MANDIR (Main Grand Landmark at [0, 0, 0]) */}
      {/* ============================================================== */}
      <group
        position={[0, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          selectLandmark('VITTHAL_RUKMINI_MANDIR');
        }}
      >
        {/* Outer Temple Enclosure Wall (Prakara Wall) */}
        <group position={[0, 0, 0]}>
          {/* North Wall */}
          <mesh position={[0, 2.5, -28]} castShadow>
            <boxGeometry args={[48, 5, 1.8]} />
            <meshStandardMaterial color="#44403c" roughness={0.8} />
          </mesh>
          {/* South Wall */}
          <mesh position={[0, 2.5, 28]} castShadow>
            <boxGeometry args={[48, 5, 1.8]} />
            <meshStandardMaterial color="#44403c" roughness={0.8} />
          </mesh>
          {/* West Wall */}
          <mesh position={[-24, 2.5, 0]} castShadow>
            <boxGeometry args={[1.8, 5, 56]} />
            <meshStandardMaterial color="#44403c" roughness={0.8} />
          </mesh>
          {/* East Wall with Gateway opening */}
          <mesh position={[24, 2.5, -16]} castShadow>
            <boxGeometry args={[1.8, 5, 24]} />
            <meshStandardMaterial color="#44403c" roughness={0.8} />
          </mesh>
          <mesh position={[24, 2.5, 16]} castShadow>
            <boxGeometry args={[1.8, 5, 24]} />
            <meshStandardMaterial color="#44403c" roughness={0.8} />
          </mesh>
        </group>

        {/* Elevated Stone Foundation Plinth */}
        <mesh position={[0, 0.8, 0]} castShadow receiveShadow>
          <boxGeometry args={[28, 1.6, 40]} />
          <meshStandardMaterial color="#292524" roughness={0.7} />
        </mesh>

        {/* Sabha Mandap (Main Grand Assembly Hall) */}
        <mesh position={[0, 5.0, 6]} castShadow receiveShadow>
          <boxGeometry args={[22, 6.8, 22]} />
          <meshStandardMaterial color="#57534e" roughness={0.7} />
        </mesh>

        {/* Garbhagriha (Sanctum Sanctorum) Base */}
        <mesh position={[0, 6.5, -10]} castShadow receiveShadow>
          <boxGeometry args={[18, 9.8, 16]} />
          <meshStandardMaterial color="#44403c" roughness={0.75} />
        </mesh>

        {/* Main Stone Shikhara (Spire) Tier 1 */}
        <mesh position={[0, 13.5, -10]} castShadow>
          <boxGeometry args={[14, 6.0, 12]} />
          <meshStandardMaterial color="#d97706" roughness={0.6} />
        </mesh>

        {/* Main Stone Shikhara Tier 2 */}
        <mesh position={[0, 18.5, -10]} castShadow>
          <boxGeometry args={[10, 5.0, 9]} />
          <meshStandardMaterial color="#b45309" roughness={0.55} />
        </mesh>

        {/* Main Stone Shikhara Tier 3 (Towering Cone) */}
        <mesh position={[0, 23.5, -10]} castShadow>
          <coneGeometry args={[5.5, 6.8, 8]} />
          <meshStandardMaterial color="#92400e" roughness={0.5} />
        </mesh>

        {/* Golden Amalaka Disc */}
        <mesh position={[0, 27.2, -10]} castShadow>
          <cylinderGeometry args={[2.5, 2.8, 0.8, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Golden Amrit Kalasha (Topmost Spire) */}
        <mesh position={[0, 28.5, -10]} castShadow>
          <sphereGeometry args={[1.6, 16, 16]} />
          <meshStandardMaterial
            color="#fbbf24"
            metalness={0.95}
            roughness={0.15}
            emissive="#f59e0b"
            emissiveIntensity={0.8}
          />
        </mesh>

        {/* Giant Saffron Bhagva Dhwaja (Holy Flag) */}
        <group ref={flagRef} position={[0, 30.5, -10]}>
          {/* Flagstaff */}
          <mesh position={[0, 2.2, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 4.8, 8]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.8} />
          </mesh>
          {/* Triangular Swallowtail Flag */}
          <mesh position={[1.4, 3.2, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[1.2, 2.8, 3]} />
            <meshStandardMaterial color="#ea580c" roughness={0.4} />
          </mesh>
        </group>

        {/* Sabha Mandap Carved Basalt Pillars */}
        {[-9, 9].map((px, idx) =>
          [-2, 6, 14].map((pz, j) => (
            <mesh key={`col_${idx}_${j}`} position={[px, 4.5, pz]} castShadow>
              <cylinderGeometry args={[0.6, 0.75, 6.5, 8]} />
              <meshStandardMaterial color="#44403c" roughness={0.8} />
            </mesh>
          ))
        )}

        {/* Stone Tulsi Vrindavan in Courtyard */}
        <mesh position={[0, 2.0, 22]} castShadow>
          <boxGeometry args={[2.0, 2.4, 2.0]} />
          <meshStandardMaterial color="#78716c" />
        </mesh>

        {/* Floating Name Badge */}
        <Html position={[0, 34, -10]} center distanceFactor={110}>
          <div
            style={{
              background: 'rgba(9, 13, 22, 0.92)',
              border: selectedLandmarkId === 'VITTHAL_RUKMINI_MANDIR' ? '2px solid #fbbf24' : '1px solid rgba(245, 158, 11, 0.5)',
              boxShadow: '0 0 20px rgba(245, 158, 11, 0.6)',
              borderRadius: '8px',
              padding: '6px 14px',
              color: '#fbbf24',
              fontSize: '13px',
              fontWeight: '800',
              whiteSpace: 'nowrap',
              pointerEvents: 'none'
            }}
          >
            🚩 Shree Vitthal-Rukmini Mandir
          </div>
        </Html>
      </group>

      {/* ============================================================== */}
      {/* 2. SANT NAMDEV PAYARI (At [-4, 0.2, 15]) */}
      {/* ============================================================== */}
      <group
        position={[-4, 0.2, 15]}
        onClick={(e) => {
          e.stopPropagation();
          selectLandmark('NAMDEV_PAYARTHI');
        }}
      >
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[4.5, 1.0, 3.2]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 2.2, 0]}>
          <cylinderGeometry args={[2.2, 2.5, 0.3, 12]} />
          <meshStandardMaterial color="#b45309" />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 3. BHAKTA PUNDALIK MANDIR (Riverside Island at [115, -0.6, 5]) */}
      {/* ============================================================== */}
      <group
        position={[115, -0.6, 5]}
        onClick={(e) => {
          e.stopPropagation();
          selectLandmark('PUNDALIKA_MANDIR');
        }}
      >
        {/* River Island Plinth */}
        <mesh position={[0, 1.2, 0]} castShadow>
          <cylinderGeometry args={[9.5, 10.5, 2.5, 8]} />
          <meshStandardMaterial color="#57534e" roughness={0.8} />
        </mesh>
        {/* Mandir Sanctum */}
        <mesh position={[0, 4.4, 0]} castShadow>
          <cylinderGeometry args={[6.2, 7.0, 4.5, 8]} />
          <meshStandardMaterial color="#d97706" roughness={0.6} />
        </mesh>
        {/* Shikhara Spire */}
        <mesh position={[0, 9.5, 0]} castShadow>
          <coneGeometry args={[5.2, 7.5, 8]} />
          <meshStandardMaterial color="#b45309" roughness={0.5} />
        </mesh>
        {/* Golden Kalasha */}
        <mesh position={[0, 14.0, 0]}>
          <sphereGeometry args={[1.1, 16, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} emissive="#f59e0b" emissiveIntensity={0.6} />
        </mesh>
        <Html position={[0, 16.5, 0]} center distanceFactor={110}>
          <div style={{ background: 'rgba(9, 13, 22, 0.9)', border: '1px solid #f97316', borderRadius: '6px', padding: '4px 10px', color: '#fed7aa', fontSize: '11px', fontWeight: 'bold' }}>
            🪔 Bhakta Pundalik Mandir
          </div>
        </Html>
      </group>

      {/* ============================================================== */}
      {/* 4. SANT JANABAI & SANT BHANUDAS SAMADHIS (On river sands) */}
      {/* ============================================================== */}
      <group
        position={[110, -0.6, 35]}
        onClick={(e) => {
          e.stopPropagation();
          selectLandmark('SANT_JANABAI_SAMADHI');
        }}
      >
        <mesh position={[0, 1.6, 0]} castShadow>
          <boxGeometry args={[6, 3.2, 6]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.7} />
        </mesh>
        <mesh position={[0, 4.2, 0]}>
          <sphereGeometry args={[2.5, 12, 12]} />
          <meshStandardMaterial color="#cbd5e1" roughness={0.6} />
        </mesh>
      </group>

      <group
        position={[108, -0.6, -30]}
        onClick={(e) => {
          e.stopPropagation();
          selectLandmark('SANT_BHANUDAS_SAMADHI');
        }}
      >
        <mesh position={[0, 1.6, 0]} castShadow>
          <boxGeometry args={[6, 3.2, 6]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.7} />
        </mesh>
        <mesh position={[0, 4.0, 0]}>
          <coneGeometry args={[2.8, 3.0, 6]} />
          <meshStandardMaterial color="#cbd5e1" />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 5. ISKCON TEMPLE CAMPUS (At [95, 0.1, -120]) */}
      {/* ============================================================== */}
      <group
        position={[95, 0.1, -120]}
        onClick={(e) => {
          e.stopPropagation();
          selectLandmark('ISKCON_PANDHARPUR');
        }}
      >
        <mesh position={[0, 2.0, 0]} castShadow>
          <boxGeometry args={[22, 3.8, 26]} />
          <meshStandardMaterial color="#ffffff" roughness={0.4} />
        </mesh>
        <mesh position={[0, 7.5, 0]} castShadow>
          <boxGeometry args={[16, 7.5, 18]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.3} />
        </mesh>
        <mesh position={[0, 15.0, 0]} castShadow>
          <coneGeometry args={[7.5, 9.5, 12]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
        </mesh>
        <mesh position={[0, 20.5, 0]}>
          <sphereGeometry args={[1.5, 16, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} />
        </mesh>
        <Html position={[0, 23.0, 0]} center distanceFactor={110}>
          <div style={{ background: 'rgba(9, 13, 22, 0.9)', border: '1px solid #3b82f6', borderRadius: '6px', padding: '4px 10px', color: '#93c5fd', fontSize: '11px', fontWeight: 'bold' }}>
            🏛️ ISKCON Temple
          </div>
        </Html>
      </group>

      {/* ============================================================== */}
      {/* 6. MAHADWAR ARCHWAY GATE (At [-20, 0, 20]) */}
      {/* ============================================================== */}
      <group
        position={[-20, 0, 20]}
        onClick={(e) => {
          e.stopPropagation();
          selectLandmark('MAHADWAR_CHOWK');
        }}
      >
        {/* Left Stone Pillar */}
        <mesh position={[-5, 4.5, 0]} castShadow>
          <boxGeometry args={[2.2, 9.0, 2.2]} />
          <meshStandardMaterial color="#57534e" />
        </mesh>
        {/* Right Stone Pillar */}
        <mesh position={[5, 4.5, 0]} castShadow>
          <boxGeometry args={[2.2, 9.0, 2.2]} />
          <meshStandardMaterial color="#57534e" />
        </mesh>
        {/* Ornate Arch Header */}
        <mesh position={[0, 9.5, 0]} castShadow>
          <boxGeometry args={[12.5, 2.0, 2.6]} />
          <meshStandardMaterial color="#d97706" />
        </mesh>
        <mesh position={[0, 11.2, 0]}>
          <coneGeometry args={[1.8, 1.8, 4]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 7. PANDHARPUR RAILWAY STATION (At [-170, 0, 65]) */}
      {/* ============================================================== */}
      <group
        position={[-170, 0, 65]}
        onClick={(e) => {
          e.stopPropagation();
          selectLandmark('PANDHARPUR_RAILWAY_STATION');
        }}
      >
        {/* Concourse Hall */}
        <mesh position={[0, 4.5, 0]} castShadow>
          <boxGeometry args={[32, 9.0, 18]} />
          <meshStandardMaterial color="#64748b" roughness={0.7} />
        </mesh>
        {/* Station Board */}
        <mesh position={[0, 9.8, 9.2]}>
          <boxGeometry args={[16, 2.0, 0.4]} />
          <meshStandardMaterial color="#fbbf24" />
        </mesh>
        {/* Platform Canopy */}
        <mesh position={[0, 4.8, -14]} castShadow>
          <boxGeometry args={[46, 0.5, 10]} />
          <meshStandardMaterial color="#334155" />
        </mesh>
        {/* Twin Train Tracks */}
        {[-16, -19].map(z => (
          <mesh key={`track_${z}`} position={[0, 0.08, z]}>
            <boxGeometry args={[65, 0.14, 0.6]} />
            <meshStandardMaterial color="#1e293b" metalness={0.9} />
          </mesh>
        ))}
        <Html position={[0, 12.0, 0]} center distanceFactor={110}>
          <div style={{ background: 'rgba(9, 13, 22, 0.9)', border: '1px solid #10b981', borderRadius: '6px', padding: '4px 10px', color: '#6ee7b7', fontSize: '11px', fontWeight: 'bold' }}>
            🚆 Railway Station
          </div>
        </Html>
      </group>

      {/* ============================================================== */}
      {/* 8. MSRTC CENTRAL BUS STAND (At [-100, 0, 50]) */}
      {/* ============================================================== */}
      <group
        position={[-100, 0, 50]}
        onClick={(e) => {
          e.stopPropagation();
          selectLandmark('MSRTC_BUS_STAND');
        }}
      >
        <mesh position={[0, 4.0, 0]} castShadow>
          <boxGeometry args={[26, 8.0, 15]} />
          <meshStandardMaterial color="#475569" roughness={0.8} />
        </mesh>
        <mesh position={[0, 5.0, -11]} castShadow>
          <boxGeometry args={[32, 0.6, 9]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        {/* Red MSRTC Bus */}
        <group position={[-6, 1.8, -11]}>
          <mesh>
            <boxGeometry args={[3.2, 2.8, 8.5]} />
            <meshStandardMaterial color="#dc2626" />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <boxGeometry args={[3.1, 0.8, 8.2]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
        </group>
        <Html position={[0, 9.5, 0]} center distanceFactor={110}>
          <div style={{ background: 'rgba(9, 13, 22, 0.9)', border: '1px solid #f97316', borderRadius: '6px', padding: '4px 10px', color: '#fed7aa', fontSize: '11px', fontWeight: 'bold' }}>
            🚌 Central Bus Stand
          </div>
        </Html>
      </group>

      {/* ============================================================== */}
      {/* 9. SHIVAJI MAHARAJ CHOWK STATUE (At [-55, 0, 0]) */}
      {/* ============================================================== */}
      <group
        position={[-55, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          selectLandmark('SHIVAJI_CHOWK');
        }}
      >
        {/* Roundabout Island */}
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[8.5, 9.0, 0.5, 24]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        {/* Pedestal */}
        <mesh position={[0, 2.2, 0]} castShadow>
          <boxGeometry args={[4.2, 3.8, 4.2]} />
          <meshStandardMaterial color="#1e293b" />
        </mesh>
        {/* Bronze Statue representation */}
        <mesh position={[0, 5.5, 0]} castShadow>
          <cylinderGeometry args={[0.7, 1.2, 3.6, 8]} />
          <meshStandardMaterial color="#b45309" metalness={0.7} roughness={0.4} />
        </mesh>
        <Html position={[0, 8.5, 0]} center distanceFactor={110}>
          <div style={{ background: 'rgba(9, 13, 22, 0.9)', border: '1px solid #f59e0b', borderRadius: '6px', padding: '4px 10px', color: '#fde68a', fontSize: '11px', fontWeight: 'bold' }}>
            ⚔️ Shivaji Maharaj Chowk
          </div>
        </Html>
      </group>
    </group>
  );
}
