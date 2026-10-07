import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import FormField from "@/components/base/FormField";
import LookupField from "@/components/base/LookupField";
import TextArea from "@/components/base/TextArea";
import FormActions from "@/components/feature/FormActions";
import MediaCapture, { type MediaItem } from "@/components/feature/MediaCapture";
import GpsBlock, { type GpsStatus } from "@/components/feature/GpsBlock";
import SuccessState from "@/components/feature/SuccessState";
import InfoBanner from "@/components/feature/InfoBanner";
import { assetConditionOptions, assetList } from "@/mocks/assets";

export default function AssetInspectPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const asset = assetList.find((item) => item.id === id);

  const [condition, setCondition] = useState("");
  const [remarks, setRemarks] = useState("");
  const [gpsStatus, setGpsStatus] = useState<GpsStatus>("ok");
  const [media, setMedia] = useState<MediaItem[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  if (!asset) {
    return (
      <div className="animate-fade-in pb-8">
        <PageHeader title="Asset Inspection" onBack={() => navigate("/assets")} />
        <div className="px-4 pt-4">
          <div className="glass-panel rounded-lg p-8 text-center">
            <i className="ri-file-unknow-line text-[26px] text-foreground-400" />
            <p className="mt-2 text-sm font-semibold text-foreground-900">Asset not found</p>
          </div>
        </div>
      </div>
    );
  }

  const addMedia = (type: MediaItem["type"]) => {
    setMedia((prev) => [
      ...prev,
      {
        id: `asset-media-${prev.length + 1}`,
        type,
        url:
          type === "document"
            ? undefined
            : "https://readdy.ai/api/search-image?query=forest%20asset%20inspection%20photograph%20of%20a%20concrete%20watch%20tower%20or%20water%20tank%20structure%20beside%20reserve%20forest%2C%20documentary%20field%20photo%2C%20daylight%2C%20natural%20tones&width=400&height=400&seq=fms-asset-inspect-media&orientation=squarish",
        label: "Inspection photo",
        state: "Saved on device",
      },
    ]);
  };

  const handleSubmit = () => {
    const next: Record<string, string> = {};
    if (!condition) next.condition = "Select the observed condition.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    setDone(true);
  };

  if (done) {
    return (
      <SuccessState
        icon="ri-checkbox-circle-line"
        title="Asset inspection submitted successfully"
        message={`Inspection for ${asset.name} (${asset.id}) has been recorded.`}
        note="Saved on this device. It will sync automatically when connectivity is available."
        primaryLabel="Back to Asset"
        onPrimary={() => navigate(`/assets/detail/${asset.id}`)}
        secondaryLabel="Back to Assets"
        onSecondary={() => navigate("/assets")}
      />
    );
  }

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader title="Asset Inspection" onBack={() => navigate(`/assets/detail/${asset.id}`)} />

      <div className="space-y-4 px-4 pt-4">
        <div className="glass-panel rounded-lg p-4">
          <p className="text-[10.5px] font-medium uppercase tracking-wide text-foreground-400">
            {asset.id}
          </p>
          <p className="mt-1 font-heading text-base font-semibold text-foreground-950">
            {asset.name}
          </p>
          <p className="mt-1 text-[11px] text-foreground-600">{asset.location}</p>
        </div>

        <div className="glass-panel space-y-4 rounded-lg p-4">
          <LookupField
            label="Observed Condition"
            required
            value={condition}
            placeholder="Select condition"
            options={assetConditionOptions}
            onChange={setCondition}
            error={errors.condition}
            icon="ri-shield-check-line"
          />
          <FormField label="Observations">
            <TextArea
              name="assetObservations"
              rows={3}
              value={remarks}
              onChange={(event) => setRemarks(event.target.value)}
              placeholder="Describe the asset condition and any work needed"
            />
          </FormField>
        </div>

        <div className="glass-panel rounded-lg p-4">
          <p className="mb-3 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            Location
          </p>
          <GpsBlock status={gpsStatus} accuracy={6} capturedAt="Just now" onCapture={() => setGpsStatus("ok")} />
        </div>

        <div className="glass-panel rounded-lg p-4">
          <p className="mb-3 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            Photo
          </p>
          <MediaCapture
            items={media}
            onAdd={addMedia}
            onRemove={(mediaId) => setMedia((prev) => prev.filter((item) => item.id !== mediaId))}
          />
        </div>

        <InfoBanner tone="neutral" icon="ri-cloud-off-line">
          If you are offline, the inspection is saved on this device and syncs automatically later.
        </InfoBanner>

        <FormActions>
          <button
            type="button"
            onClick={handleSubmit}
            className="w-full cursor-pointer whitespace-nowrap rounded-md bg-primary-600 py-3 font-label text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700"
          >
            Submit Inspection
          </button>
        </FormActions>
      </div>
    </div>
  );
}