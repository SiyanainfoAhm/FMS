import { Link, useNavigate, useParams } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import StatusChip from "@/components/base/StatusChip";
import InfoBanner from "@/components/feature/InfoBanner";
import { assignedEquipment } from "@/mocks/equipment";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="text-[11px] uppercase tracking-wide text-foreground-500">{label}</span>
      <span className="text-right text-[12.5px] font-medium text-foreground-900">{value}</span>
    </div>
  );
}

export default function EquipmentDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const item = assignedEquipment.find((entry) => entry.id === id);

  if (!item) {
    return (
      <div className="animate-fade-in pb-8">
        <PageHeader title="Equipment Detail" onBack={() => navigate("/equipment")} />
        <div className="px-4 pt-4">
          <div className="glass-panel rounded-lg p-8 text-center">
            <i className="ri-file-unknow-line text-[26px] text-foreground-400" />
            <p className="mt-2 text-sm font-semibold text-foreground-900">Equipment not found</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader
        title="Equipment Detail"
        onBack={() => navigate("/equipment")}
        actions={<StatusChip label={item.status} />}
      />

      <div className="space-y-4 px-4 pt-4">
        <div className="glass-panel rounded-lg p-4">
          <p className="text-[10.5px] font-medium uppercase tracking-wide text-foreground-400">
            {item.id}
          </p>
          <p className="mt-1 font-heading text-base font-semibold text-foreground-950">{item.name}</p>
          <div className="mt-2 divide-y divide-foreground-500/10">
            <DetailRow label="Equipment Type" value={item.type} />
            <DetailRow label="Assigned To" value={item.assignedTo} />
            <DetailRow label="Current Condition" value={item.condition} />
            <DetailRow label="Current Location" value={item.location} />
            <DetailRow label="Status" value={item.status} />
            <DetailRow label="Latest Update" value={item.lastUpdate} />
          </div>
        </div>

        <InfoBanner tone="neutral" icon="ri-information-line">
          Condition and location updates are appended to the equipment history.
        </InfoBanner>

        <Link
          to={`/equipment/update/${item.id}`}
          className="flex w-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-md bg-primary-600 py-3 font-label text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700"
        >
          <i className="ri-edit-2-line text-[16px]" />
          Update Condition / Location
        </Link>
      </div>
    </div>
  );
}