export type Language = "en" | "od";

const en: Record<string, string> = {
  "nav.home": "Home",
  "nav.map": "Map",
  "nav.tasks": "Tasks",
  "nav.more": "More",

  "home.goodMorning": "Good morning",
  "home.goodAfternoon": "Good afternoon",
  "home.goodEvening": "Good evening",
  "home.todayWork": "Today's Work",
  "home.quickActions": "Quick Actions",
  "home.viewTasks": "View tasks",

  "action.startPatrol": "Start Patrol",
  "action.jointPatrol": "Joint Patrol",
  "action.assignTask": "Assign Task",
  "action.assets": "Assets",
  "action.reportIncident": "Report Incident",
  "action.map": "Map",
  "action.sync": "Sync",
  "action.myEquipment": "My Equipment",

  "profile.title": "Profile",
  "profile.user": "User",
  "profile.security": "Security",
  "profile.accountActions": "Account",
  "profile.account": "Account",
  "profile.name": "Name",
  "profile.role": "Role",
  "profile.userId": "User ID",
  "profile.range": "Range",
  "profile.section": "Section",
  "profile.beat": "Beat",
  "profile.language": "Language",
  "profile.languageNote": "Odia labels are provisional pending Department-approved translations.",
  "profile.changePassword": "Change / Reset Password",
  "profile.changePasswordNote": "Opens the approved password reset flow.",
  "profile.signOut": "Sign Out",
  "profile.signOutConfirm": "Sign out of FMS Field?",

  "common.syncDone": "Sync completed successfully.",
  "common.syncUpToDate": "Everything is up to date.",
  "common.syncing": "Syncing…",
  "common.cancel": "Cancel",
};

// Provisional Odia labels — pending Department-approved translations.
const od: Record<string, string> = {
  "nav.home": "ମୂଳପୃଷ୍ଠା",
  "nav.map": "ମାନଚିତ୍ର",
  "nav.tasks": "କାର୍ଯ୍ୟ",
  "nav.more": "ଅଧିକ",

  "home.goodMorning": "ଶୁଭ ସକାଳ",
  "home.goodAfternoon": "ଶୁଭ ଅପରାହ୍ନ",
  "home.goodEvening": "ଶୁଭ ସନ୍ଧ୍ୟା",
  "home.todayWork": "ଆଜିର କାର୍ଯ୍ୟ",
  "home.quickActions": "ଶୀଘ୍ର କାର୍ଯ୍ୟ",
  "home.viewTasks": "କାର୍ଯ୍ୟ ଦେଖନ୍ତୁ",

  "action.startPatrol": "ପାଦ ପାଟ୍ରୋଲିଂ ଆରମ୍ଭ",
  "action.jointPatrol": "ମିଳିତ ପାଟ୍ରୋଲିଂ",
  "action.assignTask": "କାର୍ଯ୍ୟ ଦିଅନ୍ତୁ",
  "action.assets": "ସମ୍ପତ୍ତି",
  "action.reportIncident": "ଘଟଣା ଜଣାନ୍ତୁ",
  "action.map": "ମାନଚିତ୍ର",
  "action.sync": "ସିଙ୍କ",
  "action.myEquipment": "ମୋର ଉପକରଣ",

  "profile.title": "ପ୍ରୋଫାଇଲ",
  "profile.user": "ବ୍ୟବହାରକାରୀ",
  "profile.security": "ସୁରକ୍ଷା",
  "profile.accountActions": "ଖାତା",
  "profile.account": "ଖାତା",
  "profile.name": "ନାମ",
  "profile.role": "ଭୂମିକା",
  "profile.userId": "ବ୍ୟବହାରକାରୀ ID",
  "profile.range": "ରେଞ୍ଜ",
  "profile.section": "ସେକ୍ସନ",
  "profile.beat": "ବିଟ୍",
  "profile.language": "ଭାଷା",
  "profile.languageNote": "ଓଡ଼ିଆ ଲେବଲ୍ ଅସ୍ଥାୟୀ — ବିଭାଗ ଅନୁମୋଦିତ ଅନୁବାଦ ପର୍ଯ୍ୟନ୍ତ।",
  "profile.changePassword": "ପାସୱାର୍ଡ ବଦଳାନ୍ତୁ",
  "profile.changePasswordNote": "ଅନୁମୋଦିତ ପାସୱାର୍ଡ ରିସେଟ୍ ପ୍ରକ୍ରିୟା ଖୋଲେ।",
  "profile.signOut": "ସାଇନ୍ ଆଉଟ୍",
  "profile.signOutConfirm": "FMS Field ରୁ ସାଇନ୍ ଆଉଟ୍ କରିବେ?",

  "common.syncDone": "ସିଙ୍କ ସଫଳ ହେଲା।",
  "common.syncUpToDate": "ସମସ୍ତ କିଛି ଅଦ୍ୟତନ ଅଛି।",
  "common.syncing": "ସିଙ୍କ ହେଉଛି…",
  "common.cancel": "ବାତିଲ୍",
};

export const translations: Record<Language, Record<string, string>> = { en, od };

export function translate(language: Language, key: string): string {
  return translations[language]?.[key] ?? translations.en[key] ?? key;
}