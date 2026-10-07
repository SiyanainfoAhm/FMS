import { Link, useNavigate, useParams } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import StatusChip from "@/components/base/StatusChip";
import InfoBanner from "@/components/feature/InfoBanner";
import { assetHistorySample, assetList } from "@/mocks/assets";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="text-[11px] uppercase tracking-wide text-foreground-500">{label}</span>
      <span className="text-right text-[12.5px] font-medium text-foreground-900">{value}</span>
    </div>
  );
}

export default function AssetDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const asset = assetList.find((item) => item.id === id);

  if (!asset) {
    return (
      <div className="animate-fade-in pb-8">
        <PageHeader title="Asset Detail" onBack={() => navigate("/assets")} />
        <div className="px-4 pt-4">
          <div className="glass-panel rounded-lg p-8 text-center">
            <i className="ri-file-unknow-line text-[26px] text-foreground-400" />
            <p className="mt-2 text-sm font-semibold text-foreground-900">Asset not found</p>
            <p className="mt-1 text-[11px] text-foreground-600">
              This asset is not available in your authorised jurisdiction.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader
        title="Asset Detail"
        onBack={() => navigate("/assets")}
        actions={<StatusChip label={asset.condition} />}
      />

      <div className="space-y-4 px-4 pt-4">
        <div className="glass-panel rounded-lg p-4">
          <p className="text-[10.5px] font-medium uppercase tracking-wide text-foreground-400">
            {asset.id}
          </p>
          <p className="mt-1 font-heading text-base font-semibold text-foreground-950">
            {asset.name}
          </p>
          <div className="mt-2 divide-y divide-foreground-500/10">
            <DetailRow label="Asset Type" value={asset.category} />
            <DetailRow label="Condition" value={asset.condition} />
            <DetailRow label="Status" value={asset.status} />
            <DetailRow label="Range" value={asset.range} />
            <DetailRow label="Section" value={asset.section} />
            <DetailRow label="Beat" value={asset.beat} />
            <DetailRow label="Location" value={asset.location} />
            <DetailRow label="Last Inspection" value={asset.lastInspection} />
          </div>
        </div>

        <div className="glass-panel rounded-lg p-4">
          <p className="mb-3 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            Location
          </p>
          <div className="h-40 overflow-hidden rounded-md border border-background-50/50">
            <iframe
              title="Asset location"
              src="https://www.google.com/maps?q=21.0861,84.3512&z=14&output=embed"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="glass-panel rounded-lg p-4">
          <p className="mb-3 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            Asset History
          </p>
          <ul className="relative space-y-4">
            {assetHistorySample.map((item, index) => (
              <li key={item.id} className="relative flex gap-3">
                {index < assetHistorySample.length - 1 ? (
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

        <InfoBanner tone="neutral" icon="ri-information-line">
          Asset creation, issue and maintenance are managed on the Web FMS. Field users can record
          inspections.
        </InfoBanner>

        <Link
          to={`/assets/inspect/${asset.id}`}
          className="flex w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-600 py-3 font-label text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700"
        >
          <i className="ri-clipboard-line text-[16px]" />
          Inspect Asset
        </Link>
      </div>
    </div>
  );
}