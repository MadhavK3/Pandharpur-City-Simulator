import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { GHAT_STEPS, SANDBANK_ISLANDS, DEEPAMALAS, PILGRIM_TENTS, RIVER_BOATS } from '../../data/cityLayout.js';
import { getBasaltStoneTexture, getRiverSandTexture, getWaterNormalTexture } from '../../engine/rendering/textureUtils.js';

export function RiverEnvironment() {
  const waterMeshRef = useRef();
  const boatGroupRef = useRef();
  const flagRefs = useRef([]);

  const basaltTexture = useMemo(() => getBasaltStoneTexture(), []);
  const sandTexture = useMemo(() => getRiverSandTexture(), []);
  const waterNormal = useMemo(() => getWaterNormalTexture(), []);

  // Custom Chandrabhaga River Shader Material
  const waterMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uDeepWaterColor: { value: new THREE.Color('#025a8d') },
        uShallowWaterColor: { value: new THREE.Color('#0d9488') },
        uSunColor: { value: new THREE.Color('#fff7ed') },
        uSunDir: { value: new THREE.Vector3(0.5, 0.8, 0.3).normalize() }
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        varying vec3 vNormal;

        void main() {
          vUv = uv;
          vec3 pos = position;

          // Gentle river surface undulation
          float w1 = sin(pos.x * 0.14 + uTime * 1.6 + pos.y * 0.08) * 0.14;
          float w2 = cos(pos.y * 0.22 - uTime * 1.3 + pos.x * 0.06) * 0.09;
          pos.z += w1 + w2;

          vNormal = normalize(vec3(-cos(pos.x * 0.14 + uTime * 1.6) * 0.14, -sin(pos.y * 0.22 - uTime * 1.3) * 0.09, 1.0));
          vec4 worldPos = modelMatrix * vec4(pos, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * viewMatrix * worldPos;
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform vec3 uDeepWaterColor;
        uniform vec3 uShallowWaterColor;
        uniform vec3 uSunColor;
        uniform vec3 uSunDir;
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        varying vec3 vNormal;

        void main() {
          // Shore depth gradient: shallower water on western ghat edge (vUv.x near 0)
          float depthFactor = smoothstep(0.04, 0.38, vUv.x) * smoothstep(1.0, 0.72, vUv.x);
          vec3 waterBase = mix(uShallowWaterColor, uDeepWaterColor, depthFactor);

          // Fresnel reflection calculation
          vec3 viewDir = normalize(cameraPosition - vWorldPosition);
          float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.2);

          // Specular sunlight glint
          vec3 halfVec = normalize(uSunDir + viewDir);
          float specular = pow(max(dot(vNormal, halfVec), 0.0), 48.0);

          // Subtle river ripple shimmer
          float shimmer = sin(vWorldPosition.z * 1.2 + uTime * 2.0) * cos(vWorldPosition.x * 1.2 - uTime * 1.5) * 0.06;

          vec3 finalColor = mix(waterBase, vec3(0.85, 0.94, 1.0), fresnel * 0.65 + shimmer);
          finalColor += uSunColor * specular * 1.9;

          gl_FragColor = vec4(finalColor, 0.91);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide
    });
  }, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (waterMaterial) {
      waterMaterial.uniforms.uTime.value = t;
    }
    if (boatGroupRef.current) {
      // Natural buoyancy rocking of pilgrim boats
      boatGroupRef.current.children.forEach((boat, idx) => {
        const offset = idx * 1.1;
        boat.rotation.z = Math.sin(t * 1.4 + offset) * 0.035;
        boat.position.y = -0.05 + Math.sin(t * 1.8 + offset) * 0.04;
      });
    }
    // Fluttering boat flags
    flagRefs.current.forEach((flag, idx) => {
      if (flag) {
        flag.rotation.y = Math.sin(t * 3.5 + idx) * 0.25;
      }
    });
  });

  return (
    <group name="river_environment_root">
      {/* ============================================================== */}
      {/* 1. CHANDRABHAGA (BHIMA) SACRED WATER EXPANSE                   */}
      {/* ============================================================== */}
      <mesh
        ref={waterMeshRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[128, -1.05, 0]}
        receiveShadow
        material={waterMaterial}
      >
        <planeGeometry args={[92, 450, 64, 64]} />
      </mesh>

      {/* Riverbed Basin Underwater Foundation */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[128, -2.4, 0]}
      >
        <planeGeometry args={[95, 450]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.96}
        />
      </mesh>

      {/* ============================================================== */}
      {/* 2. CHANDRABHAGA SACRED SAND DUNES & ISLANDS (Vāḷvaṇṭ)          */}
      {/* ============================================================== */}
      {SANDBANK_ISLANDS.map(island => (
        <group key={island.id} position={[island.x, island.y, island.z]}>
          <mesh
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[island.radiusX * 2, island.radiusZ * 2, 24, 24]} />
            <meshStandardMaterial
              map={sandTexture}
              color="#d4b483"
              roughness={0.92}
              metalness={0.0}
            />
          </mesh>
          {/* Subtle mounded sand central ridge */}
          <mesh position={[0, 0.15, 0]} scale={[island.radiusX * 0.7, 0.35, island.radiusZ * 0.7]}>
            <sphereGeometry args={[1, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color="#c5a880" roughness={0.95} />
          </mesh>
        </group>
      ))}

      {/* Western Sand Strip connecting ghats to river edge (X=88 to 105) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[96, -0.72, 0]}
        receiveShadow
      >
        <planeGeometry args={[22, 420]} />
        <meshStandardMaterial
          map={sandTexture}
          color="#c5a880"
          roughness={0.9}
        />
      </mesh>

      {/* ============================================================== */}
      {/* 3. HISTORIC BASALT STONE BATHING GHATS & WATERLINE STEPS       */}
      {/* ============================================================== */}
      {GHAT_STEPS.map(ghat => (
        <group key={ghat.id} position={[ghat.x, ghat.y, ghat.z]}>
          {/* Stone Pavilion / Chhatri at upper ghat landing */}
          <group position={[-2.5, 1.8, 0]}>
            {/* Plinth */}
            <mesh position={[0, 0.2, 0]} castShadow>
              <cylinderGeometry args={[2.8, 3.2, 0.4, 8]} />
              <meshStandardMaterial map={basaltTexture} color="#44403c" roughness={0.8} />
            </mesh>
            {/* 4 Carved Basalt Pillars */}
            {[-1.3, 1.3].map((px, pi) =>
              [-1.3, 1.3].map((pz, pj) => (
                <mesh key={`ghat_col_${pi}_${pj}`} position={[px, 1.4, pz]} castShadow>
                  <cylinderGeometry args={[0.22, 0.28, 2.4, 8]} />
                  <meshStandardMaterial map={basaltTexture} color="#3f3f46" roughness={0.75} />
                </mesh>
              ))
            )}
            {/* Chhatri Dome & Kalash */}
            <mesh position={[0, 3.0, 0]} castShadow>
              <coneGeometry args={[2.4, 1.8, 8]} />
              <meshStandardMaterial color="#78716c" roughness={0.7} />
            </mesh>
            <mesh position={[0, 4.1, 0]}>
              <sphereGeometry args={[0.4, 12, 12]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>

          {/* Upper Dry Basalt Steps */}
          {Array.from({ length: ghat.stepsCount }).map((_, stepIdx) => {
            const isSubmergedWaterline = stepIdx >= ghat.stepsCount - 2;
            return (
              <mesh
                key={`step_${stepIdx}`}
                position={[stepIdx * 1.5, -stepIdx * 0.16, 0]}
                receiveShadow
              >
                <boxGeometry args={[1.8, 0.35, ghat.lengthZ]} />
                <meshStandardMaterial
                  map={isSubmergedWaterline ? null : basaltTexture}
                  color={isSubmergedWaterline ? '#1c1917' : '#57534e'}
                  roughness={isSubmergedWaterline ? 0.2 : 0.8}
                  metalness={isSubmergedWaterline ? 0.35 : 0.08}
                />
              </mesh>
            );
          })}

          {/* Flanking Stone Side Walls with Urn Finials */}
          {[-ghat.lengthZ / 2, ghat.lengthZ / 2].map((wz, wi) => (
            <group key={`flank_${wi}`}>
              <mesh position={[ghat.stepsCount * 0.75, -ghat.stepsCount * 0.08 + 0.4, wz]} castShadow receiveShadow>
                <boxGeometry args={[ghat.stepsCount * 1.5, 1.3, 0.45]} />
                <meshStandardMaterial map={basaltTexture} color="#44403c" roughness={0.85} />
              </mesh>
              {/* Mooring bollards on flanking wall */}
              {[0.2, 0.5, 0.8].map((fac, bi) => (
                <mesh
                  key={`bollard_${bi}`}
                  position={[ghat.stepsCount * 1.5 * fac, -ghat.stepsCount * 0.16 * fac + 1.2, wz]}
                >
                  <cylinderGeometry args={[0.18, 0.22, 0.5, 8]} />
                  <meshStandardMaterial color="#292524" roughness={0.6} />
                </mesh>
              ))}
            </group>
          ))}
        </group>
      ))}

      {/* ============================================================== */}
      {/* 4. STONE FOOTBRIDGE (Pundalik Setu) TO ISLAND TEMPLE           */}
      {/* ============================================================== */}
      <group position={[105, -0.35, 2]}>
        {/* Bridge Walkway Deck */}
        <mesh receiveShadow castShadow>
          <boxGeometry args={[20, 0.45, 3.8]} />
          <meshStandardMaterial map={basaltTexture} color="#57534e" roughness={0.7} />
        </mesh>
        {/* Bridge Arched Stone Piers */}
        {[-7, 0, 7].map((bx, bi) => (
          <group key={`pier_${bi}`} position={[bx, -0.65, 0]}>
            <mesh castShadow receiveShadow>
              <cylinderGeometry args={[0.9, 1.2, 1.4, 8]} />
              <meshStandardMaterial map={basaltTexture} color="#3f3f46" roughness={0.85} />
            </mesh>
            {/* Pier Cutwater pointing upstream into current */}
            <mesh position={[0, 0, -1.8]} rotation={[0, 0, 0]}>
              <coneGeometry args={[0.9, 1.4, 3]} />
              <meshStandardMaterial color="#292524" />
            </mesh>
          </group>
        ))}
        {/* Carved Stone Balustrade Railings */}
        {[-1.75, 1.75].map((rz, ri) => (
          <mesh key={`rail_${ri}`} position={[0, 0.5, rz]} castShadow>
            <boxGeometry args={[20, 0.5, 0.2]} />
            <meshStandardMaterial color="#78716c" roughness={0.8} />
          </mesh>
        ))}
      </group>

      {/* ============================================================== */}
      {/* 5. TALL DEEPAMALAS (STONE LAMP TOWERS) ON RIVERBANK            */}
      {/* ============================================================== */}
      {DEEPAMALAS.map(deep => (
        <group key={deep.id} position={[deep.x, deep.y, deep.z]}>
          {/* Carved Stepped Base */}
          <mesh position={[0, 0.6, 0]} castShadow>
            <cylinderGeometry args={[1.5, 1.9, 1.2, 8]} />
            <meshStandardMaterial map={basaltTexture} color="#3f3f46" roughness={0.9} />
          </mesh>
          {/* Tapering Octagonal Shaft */}
          <mesh position={[0, deep.height / 2 + 0.6, 0]} castShadow>
            <cylinderGeometry args={[0.65, 1.15, deep.height, 8]} />
            <meshStandardMaterial map={basaltTexture} color="#57534e" roughness={0.85} />
          </mesh>
          {/* Protruding Stone Lamp Brackets */}
          {Array.from({ length: 5 }).map((_, li) => (
            <mesh key={`bracket_${li}`} position={[0, (li + 1) * (deep.height / 6) + 0.6, 0]} castShadow>
              <cylinderGeometry args={[1.25, 0.75, 0.35, 8]} />
              <meshStandardMaterial color="#78716c" />
            </mesh>
          ))}
          {/* Top Diya Vessel & Holy Flame */}
          <mesh position={[0, deep.height + 0.9, 0]}>
            <cylinderGeometry args={[0.7, 0.5, 0.4, 8]} />
            <meshStandardMaterial color="#b45309" roughness={0.6} />
          </mesh>
          <mesh position={[0, deep.height + 1.25, 0]}>
            <sphereGeometry args={[0.5, 12, 12]} />
            <meshStandardMaterial
              color="#fbbf24"
              emissive="#f97316"
              emissiveIntensity={2.8}
            />
          </mesh>
          <pointLight position={[0, deep.height + 1.4, 0]} color="#fbbf24" intensity={2.4} distance={30} />
        </group>
      ))}

      {/* ============================================================== */}
      {/* 6. WARKARI PILGRIM TENTS (RAOTEE) ON THE SANDBANK              */}
      {/* ============================================================== */}
      {PILGRIM_TENTS.map(t => (
        <group key={t.id} position={[t.x, t.y, t.z]}>
          <mesh position={[0, 1.4, 0]} rotation={[0, Math.PI / 4, 0]} castShadow>
            <coneGeometry args={[2.5, 2.8, 4]} />
            <meshStandardMaterial color={t.color} roughness={0.7} />
          </mesh>
          <mesh position={[0, 3.2, 0]}>
            <coneGeometry args={[0.3, 0.8, 3]} />
            <meshStandardMaterial color="#f97316" />
          </mesh>
        </group>
      ))}

      {/* ============================================================== */}
      {/* 7. WOODEN PILGRIM BOATS (NAAV) IN CHANDRABHAGA                 */}
      {/* ============================================================== */}
      <group ref={boatGroupRef}>
        {RIVER_BOATS.map((b, idx) => (
          <group key={b.id} position={[b.x, b.y, b.z]} rotation={[0, b.rotation, 0]}>
            {/* Wooden Boat Hull */}
            <mesh position={[0, 0.3, 0]} scale={[1.8, 0.8, 4.8]} castShadow>
              <sphereGeometry args={[1, 12, 8]} />
              <meshStandardMaterial color="#78350f" roughness={0.82} />
            </mesh>
            {/* Hollow Deck Benches */}
            {[-1.2, 0, 1.2].map((bz, bi) => (
              <mesh key={`bench_${bi}`} position={[0, 0.42, bz]}>
                <boxGeometry args={[1.5, 0.08, 0.4]} />
                <meshStandardMaterial color="#92400e" roughness={0.75} />
              </mesh>
            ))}
            {/* Wooden Oars */}
            <mesh position={[1.1, 0.5, 0.4]} rotation={[0.4, 0, 0.65]}>
              <cylinderGeometry args={[0.04, 0.04, 3.2, 6]} />
              <meshStandardMaterial color="#451a03" />
            </mesh>
            {/* Boat Saffron Flag on Wooden Mast */}
            <group
              ref={el => (flagRefs.current[idx] = el)}
              position={[0, 0.4, -2.1]}
            >
              <mesh position={[0, 1.2, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 2.4, 6]} />
                <meshStandardMaterial color="#78350f" />
              </mesh>
              <mesh position={[0.5, 1.9, 0]} rotation={[0, 0, -Math.PI / 2]}>
                <coneGeometry args={[0.4, 1.0, 3]} />
                <meshStandardMaterial color="#ea580c" roughness={0.5} />
              </mesh>
            </group>
          </group>
        ))}
      </group>
    </group>
  );
}

export default RiverEnvironment;
