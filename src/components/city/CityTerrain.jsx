import React from 'react';

export function CityTerrain() {
  return (
    <group name="terrain_root">
      {/* 1. Main Western City Ground Plane (Town Area from X=-260 to X=90) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-85, -0.05, 0]} receiveShadow>
        <planeGeometry args={[350, 420, 32, 32]} />
        <meshStandardMaterial
          color="#292524" // Dark rich soil / stone ground
          roughness={0.92}
          metalness={0.04}
        />
      </mesh>

      {/* 2. Eastern Far Riverbank (Distant bank beyond Chandrabhaga from X=165 to X=320) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[230, -0.05, 0]} receiveShadow>
        <planeGeometry args={[140, 420, 16, 16]} />
        <meshStandardMaterial
          color="#166534" // Green pastoral riverbank opposite Pandharpur
          roughness={0.9}
        />
      </mesh>

      {/* 3. Temple Sanctum Courtyard Stone Pavement around Vitthal Mandir */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.04, 0]} receiveShadow>
        <planeGeometry args={[65, 80]} />
        <meshStandardMaterial
          color="#44403c" // Historic basalt flagstone
          roughness={0.65}
          metalness={0.15}
        />
      </mesh>

      {/* 4. Rashtramata Jijabai Garden (Lush Greenery at [-45, -80]) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-45, 0.05, -80]} receiveShadow>
        <planeGeometry args={[50, 45]} />
        <meshStandardMaterial
          color="#15803d" // Vibrant garden lawn
          roughness={0.8}
        />
      </mesh>

      {/* 5. Padmavati Lake Basin at [-88, 120] */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-88, -0.25, 120]}>
        <circleGeometry args={[26, 32]} />
        <meshStandardMaterial
          color="#0284c7"
          roughness={0.15}
          metalness={0.7}
        />
      </mesh>

      {/* 6. Garden Shade Trees in Jijabai Udyan */}
      {[-60, -45, -30].map((x, i) =>
        [-95, -80, -65].map((z, j) => (
          <group key={`tree_${i}_${j}`} position={[x, 0, z]}>
            {/* Trunk */}
            <mesh position={[0, 2.2, 0]}>
              <cylinderGeometry args={[0.35, 0.6, 4.4, 8]} />
              <meshStandardMaterial color="#451a03" roughness={0.9} />
            </mesh>
            {/* Foliage Canopy */}
            <mesh position={[0, 5.5, 0]}>
              <sphereGeometry args={[2.8, 10, 10]} />
              <meshStandardMaterial color="#166534" roughness={0.75} />
            </mesh>
          </group>
        ))
      )}

      {/* 7. Coconut Palm Trees along the Chandrabhaga western promenade (X ≈ 82) */}
      {[-80, -40, 0, 40, 80].map((z, idx) => (
        <group key={`palm_${idx}`} position={[82, 0, z]}>
          <mesh position={[0, 3.5, 0]} rotation={[0, 0, 0.08]}>
            <cylinderGeometry args={[0.25, 0.45, 7.0, 8]} />
            <meshStandardMaterial color="#5c3a21" roughness={0.9} />
          </mesh>
          <mesh position={[0.4, 7.4, 0]}>
            <coneGeometry args={[3.2, 1.8, 6]} />
            <meshStandardMaterial color="#22c55e" roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}
