export const jointPatrolHistory = [
  {
    id: "JP-RKH-1120",
    date: "30 Sep 2026",
    feeder: "Bamur 11 kV feeder",
    stretch: "Bamur village — Compartment 12 edge",
    range: "Redhakhol",
    section: "Charmal",
    hazards: 3,
    status: "Submitted",
  },
  {
    id: "JP-RKH-1114",
    date: "26 Sep 2026",
    feeder: "Charmal 33 kV line",
    stretch: "Charmal RF boundary — pole 42 to 48",
    range: "Redhakhol",
    section: "Charmal",
    hazards: 1,
    status: "Closed",
  },
  {
    id: "JP-RKH-1102",
    date: "21 Sep 2026",
    feeder: "Kulundi 11 kV feeder",
    stretch: "Kulundi beat — nala crossing",
    range: "Redhakhol",
    section: "Kulundi",
    hazards: 2,
    status: "Pending sync",
  },
];

export const jointTeamOptions = [
  { value: "Ramesh Pradhan (Forest Guard) + TPWODL Lineman", hint: "2 members · joint team" },
  { value: "Ramesh Pradhan (Forest Guard) + Forester, Charmal", hint: "2 members · forest team" },
  { value: "Forest + TPWODL team (4 members)", hint: "Joint inspection team" },
];

export const feederLineOptions = [
  { value: "Bamur 11 kV feeder", hint: "TPWODL" },
  { value: "Charmal 33 kV line", hint: "TPWODL" },
  { value: "Kulundi 11 kV feeder", hint: "TPWODL" },
  { value: "Rairakhol 33 kV line", hint: "TPWODL" },
];

export const hazardTypeOptions = [
  { value: "Tree touching / close to conductor", hint: "Vegetation clearance needed" },
  { value: "Sagging conductor", hint: "Line clearance" },
  { value: "Broken / damaged insulator", hint: "TPWODL repair" },
  { value: "Jhum / dry vegetation near line", hint: "Fire risk" },
  { value: "Leaning pole / structure", hint: "Structure safety" },
];

export const hazardSeverityOptions = [
  { value: "Low" },
  { value: "Medium" },
  { value: "High" },
];

export const followUpActionOptions = [
  { value: "Reported to TPWODL for action", hint: "No field switching by FMS" },
  { value: "Vegetation clearance scheduled", hint: "Forest team" },
  { value: "Joint re-inspection required", hint: "Follow-up visit" },
  { value: "No further action required", hint: "Observation only" },
];

// Physical electricity switching is NOT performed by FMS — Department note only.
export const jointPatrolNote =
  "FMS records electrical hazard observations only. Physical electricity switching is performed by TPWODL staff, never by FMS users.";