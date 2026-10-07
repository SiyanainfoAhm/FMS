import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StatusChip from "@/components/base/StatusChip";
import InfoBanner from "@/components/feature/InfoBanner";

function formatDuration(totalSeconds: number) {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

const actions = [
  { id: "observation", label: "Add Observation", icon: "ri-add-line", to: "/patrol/observation", primary: true },
  { id: "route", label: "View Current Route", icon: "ri-route-line", to: "", primary: false },
  { id: "incident", label: "Report Incident", icon: "ri-alarm-warning-line", to: "", primary: false },
  { id: "end", label: "End Patrol", icon: "ri-flag-2-line", to: "/patrol/end", primary: false },
];

export default function ActivePatrolPage() {
  const navigate = useNavigate();
  const [seconds, setSeconds] = useState(2 * 3600 + 35 * 60);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    const timer = setInterval(() => setSeconds((value) => value + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-fade-in pb-8">
      <div className="relative h-72 overflow-hidden border-b border-background-50/40">
        <iframe
          title="Active patrol route map"
          src="https://www.google.com/maps?q=21.0861,84.3512&z=15&output=embed"
          className="h-full w-full"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="glass-primary-fill absolute left-4 top-4 flex items-center gap-2 rounded-full px-3 py-1.5 text-background-50">
          <span className="h-2 w-2 animate-pulse-soft rounded-full bg-accent-400" />
          <span className="font-label text-[11px] font-semibold uppercase tracking-[0.12em]">
            Patrol Active
          </span>
        </div>
        <div className="glass-bar absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-md border">
          <i className="ri-focus-3-line text-[18px] text-primary-800" />
        </div>
        <div className="glass-bar absolute bottom-3 left-4 flex items-center gap-2 rounded-md border px-3 py-1.5">
          <i className="ri-route-line text-[15px] text-primary-800" />
          <span className="text-[11px] font-medium text-foreground-800">Route line recording</span>
        </div>
      </div>

      <div className="space-y-4 px-4 pt-4">
        <div className="glass-panel rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
                Live patrol
              </p>
              <p className="mt-1 font-heading text-2xl font-semibold tabular-nums text-foreground-950">
                {formatDuration(seconds)}
              </p>
            </div>
            <StatusChip label="Day" />
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="glass-input rounded-md px-3 py-2">
              <p className="text-[10px] uppercase tracking-wide text-foreground-500">Start Time</p>
              <p className="text-[13px] font-semibold text-foreground-900">06:10</p>
            </div>
            <div className="glass-input rounded-md px-3 py-2">
              <p className="text-[10px] uppercase tracking-wide text-foreground-500">Distance</p>
              <p className="text-[13px] font-semibold text-foreground-900">3.2 km</p>
            </div>
            <div className="glass-input rounded-md px-3 py-2">
              <p className="text-[10px] uppercase tracking-wide text-foreground-500">Observations</p>
              <p className="text-[13px] font-semibold text-foreground-900">2</p>
            </div>
          </div>
          <p className="mt-2 text-[11px] text-foreground-500">
            Distance is calculated only from a valid GPS track.
          </p>
        </div>

        <div className="glass-panel rounded-lg p-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500/15 text-[18px] text-primary-800">
              <i className="ri-navigation-fill leading-none" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-foreground-950">Current Location</p>
              <p className="text-[11px] text-foreground-600">
                21.0861° N, 84.3512° E · Beat Bamur
              </p>
            </div>
            <StatusChip label="GPS ± 6 m" className="border-primary-500/30 bg-primary-500/18 text-primary-800" />
          </div>
        </div>

        {notice ? (
          <InfoBanner tone="primary" icon="ri-information-line">
            {notice}
          </InfoBanner>
        ) : null}

        <div className="glass-panel rounded-lg p-3">
          <div className="grid grid-cols-2 gap-2.5">
            {actions.map((action) => (
              <button
                key={action.id}
                type="button"
                onClick={() => {
                  if (action.to) {
                    navigate(action.to);
                  } else if (action.id === "route") {
                    setNotice("The recorded route line is shown on the map above and updates as you walk.");
                  } else {
                    navigate("/incidents");
                  }
                }}
                className={`flex cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg px-3 py-3 text-xs font-semibold transition-colors ${
                  action.primary
                    ? "bg-primary-600 text-background-50 hover:bg-primary-700"
                    : "glass-input text-foreground-800 hover:bg-background-50/70"
                }`}
              >
                <i className={`${action.icon} text-[16px]`} />
                {action.label}
              </button>
            ))}
          </div>
        </div>

        <InfoBanner tone="neutral" icon="ri-cloud-off-line">
          Patrol data and GPS track are saved on this device and will sync automatically when
          connectivity is available.
        </InfoBanner>
      </div>
    </div>
  );
}