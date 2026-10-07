interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export default function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="glass-panel rounded-lg px-6 py-10 text-center">
      <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-primary-500/25 bg-primary-500/15 text-[26px] text-primary-800">
        <i className={`${icon} leading-none`} />
      </span>
      <p className="mt-4 font-heading text-base font-semibold text-foreground-950">{title}</p>
      <p className="mx-auto mt-1.5 max-w-[280px] text-xs leading-relaxed text-foreground-600">
        {description}
      </p>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="mt-5 cursor-pointer whitespace-nowrap rounded-md bg-primary-600 px-5 py-2.5 text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}