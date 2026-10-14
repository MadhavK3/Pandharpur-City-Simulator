import React from 'react';
import { useSimulationStore } from '../../store/simulationStore.js';

export function LightingController() {
  const timeOfDay = useSimulationStore(state => state.timeOfDay);

  const configs = {
    day: {
      sunColor: '#fff6e5', // Crisp warm Indian sunlight
      sunIntensity: 2.6,
      sunPos: [140, 190, 85],
      ambientColor: '#cbe2f7',
      ambientIntensity: 0.85,
      hemiSky: '#7cbdf8',
      hemiGround: '#d9a773', // Warm terracotta / soil ground bounce
      fogColor: '#b5d9f5',
      fogNear: 300,
      fogFar: 900
    },
    evening: {
      sunColor: '#f97316', // Sunset golden saffron
      sunIntensity: 2.6,
      sunPos: [-180, 55, 45],
      ambientColor: '#fed7aa',
      ambientIntensity: 0.85,
      hemiSky: '#fb923c',
      hemiGround: '#78350f',
      fogColor: '#fdba74',
      fogNear: 220,
      fogFar: 750
    },
    night: {
      sunColor: '#60a5fa', // Deep moonlight
      sunIntensity: 0.55,
      sunPos: [70, 160, -110],
      ambientColor: '#0f172a',
      ambientIntensity: 0.45,
      hemiSky: '#1e293b',
      hemiGround: '#090d16',
      fogColor: '#030712',
      fogNear: 180,
      fogFar: 600
    },
    aarti: {
      sunColor: '#fbbf24', // Divine golden evening aarti
      sunIntensity: 1.8,
      sunPos: [30, 90, 45],
      ambientColor: '#451a03',
      ambientIntensity: 0.75,
      hemiSky: '#f59e0b',
      hemiGround: '#351205',
      fogColor: '#2d1405',
      fogNear: 200,
      fogFar: 680
    }
  };

  const current = configs[timeOfDay] || configs.day;

  return (
    <>
      <color attach="background" args={[current.fogColor]} />
      <fog attach="fog" args={[current.fogColor, current.fogNear, current.fogFar]} />
      <ambientLight color={current.ambientColor} intensity={current.ambientIntensity} />
      <hemisphereLight
        args={[
          current.hemiSky,
          current.hemiGround,
          0.85
        ]}
      />
      <directionalLight
        position={current.sunPos}
        intensity={current.sunIntensity}
        color={current.sunColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
        shadow-normalBias={0.02}
        shadow-camera-near={10}
        shadow-camera-far={650}
        shadow-camera-left={-280}
        shadow-camera-right={280}
        shadow-camera-top={280}
        shadow-camera-bottom={-280}
      />

      {/* Golden divine aura point light directly above Shree Vitthal Mandir */}
      <pointLight position={[0, 34, -10]} color="#fbbf24" intensity={5.5} distance={150} />
      {/* Chandrabhaga Ghat Aarti Lanterns Glow */}
      <pointLight position={[95, 8, 0]} color="#f97316" intensity={3.8} distance={95} />
      {/* Pundalik Temple Island Glow */}
      <pointLight position={[115, 10, 5]} color="#fbbf24" intensity={3.2} distance={80} />
      {/* Vishnupad Mandir Island Glow */}
      <pointLight position={[118, 8, 68]} color="#f59e0b" intensity={3.0} distance={75} />
    </>
  );
}

export default LightingController;
