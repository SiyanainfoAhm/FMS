import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import FormField from "@/components/base/FormField";
import LookupField from "@/components/base/LookupField";
import TextArea from "@/components/base/TextArea";
import TextInput from "@/components/base/TextInput";
import FormActions from "@/components/feature/FormActions";
import GpsBlock, { type GpsStatus } from "@/components/feature/GpsBlock";
import MediaCapture, { type MediaItem } from "@/components/feature/MediaCapture";
import { caseReferenceOptions } from "@/mocks/patrol";

export default function AddObservationPage() {
  const navigate = useNavigate();
  const [note, setNote] = useState("");
  const [caseRef, setCaseRef] = useState("Not applicable");
  const [remarks, setRemarks] = useState("");
  const [time, setTime] = useState("07:10");
  const [gpsStatus, setGpsStatus] = useState<GpsStatus>("ok");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [error, setError] = useState("");

  const handleAdd = (type: MediaItem["type"]) => {
    setMedia((prev) => [
      ...prev,
      {
        id: `obs-media-${prev.length + 1}`,
        type,
        url:
          type === "document"
            ? undefined
            : "https://readdy.ai/api/search-image?query=forest%20patrol%20field%20photo%20of%20a%20narrow%20dirt%20track%20through%20dense%20green%20forest%20with%20morning%20light%2C%20documentary%20style%2C%20natural%20earthy%20tones&width=400&height=400&seq=fms-patrol-obs-media&orientation=squarish",
        label: type === "photo" ? "Observation photo" : type === "video" ? "Observation clip" : "Attachment",
        state: "Saved on device",
      },
    ]);
  };

  const handleSave = () => {
    if (!note.trim()) {
      setError("Observation note is required.");
      return;
    }
    setError("");
    navigate("/patrol/active");
  };

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader
        title="Add Observation"
        onBack={() => navigate("/patrol/active")}
      />

      <div className="space-y-4 px-4 pt-4">
        <div className="glass-panel rounded-lg p-4">
          <div className="space-y-4">
            <FormField
              label="Observation"
              htmlFor="obs-note"
              required
              error={error}
              help="Record what you observed during the patrol."
            >
              <TextArea
                id="obs-note"
                name="observationNote"
                rows={3}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Describe the observation"
                invalid={Boolean(error)}
              />
            </FormField>

            <FormField label="Time" htmlFor="obs-time">
              <TextInput
                id="obs-time"
                name="observationTime"
                type="time"
                icon="ri-time-line"
                value={time}
                onChange={(event) => setTime(event.target.value)}
              />
            </FormField>

            <LookupField
              label="Case / OR / UD No."
              value={caseRef}
              placeholder="Optional"
              options={caseReferenceOptions}
              onChange={setCaseRef}
              help="Optional — only needed if this observation relates to a case."
              icon="ri-file-list-3-line"
            />

            <FormField label="Remarks">
              <TextArea
                name="observationRemarks"
                rows={2}
                value={remarks}
                onChange={(event) => setRemarks(event.target.value)}
                placeholder="Additional remarks (optional)"
              />
            </FormField>
          </div>
        </div>

        <div className="glass-panel rounded-lg p-4">
          <p className="mb-3 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            Location
          </p>
          <GpsBlock status={gpsStatus} accuracy={6} capturedAt="07:10" onCapture={() => setGpsStatus("ok")} />
        </div>

        <div className="glass-panel rounded-lg p-4">
          <p className="mb-3 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            Media
          </p>
          <MediaCapture
            items={media}
            onAdd={handleAdd}
            onRemove={(id) => setMedia((prev) => prev.filter((item) => item.id !== id))}
          />
        </div>

        <FormActions>
          <button
            type="button"
            onClick={handleSave}
            className="w-full cursor-pointer whitespace-nowrap rounded-md bg-primary-600 py-3 font-label text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700"
          >
            Save Observation
          </button>
          <button
            type="button"
            onClick={() => navigate("/patrol/active")}
            className="glass-input w-full cursor-pointer whitespace-nowrap rounded-md py-3 font-label text-sm font-medium text-foreground-700 transition-colors hover:bg-background-50/70"
          >
            Cancel
          </button>
        </FormActions>
      </div>
    </div>
  );
}