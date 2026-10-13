import { create } from 'zustand';
import { buildPandharpurGraph } from '../engine/graph/graphModel.js';
import { getAlgorithmById } from '../engine/algorithms/algorithmRegistry.js';
import { getLandmarkById } from '../data/landmarks.js';
import { MISSIONS, getMissionById } from '../data/missions.js';
import confetti from 'canvas-confetti';

export const useSimulationStore = create((set, get) => ({
  // --- Algorithm & Routing Configuration ---
  selectedAlgorithm: 'DIJKSTRA',
  startNode: 'RAILWAY_STATION',
  endNode: 'VITTHAL_ENTRANCE',
  multiStops: ['PUNDALIK_NODE', 'NAMDEV_STEPS'],
  costMetric: 'distance', // 'distance' | 'crowd_time' | 'scenic'

  // --- Graph State & Mutations ---
  closedEdges: new Set(),
  crowdMultiplier: 1.0,

  // --- Execution & Step-by-Step Playback ---
  routeResult: null,
  activeStepIndex: 0,
  isPlaying: false,
  playbackSpeed: 1.0,

  // --- Environment & 3D Visuals ---
  timeOfDay: 'day', // 'day' | 'evening' | 'night' | 'aarti'
  cameraMode: 'orbit', // 'orbit' | 'flyover' | 'landmark' | 'first_person'
  selectedLandmarkId: 'VITTHAL_RUKMINI_MANDIR',
  focusedCoordinates: [0, 0, 0],
  showGraphOverlay: true,
  showCrowdParticles: true,
  showHeatmap: false,

  // --- UI Panes ---
  isSidebarOpen: true,
  isAlgorithmLabOpen: false,
  isMissionPanelOpen: false,
  isNetworkEditorOpen: false,
  welcomeModalOpen: true,

  // --- Gamification & Missions ---
  activeMissionId: null,
  completedMissions: [],

  // --- Actions ---

  setAlgorithm: (algorithmId) => {
    set({ selectedAlgorithm: algorithmId, activeStepIndex: 0, isPlaying: false });
    get().runCurrentAlgorithm();
  },

  setStartNode: (nodeId) => {
    set({ startNode: nodeId, activeStepIndex: 0 });
    get().runCurrentAlgorithm();
  },

  setEndNode: (nodeId) => {
    set({ endNode: nodeId, activeStepIndex: 0 });
    get().runCurrentAlgorithm();
  },

  setMultiStops: (stops) => {
    set({ multiStops: stops, activeStepIndex: 0 });
    get().runCurrentAlgorithm();
  },

  addMultiStop: (stopId) => {
    const current = get().multiStops;
    if (!current.includes(stopId)) {
      set({ multiStops: [...current, stopId] });
      get().runCurrentAlgorithm();
    }
  },

  removeMultiStop: (stopId) => {
    set({ multiStops: get().multiStops.filter(id => id !== stopId) });
    get().runCurrentAlgorithm();
  },

  setCostMetric: (metric) => {
    set({ costMetric: metric });
    get().runCurrentAlgorithm();
  },

  setCrowdMultiplier: (mult) => {
    set({ crowdMultiplier: mult });
    get().runCurrentAlgorithm();
  },

  toggleEdgeBarricade: (edgeId) => {
    const current = new Set(get().closedEdges);
    if (current.has(edgeId)) {
      current.delete(edgeId);
    } else {
      current.add(edgeId);
    }
    set({ closedEdges: current, activeStepIndex: 0 });
    get().runCurrentAlgorithm();
  },

  resetAllBarricades: () => {
    set({ closedEdges: new Set(), activeStepIndex: 0 });
    get().runCurrentAlgorithm();
  },

  setTimeOfDay: (time) => set({ timeOfDay: time }),
  setCameraMode: (mode) => set({ cameraMode: mode }),

  toggleGraphOverlay: () => set(state => ({ showGraphOverlay: !state.showGraphOverlay })),
  toggleCrowdParticles: () => set(state => ({ showCrowdParticles: !state.showCrowdParticles })),
  toggleHeatmap: () => set(state => ({ showHeatmap: !state.showHeatmap })),

  setSidebarOpen: (open) => set({ isSidebarOpen: open }),
  setAlgorithmLabOpen: (open) => set({ isAlgorithmLabOpen: open }),
  setMissionPanelOpen: (open) => set({ isMissionPanelOpen: open }),
  setNetworkEditorOpen: (open) => set({ isNetworkEditorOpen: open }),
  setWelcomeModalOpen: (open) => set({ welcomeModalOpen: open }),

  selectLandmark: (landmarkId) => {
    const landmark = getLandmarkById(landmarkId);
    if (landmark) {
      set({
        selectedLandmarkId: landmarkId,
        focusedCoordinates: landmark.coordinates,
        cameraMode: 'landmark'
      });
    } else {
      set({ selectedLandmarkId: null });
    }
  },

  // --- Step Timeline Controls ---
  setStepIndex: (index) => {
    const maxSteps = get().routeResult?.steps?.length || 1;
    const clamped = Math.max(0, Math.min(index, maxSteps - 1));
    set({ activeStepIndex: clamped });
  },

  stepForward: () => {
    const { activeStepIndex, routeResult } = get();
    if (routeResult?.steps && activeStepIndex < routeResult.steps.length - 1) {
      set({ activeStepIndex: activeStepIndex + 1 });
    }
  },

  stepBackward: () => {
    const { activeStepIndex } = get();
    if (activeStepIndex > 0) {
      set({ activeStepIndex: activeStepIndex - 1 });
    }
  },

  togglePlay: () => set(state => ({ isPlaying: !state.isPlaying })),
  setPlaybackSpeed: (speed) => set({ playbackSpeed: speed }),

  // --- Central Execution Runner ---
  runCurrentAlgorithm: () => {
    const {
      selectedAlgorithm,
      startNode,
      endNode,
      multiStops,
      closedEdges,
      crowdMultiplier,
      costMetric
    } = get();

    const graph = buildPandharpurGraph({
      closedEdges,
      crowdMultiplier,
      costMetric
    });

    const algoDef = getAlgorithmById(selectedAlgorithm);
    let result = null;

    try {
      if (selectedAlgorithm === 'KRUSKAL') {
        result = algoDef.runner(graph);
      } else if (selectedAlgorithm === 'MULTI_STOP') {
        result = algoDef.runner(graph, startNode, endNode, { multiStops });
      } else {
        result = algoDef.runner(graph, startNode, endNode);
      }
    } catch (e) {
      console.error('Error executing algorithm:', e);
    }

    set({
      routeResult: result,
      activeStepIndex: result?.steps?.length ? result.steps.length - 1 : 0
    });

    // Check mission condition
    get().checkMissionProgress();
  },

  // --- Mission System ---
  startMission: (missionId) => {
    const mission = getMissionById(missionId);
    if (!mission) return;

    set({
      activeMissionId: missionId,
      selectedAlgorithm: mission.algorithm || 'DIJKSTRA',
      startNode: mission.sourceNodeId || get().startNode,
      endNode: mission.targetNodeId || get().endNode,
      isMissionPanelOpen: false,
      activeStepIndex: 0
    });

    if (mission.closedEdgeId) {
      const nextClosed = new Set(get().closedEdges);
      nextClosed.add(mission.closedEdgeId);
      set({ closedEdges: nextClosed });
    }

    if (mission.intermediateStops) {
      set({ multiStops: mission.intermediateStops });
    }

    get().runCurrentAlgorithm();
  },

  checkMissionProgress: () => {
    const { activeMissionId, completedMissions } = get();
    if (!activeMissionId) return;

    const mission = getMissionById(activeMissionId);
    if (!mission || completedMissions.includes(activeMissionId)) return;

    const isSatisfied = mission.validate(get());
    if (isSatisfied) {
      set({ completedMissions: [...completedMissions, activeMissionId] });
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }
  }
}));
