/**
 * Procedural City Layout, River Geography & Urban Landscape
 * for Pandharpur Darshan 3D
 * Scaled realistic city proportions: ~450m East-West, ~300m North-South
 */

// Grand Chandrabhaga River crescent spline (East side of Pandharpur: X ≈ 110 to 150)
export const RIVER_SPLINE_POINTS = [
  { x: 105, y: -1.2, z: -180, width: 90 },
  { x: 115, y: -1.2, z: -120, width: 85 },
  { x: 120, y: -1.2, z: -60,  width: 80 },
  { x: 125, y: -1.2, z: 0,    width: 85 }, // Pundalik temple sand island is at x=115, z=5
  { x: 122, y: -1.2, z: 60,   width: 80 },
  { x: 115, y: -1.2, z: 120,  width: 85 },
  { x: 105, y: -1.2, z: 180,  width: 95 }
];

// Sacred Sandbank (Vāḷvaṇṭ) dunes and islands
export const SANDBANK_ISLANDS = [
  { id: 'pundalik_island', x: 115, y: -0.6, z: 5, radiusX: 22, radiusZ: 32, label: 'Pundalik Holy Island' },
  { id: 'sandbank_north', x: 102, y: -0.7, z: -55, radiusX: 18, radiusZ: 28, label: 'Chandrabhaga Sands North' },
  { id: 'sandbank_south', x: 100, y: -0.7, z: 65, radiusX: 20, radiusZ: 30, label: 'Chandrabhaga Sands South' }
];

// River Ghat stone flight of steps descending into the water
export const GHAT_STEPS = [
  { id: 'ghat_main', x: 95, y: -1.0, z: 0, lengthZ: 48, stepsCount: 8, widthX: 12, name: 'Chandrabhaga Mahaghat' },
  { id: 'ghat_kumbhar', x: 98, y: -1.0, z: -35, lengthZ: 32, stepsCount: 7, widthX: 10, name: 'Kumbhar Ghat' },
  { id: 'ghat_vipra', x: 100, y: -1.0, z: -70, lengthZ: 36, stepsCount: 7, widthX: 10, name: 'Vipra Datta Ghat' },
  { id: 'ghat_amrit', x: 90, y: -1.0, z: 45, lengthZ: 32, stepsCount: 7, widthX: 10, name: 'Amriteshwar Ghat' },
  { id: 'ghat_udhav', x: 92, y: -1.0, z: 80, lengthZ: 36, stepsCount: 7, widthX: 10, name: 'Udhav Ghat' }
];

