import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import FormField from "@/components/base/FormField";
import TextArea from "@/components/base/TextArea";
import FormActions from "@/components/feature/FormActions";
import GpsBlock, { type GpsStatus } from "@/components/feature/GpsBlock";
import MediaCapture, { type MediaItem } from "@/components/feature/MediaCapture";
import SuccessState from "@/components/feature/SuccessState";
import InfoBanner from "@/components/feature/InfoBanner";
import { tasks } from "@/mocks/tasks";

export default function TaskCompletePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const task = tasks.find((item) => item.id === id);

  const initialChecklist = useMemo(
    () => (task ? task.checklist.map((item) => ({ ...item })) : []),
    [task],
  );
  const [checklist, setChecklist] = useState(initialChecklist);
  const [remarks, setRemarks] = useState("");
  const [gpsStatus, setGpsStatus] = useState<GpsStatus>("ok");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);

  if (!task) {
    return (
      <div className="animate-fade-in pb-8">
        <PageHeader title="Complete Task" onBack={() => navigate("/tasks")} />
        <div className="px-4 pt-4">
          <div className="glass-panel rounded-lg p-8 text-center">
            <i className="ri-file-unknow-line text-[26px] text-foreground-400" />
            <p className="mt-2 text-sm font-semibold text-foreground-900">Task not found</p>
          </div>
        </div>
      </div>
    );
  }

  const allDone = checklist.length > 0 && checklist.every((item) => item.done);

  const toggleItem = (itemId: string) => {
    setChecklist((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, done: !item.done } : item)),
    );
    setError("");
  };

  const handleAddMedia = (type: MediaItem["type"]) => {
    setMedia((prev) => [
      ...prev,
      {
        id: `task-media-${prev.length + 1}`,
        type,
        url:
          type === "document"
            ? undefined
            : "https://readdy.ai/api/search-image?query=forest%20field%20work%20evidence%20photo%20of%20a%20cleared%20fire%20line%20track%20through%20green%20forest%20edge%2C%20documentary%20style%2C%20bright%20daylight&width=400&height=400&seq=fms-task-media&orientation=squarish",
        label: type === "photo" ? "Completion photo" : type === "video" ? "Completion clip" : "Attachment",
        state: "Saved on device",
      },
    ]);
  };

  const handleComplete = () => {
    if (!allDone) {
      setError("Complete every checklist item before finishing the task.");
      return;
    }
    setError("");
    setCompleted(true);
  };

  if (completed) {
    return (
      <SuccessState
        icon="ri-checkbox-circle-line"
        title="Task completed successfully"
        message={`${task.title} has been recorded with your completion evidence.`}
        note="Saved on this device. It will sync automatically when connectivity is available."
        primaryLabel="Back to My Tasks"
        onPrimary={() => navigate("/tasks")}
        secondaryLabel="Back to Home"
        onSecondary={() => navigate("/home")}
      />
    );
  }

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader title="Complete Task" onBack={() => navigate(`/tasks/detail/${task.id}`)} />

      <div className="space-y-4 px-4 pt-4">
        <div className="glass-panel rounded-lg p-4">
          <p className="text-[10.5px] font-medium uppercase tracking-wide text-foreground-400">
            {task.id}
          </p>
          <p className="mt-1 font-heading text-base font-semibold leading-snug text-foreground-950">
            {task.title}
          </p>
          <p className="mt-1 text-[11px] text-foreground-600">{task.location}</p>
        </div>

        <div className="glass-panel rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
              Checklist
            </p>
            <span className="text-[11px] font-medium text-foreground-600">
              {checklist.filter((item) => item.done).length}/{checklist.length}
            </span>
          </div>
          <ul className="mt-3 space-y-2">
            {checklist.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="flex w-full cursor-pointer items-start gap-2.5 rounded-md p-1.5 text-left transition-colors hover:bg-background-50/60"
                >
                  <span
                    className={`mt-0.5 flex shrink-0 items-center justify-center rounded border ${
                      item.done
                        ? "border-primary-600 bg-primary-600 text-background-50"
                        : "border-foreground-500/40"
                    }`}
                    style={{ width: "18px", height: "18px" }}
                  >
                    {item.done ? <i className="ri-check-line text-[12px]" /> : null}
                  </span>
                  <span className="text-[12.5px] leading-relaxed text-foreground-800">
                    {item.label}
                  </span>
                </button>
              </li>
            ))}
          </ul>
          {error ? (
            <p className="mt-3 flex items-start gap-1.5 text-[11px] font-medium text-secondary-700">
              <i className="ri-error-warning-line mt-[1px] text-[13px]" />
              {error}
            </p>
          ) : null}
        </div>

        <div className="glass-panel rounded-lg p-4">
          <FormField label="Completion Remarks">
            <TextArea
              name="completionRemarks"
              rows={3}
              value={remarks}
              onChange={(event) => setRemarks(event.target.value)}
              placeholder="Describe the work completed"
            />
          </FormField>
        </div>

        <div className="glass-panel rounded-lg p-4">
          <p className="mb-3 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            Evidence
          </p>
          <MediaCapture
            items={media}
            onAdd={handleAddMedia}
            onRemove={(mediaId) => setMedia((prev) => prev.filter((item) => item.id !== mediaId))}
          />
        </div>

        <div className="glass-panel rounded-lg p-4">
          <p className="mb-3 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            Location &amp; Time
          </p>
          <GpsBlock status={gpsStatus} accuracy={6} capturedAt="Now" onCapture={() => setGpsStatus("ok")} />
          <div className="mt-3 glass-input flex items-center justify-between rounded-md px-3 py-2.5">
            <span className="text-[11px] uppercase tracking-wide text-foreground-500">
              Completion Time
            </span>
            <span className="text-[13px] font-semibold text-foreground-900">Recorded on submit</span>
          </div>
        </div>

        <InfoBanner tone="neutral" icon="ri-cloud-off-line">
          If you are offline, the completion is saved on this device and syncs automatically later.
        </InfoBanner>

        <FormActions>
          <button
            type="button"
            onClick={handleComplete}
            className="w-full cursor-pointer whitespace-nowrap rounded-md bg-primary-600 py-3 font-label text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700"
          >
            Complete Task
          </button>
          <button
            type="button"
            onClick={() => navigate(`/tasks/detail/${task.id}`)}
            className="glass-input w-full cursor-pointer whitespace-nowrap rounded-md py-3 font-label text-sm font-medium text-foreground-700 transition-colors hover:bg-background-50/70"
          >
            Cancel
          </button>
        </FormActions>
      </div>
    </div>
  );
}