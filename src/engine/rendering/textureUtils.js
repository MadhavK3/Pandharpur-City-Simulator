import * as THREE from 'three';

// Procedural PBR Texture Generator for Pandharpur Darshan 3D
// Generates photorealistic, lightweight PBR maps without requiring external asset downloads

let basaltTextureCache = null;
let roofTileTextureCache = null;
let waterNormalTextureCache = null;
let sandTextureCache = null;
let wadaWallTextureCache = null;
let bazaarClothTextureCache = null;
let bridgeStoneTextureCache = null;
let templeCarvingTextureCache = null;

// Weathered Deccan basalt stone with authentic flagstone relief and chiseled mortar
export function getBasaltStoneTexture() {
  if (basaltTextureCache) return basaltTextureCache;

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Dark Deccan basalt base
  ctx.fillStyle = '#22201e';
  ctx.fillRect(0, 0, size, size);

  // Flagstone paving grid with organic stone block tones
  const tileSize = 64;
  for (let y = 0; y < size; y += tileSize) {
    const offsetX = (Math.floor(y / tileSize) % 2) * (tileSize / 2);
    for (let x = 0; x < size; x += tileSize) {
      // Natural stone color variation (weathered gray, warm charcoal, dark umber)
      const rVal = 44 + Math.floor(Math.random() * 28);
      const gVal = 41 + Math.floor(Math.random() * 24);
      const bVal = 38 + Math.floor(Math.random() * 22);

      // Gradient stone surface to simulate 3D chiseled slab curvature
      const grad = ctx.createLinearGradient(x + offsetX, y, x + offsetX + tileSize, y + tileSize);
      grad.addColorStop(0, `rgb(${rVal + 14}, ${gVal + 12}, ${bVal + 10})`);
      grad.addColorStop(0.5, `rgb(${rVal}, ${gVal}, ${bVal})`);
      grad.addColorStop(1, `rgb(${rVal - 14}, ${gVal - 12}, ${bVal - 10})`);

      ctx.fillStyle = grad;
      ctx.fillRect(x + offsetX + 2, y + 2, tileSize - 4, tileSize - 4);

      // Micro chiseled stone grain & mineral flecks
      for (let k = 0; k < 35; k++) {
        const nx = x + offsetX + 3 + Math.random() * (tileSize - 6);
        const ny = y + 3 + Math.random() * (tileSize - 6);
        const fleck = Math.random() > 0.55 ? (Math.random() > 0.5 ? 90 : 70) : 18;
        ctx.fillStyle = `rgba(${fleck}, ${fleck - 2}, ${fleck - 4}, ${0.18 + Math.random() * 0.2})`;
        ctx.fillRect(nx, ny, 1 + Math.random() * 1.5, 1 + Math.random() * 1.5);
      }

      // Edge wear along stone block perimeter
      ctx.strokeStyle = 'rgba(15, 14, 13, 0.6)';
      ctx.lineWidth = 1;
      ctx.strokeRect(x + offsetX + 2, y + 2, tileSize - 4, tileSize - 4);
    }
  }

  // Deep recessed mortar lines
  ctx.strokeStyle = '#121110';
  ctx.lineWidth = 3;
  for (let y = 0; y <= size; y += tileSize) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }
  for (let y = 0; y < size; y += tileSize) {
    const offsetX = (Math.floor(y / tileSize) % 2) * (tileSize / 2);
    for (let x = 0; x <= size + tileSize; x += tileSize) {
      ctx.beginPath();
      ctx.moveTo(x + offsetX, y);
      ctx.lineTo(x + offsetX, y + tileSize);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(10, 10);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  basaltTextureCache = texture;
  return texture;
}

// Authentic Indian terracotta clay tiles with kiln variation and ridge depth
export function getTerracottaRoofTexture() {
  if (roofTileTextureCache) return roofTileTextureCache;

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#83280c';
  ctx.fillRect(0, 0, size, size);

  // Horizontal overlapping terracotta tile courses
  const rowHeight = 32;
  const tileWidth = 48;

  for (let y = 0; y < size; y += rowHeight) {
    const rowOffset = (Math.floor(y / rowHeight) % 2) * (tileWidth / 2);

    for (let x = -tileWidth; x < size + tileWidth; x += tileWidth) {
      // Natural kiln-baked clay hue variation
      const r = 160 + Math.floor(Math.random() * 45);
      const g = 60 + Math.floor(Math.random() * 28);
      const b = 25 + Math.floor(Math.random() * 20);

      // Curved barrel-tile depth gradient
      const grad = ctx.createLinearGradient(x + rowOffset, y, x + rowOffset + tileWidth, y);
      grad.addColorStop(0, `rgb(${Math.max(0, r - 35)}, ${Math.max(0, g - 20)}, ${Math.max(0, b - 10)})`);
      grad.addColorStop(0.3, `rgb(${r + 15}, ${g + 12}, ${b + 8})`);
      grad.addColorStop(0.7, `rgb(${r}, ${g}, ${b})`);
      grad.addColorStop(1, `rgb(${Math.max(0, r - 45)}, ${Math.max(0, g - 25)}, ${Math.max(0, b - 12)})`);

      ctx.fillStyle = grad;
      ctx.fillRect(x + rowOffset + 1, y + 2, tileWidth - 2, rowHeight - 3);

      // Tile overlap cast shadow on top edge
      const shadowGrad = ctx.createLinearGradient(0, y, 0, y + 10);
      shadowGrad.addColorStop(0, 'rgba(30, 8, 4, 0.7)');
      shadowGrad.addColorStop(1, 'rgba(30, 8, 4, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.fillRect(x + rowOffset + 1, y + 2, tileWidth - 2, 10);

      // Bottom curved tile lip highlight
      ctx.fillStyle = 'rgba(255, 205, 175, 0.22)';
      ctx.fillRect(x + rowOffset + 2, y + rowHeight - 3, tileWidth - 4, 1.5);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(5, 5);
  texture.colorSpace = THREE.SRGBColorSpace;
  roofTileTextureCache = texture;
  return texture;
}

// Weathered traditional lime plaster with subtle aging and stucco grain
export function getWadaWallTexture() {
  if (wadaWallTextureCache) return wadaWallTextureCache;

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Warm sandstone / chuna base
  ctx.fillStyle = '#dfd5c4';
  ctx.fillRect(0, 0, size, size);

  // Micro plaster stucco texture
  for (let i = 0; i < 15000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const val = Math.random() > 0.5 ? 245 : 185;
    const a = 0.08 + Math.random() * 0.09;
    ctx.fillStyle = `rgba(${val}, ${val - 8}, ${val - 18}, ${a})`;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  // Subtle moisture and rainwater weathering stains
  for (let s = 0; s < 14; s++) {
    const sx = Math.random() * size;
    const sw = 10 + Math.random() * 30;
    const grad = ctx.createLinearGradient(0, 0, 0, size);
    grad.addColorStop(0, 'rgba(110, 95, 78, 0.0)');
    grad.addColorStop(0.7, 'rgba(110, 95, 78, 0.08)');
    grad.addColorStop(1, 'rgba(75, 62, 50, 0.22)');
    ctx.fillStyle = grad;
    ctx.fillRect(sx, 0, sw, size);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  texture.colorSpace = THREE.SRGBColorSpace;
  wadaWallTextureCache = texture;
  return texture;
}

// Vibrant striped Indian cloth canopy & awning fabric
export function getBazaarClothTexture() {
  if (bazaarClothTextureCache) return bazaarClothTextureCache;

  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const stripeWidth = 24;
  const colors = ['#ea580c', '#f59e0b', '#dc2626', '#fbbf24', '#0284c7', '#ffffff'];

  for (let x = 0; x < size; x += stripeWidth) {
    const colorIdx = Math.floor(x / stripeWidth) % colors.length;
    ctx.fillStyle = colors[colorIdx];
    ctx.fillRect(x, 0, stripeWidth, size);

    // Subtle fabric fold shadow
    const fold = ctx.createLinearGradient(x, 0, x + stripeWidth, 0);
    fold.addColorStop(0, 'rgba(0, 0, 0, 0.22)');
    fold.addColorStop(0.5, 'rgba(255, 255, 255, 0.15)');
    fold.addColorStop(1, 'rgba(0, 0, 0, 0.28)');
    ctx.fillStyle = fold;
    ctx.fillRect(x, 0, stripeWidth, size);
  }

  // Fine fabric weave texture
  for (let y = 0; y < size; y += 4) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.07)';
    ctx.fillRect(0, y, size, 1);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 4);
  texture.colorSpace = THREE.SRGBColorSpace;
  bazaarClothTextureCache = texture;
  return texture;
}

// High-fidelity water ripple normal map with multi-frequency waves
export function getWaterNormalTexture() {
  if (waterNormalTextureCache) return waterNormalTextureCache;

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(size, size);
  const data = imgData.data;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const u = x / size;
      const v = y / size;

      // Multi-octave wave interference pattern
      const w1 = Math.sin(u * Math.PI * 12 + v * Math.PI * 4);
      const w2 = Math.cos(v * Math.PI * 16 - u * Math.PI * 6);
      const w3 = Math.sin((u + v) * Math.PI * 24);
      const w4 = Math.cos((u - v) * Math.PI * 32) * 0.5;

      const nx = (w1 * 0.35 + w3 * 0.2 + w4 * 0.15);
      const ny = (w2 * 0.35 + w3 * 0.2 - w4 * 0.15);
      const nz = 1.0;
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz);

      // Encode normal vector (-1..1) to (0..255)
      data[idx] = Math.floor(((nx / len) * 0.5 + 0.5) * 255);
      data[idx + 1] = Math.floor(((ny / len) * 0.5 + 0.5) * 255);
      data[idx + 2] = Math.floor(((nz / len) * 0.5 + 0.5) * 255);
      data[idx + 3] = 255;
    }
  }

  ctx.putImageData(imgData, 0, 0);

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(12, 32);
  waterNormalTextureCache = texture;
  return texture;
}

// Chandrabhaga sacred river sand with wind-rippled dunes and moisture gradient
export function getRiverSandTexture() {
  if (sandTextureCache) return sandTextureCache;

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#caa373';
  ctx.fillRect(0, 0, size, size);

  // Soft wind dune ripples
  for (let y = 0; y < size; y += 18) {
    ctx.strokeStyle = 'rgba(155, 120, 78, 0.4)';
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x < size; x += 36) {
      ctx.quadraticCurveTo(x + 18, y + (Math.sin(x * 0.05) * 4), x + 36, y);
    }
    ctx.stroke();

    // Crest highlight
    ctx.strokeStyle = 'rgba(235, 210, 175, 0.3)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, y - 2);
    for (let x = 0; x < size; x += 36) {
      ctx.quadraticCurveTo(x + 18, y - 2 + (Math.sin(x * 0.05) * 4), x + 36, y - 2);
    }
    ctx.stroke();
  }

  // Fine river sand mineral grains
  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    const isLight = Math.random() > 0.45;
    ctx.fillStyle = isLight ? 'rgba(245, 228, 198, 0.45)' : 'rgba(125, 95, 60, 0.45)';
    ctx.fillRect(x, y, 1.2, 1.2);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 16);
  texture.colorSpace = THREE.SRGBColorSpace;
  sandTextureCache = texture;
  return texture;
}

