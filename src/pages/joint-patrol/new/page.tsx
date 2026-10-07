import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepHeader from "@/components/feature/StepHeader";
import FormField from "@/components/base/FormField";
import LookupField from "@/components/base/LookupField";
import SegmentedField from "@/components/base/SegmentedField";
import TextArea from "@/components/base/TextArea";
import TextInput from "@/components/base/TextInput";
import FormActions from "@/components/feature/FormActions";
import MediaCapture, { type MediaItem } from "@/components/feature/MediaCapture";
import InfoBanner from "@/components/feature/InfoBanner";
import SuccessState from "@/components/feature/SuccessState";
import { currentTimeHM, formatTime12 } from "@/lib/time";
import {
  feederLineOptions,
  followUpActionOptions,
  hazardSeverityOptions,
  hazardTypeOptions,
  jointPatrolNote,
  jointTeamOptions,
} from "@/mocks/jointPatrol";

interface HazardEntry {
  id: string;
  type: string;
  severity: string;
  note: string;
}

const TOTAL_STEPS = 4;
const stepTitles = [
  "Team & Location",
  "Electrical Hazard Observations",
  "Follow-up",
  "Review & Submit",
];

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="text-[11px] uppercase tracking-wide text-foreground-500">{label}</span>
      <span className="text-right text-[12.5px] font-medium text-foreground-900">{value}</span>
    </div>
  );
}

