export type GpsStatus = "idle" | "ok" | "low" | "denied" | "disabled";

interface GpsBlockProps {
  status: GpsStatus;
  accuracy?: number;
  capturedAt?: string;
  onCapture: () => void;
}

const config: Record<GpsStatus, { icon: string; tone: string; label: string }> = {
  idle: { icon: "ri-map-pin-line", tone: "text-foreground-600", label: "GPS not captured" },
  ok: { icon: "ri-map-pin-2-fill", tone: "text-primary-800", label: "GPS Captured" },
  low: { icon: "ri-signal-tower-line", tone: "text-accent-900", label: "Poor GPS accuracy" },
  denied: { icon: "ri-map-pin-2-line", tone: "text-secondary-800", label: "Location permission denied" },
  disabled: { icon: "ri-map-pin-2-line", tone: "text-secondary-800", label: "GPS disabled" },
};

export default function GpsBlock({ status, accuracy, capturedAt, onCapture }: GpsBlockProps) {
  const info = config[status];

  return (
    <div className="glass-input rounded-lg p-3.5">
      <div className="flex items-center gap-3">
        <span className={`flex h-9 w-9 items-center justify-center rounded-lg bg-foreground-500/10 text-[18px] ${info.tone}`}>
          <i className={`${info.icon} leading-none`} />
        </span>
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-semibold ${info.tone}`}>{info.label}</p>
          {status === "ok" ? (
            <p className="text-[11px] text-foreground-600">
              Accuracy: {accuracy ?? 6} m{capturedAt ? ` · ${capturedAt}` : ""}
            </p>
          ) : status === "low" ? (
            <p className="text-[11px] text-foreground-600">
              Accuracy: {accuracy ?? 48} m · move to an open area and retry
            </p>
          ) : status === "denied" ? (
            <p className="text-[11px] text-foreground-600">
              Allow location access in device settings to continue
            </p>
          ) : (
            <p className="text-[11px] text-foreground-600">
              Location is captured automatically — no typing needed
            </p>
          )}
        </div>
      </div>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={onCapture}
          className="flex flex-1 cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md bg-primary-600 py-2 text-xs font-semibold text-background-50 transition-colors hover:bg-primary-700"
        >
          <i className={`${status === "ok" ? "ri-refresh-line" : "ri-crosshair-2-line"} text-[14px]`} />
          {status === "ok" ? "Re-capture GPS" : "Capture GPS"}
        </button>
        {status === "denied" || status === "disabled" ? (
          <button
            type="button"
            className="glass-input flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 py-2 text-xs font-medium text-foreground-700 hover:bg-background-50/70"
          >
            <i className="ri-settings-3-line text-[14px]" />
            Settings
          </button>
        ) : null}
      </div>
    </div>
  );
}