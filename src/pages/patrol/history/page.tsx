import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import StatusChip from "@/components/base/StatusChip";
import EmptyState from "@/components/feature/EmptyState";
import { patrolHistory } from "@/mocks/patrol";

const filters = [
  { id: "all", label: "All" },
  { id: "Day", label: "Day" },
  { id: "Night", label: "Night" },
  { id: "pending", label: "Pending sync" },
];

export default function PatrolHistoryPage() {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("all");

  const records = useMemo(() => {
    if (filter === "all") return patrolHistory;
    if (filter === "pending") return patrolHistory.filter((item) => item.status === "Pending sync");
    return patrolHistory.filter((item) => item.type === filter);
  }, [filter]);

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader
        title="Patrol History"
        onBack={() => navigate("/home")}
        actions={
          <button
            type="button"
            onClick={() => navigate("/patrol/start")}
            className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-md bg-primary-600 px-3 py-2 text-xs font-semibold text-background-50 transition-colors hover:bg-primary-700"
          >
            <i className="ri-add-line text-[15px]" />
            New
          </button>
        }
      />

      <div className="px-4 pt-4">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {filters.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFilter(item.id)}
              className={`whitespace-nowrap rounded-full border px-3.5 py-1.5 text-xs font-medium backdrop-blur-md transition-colors ${
                filter === item.id
                  ? "border-primary-600/50 bg-primary-600 text-background-50"
                  : "border-background-50/60 bg-background-50/45 text-foreground-600 hover:bg-background-50/75"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-4 space-y-2.5">
          {records.length === 0 ? (
            <EmptyState
              icon="ri-walk-line"
              title="No patrol history"
              description="No patrol records match this filter. Completed foot patrols will appear here."
              actionLabel="Start a Patrol"
              onAction={() => navigate("/patrol/start")}
            />
          ) : (
            records.map((record) => (
              <Link
                key={record.id}
                to={`/patrol/detail/${record.id}`}
                className="glass-panel block cursor-pointer rounded-lg p-3.5 transition-colors hover:bg-background-50/75"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10.5px] font-medium uppercase tracking-wide text-foreground-400">
                      {record.id}
                    </p>
                    <p className="mt-0.5 text-sm font-semibold text-foreground-950">
                      {record.date} · Beat {record.beat}
                    </p>
                    <p className="mt-0.5 truncate text-[11px] text-foreground-600">{record.area}</p>
                  </div>
                  <StatusChip label={record.type} />
                </div>

                <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-foreground-600">
                  <span className="flex items-center gap-1">
                    <i className="ri-time-line text-[12px]" />
                    {record.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="ri-route-line text-[12px]" />
                    {record.distance}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="ri-eye-line text-[12px]" />
                    {record.observations} observations
                  </span>
                </div>

                <div className="mt-2.5 flex items-center justify-between border-t border-foreground-500/10 pt-2.5">
                  <StatusChip label={record.status} />
                  <span className="text-[11px] font-medium text-primary-700">View detail</span>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}