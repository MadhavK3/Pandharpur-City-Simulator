import React, { useEffect } from 'react';
import { CityCanvas } from './components/city/CityCanvas.jsx';
import { TopNavigation } from './components/layout/TopNavigation.jsx';
import { Sidebar } from './components/layout/Sidebar.jsx';
import { PlaybackControls } from './components/playback/PlaybackControls.jsx';
import { LandmarkPanel } from './components/landmarks/LandmarkPanel.jsx';
import { AlgorithmLab } from './components/algorithms/AlgorithmLab.jsx';
import { MissionPanel } from './components/missions/MissionPanel.jsx';
import { NetworkEditor } from './components/network/NetworkEditor.jsx';
import { GroundControlsUI } from './components/city/GroundControlsUI.jsx';
import { WelcomeScreen } from './screens/WelcomeScreen.jsx';
import { useSimulationStore } from './store/simulationStore.js';

export function App() {
  const runCurrentAlgorithm = useSimulationStore(state => state.runCurrentAlgorithm);

  useEffect(() => {
    // Run initial Dijkstra shortest path on mount
    runCurrentAlgorithm();
  }, [runCurrentAlgorithm]);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* 3D Scene Canvas */}
      <CityCanvas />

      {/* 2D UI Overlays */}
      <TopNavigation />
      <Sidebar />
      <PlaybackControls />
      <LandmarkPanel />
      <AlgorithmLab />
      <MissionPanel />
      <NetworkEditor />
      <GroundControlsUI />
      <WelcomeScreen />
    </div>
  );
}

export default App;
