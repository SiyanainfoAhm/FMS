interface ToggleRowProps {
  label: string;
  description?: string;
  icon?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function ToggleRow({
  label,
  description,
  icon = "ri-focus-3-line",
  checked,
  onChange,
}: ToggleRowProps) {
  return (
    <div className="glass-input flex items-center gap-3 rounded-lg p-3.5">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500/15 text-[18px] text-primary-800">
        <i className={`${icon} leading-none`} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-foreground-950">{label}</p>
        {description ? <p className="text-[11px] text-foreground-600">{description}</p> : null}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 shrink-0 cursor-pointer rounded-full border transition-colors ${
          checked ? "border-primary-600 bg-primary-600" : "border-foreground-500/25 bg-foreground-500/15"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-background-50 transition-all ${
            checked ? "left-[22px]" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}