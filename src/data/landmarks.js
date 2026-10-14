/**
 * Landmarks database for Pandharpur Darshan 3D
 * Accurate cultural, historical, and geographic representation
 * Linked with authentic photography and reference cartography.
 */

export const LANDMARKS = [
  // --- Core Temple ---
  {
    id: 'VITTHAL_RUKMINI_MANDIR',
    name: 'Shree Vitthal-Rukmini Mandir',
    marathiName: 'श्री विठ्ठल रुक्मिणी मंदिर',
    category: 'temple',
    coordinates: [0, 0, 0],
    graphNodeId: 'VITTHAL_ENTRANCE',
    image: '/images/vitthal_mandir.jpg',
    significance: 'Spiritual epicenter of Maharashtra & Warkari Sampradaya; 12th-century shrine dedicated to Lord Vitthal (Vithoba) and Rukmini Devi with Hemadpanthi stone shikhara.',
    darshanTime: '04:00 AM - 11:00 PM',
    aartiTimings: ['04:30 AM Kakad Aarti', '11:00 AM Mahapooja', '07:00 PM Dhup Aarti', '10:30 PM Shej Aarti'],
    crowdLevel: 'high',
    avgWaitMinutes: 45,
    icon: 'Sparkles',
    featured: true,
    dimensions: { width: 28, depth: 42, height: 28 }
  },
  {
    id: 'NAMDEV_PAYARTHI',
    name: 'Sant Namdev Payari',
    marathiName: 'संत नामदेव पायरी',
    category: 'historic',
    coordinates: [-4, 0.4, 15],
    graphNodeId: 'NAMDEV_STEPS',
    image: '/images/mandir.png',
    significance: 'First step to the temple where Sant Namdev took sanjeevan samadhi, symbolizing supreme humility where all pilgrims step upon his head before entering the mandir.',
    darshanTime: '24 Hours Open',
    crowdLevel: 'very_high',
    icon: 'Footprints',
    featured: true
  },

  // --- Ghats on Chandrabhaga River ---
  {
    id: 'CHANDRABHAGA_GHAT',
    name: 'Chandrabhaga Mahaghat',
    marathiName: 'चंद्रभागा महाघाट',
    category: 'ghat',
    coordinates: [95, -1.0, 0],
    graphNodeId: 'BHIMA_GHAT_MAIN',
    image: '/images/chandrabhaga_river.jpg',
    significance: 'Crescent bend of the sacred Bhima River; traditional holy snan (sacred bath) point where millions of Warkaris gather before temple darshan.',
    darshanTime: '24 Hours Open',
    crowdLevel: 'high',
    icon: 'Waves',
    featured: true
  },
  {
    id: 'VIPRA_DATTA_GHAT',
    name: 'Vipra Datta Ghat',
    marathiName: 'विप्र दत्त घाट',
    category: 'ghat',
    coordinates: [100, -1.0, -70],
    graphNodeId: 'VIPRA_GHAT',
    image: '/images/chandrabhaga_river.jpg',
    significance: 'Tranquil northern ghat named after Lord Dattatreya temple, favored for morning holy snan and evening river deepotsav.',
    darshanTime: '05:00 AM - 09:00 PM',
    crowdLevel: 'medium',
    icon: 'Waves'
  },
  {
    id: 'UDHAV_GHAT',
    name: 'Udhav Ghat',
    marathiName: 'उद्धव घाट',
    category: 'ghat',
    coordinates: [92, -1.0, 80],
    graphNodeId: 'UDHAV_GHAT_NODE',
    image: '/images/chandrabhaga_river.jpg',
    significance: 'Historic southern bathing ghat associated with Udhav and saint congregations during Ashadhi Ekadashi.',
    darshanTime: '24 Hours Open',
    crowdLevel: 'medium',
    icon: 'Waves'
  },

  // --- River Island & Bank Temples / Samadhis ---
  {
    id: 'PUNDALIKA_MANDIR',
    name: 'Bhakta Pundalik Mandir',
    marathiName: 'भक्त पुंडलिक मंदिर',
    category: 'temple',
    coordinates: [115, -0.6, 5],
    graphNodeId: 'PUNDALIK_NODE',
    image: '/images/chandrabhaga_river.jpg',
    significance: 'Riverside temple standing directly in the Chandrabhaga riverbed honoring Bhakta Pundalik who threw a brick (vit) for Lord Vitthal to wait upon.',
    darshanTime: '05:00 AM - 10:00 PM',
    crowdLevel: 'high',
    icon: 'Flame',
    featured: true
  },
  {
    id: 'SANT_JANABAI_SAMADHI',
    name: 'Sant Janabai Mandir',
    marathiName: 'संत जनाबाई मंदिर',
    category: 'samadhi',
    coordinates: [110, -0.6, 35],
    graphNodeId: 'JANABAI_NODE',
    significance: 'Sacred samadhi memorial of 13th-century saint-poet Janabai on the Chandrabhaga sands, close disciple of Namdev.',
    darshanTime: '06:00 AM - 09:00 PM',
    crowdLevel: 'medium',
    icon: 'BookOpen'
  },
  {
    id: 'SANT_BHANUDAS_SAMADHI',
    name: 'Sant Bhanudas Samadhi',
    marathiName: 'संत भानुदास समाधी',
    category: 'samadhi',
    coordinates: [108, -0.6, -30],
    graphNodeId: 'BHANUDAS_NODE',
    significance: 'Memorial of Sant Bhanudas who historically restored the Vitthal idol from the Vijayanagara Empire back to Pandharpur.',
    darshanTime: '06:00 AM - 08:30 PM',
    crowdLevel: 'low',
    icon: 'Award'
  },
  {
    id: 'SANT_CHOKHAMELA_SAMADHI',
    name: 'Sant Chokhamela Samadhi',
    marathiName: 'संत चोखामेळा समाधी',
    category: 'samadhi',
    coordinates: [-12, 0.1, 30],
    graphNodeId: 'CHOKHAMELA_NODE',
    significance: 'Samadhi of Warkari saint Chokhamela at Mahadwar entrance, revered by millions for devotional equality.',
    darshanTime: '24 Hours Open',
    crowdLevel: 'high',
    icon: 'Heart'
  },
  {
    id: 'MALLIKARJUNA_TEMPLE',
    name: 'Mallikarjuna Mahadev Mandir',
    marathiName: 'मल्लिकार्जुन महादेव मंदिर',
    category: 'temple',
    coordinates: [80, 0.1, -45],
    graphNodeId: 'MALLIKARJUNA_NODE',
    significance: 'Ancient Shiva shrine signifying the harmonious unity of Shaivism and Vaishnavism in Pandharpur.',
    darshanTime: '05:30 AM - 09:00 PM',
    crowdLevel: 'low',
    icon: 'Sparkles'
  },
  {
    id: 'GOPALKRISHNA_MANDIR',
    name: 'Gopalpur Gopalakrishna Mandir',
    marathiName: 'गोपाळपूर श्रीकृष्ण मंदिर',
    category: 'temple',
    coordinates: [45, 0.1, 138],
    graphNodeId: 'GOPALPUR_JUNCTION',
    significance: 'Historic hill shrine representing the cowshed of Lord Krishna where Kala (flattened rice prasad) is celebrated on Ashadhi Purnima.',
    darshanTime: '06:00 AM - 08:00 PM',
    crowdLevel: 'medium',
    icon: 'Sun'
  },
  {
    id: 'ISKCON_PANDHARPUR',
    name: 'ISKCON Chandrabhaga Temple',
    marathiName: 'इस्कॉन पंढरपूर मंदिर',
    category: 'temple',
    coordinates: [95, 0.1, -120],
    graphNodeId: 'ISKCON_NODE',
    significance: 'Majestic modern stone temple campus across Chandrabhaga with goshala, guest houses, and Vedic cultural center.',
    darshanTime: '04:30 AM - 08:30 PM',
    crowdLevel: 'medium',
    icon: 'Building2',
    featured: true
  },
  {
    id: 'KAIFIYAT_MATH',
    name: 'Chaitanya Maharaj Math',
    marathiName: 'चैतन्य महाराज मठ',
    category: 'math',
    coordinates: [55, 0.1, -75],
    graphNodeId: 'CHAITANYA_MATH_NODE',
    significance: 'Prominent spiritual study and bhajan center founded in the Warkari monastic tradition.',
    darshanTime: '06:00 AM - 08:00 PM',
    crowdLevel: 'low',
    icon: 'Home'
  },
  {
    id: 'TANPUROJI_BABA_MATH',
    name: 'Tanpure Maharaj Math',
    marathiName: 'तनपुरे महाराज मठ',
    category: 'math',
    coordinates: [-30, 0.1, -55],
    graphNodeId: 'TANPURE_MATH_NODE',
    significance: 'Renowned Warkari ashram known for Annachhatra (free community meals) during pilgrimage seasons.',
    darshanTime: '07:00 AM - 09:00 PM',
    crowdLevel: 'medium',
    icon: 'Utensils'
  },

  // --- City Junctions & Squares ---
  {
    id: 'SHIVAJI_CHOWK',
    name: 'Chhatrapati Shivaji Maharaj Chowk',
    marathiName: 'छत्रपती शिवाजी महाराज चौक',
    category: 'square',
    coordinates: [-55, 0, 0],
    graphNodeId: 'SHIVAJI_CHOWK',
    image: '/images/mahadwar_bazaar.jpg',
    significance: 'Central civic roundabout connecting the railway line, temple market bazaar, and northern rings with equestrian bronze statue.',
    darshanTime: '24 Hours Open',
    crowdLevel: 'high',
    icon: 'Navigation',
    featured: true
  },
  {
    id: 'SAVARKAR_CHOWK',
    name: 'Swatantryaveer Savarkar Chowk',
    marathiName: 'स्वातंत्र्यवीर सावरकर चौक',
    category: 'square',
    coordinates: [-120, 0, -30],
    graphNodeId: 'SAVARKAR_CHOWK',
    significance: 'Key junction on the western approach road near bus stations and lodging colonies.',
    darshanTime: '24 Hours Open',
    crowdLevel: 'medium',
    icon: 'Navigation'
  },
  {
    id: 'MAHADWAR_CHOWK',
    name: 'Mahadwar Chowk & Bazaar',
    marathiName: 'महाद्वार चौक व बाजार',
    category: 'square',
    coordinates: [-20, 0, 20],
    graphNodeId: 'MAHADWAR_NODE',
    image: '/images/mahadwar_bazaar.jpg',
    significance: 'Grand eastern gate access square filled with historic wooden wadas, tulsi garland sellers, puja samagri, and brass lamps.',
    darshanTime: '24 Hours Open',
    crowdLevel: 'very_high',
    icon: 'Store',
    featured: true
  },

  // --- Transport Terminals ---
  {
    id: 'PANDHARPUR_RAILWAY_STATION',
    name: 'Pandharpur Railway Station',
    marathiName: 'पंढरपूर रेल्वे स्थानक',
    category: 'transport',
    coordinates: [-170, 0, 65],
    graphNodeId: 'RAILWAY_STATION',
    significance: 'Central Railway terminus connecting Pandharpur to Mumbai, Pune, Solapur, and Miraj.',
    darshanTime: '24 Hours Open',
    crowdLevel: 'medium',
    icon: 'Train',
    featured: true
  },
  {
    id: 'MSRTC_BUS_STAND',
    name: 'Pandharpur Central Bus Stand (MSRTC)',
    marathiName: 'पंढरपूर मध्यवर्ती बस स्थानक',
    category: 'transport',
    coordinates: [-100, 0, 50],
    graphNodeId: 'BUS_TERMINAL',
    significance: 'State bus terminus handling over 250,000 pilgrims daily during Ashadhi Ekadashi peak fair.',
    darshanTime: '24 Hours Open',
    crowdLevel: 'high',
    icon: 'Bus',
    featured: true
  },

  // --- Pilgrims Accommodations & Gardens ---
  {
    id: 'BHAKTA_NIWAS_COMPLEX',
    name: 'Shree Gajanan Maharaj Bhakta Niwas',
    marathiName: 'श्री गजानन महाराज भक्त निवास',
    category: 'lodging',
    coordinates: [-60, 0, 90],
    graphNodeId: 'BHAKTA_NIWAS_NODE',
    significance: 'Large modern pilgrim guest complex providing clean rooms, mahaprasad, and locker facilities.',
    darshanTime: '24 Hours Reception',
    crowdLevel: 'medium',
    icon: 'Hotel',
    featured: true
  },
  {
    id: 'JIJABAI_UDYAN',
    name: 'Rashtramata Jijau Udyan',
    marathiName: 'राष्ट्रमाता जिजाऊ उद्यान',
    category: 'park',
    coordinates: [-45, 0, -80],
    graphNodeId: 'JIJABAI_GARDEN_NODE',
    significance: 'Pleasant municipal public park offering shade, rest pavilions, and drinking water kiosks.',
    darshanTime: '06:00 AM - 09:00 PM',
    crowdLevel: 'low',
    icon: 'Trees'
  },
  {
    id: 'PADMAVATI_LAKE',
    name: 'Padmavati Talao (Lake)',
    marathiName: 'पद्मावती तलाव',
    category: 'waterbody',
    coordinates: [-88, -0.4, 120],
    graphNodeId: 'PADMAVATI_LAKE_NODE',
    significance: 'Historic fresh-water reservoir built by Peshwa royalty to supply pilgrims during annual fairs.',
    darshanTime: '24 Hours Open',
    crowdLevel: 'low',
    icon: 'Droplet'
  }
];

export const LANDMARK_CATEGORIES = {
  temple: { label: 'Temples & Mandirs', color: '#f59e0b', icon: 'Sparkles' },
  ghat: { label: 'Chandrabhaga Ghats', color: '#06b6d4', icon: 'Waves' },
  samadhi: { label: 'Saint Samadhis', color: '#ec4899', icon: 'Heart' },
  math: { label: 'Warkari Mathas', color: '#8b5cf6', icon: 'Home' },
  square: { label: 'Chowks & Junctions', color: '#3b82f6', icon: 'Navigation' },
  transport: { label: 'Railway & Bus Hubs', color: '#10b981', icon: 'Bus' },
  lodging: { label: 'Bhakta Niwas & Stay', color: '#f97316', icon: 'Hotel' },
  park: { label: 'Gardens & Lakes', color: '#84cc16', icon: 'Trees' }
};

export function getLandmarkById(id) {
  return LANDMARKS.find(l => l.id === id);
}

export function getLandmarksByCategory(category) {
  return LANDMARKS.filter(l => l.category === category);
}
