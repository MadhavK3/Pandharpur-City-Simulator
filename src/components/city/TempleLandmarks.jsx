import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useSimulationStore } from '../../store/simulationStore.js';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { getBasaltStoneTexture, getTempleCarvingTexture } from '../../engine/rendering/textureUtils.js';

function TempleColumn({ position, height = 4.8, scale = 1, map }) {
  return (
    <group position={position} scale={scale}>
      {/* Molded Plinth Base */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[1.2, 0.5, 1.2]} />
        <meshStandardMaterial map={map} color="#292524" roughness={0.82} />
      </mesh>
      {/* Octagonal/Cylindrical Carved Shaft */}
      <mesh position={[0, height / 2 + 0.5, 0]} castShadow>
        <cylinderGeometry args={[0.38, 0.5, height, 8]} />
        <meshStandardMaterial map={map} color="#443e39" roughness={0.78} />
      </mesh>
      {/* Bell Capital and Bracket Abacus */}
      <mesh position={[0, height + 0.65, 0]} castShadow>
        <cylinderGeometry args={[0.6, 0.4, 0.3, 8]} />
        <meshStandardMaterial color="#292524" roughness={0.8} />
      </mesh>
      <mesh position={[0, height + 0.9, 0]} castShadow>
        <boxGeometry args={[1.4, 0.25, 1.4]} />
        <meshStandardMaterial color="#292524" roughness={0.82} />
      </mesh>
    </group>
  );
}

function LobedArch({ position, width = 5.2, height = 4.2, depth = 0.42 }) {
  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const halfWidth = width / 2;
    const springY = height * 0.54;
    const crownY = height;
    const lobeCount = 5;

    shape.moveTo(-halfWidth, 0);
    shape.lineTo(-halfWidth, springY);
    for (let index = 0; index <= lobeCount; index += 1) {
      const angle = Math.PI - (index / lobeCount) * Math.PI;
      const x = Math.cos(angle) * halfWidth;
      const y = springY + Math.sin(angle) * (crownY - springY);
      if (index === 0) shape.moveTo(x, y);
      else shape.lineTo(x, y);
    }
    shape.lineTo(halfWidth, 0);
    shape.closePath();

    const extruded = new THREE.ExtrudeGeometry(shape, {
      depth,
      bevelEnabled: true,
      bevelSegments: 2,
      bevelSize: 0.08,
      bevelThickness: 0.08
    });
    extruded.translate(0, 0, -depth / 2);
    return extruded;
  }, [width, height, depth]);

  return (
    <mesh geometry={geometry} position={position} castShadow>
      <meshStandardMaterial color="#686058" roughness={0.7} />
    </mesh>
  );
}

function LandmarkPin({ id, title, position, color, selectedLandmarkId, hoveredLandmark, distanceFactor = 110 }) {
  const isSelected = selectedLandmarkId === id;
  const isHovered = hoveredLandmark === id;
  const showDetail = isSelected || isHovered;

  return (
    <Html position={position} center distanceFactor={distanceFactor} zIndexRange={[0, 0]}>
      {showDetail ? (
        <div
          style={{
            background: 'rgba(9, 13, 22, 0.94)',
            border: isSelected ? `2px solid ${color}` : `1px solid ${color}`,
            boxShadow: `0 0 16px ${color}80`,
            borderRadius: '6px',
            padding: '4px 10px',
            color: color,
            fontSize: '11px',
            fontWeight: '700',
            whiteSpace: 'nowrap',
            pointerEvents: 'none'
          }}
        >
          {title}
        </div>
      ) : (
        <div
          style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: color,
            boxShadow: `0 0 10px ${color}`,
            border: '1.5px solid #090d16',
            pointerEvents: 'none'
          }}
        />
      )}
    </Html>
  );
}

