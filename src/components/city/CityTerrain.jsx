import React, { useMemo } from 'react';
import * as THREE from 'three';
import { getBasaltStoneTexture, getWaterNormalTexture } from '../../engine/rendering/textureUtils.js';

// Realistic Organic Sacred Banyan / Peepal Tree with drop roots and layered foliage lobes
function OrganicBanyanTree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Central stout gnarled trunk */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <cylinderGeometry args={[1.0, 1.6, 5.0, 8]} />
        <meshStandardMaterial color="#352316" roughness={0.95} />
      </mesh>

      {/* Drop aerial roots (Prop roots) connecting branches to ground */}
      {[
        [-1.6, 0.4],
        [1.5, -0.6],
        [-0.5, 1.6],
        [0.8, 1.4]
      ].map(([rx, rz], rIdx) => (
        <mesh key={`prop_root_${rIdx}`} position={[rx, 2.2, rz]} castShadow>
          <cylinderGeometry args={[0.18, 0.28, 4.4, 6]} />
          <meshStandardMaterial color="#2d1c11" roughness={0.96} />
        </mesh>
      ))}

      {/* Main horizontal spreading branch boles */}
      <mesh position={[0.8, 4.4, -0.4]} rotation={[0.3, 0.2, 0.7]} castShadow>
        <cylinderGeometry args={[0.45, 0.7, 3.8, 6]} />
        <meshStandardMaterial color="#352316" roughness={0.95} />
      </mesh>
      <mesh position={[-0.9, 4.2, 0.6]} rotation={[-0.4, 0.5, -0.6]} castShadow>
        <cylinderGeometry args={[0.4, 0.65, 3.6, 6]} />
        <meshStandardMaterial color="#352316" roughness={0.95} />
      </mesh>

      {/* Multi-lobed broad leafy canopy */}
      <mesh position={[0, 6.4, 0]} castShadow>
        <dodecahedronGeometry args={[4.4, 1]} />
        <meshStandardMaterial color="#143e20" roughness={0.88} />
      </mesh>
      <mesh position={[2.0, 7.2, -1.2]} castShadow>
        <dodecahedronGeometry args={[3.2, 1]} />
        <meshStandardMaterial color="#1a4d28" roughness={0.86} />
      </mesh>
      <mesh position={[-1.8, 7.0, 1.4]} castShadow>
        <dodecahedronGeometry args={[3.0, 1]} />
        <meshStandardMaterial color="#164323" roughness={0.88} />
      </mesh>
      <mesh position={[0.4, 8.4, 0.6]} castShadow>
        <dodecahedronGeometry args={[2.6, 1]} />
        <meshStandardMaterial color="#215c32" roughness={0.85} />
      </mesh>
    </group>
  );
}

// Realistic Organic Neem / Gulmohar Tree with branching crown and feathery canopy
function OrganicNeemTree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Curved organic trunk */}
      <mesh position={[0, 2.2, 0]} rotation={[0.04, 0, 0.05]} castShadow>
        <cylinderGeometry args={[0.32, 0.55, 4.4, 7]} />
        <meshStandardMaterial color="#3a2414" roughness={0.92} />
      </mesh>

      {/* Branch forks */}
      <mesh position={[0.6, 4.2, 0.3]} rotation={[0.4, 0, 0.5]} castShadow>
        <cylinderGeometry args={[0.18, 0.3, 2.6, 6]} />
        <meshStandardMaterial color="#3a2414" roughness={0.92} />
      </mesh>
      <mesh position={[-0.5, 4.0, -0.4]} rotation={[-0.3, 0.2, -0.45]} castShadow>
        <cylinderGeometry args={[0.16, 0.28, 2.4, 6]} />
        <meshStandardMaterial color="#3a2414" roughness={0.92} />
      </mesh>

      {/* Multi-cluster organic foliage lobes */}
      <mesh position={[0, 5.6, 0]} castShadow>
        <dodecahedronGeometry args={[2.6, 1]} />
        <meshStandardMaterial color="#1b4d24" roughness={0.86} />
      </mesh>
      <mesh position={[1.2, 6.4, 0.5]} castShadow>
        <dodecahedronGeometry args={[2.0, 1]} />
        <meshStandardMaterial color="#22622f" roughness={0.84} />
      </mesh>
      <mesh position={[-1.0, 6.2, -0.6]} castShadow>
        <dodecahedronGeometry args={[1.9, 1]} />
        <meshStandardMaterial color="#194822" roughness={0.86} />
      </mesh>
      <mesh position={[0.2, 7.4, -0.2]} castShadow>
        <dodecahedronGeometry args={[1.6, 1]} />
        <meshStandardMaterial color="#297337" roughness={0.82} />
      </mesh>
    </group>
  );
}

