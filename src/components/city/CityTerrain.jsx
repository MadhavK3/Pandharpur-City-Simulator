import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getBasaltStoneTexture, getWaterNormalTexture } from '../../engine/rendering/textureUtils.js';

export function CityTerrain() {
  const basaltTexture = useMemo(() => getBasaltStoneTexture(), []);
  const waterNormal = useMemo(() => getWaterNormalTexture(), []);

  // Diverse tree locations across Pandharpur quarters matching reference panoramas
  const { shadeTrees, sacredBanyans, palmTrees, easternBankTrees } = useMemo(() => {
    // 1. Shady Neem & Gulmohar street trees
    const shade = [
      // Mahadwar & Mandir approach
      { x: -32, z: 2, scale: 1.1 },
      { x: -28, z: 38, scale: 0.95 },
      { x: 26, z: 36, scale: 1.0 },
      { x: 30, z: -8, scale: 1.05 },
      { x: 32, z: -30, scale: 0.9 },
      // Navi Peth lanes
      { x: -50, z: -8, scale: 1.0 },
      { x: -62, z: 12, scale: 1.15 },
      { x: -52, z: 45, scale: 1.0 },
      { x: -75, z: 30, scale: 0.9 },
      // Kasba Peth & North Pradakshina
      { x: -25, z: -35, scale: 1.1 },
      { x: 0, z: -48, scale: 1.0 },
      { x: 20, z: -68, scale: 1.05 },
      { x: -45, z: -55, scale: 0.95 },
      { x: 60, z: -45, scale: 1.1 },
      // Bhakta Niwas courtyards
      { x: -50, z: 92, scale: 1.1 },
      { x: -75, z: 100, scale: 1.05 },
      { x: -30, z: 115, scale: 0.95 },
      // Jijabai Garden grove (grid)
      { x: -60, z: -95, scale: 1.1 },
      { x: -45, z: -95, scale: 1.0 },
      { x: -30, z: -95, scale: 1.05 },
      { x: -60, z: -80, scale: 0.95 },
      { x: -45, z: -80, scale: 1.2 },
      { x: -30, z: -80, scale: 1.0 },
      { x: -60, z: -65, scale: 1.05 },
      { x: -45, z: -65, scale: 0.95 },
      { x: -30, z: -65, scale: 1.1 }
    ];

    // 2. Giant Sacred Banyan & Peepal trees (wide canopy)
    const banyans = [
      { x: -34, z: -10, scale: 1.4 },  // West Mandir courtyard
      { x: 28, z: 8, scale: 1.35 },    // East riverside courtyard
      { x: -80, z: 5, scale: 1.3 },    // Shivaji Chowk perimeter
      { x: 70, z: 18, scale: 1.25 },   // Chandrabhaga upper ghat terrace
      { x: -110, z: 35, scale: 1.3 }   // Bus Stand forecourt
    ];

    // 3. Coconut Palm Trees along riverbank & Padmavati Lake
    const palms = [];
    // Chandrabhaga western embankment promenade (X ≈ 84)
    for (let z = -140; z <= 140; z += 20) {
      palms.push({ x: 84 + (Math.sin(z) * 2), z, scale: 0.9 + Math.cos(z * 2) * 0.2 });
    }
    // Padmavati Lake perimeter
    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 4) {
      palms.push({
        x: -88 + Math.cos(angle) * 30,
        z: 120 + Math.sin(angle) * 30,
        scale: 0.95
      });
    }

    // 4. Distant Eastern Riverbank pastoral trees
    const eastern = [];
    for (let z = -160; z <= 160; z += 35) {
      eastern.push({ x: 200 + Math.sin(z) * 15, z: z, scale: 1.2 });
      eastern.push({ x: 240 + Math.cos(z) * 20, z: z + 15, scale: 1.3 });
    }

    return { shadeTrees: shade, sacredBanyans: banyans, palmTrees: palms, easternBankTrees: eastern };
  }, []);

  return (
    <group name="terrain_root">
      {/* ============================================================== */}
      {/* 1. URBAN TOWN GROUND PLANE (Dark Soil & Stone Paving Base)     */}
      {/* ============================================================== */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-86, -0.05, 0]} receiveShadow>
        <planeGeometry args={[348, 420, 32, 32]} />
        <meshStandardMaterial
          map={basaltTexture}
          color="#383533"
          roughness={0.92}
          metalness={0.05}
        />
      </mesh>

      {/* ============================================================== */}
      {/* 2. DISTANT EASTERN RIVERBANK (Verdant Pastoral Greenery)       */}
      {/* ============================================================== */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[240, -0.05, 0]} receiveShadow>
        <planeGeometry args={[160, 450, 16, 16]} />
        <meshStandardMaterial
          color="#166534"
          roughness={0.92}
        />
      </mesh>

      {/* ============================================================== */}
      {/* 3. DECCAN BASALT EMBANKMENT RETAINING WALL (X=87.5)            */}
      {/* ============================================================== */}
      <mesh position={[87.5, -0.35, 0]} receiveShadow castShadow>
        <boxGeometry args={[1.8, 1.2, 420]} />
        <meshStandardMaterial
          map={basaltTexture}
          color="#3f3f46"
          roughness={0.85}
        />
      </mesh>

      {/* ============================================================== */}
      {/* 4. TEMPLE SANCTUM COURTYARD STONE PAVEMENT AROUND VITTHAL     */}
      {/* ============================================================== */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]} receiveShadow>
        <planeGeometry args={[70, 84]} />
        <meshStandardMaterial
          map={basaltTexture}
          color="#292524"
          roughness={0.65}
          metalness={0.12}
        />
      </mesh>

      {/* ============================================================== */}
      {/* 5. SHIVAJI MAHARAJ CHOWK ROUNDABOUT PLAZA                      */}
      {/* ============================================================== */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-55, 0.03, 0]} receiveShadow>
        <circleGeometry args={[22, 32]} />
        <meshStandardMaterial
          map={basaltTexture}
          color="#475569"
          roughness={0.7}
        />
      </mesh>

      {/* ============================================================== */}
      {/* 6. MAHADWAR CHOWK BAZAAR COBBLESTONE FORECOURT                 */}
      {/* ============================================================== */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-20, 0.03, 22]} receiveShadow>
        <planeGeometry args={[30, 40]} />
        <meshStandardMaterial
          map={basaltTexture}
          color="#44403c"
          roughness={0.75}
        />
      </mesh>

      {/* ============================================================== */}
      {/* 7. RAILWAY STATION CONCOURSE PAVED FORECOURT                   */}
      {/* ============================================================== */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-170, 0.03, 65]} receiveShadow>
        <planeGeometry args={[52, 40]} />
        <meshStandardMaterial
          color="#475569"
          roughness={0.8}
        />
      </mesh>

      {/* ============================================================== */}
      {/* 8. RASHTRAMATA JIJABAI UDYAN (Lush Greenery at [-45, -80])     */}
      {/* ============================================================== */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-45, 0.05, -80]} receiveShadow>
        <planeGeometry args={[54, 48]} />
        <meshStandardMaterial
          color="#15803d"
          roughness={0.82}
        />
      </mesh>

      {/* ============================================================== */}
      {/* 9. PADMAVATI LAKE BASIN & STONE GHAT STEPS RING                */}
      {/* ============================================================== */}
      <group position={[-88, 0, 120]}>
        {/* Stone Ghat Steps Surround */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
          <ringGeometry args={[24, 28, 32]} />
          <meshStandardMaterial map={basaltTexture} color="#44403c" roughness={0.8} />
        </mesh>
        {/* Lake Water Surface with subtle ripple */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.2, 0]}>
          <circleGeometry args={[24.5, 32]} />
          <meshStandardMaterial
            color="#0369a1"
            roughness={0.12}
            metalness={0.75}
            transparent
            opacity={0.92}
          />
        </mesh>
      </group>

      {/* ============================================================== */}
      {/* 10. SACRED BANYAN & PEEPAL TREES (Broad Spreading Canopy)       */}
      {/* ============================================================== */}
      {sacredBanyans.map((tree, i) => (
        <group key={`banyan_${i}`} position={[tree.x, 0, tree.z]} scale={tree.scale}>
          {/* Stout Gnarled Basalt-Root Trunk */}
          <mesh position={[0, 2.4, 0]} castShadow>
            <cylinderGeometry args={[0.9, 1.4, 4.8, 8]} />
            <meshStandardMaterial color="#451a03" roughness={0.95} />
          </mesh>
          {/* Broad Layered Foliage Canopy */}
          <mesh position={[0, 6.2, 0]} castShadow>
            <sphereGeometry args={[4.2, 12, 12]} />
            <meshStandardMaterial color="#14532d" roughness={0.8} />
          </mesh>
          <mesh position={[1.4, 7.4, -0.8]} castShadow>
            <sphereGeometry args={[3.2, 10, 10]} />
            <meshStandardMaterial color="#166534" roughness={0.75} />
          </mesh>
          <mesh position={[-1.2, 7.0, 1.0]} castShadow>
            <sphereGeometry args={[3.0, 10, 10]} />
            <meshStandardMaterial color="#15803d" roughness={0.78} />
          </mesh>
        </group>
      ))}

      {/* ============================================================== */}
      {/* 11. NEEM & SHADE TREES (Residential & Courtyard Greenery)      */}
      {/* ============================================================== */}
      {shadeTrees.map((tree, i) => (
        <group key={`shade_${i}`} position={[tree.x, 0, tree.z]} scale={tree.scale}>
          <mesh position={[0, 2.0, 0]} castShadow>
            <cylinderGeometry args={[0.32, 0.52, 4.0, 8]} />
            <meshStandardMaterial color="#3d1d07" roughness={0.9} />
          </mesh>
          <mesh position={[0, 5.0, 0]} castShadow>
            <sphereGeometry args={[2.6, 10, 10]} />
            <meshStandardMaterial color="#166534" roughness={0.75} />
          </mesh>
          <mesh position={[0.4, 6.2, 0.2]} castShadow>
            <sphereGeometry args={[1.9, 8, 8]} />
            <meshStandardMaterial color="#15803d" roughness={0.72} />
          </mesh>
        </group>
      ))}

      {/* ============================================================== */}
      {/* 12. COCONUT PALM TREES ALONG RIVER PROMENADE & LAKE            */}
      {/* ============================================================== */}
      {palmTrees.map((palm, i) => (
        <group key={`palm_${i}`} position={[palm.x, 0, palm.z]} scale={palm.scale}>
          {/* Slender Curved Trunk */}
          <mesh position={[0, 4.0, 0]} rotation={[0, 0, 0.07]} castShadow>
            <cylinderGeometry args={[0.22, 0.42, 8.0, 8]} />
            <meshStandardMaterial color="#5c3a21" roughness={0.92} />
          </mesh>
          {/* Radiating Palm Fronds Canopy */}
          <mesh position={[0.5, 8.2, 0]} castShadow>
            <coneGeometry args={[3.4, 2.2, 7]} />
            <meshStandardMaterial color="#22c55e" roughness={0.7} />
          </mesh>
          <mesh position={[0.5, 9.1, 0]}>
            <coneGeometry args={[2.2, 1.6, 6]} />
            <meshStandardMaterial color="#16a34a" roughness={0.68} />
          </mesh>
        </group>
      ))}

      {/* ============================================================== */}
      {/* 13. EASTERN RIVERBANK DISTANT GROVES                           */}
      {/* ============================================================== */}
      {easternBankTrees.map((tree, i) => (
        <group key={`east_${i}`} position={[tree.x, 0, tree.z]} scale={tree.scale}>
          <mesh position={[0, 2.6, 0]} castShadow>
            <cylinderGeometry args={[0.4, 0.7, 5.2, 6]} />
            <meshStandardMaterial color="#451a03" />
          </mesh>
          <mesh position={[0, 6.5, 0]} castShadow>
            <sphereGeometry args={[3.5, 8, 8]} />
            <meshStandardMaterial color="#166534" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default CityTerrain;
