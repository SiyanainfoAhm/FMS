// Mobile prototype accounts. FMS Mobile operational roles are Forest Guard and Forester only.
export const demoAccounts = [
  {
    key: "guard",
    role: "guard",
    label: "Forest Guard",
    name: "Ramesh Pradhan",
    userId: "FG-BAMUR-0231",
    beat: "Bamur",
  },
  {
    key: "forester",
    role: "forester",
    label: "Forester",
    name: "Sanjay Behera",
    userId: "FR-CHARMAL-0114",
    beat: "Charmal",
  },
];

// Web-only identities. These are NOT Mobile users; if typed at login the app shows a
// controlled message pointing them to the Web Management Portal.
export const webOnlyUserIds = ["RO-RKH-0007", "ACF-RKH-0003", "DFO-RKH-0001", "ADM-RKH-0001"];

export const webOnlyRoles = [
  "Range Officer",
  "ACF",
  "DFO",
  "FMS Administrator",
  "Control Room",
  "FMS Editor",
];