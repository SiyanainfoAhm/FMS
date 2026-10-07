import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import FormField from "@/components/base/FormField";
import LookupField from "@/components/base/LookupField";
import TextArea from "@/components/base/TextArea";
import FormActions from "@/components/feature/FormActions";
import MediaCapture, { type MediaItem } from "@/components/feature/MediaCapture";
import SuccessState from "@/components/feature/SuccessState";
import InfoBanner from "@/components/feature/InfoBanner";
import { assignedEquipment, equipmentConditionOptions, equipmentLocationOptions } from "@/mocks/equipment";
import { currentTimeHM, formatTime12 } from "@/lib/time";

export default function EquipmentUpdatePage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const item = assignedEquipment.find((entry) => entry.id === id);

  const [condition, setCondition] = useState(item?.condition ?? "");
  const [location, setLocation] = useState("");
  const [observation, setObservation] = useState("");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  if (!item) {
    return (
      <div className="animate-fade-in pb-8">
        <PageHeader title="Update Equipment" onBack={() => navigate("/equipment")} />
        <div className="px-4 pt-4">
          <div className="glass-panel rounded-lg p-8 text-center">
            <i className="ri-file-unknow-line text-[26px] text-foreground-400" />
            <p className="mt-2 text-sm font-semibold text-foreground-900">Equipment not found</p>
          </div>
        </div>
      </div>
    );
  }

  const addMedia = (type: MediaItem["type"]) => {
    setMedia((prev) => [
      ...prev,
      {
        id: `eq-media-${prev.length + 1}`,
        type,
        url:
          type === "document"
            ? undefined
            : "https://readdy.ai/api/search-image?query=field%20photograph%20of%20forestry%20equipment%20such%20as%20a%20handheld%20gps%20device%20or%20fire%20beater%20resting%20on%20a%20camp%20table%2C%20documentary%20style%2C%20daylight%2C%20neutral%20tones&width=400&height=400&seq=fms-equipment-update-media&orientation=squarish",
        label: "Equipment photo",
        state: "Saved on device",
      },
    ]);
  };

  const handleSave = () => {
    const next: Record<string, string> = {};
    if (!condition) next.condition = "Select the current condition.";
    if (!location) next.location = "Select the current location.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setDone(true);
  };

  if (done) {
    return (
      <SuccessState
        icon="ri-checkbox-circle-line"
        title="Equipment updated successfully"
        message={`Condition and location for ${item.name} (${item.id}) have been updated.`}
        note="Saved on this device. It will sync automatically when connectivity is available."
        primaryLabel="Back to Equipment"
        onPrimary={() => navigate(`/equipment/detail/${item.id}`)}
        secondaryLabel="Back to My Equipment"
        onSecondary={() => navigate("/equipment")}
      />
    );
  }

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader title="Update Equipment" onBack={() => navigate(`/equipment/detail/${item.id}`)} />

      <div className="space-y-4 px-4 pt-4">
        <div className="glass-panel rounded-lg p-4">
          <p className="text-[10.5px] font-medium uppercase tracking-wide text-foreground-400">
            {item.id}
          </p>
          <p className="mt-1 font-heading text-base font-semibold text-foreground-950">{item.name}</p>
        </div>

        <div className="glass-panel space-y-4 rounded-lg p-4">
          <LookupField
            label="Current Condition"
            required
            value={condition}
            placeholder="Select condition"
            options={equipmentConditionOptions}
            onChange={setCondition}
            error={errors.condition}
            icon="ri-shield-check-line"
          />
          <LookupField
            label="Current Location"
            required
            value={location}
            placeholder="Select current location"
            options={equipmentLocationOptions}
            onChange={setLocation}
            error={errors.location}
            icon="ri-map-pin-line"
          />
          <FormField label="Observation">
            <TextArea
              name="equipmentObservation"
              rows={3}
              value={observation}
              onChange={(event) => setObservation(event.target.value)}
              placeholder="Describe the condition and any issue"
            />
          </FormField>
          <div className="glass-input flex items-center justify-between rounded-md px-3 py-2.5">
            <span className="text-[11px] uppercase tracking-wide text-foreground-500">
              Date / Time
            </span>
            <span className="text-[13px] font-semibold text-foreground-900">
              {formatTime12(currentTimeHM())}
            </span>
          </div>
        </div>

        <div className="glass-panel rounded-lg p-4">
          <p className="mb-3 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            Photo (optional)
          </p>
          <MediaCapture
            items={media}
            onAdd={addMedia}
            onRemove={(mediaId) => setMedia((prev) => prev.filter((entry) => entry.id !== mediaId))}
          />
        </div>

        <InfoBanner tone="neutral" icon="ri-cloud-off-line">
          If you are offline, the update is saved on this device and syncs automatically later.
        </InfoBanner>

        <FormActions>
          <button
            type="button"
            onClick={handleSave}
            className="w-full cursor-pointer whitespace-nowrap rounded-md bg-primary-600 py-3 font-label text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700"
          >
            Save Update
          </button>
        </FormActions>
      </div>
    </div>
  );
}