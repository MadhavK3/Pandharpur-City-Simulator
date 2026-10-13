/**
 * Pedestrian Graph Model for Pandharpur Darshan 3D
 * 41 Nodes, 61 Edges covering complete pilgrimage network
 * Scaled realistic city proportions: ~450m East-West, ~300m North-South
 * Vitthal Mandir Center = [0, 0, 0]
 */

export const PANDHARPUR_GRAPH_DATA = {
  nodes: [
    // --- 1. Temple Complex & Gateways ---
    { id: 'VITTHAL_ENTRANCE', name: 'Vitthal Mandir Mahadwar', marathiName: 'विठ्ठल मंदिर महाद्वार', x: 0, y: 0.1, z: 0, type: 'temple_entrance', landmarkId: 'VITTHAL_RUKMINI_MANDIR', crowdDensity: 0.85 },
    { id: 'RUKMINI_ENTRANCE', name: 'Rukmini Mata Mandir Gate', marathiName: 'रुक्मिणी माता मंदिर द्वार', x: 5, y: 0.1, z: -10, type: 'temple_entrance', crowdDensity: 0.65 },
    { id: 'NAMDEV_STEPS', name: 'Sant Namdev Payari Gate', marathiName: 'नामदेव पायरी प्रवेशद्वार', x: -4, y: 0.2, z: 15, type: 'temple_entrance', landmarkId: 'NAMDEV_PAYARTHI', crowdDensity: 0.9 },
    { id: 'PASCHIM_DWAR', name: 'Paschim Dwar (West Gate)', marathiName: 'पश्चिम द्वार', x: -12, y: 0.1, z: -2, type: 'temple_entrance', crowdDensity: 0.5 },
    { id: 'UTTAR_DWAR', name: 'Uttar Dwar (North Gate)', marathiName: 'उत्तर द्वार', x: 0, y: 0.1, z: -20, type: 'temple_entrance', crowdDensity: 0.45 },
    { id: 'DAKSHIN_DWAR', name: 'Dakshin Dwar (South Gate)', marathiName: 'दक्षिण द्वार', x: 0, y: 0.1, z: 20, type: 'temple_entrance', crowdDensity: 0.55 },

    // --- 2. Sacred Samadhis & Mathas ---
    { id: 'CHOKHAMELA_NODE', name: 'Sant Chokhamela Samadhi', marathiName: 'चोखामेळा समाधी', x: -12, y: 0.1, z: 30, type: 'samadhi', landmarkId: 'SANT_CHOKHAMELA_SAMADHI', crowdDensity: 0.7 },
    { id: 'PUNDALIK_NODE', name: 'Bhakta Pundalik Mandir', marathiName: 'भक्त पुंडलिक मंदिर', x: 115, y: -0.6, z: 5, type: 'temple_entrance', landmarkId: 'PUNDALIKA_MANDIR', crowdDensity: 0.75 },
    { id: 'JANABAI_NODE', name: 'Sant Janabai Mandir', marathiName: 'संत जनाबाई समाधी', x: 110, y: -0.6, z: 35, type: 'samadhi', landmarkId: 'SANT_JANABAI_SAMADHI', crowdDensity: 0.4 },
    { id: 'BHANUDAS_NODE', name: 'Sant Bhanudas Samadhi', marathiName: 'संत भानुदास समाधी', x: 108, y: -0.6, z: -30, type: 'samadhi', landmarkId: 'SANT_BHANUDAS_SAMADHI', crowdDensity: 0.35 },
    { id: 'MALLIKARJUNA_NODE', name: 'Mallikarjuna Mahadev', marathiName: 'मल्लिकार्जुन महादेव', x: 80, y: 0.1, z: -45, type: 'temple_entrance', landmarkId: 'MALLIKARJUNA_TEMPLE', crowdDensity: 0.3 },
    { id: 'ISKCON_NODE', name: 'ISKCON Temple Complex', marathiName: 'इस्कॉन मंदिर', x: 95, y: 0.1, z: -120, type: 'temple_entrance', landmarkId: 'ISKCON_PANDHARPUR', crowdDensity: 0.5 },
    { id: 'CHAITANYA_MATH_NODE', name: 'Chaitanya Maharaj Math', marathiName: 'चैतन्य मठ', x: 55, y: 0.1, z: -75, type: 'math', landmarkId: 'KAIFIYAT_MATH', crowdDensity: 0.3 },
    { id: 'TANPURE_MATH_NODE', name: 'Tanpure Ashram Math', marathiName: 'तनपुरे आश्रम', x: -30, y: 0.1, z: -55, type: 'math', landmarkId: 'TANPUROJI_BABA_MATH', crowdDensity: 0.4 },

    // --- 3. Chandrabhaga River Ghats (At riverbank X ≈ 90 to 100) ---
    { id: 'BHIMA_GHAT_MAIN', name: 'Chandrabhaga Mahaghat', marathiName: 'चंद्रभागा महाघाट', x: 95, y: -1.0, z: 0, type: 'ghat', landmarkId: 'CHANDRABHAGA_GHAT', crowdDensity: 0.8 },
    { id: 'VIPRA_GHAT', name: 'Vipra Datta Ghat', marathiName: 'विप्र दत्त घाट', x: 100, y: -1.0, z: -70, type: 'ghat', landmarkId: 'VIPRA_DATTA_GHAT', crowdDensity: 0.4 },
    { id: 'UDHAV_GHAT_NODE', name: 'Udhav Ghat', marathiName: 'उद्धव घाट', x: 92, y: -1.0, z: 80, type: 'ghat', landmarkId: 'UDHAV_GHAT', crowdDensity: 0.45 },
    { id: 'KUMBHAR_GHAT_NODE', name: 'Kumbhar Ghat', marathiName: 'कुंभार घाट', x: 98, y: -1.0, z: -35, type: 'ghat', crowdDensity: 0.3 },
    { id: 'AMRITESHWAR_GHAT', name: 'Amriteshwar Ghat', marathiName: 'अमृतेश्वर घाट', x: 90, y: -1.0, z: 45, type: 'ghat', crowdDensity: 0.35 },

    // --- 4. Central Squares, Bazars & Intersections ---
    { id: 'MAHADWAR_NODE', name: 'Mahadwar Bazar Chowk', marathiName: 'महाद्वार बाजार चौक', x: -20, y: 0.1, z: 20, type: 'junction', landmarkId: 'MAHADWAR_CHOWK', crowdDensity: 0.85 },
    { id: 'SHIVAJI_CHOWK', name: 'Shivaji Maharaj Chowk', marathiName: 'शिवाजी महाराज चौक', x: -55, y: 0.1, z: 0, type: 'junction', landmarkId: 'SHIVAJI_CHOWK', crowdDensity: 0.75 },
    { id: 'SAVARKAR_CHOWK', name: 'Savarkar Chowk', marathiName: 'स्वातंत्र्यवीर सावरकर चौक', x: -120, y: 0.1, z: -30, type: 'junction', landmarkId: 'SAVARKAR_CHOWK', crowdDensity: 0.6 },
    { id: 'TILAK_SMARAK_CHOWK', name: 'Lokmanya Tilak Chowk', marathiName: 'टिळक स्मारक चौक', x: -50, y: 0.1, z: 45, type: 'junction', crowdDensity: 0.6 },
    { id: 'STATION_ROAD_JUNCTION', name: 'Station Road T-Junction', marathiName: 'स्टेशन रोड तिठा', x: -130, y: 0.1, z: 40, type: 'junction', crowdDensity: 0.55 },
    { id: 'PRADAKSHINA_NORTH_1', name: 'North Pradakshina Corner', marathiName: 'उत्तर प्रदक्षिणा कॉर्नर', x: 30, y: 0.1, z: -65, type: 'junction', crowdDensity: 0.4 },
    { id: 'PRADAKSHINA_NORTH_2', name: 'North Ghat Link', marathiName: 'उत्तर घाट मार्ग', x: 70, y: 0.1, z: -95, type: 'junction', crowdDensity: 0.35 },
    { id: 'PRADAKSHINA_SOUTH_1', name: 'South Pradakshina Link', marathiName: 'दक्षिण प्रदक्षिणा वळण', x: 40, y: 0.1, z: 60, type: 'junction', crowdDensity: 0.45 },
    { id: 'PRADAKSHINA_SOUTH_2', name: 'South Ghat Bridge End', marathiName: 'दक्षिण घाट रस्ता', x: 65, y: 0.1, z: 95, type: 'junction', crowdDensity: 0.4 },
    { id: 'TEMPLE_CIRCUM_EAST', name: 'East Temple Alley', marathiName: 'पूर्व मंदिर गल्ली', x: 35, y: 0.1, z: 5, type: 'waypoint', crowdDensity: 0.6 },
    { id: 'TEMPLE_CIRCUM_WEST', name: 'West Temple Alley', marathiName: 'पश्चिम मंदिर गल्ली', x: -25, y: 0.1, z: -20, type: 'waypoint', crowdDensity: 0.5 },

    // --- 5. Transport, Lodging & Public Points ---
    { id: 'RAILWAY_STATION', name: 'Pandharpur Railway Station', marathiName: 'पंढरपूर रेल्वे स्टेशन', x: -170, y: 0.1, z: 65, type: 'transport', landmarkId: 'PANDHARPUR_RAILWAY_STATION', crowdDensity: 0.65 },
    { id: 'BUS_TERMINAL', name: 'MSRTC Central Bus Stand', marathiName: 'मध्यवर्ती बस स्थानक', x: -100, y: 0.1, z: 50, type: 'transport', landmarkId: 'MSRTC_BUS_STAND', crowdDensity: 0.75 },
    { id: 'BHAKTA_NIWAS_NODE', name: 'Bhakta Niwas Complex', marathiName: 'भक्त निवास संकुल', x: -60, y: 0.1, z: 90, type: 'lodging', landmarkId: 'BHAKTA_NIWAS_COMPLEX', crowdDensity: 0.5 },
    { id: 'JIJABAI_GARDEN_NODE', name: 'Jijau Udyan Park', marathiName: 'जिजाऊ उद्यान', x: -45, y: 0.1, z: -80, type: 'waypoint', landmarkId: 'JIJABAI_UDYAN', crowdDensity: 0.25 },
    { id: 'PADMAVATI_LAKE_NODE', name: 'Padmavati Talao Gate', marathiName: 'पद्मावती तलाव', x: -88, y: 0.1, z: 120, type: 'waypoint', landmarkId: 'PADMAVATI_LAKE', crowdDensity: 0.3 },
    { id: 'GOPALPUR_JUNCTION', name: 'Gopalpur Road Junction', marathiName: 'गोपाळपूर मार्ग चौक', x: 45, y: 0.1, z: 138, type: 'junction', landmarkId: 'GOPALKRISHNA_MANDIR', crowdDensity: 0.4 },

    // --- 6. Extended Cross-Connecting Junctions ---
    { id: 'HOLI_MAIDAN', name: 'Holi Maidan Chowk', marathiName: 'होळी मैदान चौक', x: -80, y: 0.1, z: -15, type: 'junction', crowdDensity: 0.5 },
    { id: 'NAVI_PETH', name: 'Navi Peth Market', marathiName: 'नवी पेठ बाजार', x: -40, y: 0.1, z: 20, type: 'junction', crowdDensity: 0.8 },
    { id: 'KASBA_PETH', name: 'Kasba Peth Crossroads', marathiName: 'कसबा पेठ', x: -10, y: 0.1, z: -50, type: 'junction', crowdDensity: 0.4 },
    { id: 'EAST_RIVER_CROSSING', name: 'Chandrabhaga Pedestrian Sand Path', marathiName: 'चंद्रभागा वाळवंट मार्ग', x: 105, y: -1.0, z: 2, type: 'waypoint', crowdDensity: 0.7 },
    { id: 'RIVER_ISLAND_APPROACH', name: 'Pundalik Temple Footbridge', marathiName: 'पुंडलिक मंदिर सेतू', x: 110, y: -0.6, z: 5, type: 'waypoint', crowdDensity: 0.8 }
  ],

  edges: [
    // 1. Core Temple Internal & Entry
    { id: 'E_VITTHAL_RUKMINI', source: 'VITTHAL_ENTRANCE', target: 'RUKMINI_ENTRANCE', distanceMeters: 45, streetName: 'Temple Inner Corridor', roadType: 'pedestrian_walkway', isOpen: true, crowdFactor: 1.8 },
    { id: 'E_VITTHAL_NAMDEV', source: 'VITTHAL_ENTRANCE', target: 'NAMDEV_STEPS', distanceMeters: 55, streetName: 'Namdev Payari Approach', roadType: 'ghat_steps', isOpen: true, crowdFactor: 2.2 },
    { id: 'E_VITTHAL_PASCHIM', source: 'VITTHAL_ENTRANCE', target: 'PASCHIM_DWAR', distanceMeters: 50, streetName: 'West Parikrama Path', roadType: 'pedestrian_walkway', isOpen: true, crowdFactor: 1.2 },
    { id: 'E_VITTHAL_UTTAR', source: 'VITTHAL_ENTRANCE', target: 'UTTAR_DWAR', distanceMeters: 80, streetName: 'North Temple Gate', roadType: 'pedestrian_walkway', isOpen: true, crowdFactor: 1.1 },
    { id: 'E_VITTHAL_DAKSHIN', source: 'VITTHAL_ENTRANCE', target: 'DAKSHIN_DWAR', distanceMeters: 80, streetName: 'South Temple Gate', roadType: 'pedestrian_walkway', isOpen: true, crowdFactor: 1.3 },
    { id: 'E_VITTHAL_EAST_CIRCUM', source: 'VITTHAL_ENTRANCE', target: 'TEMPLE_CIRCUM_EAST', distanceMeters: 140, streetName: 'East Pradakshina Lane', roadType: 'bazaar_lane', isOpen: true, crowdFactor: 1.5 },

    // 2. Namdev Steps & Mahadwar Bazar
    { id: 'E_NAMDEV_MAHADWAR', source: 'NAMDEV_STEPS', target: 'MAHADWAR_NODE', distanceMeters: 75, streetName: 'Mahadwar Road', roadType: 'bazaar_lane', isOpen: true, crowdFactor: 2.4 },
    { id: 'E_NAMDEV_CHOKHAMELA', source: 'NAMDEV_STEPS', target: 'CHOKHAMELA_NODE', distanceMeters: 65, streetName: 'Chokhamela Samadhi Path', roadType: 'bazaar_lane', isOpen: true, crowdFactor: 1.9 },
    { id: 'E_MAHADWAR_NAVIPETH', source: 'MAHADWAR_NODE', target: 'NAVI_PETH', distanceMeters: 80, streetName: 'Navi Peth Main Alley', roadType: 'bazaar_lane', isOpen: true, crowdFactor: 2.0 },
    { id: 'E_CHOKHAMELA_NAVIPETH', source: 'CHOKHAMELA_NODE', target: 'NAVI_PETH', distanceMeters: 110, streetName: 'Sant Lane', roadType: 'bazaar_lane', isOpen: true, crowdFactor: 1.4 },

    // 3. Central Market & Shivaji Chowk
    { id: 'E_NAVIPETH_SHIVAJI', source: 'NAVI_PETH', target: 'SHIVAJI_CHOWK', distanceMeters: 110, streetName: 'Shivaji Road', roadType: 'arterial', isOpen: true, crowdFactor: 1.6 },
    { id: 'E_PASCHIM_SHIVAJI', source: 'PASCHIM_DWAR', target: 'SHIVAJI_CHOWK', distanceMeters: 170, streetName: 'Mandir West Avenue', roadType: 'bazaar_lane', isOpen: true, crowdFactor: 1.3 },
    { id: 'E_UTTAR_CIRCUM_WEST', source: 'UTTAR_DWAR', target: 'TEMPLE_CIRCUM_WEST', distanceMeters: 100, streetName: 'Northwest Ring', roadType: 'bazaar_lane', isOpen: true, crowdFactor: 1.1 },
    { id: 'E_TEMPLE_WEST_SHIVAJI', source: 'TEMPLE_CIRCUM_WEST', target: 'SHIVAJI_CHOWK', distanceMeters: 140, streetName: 'Shivaji Link', roadType: 'arterial', isOpen: true, crowdFactor: 1.2 },

    // 4. Chandrabhaga Ghat Approaches (The Holy Route to River)
    { id: 'E_EAST_CIRCUM_BHIMA', source: 'TEMPLE_CIRCUM_EAST', target: 'BHIMA_GHAT_MAIN', distanceMeters: 240, streetName: 'Mahaghat Marg', roadType: 'ghat_steps', isOpen: true, crowdFactor: 2.1 },
    { id: 'E_BHIMA_CROSSING', source: 'BHIMA_GHAT_MAIN', target: 'EAST_RIVER_CROSSING', distanceMeters: 40, streetName: 'River Sandwalk', roadType: 'pedestrian_walkway', isOpen: true, crowdFactor: 1.8 },
    { id: 'E_CROSSING_APPROACH', source: 'EAST_RIVER_CROSSING', target: 'RIVER_ISLAND_APPROACH', distanceMeters: 20, streetName: 'Pundalik Footbridge', roadType: 'pedestrian_walkway', isOpen: true, crowdFactor: 2.0 },
    { id: 'E_APPROACH_PUNDALIK', source: 'RIVER_ISLAND_APPROACH', target: 'PUNDALIK_NODE', distanceMeters: 20, streetName: 'Pundalik Sanctum Entry', roadType: 'ghat_steps', isOpen: true, crowdFactor: 2.2 },

    // 5. Riverbank Ghats Chain (Chandrabhaga Crescent)
    { id: 'E_BHIMA_KUMBHAR', source: 'BHIMA_GHAT_MAIN', target: 'KUMBHAR_GHAT_NODE', distanceMeters: 140, streetName: 'Chandrabhaga North Promenade', roadType: 'ghat_steps', isOpen: true, crowdFactor: 1.4 },
    { id: 'E_KUMBHAR_VIPRA', source: 'KUMBHAR_GHAT_NODE', target: 'VIPRA_GHAT', distanceMeters: 140, streetName: 'Vipra Ghat Steps', roadType: 'ghat_steps', isOpen: true, crowdFactor: 1.2 },
    { id: 'E_BHIMA_AMRITESHWAR', source: 'BHIMA_GHAT_MAIN', target: 'AMRITESHWAR_GHAT', distanceMeters: 180, streetName: 'Chandrabhaga South Promenade', roadType: 'ghat_steps', isOpen: true, crowdFactor: 1.5 },
    { id: 'E_AMRITESHWAR_UDHAV', source: 'AMRITESHWAR_GHAT', target: 'UDHAV_GHAT_NODE', distanceMeters: 140, streetName: 'Udhav Ghat Promenade', roadType: 'ghat_steps', isOpen: true, crowdFactor: 1.3 },

    // 6. Riverbank Temples & Samadhis (East of Vithoba)
    { id: 'E_PUNDALIK_JANABAI', source: 'PUNDALIK_NODE', target: 'JANABAI_NODE', distanceMeters: 125, streetName: 'Sant Janabai River Trail', roadType: 'pedestrian_walkway', isOpen: true, crowdFactor: 1.2 },
    { id: 'E_PUNDALIK_BHANUDAS', source: 'PUNDALIK_NODE', target: 'BHANUDAS_NODE', distanceMeters: 145, streetName: 'Bhanudas Samadhi Pathway', roadType: 'pedestrian_walkway', isOpen: true, crowdFactor: 1.1 },
    { id: 'E_BHANUDAS_KUMBHAR', source: 'BHANUDAS_NODE', target: 'KUMBHAR_GHAT_NODE', distanceMeters: 60, streetName: 'Kumbhar Ghat Link', roadType: 'pedestrian_walkway', isOpen: true, crowdFactor: 1.0 },
    { id: 'E_JANABAI_AMRIT', source: 'JANABAI_NODE', target: 'AMRITESHWAR_GHAT', distanceMeters: 90, streetName: 'Amriteshwar Link', roadType: 'pedestrian_walkway', isOpen: true, crowdFactor: 1.1 },

    // 7. Pradakshina Road Network (The Sacred Outer Ring)
    { id: 'E_RUKMINI_PRAD_N1', source: 'RUKMINI_ENTRANCE', target: 'PRADAKSHINA_NORTH_1', distanceMeters: 240, streetName: 'North Ring Way', roadType: 'pradakshina', isOpen: true, crowdFactor: 1.3 },
    { id: 'E_PRAD_N1_CHAITANYA', source: 'PRADAKSHINA_NORTH_1', target: 'CHAITANYA_MATH_NODE', distanceMeters: 110, streetName: 'Chaitanya Math Road', roadType: 'pradakshina', isOpen: true, crowdFactor: 1.1 },
    { id: 'E_CHAITANYA_MALLIK', source: 'CHAITANYA_MATH_NODE', target: 'MALLIKARJUNA_NODE', distanceMeters: 160, streetName: 'Mallikarjuna Galli', roadType: 'bazaar_lane', isOpen: true, crowdFactor: 1.0 },
    { id: 'E_MALLIK_VIPRA', source: 'MALLIKARJUNA_NODE', target: 'VIPRA_GHAT', distanceMeters: 130, streetName: 'Ghat Descent Path', roadType: 'ghat_steps', isOpen: true, crowdFactor: 1.2 },
    { id: 'E_PRAD_N1_PRAD_N2', source: 'PRADAKSHINA_NORTH_1', target: 'PRADAKSHINA_NORTH_2', distanceMeters: 200, streetName: 'Outer North Pradakshina', roadType: 'pradakshina', isOpen: true, crowdFactor: 1.1 },
    { id: 'E_PRAD_N2_ISKCON', source: 'PRADAKSHINA_NORTH_2', target: 'ISKCON_NODE', distanceMeters: 140, streetName: 'ISKCON Avenue', roadType: 'arterial', isOpen: true, crowdFactor: 1.2 },
    { id: 'E_VIPRA_PRAD_N2', source: 'VIPRA_GHAT', target: 'PRADAKSHINA_NORTH_2', distanceMeters: 160, streetName: 'Riverbank ISKCON Link', roadType: 'pradakshina', isOpen: true, crowdFactor: 1.2 },

    // 8. South Pradakshina & Gopalpur Links
    { id: 'E_DAKSHIN_PRAD_S1', source: 'DAKSHIN_DWAR', target: 'PRADAKSHINA_SOUTH_1', distanceMeters: 220, streetName: 'South Parikrama Marg', roadType: 'pradakshina', isOpen: true, crowdFactor: 1.3 },
    { id: 'E_PRAD_S1_PRAD_S2', source: 'PRADAKSHINA_SOUTH_1', target: 'PRADAKSHINA_SOUTH_2', distanceMeters: 170, streetName: 'South Pradakshina Highway', roadType: 'pradakshina', isOpen: true, crowdFactor: 1.2 },
    { id: 'E_PRAD_S2_UDHAV', source: 'PRADAKSHINA_SOUTH_2', target: 'UDHAV_GHAT_NODE', distanceMeters: 125, streetName: 'Udhav Ghat Access', roadType: 'ghat_steps', isOpen: true, crowdFactor: 1.2 },
    { id: 'E_PRAD_S2_GOPALPUR', source: 'PRADAKSHINA_SOUTH_2', target: 'GOPALPUR_JUNCTION', distanceMeters: 190, streetName: 'Gopalpur Road', roadType: 'arterial', isOpen: true, crowdFactor: 1.1 },

    // 9. Western Civic Roads (Railway, Bus Stand, Shivaji, Savarkar)
    { id: 'E_RAILWAY_STATION_RD', source: 'RAILWAY_STATION', target: 'STATION_ROAD_JUNCTION', distanceMeters: 190, streetName: 'Station Approach Road', roadType: 'arterial', isOpen: true, crowdFactor: 1.4 },
    { id: 'E_STATION_BUS', source: 'STATION_ROAD_JUNCTION', target: 'BUS_TERMINAL', distanceMeters: 130, streetName: 'Depot Link', roadType: 'arterial', isOpen: true, crowdFactor: 1.5 },
    { id: 'E_STATION_SAVARKAR', source: 'STATION_ROAD_JUNCTION', target: 'SAVARKAR_CHOWK', distanceMeters: 280, streetName: 'Station-Savarkar Link', roadType: 'arterial', isOpen: true, crowdFactor: 1.3 },
    { id: 'E_BUS_SAVARKAR', source: 'BUS_TERMINAL', target: 'SAVARKAR_CHOWK', distanceMeters: 330, streetName: 'Savarkar Highway', roadType: 'arterial', isOpen: true, crowdFactor: 1.4 },
    { id: 'E_SAVARKAR_HOLI', source: 'SAVARKAR_CHOWK', target: 'HOLI_MAIDAN', distanceMeters: 170, streetName: 'Maidan Road', roadType: 'arterial', isOpen: true, crowdFactor: 1.2 },
    { id: 'E_HOLI_SHIVAJI', source: 'HOLI_MAIDAN', target: 'SHIVAJI_CHOWK', distanceMeters: 120, streetName: 'Shivaji West Road', roadType: 'arterial', isOpen: true, crowdFactor: 1.5 },
    { id: 'E_BUS_TILAK', source: 'BUS_TERMINAL', target: 'TILAK_SMARAK_CHOWK', distanceMeters: 200, streetName: 'Tilak Marg', roadType: 'arterial', isOpen: true, crowdFactor: 1.4 },
    { id: 'E_TILAK_SHIVAJI', source: 'TILAK_SMARAK_CHOWK', target: 'SHIVAJI_CHOWK', distanceMeters: 180, streetName: 'Central Bazaar', roadType: 'bazaar_lane', isOpen: true, crowdFactor: 1.7 },
    { id: 'E_TILAK_BHAKTA_NIWAS', source: 'TILAK_SMARAK_CHOWK', target: 'BHAKTA_NIWAS_NODE', distanceMeters: 180, streetName: 'Bhakta Niwas Road', roadType: 'arterial', isOpen: true, crowdFactor: 1.3 },
    { id: 'E_BHAKTA_NIWAS_PADMAVATI', source: 'BHAKTA_NIWAS_NODE', target: 'PADMAVATI_LAKE_NODE', distanceMeters: 160, streetName: 'Lake View Road', roadType: 'pedestrian_walkway', isOpen: true, crowdFactor: 1.0 },
    { id: 'E_STATION_PADMAVATI', source: 'STATION_ROAD_JUNCTION', target: 'PADMAVATI_LAKE_NODE', distanceMeters: 360, streetName: 'Padmavati Bypass', roadType: 'arterial', isOpen: true, crowdFactor: 1.0 },

    // 10. Northern Civic & Math Connections
    { id: 'E_SHIVAJI_TANPURE', source: 'SHIVAJI_CHOWK', target: 'TANPURE_MATH_NODE', distanceMeters: 240, streetName: 'Tanpure Ashram Road', roadType: 'bazaar_lane', isOpen: true, crowdFactor: 1.2 },
    { id: 'E_TANPURE_JIJABAI', source: 'TANPURE_MATH_NODE', target: 'JIJABAI_GARDEN_NODE', distanceMeters: 120, streetName: 'Garden Walk', roadType: 'pedestrian_walkway', isOpen: true, crowdFactor: 1.0 },
    { id: 'E_SAVARKAR_JIJABAI', source: 'SAVARKAR_CHOWK', target: 'JIJABAI_GARDEN_NODE', distanceMeters: 360, streetName: 'North Ring Link', roadType: 'arterial', isOpen: true, crowdFactor: 1.1 },
    { id: 'E_TANPURE_KASBA', source: 'TANPURE_MATH_NODE', target: 'KASBA_PETH', distanceMeters: 90, streetName: 'Kasba Lane', roadType: 'bazaar_lane', isOpen: true, crowdFactor: 1.1 },
    { id: 'E_KASBA_UTTAR', source: 'KASBA_PETH', target: 'UTTAR_DWAR', distanceMeters: 130, streetName: 'Uttar Dwar Alley', roadType: 'bazaar_lane', isOpen: true, crowdFactor: 1.2 },
    { id: 'E_KASBA_PRAD_N1', source: 'KASBA_PETH', target: 'PRADAKSHINA_NORTH_1', distanceMeters: 170, streetName: 'North Cross Path', roadType: 'pradakshina', isOpen: true, crowdFactor: 1.1 },

    // 11. Southern Links Connecting Bhakta Niwas with Pradakshina
    { id: 'E_BHAKTA_PRAD_S1', source: 'BHAKTA_NIWAS_NODE', target: 'PRADAKSHINA_SOUTH_1', distanceMeters: 420, streetName: 'South Pilgrim Avenue', roadType: 'arterial', isOpen: true, crowdFactor: 1.2 },
    { id: 'E_TILAK_DAKSHIN', source: 'TILAK_SMARAK_CHOWK', target: 'DAKSHIN_DWAR', distanceMeters: 220, streetName: 'South Bazaar Gate Lane', roadType: 'bazaar_lane', isOpen: true, crowdFactor: 1.6 },
    { id: 'E_CHOKHAMELA_DAKSHIN', source: 'CHOKHAMELA_NODE', target: 'DAKSHIN_DWAR', distanceMeters: 70, streetName: 'Dakshin Dwar Pass', roadType: 'pedestrian_walkway', isOpen: true, crowdFactor: 1.5 },

    // 12. Eastern Full Complete Ring Connections
    { id: 'E_TEMPLE_EAST_CHAITANYA', source: 'TEMPLE_CIRCUM_EAST', target: 'CHAITANYA_MATH_NODE', distanceMeters: 330, streetName: 'East Ashram Byway', roadType: 'pradakshina', isOpen: true, crowdFactor: 1.1 },
    { id: 'E_TEMPLE_EAST_PRAD_S1', source: 'TEMPLE_CIRCUM_EAST', target: 'PRADAKSHINA_SOUTH_1', distanceMeters: 220, streetName: 'Southeast Parikrama Loop', roadType: 'pradakshina', isOpen: true, crowdFactor: 1.2 },
    { id: 'E_PASCHIM_KASBA', source: 'PASCHIM_DWAR', target: 'KASBA_PETH', distanceMeters: 190, streetName: 'Paschim Kasba Pass', roadType: 'bazaar_lane', isOpen: true, crowdFactor: 1.1 },
    { id: 'E_GOPALPUR_UDHAV', source: 'GOPALPUR_JUNCTION', target: 'UDHAV_GHAT_NODE', distanceMeters: 290, streetName: 'Gopalpur Ghat Link', roadType: 'arterial', isOpen: true, crowdFactor: 1.1 }
  ]
};

export const ROAD_TYPES = {
  pradakshina: { label: 'Pradakshina Ring Road', color: '#18181b', width: 6.5 },
  arterial: { label: 'Major Town Arterial', color: '#18181b', width: 7.5 },
  bazaar_lane: { label: 'Temple Bazaar Lane', color: '#27272a', width: 5.0 },
  ghat_steps: { label: 'Chandrabhaga Ghat Steps', color: '#57534e', width: 5.5 },
  pedestrian_walkway: { label: 'Sacred Pedestrian Walk', color: '#3f3f46', width: 4.0 }
};

export function getGraphNode(nodeId) {
  return PANDHARPUR_GRAPH_DATA.nodes.find(n => n.id === nodeId);
}

export function getGraphEdge(edgeId) {
  return PANDHARPUR_GRAPH_DATA.edges.find(e => e.id === edgeId);
}
