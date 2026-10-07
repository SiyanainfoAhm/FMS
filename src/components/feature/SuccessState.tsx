interface SuccessStateProps {
  icon?: string;
  title: string;
  message: string;
  primaryLabel: string;
  onPrimary: () => void;
  secondaryLabel?: string;
  onSecondary?: () => void;
  note?: string;
}

export default function SuccessState({
  icon = "ri-check-line",
  title,
  message,
  primaryLabel,
  onPrimary,
  secondaryLabel,
  onSecondary,
  note,
}: SuccessStateProps) {
  return (
    <div className="fixed inset-0 z-40 flex justify-center">
      <div className="app-canvas relative flex w-full max-w-app flex-col items-center justify-center px-6">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-16 top-20 h-56 w-56 rounded-full bg-primary-400/35 blur-3xl" />
          <div className="absolute -right-14 bottom-24 h-56 w-56 rounded-full bg-accent-400/35 blur-3xl" />
        </div>

        <div className="glass-strong relative w-full animate-fade-in-up rounded-2xl border p-7 text-center">
          <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary-600 text-[32px] text-background-50">
            <i className={`${icon} leading-none`} />
          </span>
          <p className="mt-4 font-heading text-lg font-semibold text-foreground-950">{title}</p>
          <p className="mt-2 text-sm leading-relaxed text-foreground-600">{message}</p>

          {note ? (
            <div className="glass-accent mt-4 flex items-start gap-2 rounded-md px-3 py-2.5 text-left">
              <i className="ri-cloud-off-line mt-0.5 text-[15px] text-accent-900" />
              <p className="text-[11px] leading-relaxed text-accent-900">{note}</p>
            </div>
          ) : null}

          <button
            type="button"
            onClick={onPrimary}
            className="mt-6 w-full cursor-pointer whitespace-nowrap rounded-md bg-primary-600 py-3 font-label text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700"
          >
            {primaryLabel}
          </button>
          {secondaryLabel && onSecondary ? (
            <button
              type="button"
              onClick={onSecondary}
              className="glass-input mt-2.5 w-full cursor-pointer whitespace-nowrap rounded-md py-3 font-label text-sm font-medium text-foreground-700 transition-colors hover:bg-background-50/70"
            >
              {secondaryLabel}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}