export default function NewJointPatrolPage() {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [date, setDate] = useState("2026-10-01");
  const [team, setTeam] = useState("");
  const [feeder, setFeeder] = useState("");
  const [stretch, setStretch] = useState("");
  const [timeOut, setTimeOut] = useState(currentTimeHM);
  const [hazards, setHazards] = useState<HazardEntry[]>([
    { id: "hz-1", type: "", severity: "", note: "" },
  ]);
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [followUpAction, setFollowUpAction] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const updateHazard = (id: string, patch: Partial<HazardEntry>) => {
    setHazards((prev) => prev.map((item) => (item.id === id ? { ...item, ...patch } : item)));
  };

  const addHazard = () => {
    setHazards((prev) => [...prev, { id: `hz-${prev.length + 1}`, type: "", severity: "", note: "" }]);
  };

  const removeHazard = (id: string) => {
    setHazards((prev) => (prev.length > 1 ? prev.filter((item) => item.id !== id) : prev));
  };

  const validateStep = (current: number): boolean => {
    const next: Record<string, string> = {};
    if (current === 1) {
      if (!team) next.team = "Select the joint patrol team.";
      if (!feeder) next.feeder = "Select the feeder / line inspected.";
    }
    if (current === 2) {
      if (!hazards.some((item) => item.type)) {
        next.hazards = "Record at least one electrical hazard observation.";
      }
    }
    if (current === 3 && !followUpAction) {
      next.followUpAction = "Select the follow-up action.";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const goNext = () => {
    if (!validateStep(step)) return;
    setStep((prev) => Math.min(prev + 1, TOTAL_STEPS));
  };

  const goBack = () => {
    if (step === 1) {
      navigate("/joint-patrol");
      return;
    }
    setStep((prev) => prev - 1);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <SuccessState
        icon="ri-route-line"
        title="Joint Patrol submitted successfully"
        message="The joint patrol record and electrical hazard observations have been recorded."
        note="Saved on this device. It will sync automatically when connectivity is available."
        primaryLabel="Back to Joint Patrol"
        onPrimary={() => navigate("/joint-patrol")}
        secondaryLabel="Back to Home"
        onSecondary={() => navigate("/home")}
      />
    );
  }

  const addMedia = (type: MediaItem["type"]) => {
    setMedia((prev) => [
      ...prev,
      {
        id: `jp-media-${prev.length + 1}`,
        type,
        url:
          type === "document"
            ? undefined
            : "https://readdy.ai/api/search-image?query=electrical%20transmission%20pole%20with%20vegetation%20close%20to%20the%20conductor%20beside%20a%20forest%20road%2C%20documentary%20field%20photograph%2C%20daylight%2C%20earthy%20green%20tones&width=400&height=400&seq=fms-joint-patrol-media&orientation=squarish",
        label: "Hazard photo",
        state: "Saved on device",
      },
    ]);
  };

  return (
    <div className="animate-fade-in pb-8">
      <StepHeader step={step} total={TOTAL_STEPS} title={stepTitles[step - 1]} onBack={goBack} />

      <div className="space-y-4 px-4 pt-4">
        {step === 1 ? (
          <div className="glass-panel space-y-4 rounded-lg p-4">
            <FormField label="Date" htmlFor="jp-date" required>
              <TextInput
                id="jp-date"
                name="jpDate"
                type="date"
                icon="ri-calendar-line"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </FormField>

            <LookupField
              label="Joint Team"
              required
              value={team}
              placeholder="Select joint team"
              options={jointTeamOptions}
              onChange={setTeam}
              error={errors.team}
              icon="ri-group-line"
            />

            <LookupField
              label="Feeder / Line"
              required
              value={feeder}
              placeholder="Select TPWODL feeder / line"
              options={feederLineOptions}
              onChange={setFeeder}
              error={errors.feeder}
              icon="ri-flashlight-line"
            />

            <FormField label="Location / Stretch" htmlFor="jp-stretch">
              <TextInput
                id="jp-stretch"
                name="jpStretch"
                icon="ri-map-pin-line"
                value={stretch}
                onChange={(event) => setStretch(event.target.value)}
                placeholder="e.g. Bamur village — Compartment 12 edge"
              />
            </FormField>

            <FormField
              label="Time Out"
              required
              help={`Pre-filled from device time (${formatTime12(currentTimeHM())}).`}
            >
              <TextInput
                name="jpTimeOut"
                type="time"
                icon="ri-time-line"
                value={timeOut}
                onChange={(event) => setTimeOut(event.target.value)}
              />
            </FormField>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <InfoBanner tone="neutral" icon="ri-information-line">
              {jointPatrolNote}
            </InfoBanner>

            {hazards.map((hazard, index) => (
              <div key={hazard.id} className="glass-panel space-y-4 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <p className="font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
                    Observation {index + 1}
                  </p>
                  {hazards.length > 1 ? (
                    <button
                      type="button"
                      onClick={() => removeHazard(hazard.id)}
                      className="cursor-pointer text-[11px] font-medium text-secondary-700"
                    >
                      Remove
                    </button>
                  ) : null}
                </div>

                <LookupField
                  label="Electrical Hazard"
                  required
                  value={hazard.type}
                  placeholder="Select hazard type"
                  options={hazardTypeOptions}
                  onChange={(value) => updateHazard(hazard.id, { type: value })}
                  icon="ri-alert-line"
                />

                <SegmentedField
                  label="Severity"
                  fullWidth
                  options={hazardSeverityOptions}
                  value={hazard.severity}
                  onChange={(value) => updateHazard(hazard.id, { severity: value })}
                />

                <FormField label="Observation Note">
                  <TextArea
                    name={`jpNote-${hazard.id}`}
                    rows={2}
                    value={hazard.note}
                    onChange={(event) => updateHazard(hazard.id, { note: event.target.value })}
                    placeholder="Describe what was observed"
                  />
                </FormField>
              </div>
            ))}

            {errors.hazards ? (
              <p className="flex items-start gap-1.5 text-[11px] font-medium text-secondary-700">
                <i className="ri-error-warning-line mt-[1px] text-[13px]" />
                {errors.hazards}
              </p>
            ) : null}

            <button
              type="button"
              onClick={addHazard}
              className="glass-input flex w-full cursor-pointer items-center justify-center gap-2 rounded-md py-2.5 text-xs font-semibold text-primary-800 transition-colors hover:bg-background-50/70"
            >
              <i className="ri-add-line text-[15px]" />
              Add another observation
            </button>

            <div className="glass-panel rounded-lg p-4">
              <p className="mb-3 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
                Photos
              </p>
              <MediaCapture
                items={media}
                onAdd={addMedia}
                onRemove={(id) => setMedia((prev) => prev.filter((item) => item.id !== id))}
              />
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="glass-panel space-y-4 rounded-lg p-4">
            <InfoBanner tone="neutral" icon="ri-information-line">
              {jointPatrolNote}
            </InfoBanner>

            <LookupField
              label="Follow-up Action"
              required
              value={followUpAction}
              placeholder="Select follow-up action"
              options={followUpActionOptions}
              onChange={setFollowUpAction}
              error={errors.followUpAction}
              icon="ri-arrow-go-forward-line"
            />

            <FormField label="Follow-up Date" htmlFor="jp-followup-date">
              <TextInput
                id="jp-followup-date"
                name="jpFollowUpDate"
                type="date"
                icon="ri-calendar-line"
                value={followUpDate}
                onChange={(event) => setFollowUpDate(event.target.value)}
              />
            </FormField>

            <FormField label="Remarks">
              <TextArea
                name="jpRemarks"
                rows={3}
                value={remarks}
                onChange={(event) => setRemarks(event.target.value)}
                placeholder="Additional remarks (optional)"
              />
            </FormField>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="glass-panel rounded-lg p-4">
            <p className="mb-1 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
              Review
            </p>
            <div className="divide-y divide-foreground-500/10">
              <ReviewRow label="Date" value={date} />
              <ReviewRow label="Joint Team" value={team || "—"} />
              <ReviewRow label="Feeder / Line" value={feeder || "—"} />
              <ReviewRow label="Location / Stretch" value={stretch || "—"} />
              <ReviewRow label="Time Out" value={formatTime12(timeOut)} />
              <ReviewRow
                label="Hazard Observations"
                value={`${hazards.filter((item) => item.type).length} recorded`}
              />
              <ReviewRow label="Photos" value={`${media.length} attached`} />
              <ReviewRow label="Follow-up Action" value={followUpAction || "—"} />
              <ReviewRow label="Follow-up Date" value={followUpDate || "Not set"} />
            </div>
          </div>
        ) : null}

        <FormActions>
          {step < TOTAL_STEPS ? (
            <button
              type="button"
              onClick={goNext}
              className="w-full cursor-pointer whitespace-nowrap rounded-md bg-primary-600 py-3 font-label text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700"
            >
              Continue
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full cursor-pointer whitespace-nowrap rounded-md bg-primary-600 py-3 font-label text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700"
            >
              Submit Joint Patrol
            </button>
          )}
        </FormActions>
      </div>
    </div>
  );
}