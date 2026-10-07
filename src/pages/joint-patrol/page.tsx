import { Link, useNavigate } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import StatusChip from "@/components/base/StatusChip";
import InfoBanner from "@/components/feature/InfoBanner";
import { jointPatrolHistory, jointPatrolNote } from "@/mocks/jointPatrol";

export default function JointPatrolListPage() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader
        title="Joint Patrol"
        onBack={() => navigate("/home")}
        actions={
          <Link
            to="/joint-patrol/new"
            className="flex cursor-pointer items-center gap-1.5 whitespace-nowrap rounded-md bg-primary-600 px-3 py-2 text-xs font-semibold text-background-50 transition-colors hover:bg-primary-700"
          >
            <i className="ri-add-line text-[15px]" />
            New
          </Link>
        }
      />

      <div className="space-y-4 px-4 pt-4">
        <InfoBanner tone="neutral" icon="ri-information-line">
          {jointPatrolNote}
        </InfoBanner>

        <div className="space-y-2.5">
          {jointPatrolHistory.map((record) => (
            <div key={record.id} className="glass-panel rounded-lg p-3.5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10.5px] font-medium uppercase tracking-wide text-foreground-400">
                    {record.id}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold text-foreground-950">{record.feeder}</p>
                  <p className="mt-0.5 truncate text-[11px] text-foreground-600">{record.stretch}</p>
                </div>
                <StatusChip label={record.status} />
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-foreground-600">
                <span className="flex items-center gap-1">
                  <i className="ri-calendar-line text-[12px]" />
                  {record.date}
                </span>
                <span className="flex items-center gap-1">
                  <i className="ri-flashlight-line text-[12px]" />
                  {record.hazards} hazard observations
                </span>
                <span className="flex items-center gap-1">
                  <i className="ri-map-pin-line text-[12px]" />
                  {record.section}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}