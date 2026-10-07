export const mapLayers = [
  { id: "boundary", label: "Protected Forest", icon: "ri-shield-line", active: true },
  { id: "range", label: "Range", icon: "ri-map-pin-range-line", active: true },
  { id: "beat", label: "Beat", icon: "ri-road-map-line", active: true },
  { id: "compartment", label: "Compartment", icon: "ri-layout-grid-line", active: false },
  { id: "assets", label: "Assets", icon: "ri-building-2-line", active: true },
  { id: "tasks", label: "Assigned Tasks", icon: "ri-clipboard-line", active: false },
  { id: "ortho", label: "Orthomosaic (approved)", icon: "ri-image-2-line", active: false },
];

export const baseMaps = [
  { id: "map", label: "Standard Map", icon: "ri-road-map-line" },
  { id: "ortho", label: "Orthomosaic", icon: "ri-image-2-line" },
];

// Simplified offline rows — a field user only needs the area name and one action.
export const offlinePackages = [
  { id: "pkg-1", name: "Redhakhol Range", action: "Download" },
  { id: "pkg-2", name: "Charmal Section", action: "Update" },
  { id: "pkg-3", name: "Bamur Orthomosaic", action: "Download" },
];

export const mapFeatures = [
  { id: "f-1", name: "FMS-RKH-1021 Water Tank", type: "Asset", detail: "Beat Bamur · Compartment 12" },
  { id: "f-2", name: "FMS-RKH-1042 Fire Line Gate", type: "Asset", detail: "Beat Bamur · Compartment 12" },
  { id: "f-3", name: "TSK-RKH-2041 Fire line clearance", type: "Task", detail: "Compartment 12 · Due today" },
  { id: "f-4", name: "Beat Bamur boundary", type: "Boundary", detail: "Charmal Section" },
  { id: "f-5", name: "Compartment 12", type: "Compartment", detail: "Charmal Section · Beat Bamur" },
];