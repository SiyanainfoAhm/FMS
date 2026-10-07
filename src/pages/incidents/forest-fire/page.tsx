import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepHeader from "@/components/feature/StepHeader";
import FormField from "@/components/base/FormField";
import LookupField from "@/components/base/LookupField";
import TextArea from "@/components/base/TextArea";
import TextInput from "@/components/base/TextInput";
import FormActions from "@/components/feature/FormActions";
import GpsBlock, { type GpsStatus } from "@/components/feature/GpsBlock";
import MediaCapture, { type MediaItem } from "@/components/feature/MediaCapture";
import InfoBanner from "@/components/feature/InfoBanner";
import SuccessState from "@/components/feature/SuccessState";
import { useAppSession } from "@/context/AppSessionContext";
import { beatsBySection, ranges, sectionsByRange } from "@/mocks/jurisdiction";
import { fireStatusOptions, fireTypeOptions } from "@/mocks/incidents";
import { currentTimeHM, formatTime12 } from "@/lib/time";

const TOTAL_STEPS = 4;
const stepTitles = ["Location", "Fire Details", "Media", "Review & Submit"];

const toOptions = (list: string[]) => list.map((value) => ({ value }));

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="text-[11px] uppercase tracking-wide text-foreground-500">{label}</span>
      <span className="text-right text-[12.5px] font-medium text-foreground-900">{value}</span>
    </div>
  );
}

