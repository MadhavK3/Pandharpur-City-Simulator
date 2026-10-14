import React, { useEffect, useMemo } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { useSimulationStore } from '../../store/simulationStore.js';

export function PostProcessingPipeline() {
  const { gl, scene, camera, size } = useThree();
  const bloomEnabled = useSimulationStore(state => state.bloomEnabled ?? true);

  const [composer, bloomPass] = useMemo(() => {
    try {
      const comp = new EffectComposer(gl);
      const renderPass = new RenderPass(scene, camera);
      comp.addPass(renderPass);

      // UnrealBloomPass: warm golden bloom for temple kalash, river sun glints, and DAA routes
      const bloom = new UnrealBloomPass(
        new THREE.Vector2(size.width, size.height),
        0.65, // strength
        0.35, // radius
        0.82  // threshold
      );
      comp.addPass(bloom);

      // OutputPass handles ACESFilmicToneMapping and sRGB transfer
      const outputPass = new OutputPass();
      comp.addPass(outputPass);

      return [comp, bloom];
    } catch (e) {
      console.warn('PostProcessing initialization fallback:', e);
      return [null, null];
    }
  }, [gl, scene, camera]);

  // Handle dynamic resize
  useEffect(() => {
    if (!composer) return;
    composer.setSize(size.width, size.height);
    if (bloomPass) {
      bloomPass.resolution.set(size.width, size.height);
    }
  }, [composer, bloomPass, size]);

  // Render loop override with priority 1
  useFrame((state, delta) => {
    if (composer && bloomEnabled) {
      composer.render(delta);
    } else {
      gl.render(scene, camera);
    }
  }, 1);

  return null;
}

export default PostProcessingPipeline;

