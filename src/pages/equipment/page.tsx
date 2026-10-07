import { Link, useNavigate } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import StatusChip from "@/components/base/StatusChip";
import EmptyState from "@/components/feature/EmptyState";
import InfoBanner from "@/components/feature/InfoBanner";
import { assignedEquipment } from "@/mocks/equipment";

export default function MyEquipmentPage() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader title="My Equipment" onBack={() => navigate("/home")} />

      <div className="space-y-4 px-4 pt-4">
        {assignedEquipment.length === 0 ? (
          <EmptyState
            icon="ri-tools-line"
            title="No equipment assigned"
            description="No equipment is currently assigned to you."
          />
        ) : (
          <>
            <div className="space-y-2.5">
              {assignedEquipment.map((item) => (
                <Link
                  key={item.id}
                  to={`/equipment/detail/${item.id}`}
                  className="glass-panel block cursor-pointer rounded-lg p-3.5 transition-colors hover:bg-background-50/75"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-[10.5px] font-medium uppercase tracking-wide text-foreground-400">
                        {item.id}
                      </p>
                      <p className="mt-0.5 text-sm font-semibold text-foreground-950">{item.name}</p>
                      <p className="mt-0.5 text-[11px] text-foreground-600">{item.type}</p>
                    </div>
                    <StatusChip label={item.status} />
                  </div>
                  <div className="mt-2.5 flex items-center gap-1.5 text-[11px] text-foreground-500">
                    <i className="ri-shield-check-line text-[13px]" />
                    Condition: {item.condition}
                  </div>
                </Link>
              ))}
            </div>

            <InfoBanner tone="neutral" icon="ri-information-line">
              Equipment creation, issue, return and maintenance are managed on the Web FMS.
            </InfoBanner>
          </>
        )}
      </div>
    </div>
  );
}