interface StepHeaderProps {
  step: number;
  total: number;
  title?: string;
  onBack: () => void;
  backLabel?: string;
}

export default function StepHeader({
  step,
  total,
  title,
  onBack,
  backLabel = "Back",
}: StepHeaderProps) {
  const progress = Math.round((step / total) * 100);
  return (
    <div className="glass-bar sticky top-0 z-30 border-b px-4 py-3">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onBack}
          aria-label={backLabel}
          className="glass-input flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-md text-foreground-700 transition-colors hover:bg-background-50/70"
        >
          <i className="ri-arrow-left-line text-[18px]" />
        </button>
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline justify-between gap-2">
            <p className="truncate font-heading text-sm font-semibold text-foreground-950">
              {title ?? `Step ${step} of ${total}`}
            </p>
            <p className="font-label text-[11px] font-semibold tracking-wide text-primary-800">
              Step {step} of {total}
            </p>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-foreground-500/15">
            <div
              className="h-full rounded-full bg-primary-600 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}