/**
 * Authentic City Layout, Chandrabhaga River Geography & Urban Landscape
 * for Pandharpur Darshan 3D
 * Modeled after historic Pandharpur pilgrim quarters and photographic reference
 */

// Grand Chandrabhaga River crescent spline (East side of Pandharpur: X ≈ 105 to 145)
export const RIVER_SPLINE_POINTS = [
  { x: 105, y: -1.2, z: -190, width: 95 },
  { x: 115, y: -1.2, z: -120, width: 85 },
  { x: 120, y: -1.2, z: -60,  width: 80 },
  { x: 125, y: -1.2, z: 0,    width: 85 }, // Pundalik temple sand island is at x=115, z=5
  { x: 122, y: -1.2, z: 60,   width: 80 },
  { x: 115, y: -1.2, z: 120,  width: 85 },
  { x: 105, y: -1.2, z: 190,  width: 95 }
];

// Sacred Sandbank (Vāḷvaṇṭ) dunes and islands in Chandrabhaga
export const SANDBANK_ISLANDS = [
  { id: 'pundalik_island', x: 115, y: -0.6, z: 5, radiusX: 24, radiusZ: 34, label: 'Pundalik Holy Island' },
  { id: 'sandbank_north', x: 104, y: -0.7, z: -55, radiusX: 20, radiusZ: 30, label: 'Chandrabhaga Sands North' },
  { id: 'sandbank_south', x: 102, y: -0.7, z: 65, radiusX: 22, radiusZ: 32, label: 'Chandrabhaga Sands South' },
  { id: 'sandbank_mid_far', x: 140, y: -0.8, z: -10, radiusX: 16, radiusZ: 26, label: 'Central River Shoal' }
];

// River Ghat stone flight of steps descending into the water
export const GHAT_STEPS = [
  { id: 'ghat_main', x: 95, y: -1.0, z: 0, lengthZ: 52, stepsCount: 9, widthX: 13, name: 'Chandrabhaga Mahaghat' },
  { id: 'ghat_kumbhar', x: 98, y: -1.0, z: -38, lengthZ: 34, stepsCount: 8, widthX: 11, name: 'Kumbhar Ghat' },
  { id: 'ghat_vipra', x: 100, y: -1.0, z: -74, lengthZ: 38, stepsCount: 8, widthX: 11, name: 'Vipra Datta Ghat' },
  { id: 'ghat_amrit', x: 90, y: -1.0, z: 46, lengthZ: 34, stepsCount: 8, widthX: 11, name: 'Amriteshwar Ghat' },
  { id: 'ghat_udhav', x: 92, y: -1.0, z: 82, lengthZ: 38, stepsCount: 8, widthX: 11, name: 'Udhav Ghat' }
];

// Historic multi-span arched stone bridges crossing Chandrabhaga
export const RIVER_BRIDGES = [
  {
    id: 'north_bridge',
    z: -155,
    startX: 84,
    endX: 225,
    height: 4.8,
    widthZ: 8.5,
    piersCount: 7,
    name: 'Chandrabhaga North Causeway'
  },
  {
    id: 'south_bridge',
    z: 155,
    startX: 84,
    endX: 225,
    height: 4.8,
    widthZ: 8.5,
    piersCount: 7,
    name: 'Gopalpur Road River Bridge'
  }
];

