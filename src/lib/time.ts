/** Current device/system time as 24h "HH:MM". */
export function currentTimeHM(date: Date = new Date()): string {
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

/** "HH:MM" -> "07:42 AM" style label. */
export function formatTime12(value: string): string {
  const [rawHour, rawMinute] = value.split(":");
  const hour = Number(rawHour);
  const minute = rawMinute ?? "00";
  if (Number.isNaN(hour)) return value;
  const suffix = hour >= 12 ? "PM" : "AM";
  const display = hour % 12 === 0 ? 12 : hour % 12;
  return `${String(display).padStart(2, "0")}:${minute} ${suffix}`;
}

/** Duration between two "HH:MM" values as "2h 35m" (0m if invalid). */
export function durationBetween(from: string, to: string): string {
  const [fh, fm] = from.split(":").map(Number);
  const [th, tm] = to.split(":").map(Number);
  if ([fh, fm, th, tm].some((value) => Number.isNaN(value))) return "—";
  let minutes = th * 60 + tm - (fh * 60 + fm);
  if (minutes < 0) minutes += 24 * 60;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ${String(minutes % 60).padStart(2, "0")}m`;
}