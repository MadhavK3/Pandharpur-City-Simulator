import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { PROCEDURAL_BUILDINGS } from '../../data/cityLayout.js';
import { getBasaltStoneTexture, getTerracottaRoofTexture } from '../../engine/rendering/textureUtils.js';

// Procedural hip roof geometry generator strictly aligned with rectangular building footprint
function createHipRoofGeometry(width, depth, height = 2.2, eaves = 0.35) {
  const w = width + eaves * 2;
  const d = depth + eaves * 2;
  const hw = w / 2;
  const hd = d / 2;
  const positions = [];
  const uvs = [];

  if (w >= d) {
    const ridgeHalf = Math.max(0.1, (w - d) / 2);
    const r0 = [ridgeHalf, height, 0];
    const r1 = [-ridgeHalf, height, 0];

    // Front face (+Z)
    positions.push(
      hw, 0, hd,  r0[0], height, 0,  -hw, 0, hd,
      r0[0], height, 0,  r1[0], height, 0,  -hw, 0, hd
    );
    uvs.push(1, 0, 0.75, 1, 0, 0, 0.75, 1, 0.25, 1, 0, 0);

    // Back face (-Z)
    positions.push(
      -hw, 0, -hd,  r1[0], height, 0,  hw, 0, -hd,
      r1[0], height, 0,  r0[0], height, 0,  hw, 0, -hd
    );
    uvs.push(0, 0, 0.25, 1, 1, 0, 0.25, 1, 0.75, 1, 1, 0);

    // Left face (-X)
    positions.push(-hw, 0, hd,  r1[0], height, 0,  -hw, 0, -hd);
    uvs.push(0, 0, 0.5, 1, 1, 0);

    // Right face (+X)
    positions.push(hw, 0, -hd,  r0[0], height, 0,  hw, 0, hd);
    uvs.push(0, 0, 0.5, 1, 1, 0);
  } else {
    const ridgeHalf = Math.max(0.1, (d - w) / 2);
    const r0 = [0, height, ridgeHalf];
    const r1 = [0, height, -ridgeHalf];

    // Right face (+X)
    positions.push(
      hw, 0, -hd,  0, height, r1[2],  hw, 0, hd,
      0, height, r1[2],  0, height, r0[2],  hw, 0, hd
    );
    uvs.push(0, 0, 0.25, 1, 1, 0, 0.25, 1, 0.75, 1, 1, 0);

    // Left face (-X)
    positions.push(
      -hw, 0, hd,  0, height, r0[2],  -hw, 0, -hd,
      0, height, r0[2],  0, height, r1[2],  -hw, 0, -hd
    );
    uvs.push(1, 0, 0.75, 1, 0, 0, 0.75, 1, 0.25, 1, 0, 0);

    // Front face (+Z)
    positions.push(hw, 0, hd,  0, height, r0[2],  -hw, 0, hd);
    uvs.push(1, 0, 0.5, 1, 0, 0);

    // Back face (-Z)
    positions.push(-hw, 0, -hd,  0, height, r1[2],  hw, 0, -hd);
    uvs.push(0, 0, 0.5, 1, 1, 0);
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
  geom.computeVertexNormals();
  return geom;
}

function HipRoofMesh({ width, depth, height = 2.2, eaves = 0.35, map, color = '#c2410c', roughness = 0.72, metalness = 0.04 }) {
  const geom = useMemo(() => createHipRoofGeometry(width, depth, height, eaves), [width, depth, height, eaves]);
  return (
    <mesh geometry={geom} castShadow receiveShadow>
      <meshStandardMaterial map={map} color={color} roughness={roughness} metalness={metalness} />
    </mesh>
  );
}

export function BuildingGenerator() {
  const jharokhaMeshRef = useRef();
  const awningMeshRef = useRef();
  const waterTankMeshRef = useRef();
  const stairheadMeshRef = useRef();

  const basaltTexture = useMemo(() => getBasaltStoneTexture(), []);
  const roofTexture = useMemo(() => getTerracottaRoofTexture(), []);

  // Categorize buildings and precompute instance transforms
  const {
    wadaBuildings,
    bazaarBuildings,
    lodgingBuildings,
    otherBuildings,
    jharokhaMatrices,
    awningMatrices,
    waterTankMatrices,
    stairheadMatrices,
    streetLamps
  } = useMemo(() => {
    const wadas = [];
    const bazaars = [];
    const lodgings = [];
    const others = [];

    const jMatrices = [];
    const aMatrices = [];
    const wtMatrices = [];
    const shMatrices = [];

    const dummy = new THREE.Object3D();

    PROCEDURAL_BUILDINGS.forEach(b => {
      if (b.type === 'wada') {
        wadas.push(b);
        // Add 1 or 2 Jharokha balconies per wada on the street facade
        const balconyY = b.height * 0.58;
        dummy.position.set(b.x, balconyY, b.z + b.depth / 2 + 0.4);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(b.width * 0.45, 1.3, 0.9);
        dummy.updateMatrix();
        jMatrices.push(dummy.matrix.clone());

        if (b.height > 8.5) {
          dummy.position.set(b.x, balconyY + 2.2, b.z + b.depth / 2 + 0.35);
          dummy.scale.set(b.width * 0.32, 1.1, 0.8);
          dummy.updateMatrix();
          jMatrices.push(dummy.matrix.clone());
        }
      } else if (b.type === 'bazaar') {
        bazaars.push(b);
        // Slanted shop awning over entrance
        dummy.position.set(b.x, 2.0, b.z + b.depth / 2 + 0.5);
        dummy.rotation.set(0.28, 0, 0);
        dummy.scale.set(b.width * 0.9, 0.12, 1.4);
        dummy.updateMatrix();
        aMatrices.push(dummy.matrix.clone());
      } else if (b.type === 'lodging') {
        lodgings.push(b);
        // Rooftop overhead water tank
        dummy.position.set(b.x + b.width * 0.25, b.height + 1.4, b.z + b.depth * 0.25);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1.4, 2.0, 1.4);
        dummy.updateMatrix();
        wtMatrices.push(dummy.matrix.clone());

        // Stairhead access shed on flat roof
        dummy.position.set(b.x - b.width * 0.22, b.height + 1.1, b.z - b.depth * 0.2);
        dummy.scale.set(3.2, 2.2, 3.2);
        dummy.updateMatrix();
        shMatrices.push(dummy.matrix.clone());
      } else {
        others.push(b);
      }
    });

    // Street lamps placed on pedestrian sidewalks and chowk verges
    const lamps = [
      { x: -22, z: 14 },
      { x: -22, z: 26 },
      { x: -32, z: 14 },
      { x: -32, z: 26 },
      { x: -55, z: 18 },
      { x: -55, z: -18 },
      { x: -42, z: 14 },
      { x: -42, z: 26 }
    ];

    return {
      wadaBuildings: wadas,
      bazaarBuildings: bazaars,
      lodgingBuildings: lodgings,
      otherBuildings: others,
      jharokhaMatrices: jMatrices,
      awningMatrices: aMatrices,
      waterTankMatrices: wtMatrices,
      stairheadMatrices: shMatrices,
      streetLamps: lamps
    };
  }, []);

  // Update instanced mesh matrices
  useEffect(() => {
    if (jharokhaMeshRef.current) {
      jharokhaMatrices.forEach((m, i) => jharokhaMeshRef.current.setMatrixAt(i, m));
      jharokhaMeshRef.current.instanceMatrix.needsUpdate = true;
    }
    if (awningMeshRef.current) {
      awningMatrices.forEach((m, i) => awningMeshRef.current.setMatrixAt(i, m));
      awningMeshRef.current.instanceMatrix.needsUpdate = true;
    }
    if (waterTankMeshRef.current) {
      waterTankMatrices.forEach((m, i) => waterTankMeshRef.current.setMatrixAt(i, m));
      waterTankMeshRef.current.instanceMatrix.needsUpdate = true;
    }
    if (stairheadMeshRef.current) {
      stairheadMatrices.forEach((m, i) => stairheadMeshRef.current.setMatrixAt(i, m));
      stairheadMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [jharokhaMatrices, awningMatrices, waterTankMatrices, stairheadMatrices]);

  return (
    <group name="modular_buildings_root">
      {/* ============================================================== */}
      {/* 1. INSTANCED REPEATED ARCHITECTURAL DETAILS                    */}
      {/* ============================================================== */}

      {/* Instanced Wooden Jharokha Balconies */}
      {jharokhaMatrices.length > 0 && (
        <instancedMesh
          ref={jharokhaMeshRef}
          args={[null, null, jharokhaMatrices.length]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#5c3a21"
            roughness={0.78}
            metalness={0.06}
          />
        </instancedMesh>
      )}

      {/* Instanced Bazaar Shopfront Awnings */}
      {awningMatrices.length > 0 && (
        <instancedMesh
          ref={awningMeshRef}
          args={[null, null, awningMatrices.length]}
          castShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#ea580c"
            roughness={0.7}
          />
        </instancedMesh>
      )}

      {/* Instanced Rooftop Water Tanks */}
      {waterTankMatrices.length > 0 && (
        <instancedMesh
          ref={waterTankMeshRef}
          args={[null, null, waterTankMatrices.length]}
          castShadow
        >
          <cylinderGeometry args={[1, 1, 1, 12]} />
          <meshStandardMaterial
            color="#0284c7"
            roughness={0.35}
            metalness={0.5}
          />
        </instancedMesh>
      )}

      {/* Instanced Rooftop Stairhead Enclosures */}
      {stairheadMatrices.length > 0 && (
        <instancedMesh
          ref={stairheadMeshRef}
          args={[null, null, stairheadMatrices.length]}
          castShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#64748b"
            roughness={0.8}
          />
        </instancedMesh>
      )}

      {/* ============================================================== */}
      {/* 2. TRADITIONAL MAHARASHTRIAN WADA BUILDINGS                   */}
      {/* ============================================================== */}
      {wadaBuildings.map(b => (
        <group key={b.id} position={[b.x, 0, b.z]}>
          {/* Basalt stone plinth foundation */}
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[b.width + 0.4, 0.8, b.depth + 0.4]} />
            <meshStandardMaterial map={basaltTexture} color="#383533" roughness={0.88} metalness={0.1} />
          </mesh>

          {/* Main plaster wall envelope */}
          <mesh position={[0, b.height / 2 + 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[b.width, b.height - 0.8, b.depth]} />
            <meshStandardMaterial color={b.color} roughness={0.82} metalness={0.05} />
          </mesh>

          {/* Traditional timber framing horizontal bands */}
          {[0.35, 0.7].map((frac, bi) => (
            <mesh key={`band_${bi}`} position={[0, b.height * frac, 0]}>
              <boxGeometry args={[b.width + 0.15, 0.22, b.depth + 0.15]} />
              <meshStandardMaterial color="#451a03" roughness={0.75} />
            </mesh>
          ))}

          {/* Wooden entrance doorway arch */}
          <mesh position={[0, 1.4, b.depth / 2 + 0.08]}>
            <boxGeometry args={[2.2, 2.6, 0.2]} />
            <meshStandardMaterial color="#382215" roughness={0.7} />
          </mesh>

          {/* Pitched hip terracotta clay tile roof aligned with walls */}
          <group position={[0, b.height, 0]}>
            <HipRoofMesh
              width={b.width}
              depth={b.depth}
              height={2.2}
              eaves={0.35}
              map={roofTexture}
              color="#c2410c"
              roughness={0.72}
              metalness={0.04}
            />
          </group>
          {/* Terracotta roof overhang fascia plate */}
          <mesh position={[0, b.height - 0.05, 0]} castShadow>
            <boxGeometry args={[b.width + 0.5, 0.14, b.depth + 0.5]} />
            <meshStandardMaterial color="#7c2d12" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* ============================================================== */}
      {/* 3. MAHADWAR BAZAAR SHOPFRONT BUILDINGS                        */}
      {/* ============================================================== */}
      {bazaarBuildings.map(b => (
        <group key={b.id} position={[b.x, 0, b.z]}>
          {/* Stone Plinth */}
          <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
            <boxGeometry args={[b.width + 0.3, 0.7, b.depth + 0.3]} />
            <meshStandardMaterial map={basaltTexture} color="#383533" roughness={0.9} />
          </mesh>

          {/* Ground Floor Shop Structure */}
          <mesh position={[0, b.height / 2 + 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[b.width, b.height - 0.7, b.depth]} />
            <meshStandardMaterial color={b.color} roughness={0.8} />
          </mesh>

          {/* Open Market Stall Counter */}
          <mesh position={[0, 0.9, b.depth / 2 + 0.25]} castShadow>
            <boxGeometry args={[b.width * 0.85, 1.0, 0.8]} />
            <meshStandardMaterial color="#78350f" roughness={0.7} />
          </mesh>

          {/* Hanging Marigold Garlands / Toran */}
          <mesh position={[0, 1.85, b.depth / 2 + 0.7]}>
            <cylinderGeometry args={[0.08, 0.08, b.width * 0.85, 6]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#facc15" />
          </mesh>

          {/* Upper Sloped Terracotta Hip Roof */}
          <group position={[0, b.height, 0]}>
            <HipRoofMesh
              width={b.width}
              depth={b.depth}
              height={1.6}
              eaves={0.3}
              map={roofTexture}
              color="#b91c1c"
              roughness={0.75}
            />
          </group>
          <mesh position={[0, b.height - 0.05, 0]} castShadow>
            <boxGeometry args={[b.width + 0.45, 0.12, b.depth + 0.45]} />
            <meshStandardMaterial color="#7c2d12" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* ============================================================== */}
      {/* 4. PILGRIM DHARAMSHALA & BHAKTA NIWAS HOSTELS                 */}
      {/* ============================================================== */}
      {lodgingBuildings.map(b => (
        <group key={b.id} position={[b.x, 0, b.z]}>
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[b.width + 0.4, 0.8, b.depth + 0.4]} />
            <meshStandardMaterial map={basaltTexture} color="#334155" roughness={0.85} />
          </mesh>

          <mesh position={[0, b.height / 2 + 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[b.width, b.height - 0.8, b.depth]} />
            <meshStandardMaterial color={b.color} roughness={0.75} metalness={0.08} />
          </mesh>

          {Array.from({ length: Math.floor(b.height / 3.2) }).map((_, fi) => (
            <mesh key={`flr_${fi}`} position={[0, (fi + 1) * 3.2, 0]}>
              <boxGeometry args={[b.width + 0.25, 0.2, b.depth + 0.25]} />
              <meshStandardMaterial color="#475569" roughness={0.8} />
            </mesh>
          ))}

          <mesh position={[0, b.height + 0.4, 0]} castShadow>
            <boxGeometry args={[b.width * 0.98, 0.8, b.depth * 0.98]} />
            <meshStandardMaterial color="#475569" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* ============================================================== */}
      {/* 5. ASHRAM MATHAS, CIVIC & TRANSPORT TERMINALS                  */}
      {/* ============================================================== */}
      {otherBuildings.map(b => (
        <group key={b.id} position={[b.x, 0, b.z]}>
          <mesh position={[0, b.height / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[b.width, b.height, b.depth]} />
            <meshStandardMaterial color={b.color || '#94a3b8'} roughness={0.78} metalness={0.06} />
          </mesh>

          {b.type === 'math' ? (
            <group position={[0, b.height, 0]}>
              <HipRoofMesh
                width={b.width}
                depth={b.depth}
                height={2.0}
                eaves={0.35}
                map={roofTexture}
                color="#ea580c"
                roughness={0.72}
              />
            </group>
          ) : b.type === 'transport' ? (
            <mesh position={[0, b.height + 0.8, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[b.width * 0.52, b.width * 0.52, b.depth, 16, 1, false, 0, Math.PI]} />
              <meshStandardMaterial color="#475569" metalness={0.4} roughness={0.6} />
            </mesh>
          ) : null}
        </group>
      ))}

      {/* ============================================================== */}
      {/* 6. VINTAGE STREET LAMP POSTS ALONG PILGRIM CORRIDORS           */}
      {/* ============================================================== */}
      {streetLamps.map((lamp, i) => (
        <group key={`lamp_${i}`} position={[lamp.x, 0, lamp.z]}>
          <mesh position={[0, 2.2, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.14, 4.4, 8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.4} />
          </mesh>
          {/* Curved Bracket & Lantern Casing */}
          <mesh position={[0, 4.4, 0]}>
            <cylinderGeometry args={[0.3, 0.2, 0.5, 6]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
          {/* Glowing Lantern Glass */}
          <mesh position={[0, 4.3, 0]}>
            <sphereGeometry args={[0.18, 8, 8]} />
            <meshStandardMaterial
              color="#fef08a"
              emissive="#f59e0b"
              emissiveIntensity={1.8}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default BuildingGenerator;