// Authentic procedural city buildings modeled after reference images
// Dense historic urban fabric with setbacks respecting road corridors and temple precinct
export const PROCEDURAL_BUILDINGS = [
  // =========================================================================
  // 1. MAHADWAR BAZAAR CORRIDOR (Continuous vibrant shopfronts & wadas)
  // Road centerline is Z=20. North row sits at Z=9.0, South row sits at Z=31.0
  // =========================================================================
  // North row (Mahadwar Road north facade)
  { id: 'b_baz_n1', x: -16, y: 3.0, z: 9.0, width: 5.5, height: 6.2, depth: 5.2, color: '#d4a373', type: 'bazaar', label: 'Pedha & Prasad Stall' },
  { id: 'b_baz_n2', x: -22, y: 3.2, z: 9.0, width: 5.5, height: 6.8, depth: 5.2, color: '#dfd5c4', type: 'bazaar', label: 'Tulsi Mala & Kumkum' },
  { id: 'b_baz_n3', x: -28, y: 3.1, z: 9.0, width: 5.5, height: 6.4, depth: 5.2, color: '#c26d52', type: 'bazaar', label: 'Brass Aarti Store' },
  { id: 'b_baz_n4', x: -34, y: 3.3, z: 9.0, width: 5.5, height: 7.0, depth: 5.2, color: '#cda87a', type: 'bazaar', label: 'Sant Vangmay Pustak' },
  { id: 'b_baz_n5', x: -40, y: 3.0, z: 9.0, width: 5.5, height: 6.2, depth: 5.2, color: '#e8e4dc', type: 'bazaar', label: 'Veena & Chipli Shop' },
  { id: 'b_baz_n6', x: -46, y: 3.2, z: 9.0, width: 5.5, height: 6.6, depth: 5.2, color: '#d99b82', type: 'bazaar', label: 'Warkari Pakhawaj' },
  // North tier-2 wadas behind north bazaar shops (Z = -2 to -6)
  { id: 'b_w_nb1', x: -16, y: 4.2, z: -2.5, width: 7.8, height: 8.6, depth: 7.5, color: '#d8caa8', type: 'wada_hip' },
  { id: 'b_w_nb2', x: -25, y: 4.5, z: -2.5, width: 8.5, height: 9.2, depth: 7.5, color: '#cda87a', type: 'wada_terrace' },
  { id: 'b_w_nb3', x: -35, y: 4.3, z: -2.5, width: 8.8, height: 8.8, depth: 7.5, color: '#dfd5c4', type: 'wada_hip' },
  { id: 'b_w_nb4', x: -45, y: 4.6, z: -2.5, width: 8.8, height: 9.5, depth: 7.5, color: '#d99b82', type: 'wada_terrace' },

  // South row (Mahadwar Road south facade)
  { id: 'b_baz_s1', x: -16, y: 3.0, z: 31.0, width: 5.5, height: 6.2, depth: 5.2, color: '#cda87a', type: 'bazaar', label: 'Pandharpuri Bukka' },
  { id: 'b_baz_s2', x: -22, y: 3.2, z: 31.0, width: 5.5, height: 6.8, depth: 5.2, color: '#d4a373', type: 'bazaar', label: 'Warkari Taalam' },
  { id: 'b_baz_s3', x: -28, y: 3.1, z: 31.0, width: 5.5, height: 6.4, depth: 5.2, color: '#dfd5c4', type: 'bazaar', label: 'Alandi Prashad Bhandar' },
  { id: 'b_baz_s4', x: -34, y: 3.3, z: 31.0, width: 5.5, height: 7.2, depth: 5.2, color: '#e8e4dc', type: 'bazaar', label: 'Copper Kalash Kendra' },
  { id: 'b_baz_s5', x: -40, y: 3.0, z: 31.0, width: 5.5, height: 6.2, depth: 5.2, color: '#c26d52', type: 'bazaar', label: 'Sant Namdev Mala' },
  { id: 'b_baz_s6', x: -46, y: 3.2, z: 31.0, width: 5.5, height: 6.6, depth: 5.2, color: '#d8caa8', type: 'bazaar', label: 'Bhakti Sangeet Shop' },
  // South tier-2 wadas behind south bazaar shops (Z = 42 to 46)
  { id: 'b_w_sb1', x: -16, y: 4.4, z: 42.5, width: 8.0, height: 9.0, depth: 7.5, color: '#d4a373', type: 'wada_terrace' },
  { id: 'b_w_sb2', x: -25, y: 4.6, z: 42.5, width: 8.5, height: 9.4, depth: 7.5, color: '#e8e4dc', type: 'wada_hip' },
  { id: 'b_w_sb3', x: -35, y: 4.2, z: 42.5, width: 8.8, height: 8.6, depth: 7.5, color: '#cda87a', type: 'wada_terrace' },
  { id: 'b_w_sb4', x: -45, y: 4.5, z: 42.5, width: 8.8, height: 9.2, depth: 7.5, color: '#c26d52', type: 'wada_hip' },

  // =========================================================================
  // 2. NAVI PETH & SHIVAJI CHOWK QUARTER (Historic 3 to 4-story timber wadas)
  // =========================================================================
  { id: 'b_wada_1', x: -42, y: 4.6, z: -25, width: 9.5, height: 9.4, depth: 9.5, color: '#d4caa8', type: 'wada_hip', label: 'Peshwe Wada Heritage' },
  { id: 'b_wada_1b', x: -54, y: 4.4, z: -25, width: 9.0, height: 9.0, depth: 9.5, color: '#cda87a', type: 'wada_terrace' },
  { id: 'b_wada_1c', x: -66, y: 4.7, z: -25, width: 9.5, height: 9.6, depth: 9.5, color: '#dfd5c4', type: 'wada_hip' },
  { id: 'b_wada_2', x: -35, y: 4.3, z: 56, width: 9.5, height: 8.8, depth: 9.5, color: '#9c9488', type: 'wada_hip', label: 'Kulkarni Wada' },
  { id: 'b_wada_2b', x: -46, y: 4.5, z: 56, width: 9.0, height: 9.2, depth: 9.5, color: '#d4a373', type: 'wada_terrace' },
  { id: 'b_wada_3', x: -88, y: 5.4, z: -32, width: 14.5, height: 11.0, depth: 13.5, color: '#e8e4dc', type: 'civic', label: 'Pandharpur Nagar Parishad' },
  { id: 'b_wada_4', x: -84, y: 4.4, z: 24, width: 10.0, height: 9.0, depth: 9.5, color: '#c26d52', type: 'wada_hip', label: 'Joshi Wada' },
  { id: 'b_wada_4b', x: -96, y: 4.2, z: 24, width: 9.5, height: 8.6, depth: 9.5, color: '#d8caa8', type: 'wada_terrace' },
  { id: 'b_wada_5', x: -68, y: 4.3, z: -40, width: 9.5, height: 8.8, depth: 9.5, color: '#ded9ce', type: 'wada_hip', label: 'Bhave Wada' },
  { id: 'b_wada_5b', x: -80, y: 4.6, z: -48, width: 9.5, height: 9.4, depth: 9.5, color: '#cda87a', type: 'wada_terrace' },
  { id: 'b_wada_6', x: -34, y: 4.1, z: -40, width: 9.5, height: 8.4, depth: 9.0, color: '#d4a373', type: 'wada_hip', label: 'Badve Heritage Wada' },
  { id: 'b_wada_7', x: -70, y: 4.4, z: 58, width: 10.0, height: 9.0, depth: 9.5, color: '#b8a892', type: 'wada_terrace', label: 'Deshmukh Wada' },
  { id: 'b_wada_8', x: -84, y: 4.6, z: 58, width: 9.5, height: 9.4, depth: 9.5, color: '#d8caa8', type: 'wada_hip', label: 'Shinde Wada' },
  { id: 'b_wada_8b', x: -96, y: 4.3, z: 58, width: 9.5, height: 8.8, depth: 9.5, color: '#dfd5c4', type: 'wada_terrace' },
  { id: 'b_wada_9', x: -50, y: 4.1, z: -52, width: 9.5, height: 8.4, depth: 9.5, color: '#c26d52', type: 'wada_hip', label: 'Mohite Wada' },

  // =========================================================================
  // 3. KASBA PETH HISTORIC ENCLAVE (North of Mandir, safe of north wall)
  // =========================================================================
  { id: 'b_kasba_1', x: -18, y: 4.1, z: -42, width: 9.5, height: 8.4, depth: 8.5, color: '#d4a373', type: 'wada_hip', label: 'Kasba Peth Wada North' },
  { id: 'b_kasba_2', x: -18, y: 4.2, z: -60, width: 9.5, height: 8.6, depth: 8.5, color: '#dfd5c4', type: 'wada_terrace', label: 'Guruswamiji Wada' },
  { id: 'b_kasba_2b', x: -18, y: 4.0, z: -76, width: 9.5, height: 8.2, depth: 8.5, color: '#cda87a', type: 'wada_hip' },
  { id: 'b_kasba_3', x: 16, y: 4.1, z: -42, width: 9.5, height: 8.4, depth: 8.5, color: '#9c9488', type: 'wada_terrace', label: 'Sant Vani Bhavan' },
  { id: 'b_kasba_4', x: 16, y: 4.4, z: -60, width: 10.0, height: 9.0, depth: 9.0, color: '#e8e4dc', type: 'wada_hip', label: 'Haripath Mandir Wada' },
  { id: 'b_kasba_4b', x: 16, y: 4.1, z: -76, width: 9.5, height: 8.4, depth: 8.5, color: '#d8caa8', type: 'wada_terrace' },
  { id: 'b_kasba_5', x: -34, y: 4.2, z: -55, width: 9.5, height: 8.6, depth: 9.0, color: '#c26d52', type: 'wada_hip' },
  { id: 'b_kasba_6', x: 0, y: 4.3, z: -60, width: 9.5, height: 8.8, depth: 8.5, color: '#d4caa8', type: 'wada_terrace' },
  { id: 'b_kasba_7', x: 0, y: 4.1, z: -76, width: 9.5, height: 8.4, depth: 8.5, color: '#dfd5c4', type: 'wada_hip' },

  // =========================================================================
  // 4. BHAKTA NIWAS & PILGRIM DHARAMSHALA DISTRICT (Southwest Quarter)
  // =========================================================================
  { id: 'b_lodge_1', x: -64, y: 6.8, z: 75, width: 21, height: 13.8, depth: 16, color: '#dfd5c4', type: 'lodging', label: 'Shri Gajanan Maharaj Bhakta Niwas' },
  { id: 'b_lodge_2', x: -64, y: 5.5, z: 110, width: 18, height: 11.2, depth: 15, color: '#cbd5e1', type: 'lodging', label: 'Annachhatra Dining Hall' },
  { id: 'b_lodge_3', x: -38, y: 5.0, z: 92, width: 14.5, height: 10.2, depth: 14, color: '#e2e8f0', type: 'lodging', label: 'Warkari Bhavan Wing B' },
  { id: 'b_lodge_3b', x: -38, y: 4.8, z: 74, width: 14.0, height: 9.8, depth: 13, color: '#d8caa8', type: 'lodging' },
  { id: 'b_lodge_4', x: -88, y: 5.8, z: 82, width: 17.5, height: 11.8, depth: 15, color: '#ded9ce', type: 'lodging', label: 'Solapur Zilla Yatri Niwas' },
  { id: 'b_lodge_5', x: -88, y: 5.2, z: 106, width: 17.5, height: 10.6, depth: 15, color: '#cbd5e1', type: 'lodging', label: 'Sai Yatri Niwas' },
  { id: 'b_lodge_6', x: -38, y: 5.0, z: 115, width: 13.5, height: 10.2, depth: 13, color: '#e8e4dc', type: 'lodging', label: 'Sant Namdev Vishram Gruha' },

  // =========================================================================
  // 5. NORTH PRADAKSHINA MATHAS & ASHRAMS
  // =========================================================================
  { id: 'b_math_1', x: 55, y: 4.7, z: -62, width: 12.5, height: 9.6, depth: 12, color: '#d8caa8', type: 'math', label: 'Chaitanya Math Ashram' },
  { id: 'b_math_1b', x: 55, y: 4.3, z: -80, width: 12.0, height: 8.8, depth: 12, color: '#dfd5c4', type: 'wada_hip' },
  { id: 'b_math_2', x: -32, y: 4.4, z: -70, width: 13.0, height: 9.0, depth: 12, color: '#cda87a', type: 'math', label: 'Tanpure Maharaj Ashram' },
  { id: 'b_math_3', x: 25, y: 4.2, z: -55, width: 10.5, height: 8.6, depth: 10, color: '#d4a373', type: 'math', label: 'Sant Eknath Prasadalaya' },
  { id: 'b_math_4', x: 75, y: 4.4, z: -85, width: 12.5, height: 9.0, depth: 12, color: '#e8e4dc', type: 'math', label: 'Tukaram Bhavan Ashram' },
  { id: 'b_math_5', x: 45, y: 4.0, z: -92, width: 11.5, height: 8.2, depth: 11, color: '#cda87a', type: 'math', label: 'Jnaneshwar Math' },
  { id: 'b_math_6', x: 15, y: 4.0, z: -82, width: 10.5, height: 8.2, depth: 10, color: '#d8caa8', type: 'math' },

  // =========================================================================
  // 6. ISKCON TEMPLE CAMPUS & RIVERSIDE GOSHALA
  // =========================================================================
  { id: 'b_iskcon_1', x: 95, y: 8.5, z: -120, width: 23, height: 17.2, depth: 25, color: '#ffffff', type: 'temple', label: 'ISKCON Sanctum' },
  { id: 'b_iskcon_goshala', x: 114, y: 4.0, z: -145, width: 19, height: 8.2, depth: 15, color: '#d1fae5', type: 'civic', label: 'Goshala Sanctuary' },
  { id: 'b_iskcon_guest', x: 74, y: 5.5, z: -130, width: 16, height: 11.2, depth: 15, color: '#f8fafc', type: 'lodging', label: 'ISKCON Atithi Bhavan' },

  // =========================================================================
  // 7. WESTERN STATION ROAD & TRANSIT QUARTER
  // =========================================================================
  { id: 'b_rail_station', x: -170, y: 6.4, z: 65, width: 29, height: 12.8, depth: 17, color: '#cbd5e1', type: 'transport', label: 'Pandharpur Station Concourse' },
  { id: 'b_rail_shed', x: -170, y: 4.4, z: 92, width: 39, height: 8.8, depth: 12, color: '#94a3b8', type: 'transport', label: 'Platform Shelter' },
  { id: 'b_bus_depot', x: -105, y: 5.5, z: 50, width: 25, height: 11.2, depth: 18, color: '#94a3b8', type: 'transport', label: 'MSRTC Bus Depot Platform' },
  { id: 'b_bus_hotel', x: -105, y: 5.2, z: 24, width: 15.5, height: 10.6, depth: 13, color: '#e8e4dc', type: 'lodging', label: 'Yatri Niwas Station Rd' },
  { id: 'b_rail_shops_1', x: -145, y: 3.4, z: 52, width: 11.5, height: 7.0, depth: 9.5, color: '#d4a373', type: 'bazaar', label: 'Station Tea & Bhojnalay' },
  { id: 'b_rail_shops_2', x: -145, y: 3.4, z: 28, width: 11.5, height: 7.0, depth: 9.5, color: '#c26d52', type: 'bazaar', label: 'Travel Accessories' },

  // =========================================================================
  // 8. SAVARKAR CHOWK & WEST ARTERIAL COMMERCIAL
  // =========================================================================
  { id: 'b_sav_1', x: -120, y: 4.7, z: -10, width: 11.5, height: 9.6, depth: 11, color: '#d8caa8', type: 'wada_hip', label: 'Savarkar Chowk Trade Centre' },
  { id: 'b_sav_2', x: -120, y: 4.4, z: -50, width: 12.5, height: 9.0, depth: 11, color: '#9c9488', type: 'wada_terrace', label: 'West Grain Market' },
  { id: 'b_sav_3', x: -142, y: 4.0, z: -25, width: 10.5, height: 8.2, depth: 10, color: '#c26d52', type: 'wada_hip' },
  { id: 'b_sav_4', x: -142, y: 4.2, z: -50, width: 10.5, height: 8.6, depth: 10, color: '#cda87a', type: 'wada_terrace' },

  // =========================================================================
  // 9. EASTERN RIVERFRONT PROMENADE WADAS (Facing Chandrabhaga)
  // =========================================================================
  { id: 'b_riv_1', x: 62, y: 4.7, z: -20, width: 10.5, height: 9.6, depth: 10, color: '#d4a373', type: 'wada_hip', label: 'Ghatfront Wada North' },
  { id: 'b_riv_1b', x: 74, y: 4.4, z: -20, width: 9.0, height: 9.0, depth: 10, color: '#dfd5c4', type: 'wada_terrace' },
  { id: 'b_riv_2', x: 62, y: 4.2, z: 18, width: 10.5, height: 8.6, depth: 10, color: '#d8caa8', type: 'wada_terrace', label: 'Ghatfront Wada South' },
  { id: 'b_riv_2b', x: 74, y: 4.5, z: 18, width: 9.0, height: 9.2, depth: 10, color: '#cda87a', type: 'wada_hip' },
  { id: 'b_riv_3', x: 62, y: 4.2, z: 44, width: 10.5, height: 8.6, depth: 10, color: '#c26d52', type: 'wada_hip', label: 'Udhav Ghat Wada' },
  { id: 'b_riv_3b', x: 74, y: 4.4, z: 44, width: 9.0, height: 9.0, depth: 10, color: '#e8e4dc', type: 'wada_terrace' },
  { id: 'b_riv_4', x: 62, y: 4.7, z: -44, width: 10.5, height: 9.6, depth: 10, color: '#9c9488', type: 'wada_terrace', label: 'Kumbhar Ghat Wada' },
  { id: 'b_riv_5', x: 62, y: 4.4, z: -68, width: 10.5, height: 9.0, depth: 10, color: '#ded9ce', type: 'wada_hip', label: 'Vipra Ghat Wada' },
  { id: 'b_riv_6', x: 62, y: 4.0, z: 70, width: 10.5, height: 8.2, depth: 10, color: '#d4a373', type: 'wada_hip' },
  { id: 'b_riv_7', x: 62, y: 4.1, z: 92, width: 10.5, height: 8.4, depth: 10, color: '#dfd5c4', type: 'wada_terrace' },

  // =========================================================================
  // 10. SOUTH PRADAKSHINA PATH ENCLAVE
  // =========================================================================
  { id: 'b_sth_1', x: 42, y: 4.4, z: 38, width: 10.5, height: 9.0, depth: 10, color: '#d8caa8', type: 'wada_hip', label: 'South Pradakshina Wada' },
  { id: 'b_sth_2', x: 42, y: 4.2, z: 78, width: 10.5, height: 8.6, depth: 10, color: '#c26d52', type: 'wada_terrace' },
  { id: 'b_sth_3', x: 18, y: 4.0, z: 65, width: 9.5, height: 8.2, depth: 9.5, color: '#9c9488', type: 'wada_hip' },
  { id: 'b_sth_4', x: -12, y: 4.2, z: 56, width: 10.5, height: 8.6, depth: 10, color: '#d4a373', type: 'wada_terrace', label: 'Chokhamela Marg Wada' },
  { id: 'b_sth_5', x: -12, y: 4.0, z: 80, width: 9.5, height: 8.2, depth: 9.5, color: '#ded9ce', type: 'wada_hip' },
  { id: 'b_sth_6', x: 45, y: 4.4, z: 122, width: 13.5, height: 9.0, depth: 12, color: '#cda87a', type: 'math', label: 'Gopalpur Road Math' }
];

