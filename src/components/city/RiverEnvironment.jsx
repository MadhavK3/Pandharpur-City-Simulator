import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import {
  GHAT_STEPS,
  SANDBANK_ISLANDS,
  DEEPAMALAS,
  PILGRIM_TENTS,
  RIVER_BOATS,
  RIVER_BRIDGES
} from '../../data/cityLayout.js';
import {
  getBasaltStoneTexture,
  getRiverSandTexture,
  getBridgeStoneTexture,
  getWaterNormalTexture
} from '../../engine/rendering/textureUtils.js';

export function RiverEnvironment() {
  const waterMeshRef = useRef();
  const boatGroupRef = useRef();
  const flagRefs = useRef([]);

  const basaltTexture = useMemo(() => getBasaltStoneTexture(), []);
  const sandTexture = useMemo(() => getRiverSandTexture(), []);
  const bridgeStoneTexture = useMemo(() => getBridgeStoneTexture(), []);
  const waterNormal = useMemo(() => getWaterNormalTexture(), []);

  // Photorealistic Chandrabhaga River Shader with multi-octave ripples & sunlight glints
  const waterMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uDeepWaterColor: { value: new THREE.Color('#064e6b') },
        uShallowWaterColor: { value: new THREE.Color('#0d9488') },
        uSunColor: { value: new THREE.Color('#fffbeb') },
        uSkyColor: { value: new THREE.Color('#bae6fd') },
        uSunDir: { value: new THREE.Vector3(0.55, 0.75, 0.35).normalize() }
      },
      vertexShader: `
        uniform float uTime;
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        varying vec3 vNormal;

        void main() {
          vUv = uv;
          vec3 pos = position;

          // Multi-frequency river wave undulation
          float w1 = sin(pos.x * 0.16 + uTime * 1.5 + pos.y * 0.08) * 0.12;
          float w2 = cos(pos.y * 0.24 - uTime * 1.2 + pos.x * 0.07) * 0.08;
          float w3 = sin((pos.x + pos.y) * 0.35 + uTime * 2.2) * 0.04;
          pos.z += w1 + w2 + w3;

          vNormal = normalize(vec3(
            -cos(pos.x * 0.16 + uTime * 1.5) * 0.14 - cos((pos.x + pos.y) * 0.35 + uTime * 2.2) * 0.04,
            -sin(pos.y * 0.24 - uTime * 1.2) * 0.10 - cos((pos.x + pos.y) * 0.35 + uTime * 2.2) * 0.04,
            1.0
          ));

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
        uniform vec3 uSkyColor;
        uniform vec3 uSunDir;
        varying vec2 vUv;
        varying vec3 vWorldPosition;
        varying vec3 vNormal;

        void main() {
          // Shore depth gradient: shallow clear turquoise on western ghat shoreline
          float depthFactor = smoothstep(0.02, 0.42, vUv.x) * smoothstep(1.0, 0.75, vUv.x);
          vec3 waterBase = mix(uShallowWaterColor, uDeepWaterColor, depthFactor);

          // Fresnel reflection calculation
          vec3 viewDir = normalize(cameraPosition - vWorldPosition);
          float fresnel = pow(1.0 - max(dot(viewDir, vNormal), 0.0), 3.5);

          // Dynamic sun specular shimmer
          vec3 halfVec = normalize(uSunDir + viewDir);
          float specular = pow(max(dot(vNormal, halfVec), 0.0), 64.0);

          // Subtle river surface micro-ripple shimmer
          float shimmer = sin(vWorldPosition.z * 1.4 + uTime * 2.5) * cos(vWorldPosition.x * 1.4 - uTime * 1.8) * 0.08;

          vec3 finalColor = mix(waterBase, uSkyColor, fresnel * 0.65 + shimmer);
          finalColor += uSunColor * specular * 2.6;

          gl_FragColor = vec4(finalColor, 0.95);
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
        const offset = idx * 1.15;
        boat.rotation.z = Math.sin(t * 1.4 + offset) * 0.04;
        boat.rotation.x = Math.cos(t * 1.1 + offset) * 0.02;
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
        position={[132, -1.05, 0]}
        receiveShadow
        material={waterMaterial}
      >
        <planeGeometry args={[112, 480, 72, 72]} />
      </mesh>

      {/* Riverbed Basin Underwater Foundation */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[132, -2.4, 0]}
      >
        <planeGeometry args={[144, 500]} />
        <meshStandardMaterial
          color="#081420"
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
            <planeGeometry args={[island.radiusX * 2, island.radiusZ * 2, 28, 28]} />
            <meshStandardMaterial
              map={sandTexture}
              color="#caa373"
              roughness={0.92}
              metalness={0.0}
            />
          </mesh>
          {/* Subtle mounded sand central ridge */}
          <mesh position={[0, 0.16, 0]} scale={[island.radiusX * 0.72, 0.38, island.radiusZ * 0.72]}>
            <sphereGeometry args={[1, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial map={sandTexture} color="#bfa070" roughness={0.95} />
          </mesh>
        </group>
      ))}

      {/* Western Sand Strip connecting ghats to river edge (X=88 to 106) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[97, -0.72, 0]}
        receiveShadow
      >
        <planeGeometry args={[24, 440]} />
        <meshStandardMaterial
          map={sandTexture}
          color="#caa373"
          roughness={0.9}
        />
      </mesh>

      {/* ============================================================== */}
      {/* 3. HISTORIC MULTI-SPAN ARCHED RIVER BRIDGES (NORTH & SOUTH)    */}
      {/* ============================================================== */}
      {RIVER_BRIDGES.map(bridge => {
        const spanLength = bridge.endX - bridge.startX;
        const centerX = (bridge.startX + bridge.endX) / 2;
        const pierInterval = spanLength / (bridge.piersCount + 1);

        return (
          <group key={bridge.id} position={[centerX, 0, bridge.z]}>
            {/* Bridge Roadway Deck */}
            <mesh position={[0, bridge.height, 0]} castShadow receiveShadow>
              <boxGeometry args={[spanLength + 4, 0.9, bridge.widthZ]} />
              <meshStandardMaterial map={bridgeStoneTexture} color="#57534e" roughness={0.8} />
            </mesh>

            {/* Asphalt Road Bed atop Deck */}
            <mesh position={[0, bridge.height + 0.5, 0]} receiveShadow>
              <boxGeometry args={[spanLength + 4, 0.1, bridge.widthZ - 1.2]} />
              <meshStandardMaterial color="#27272a" roughness={0.9} />
            </mesh>

            {/* Balustrade Stone Parapets on Both Sides */}
            {[-bridge.widthZ / 2 + 0.3, bridge.widthZ / 2 - 0.3].map((pz, pi) => (
              <mesh key={`parapet_${pi}`} position={[0, bridge.height + 0.95, pz]} castShadow>
                <boxGeometry args={[spanLength + 4, 0.85, 0.45]} />
                <meshStandardMaterial map={bridgeStoneTexture} color="#78716c" roughness={0.75} />
              </mesh>
            ))}

            {/* Bridge Stone Piers & Semicircular Arches across river channel */}
            {Array.from({ length: bridge.piersCount }).map((_, pIdx) => {
              const pierX = -spanLength / 2 + (pIdx + 1) * pierInterval;
              return (
                <group key={`pier_group_${pIdx}`} position={[pierX, 0, 0]}>
                  {/* Heavy Masonry Pier Foundation */}
                  <mesh position={[0, bridge.height / 2 - 0.2, 0]} castShadow receiveShadow>
                    <boxGeometry args={[4.2, bridge.height + 2.0, bridge.widthZ + 1.2]} />
                    <meshStandardMaterial map={bridgeStoneTexture} color="#44403c" roughness={0.85} />
                  </mesh>

                  {/* Upstream Triangular Cutwater (breaks current) */}
                  <mesh position={[0, bridge.height / 2 - 0.2, -bridge.widthZ / 2 - 1.2]} rotation={[0, 0, 0]} castShadow>
                    <coneGeometry args={[2.1, bridge.height + 2.0, 3]} />
                    <meshStandardMaterial map={bridgeStoneTexture} color="#383431" roughness={0.88} />
                  </mesh>

                  {/* Downstream Rounded Pier Nose */}
                  <mesh position={[0, bridge.height / 2 - 0.2, bridge.widthZ / 2 + 0.6]} castShadow>
                    <cylinderGeometry args={[2.1, 2.1, bridge.height + 2.0, 8, 1, false, 0, Math.PI]} />
                    <meshStandardMaterial map={bridgeStoneTexture} color="#383431" roughness={0.88} />
                  </mesh>

                  {/* Stone Arch Crown */}
                  <mesh position={[pierInterval / 2, bridge.height - 0.7, 0]} rotation={[0, 0, 0]} castShadow>
                    <boxGeometry args={[pierInterval - 4.2, 0.8, bridge.widthZ]} />
                    <meshStandardMaterial map={bridgeStoneTexture} color="#524e49" roughness={0.8} />
                  </mesh>

                  {/* Vintage Bridge Lampposts atop Piers */}
                  {[-bridge.widthZ / 2 + 0.3, bridge.widthZ / 2 - 0.3].map((lz, li) => (
                    <group key={`bridge_lamp_${li}`} position={[0, bridge.height + 1.4, lz]}>
                      <mesh position={[0, 1.2, 0]} castShadow>
                        <cylinderGeometry args={[0.07, 0.1, 2.4, 6]} />
                        <meshStandardMaterial color="#1e293b" metalness={0.85} />
                      </mesh>
                      <mesh position={[0, 2.4, 0]}>
                        <sphereGeometry args={[0.16, 8, 8]} />
                        <meshStandardMaterial color="#fef08a" emissive="#f59e0b" emissiveIntensity={1.5} />
                      </mesh>
                    </group>
                  ))}
                </group>
              );
            })}
          </group>
        );
      })}

      {/* ============================================================== */}
      {/* 4. HISTORIC BASALT STONE BATHING GHATS & WATERLINE STEPS       */}
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
              <meshStandardMaterial map={basaltTexture} color="#78716c" roughness={0.7} />
            </mesh>
            <mesh position={[0, 4.1, 0]}>
              <sphereGeometry args={[0.4, 12, 12]} />
              <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.2} />
            </mesh>
          </group>

          {/* Stepped Basalt Stone Flights descending into water */}
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
                  color={isSubmergedWaterline ? '#181716' : '#57534e'}
                  roughness={isSubmergedWaterline ? 0.2 : 0.8}
                  metalness={isSubmergedWaterline ? 0.35 : 0.08}
                />
              </mesh>
            );
          })}

          {/* Flanking Stone Bastion Walls with Mooring Bollards */}
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
      {/* 5. STONE FOOTBRIDGE (Pundalik Setu) TO ISLAND TEMPLE           */}
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
      {/* 6. TALL DEEPAMALAS (STONE LAMP TOWERS) ON RIVERBANK            */}
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
      {/* 7. WARKARI PILGRIM TENTS (RAOTEE) ON THE SANDBANK              */}
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
      {/* 8. WOODEN PILGRIM BOATS (NAAV) IN CHANDRABHAGA                 */}
      {/* ============================================================== */}
      <group ref={boatGroupRef}>
        {RIVER_BOATS.map((b, idx) => (
          <group key={b.id} position={[b.x, b.y, b.z]} rotation={[0, b.rotation, 0]}>
            {/* Wooden Boat Hull */}
            <mesh position={[0, 0.3, 0]} scale={[1.8, 0.8, 4.8]} castShadow>
              <sphereGeometry args={[1, 12, 8]} />
              <meshStandardMaterial color="#5c2b0c" roughness={0.82} />
            </mesh>
            {/* Hollow Deck Benches */}
            {[-1.2, 0, 1.2].map((bz, bi) => (
              <mesh key={`bench_${bi}`} position={[0, 0.42, bz]}>
                <boxGeometry args={[1.5, 0.08, 0.4]} />
                <meshStandardMaterial color="#78350f" roughness={0.75} />
              </mesh>
            ))}
            {/* Wooden Oars */}
            <mesh position={[1.1, 0.5, 0.4]} rotation={[0.4, 0, 0.65]}>
              <cylinderGeometry args={[0.04, 0.04, 3.2, 6]} />
              <meshStandardMaterial color="#381b07" />
            </mesh>
            {/* Boat Saffron Flag on Wooden Mast */}
            <group
              ref={el => (flagRefs.current[idx] = el)}
              position={[0, 0.4, -2.1]}
            >
              <mesh position={[0, 1.2, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 2.4, 6]} />
                <meshStandardMaterial color="#5c2b0c" />
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