export function TempleLandmarks() {
  const selectLandmark = useSimulationStore(state => state.selectLandmark);
  const selectedLandmarkId = useSimulationStore(state => state.selectedLandmarkId);
  const [hoveredLandmark, setHoveredLandmark] = useState(null);

  const flagRef = useRef();
  const pundalikFlagRef = useRef();
  const vishnupadFlagRef = useRef();

  const basaltTexture = useMemo(() => getBasaltStoneTexture(), []);
  const carvingTexture = useMemo(() => getTempleCarvingTexture(), []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (flagRef.current) {
      flagRef.current.rotation.y = Math.sin(t * 3.2) * 0.22;
      flagRef.current.rotation.z = Math.cos(t * 2.2) * 0.12;
    }
    if (pundalikFlagRef.current) {
      pundalikFlagRef.current.rotation.y = Math.sin(t * 3.5 + 1.2) * 0.25;
    }
    if (vishnupadFlagRef.current) {
      vishnupadFlagRef.current.rotation.y = Math.sin(t * 3.0 + 2.0) * 0.22;
    }
  });

  return (
    <group name="temple_landmarks_root">
      {/* ============================================================== */}
      {/* 1. SHREE VITTHAL-RUKMINI MANDIR (Main Grand Landmark at [0,0,0]) */}
      {/* ============================================================== */}
      <group
        position={[0, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          selectLandmark('VITTHAL_RUKMINI_MANDIR');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredLandmark('VITTHAL_RUKMINI_MANDIR');
        }}
        onPointerOut={() => setHoveredLandmark(null)}
      >
        {/* Outer Prakara Enclosure Wall with Carved Basalt Blocks */}
        <group position={[0, 0, 0]}>
          {/* North Wall */}
          <mesh position={[0, 2.8, -28]} castShadow receiveShadow>
            <boxGeometry args={[52, 5.6, 2.0]} />
            <meshStandardMaterial map={basaltTexture} color="#35312e" roughness={0.85} />
          </mesh>
          {/* South Wall */}
          <mesh position={[0, 2.8, 28]} castShadow receiveShadow>
            <boxGeometry args={[52, 5.6, 2.0]} />
            <meshStandardMaterial map={basaltTexture} color="#35312e" roughness={0.85} />
          </mesh>
          {/* West Wall with Mahadwar Opening */}
          <mesh position={[-25, 2.8, -14]} castShadow receiveShadow>
            <boxGeometry args={[2.0, 5.6, 26]} />
            <meshStandardMaterial map={basaltTexture} color="#35312e" roughness={0.85} />
          </mesh>
          <mesh position={[-25, 2.8, 14]} castShadow receiveShadow>
            <boxGeometry args={[2.0, 5.6, 26]} />
            <meshStandardMaterial map={basaltTexture} color="#35312e" roughness={0.85} />
          </mesh>
          {/* East Wall towards Chandrabhaga */}
          <mesh position={[25, 2.8, -15]} castShadow receiveShadow>
            <boxGeometry args={[2.0, 5.6, 24]} />
            <meshStandardMaterial map={basaltTexture} color="#35312e" roughness={0.85} />
          </mesh>
          <mesh position={[25, 2.8, 15]} castShadow receiveShadow>
            <boxGeometry args={[2.0, 5.6, 24]} />
            <meshStandardMaterial map={basaltTexture} color="#35312e" roughness={0.85} />
          </mesh>

          {/* 4 Corner Defensive Bastion Chhatris */}
          {[[-25, -28], [-25, 28], [25, -28], [25, 28]].map(([cx, cz], ci) => (
            <group key={`corner_bastion_${ci}`} position={[cx, 5.6, cz]}>
              <mesh castShadow>
                <cylinderGeometry args={[2.0, 2.3, 2.0, 8]} />
                <meshStandardMaterial map={basaltTexture} color="#292524" roughness={0.85} />
              </mesh>
              <mesh position={[0, 1.5, 0]} castShadow>
                <coneGeometry args={[2.2, 1.4, 8]} />
                <meshStandardMaterial color="#686058" roughness={0.7} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Grand Elevated Stone Jagati Plinth */}
        <mesh position={[0, 0.9, 0]} castShadow receiveShadow>
          <boxGeometry args={[33, 1.8, 45]} />
          <meshStandardMaterial map={basaltTexture} color="#292524" roughness={0.7} />
        </mesh>
        {/* Carved Jagati Base Molding Frieze */}
        <mesh position={[0, 1.7, 0]} receiveShadow>
          <boxGeometry args={[33.4, 0.25, 45.4]} />
          <meshStandardMaterial map={carvingTexture} color="#35312e" roughness={0.8} />
        </mesh>

        {/* Sabha Mandap (Main Assembly Hall: Solakhambi & Caukhambi) */}
        <group position={[0, 1.8, 6]}>
          {/* Mandap Base Hall Walls */}
          <mesh position={[0, 3.2, 0]} castShadow receiveShadow>
            <boxGeometry args={[24, 6.4, 24]} />
            <meshStandardMaterial map={basaltTexture} color="#3e3935" roughness={0.75} />
          </mesh>

          {/* Stepped Pyramidal Stone Roof Tiers */}
          <mesh position={[0, 7.0, 0]} castShadow>
            <boxGeometry args={[22, 1.2, 22]} />
            <meshStandardMaterial map={basaltTexture} color="#524c46" roughness={0.68} />
          </mesh>
          <mesh position={[0, 8.2, 0]} castShadow>
            <boxGeometry args={[18, 1.2, 18]} />
            <meshStandardMaterial color="#4a443e" roughness={0.68} />
          </mesh>
          <mesh position={[0, 9.4, 0]} castShadow>
            <boxGeometry args={[14, 1.2, 14]} />
            <meshStandardMaterial color="#3f3a35" roughness={0.68} />
          </mesh>
          <mesh position={[0, 10.6, 0]} castShadow>
            <cylinderGeometry args={[6.8, 7.4, 2.2, 12]} />
            <meshStandardMaterial color="#38332f" roughness={0.65} />
          </mesh>

          {/* Solakhambi & Caukhambi Pillars */}
          {[[-8, -6], [0, -6], [8, -6], [-8, 6], [0, 6], [8, 6], [-8, 0], [8, 0]].map(([px, pz], index) => (
            <TempleColumn key={`solakhambi_${index}`} position={[px, 1.8, pz]} height={4.6} scale={0.82} map={basaltTexture} />
          ))}
          {[[-3.2, -2.8], [3.2, -2.8], [-3.2, 2.8], [3.2, 2.8]].map(([px, pz], index) => (
            <TempleColumn key={`caukhambi_${index}`} position={[px, 1.8, pz]} height={3.8} scale={0.72} map={basaltTexture} />
          ))}

          <LobedArch position={[0, 2.1, 12.18]} width={8.5} height={5.6} depth={0.55} />
          <LobedArch position={[0, 2.1, -12.18]} width={7.2} height={4.8} depth={0.55} />

          {/* Mandap Central Polished Brass Finial */}
          <mesh position={[0, 12.0, 0]}>
            <sphereGeometry args={[0.9, 14, 14]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.92} roughness={0.18} />
          </mesh>
        </group>

        {/* Garbhagriha (Sanctum Sanctorum) Base */}
        <mesh position={[0, 7.5, -10]} castShadow receiveShadow>
          <boxGeometry args={[20.5, 11.5, 18.5]} />
          <meshStandardMaterial map={basaltTexture} color="#35312e" roughness={0.8} />
        </mesh>
        {/* Carved Sanctum Cornice Frieze */}
        <mesh position={[0, 13.0, -10]} castShadow>
          <boxGeometry args={[21.2, 0.45, 19.2]} />
          <meshStandardMaterial map={carvingTexture} color="#292524" roughness={0.75} />
        </mesh>

        {/* ============================================================== */}
        {/* TOWERING HEMADPANTHI NAGARA SHIKHARA SPIRE (~34M TALL)         */}
        {/* ============================================================== */}
        {/* Tier 1 with Urushringa corner miniature turrets */}
        <group position={[0, 14.5, -10]}>
          <mesh castShadow>
            <boxGeometry args={[16.2, 5.5, 14.2]} />
            <meshStandardMaterial map={basaltTexture} color="#453d36" roughness={0.65} />
          </mesh>
          {/* Corner Miniature Urushringa Turrets */}
          {[[-6.6, -5.6], [6.6, -5.6], [-6.6, 5.6], [6.6, 5.6]].map(([tx, tz], ti) => (
            <group key={`uru1_${ti}`} position={[tx, 1.5, tz]}>
              <mesh castShadow>
                <coneGeometry args={[1.5, 4.0, 8]} />
                <meshStandardMaterial color="#5a4e44" roughness={0.6} />
              </mesh>
              <mesh position={[0, 2.1, 0]}>
                <sphereGeometry args={[0.3, 8, 8]} />
                <meshStandardMaterial color="#fbbf24" metalness={0.9} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Tier 2 */}
        <group position={[0, 19.5, -10]}>
          <mesh castShadow>
            <boxGeometry args={[12.4, 4.8, 11.2]} />
            <meshStandardMaterial map={basaltTexture} color="#3a342e" roughness={0.6} />
          </mesh>
          {[[-4.9, -4.3], [4.9, -4.3], [-4.9, 4.3], [4.9, 4.3]].map(([tx, tz], ti) => (
            <group key={`uru2_${ti}`} position={[tx, 1.2, tz]}>
              <mesh castShadow>
                <coneGeometry args={[1.2, 3.4, 8]} />
                <meshStandardMaterial color="#5a4e44" roughness={0.55} />
              </mesh>
              <mesh position={[0, 1.8, 0]}>
                <sphereGeometry args={[0.25, 8, 8]} />
                <meshStandardMaterial color="#fbbf24" metalness={0.9} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Tier 3 Tapering Shikhara Crown */}
        <mesh position={[0, 24.5, -10]} castShadow>
          <coneGeometry args={[6.4, 8.0, 8]} />
          <meshStandardMaterial color="#322c27" roughness={0.55} />
        </mesh>

        {/* Neck Griva */}
        <mesh position={[0, 28.8, -10]} castShadow>
          <cylinderGeometry args={[2.3, 2.5, 0.9, 16]} />
          <meshStandardMaterial color="#443e39" roughness={0.6} />
        </mesh>

        {/* Ribbed Stone Amalaka Disc */}
        <mesh position={[0, 29.8, -10]} castShadow>
          <cylinderGeometry args={[3.2, 3.4, 1.1, 16]} />
          <meshStandardMaterial color="#5a4f45" roughness={0.5} />
        </mesh>

        {/* Golden Amrit Kalasha (Divine Topmost Finial with Aura) */}
        <mesh position={[0, 31.4, -10]} castShadow>
          <sphereGeometry args={[1.9, 22, 22]} />
          <meshStandardMaterial
            color="#fbbf24"
            metalness={0.96}
            roughness={0.12}
            emissive="#f59e0b"
            emissiveIntensity={1.4}
          />
        </mesh>
        <mesh position={[0, 32.9, -10]}>
          <coneGeometry args={[0.55, 1.5, 14]} />
          <meshStandardMaterial color="#fef08a" metalness={0.98} roughness={0.1} />
        </mesh>

        {/* Giant Saffron Bhagva Dhwaja (Holy Flag) */}
        <group ref={flagRef} position={[0, 33.6, -10]}>
          {/* Flagstaff */}
          <mesh position={[0, 2.8, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 6.0, 8]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.85} />
          </mesh>
          {/* Swallowtail Flag */}
          <mesh position={[1.8, 4.4, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[1.5, 3.8, 3]} />
            <meshStandardMaterial color="#ea580c" roughness={0.4} />
          </mesh>
        </group>

        {/* Courtyard Deepstambha (Monolithic Stone Lamp Towers) */}
        {[[-15, 14], [15, 14]].map(([dx, dz], di) => (
          <group key={`deepstambha_${di}`} position={[dx, 0.9, dz]}>
            <mesh position={[0, 1.0, 0]} castShadow>
              <cylinderGeometry args={[1.4, 1.7, 2.0, 8]} />
              <meshStandardMaterial map={basaltTexture} color="#35312e" roughness={0.88} />
            </mesh>
            <mesh position={[0, 7.0, 0]} castShadow>
              <cylinderGeometry args={[0.6, 1.0, 10.0, 8]} />
              <meshStandardMaterial map={basaltTexture} color="#48423c" roughness={0.85} />
            </mesh>
            {/* Lamp brackets */}
            {[2.5, 4.5, 6.5, 8.5].map((by, bi) => (
              <mesh key={`br_${bi}`} position={[0, by, 0]}>
                <cylinderGeometry args={[1.2, 0.7, 0.35, 8]} />
                <meshStandardMaterial color="#686058" />
              </mesh>
            ))}
            {/* Top Flame Diya */}
            <mesh position={[0, 12.5, 0]}>
              <sphereGeometry args={[0.45, 12, 12]} />
              <meshStandardMaterial
                color="#fbbf24"
                emissive="#f97316"
                emissiveIntensity={2.8}
              />
            </mesh>
            <pointLight position={[0, 13.0, 0]} color="#fbbf24" intensity={2.5} distance={28} />
          </group>
        ))}

        {/* Stone Tulsi Vrindavan in Courtyard */}
        <group position={[0, 0.9, 21]}>
          <mesh position={[0, 1.4, 0]} castShadow>
            <boxGeometry args={[2.4, 2.8, 2.4]} />
            <meshStandardMaterial map={basaltTexture} color="#48423c" roughness={0.8} />
          </mesh>
          <mesh position={[0, 3.0, 0]}>
            <coneGeometry args={[0.8, 0.9, 6]} />
            <meshStandardMaterial color="#166534" roughness={0.9} />
          </mesh>
        </group>

        {/* Floating Name Badge */}
        <LandmarkPin
          id="VITTHAL_RUKMINI_MANDIR"
          title="Shree Vitthal-Rukmini Mandir"
          position={[0, 36, -10]}
          color="#fbbf24"
          selectedLandmarkId={selectedLandmarkId}
          hoveredLandmark={hoveredLandmark}
        />
      </group>

      {/* ============================================================== */}
      {/* 2. SANT NAMDEV PAYARI (At [-4, 0.2, 15])                       */}
      {/* ============================================================== */}
      <group
        position={[-4, 0.2, 15]}
        onClick={(e) => {
          e.stopPropagation();
          selectLandmark('NAMDEV_PAYARTHI');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredLandmark('NAMDEV_PAYARTHI');
        }}
        onPointerOut={() => setHoveredLandmark(null)}
      >
        {/* Basalt Flight of Steps */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <boxGeometry args={[5.2, 1.0, 3.6]} />
          <meshStandardMaterial map={basaltTexture} color="#35312e" roughness={0.7} />
        </mesh>
        {/* Consecrated Golden First Step (Namdev Payari) */}
        <mesh position={[0, 0.55, 1.4]} castShadow>
          <boxGeometry args={[4.2, 0.25, 0.8]} />
          <meshStandardMaterial
            color="#fbbf24"
            metalness={0.92}
            roughness={0.18}
            emissive="#f59e0b"
            emissiveIntensity={0.6}
          />
        </mesh>
        {/* Flanking Ornate Stone Chhatri Shrine */}
        <mesh position={[0, 2.6, 0]}>
          <cylinderGeometry args={[2.4, 2.8, 0.4, 12]} />
          <meshStandardMaterial color="#b45309" roughness={0.6} />
        </mesh>
        <mesh position={[0, 3.5, 0]}>
          <coneGeometry args={[2.0, 1.5, 8]} />
          <meshStandardMaterial color="#d97706" />
        </mesh>
        {/* Brass Bell under lintel */}
        <mesh position={[0, 2.1, 0]}>
          <cylinderGeometry args={[0.25, 0.45, 0.6, 8]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
        </mesh>
        <LandmarkPin
          id="NAMDEV_PAYARTHI"
          title="Sant Namdev Payari"
          position={[0, 4.5, 0]}
          color="#f59e0b"
          selectedLandmarkId={selectedLandmarkId}
          hoveredLandmark={hoveredLandmark}
        />
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
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredLandmark('PUNDALIKA_MANDIR');
        }}
        onPointerOut={() => setHoveredLandmark(null)}
      >
        {/* River Island Basalt Plinth with Waterline Steps */}
        <mesh position={[0, 1.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[10.5, 11.5, 2.6, 8]} />
          <meshStandardMaterial map={basaltTexture} color="#35312e" roughness={0.8} />
        </mesh>
        {/* Mandir Assembly Porch / Mandap with 8 Pillars */}
        <mesh position={[0, 3.5, 0]} castShadow>
          <cylinderGeometry args={[7.2, 8.0, 2.0, 8]} />
          <meshStandardMaterial color="#48423c" roughness={0.7} />
        </mesh>
        {/* Mandir Sanctum Base */}
        <mesh position={[0, 6.2, 0]} castShadow>
          <cylinderGeometry args={[6.0, 6.8, 3.8, 8]} />
          <meshStandardMaterial map={basaltTexture} color="#5a4e44" roughness={0.65} />
        </mesh>
        {/* Stepped Shikhara Spire */}
        <mesh position={[0, 10.8, 0]} castShadow>
          <coneGeometry args={[5.2, 8.0, 8]} />
          <meshStandardMaterial color="#453d36" roughness={0.55} />
        </mesh>
        {/* Amalaka & Golden Kalasha */}
        <mesh position={[0, 15.2, 0]}>
          <cylinderGeometry args={[1.8, 2.0, 0.6, 12]} />
          <meshStandardMaterial color="#5a4f45" />
        </mesh>
        <mesh position={[0, 16.2, 0]}>
          <sphereGeometry args={[1.2, 16, 16]} />
          <meshStandardMaterial
            color="#fbbf24"
            metalness={0.95}
            roughness={0.15}
            emissive="#f59e0b"
            emissiveIntensity={0.8}
          />
        </mesh>
        {/* Waving Saffron Flag on Pundalik Mandir */}
        <group ref={pundalikFlagRef} position={[0, 17.5, 0]}>
          <mesh position={[0, 1.4, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 3.0, 6]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
          <mesh position={[1.0, 2.2, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.8, 2.0, 3]} />
            <meshStandardMaterial color="#ea580c" />
          </mesh>
        </group>
        <LandmarkPin
          id="PUNDALIKA_MANDIR"
          title="Bhakta Pundalik Mandir"
          position={[0, 19.5, 0]}
          color="#f97316"
          selectedLandmarkId={selectedLandmarkId}
          hoveredLandmark={hoveredLandmark}
        />
      </group>

      {/* ============================================================== */}
      {/* 4. VISHNUPAD MANDIR (Riverside Sandbar at [118, -0.6, 68])      */}
      {/* ============================================================== */}
      <group
        position={[118, -0.6, 68]}
        onClick={(e) => {
          e.stopPropagation();
          selectLandmark('VISHNUPAD_MANDIR');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredLandmark('VISHNUPAD_MANDIR');
        }}
        onPointerOut={() => setHoveredLandmark(null)}
      >
        {/* Sandbar Basalt Foundation */}
        <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[8.5, 9.5, 2.2, 8]} />
          <meshStandardMaterial map={basaltTexture} color="#35312e" roughness={0.82} />
        </mesh>
        {/* 16-Pillared Open Mandapa Pavilion */}
        <group position={[0, 2.1, 0]}>
          {Array.from({ length: 8 }).map((_, pi) => {
            const angle = (pi / 8) * Math.PI * 2;
            const px = Math.cos(angle) * 5.2;
            const pz = Math.sin(angle) * 5.2;
            return (
              <mesh key={`vish_col_${pi}`} position={[px, 1.6, pz]} castShadow>
                <cylinderGeometry args={[0.26, 0.34, 3.2, 8]} />
                <meshStandardMaterial map={basaltTexture} color="#48423c" roughness={0.75} />
              </mesh>
            );
          })}
          {/* Octagonal Stepped Stone Canopy */}
          <mesh position={[0, 3.6, 0]} castShadow>
            <cylinderGeometry args={[5.8, 6.2, 0.8, 8]} />
            <meshStandardMaterial color="#5a4e44" roughness={0.7} />
          </mesh>
          <mesh position={[0, 4.8, 0]} castShadow>
            <coneGeometry args={[4.8, 2.2, 8]} />
            <meshStandardMaterial color="#453d36" roughness={0.65} />
          </mesh>
          {/* Golden Finial */}
          <mesh position={[0, 6.2, 0]}>
            <sphereGeometry args={[0.6, 12, 12]} />
            <meshStandardMaterial color="#fbbf24" metalness={0.92} roughness={0.2} emissive="#f59e0b" emissiveIntensity={0.6} />
          </mesh>
          {/* Holy Footprints Stone Pedestal (Charan Paduka) */}
          <mesh position={[0, 0.35, 0]} castShadow>
            <boxGeometry args={[2.2, 0.5, 2.2]} />
            <meshStandardMaterial color="#1c1917" roughness={0.5} />
          </mesh>
        </group>
        {/* Saffron Flag */}
        <group ref={vishnupadFlagRef} position={[0, 6.8, 0]}>
          <mesh position={[0, 1.2, 0]}>
            <cylinderGeometry args={[0.06, 0.06, 2.4, 6]} />
            <meshStandardMaterial color="#fbbf24" />
          </mesh>
          <mesh position={[0.7, 1.8, 0]} rotation={[0, 0, -Math.PI / 2]}>
            <coneGeometry args={[0.6, 1.6, 3]} />
            <meshStandardMaterial color="#ea580c" />
          </mesh>
        </group>
        <LandmarkPin
          id="VISHNUPAD_MANDIR"
          title="Vishnupad Mandir"
          position={[0, 8.5, 0]}
          color="#f59e0b"
          selectedLandmarkId={selectedLandmarkId}
          hoveredLandmark={hoveredLandmark}
        />
      </group>

      {/* ============================================================== */}
      {/* 5. SANT JANABAI & SANT BHANUDAS SAMADHIS                       */}
      {/* ============================================================== */}
      <group
        position={[110, -0.6, 35]}
        onClick={(e) => {
          e.stopPropagation();
          selectLandmark('SANT_JANABAI_SAMADHI');
        }}
      >
        <mesh position={[0, 1.6, 0]} castShadow>
          <boxGeometry args={[6.5, 3.2, 6.5]} />
          <meshStandardMaterial map={basaltTexture} color="#cbd5e1" roughness={0.65} />
        </mesh>
        <mesh position={[0, 4.4, 0]} castShadow>
          <sphereGeometry args={[2.6, 12, 12]} />
          <meshStandardMaterial color="#94a3b8" roughness={0.6} />
        </mesh>
        <mesh position={[0, 7.2, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 1.8, 6]} />
          <meshStandardMaterial color="#fbbf24" />
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
          <boxGeometry args={[6.5, 3.2, 6.5]} />
          <meshStandardMaterial map={basaltTexture} color="#cbd5e1" roughness={0.65} />
        </mesh>
        <mesh position={[0, 4.2, 0]} castShadow>
          <coneGeometry args={[3.0, 3.2, 6]} />
          <meshStandardMaterial color="#94a3b8" />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 6. ISKCON TEMPLE CAMPUS (At [95, 0.1, -120])                   */}
      {/* ============================================================== */}
      <group
        position={[95, 0.1, -120]}
        onClick={(e) => {
          e.stopPropagation();
          selectLandmark('ISKCON_PANDHARPUR');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredLandmark('ISKCON_PANDHARPUR');
        }}
        onPointerOut={() => setHoveredLandmark(null)}
      >
        <mesh position={[0, 2.0, 0]} castShadow>
          <boxGeometry args={[24, 4.0, 28]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.35} />
        </mesh>
        <mesh position={[0, 7.8, 0]} castShadow>
          <boxGeometry args={[18, 7.8, 20]} />
          <meshStandardMaterial color="#f1f5f9" roughness={0.3} />
        </mesh>
        <mesh position={[0, 15.5, 0]} castShadow>
          <coneGeometry args={[8.0, 10.5, 12]} />
          <meshStandardMaterial color="#e2e8f0" roughness={0.3} />
        </mesh>
        <mesh position={[0, 21.2, 0]}>
          <sphereGeometry args={[1.6, 16, 16]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.15} />
        </mesh>
        <LandmarkPin
          id="ISKCON_PANDHARPUR"
          title="ISKCON Temple"
          position={[0, 23.5, 0]}
          color="#60a5fa"
          selectedLandmarkId={selectedLandmarkId}
          hoveredLandmark={hoveredLandmark}
        />
      </group>

      {/* ============================================================== */}
      {/* 7. MAHADWAR ARCHWAY GATEWAY (At [-20, 0, 20])                  */}
      {/* ============================================================== */}
      <group
        position={[-20, 0, 20]}
        onClick={(e) => {
          e.stopPropagation();
          selectLandmark('MAHADWAR_CHOWK');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredLandmark('MAHADWAR_CHOWK');
        }}
        onPointerOut={() => setHoveredLandmark(null)}
      >
        <mesh position={[-5.5, 5.0, 0]} castShadow>
          <boxGeometry args={[2.5, 10.0, 2.5]} />
          <meshStandardMaterial map={basaltTexture} color="#35312e" roughness={0.8} />
        </mesh>
        <mesh position={[5.5, 5.0, 0]} castShadow>
          <boxGeometry args={[2.5, 10.0, 2.5]} />
          <meshStandardMaterial map={basaltTexture} color="#35312e" roughness={0.8} />
        </mesh>
        <mesh position={[0, 10.5, 0]} castShadow>
          <boxGeometry args={[13.5, 2.2, 3.0]} />
          <meshStandardMaterial color="#d97706" roughness={0.65} />
        </mesh>
        <mesh position={[0, 12.2, 0]}>
          <coneGeometry args={[2.0, 2.0, 4]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.8} />
        </mesh>
        <LandmarkPin
          id="MAHADWAR_CHOWK"
          title="Mahadwar Bazaar Chowk"
          position={[0, 13.5, 0]}
          color="#f59e0b"
          selectedLandmarkId={selectedLandmarkId}
          hoveredLandmark={hoveredLandmark}
        />
      </group>

      {/* ============================================================== */}
      {/* 8. PANDHARPUR RAILWAY STATION (At [-170, 0, 65])               */}
      {/* ============================================================== */}
      <group
        position={[-170, 0, 65]}
        onClick={(e) => {
          e.stopPropagation();
          selectLandmark('PANDHARPUR_RAILWAY_STATION');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredLandmark('PANDHARPUR_RAILWAY_STATION');
        }}
        onPointerOut={() => setHoveredLandmark(null)}
      >
        <mesh position={[0, 4.8, 0]} castShadow>
          <boxGeometry args={[34, 9.6, 18]} />
          <meshStandardMaterial color="#64748b" roughness={0.7} />
        </mesh>
        <mesh position={[0, 10.2, 9.2]}>
          <boxGeometry args={[18, 2.2, 0.4]} />
          <meshStandardMaterial color="#fbbf24" roughness={0.5} />
        </mesh>
        <mesh position={[0, 5.0, -14]} castShadow>
          <boxGeometry args={[48, 0.6, 10]} />
          <meshStandardMaterial color="#334155" roughness={0.6} />
        </mesh>
        {[-16, -19].map(z => (
          <mesh key={`track_${z}`} position={[0, 0.08, z]}>
            <boxGeometry args={[70, 0.16, 0.6]} />
            <meshStandardMaterial color="#0f172a" metalness={0.9} />
          </mesh>
        ))}
        <LandmarkPin
          id="PANDHARPUR_RAILWAY_STATION"
          title="Railway Station"
          position={[0, 12.5, 0]}
          color="#34d399"
          selectedLandmarkId={selectedLandmarkId}
          hoveredLandmark={hoveredLandmark}
        />
      </group>

      {/* ============================================================== */}
      {/* 9. MSRTC CENTRAL BUS STAND (At [-100, 0, 50])                  */}
      {/* ============================================================== */}
      <group
        position={[-100, 0, 50]}
        onClick={(e) => {
          e.stopPropagation();
          selectLandmark('MSRTC_BUS_STAND');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredLandmark('MSRTC_BUS_STAND');
        }}
        onPointerOut={() => setHoveredLandmark(null)}
      >
        <mesh position={[0, 4.2, 0]} castShadow>
          <boxGeometry args={[28, 8.4, 16]} />
          <meshStandardMaterial color="#475569" roughness={0.8} />
        </mesh>
        <mesh position={[0, 5.2, -11]} castShadow>
          <boxGeometry args={[34, 0.6, 9]} />
          <meshStandardMaterial color="#dc2626" />
        </mesh>
        <group position={[-6, 1.8, -11]}>
          <mesh castShadow>
            <boxGeometry args={[3.2, 2.8, 8.8]} />
            <meshStandardMaterial color="#dc2626" roughness={0.4} />
          </mesh>
          <mesh position={[0, 0.8, 0]}>
            <boxGeometry args={[3.1, 0.8, 8.5]} />
            <meshStandardMaterial color="#f8fafc" />
          </mesh>
        </group>
        <LandmarkPin
          id="MSRTC_BUS_STAND"
          title="Central Bus Stand"
          position={[0, 9.8, 0]}
          color="#fb923c"
          selectedLandmarkId={selectedLandmarkId}
          hoveredLandmark={hoveredLandmark}
        />
      </group>

      {/* ============================================================== */}
      {/* 10. SHIVAJI MAHARAJ CHOWK (At [-55, 0, 0])                     */}
      {/* ============================================================== */}
      <group
        position={[-55, 0, 0]}
        onClick={(e) => {
          e.stopPropagation();
          selectLandmark('SHIVAJI_CHOWK');
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHoveredLandmark('SHIVAJI_CHOWK');
        }}
        onPointerOut={() => setHoveredLandmark(null)}
      >
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[9.0, 9.5, 0.5, 24]} />
          <meshStandardMaterial color="#475569" />
        </mesh>
        <mesh position={[0, 2.2, 0]} castShadow>
          <boxGeometry args={[4.4, 4.0, 4.4]} />
          <meshStandardMaterial map={basaltTexture} color="#1e293b" />
        </mesh>
        <mesh position={[0, 5.8, 0]} castShadow>
          <cylinderGeometry args={[0.8, 1.3, 3.8, 8]} />
          <meshStandardMaterial color="#b45309" metalness={0.75} roughness={0.35} />
        </mesh>
        <LandmarkPin
          id="SHIVAJI_CHOWK"
          title="Shivaji Maharaj Chowk"
          position={[0, 8.8, 0]}
          color="#facc15"
          selectedLandmarkId={selectedLandmarkId}
          hoveredLandmark={hoveredLandmark}
        />
      </group>
    </group>
  );
}

export default TempleLandmarks;
