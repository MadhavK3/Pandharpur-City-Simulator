# Technical Stack Specification

This document details the software versions, package configurations, and build/test workflows for the project.

---

## 1. Core Dependency Matrix

Package | Version | Primary Responsibility
:--- | :--- | :---
`react` | `^19.2.0` | UI component foundation and React 19 concurrent features.
`react-dom` | `^19.2.0` | DOM rendering and portal mounts.
`three` | `^0.186.1` | WebGL 3D graphics rendering engine.
`@react-three/fiber` | `^9.8.1` | Declarative Three.js scene graph wrapper for React 19.
`@react-three/drei` | `^10.7.9` | 3D utilities: OrbitControls, Html overlays, loaders.
`zustand` | `^5.0.15` | Centralized state store for simulation and UI.
`framer-motion` | `^12.23.26` | 2D UI drawer transitions, modal backdrops, and tab animations.
`lucide-react` | `^0.562.0` | Clean SVG iconography without emojis.
`canvas-confetti` | `^1.9.4` | Particle celebration upon mission completion.

---

## 2. Tooling and Development Dependencies

Package | Version | Purpose
:--- | :--- | :---
`vite` | `^7.2.4` | Fast development server and ES module bundler.
`@vitejs/plugin-react-swc`| `^4.2.2` | High-performance SWC-based React compiler.
`vitest` | `^5.0.4` | Unit and algorithmic test runner.

---

## 3. Operational Runbook

All commands are formatted for **Windows PowerShell**:

### 3.1. Development Server
```powershell
npm run dev
```

### 3.2. Automated Testing
Run Vitest headlessly:
```powershell
# Run all test suites
npx vitest run

# Run specific algorithm suite
npx vitest run src/test/astar.test.js
```

### 3.3. Production Build
Verify bundle compilation:
```powershell
npm run build
```

### 3.4. Local Production Preview
```powershell
npm run preview
```

