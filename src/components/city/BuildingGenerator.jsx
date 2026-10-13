import React from 'react';
import { PROCEDURAL_BUILDINGS } from '../../data/cityLayout.js';

export function BuildingGenerator() {
  return (
    <group name="procedural_buildings_root">
      {PROCEDURAL_BUILDINGS.map(b => (
        <group key={b.id} position={[b.x, 0, b.z]}>
          {/* Main Building Solid Masonry Block */}
          <mesh position={[0, b.height / 2, 0]} castShadow receiveShadow>
            <boxGeometry args={[b.width, b.height, b.depth]} />
            <meshStandardMaterial
              color={b.color || '#94a3b8'}
              roughness={0.78}
              metalness={0.1}
            />
          </mesh>

          {/* Roof Style based on type */}
          {b.type === 'wada' || b.type === 'bazaar' ? (
            /* Traditional Terracotta Clay Tile Slanted Wada Roof */
            <mesh position={[0, b.height + 1.2, 0]} castShadow>
              <coneGeometry args={[Math.max(b.width, b.depth) * 0.75, 2.5, 4]} />
              <meshStandardMaterial color="#c2410c" roughness={0.75} />
            </mesh>
          ) : b.type === 'lodging' ? (
            /* Flat parapet with rooftop water tank */
            <group position={[0, b.height, 0]}>
              <mesh position={[0, 0.4, 0]}>
                <boxGeometry args={[b.width * 0.96, 0.8, b.depth * 0.96]} />
                <meshStandardMaterial color="#475569" roughness={0.8} />
              </mesh>
              {/* Rooftop overhead water tank */}
              <mesh position={[b.width * 0.25, 1.6, b.depth * 0.25]}>
                <cylinderGeometry args={[1.5, 1.5, 2.2, 12]} />
                <meshStandardMaterial color="#0284c7" metalness={0.6} />
              </mesh>
            </group>
          ) : null}

          {/* Wooden Balcony (Jharokha) for Wada buildings */}
          {b.type === 'wada' && (
            <mesh position={[0, b.height * 0.6, b.depth / 2 + 0.6]} castShadow>
              <boxGeometry args={[b.width * 0.6, 1.4, 1.2]} />
              <meshStandardMaterial color="#5c3a21" roughness={0.85} />
            </mesh>
          )}

          {/* Bazaar Shopfront Awning & Hanging Garlands */}
          {b.type === 'bazaar' && (
            <group position={[0, 1.8, b.depth / 2 + 0.6]}>
              {/* Striped Awning Canopy */}
              <mesh rotation={[0.3, 0, 0]}>
                <boxGeometry args={[b.width * 0.9, 0.1, 1.8]} />
                <meshStandardMaterial color="#ea580c" />
              </mesh>
              {/* Hanging Flower Garland / Toran */}
              <mesh position={[0, -0.4, 0.8]}>
                <cylinderGeometry args={[0.08, 0.08, b.width * 0.8, 6]} rotation={[0, 0, Math.PI / 2]} />
                <meshStandardMaterial color="#facc15" />
              </mesh>
            </group>
          )}
        </group>
      ))}
    </group>
  );
}
