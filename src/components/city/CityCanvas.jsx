import React, { Suspense } from 'react';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { LightingController } from './LightingController.jsx';
import { CityTerrain } from './CityTerrain.jsx';
import { RiverEnvironment } from './RiverEnvironment.jsx';
import { TempleLandmarks } from './TempleLandmarks.jsx';
import { BuildingGenerator } from './BuildingGenerator.jsx';
import { RoadNetwork3D } from './RoadNetwork3D.jsx';
import { GraphOverlay3D } from './GraphOverlay3D.jsx';
import { RouteAnimation3D } from './RouteAnimation3D.jsx';
import { CrowdSimulation } from './CrowdSimulation.jsx';
import { CameraController } from './CameraController.jsx';
import { PostProcessingPipeline } from './PostProcessingPipeline.jsx';
import { CustomBlenderScene } from './BlenderModel.jsx';

export function CityCanvas() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
      <Canvas
        camera={{ position: [0, 95, 140], fov: 50, near: 1, far: 1100 }}
        shadows
        gl={{
          antialias: true,
          alpha: false,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.15
        }}
      >
        <Suspense fallback={null}>
          <LightingController />
          <CityTerrain />
          <RiverEnvironment />
          <TempleLandmarks />
          <BuildingGenerator />
          <CustomBlenderScene />
          <RoadNetwork3D />
          <GraphOverlay3D />
          <RouteAnimation3D />
          <CrowdSimulation />
          <CameraController />
          <PostProcessingPipeline />
        </Suspense>
      </Canvas>
    </div>
  );
}