export default function ForestFireIncidentPage() {
  const navigate = useNavigate();
  const { user } = useAppSession();

  const [step, setStep] = useState(1);
  const [range, setRange] = useState(user?.range ?? "");
  const [section, setSection] = useState(user?.section ?? "");
  const [beat, setBeat] = useState(user?.beat ?? "");
  const [date, setDate] = useState("2026-10-01");
  const [time, setTime] = useState(currentTimeHM);
  const [status, setStatus] = useState("");
  const [fireType, setFireType] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [gpsStatus, setGpsStatus] = useState<GpsStatus>("ok");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const addMedia = (type: MediaItem["type"]) => {
    setMedia((prev) => [
      ...prev,
      {
        id: `ff-media-${prev.length + 1}`,
        type,
        url:
          type === "document"
            ? undefined
            : "https://readdy.ai/api/search-image?query=forest%20fire%20observation%20photograph%20of%20a%20controlled%20ground%20fire%20line%20along%20a%20dry%20forest%20edge%2C%20smoke%20haze%2C%20documentary%20field%20photo%2C%20warm%20daylight%2C%20earthy%20tones&width=400&height=400&seq=fms-fire-incident-media&orientation=squarish",
        label: "Fire observation photo",
        state: "Saved on device",
      },
    ]);
  };

  const validateStep = (current: number): boolean => {
    const next: Record<string, string> = {};
    if (current === 1) {
      if (!range) next.range = "Select an authorised Range.";
      if (!section) next.section = "Select the Section.";
      if (!beat) next.beat = "Select an authorised Beat.";
    }
    if (current === 2) {
      if (!status) next.status = "Select the current fire status.";
      if (!description.trim()) next.description = "Fire description is required.";
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
      navigate("/incidents");
      return;
    }
    setStep((prev) => prev - 1);
  };

  if (submitted) {
    return (
      <SuccessState
        icon="ri-fire-line"
        title="Incident saved successfully"
        message="The forest fire report has been recorded with location and evidence."
        note="Saved on this device. It will sync automatically when connectivity is available."
        primaryLabel="Back to Home"
        onPrimary={() => navigate("/home")}
        secondaryLabel="Report Another"
        onSecondary={() => navigate("/incidents")}
      />
    );
  }

  return (
    <div className="animate-fade-in pb-8">
      <StepHeader step={step} total={TOTAL_STEPS} title={stepTitles[step - 1]} onBack={goBack} />

      <div className="space-y-4 px-4 pt-4">
        {step === 1 ? (
          <div className="space-y-4">
            <div className="glass-panel space-y-4 rounded-lg p-4">
              <FormField label="Date" htmlFor="ff-date" required>
                <TextInput
                  id="ff-date"
                  name="ffDate"
                  type="date"
                  icon="ri-calendar-line"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </FormField>
              <FormField label="Time" required>
                <TextInput
                  name="ffTime"
                  type="time"
                  icon="ri-time-line"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                />
              </FormField>
            </div>

            <div className="glass-panel space-y-4 rounded-lg p-4">
              <LookupField
                label="Range"
                required
                value={range}
                placeholder="Select Range"
                options={toOptions(ranges)}
                onChange={(value) => {
                  setRange(value);
                  setSection("");
                  setBeat("");
                }}
                error={errors.range}
                icon="ri-map-2-line"
              />
              <LookupField
                label="Section"
                required
                value={section}
                placeholder={range ? "Select Section" : "Select Range first"}
                options={toOptions(range ? sectionsByRange[range] ?? [] : [])}
                disabled={!range}
                onChange={(value) => {
                  setSection(value);
                  setBeat("");
                }}
                error={errors.section}
                icon="ri-road-map-line"
              />
              <LookupField
                label="Beat"
                required
                value={beat}
                placeholder={section ? "Select Beat" : "Select Section first"}
                options={toOptions(section ? beatsBySection[section] ?? [] : [])}
                disabled={!section}
                onChange={setBeat}
                error={errors.beat}
                icon="ri-map-pin-range-line"
              />
            </div>

            <div className="glass-panel rounded-lg p-4">
              <p className="mb-3 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
                GPS Location
              </p>
              <GpsBlock status={gpsStatus} accuracy={6} capturedAt={formatTime12(currentTimeHM())} onCapture={() => setGpsStatus("ok")} />
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <InfoBanner tone="accent" icon="ri-information-line">
              The final mandatory field set and fire response workflow are pending Department
              confirmation. Fields below are the currently identified set only.
            </InfoBanner>

            <div className="glass-panel space-y-4 rounded-lg p-4">
              <LookupField
                label="Fire Status"
                required
                value={status}
                placeholder="Select fire status"
                options={fireStatusOptions}
                onChange={setStatus}
                error={errors.status}
                icon="ri-fire-line"
              />
              <LookupField
                label="Fire Type"
                value={fireType}
                placeholder="Select fire type (optional)"
                options={fireTypeOptions}
                onChange={setFireType}
                icon="ri-leaf-line"
              />
              <FormField label="Approximate Area Affected" htmlFor="ff-area">
                <TextInput
                  id="ff-area"
                  name="ffArea"
                  icon="ri-ruler-2-line"
                  value={area}
                  onChange={(event) => setArea(event.target.value)}
                  placeholder="e.g. approx. 2 hectares (if known)"
                />
              </FormField>
              <FormField label="Fire Description" required error={errors.description}>
                <TextArea
                  name="ffDescription"
                  rows={4}
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  placeholder="Describe the fire, spread direction and any immediate risk observed"
                  invalid={Boolean(errors.description)}
                />
              </FormField>
            </div>
          </div>
        ) : null}

        {step === 3 ? (
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
        ) : null}

        {step === 4 ? (
          <div className="glass-panel rounded-lg p-4">
            <p className="mb-1 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
              Review
            </p>
            <div className="divide-y divide-foreground-500/10">
              <ReviewRow label="Date & Time" value={`${date} · ${formatTime12(time)}`} />
              <ReviewRow label="Jurisdiction" value={`${range} · ${section} · ${beat}`} />
              <ReviewRow label="Fire Status" value={status || "—"} />
              <ReviewRow label="Fire Type" value={fireType || "Not recorded"} />
              <ReviewRow label="Area Affected" value={area || "Not recorded"} />
              <ReviewRow label="Photos" value={`${media.length} attached`} />
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
              onClick={() => setSubmitted(true)}
              className="w-full cursor-pointer whitespace-nowrap rounded-md bg-primary-600 py-3 font-label text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700"
            >
              Submit Incident
            </button>
          )}
        </FormActions>
      </div>
    </div>
  );
}