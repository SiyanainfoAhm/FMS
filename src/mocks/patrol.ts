export const patrolTypeOptions = [
  { value: "Day", label: "Day", icon: "ri-sun-line" },
  { value: "Night", label: "Night", icon: "ri-moon-line" },
];

export const staffTeamOptions = [
  { value: "Ramesh Pradhan (Forest Guard)", hint: "Patrol lead · Beat Bamur" },
  { value: "Sanjay Behera (Forester)", hint: "Section Charmal" },
  { value: "Ramesh Pradhan + Bijay Naik (Helper)", hint: "2 members" },
  { value: "Ramesh Pradhan + Bijay Naik + Sukru Munda (Watcher)", hint: "3 members" },
];

export const patrolledAreaOptions = [
  { value: "Bamur RF — Compartment 12", hint: "Reserve Forest" },
  { value: "Bamur RF — Compartment 11 & 12", hint: "Reserve Forest" },
  { value: "Charmal RF boundary line", hint: "Reserve Forest" },
  { value: "Bamur — elephant corridor stretch", hint: "Corridor" },
];

export const caseReferenceOptions = [
  { value: "Not applicable", hint: "Ordinary patrol" },
  { value: "OR No. 14/2026", hint: "Offence Register" },
  { value: "UD No. 03/2026", hint: "Unnatural Death" },
];

export const patrolHistory = [
  {
    id: "PTR-RKH-30421",
    date: "30 Sep 2026",
    type: "Day",
    beat: "Bamur",
    area: "Bamur RF — Compartment 12",
    range: "Redhakhol",
    section: "Charmal",
    duration: "2h 35m",
    distance: "4.8 km",
    status: "Synced",
    timeOut: "06:10",
    timeIn: "08:45",
    staff: "Ramesh Pradhan (Forest Guard), Bijay Naik (Helper)",
    observations: 2,
    caseRef: "Not applicable",
    remarks: "No adverse findings. Fresh elephant movement noticed near the seasonal nala.",
  },
  {
    id: "PTR-RKH-30418",
    date: "29 Sep 2026",
    type: "Night",
    beat: "Bamur",
    area: "Bamur — elephant corridor stretch",
    range: "Redhakhol",
    section: "Charmal",
    duration: "1h 50m",
    distance: "3.1 km",
    status: "Synced",
    timeOut: "21:30",
    timeIn: "23:20",
    staff: "Ramesh Pradhan (Forest Guard)",
    observations: 1,
    caseRef: "OR No. 14/2026",
    remarks: "Illegal firewood collection intercepted on the corridor edge. Reported to Forester.",
  },
  {
    id: "PTR-RKH-30409",
    date: "27 Sep 2026",
    type: "Day",
    beat: "Charmal",
    area: "Charmal RF boundary line",
    range: "Redhakhol",
    section: "Charmal",
    duration: "3h 05m",
    distance: "6.2 km",
    status: "Pending sync",
    timeOut: "06:00",
    timeIn: "09:05",
    staff: "Ramesh Pradhan (Forest Guard), Sukru Munda (Watcher)",
    observations: 3,
    caseRef: "Not applicable",
    remarks: "Boundary pillar No. 14 found intact. Fire line needs maintenance near pillar 16.",
  },
  {
    id: "PTR-RKH-30388",
    date: "24 Sep 2026",
    type: "Day",
    beat: "Bamur",
    area: "Bamur RF — Compartment 11 & 12",
    range: "Redhakhol",
    section: "Charmal",
    duration: "2h 10m",
    distance: "4.1 km",
    status: "Synced",
    timeOut: "06:15",
    timeIn: "08:25",
    staff: "Ramesh Pradhan (Forest Guard)",
    observations: 0,
    caseRef: "Not applicable",
    remarks: "Routine patrol. No findings.",
  },
];

export const sampleObservations = [
  {
    id: "obs-1",
    time: "06:42",
    note: "Fresh elephant dung and tracks observed crossing the forest road.",
    gps: "21.0861° N, 84.3512° E · ± 5 m",
    caseRef: "Not applicable",
  },
  {
    id: "obs-2",
    time: "07:25",
    note: "Minor damage to fire line gate near Compartment 12 boundary.",
    gps: "21.0889° N, 84.3478° E · ± 7 m",
    caseRef: "Not applicable",
  },
];