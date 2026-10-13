import React from 'react';
import { useSimulationStore } from '../../store/simulationStore.js';

export function LightingController() {
  const timeOfDay = useSimulationStore(state => state.timeOfDay);

  const configs = {
    day: {
      sunColor: '#fff8e7',
      sunIntensity: 2.2,
      sunPos: [120, 180, 80],
      ambientColor: '#cbd5e1',
      ambientIntensity: 0.9,
      fogColor: '#93c5fd',
      fogNear: 250,
      fogFar: 750
    },
    evening: {
      sunColor: '#f97316', // Warm sunset golden saffron
      sunIntensity: 2.4,
      sunPos: [-180, 50, 40],
      ambientColor: '#fdba74',
      ambientIntensity: 0.85,
      fogColor: '#fed7aa',
      fogNear: 200,
      fogFar: 650
    },
    night: {
      sunColor: '#60a5fa', // Cool blue moonlight
      sunIntensity: 0.5,
      sunPos: [60, 150, -100],
      ambientColor: '#0f172a',
      ambientIntensity: 0.4,
      fogColor: '#030712',
      fogNear: 160,
      fogFar: 550
    },
    aarti: {
      sunColor: '#fbbf24', // Divine golden aarti glow
      sunIntensity: 1.6,
      sunPos: [20, 80, 40],
      ambientColor: '#451a03',
      ambientIntensity: 0.7,
      fogColor: '#261204',
      fogNear: 180,
      fogFar: 600
    }
  };

  const current = configs[timeOfDay] || configs.day;

  return (
    <>
      <color attach="background" args={[current.fogColor]} />
      <fog attach="fog" args={[current.fogColor, current.fogNear, current.fogFar]} />
      <ambientLight color={current.ambientColor} intensity={current.ambientIntensity} />
      <directionalLight
        position={current.sunPos}
        intensity={current.sunIntensity}
        color={current.sunColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={10}
        shadow-camera-far={450}
        shadow-camera-left={-220}
        shadow-camera-right={220}
        shadow-camera-top={220}
        shadow-camera-bottom={-220}
      />
      {/* Golden divine aura point light directly above Shree Vitthal Mandir */}
      <pointLight position={[0, 28, -10]} color="#fbbf24" intensity={4.5} distance={120} />
      {/* Chandrabhaga Ghat Aarti Lanterns Glow */}
      <pointLight position={[95, 8, 0]} color="#f97316" intensity={3.5} distance={90} />
      {/* Pundalik Temple Island Glow */}
      <pointLight position={[115, 10, 5]} color="#fbbf24" intensity={3.0} distance={75} />
    </>
  );
}
