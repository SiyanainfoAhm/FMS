// Equipment assigned to the logged-in field user. Mobile is a field view only —
// creation, issue, return and maintenance remain Web-led.
export const assignedEquipment = [
  {
    id: "EQP-RKH-0412",
    name: "GPS Handset",
    type: "GPS Device",
    condition: "Good",
    status: "In use",
    assignedTo: "Ramesh Pradhan (Forest Guard)",
    location: "Beat Bamur — field",
    lastUpdate: "28 Sep 2026 · 08:15",
  },
  {
    id: "EQP-RKH-0455",
    name: "Binoculars 10x42",
    type: "Optics",
    condition: "Fair",
    status: "In use",
    assignedTo: "Ramesh Pradhan (Forest Guard)",
    location: "Beat Bamur camp",
    lastUpdate: "25 Sep 2026 · 17:40",
  },
  {
    id: "EQP-RKH-0488",
    name: "Fire Beater (Set of 3)",
    type: "Fire Control",
    condition: "Good",
    status: "In use",
    assignedTo: "Ramesh Pradhan (Forest Guard)",
    location: "Beat Bamur camp",
    lastUpdate: "20 Sep 2026 · 09:05",
  },
];

export const equipmentConditionOptions = [
  { value: "Good" },
  { value: "Fair" },
  { value: "Needs repair" },
  { value: "Damaged" },
];

export const equipmentLocationOptions = [
  { value: "Beat Bamur — field", hint: "Carried on patrol" },
  { value: "Beat Bamur camp", hint: "Stored at camp" },
  { value: "Section Charmal office", hint: "Handed at office" },
  { value: "Returned to store (Web)", hint: "Managed on Web" },
];