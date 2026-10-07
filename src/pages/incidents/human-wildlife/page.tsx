import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepHeader from "@/components/feature/StepHeader";
import FormField from "@/components/base/FormField";
import LookupField from "@/components/base/LookupField";
import SegmentedField from "@/components/base/SegmentedField";
import TextArea from "@/components/base/TextArea";
import TextInput from "@/components/base/TextInput";
import FormActions from "@/components/feature/FormActions";
import GpsBlock, { type GpsStatus } from "@/components/feature/GpsBlock";
import MediaCapture, { type MediaItem } from "@/components/feature/MediaCapture";
import InfoBanner from "@/components/feature/InfoBanner";
import SuccessState from "@/components/feature/SuccessState";
import { useAppSession } from "@/context/AppSessionContext";
import { beatsBySection, ranges, sectionsByRange } from "@/mocks/jurisdiction";
import { hwIncidentKindOptions, speciesOptions } from "@/mocks/incidents";
import { currentTimeHM, formatTime12 } from "@/lib/time";

const TOTAL_STEPS = 5;
const stepTitles = [
  "Location",
  "Incident Details",
  "Person / Animal Details",
  "Media",
  "Review & Submit",
];

const toOptions = (list: string[]) => list.map((value) => ({ value }));

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="text-[11px] uppercase tracking-wide text-foreground-500">{label}</span>
      <span className="text-right text-[12.5px] font-medium text-foreground-900">{value}</span>
    </div>
  );
}

export default function HumanWildlifeIncidentPage() {
  const navigate = useNavigate();
  const { user } = useAppSession();

  const [step, setStep] = useState(1);
  const [range, setRange] = useState(user?.range ?? "");
  const [section, setSection] = useState(user?.section ?? "");
  const [beat, setBeat] = useState(user?.beat ?? "");
  const [date, setDate] = useState("2026-10-01");
  const [time, setTime] = useState(currentTimeHM);
  const [kind, setKind] = useState("");
  const [description, setDescription] = useState("");
  const [species, setSpecies] = useState("");
  const [persons, setPersons] = useState("");
  const [injury, setInjury] = useState("");
  const [remarks, setRemarks] = useState("");
  const [gpsStatus, setGpsStatus] = useState<GpsStatus>("ok");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const addMedia = (type: MediaItem["type"]) => {
    setMedia((prev) => [
      ...prev,
      {
        id: `hw-media-${prev.length + 1}`,
        type,
        url:
          type === "document"
            ? undefined
            : "https://readdy.ai/api/search-image?query=field%20incident%20scene%20photograph%20at%20the%20edge%20of%20a%20forest%20village%2C%20damaged%20crop%20field%20and%20forest%20boundary%2C%20documentary%20style%2C%20daylight%2C%20natural%20earthy%20tones&width=400&height=400&seq=fms-hw-incident-media&orientation=squarish",
        label: "Incident photo",
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
      if (!kind) next.kind = "Select the incident kind.";
      if (!description.trim()) next.description = "Incident description is required.";
    }
    if (current === 3 && !species) {
      next.species = "Select the species involved.";
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
        icon="ri-checkbox-circle-line"
        title="Incident saved successfully"
        message="The human-wildlife incident report has been recorded with location and evidence."
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
              <FormField label="Date" htmlFor="hw-date" required>
                <TextInput
                  id="hw-date"
                  name="hwDate"
                  type="date"
                  icon="ri-calendar-line"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </FormField>
              <FormField label="Time" required>
                <TextInput
                  name="hwTime"
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
          <div className="glass-panel space-y-4 rounded-lg p-4">
            <LookupField
              label="Incident Kind"
              required
              value={kind}
              placeholder="Select incident kind"
              options={hwIncidentKindOptions}
              onChange={setKind}
              error={errors.kind}
              icon="ri-alert-line"
            />
            <FormField label="Incident Description" required error={errors.description}>
              <TextArea
                name="hwDescription"
                rows={4}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe what happened, when and where"
                invalid={Boolean(errors.description)}
              />
            </FormField>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="glass-panel space-y-4 rounded-lg p-4">
            <LookupField
              label="Species Involved"
              required
              value={species}
              placeholder="Select species"
              options={speciesOptions}
              onChange={setSpecies}
              error={errors.species}
              icon="ri-leaf-line"
            />
            <FormField label="Persons Involved" htmlFor="hw-persons">
              <TextInput
                id="hw-persons"
                name="hwPersons"
                icon="ri-group-line"
                value={persons}
                onChange={(event) => setPersons(event.target.value)}
                placeholder="Names / number of persons (optional)"
              />
            </FormField>
            <SegmentedField
              label="Injury Reported"
              fullWidth
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
                { value: "Not known", label: "Not known" },
              ]}
              value={injury}
              onChange={setInjury}
            />
            <FormField label="Remarks">
              <TextArea
                name="hwPersonRemarks"
                rows={2}
                value={remarks}
                onChange={(event) => setRemarks(event.target.value)}
                placeholder="Additional remarks (optional)"
              />
            </FormField>
          </div>
        ) : null}

        {step === 4 ? (
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

        {step === 5 ? (
          <div className="glass-panel rounded-lg p-4">
            <p className="mb-1 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
              Review
            </p>
            <div className="divide-y divide-foreground-500/10">
              <ReviewRow label="Date & Time" value={`${date} · ${formatTime12(time)}`} />
              <ReviewRow label="Jurisdiction" value={`${range} · ${section} · ${beat}`} />
              <ReviewRow label="Incident Kind" value={kind || "—"} />
              <ReviewRow label="Species" value={species || "—"} />
              <ReviewRow label="Injury Reported" value={injury || "Not recorded"} />
              <ReviewRow label="Photos" value={`${media.length} attached`} />
            </div>
            <InfoBanner tone="neutral" icon="ri-information-line">
              AI or automated approval is not applied to incidents. The record is submitted for
              Department review.
            </InfoBanner>
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