interface StatusChipProps {
  label: string;
  className?: string;
}

const chipStyles: Record<string, string> = {
  Pending: "border-accent-500/35 bg-accent-500/22 text-accent-900",
  "In Progress": "border-primary-500/30 bg-primary-500/18 text-primary-800",
  Completed: "border-primary-500/25 bg-primary-500/14 text-primary-800",
  Ready: "border-primary-500/30 bg-primary-500/18 text-primary-800",
  "Update available": "border-accent-500/35 bg-accent-500/22 text-accent-900",
  "Not downloaded": "border-foreground-500/25 bg-foreground-500/10 text-foreground-700",
  "Last synced": "border-primary-500/30 bg-primary-500/18 text-primary-800",
  High: "border-secondary-600/50 bg-secondary-700/90 text-background-50",
  Medium: "border-secondary-500/30 bg-secondary-500/22 text-secondary-900",
  Low: "border-foreground-500/25 bg-foreground-500/10 text-foreground-600",
  Active: "border-primary-500/40 bg-primary-600/85 text-background-50",
  Night: "border-secondary-600/45 bg-secondary-800/80 text-background-50",
  Day: "border-accent-500/45 bg-accent-500/30 text-accent-950",
};

export default function StatusChip({ label, className = "" }: StatusChipProps) {
  const style =
    chipStyles[label] ?? "border-foreground-500/20 bg-foreground-500/10 text-foreground-700";
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full border px-2.5 py-0.5 font-label text-[11px] font-semibold tracking-wide backdrop-blur-md ${style} ${className}`}
    >
      {label}
    </span>
  );
}