// Weathered masonry stone blocks for river bridge piers and arches
export function getBridgeStoneTexture() {
  if (bridgeStoneTextureCache) return bridgeStoneTextureCache;

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#645d56';
  ctx.fillRect(0, 0, size, size);

  const bh = 32;
  const bw = 64;
  for (let y = 0; y < size; y += bh) {
    const off = (Math.floor(y / bh) % 2) * (bw / 2);
    for (let x = -bw; x < size + bw; x += bw) {
      const v = 85 + Math.floor(Math.random() * 30);
      ctx.fillStyle = `rgb(${v + 5}, ${v}, ${v - 5})`;
      ctx.fillRect(x + off + 1.5, y + 1.5, bw - 3, bh - 3);

      for (let k = 0; k < 12; k++) {
        const nx = x + off + 2 + Math.random() * (bw - 4);
        const ny = y + 2 + Math.random() * (bh - 4);
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(40, 36, 32, 0.3)' : 'rgba(140, 130, 120, 0.25)';
        ctx.fillRect(nx, ny, 1.5, 1.5);
      }
    }
  }

  ctx.strokeStyle = '#2b2723';
  ctx.lineWidth = 2.5;
  for (let y = 0; y <= size; y += bh) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(size, y);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 4);
  texture.colorSpace = THREE.SRGBColorSpace;
  bridgeStoneTextureCache = texture;
  return texture;
}

