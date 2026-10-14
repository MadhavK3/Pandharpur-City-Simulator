import * as THREE from 'three';

// Procedural Canvas-based Texture Generator
// Creates realistic, lightweight PBR maps without requiring multi-megabyte external image downloads

let basaltTextureCache = null;
let roofTileTextureCache = null;
let waterNormalTextureCache = null;
let sandTextureCache = null;

export function getBasaltStoneTexture() {
  if (basaltTextureCache) return basaltTextureCache;

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // Dark Deccan basalt stone base
  ctx.fillStyle = '#2d2a29';
  ctx.fillRect(0, 0, size, size);

  // Flagstone paving grid with randomized block tones
  const tileSize = 64;
  for (let y = 0; y < size; y += tileSize) {
    const offsetX = (Math.floor(y / tileSize) % 2) * (tileSize / 2);
    for (let x = 0; x < size; x += tileSize) {
      const shade = 35 + Math.floor(Math.random() * 25);
      ctx.fillStyle = `rgb(${shade}, ${shade - 2}, ${shade - 4})`;
      ctx.fillRect(x + offsetX + 2, y + 2, tileSize - 4, tileSize - 4);

      // Subtle surface stone speckle noise
      for (let k = 0; k < 18; k++) {
        const nx = x + offsetX + Math.random() * (tileSize - 4);
        const ny = y + Math.random() * (tileSize - 4);
        const speckle = Math.random() > 0.5 ? 20 : 65;
        ctx.fillStyle = `rgba(${speckle}, ${speckle}, ${speckle}, 0.25)`;
        ctx.fillRect(nx, ny, 2, 2);
      }
    }
  }

  // Stone joint mortar lines
  ctx.strokeStyle = '#181615';
  ctx.lineWidth = 2.5;
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
  texture.repeat.set(12, 12);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = true;
  basaltTextureCache = texture;
  return texture;
}

export function getTerracottaRoofTexture() {
  if (roofTileTextureCache) return roofTileTextureCache;

  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#9a3412';
  ctx.fillRect(0, 0, size, size);

  // Horizontal overlapping terracotta tiles
  const rowHeight = 32;
  for (let y = 0; y < size; y += rowHeight) {
    const red = 150 + Math.floor(Math.random() * 30);
    const green = 50 + Math.floor(Math.random() * 20);
    const blue = 15 + Math.floor(Math.random() * 15);
    ctx.fillStyle = `rgb(${red}, ${green}, ${blue})`;
    ctx.fillRect(0, y + 2, size, rowHeight - 4);

    // Curved shadow at underside of each tile row
    const gradient = ctx.createLinearGradient(0, y, 0, y + rowHeight);
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0.45)');
    gradient.addColorStop(0.3, 'rgba(0, 0, 0, 0.05)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0.12)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, y, size, rowHeight);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.colorSpace = THREE.SRGBColorSpace;
  roofTileTextureCache = texture;
  return texture;
}

export function getWaterNormalTexture() {
  if (waterNormalTextureCache) return waterNormalTextureCache;

  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  const imgData = ctx.createImageData(size, size);
  const data = imgData.data;

  // Generate normal map vectors encoded in RGB: R = X, G = Y, B = Z
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const angle1 = (x / size) * Math.PI * 8;
      const angle2 = (y / size) * Math.PI * 8;
      const wave = Math.sin(angle1) * Math.cos(angle2) * 0.5 + Math.sin(angle1 * 2 + angle2) * 0.25;

      const nx = Math.cos(angle1) * 0.4;
      const ny = Math.sin(angle2) * 0.4;
      const nz = 1.0;
      const len = Math.sqrt(nx * nx + ny * ny + nz * nz);

      // Encode normalized vector (-1..1) to (0..255)
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
  texture.repeat.set(8, 24);
  waterNormalTextureCache = texture;
  return texture;
}

export function getRiverSandTexture() {
  if (sandTextureCache) return sandTextureCache;

  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#d4b483';
  ctx.fillRect(0, 0, size, size);

  // Sand dune ripples
  for (let y = 0; y < size; y += 16) {
    ctx.strokeStyle = 'rgba(168, 134, 91, 0.35)';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x < size; x += 32) {
      ctx.quadraticCurveTo(x + 16, y + (Math.random() * 6 - 3), x + 32, y);
    }
    ctx.stroke();
  }

  // Fine sand grains
  for (let i = 0; i < 1200; i++) {
    const x = Math.random() * size;
    const y = Math.random() * size;
    ctx.fillStyle = Math.random() > 0.5 ? 'rgba(235, 214, 178, 0.4)' : 'rgba(145, 114, 75, 0.4)';
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(6, 12);
  texture.colorSpace = THREE.SRGBColorSpace;
  sandTextureCache = texture;
  return texture;
}