// Realistic city buildings distributed across Pandharpur's quarters
export const PROCEDURAL_BUILDINGS = [
  // 1. Mahadwar Bazaar & Temple Periphery (traditional low-rise wooden wadas & colorful shops)
  { id: 'b_baz_1', x: -14, y: 3.0, z: 10, width: 8, height: 6, depth: 8, color: '#f59e0b', type: 'bazaar', label: 'Pedha & Prasad Stall' },
  { id: 'b_baz_2', x: -14, y: 3.0, z: 22, width: 8, height: 6, depth: 8, color: '#ea580c', type: 'bazaar', label: 'Tulsi Mala & Kumkum' },
  { id: 'b_baz_3', x: -14, y: 3.0, z: 34, width: 8, height: 6, depth: 8, color: '#d97706', type: 'bazaar', label: 'Brass Aarti Store' },
  { id: 'b_baz_4', x: 10, y: 3.0, z: 10, width: 8, height: 6, depth: 8, color: '#b45309', type: 'bazaar', label: 'Warkari Pakhawaj Store' },
  { id: 'b_baz_5', x: 10, y: 3.0, z: 22, width: 8, height: 6, depth: 8, color: '#f59e0b', type: 'bazaar', label: 'Sant Charitra Book Stall' },
  { id: 'b_baz_6', x: 10, y: 3.0, z: 34, width: 8, height: 6, depth: 8, color: '#ea580c', type: 'bazaar', label: 'Gopichandan & Tilak' },

  // 2. Navi Peth & Shivaji Chowk Wadas (Historic Peshwa era 3-story timber wadas)
  { id: 'b_wada_1', x: -35, y: 4.5, z: 10, width: 14, height: 9, depth: 16, color: '#78716c', type: 'wada', label: 'Peshwe Wada Heritage' },
  { id: 'b_wada_2', x: -35, y: 4.0, z: 32, width: 12, height: 8, depth: 14, color: '#a8a29e', type: 'wada', label: 'Kulkarni Wada' },
  { id: 'b_wada_3', x: -70, y: 5.5, z: -5, width: 18, height: 11, depth: 16, color: '#71717a', type: 'civic', label: 'Pandharpur Nagar Parishad' },
  { id: 'b_wada_4', x: -70, y: 4.5, z: 15, width: 14, height: 9, depth: 14, color: '#e2e8f0', type: 'residential' },
  { id: 'b_wada_5', x: -45, y: 4.0, z: -25, width: 12, height: 8, depth: 14, color: '#d6d3d1', type: 'wada' },
  { id: 'b_wada_6', x: -30, y: 3.8, z: -15, width: 10, height: 7.5, depth: 12, color: '#a8a29e', type: 'wada' },

  // 3. Bhakta Niwas & Pilgrim Dharamshala Colony (large multi-wing hostels)
  { id: 'b_lodge_1', x: -60, y: 7.0, z: 80, width: 26, height: 14, depth: 22, color: '#e0e7ff', type: 'lodging', label: 'Gajanan Maharaj Bhakta Niwas Main Wing' },
  { id: 'b_lodge_2', x: -60, y: 5.5, z: 106, width: 22, height: 11, depth: 18, color: '#cbd5e1', type: 'lodging', label: 'Annachhatra Dining Hall' },
  { id: 'b_lodge_3', x: -35, y: 5.0, z: 90, width: 18, height: 10, depth: 18, color: '#f1f5f9', type: 'lodging', label: 'Dharamshala Wing B' },
  { id: 'b_lodge_4', x: -85, y: 6.0, z: 85, width: 20, height: 12, depth: 20, color: '#e2e8f0', type: 'lodging', label: 'Solapur Zilla Yatri Niwas' },

  // 4. North Pradakshina Mathas & Ashrams
  { id: 'b_math_1', x: 55, y: 4.5, z: -65, width: 16, height: 9, depth: 18, color: '#fef3c7', type: 'math', label: 'Chaitanya Math Ashram' },
  { id: 'b_math_2', x: -30, y: 4.5, z: -65, width: 18, height: 9, depth: 16, color: '#fed7aa', type: 'math', label: 'Tanpure Maharaj Ashram' },
  { id: 'b_math_3', x: 25, y: 4.0, z: -55, width: 14, height: 8, depth: 14, color: '#fde68a', type: 'math', label: 'Sant Eknath Prasadalaya' },
  { id: 'b_math_4', x: 75, y: 4.0, z: -85, width: 14, height: 8, depth: 16, color: '#fef9c3', type: 'math', label: 'Tukaram Bhavan Ashram' },

  // 5. ISKCON Temple Campus
  { id: 'b_iskcon_1', x: 95, y: 8.0, z: -120, width: 24, height: 16, depth: 28, color: '#ffffff', type: 'temple', label: 'ISKCON Sanctum' },
  { id: 'b_iskcon_goshala', x: 110, y: 4.0, z: -140, width: 20, height: 8, depth: 18, color: '#d1fae5', type: 'civic', label: 'Goshala Cattle Sanctuary' },

  // 6. Railway & Bus Terminal Buildings
  { id: 'b_rail_station', x: -170, y: 6.5, z: 65, width: 34, height: 13, depth: 20, color: '#cbd5e1', type: 'transport', label: 'Pandharpur Station Concourse' },
  { id: 'b_rail_shed', x: -170, y: 4.5, z: 90, width: 45, height: 9, depth: 14, color: '#94a3b8', type: 'transport', label: 'Platform 1 & 2 Shelter' },
  { id: 'b_bus_depot', x: -100, y: 5.5, z: 50, width: 28, height: 11, depth: 22, color: '#94a3b8', type: 'transport', label: 'MSRTC Bus Depot Platform' },

  // 7. Eastern Riverfront Promenade Buildings
  { id: 'b_riv_1', x: 75, y: 4.5, z: -10, width: 14, height: 9, depth: 16, color: '#e2e8f0', type: 'wada' },
  { id: 'b_riv_2', x: 75, y: 4.0, z: 15, width: 12, height: 8, depth: 14, color: '#cbd5e1', type: 'wada' },
  { id: 'b_riv_3', x: 70, y: 4.0, z: 40, width: 14, height: 8, depth: 14, color: '#d6d3d1', type: 'wada' },
  { id: 'b_riv_4', x: 70, y: 4.5, z: -35, width: 12, height: 9, depth: 14, color: '#a8a29e', type: 'wada' }
];