// Carved decorative basalt frieze for temple cornices and pillars
export function getTempleCarvingTexture() {
  if (templeCarvingTextureCache) return templeCarvingTextureCache;

  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#2d2a28';
  ctx.fillRect(0, 0, size, size);

  // Carved lotus petal band
  for (let x = 0; x < size; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x + 16, 20);
    ctx.quadraticCurveTo(x + 32, 60, x + 16, 100);
    ctx.quadraticCurveTo(x, 60, x + 16, 20);
    ctx.fillStyle = '#423d39';
    ctx.fill();
    ctx.strokeStyle = '#181614';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Petal center vein
    ctx.beginPath();
    ctx.moveTo(x + 16, 25);
    ctx.lineTo(x + 16, 95);
    ctx.strokeStyle = 'rgba(255, 220, 180, 0.2)';
    ctx.stroke();
  }

  // Geometric floral fretwork band
  ctx.strokeStyle = '#524b45';
  ctx.lineWidth = 3;
  for (let y = 140; y < size; y += 40) {
    ctx.beginPath();
    for (let x = 0; x <= size; x += 20) {
      const cy = y + ((x / 20) % 2 === 0 ? 0 : 18);
      if (x === 0) ctx.moveTo(x, cy);
      else ctx.lineTo(x, cy);
    }
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 2);
  texture.colorSpace = THREE.SRGBColorSpace;
  templeCarvingTextureCache = texture;
  return texture;
}