// Realistic Coconut Palm Tree with ringed trunk and radiating drooping fronds
function OrganicPalmTree({ position, scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Slender curved trunk with natural lean */}
      <mesh position={[0.3, 4.4, 0]} rotation={[0, 0, 0.08]} castShadow>
        <cylinderGeometry args={[0.2, 0.38, 8.8, 8]} />
        <meshStandardMaterial color="#4d321d" roughness={0.92} />
      </mesh>

      {/* Coconut cluster under crown */}
      <group position={[0.65, 8.6, 0]}>
        {[0, 1.2, 2.4, 3.6, 4.8].map((angle, ci) => (
          <mesh
            key={`nut_${ci}`}
            position={[Math.cos(angle) * 0.35, -0.2, Math.sin(angle) * 0.35]}
            castShadow
          >
            <sphereGeometry args={[0.22, 6, 6]} />
            <meshStandardMaterial color="#6b4c2b" roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* Radiating drooping palm fronds (8 individual fronds) */}
      <group position={[0.65, 8.8, 0]}>
        {Array.from({ length: 8 }).map((_, fi) => {
          const angle = (fi / 8) * Math.PI * 2;
          return (
            <group key={`frond_${fi}`} rotation={[0, angle, 0]}>
              {/* Frond stem and arching leaf blade */}
              <mesh
                position={[1.8, -0.4, 0]}
                rotation={[0, 0, -0.32]}
                castShadow
              >
                <boxGeometry args={[3.6, 0.06, 0.65]} />
                <meshStandardMaterial color="#15803d" roughness={0.7} />
              </mesh>
              {/* Drooping frond tip */}
              <mesh
                position={[3.8, -1.3, 0]}
                rotation={[0, 0, -0.75]}
                castShadow
              >
                <boxGeometry args={[1.8, 0.05, 0.45]} />
                <meshStandardMaterial color="#166534" roughness={0.72} />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}

export function CityTerrain() {
  const basaltTexture = useMemo(() => getBasaltStoneTexture(), []);
  const waterNormal = useMemo(() => getWaterNormalTexture(), []);

  // Diverse tree locations across Pandharpur quarters matching reference panoramas
  const { shadeTrees, sacredBanyans, palmTrees, easternBankTrees } = useMemo(() => {
    // 1. Shady Neem & Gulmohar street trees
    const shade = [
      // Mahadwar & Mandir approach
      { x: -32, z: -8, scale: 1.05 },
      { x: -28, z: 38, scale: 0.95 },
      { x: 26, z: 36, scale: 1.0 },
      { x: 30, z: -8, scale: 1.05 },
      { x: 32, z: -30, scale: 0.9 },
      // Navi Peth lanes
      { x: -50, z: -14, scale: 1.0 },
      { x: -66, z: 10, scale: 1.1 },
      { x: -52, z: 54, scale: 1.0 },
      { x: -75, z: 30, scale: 0.9 },
      // Kasba Peth & North Pradakshina
      { x: -25, z: -35, scale: 1.1 },
      { x: 0, z: -48, scale: 1.0 },
      { x: 20, z: -68, scale: 1.05 },
      { x: -48, z: -62, scale: 0.95 },
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
      { x: -34, z: -10, scale: 1.35 },  // West Mandir courtyard
      { x: 34, z: 12, scale: 1.3 },     // East riverside courtyard
      { x: -80, z: 5, scale: 1.3 },     // Shivaji Chowk perimeter
      { x: 76, z: 26, scale: 1.25 },    // Chandrabhaga upper ghat terrace
      { x: -110, z: 35, scale: 1.3 }    // Bus Stand forecourt
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
          color="#35312e"
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
      {/* 10. SACRED BANYAN & PEEPAL TREES (ORGANIC BROAD CANOPY)        */}
      {/* ============================================================== */}
      {sacredBanyans.map((tree, i) => (
        <OrganicBanyanTree
          key={`banyan_${i}`}
          position={[tree.x, 0, tree.z]}
          scale={tree.scale}
        />
      ))}

      {/* ============================================================== */}
      {/* 11. NEEM & SHADE TREES (ORGANIC COURTYARD GREENERY)            */}
      {/* ============================================================== */}
      {shadeTrees.map((tree, i) => (
        <OrganicNeemTree
          key={`shade_${i}`}
          position={[tree.x, 0, tree.z]}
          scale={tree.scale}
        />
      ))}

      {/* ============================================================== */}
      {/* 12. COCONUT PALM TREES ALONG RIVER PROMENADE & LAKE            */}
      {/* ============================================================== */}
      {palmTrees.map((palm, i) => (
        <OrganicPalmTree
          key={`palm_${i}`}
          position={[palm.x, 0, palm.z]}
          scale={palm.scale}
        />
      ))}

      {/* ============================================================== */}
      {/* 13. EASTERN RIVERBANK DISTANT GROVES                           */}
      {/* ============================================================== */}
      {easternBankTrees.map((tree, i) => (
        <OrganicNeemTree
          key={`east_${i}`}
          position={[tree.x, 0, tree.z]}
          scale={tree.scale}
        />
      ))}
    </group>
  );
}

export default CityTerrain;
