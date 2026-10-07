import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import StatusChip from "@/components/base/StatusChip";
import InfoBanner from "@/components/feature/InfoBanner";
import { tasks } from "@/mocks/tasks";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="text-[11px] uppercase tracking-wide text-foreground-500">{label}</span>
      <span className="text-right text-[12.5px] font-medium text-foreground-900">{value}</span>
    </div>
  );
}

export default function TaskDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const task = tasks.find((item) => item.id === id);

  if (!task) {
    return (
      <div className="animate-fade-in pb-8">
        <PageHeader title="Task Detail" onBack={() => navigate("/tasks")} />
        <div className="px-4 pt-4">
          <div className="glass-panel rounded-lg p-8 text-center">
            <i className="ri-file-unknow-line text-[26px] text-foreground-400" />
            <p className="mt-2 text-sm font-semibold text-foreground-900">Task not found</p>
            <p className="mt-1 text-[11px] text-foreground-600">
              This task is not assigned to you or is no longer available.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isCompleted = task.status === "Completed";
  const done = task.checklist.filter((item) => item.done).length;

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader
        title="Task Detail"
        onBack={() => navigate("/tasks")}
        actions={<StatusChip label={task.priority} />}
      />

      <div className="space-y-4 px-4 pt-4">
        <div className="glass-panel rounded-lg p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10.5px] font-medium uppercase tracking-wide text-foreground-400">
                {task.id}
              </p>
              <p className="mt-1 font-heading text-base font-semibold leading-snug text-foreground-950">
                {task.title}
              </p>
            </div>
            <StatusChip label={task.status} />
          </div>
          <p className="mt-3 text-[12.5px] leading-relaxed text-foreground-700">
            {task.description}
          </p>
          <div className="mt-2 divide-y divide-foreground-500/10">
            <DetailRow label="Assigned By" value={task.assignedBy} />
            <DetailRow label="Assigned To" value={task.assignedTo} />
            <DetailRow label="Jurisdiction" value={task.jurisdiction} />
            <DetailRow label="Start Date" value={task.startDate} />
            <DetailRow label="Due Date" value={task.dueDate} />
            {task.linkedAsset ? <DetailRow label="Linked Asset" value={task.linkedAsset} /> : null}
          </div>
        </div>

        <div className="glass-panel rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
              Location
            </p>
            <i className="ri-map-pin-2-line text-[16px] text-primary-700" />
          </div>
          <p className="mt-2 text-[12.5px] text-foreground-800">{task.location}</p>
          {task.mapFocus ? (
            <button
              type="button"
              onClick={() => navigate(`/map?focus=${encodeURIComponent(task.mapFocus ?? "")}`)}
              className="glass-input mt-3 flex w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md py-2.5 text-xs font-semibold text-primary-800 transition-colors hover:bg-background-50/70"
            >
              <i className="ri-map-2-line text-[15px]" />
              View on Map
            </button>
          ) : null}
        </div>

        <div className="glass-panel rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
              Checklist
            </p>
            <span className="text-[11px] font-medium text-foreground-600">
              {done}/{task.checklist.length}
            </span>
          </div>
          <ul className="mt-3 space-y-2">
            {task.checklist.map((item) => (
              <li key={item.id} className="flex items-start gap-2.5">
                <span
                  className={`mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded border ${
                    item.done
                      ? "border-primary-600 bg-primary-600 text-background-50"
                      : "border-foreground-500/40"
                  }`}
                  style={{ width: "18px", height: "18px" }}
                >
                  {item.done ? <i className="ri-check-line text-[12px]" /> : null}
                </span>
                <span
                  className={`text-[12.5px] leading-relaxed ${
                    item.done ? "text-foreground-500 line-through" : "text-foreground-800"
                  }`}
                >
                  {item.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {task.instructions.length > 0 ? (
          <div className="glass-panel rounded-lg p-4">
            <p className="mb-2 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
              Instructions
            </p>
            <ul className="space-y-2">
              {task.instructions.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[12.5px] leading-relaxed text-foreground-800">
                  <i className="ri-chat-1-line mt-0.5 text-[14px] text-foreground-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="glass-panel rounded-lg p-4">
          <p className="mb-3 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            Task History
          </p>
          <ul className="relative space-y-4">
            {task.history.map((item, index) => (
              <li key={item.id} className="relative flex gap-3">
                {index < task.history.length - 1 ? (
                  <span className="absolute left-[7px] top-4 h-[calc(100%+8px)] w-px bg-foreground-500/15" />
                ) : null}
                <span className="relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-primary-600 bg-background-50" />
                <div className="min-w-0 flex-1">
                  <p className="text-[12.5px] font-semibold text-foreground-900">{item.action}</p>
                  <p className="text-[11px] text-foreground-500">
                    {item.time} · {item.by}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {isCompleted ? (
          <InfoBanner tone="primary" icon="ri-checkbox-circle-line">
            This task has been completed. Evidence is linked to the task, user, time and GPS.
          </InfoBanner>
        ) : (
          <button
            type="button"
            onClick={() => navigate(`/tasks/complete/${task.id}`)}
            className="w-full cursor-pointer whitespace-nowrap rounded-md bg-primary-600 py-3 font-label text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700"
          >
            Proceed with Task
          </button>
        )}
      </div>
    </div>
  );
}