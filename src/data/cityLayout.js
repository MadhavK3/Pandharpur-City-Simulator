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

// Realistic city buildings distributed across Pandharpur quarters
export const PROCEDURAL_BUILDINGS = [
  // 1. Mahadwar Bazaar & Temple Approach Corridor (traditional timber wadas & colorful shops)
  // North row of bazaar shops along Mahadwar Road (set back to z = 8, well clear of road at z = 20)
  { id: 'b_baz_1', x: -20, y: 2.8, z: 9.0, width: 5.8, height: 5.6, depth: 5.2, color: '#f59e0b', type: 'bazaar', label: 'Pedha & Prasad Stall' },
  { id: 'b_baz_2', x: -28, y: 2.8, z: 9.0, width: 5.8, height: 5.8, depth: 5.2, color: '#ea580c', type: 'bazaar', label: 'Tulsi Mala & Kumkum' },
  { id: 'b_baz_3', x: -36, y: 2.8, z: 9.0, width: 5.8, height: 5.6, depth: 5.2, color: '#d97706', type: 'bazaar', label: 'Brass Aarti Store' },
  // South row of bazaar shops along Mahadwar Road (set back to z = 31)
  { id: 'b_baz_7', x: -22, y: 2.8, z: 31.0, width: 5.8, height: 5.8, depth: 5.2, color: '#d97706', type: 'bazaar', label: 'Pandharpuri Bukka & Abir' },
  { id: 'b_baz_8', x: -30, y: 2.8, z: 31.0, width: 5.8, height: 5.8, depth: 5.2, color: '#c2410c', type: 'bazaar', label: 'Warkari Taalam & Chipli' },
  // East side shops along riverway approach (spaced cleanly with wide promenade)
  { id: 'b_baz_4', x: 42, y: 2.8, z: -18, width: 6.0, height: 5.6, depth: 5.2, color: '#b45309', type: 'bazaar', label: 'Warkari Pakhawaj Store' },
  { id: 'b_baz_5', x: 52, y: 2.8, z: -18, width: 6.0, height: 5.8, depth: 5.2, color: '#f59e0b', type: 'bazaar', label: 'Sant Charitra Book Stall' },
  { id: 'b_baz_6', x: 62, y: 2.8, z: -18, width: 6.0, height: 5.6, depth: 5.2, color: '#ea580c', type: 'bazaar', label: 'Gopichandan & Tilak' },
  { id: 'b_baz_9', x: 44, y: 2.8, z: 20, width: 6.0, height: 5.6, depth: 5.2, color: '#b45309', type: 'bazaar', label: 'Puja Samagri Bhandar' },
  { id: 'b_baz_10', x: 54, y: 2.8, z: 20, width: 6.0, height: 5.6, depth: 5.2, color: '#f59e0b', type: 'bazaar', label: 'Dhvaj & Pataka Kendra' },

  // 2. Navi Peth & Shivaji Chowk Wadas (Historic Maratha era 2 to 4-story timber wadas)
  { id: 'b_wada_1', x: -44, y: 4.4, z: -26, width: 9.5, height: 8.8, depth: 9.5, color: '#d4c5a9', type: 'wada', label: 'Peshwe Wada Heritage' },
  { id: 'b_wada_2', x: -36, y: 4.1, z: 40, width: 9.5, height: 8.2, depth: 9.5, color: '#8c857b', type: 'wada', label: 'Kulkarni Wada' },
  { id: 'b_wada_3', x: -86, y: 5.2, z: -32, width: 14, height: 10.5, depth: 13, color: '#e2dcce', type: 'civic', label: 'Pandharpur Nagar Parishad' },
  { id: 'b_wada_4', x: -84, y: 4.2, z: 22, width: 10, height: 8.5, depth: 9.5, color: '#c49272', type: 'wada', label: 'Joshi Wada' },
  { id: 'b_wada_5', x: -68, y: 4.1, z: -36, width: 9.5, height: 8.2, depth: 9.5, color: '#d6d3d1', type: 'wada', label: 'Bhave Wada' },
  { id: 'b_wada_6', x: -34, y: 3.9, z: -40, width: 9.5, height: 7.8, depth: 9.0, color: '#e8cfb0', type: 'wada', label: 'Badve Heritage Wada' },
  { id: 'b_wada_7', x: -70, y: 4.2, z: 54, width: 10, height: 8.4, depth: 9.5, color: '#b8a892', type: 'wada', label: 'Deshmukh Wada' },
  { id: 'b_wada_8', x: -84, y: 4.4, z: 54, width: 9.5, height: 8.8, depth: 9.5, color: '#d4c5a9', type: 'wada', label: 'Shinde Wada' },
  { id: 'b_wada_9', x: -50, y: 3.9, z: -50, width: 9.5, height: 7.8, depth: 9.5, color: '#c49272', type: 'wada', label: 'Mohite Wada' },

  // 3. Kasba Peth Historic Enclave (North of Mandir, safely clear of north prakara wall)
  { id: 'b_kasba_1', x: -18, y: 3.9, z: -42, width: 9.5, height: 7.8, depth: 8.5, color: '#e8cfb0', type: 'wada', label: 'Kasba Peth Wada North' },
  { id: 'b_kasba_2', x: -18, y: 4.0, z: -60, width: 9.5, height: 8.0, depth: 8.5, color: '#d4c5a9', type: 'wada', label: 'Guruswamiji Wada' },
  { id: 'b_kasba_3', x: 16, y: 3.9, z: -42, width: 9.5, height: 7.8, depth: 8.5, color: '#8c857b', type: 'wada', label: 'Sant Vani Bhavan' },
  { id: 'b_kasba_4', x: 16, y: 4.2, z: -60, width: 10, height: 8.4, depth: 9.0, color: '#d6d3d1', type: 'wada', label: 'Haripath Mandir Wada' },
  { id: 'b_kasba_5', x: -34, y: 4.0, z: -54, width: 9.5, height: 8.0, depth: 9.0, color: '#c49272', type: 'wada' },

  // 4. Bhakta Niwas & Pilgrim Dharamshala District (Spacious Southwest Quarter)
  { id: 'b_lodge_1', x: -64, y: 6.5, z: 74, width: 20, height: 13.0, depth: 16, color: '#e0e7ff', type: 'lodging', label: 'Shri Gajanan Maharaj Bhakta Niwas' },
  { id: 'b_lodge_2', x: -64, y: 5.2, z: 108, width: 17, height: 10.5, depth: 15, color: '#cbd5e1', type: 'lodging', label: 'Annachhatra Dining Hall' },
  { id: 'b_lodge_3', x: -38, y: 4.8, z: 92, width: 14, height: 9.5, depth: 14, color: '#f1f5f9', type: 'lodging', label: 'Warkari Bhavan Wing B' },
  { id: 'b_lodge_4', x: -88, y: 5.5, z: 82, width: 17, height: 11.0, depth: 15, color: '#e2e8f0', type: 'lodging', label: 'Solapur Zilla Yatri Niwas' },
  { id: 'b_lodge_5', x: -88, y: 5.0, z: 106, width: 17, height: 10.0, depth: 15, color: '#dbeafe', type: 'lodging', label: 'Sai Yatri Niwas' },
  { id: 'b_lodge_6', x: -38, y: 4.8, z: 114, width: 13, height: 9.5, depth: 13, color: '#e0e7ff', type: 'lodging', label: 'Sant Namdev Vishram Gruha' },

  // 5. North Pradakshina Mathas & Ashrams
  { id: 'b_math_1', x: 55, y: 4.5, z: -62, width: 12, height: 9.0, depth: 12, color: '#fef3c7', type: 'math', label: 'Chaitanya Math Ashram' },
  { id: 'b_math_2', x: -32, y: 4.2, z: -68, width: 13, height: 8.5, depth: 12, color: '#fed7aa', type: 'math', label: 'Tanpure Maharaj Ashram' },
  { id: 'b_math_3', x: 25, y: 4.0, z: -55, width: 10, height: 8.0, depth: 10, color: '#fde68a', type: 'math', label: 'Sant Eknath Prasadalaya' },
  { id: 'b_math_4', x: 75, y: 4.2, z: -85, width: 12, height: 8.5, depth: 12, color: '#fef9c3', type: 'math', label: 'Tukaram Bhavan Ashram' },
  { id: 'b_math_5', x: 45, y: 3.8, z: -90, width: 11, height: 7.6, depth: 11, color: '#fed7aa', type: 'math', label: 'Jnaneshwar Math' },
  { id: 'b_math_6', x: 15, y: 3.8, z: -80, width: 10, height: 7.6, depth: 10, color: '#fef3c7', type: 'math' },

  // 6. ISKCON Temple Campus & Riverside Goshala
  { id: 'b_iskcon_1', x: 95, y: 8.0, z: -120, width: 22, height: 16.0, depth: 24, color: '#ffffff', type: 'temple', label: 'ISKCON Sanctum' },
  { id: 'b_iskcon_goshala', x: 112, y: 3.8, z: -145, width: 18, height: 7.6, depth: 15, color: '#d1fae5', type: 'civic', label: 'Goshala Sanctuary' },
  { id: 'b_iskcon_guest', x: 75, y: 5.2, z: -130, width: 15, height: 10.5, depth: 15, color: '#f8fafc', type: 'lodging', label: 'ISKCON Atithi Bhavan' },

  // 7. Western Station Road & Transit Quarter
  { id: 'b_rail_station', x: -170, y: 6.0, z: 65, width: 28, height: 12.0, depth: 17, color: '#cbd5e1', type: 'transport', label: 'Pandharpur Station Concourse' },
  { id: 'b_rail_shed', x: -170, y: 4.2, z: 92, width: 38, height: 8.4, depth: 12, color: '#94a3b8', type: 'transport', label: 'Platform Shelter' },
  { id: 'b_bus_depot', x: -105, y: 5.2, z: 50, width: 24, height: 10.5, depth: 18, color: '#94a3b8', type: 'transport', label: 'MSRTC Bus Depot Platform' },
  { id: 'b_bus_hotel', x: -105, y: 5.0, z: 24, width: 15, height: 10.0, depth: 13, color: '#e2e8f0', type: 'lodging', label: 'Yatri Niwas Station Rd' },
  { id: 'b_rail_shops_1', x: -145, y: 3.2, z: 52, width: 11, height: 6.5, depth: 9.5, color: '#f59e0b', type: 'bazaar', label: 'Station Tea & Bhojnalay' },
  { id: 'b_rail_shops_2', x: -145, y: 3.2, z: 28, width: 11, height: 6.5, depth: 9.5, color: '#d97706', type: 'bazaar', label: 'Travel Accessories' },

  // 8. Savarkar Chowk & West Arterial Commercial
  { id: 'b_sav_1', x: -120, y: 4.5, z: -10, width: 11, height: 9.0, depth: 11, color: '#d4c5a9', type: 'wada', label: 'Savarkar Chowk Trade Centre' },
  { id: 'b_sav_2', x: -120, y: 4.2, z: -50, width: 12, height: 8.5, depth: 11, color: '#8c857b', type: 'wada', label: 'West Grain Market' },
  { id: 'b_sav_3', x: -142, y: 3.8, z: -25, width: 10, height: 7.6, depth: 10, color: '#c49272', type: 'wada' },

  // 9. Eastern Riverfront Promenade Wadas (Facing Chandrabhaga with open central river vista at z=0)
  { id: 'b_riv_1', x: 62, y: 4.5, z: -20, width: 10, height: 9.0, depth: 10, color: '#e8cfb0', type: 'wada', label: 'Ghatfront Wada North' },
  { id: 'b_riv_2', x: 62, y: 4.0, z: 18, width: 10, height: 8.0, depth: 10, color: '#d4c5a9', type: 'wada', label: 'Ghatfront Wada South' },
  { id: 'b_riv_3', x: 62, y: 4.0, z: 44, width: 10, height: 8.0, depth: 10, color: '#c49272', type: 'wada', label: 'Udhav Ghat Wada' },
  { id: 'b_riv_4', x: 62, y: 4.5, z: -44, width: 10, height: 9.0, depth: 10, color: '#8c857b', type: 'wada', label: 'Kumbhar Ghat Wada' },
  { id: 'b_riv_5', x: 62, y: 4.2, z: -68, width: 10, height: 8.5, depth: 10, color: '#d6d3d1', type: 'wada', label: 'Vipra Ghat Wada' },
  { id: 'b_riv_6', x: 62, y: 3.8, z: 70, width: 10, height: 7.6, depth: 10, color: '#e8cfb0', type: 'wada' },

  // 10. South Pradakshina Path Enclave
  { id: 'b_sth_1', x: 42, y: 4.2, z: 38, width: 10, height: 8.5, depth: 10, color: '#d4c5a9', type: 'wada', label: 'South Pradakshina Wada' },
  { id: 'b_sth_2', x: 42, y: 4.0, z: 78, width: 10, height: 8.0, depth: 10, color: '#c49272', type: 'wada' },
  { id: 'b_sth_3', x: 18, y: 3.8, z: 65, width: 9.5, height: 7.6, depth: 9.5, color: '#8c857b', type: 'wada' },
  { id: 'b_sth_4', x: -12, y: 4.0, z: 55, width: 10, height: 8.0, depth: 10, color: '#e8cfb0', type: 'wada', label: 'Chokhamela Marg Wada' },
  { id: 'b_sth_5', x: -12, y: 3.8, z: 78, width: 9.5, height: 7.6, depth: 9.5, color: '#d6d3d1', type: 'wada' },
  { id: 'b_sth_6', x: 45, y: 4.2, z: 120, width: 13, height: 8.5, depth: 12, color: '#fed7aa', type: 'math', label: 'Gopalpur Road Math' }
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
