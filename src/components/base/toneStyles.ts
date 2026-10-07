export type Tone = "primary" | "accent" | "secondary";

export const toneTile: Record<Tone, string> = {
  primary: "border-primary-500/25 bg-primary-500/18 text-primary-800",
  accent: "border-accent-500/35 bg-accent-500/22 text-accent-900",
  secondary: "border-secondary-500/25 bg-secondary-500/18 text-secondary-900",
};

export const toneDot: Record<Tone, string> = {
  primary: "bg-primary-500",
  accent: "bg-accent-500",
  secondary: "bg-secondary-500",
};

export const toneRing: Record<Tone, string> = {
  primary: "border-primary-500/25 bg-primary-500/12",
  accent: "border-accent-500/30 bg-accent-500/12",
  secondary: "border-secondary-500/25 bg-secondary-500/12",
};