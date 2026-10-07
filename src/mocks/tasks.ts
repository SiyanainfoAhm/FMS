export const taskFilters = [
  { id: "open", label: "Open" },
  { id: "due", label: "Due" },
  { id: "overdue", label: "Overdue" },
  { id: "completed", label: "Completed" },
];

export interface TaskChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface TaskHistoryItem {
  id: string;
  action: string;
  time: string;
  by: string;
}

export interface TaskRecord {
  id: string;
  title: string;
  description: string;
  priority: "High" | "Medium" | "Low";
  due: string;
  dueDate: string;
  startDate: string;
  assignedBy: string;
  assignedTo: string;
  jurisdiction: string;
  location: string;
  linkedAsset?: string;
  mapFocus?: string;
  status: "Pending" | "In Progress" | "Completed";
  bucket: "today" | "overdue" | "completed";
  checklist: TaskChecklistItem[];
  instructions: string[];
  history: TaskHistoryItem[];
}

export const tasks: TaskRecord[] = [
  {
    id: "TSK-RKH-2041",
    title: "Fire line clearance — Compartment 12",
    description:
      "Clear the fire line along the Compartment 12 boundary ahead of the dry season and report any gaps.",
    priority: "High",
    due: "Due today",
    dueDate: "01 Oct 2026",
    startDate: "30 Sep 2026",
    assignedBy: "Forester, Charmal",
    assignedTo: "Ramesh Pradhan (Forest Guard)",
    jurisdiction: "Range Redhakhol · Section Charmal · Beat Bamur",
    location: "Compartment 12, Beat Bamur",
    linkedAsset: "FMS-RKH-1042 Fire Line Gate",
    mapFocus: "Compartment 12",
    status: "In Progress",
    bucket: "today",
    checklist: [
      { id: "c1", label: "Clear both sides of the fire line", done: true },
      { id: "c2", label: "Remove dry leaf litter along the stretch", done: true },
      { id: "c3", label: "Check the fire line gate condition", done: false },
      { id: "c4", label: "Record any gaps wider than the guideline", done: false },
      { id: "c5", label: "Photograph completed stretch", done: false },
    ],
    instructions: [
      "Work from pillar 12a towards the seasonal nala.",
      "Report immediately if you see fresh elephant movement.",
    ],
    history: [
      { id: "h1", action: "Task assigned", time: "30 Sep 2026 · 09:10", by: "Forester, Charmal" },
      { id: "h2", action: "Task started", time: "01 Oct 2026 · 06:20", by: "Ramesh Pradhan" },
    ],
  },
  {
    id: "TSK-RKH-2038",
    title: "Boundary pillar repair verification",
    description: "Verify that boundary pillar No. 14 has been repaired by the works team.",
    priority: "Medium",
    due: "Due today",
    dueDate: "01 Oct 2026",
    startDate: "01 Oct 2026",
    assignedBy: "Range Officer, Redhakhol",
    assignedTo: "Ramesh Pradhan (Forest Guard)",
    jurisdiction: "Range Redhakhol · Section Charmal · Beat Kulundi",
    location: "Beat Kulundi",
    status: "Pending",
    bucket: "today",
    checklist: [
      { id: "c1", label: "Locate boundary pillar No. 14", done: false },
      { id: "c2", label: "Confirm repair is complete", done: false },
      { id: "c3", label: "Measure pillar condition", done: false },
      { id: "c4", label: "Photograph the repaired pillar", done: false },
    ],
    instructions: ["Carry the reference sketch of the pillar chainage."],
    history: [
      { id: "h1", action: "Task assigned", time: "01 Oct 2026 · 07:00", by: "Range Officer, Redhakhol" },
    ],
  },
  {
    id: "TSK-RKH-2025",
    title: "Water tank condition report",
    description: "Inspect the water tank and submit a condition report with a photograph.",
    priority: "Low",
    due: "Overdue by 1 day",
    dueDate: "30 Sep 2026",
    startDate: "28 Sep 2026",
    assignedBy: "Forester, Charmal",
    assignedTo: "Ramesh Pradhan (Forest Guard)",
    jurisdiction: "Range Redhakhol · Section Charmal · Beat Bamur",
    location: "Asset FMS-RKH-1021",
    linkedAsset: "FMS-RKH-1021 Water Tank",
    mapFocus: "FMS-RKH-1021 Water Tank",
    status: "Pending",
    bucket: "overdue",
    checklist: [
      { id: "c1", label: "Check tank structure for cracks", done: true },
      { id: "c2", label: "Check water level", done: false },
      { id: "c3", label: "Photograph the tank", done: false },
    ],
    instructions: ["The tank supplies the beat camp — report any leakage urgently."],
    history: [
      { id: "h1", action: "Task assigned", time: "28 Sep 2026 · 10:30", by: "Forester, Charmal" },
    ],
  },
  {
    id: "TSK-RKH-2010",
    title: "Elephant corridor watch — night beat",
    description: "Night watch along the elephant corridor stretch near Bamur village.",
    priority: "High",
    due: "Completed yesterday",
    dueDate: "30 Sep 2026",
    startDate: "30 Sep 2026",
    assignedBy: "Forester, Charmal",
    assignedTo: "Ramesh Pradhan (Forest Guard)",
    jurisdiction: "Range Redhakhol · Section Charmal · Beat Bamur",
    location: "Beat Bamur",
    status: "Completed",
    bucket: "completed",
    checklist: [
      { id: "c1", label: "Patrol the corridor stretch", done: true },
      { id: "c2", label: "Record movement signs", done: true },
      { id: "c3", label: "Report to control", done: true },
    ],
    instructions: [],
    history: [
      { id: "h1", action: "Task assigned", time: "30 Sep 2026 · 18:00", by: "Forester, Charmal" },
      { id: "h2", action: "Task completed", time: "30 Sep 2026 · 23:40", by: "Ramesh Pradhan" },
    ],
  },
  {
    id: "TSK-RKH-2002",
    title: "Nursery seedling count — Charmal",
    description: "Count and record the seedlings in the Charmal nursery bed.",
    priority: "Medium",
    due: "Completed 2 days ago",
    dueDate: "29 Sep 2026",
    startDate: "29 Sep 2026",
    assignedBy: "Range Officer, Redhakhol",
    assignedTo: "Ramesh Pradhan (Forest Guard)",
    jurisdiction: "Range Redhakhol · Section Charmal",
    location: "Section Charmal",
    status: "Completed",
    bucket: "completed",
    checklist: [
      { id: "c1", label: "Count seedlings per bed", done: true },
      { id: "c2", label: "Record survival percentage", done: true },
      { id: "c3", label: "Photograph the nursery", done: true },
    ],
    instructions: [],
    history: [
      { id: "h1", action: "Task assigned", time: "29 Sep 2026 · 08:00", by: "Range Officer, Redhakhol" },
      { id: "h2", action: "Task completed", time: "29 Sep 2026 · 15:10", by: "Ramesh Pradhan" },
    ],
  },
];