// Holy flags (Bhagva Dhwaja) positioned at major sacred nodes
export const SACRED_FLAGS = [
  { id: 'f_vitthal', x: 0, y: 33.2, z: -10, color: '#f97316', label: 'Vitthal Shikhara Dhwaja' },
  { id: 'f_pundalik', x: 115, y: 17.5, z: 5, color: '#f97316', label: 'Pundalik Shikhara Dhwaja' },
  { id: 'f_namdev', x: -4, y: 9.2, z: 15, color: '#ea580c', label: 'Namdev Payari Dhwaja' },
  { id: 'f_mahadwar', x: -20, y: 12.8, z: 20, color: '#f59e0b', label: 'Mahadwar Arch Dhwaja' },
  { id: 'f_iskcon', x: 95, y: 23.5, z: -120, color: '#f97316', label: 'ISKCON Shikhara Dhwaja' }
];

// Streetlights & Diya Pillars (Deepamalas)
export const DEEPAMALAS = [
  { id: 'deep_temple_1', x: -9, y: 0.2, z: 22, height: 9.5 },
  { id: 'deep_temple_2', x: 9, y: 0.2, z: 22, height: 9.5 },
  { id: 'deep_ghat_1', x: 92, y: -0.8, z: 10, height: 8.5 },
  { id: 'deep_ghat_2', x: 92, y: -0.8, z: -10, height: 8.5 },
  { id: 'deep_ghat_3', x: 96, y: -0.8, z: -46, height: 7.5 },
  { id: 'deep_ghat_4', x: 90, y: -0.8, z: 56, height: 7.5 }
];

