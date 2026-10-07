import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import StatusChip from "@/components/base/StatusChip";
import { taskFilters, tasks } from "@/mocks/tasks";

export default function TasksPage() {
  const [filter, setFilter] = useState("open");

  const filtered = useMemo(() => {
    switch (filter) {
      case "due":
        return tasks.filter((task) => task.bucket === "today");
      case "overdue":
        return tasks.filter((task) => task.bucket === "overdue");
      case "completed":
        return tasks.filter((task) => task.bucket === "completed");
      default:
        return tasks.filter((task) => task.status !== "Completed");
    }
  }, [filter]);

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader title="My Tasks" />

      <div className="px-4 pt-4">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4">
          {taskFilters.map((item) => (
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
          {filtered.map((task) => {
            const done = task.checklist.filter((item) => item.done).length;
            const total = task.checklist.length;
            return (
              <Link
                key={task.id}
                to={`/tasks/detail/${task.id}`}
                className="glass-panel block cursor-pointer rounded-lg p-3.5 transition-colors hover:bg-background-50/75"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-[10.5px] font-medium uppercase tracking-wide text-foreground-400">
                      {task.id}
                    </p>
                    <p className="mt-1 text-sm font-semibold leading-snug text-foreground-950">
                      {task.title}
                    </p>
                  </div>
                  <StatusChip label={task.priority} />
                </div>

                <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-foreground-600">
                  <span className="flex items-center gap-1">
                    <i className="ri-calendar-line text-[12px]" />
                    {task.due}
                  </span>
                  <span className="flex items-center gap-1">
                    <i className="ri-map-pin-line text-[12px]" />
                    {task.location}
                  </span>
                </div>

                <div className="mt-2 flex items-center gap-1.5 text-[11px] text-foreground-500">
                  <i className="ri-user-star-line text-[13px]" />
                  Assigned by {task.assignedBy}
                </div>

                <div className="mt-3 flex items-center gap-3">
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-background-200">
                    <div
                      className="h-full rounded-full bg-primary-500"
                      style={{ width: `${total ? Math.round((done / total) * 100) : 0}%` }}
                    />
                  </div>
                  <span className="text-[11px] font-medium text-foreground-600">
                    {done}/{total}
                  </span>
                  <StatusChip label={task.status} />
                </div>
              </Link>
            );
          })}

          {filtered.length === 0 ? (
            <div className="glass-panel rounded-lg p-8 text-center">
              <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-primary-100 text-[22px] text-primary-700">
                <i className="ri-checkbox-circle-line" />
              </span>
              <p className="mt-3 text-sm font-semibold text-foreground-900">No assigned tasks</p>
              <p className="mt-1 text-[11px] text-foreground-600">
                No tasks match this filter right now.
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}