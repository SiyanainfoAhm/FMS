export const incidentTypes = [
  {
    id: "human-wildlife",
    title: "Human-Wildlife Incident",
    description: "Report human-wildlife conflict, injury, crop damage, or animal mortality.",
    icon: "ri-leaf-line",
    to: "/incidents/human-wildlife",
  },
  {
    id: "forest-fire",
    title: "Forest Fire",
    description: "Report a forest fire or fire incident observation in your jurisdiction.",
    icon: "ri-fire-line",
    to: "/incidents/forest-fire",
  },
];

export const hwIncidentKindOptions = [
  { value: "Human injury", hint: "Person injured by wildlife" },
  { value: "Crop / property damage", hint: "Depredation" },
  { value: "Animal mortality", hint: "Wild animal death" },
  { value: "Animal sighting / movement", hint: "Corridor movement" },
  { value: "Livestock depredation", hint: "Livestock loss" },
];

export const speciesOptions = [
  { value: "Elephant" },
  { value: "Tiger" },
  { value: "Leopard" },
  { value: "Sloth Bear" },
  { value: "Wild Boar" },
  { value: "Other" },
];

export const fireStatusOptions = [
  { value: "Active" },
  { value: "Under control" },
  { value: "Extinguished" },
  { value: "Under assessment" },
];

export const fireTypeOptions = [
  { value: "Ground fire" },
  { value: "Surface fire" },
  { value: "Crown fire" },
  { value: "Not determined" },
];