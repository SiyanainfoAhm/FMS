export const ranges = ["Redhakhol", "Kuchinda", "Barkot"];

export const sectionsByRange: Record<string, string[]> = {
  Redhakhol: ["Charmal", "Rairakhol", "Kulundi"],
  Kuchinda: ["Kuchinda", "Jamankira"],
  Barkot: ["Barkot", "Bileisarda"],
};

export const beatsBySection: Record<string, string[]> = {
  Charmal: ["Bamur", "Charmal", "Jharbandh"],
  Rairakhol: ["Rairakhol", "Salebhadi"],
  Kulundi: ["Kulundi", "Gariabahal"],
  Kuchinda: ["Kuchinda", "Bhalupali"],
  Jamankira: ["Jamankira", "Naulipada"],
  Barkot: ["Barkot", "Deogarh"],
  Bileisarda: ["Bileisarda", "Kansar"],
};

export const compartmentsByBeat: Record<string, string[]> = {
  Bamur: ["11", "12", "13", "14"],
  Charmal: ["31", "32", "33"],
  Jharbandh: ["41", "42"],
  Rairakhol: ["51", "52"],
  Salebhadi: ["61", "62"],
  Kulundi: ["21", "22"],
  Gariabahal: ["23", "24"],
  Kuchinda: ["71", "72"],
  Bhalupali: ["73", "74"],
  Jamankira: ["81", "82"],
  Naulipada: ["83", "84"],
  Barkot: ["91", "92"],
  Deogarh: ["93", "94"],
  Bileisarda: ["95", "96"],
  Kansar: ["97", "98"],
};