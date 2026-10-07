import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import FormField from "@/components/base/FormField";
import TextArea from "@/components/base/TextArea";
import TextInput from "@/components/base/TextInput";
import FormActions from "@/components/feature/FormActions";
import SuccessState from "@/components/feature/SuccessState";
import InfoBanner from "@/components/feature/InfoBanner";
import { sampleObservations } from "@/mocks/patrol";
import { currentTimeHM, durationBetween, formatTime12 } from "@/lib/time";

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="text-[11px] uppercase tracking-wide text-foreground-500">{label}</span>
      <span className="text-right text-[12.5px] font-medium text-foreground-900">{value}</span>
    </div>
  );
}

export default function EndPatrolPage() {
  const navigate = useNavigate();
  const timeOut = localStorage.getItem("fms.patrol.timeOut") ?? "06:10";
  const [timeIn, setTimeIn] = useState(currentTimeHM);
  const [remarks, setRemarks] = useState("No adverse findings during the patrol.");
  const [error, setError] = useState("");
  const [completed, setCompleted] = useState(false);

  const handleComplete = () => {
    if (timeIn <= timeOut) {
      setError(`Time In cannot be earlier than Time Out (${formatTime12(timeOut)}).`);
      return;
    }
    setError("");
    setCompleted(true);
  };

  if (completed) {
    return (
      <SuccessState
        icon="ri-flag-2-line"
        title="Patrol completed successfully"
        message="Your foot patrol record for Beat Bamur has been recorded."
        note="Patrol saved on this device and will sync automatically when connectivity is available."
        primaryLabel="View Patrol History"
        onPrimary={() => navigate("/patrol/history")}
        secondaryLabel="Back to Home"
        onSecondary={() => navigate("/home")}
      />
    );
  }

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader
        title="End Patrol"
        onBack={() => navigate("/patrol/active")}
      />

      <div className="space-y-4 px-4 pt-4">
        <div className="glass-panel rounded-lg p-4">
          <p className="mb-1 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            Patrol summary
          </p>
          <div className="divide-y divide-foreground-500/10">
            <ReviewRow label="Date" value="01 Oct 2026" />
            <ReviewRow label="Range" value="Redhakhol" />
            <ReviewRow label="Section" value="Charmal" />
            <ReviewRow label="Beat" value="Bamur" />
            <ReviewRow label="Patrolling Type" value="Day" />
            <ReviewRow label="Staff / Team" value="Ramesh Pradhan (Forest Guard)" />
            <ReviewRow label="Patrolled Area" value="Bamur RF — Compartment 12" />
            <ReviewRow label="Time Out" value={formatTime12(timeOut)} />
            <ReviewRow label="Time In" value={formatTime12(timeIn)} />
            <ReviewRow label="Duration" value={durationBetween(timeOut, timeIn)} />
            <ReviewRow label="Distance" value="3.2 km (from GPS track)" />
            <ReviewRow label="Observations" value={`${sampleObservations.length} recorded`} />
            <ReviewRow label="Case / OR / UD No." value="Not applicable" />
          </div>
        </div>

        <div className="glass-panel rounded-lg p-4">
          <p className="mb-3 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            Route map
          </p>
          <div className="h-40 overflow-hidden rounded-md border border-background-50/50">
            <iframe
              title="Patrol route"
              src="https://www.google.com/maps?q=21.0861,84.3512&z=14&output=embed"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="glass-panel rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
              Observations
            </p>
            <button
              type="button"
              onClick={() => navigate("/patrol/observation")}
              className="cursor-pointer text-xs font-medium text-primary-700"
            >
              + Add
            </button>
          </div>
          <ul className="mt-2 space-y-2.5">
            {sampleObservations.map((item) => (
              <li key={item.id} className="glass-input rounded-md p-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-foreground-700">{item.time}</span>
                  <span className="text-[10.5px] text-foreground-500">{item.gps}</span>
                </div>
                <p className="mt-1 text-[12px] text-foreground-800">{item.note}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel space-y-4 rounded-lg p-4">
          <FormField
            label="Time In"
            required
            error={error}
            help={`Pre-filled from device time (${formatTime12(currentTimeHM())}).`}
          >
            <TextInput
              name="timeIn"
              type="time"
              icon="ri-time-line"
              value={timeIn}
              onChange={(event) => setTimeIn(event.target.value)}
              invalid={Boolean(error)}
            />
          </FormField>
          <FormField label="Remarks">
            <TextArea
              name="patrolRemarks"
              rows={2}
              value={remarks}
              onChange={(event) => setRemarks(event.target.value)}
            />
          </FormField>
        </div>

        <InfoBanner tone="neutral" icon="ri-cloud-off-line">
          If you are offline, the patrol is saved on this device and syncs automatically later.
        </InfoBanner>

        <FormActions>
          <button
            type="button"
            onClick={handleComplete}
            className="w-full cursor-pointer whitespace-nowrap rounded-md bg-primary-600 py-3 font-label text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700"
          >
            Complete Patrol
          </button>
          <button
            type="button"
            onClick={() => navigate("/patrol/active")}
            className="glass-input w-full cursor-pointer whitespace-nowrap rounded-md py-3 font-label text-sm font-medium text-foreground-700 transition-colors hover:bg-background-50/70"
          >
            Resume Patrol
          </button>
        </FormActions>
      </div>
    </div>
  );
}