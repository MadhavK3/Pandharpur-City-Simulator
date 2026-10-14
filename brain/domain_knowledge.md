# Domain Knowledge: Pandharpur Cartography & Cultural Context

## 1. Geographic and Spiritual Significance

Pandharpur is an ancient pilgrimage city in Solapur district, Maharashtra, located along the banks of the sacred **Bhima River**. Where the river curves in a gentle crescent shape around the temple town, it is reverently called the **Chandrabhaga** (literally "crescent moon river").

Pandharpur is the spiritual center of the **Warkari Sampradaya**, an egalitarian bhakti tradition founded by saints including Dnyaneshwar, Namdev, Tukaram, Eknath, and Chokhamela.

---

## 2. Core Sacred Landmarks

### 2.1. Shree Vitthal-Rukmini Mandir
- **Coordinates**: `[0, 0, 0]`
- **Significance**: The epicenter of the town housing Lord Vitthal (Vithoba) standing with hands on hips on an unbaked brick (veet) thrown by devotee Pundalik.
- **Architecture**: Hemadpanthi basalt stone carving, large sabha mandap, and ornate shikhara tower reaching 28 meters high.
- **Key Aarti Timings**:
  - 04:30 AM: Kakad Aarti (morning awakening)
  - 11:00 AM: Mahapooja
  - 07:00 PM: Dhup Aarti (evening incense)
  - 10:30 PM: Shej Aarti (night rest)

### 2.2. Sant Namdev Payari
- **Coordinates**: `[-4, 0.4, 15]`
- **Significance**: The first step of the eastern entrance. Sant Namdev chose to take sanjeevan samadhi beneath this threshold so that all arriving pilgrims would step upon his head, symbolizing complete humility and equality.

### 2.3. Chandrabhaga Mahaghat
- **Coordinates**: `[95, -1.0, 0]`
- **Significance**: The central and widest stone bathing ghat where pilgrims take the holy snan (dip) before beginning darshan queues.

### 2.4. Mahadwar Ghat & Bazaar
- **Coordinates**: `[65, -0.6, 22]`
- **Significance**: A bustling historic marketplace corridor crowded with stalls selling tulsi malas, bukka (black holy powder), pedha offerings, and devotional musical instruments (chipli and tal).

### 2.5. Pundalik Temple
- **Coordinates**: `[115, -1.6, 12]`
- **Significance**: Located on a stone island directly in the waters of the riverbed, dedicated to Bhakt Pundalik whose devotion drew Lord Vitthal to Pandharpur.

### 2.6. Vishnupad Temple
- **Coordinates**: `[75, -1.8, 110]`
- **Significance**: Upstream ghat featuring rocks embedded with sacred footprints attributed to Lord Krishna and the cows of Gokul.

---

## 3. Pilgrimage Dynamics & Routing Challenges

During the major annual Yatras (**Ashadhi Ekadashi** and **Kartiki Ekadashi**), over one million Warkaris arrive on foot carrying **Palkhis** (palanquins) from across Maharashtra.

### Logistical Challenges Modeled in the Simulation:
1. **Narrow Bazaar Corridors**: High pedestrian friction along Mahadwar Road creates natural bottlenecks.
2. **Dynamic Crowd Routing**: When peak density occurs, authorities erect temporary barricades to divert pilgrims through outer pradakshina rings.
3. **Emergency Corridor Maintenance**: Algorithmic MST calculation (Kruskal) identifies minimal-cost interconnected paths between transit terminals (ST Stand, Railway Station), medical camps, and river rescue points.

