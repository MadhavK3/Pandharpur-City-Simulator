import React, { useState } from 'react';
import * as THREE from 'three';
import { useSimulationStore } from '../../store/simulationStore.js';
import { PANDHARPUR_GRAPH_DATA } from '../../data/pedestrianGraph.js';
import { Html } from '@react-three/drei';

export function GraphOverlay3D() {
  const showGraphOverlay = useSimulationStore(state => state.showGraphOverlay);
  const startNode = useSimulationStore(state => state.startNode);
  const endNode = useSimulationStore(state => state.endNode);
  const multiStops = useSimulationStore(state => state.multiStops);
  const closedEdges = useSimulationStore(state => state.closedEdges);
  const routeResult = useSimulationStore(state => state.routeResult);
  const activeStepIndex = useSimulationStore(state => state.activeStepIndex);
  const toggleEdgeBarricade = useSimulationStore(state => state.toggleEdgeBarricade);
  const setStartNode = useSimulationStore(state => state.setStartNode);
  const setEndNode = useSimulationStore(state => state.setEndNode);

  const [hoveredNode, setHoveredNode] = useState(null);
  const [hoveredEdge, setHoveredEdge] = useState(null);

  if (!showGraphOverlay) return null;

  const currentStep = routeResult?.steps?.[activeStepIndex] || {};
  const visitedSet = new Set(currentStep.visited || []);
  const frontierSet = new Set(currentStep.frontier || []);
  const activeSubpathSet = new Set(currentStep.activeSubpath || []);
  const mstEdgeSet = new Set(currentStep.mstEdges || routeResult?.mstEdges || []);

  const nodeMap = new Map(PANDHARPUR_GRAPH_DATA.nodes.map(n => [n.id, n]));

  return (
    <group name="graph_overlay_root">
      {/* 1. GRAPH EDGES */}
      {PANDHARPUR_GRAPH_DATA.edges.map(edge => {
        const u = nodeMap.get(edge.source);
        const v = nodeMap.get(edge.target);
        if (!u || !v) return null;

        const isClosed = closedEdges.has(edge.id);
        const isCurrentEdge = currentStep.currentEdge === edge.id;
        const isMstEdge = mstEdgeSet.has(edge.id);
        const isHovered = hoveredEdge === edge.id;

        // Path segment check
        let isPathEdge = false;
        if (currentStep.activeSubpath && currentStep.activeSubpath.length > 1) {
          for (let i = 0; i < currentStep.activeSubpath.length - 1; i++) {
            const p1 = currentStep.activeSubpath[i];
            const p2 = currentStep.activeSubpath[i + 1];
            if ((edge.source === p1 && edge.target === p2) || (edge.source === p2 && edge.target === p1)) {
              isPathEdge = true;
              break;
            }
          }
        }

        let edgeColor = '#475569';
        let edgeRadius = 0.22;
        let opacity = 0.45;

        if (isClosed) {
          edgeColor = '#ef4444'; // Barricaded
          edgeRadius = 0.55;
          opacity = 0.95;
        } else if (isCurrentEdge) {
          edgeColor = '#facc15';
          edgeRadius = 0.55;
          opacity = 1.0;
        } else if (isPathEdge) {
          edgeColor = '#10b981';
          edgeRadius = 0.45;
          opacity = 0.95;
        } else if (isMstEdge) {
          edgeColor = '#f59e0b';
          edgeRadius = 0.38;
          opacity = 0.9;
        }

        // Midpoint and orientation elevated cleanly above road
        const p1 = new THREE.Vector3(u.x, u.y + 0.65, u.z);
        const p2 = new THREE.Vector3(v.x, v.y + 0.65, v.z);
        const mid = p1.clone().add(p2).multiplyScalar(0.5);
        const dist = p1.distanceTo(p2);

        // Cylinder rotation to align with vector
        const dir = p2.clone().sub(p1).normalize();
        const orientation = new THREE.Quaternion();
        const up = new THREE.Vector3(0, 1, 0);
        orientation.setFromUnitVectors(up, dir);

        return (
          <group
            key={`edge_overlay_${edge.id}`}
            onClick={(e) => {
              e.stopPropagation();
              toggleEdgeBarricade(edge.id);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredEdge(edge.id);
            }}
            onPointerOut={() => setHoveredEdge(null)}
          >
            {/* Cylinder mesh representing edge link */}
            <mesh position={mid} quaternion={orientation}>
              <cylinderGeometry args={[edgeRadius, edgeRadius, dist, 8]} />
              <meshStandardMaterial
                color={edgeColor}
                emissive={isClosed ? '#ef4444' : isCurrentEdge ? '#f59e0b' : isPathEdge ? '#10b981' : '#000000'}
                emissiveIntensity={isClosed || isCurrentEdge || isPathEdge ? 0.8 : 0}
                transparent
                opacity={opacity}
              />
            </mesh>

            {/* Red Barricade Sign if Closed */}
            {isClosed && (
              <Html position={[mid.x, mid.y + 1.2, mid.z]} center distanceFactor={70}>
                <div style={{
                  background: '#ef4444',
                  color: '#ffffff',
                  fontSize: '9px',
                  fontWeight: '800',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  boxShadow: '0 0 10px rgba(239, 68, 68, 0.8)',
                  whiteSpace: 'nowrap',
                  cursor: 'pointer'
                }}>
                  ⛔ BARRICADED
                </div>
              </Html>
            )}

            {/* Edge Info on Hover */}
            {isHovered && !isClosed && (
              <Html position={[mid.x, mid.y + 1.0, mid.z]} center distanceFactor={70}>
                <div style={{
                  background: 'rgba(15, 23, 42, 0.9)',
                  border: '1px solid #f59e0b',
                  color: '#fbbf24',
                  fontSize: '10px',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none'
                }}>
                  {edge.streetName} ({edge.distanceMeters}m)
                </div>
              </Html>
            )}
          </group>
        );
      })}

      {/* 2. GRAPH NODES */}
      {PANDHARPUR_GRAPH_DATA.nodes.map(node => {
        const isStart = node.id === startNode;
        const isEnd = node.id === endNode;
        const isMultiStop = multiStops.includes(node.id);
        const isCurrentNode = currentStep.currentNode === node.id;
        const isVisited = visitedSet.has(node.id);
        const isFrontier = frontierSet.has(node.id);
        const isPathNode = activeSubpathSet.has(node.id);
        const isHovered = hoveredNode === node.id;

        let nodeColor = '#94a3b8';
        let nodeSize = 0.85;

        if (isStart) {
          nodeColor = '#10b981'; // Green
          nodeSize = 1.4;
        } else if (isEnd) {
          nodeColor = '#f59e0b'; // Gold
          nodeSize = 1.4;
        } else if (isMultiStop) {
          nodeColor = '#ec4899'; // Pink/Magenta
          nodeSize = 1.2;
        } else if (isCurrentNode) {
          nodeColor = '#facc15'; // Yellow
          nodeSize = 1.25;
        } else if (isPathNode) {
          nodeColor = '#22c55e'; // Green
          nodeSize = 1.05;
        } else if (isFrontier) {
          nodeColor = '#06b6d4'; // Cyan
          nodeSize = 0.95;
        } else if (isVisited) {
          nodeColor = '#6366f1'; // Indigo
          nodeSize = 0.9;
        }

        return (
          <group
            key={`node_overlay_${node.id}`}
            position={[node.x, node.y + 0.75, node.z]}
            onClick={(e) => {
              e.stopPropagation();
              if (e.shiftKey) {
                setEndNode(node.id);
              } else {
                setStartNode(node.id);
              }
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredNode(node.id);
            }}
            onPointerOut={() => setHoveredNode(null)}
          >
            {/* Sphere Mesh */}
            <mesh castShadow>
              <sphereGeometry args={[nodeSize, 16, 16]} />
              <meshStandardMaterial
                color={nodeColor}
                emissive={nodeColor}
                emissiveIntensity={isStart || isEnd || isCurrentNode ? 0.9 : 0.4}
                metalness={0.2}
                roughness={0.4}
              />
            </mesh>

            {/* Label on Hover or Key Nodes */}
            {(isHovered || isStart || isEnd || isMultiStop) && (
              <Html position={[0, nodeSize + 0.8, 0]} center distanceFactor={60}>
                <div style={{
                  background: isStart ? 'rgba(16, 185, 129, 0.9)' : isEnd ? 'rgba(245, 158, 11, 0.9)' : 'rgba(15, 23, 42, 0.9)',
                  color: isStart || isEnd ? '#090d16' : '#f8fafc',
                  border: '1px solid rgba(255,255,255,0.2)',
                  fontWeight: '700',
                  fontSize: '10px',
                  padding: '2px 6px',
                  borderRadius: '4px',
                  whiteSpace: 'nowrap',
                  pointerEvents: 'none',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.5)'
                }}>
                  {isStart ? '🚩 START: ' : isEnd ? '🎯 GOAL: ' : isMultiStop ? '📍 STOP: ' : ''}
                  {node.name}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}
