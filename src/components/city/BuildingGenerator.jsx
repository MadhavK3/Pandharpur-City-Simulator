import React, { useMemo, useRef, useEffect } from 'react';
import * as THREE from 'three';
import { PROCEDURAL_BUILDINGS } from '../../data/cityLayout.js';
import {
  getBasaltStoneTexture,
  getTerracottaRoofTexture,
  getWadaWallTexture,
  getBazaarClothTexture
} from '../../engine/rendering/textureUtils.js';

// Procedural hip roof geometry strictly rectangular, wall-aligned with eaves clamped <= 0.35m
function createHipRoofGeometry(width, depth, height = 2.2, eaves = 0.32) {
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

function HipRoofMesh({ width, depth, height = 2.2, eaves = 0.32, map }) {
  const geom = useMemo(() => createHipRoofGeometry(width, depth, height, eaves), [width, depth, height, eaves]);
  return (
    <group>
      <mesh geometry={geom} castShadow receiveShadow>
        <meshStandardMaterial map={map} color="#9a3412" roughness={0.72} metalness={0.04} />
      </mesh>
      {/* Terracotta ridge cap line */}
      <mesh position={[0, height + 0.05, 0]} castShadow>
        <boxGeometry args={[Math.max(0.2, Math.abs(width - depth) + 0.4), 0.16, 0.24]} />
        <meshStandardMaterial color="#7c2d12" roughness={0.65} />
      </mesh>
    </group>
  );
}

export function BuildingGenerator() {
  const jharokhaMeshRef = useRef();
  const awningMeshRef = useRef();
  const waterTankMeshRef = useRef();
  const stairheadMeshRef = useRef();
  const windowMeshRef = useRef();
  const clotheslineMeshRef = useRef();

  const basaltTexture = useMemo(() => getBasaltStoneTexture(), []);
  const roofTexture = useMemo(() => getTerracottaRoofTexture(), []);
  const wallTexture = useMemo(() => getWadaWallTexture(), []);
  const bazaarClothTexture = useMemo(() => getBazaarClothTexture(), []);

  // Categorize buildings and compute instance matrices
  const {
    hipBuildings,
    terraceBuildings,
    bazaarBuildings,
    lodgingBuildings,
    otherBuildings,
    jharokhaMatrices,
    awningMatrices,
    waterTankMatrices,
    stairheadMatrices,
    windowMatrices,
    clotheslineMatrices,
    streetLamps
  } = useMemo(() => {
    const hips = [];
    const terraces = [];
    const bazaars = [];
    const lodgings = [];
    const others = [];

    const jMatrices = [];
    const aMatrices = [];
    const wtMatrices = [];
    const shMatrices = [];
    const winMatrices = [];
    const clMatrices = [];

    const dummy = new THREE.Object3D();

    PROCEDURAL_BUILDINGS.forEach(b => {
      const isHip = b.type === 'wada_hip' || b.type === 'wada' || b.type === 'math';
      const isTerrace = b.type === 'wada_terrace';
      const isBazaar = b.type === 'bazaar';
      const isLodging = b.type === 'lodging';

      if (isBazaar) {
        bazaars.push(b);
        // Slanted cloth canopy over shop entrance
        dummy.position.set(b.x, 2.2, b.z + b.depth / 2 + 0.6);
        dummy.rotation.set(0.26, 0, 0);
        dummy.scale.set(b.width * 0.96, 0.08, 1.6);
        dummy.updateMatrix();
        aMatrices.push(dummy.matrix.clone());

        // Upper floor facade windows
        [-b.width * 0.25, b.width * 0.25].forEach(ox => {
          dummy.position.set(b.x + ox, b.height * 0.72, b.z + b.depth / 2 + 0.05);
          dummy.rotation.set(0, 0, 0);
          dummy.scale.set(0.9, 1.2, 0.15);
          dummy.updateMatrix();
          winMatrices.push(dummy.matrix.clone());
        });
      } else if (isHip) {
        hips.push(b);

        // Wooden Jharokha Balconies on front facade
        const balconyY = b.height * 0.55;
        dummy.position.set(b.x, balconyY, b.z + b.depth / 2 + 0.35);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(b.width * 0.45, 1.35, 0.85);
        dummy.updateMatrix();
        jMatrices.push(dummy.matrix.clone());

        // Second-story facade windows
        [-b.width * 0.32, b.width * 0.32].forEach(ox => {
          dummy.position.set(b.x + ox, b.height * 0.65, b.z + b.depth / 2 + 0.04);
          dummy.rotation.set(0, 0, 0);
          dummy.scale.set(0.85, 1.2, 0.12);
          dummy.updateMatrix();
          winMatrices.push(dummy.matrix.clone());
        });
      } else if (isTerrace) {
        terraces.push(b);

        // Rooftop black Sintex-style water storage tank
        dummy.position.set(b.x + b.width * 0.25, b.height + 1.2, b.z + b.depth * 0.2);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1.2, 1.8, 1.2);
        dummy.updateMatrix();
        wtMatrices.push(dummy.matrix.clone());

        // Stairhead shed
        dummy.position.set(b.x - b.width * 0.22, b.height + 1.1, b.z - b.depth * 0.2);
        dummy.scale.set(2.8, 2.2, 2.8);
        dummy.updateMatrix();
        shMatrices.push(dummy.matrix.clone());

        // Rooftop drying laundry lines
        dummy.position.set(b.x, b.height + 0.8, b.z);
        dummy.scale.set(b.width * 0.6, 0.6, 0.1);
        dummy.updateMatrix();
        clMatrices.push(dummy.matrix.clone());

        // Facade windows
        [-b.width * 0.28, b.width * 0.28].forEach(ox => {
          [0.4, 0.75].forEach(yFrac => {
            dummy.position.set(b.x + ox, b.height * yFrac, b.z + b.depth / 2 + 0.04);
            dummy.scale.set(0.85, 1.15, 0.12);
            dummy.updateMatrix();
            winMatrices.push(dummy.matrix.clone());
          });
        });
      } else if (isLodging) {
        lodgings.push(b);

        // Rooftop overhead water tank
        dummy.position.set(b.x + b.width * 0.28, b.height + 1.4, b.z + b.depth * 0.22);
        dummy.rotation.set(0, 0, 0);
        dummy.scale.set(1.6, 2.2, 1.6);
        dummy.updateMatrix();
        wtMatrices.push(dummy.matrix.clone());

        // Stairhead cabin
        dummy.position.set(b.x - b.width * 0.24, b.height + 1.2, b.z - b.depth * 0.2);
        dummy.scale.set(3.4, 2.4, 3.4);
        dummy.updateMatrix();
        shMatrices.push(dummy.matrix.clone());

        // Multi-story windows
        [-b.width * 0.32, 0, b.width * 0.32].forEach(ox => {
          [0.3, 0.55, 0.8].forEach(yFrac => {
            dummy.position.set(b.x + ox, b.height * yFrac, b.z + b.depth / 2 + 0.05);
            dummy.scale.set(0.9, 1.2, 0.12);
            dummy.updateMatrix();
            winMatrices.push(dummy.matrix.clone());
          });
        });
      } else {
        others.push(b);
      }
    });

    // Historic Street Lamps placed on pedestrian sidewalks and chowk verges
    const lamps = [
      { x: -18, z: 14 },
      { x: -28, z: 14 },
      { x: -38, z: 14 },
      { x: -18, z: 26 },
      { x: -28, z: 26 },
      { x: -38, z: 26 },
      { x: -55, z: 18 },
      { x: -55, z: -18 },
      { x: -75, z: 16 },
      { x: -75, z: -16 },
      { x: 50, z: -14 },
      { x: 50, z: 14 },
      { x: 70, z: -25 },
      { x: 70, z: 25 }
    ];

    return {
      hipBuildings: hips,
      terraceBuildings: terraces,
      bazaarBuildings: bazaars,
      lodgingBuildings: lodgings,
      otherBuildings: others,
      jharokhaMatrices: jMatrices,
      awningMatrices: aMatrices,
      waterTankMatrices: wtMatrices,
      stairheadMatrices: shMatrices,
      windowMatrices: winMatrices,
      clotheslineMatrices: clMatrices,
      streetLamps: lamps
    };
  }, []);

  // Sync instanced meshes
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
    if (windowMeshRef.current) {
      windowMatrices.forEach((m, i) => windowMeshRef.current.setMatrixAt(i, m));
      windowMeshRef.current.instanceMatrix.needsUpdate = true;
    }
    if (clotheslineMeshRef.current) {
      clotheslineMatrices.forEach((m, i) => clotheslineMeshRef.current.setMatrixAt(i, m));
      clotheslineMeshRef.current.instanceMatrix.needsUpdate = true;
    }
  }, [jharokhaMatrices, awningMatrices, waterTankMatrices, stairheadMatrices, windowMatrices, clotheslineMatrices]);

  return (
    <group name="modular_buildings_root">
      {/* ============================================================== */}
      {/* 1. INSTANCED REPEATED ARCHITECTURAL DETAILS                    */}
      {/* ============================================================== */}

      {/* Recessed Dark Wooden Windows with Lintels */}
      {windowMatrices.length > 0 && (
        <instancedMesh
          ref={windowMeshRef}
          args={[null, null, windowMatrices.length]}
          castShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#291e17"
            roughness={0.9}
            metalness={0.05}
          />
        </instancedMesh>
      )}

      {/* Traditional Wooden Jharokha Balconies */}
      {jharokhaMatrices.length > 0 && (
        <instancedMesh
          ref={jharokhaMeshRef}
          args={[null, null, jharokhaMatrices.length]}
          castShadow
          receiveShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#452714"
            roughness={0.76}
            metalness={0.06}
          />
        </instancedMesh>
      )}

      {/* Bazaar Shop Striped Canopies & Awnings */}
      {awningMatrices.length > 0 && (
        <instancedMesh
          ref={awningMeshRef}
          args={[null, null, awningMatrices.length]}
          castShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            map={bazaarClothTexture}
            color="#ffffff"
            roughness={0.65}
          />
        </instancedMesh>
      )}

      {/* Rooftop Water Storage Tanks (Sintex Black Tanks) */}
      {waterTankMatrices.length > 0 && (
        <instancedMesh
          ref={waterTankMeshRef}
          args={[null, null, waterTankMatrices.length]}
          castShadow
        >
          <cylinderGeometry args={[1, 1, 1, 14]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.35}
            metalness={0.2}
          />
        </instancedMesh>
      )}

      {/* Rooftop Stairhead Cabins */}
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

      {/* Rooftop Clotheslines with Colorful Drying Laundry */}
      {clotheslineMatrices.length > 0 && (
        <instancedMesh
          ref={clotheslineMeshRef}
          args={[null, null, clotheslineMatrices.length]}
          castShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial
            color="#ea580c"
            roughness={0.85}
          />
        </instancedMesh>
      )}

      {/* ============================================================== */}
      {/* 2. TRADITIONAL HIP-ROOF WADA BUILDINGS                         */}
      {/* ============================================================== */}
      {hipBuildings.map(b => (
        <group key={b.id} position={[b.x, 0, b.z]}>
          {/* Basalt stone plinth foundation */}
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[b.width + 0.35, 0.8, b.depth + 0.35]} />
            <meshStandardMaterial map={basaltTexture} color="#35312e" roughness={0.88} metalness={0.08} />
          </mesh>

          {/* Main plaster wall envelope with lime-wash stucco texture */}
          <mesh position={[0, b.height / 2 + 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[b.width, b.height - 0.8, b.depth]} />
            <meshStandardMaterial
              map={wallTexture}
              color={b.color}
              roughness={0.82}
              metalness={0.04}
            />
          </mesh>

          {/* Horizontal timber lintel beams (Dhanga) */}
          {[0.35, 0.72].map((frac, bi) => (
            <mesh key={`band_${bi}`} position={[0, b.height * frac, 0]}>
              <boxGeometry args={[b.width + 0.12, 0.2, b.depth + 0.12]} />
              <meshStandardMaterial color="#3a2012" roughness={0.78} />
            </mesh>
          ))}

          {/* Carved wooden entrance doorway */}
          <mesh position={[0, 1.4, b.depth / 2 + 0.08]}>
            <boxGeometry args={[2.2, 2.6, 0.18]} />
            <meshStandardMaterial color="#382215" roughness={0.72} />
          </mesh>

          {/* Authentic Pitched Hip Terracotta Clay Roof */}
          <group position={[0, b.height, 0]}>
            <HipRoofMesh
              width={b.width}
              depth={b.depth}
              height={2.2}
              eaves={0.32}
              map={roofTexture}
            />
          </group>

          {/* Eaves fascia board */}
          <mesh position={[0, b.height - 0.05, 0]} castShadow>
            <boxGeometry args={[b.width + 0.5, 0.14, b.depth + 0.5]} />
            <meshStandardMaterial color="#632610" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* ============================================================== */}
      {/* 3. FLAT-TERRACE WADA BUILDINGS WITH PARAPETS                   */}
      {/* ============================================================== */}
      {terraceBuildings.map(b => (
        <group key={b.id} position={[b.x, 0, b.z]}>
          {/* Basalt Stone Plinth */}
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[b.width + 0.35, 0.8, b.depth + 0.35]} />
            <meshStandardMaterial map={basaltTexture} color="#35312e" roughness={0.88} />
          </mesh>

          {/* Main Plaster Wall */}
          <mesh position={[0, b.height / 2 + 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[b.width, b.height - 0.8, b.depth]} />
            <meshStandardMaterial
              map={wallTexture}
              color={b.color}
              roughness={0.82}
              metalness={0.04}
            />
          </mesh>

          {/* Floor level stringcourses */}
          {[0.36, 0.7].map((frac, fi) => (
            <mesh key={`str_${fi}`} position={[0, b.height * frac, 0]}>
              <boxGeometry args={[b.width + 0.16, 0.22, b.depth + 0.16]} />
              <meshStandardMaterial color="#475569" roughness={0.8} />
            </mesh>
          ))}

          {/* Rooftop Parapet Wall */}
          <group position={[0, b.height + 0.38, 0]}>
            {/* Front & Back parapet */}
            <mesh position={[0, 0, b.depth / 2 - 0.1]} castShadow>
              <boxGeometry args={[b.width, 0.76, 0.2]} />
              <meshStandardMaterial color={b.color} roughness={0.8} />
            </mesh>
            <mesh position={[0, 0, -b.depth / 2 + 0.1]} castShadow>
              <boxGeometry args={[b.width, 0.76, 0.2]} />
              <meshStandardMaterial color={b.color} roughness={0.8} />
            </mesh>
            {/* Left & Right parapet */}
            <mesh position={[-b.width / 2 + 0.1, 0, 0]} castShadow>
              <boxGeometry args={[0.2, 0.76, b.depth]} />
              <meshStandardMaterial color={b.color} roughness={0.8} />
            </mesh>
            <mesh position={[b.width / 2 - 0.1, 0, 0]} castShadow>
              <boxGeometry args={[0.2, 0.76, b.depth]} />
              <meshStandardMaterial color={b.color} roughness={0.8} />
            </mesh>
            {/* Parapet coping stone */}
            <mesh position={[0, 0.4, 0]}>
              <boxGeometry args={[b.width + 0.1, 0.08, b.depth + 0.1]} />
              <meshStandardMaterial color="#334155" roughness={0.7} />
            </mesh>
          </group>

          {/* Wooden doorway */}
          <mesh position={[0, 1.4, b.depth / 2 + 0.08]}>
            <boxGeometry args={[2.0, 2.5, 0.16]} />
            <meshStandardMaterial color="#382215" roughness={0.72} />
          </mesh>
        </group>
      ))}

      {/* ============================================================== */}
      {/* 4. MAHADWAR BAZAAR SHOPFRONT BUILDINGS                         */}
      {/* ============================================================== */}
      {bazaarBuildings.map(b => (
        <group key={b.id} position={[b.x, 0, b.z]}>
          {/* Stone Plinth */}
          <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
            <boxGeometry args={[b.width + 0.3, 0.7, b.depth + 0.3]} />
            <meshStandardMaterial map={basaltTexture} color="#35312e" roughness={0.9} />
          </mesh>

          {/* Shop Structure Body */}
          <mesh position={[0, b.height / 2 + 0.3, 0]} castShadow receiveShadow>
            <boxGeometry args={[b.width, b.height - 0.7, b.depth]} />
            <meshStandardMaterial map={wallTexture} color={b.color} roughness={0.8} />
          </mesh>

          {/* Open Market Stall Merchandise Counter */}
          <mesh position={[0, 1.0, b.depth / 2 + 0.3]} castShadow>
            <boxGeometry args={[b.width * 0.88, 1.1, 0.85]} />
            <meshStandardMaterial color="#6b3512" roughness={0.72} />
          </mesh>

          {/* Brass Puja Items / Offering Trays on Counter */}
          {[-b.width * 0.25, 0, b.width * 0.25].map((posOx, di) => (
            <mesh key={`tray_${di}`} position={[posOx, 1.62, b.depth / 2 + 0.4]}>
              <cylinderGeometry args={[0.26, 0.22, 0.12, 10]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.25} />
            </mesh>
          ))}

          {/* Hanging Marigold Garlands (Zendu Toran) */}
          <mesh position={[0, 2.1, b.depth / 2 + 0.7]}>
            <cylinderGeometry args={[0.08, 0.08, b.width * 0.88, 6]} rotation={[0, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#f59e0b" roughness={0.6} />
          </mesh>

          {/* Upper Sloped Terracotta Hip Roof */}
          <group position={[0, b.height, 0]}>
            <HipRoofMesh
              width={b.width}
              depth={b.depth}
              height={1.6}
              eaves={0.28}
              map={roofTexture}
            />
          </group>
          <mesh position={[0, b.height - 0.05, 0]} castShadow>
            <boxGeometry args={[b.width + 0.42, 0.12, b.depth + 0.42]} />
            <meshStandardMaterial color="#632610" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* ============================================================== */}
      {/* 5. PILGRIM DHARAMSHALA & BHAKTA NIWAS HOSTELS                  */}
      {/* ============================================================== */}
      {lodgingBuildings.map(b => (
        <group key={b.id} position={[b.x, 0, b.z]}>
          <mesh position={[0, 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[b.width + 0.4, 0.8, b.depth + 0.4]} />
            <meshStandardMaterial map={basaltTexture} color="#334155" roughness={0.85} />
          </mesh>

          <mesh position={[0, b.height / 2 + 0.4, 0]} castShadow receiveShadow>
            <boxGeometry args={[b.width, b.height - 0.8, b.depth]} />
            <meshStandardMaterial map={wallTexture} color={b.color} roughness={0.78} metalness={0.06} />
          </mesh>

          {Array.from({ length: Math.floor(b.height / 3.4) }).map((_, fi) => (
            <mesh key={`flr_${fi}`} position={[0, (fi + 1) * 3.4, 0]}>
              <boxGeometry args={[b.width + 0.22, 0.2, b.depth + 0.22]} />
              <meshStandardMaterial color="#475569" roughness={0.8} />
            </mesh>
          ))}

          {/* Flat Roof Perimeter Parapet */}
          <mesh position={[0, b.height + 0.35, 0]} castShadow>
            <boxGeometry args={[b.width * 0.98, 0.7, b.depth * 0.98]} />
            <meshStandardMaterial color="#475569" roughness={0.8} />
          </mesh>
        </group>
      ))}

      {/* ============================================================== */}
      {/* 6. CIVIC, TRANSPORT & SPECIAL LANDMARKS                        */}
      {/* ============================================================== */}
      {otherBuildings.map(b => (
        <group key={b.id} position={[b.x, 0, b.z]}>
          <mesh position={[0, b.height / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[b.width, b.height, b.depth]} />
            <meshStandardMaterial
              map={wallTexture}
              color={b.color || '#94a3b8'}
              roughness={0.78}
              metalness={0.06}
            />
          </mesh>

          {b.type === 'transport' ? (
            <mesh position={[0, b.height + 0.8, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
              <cylinderGeometry args={[b.width * 0.52, b.width * 0.52, b.depth, 16, 1, false, 0, Math.PI]} />
              <meshStandardMaterial color="#475569" metalness={0.4} roughness={0.6} />
            </mesh>
          ) : null}
        </group>
      ))}

      {/* ============================================================== */}
      {/* 7. VINTAGE STREET LAMP POSTS                                   */}
      {/* ============================================================== */}
      {streetLamps.map((lamp, i) => (
        <group key={`lamp_${i}`} position={[lamp.x, 0, lamp.z]}>
          <mesh position={[0, 2.2, 0]} castShadow>
            <cylinderGeometry args={[0.08, 0.14, 4.4, 8]} />
            <meshStandardMaterial color="#1e293b" metalness={0.85} roughness={0.4} />
          </mesh>
          <mesh position={[0, 4.4, 0]}>
            <cylinderGeometry args={[0.3, 0.2, 0.5, 6]} />
            <meshStandardMaterial color="#0f172a" />
          </mesh>
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