// Holy flags (Bhagva Dhwaja) positioned at major sacred nodes
export const SACRED_FLAGS = [
  { id: 'f_vitthal', x: 0, y: 28.0, z: -10, color: '#f97316', label: 'Vitthal Shikhara Dhwaja' },
  { id: 'f_pundalik', x: 115, y: 16.0, z: 5, color: '#f97316', label: 'Pundalik Shikhara Dhwaja' },
  { id: 'f_namdev', x: -4, y: 8.5, z: 15, color: '#ea580c', label: 'Namdev Payari Dhwaja' },
  { id: 'f_mahadwar', x: -20, y: 12.0, z: 20, color: '#f59e0b', label: 'Mahadwar Arch Dhwaja' },
  { id: 'f_iskcon', x: 95, y: 22.0, z: -120, color: '#f97316', label: 'ISKCON Shikhara Dhwaja' }
];

// Streetlights & Diya Pillars (Deepamalas)
export const DEEPAMALAS = [
  { id: 'deep_temple_1', x: -8, y: 0.2, z: 22, height: 9 },
  { id: 'deep_temple_2', x: 8, y: 0.2, z: 22, height: 9 },
  { id: 'deep_ghat_1', x: 92, y: -0.8, z: 10, height: 8 },
  { id: 'deep_ghat_2', x: 92, y: -0.8, z: -10, height: 8 },
  { id: 'deep_ghat_3', x: 96, y: -0.8, z: -45, height: 7 },
  { id: 'deep_ghat_4', x: 90, y: -0.8, z: 55, height: 7 }
];

// Realistic Warkari Pilgrim Tents on the Chandrabhaga Sandbank
export const PILGRIM_TENTS = [
  { id: 't_1', x: 105, y: -0.6, z: -20, color: '#ea580c' },
  { id: 't_2', x: 108, y: -0.6, z: -12, color: '#f59e0b' },
  { id: 't_3', x: 103, y: -0.6, z: 25, color: '#10b981' },
  { id: 't_4', x: 106, y: -0.6, z: 32, color: '#3b82f6' },
  { id: 't_5', x: 110, y: -0.6, z: -40, color: '#f97316' },
  { id: 't_6', x: 104, y: -0.6, z: 50, color: '#e11d48' }
];

// River Boats floating in Chandrabhaga
export const RIVER_BOATS = [
  { id: 'boat_1', x: 128, y: -1.15, z: -15, rotation: 0.2 },
  { id: 'boat_2', x: 132, y: -1.15, z: 20, rotation: -0.3 },
  { id: 'boat_3', x: 122, y: -1.15, z: 40, rotation: 0.1 }
];
