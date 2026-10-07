export const guardTodayWork = [
  {
    id: "w-1",
    title: "Foot Patrol — Beat Bamur",
    subtitle: "Day patrol · Beat Bamur",
    time: "Today · 06:00",
    type: "patrol",
    status: "Pending",
  },
  {
    id: "w-2",
    title: "Inspect Fire Line Gate",
    subtitle: "Asset FMS-RKH-1042 · Compartment 12",
    time: "Today · 11:00",
    type: "asset",
    status: "In Progress",
  },
  {
    id: "w-3",
    title: "Joint Patrol with TPWODL",
    subtitle: "Feeder 11 kV — Bamur village stretch",
    time: "Today · 16:00",
    type: "joint",
    status: "Pending",
  },
];

export const foresterTodayWork = [
  {
    id: "w-1",
    title: "Verify Patrol Records — Section Charmal",
    subtitle: "3 patrols submitted by field staff",
    time: "Today · 09:00",
    type: "patrol",
    status: "Pending",
  },
  {
    id: "w-2",
    title: "Inspect Watch Tower",
    subtitle: "Asset FMS-RKH-1088 · Beat Charmal",
    time: "Today · 12:30",
    type: "asset",
    status: "Pending",
  },
  {
    id: "w-3",
    title: "Assign Task — Boundary Pillar Repair",
    subtitle: "To Forest Guard, Beat Kulundi",
    time: "Today · 14:00",
    type: "task",
    status: "In Progress",
  },
];

// `to` opens a real page. Quick actions are field shortcuts only — Map lives in
// the bottom navigation and is not duplicated here.
export const guardQuickActions = [
  { id: "startPatrol", icon: "ri-walk-line", tone: "primary", to: "/patrol/start" },
  { id: "jointPatrol", icon: "ri-route-line", tone: "primary", to: "/joint-patrol" },
  { id: "assets", icon: "ri-building-2-line", tone: "accent", to: "/assets" },
  { id: "reportIncident", icon: "ri-alarm-warning-line", tone: "secondary", to: "/incidents" },
  { id: "sync", icon: "ri-refresh-line", tone: "accent" },
  { id: "myEquipment", icon: "ri-tools-line", tone: "secondary", to: "/equipment" },
];

export const foresterQuickActions = [
  { id: "startPatrol", icon: "ri-walk-line", tone: "primary", to: "/patrol/start" },
  { id: "jointPatrol", icon: "ri-route-line", tone: "primary", to: "/joint-patrol" },
  { id: "assets", icon: "ri-building-2-line", tone: "accent", to: "/assets" },
  { id: "reportIncident", icon: "ri-alarm-warning-line", tone: "secondary", to: "/incidents" },
  { id: "sync", icon: "ri-refresh-line", tone: "accent" },
  { id: "myEquipment", icon: "ri-tools-line", tone: "secondary", to: "/equipment" },
];