// Warkari Pilgrim Tents on the Chandrabhaga Sandbank
export const PILGRIM_TENTS = [
  { id: 't_1', x: 105, y: -0.6, z: -20, color: '#ea580c' },
  { id: 't_2', x: 108, y: -0.6, z: -12, color: '#f59e0b' },
  { id: 't_3', x: 103, y: -0.6, z: 25, color: '#10b981' },
  { id: 't_4', x: 106, y: -0.6, z: 32, color: '#0284c7' },
  { id: 't_5', x: 110, y: -0.6, z: -40, color: '#f97316' },
  { id: 't_6', x: 104, y: -0.6, z: 50, color: '#dc2626' },
  { id: 't_7', x: 138, y: -0.7, z: -15, color: '#ea580c' },
  { id: 't_8', x: 142, y: -0.7, z: -6, color: '#f59e0b' }
];

// Authentic River Boats floating in Chandrabhaga
export const RIVER_BOATS = [
  { id: 'boat_1', x: 126, y: -1.15, z: -15, rotation: 0.22 },
  { id: 'boat_2', x: 132, y: -1.15, z: 18, rotation: -0.3 },
  { id: 'boat_3', x: 122, y: -1.15, z: 42, rotation: 0.15 },
  { id: 'boat_4', x: 120, y: -1.15, z: -45, rotation: -0.18 },
  { id: 'boat_5', x: 118, y: -1.15, z: -70, rotation: 0.28 },
  { id: 'boat_6', x: 116, y: -1.15, z: 72, rotation: -0.22 }
];
