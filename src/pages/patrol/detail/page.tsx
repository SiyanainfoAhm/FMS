import { Link, useNavigate, useParams } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import StatusChip from "@/components/base/StatusChip";
import InfoBanner from "@/components/feature/InfoBanner";
import { patrolHistory, sampleObservations } from "@/mocks/patrol";

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2">
      <span className="text-[11px] uppercase tracking-wide text-foreground-500">{label}</span>
      <span className="text-right text-[12.5px] font-medium text-foreground-900">{value}</span>
    </div>
  );
}

export default function PatrolDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const record = patrolHistory.find((item) => item.id === id) ?? patrolHistory[0];
  const observations = record.observations > 0 ? sampleObservations.slice(0, record.observations) : [];

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader
        title="Patrol Detail"
        onBack={() => navigate("/patrol/history")}
        actions={<StatusChip label={record.type} />}
      />

      <div className="space-y-4 px-4 pt-4">
        <div className="glass-panel rounded-lg p-4">
          <div className="flex items-center justify-between">
            <p className="font-heading text-base font-semibold text-foreground-950">
              {record.date} · Beat {record.beat}
            </p>
            <StatusChip label={record.status} />
          </div>
          <div className="mt-3 divide-y divide-foreground-500/10">
            <DetailRow label="Range" value={record.range} />
            <DetailRow label="Section" value={record.section} />
            <DetailRow label="Patrolled Area" value={record.area} />
            <DetailRow label="Staff / Team" value={record.staff} />
            <DetailRow label="Time Out" value={record.timeOut} />
            <DetailRow label="Time In" value={record.timeIn} />
            <DetailRow label="Duration" value={record.duration} />
            <DetailRow label="Distance" value={record.distance} />
            <DetailRow label="Case / OR / UD No." value={record.caseRef} />
          </div>
        </div>

        <div className="glass-panel rounded-lg p-4">
          <p className="mb-3 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            Route map
          </p>
          <div className="h-40 overflow-hidden rounded-md border border-background-50/50">
            <iframe
              title="Patrol route detail"
              src="https://www.google.com/maps?q=21.0861,84.3512&z=14&output=embed"
              className="h-full w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="glass-panel rounded-lg p-4">
          <p className="mb-2 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            Observations
          </p>
          {observations.length === 0 ? (
            <div className="rounded-lg border border-dashed border-foreground-500/20 py-6 text-center">
              <i className="ri-eye-off-line text-[22px] text-foreground-400" />
              <p className="mt-2 text-xs text-foreground-600">No observations recorded for this patrol.</p>
            </div>
          ) : (
            <ul className="relative space-y-4">
              {observations.map((item, index) => (
                <li key={item.id} className="relative flex gap-3">
                  {index < observations.length - 1 ? (
                    <span className="absolute left-[7px] top-4 h-[calc(100%+8px)] w-px bg-foreground-500/15" />
                  ) : null}
                  <span className="relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full border-2 border-primary-600 bg-background-50" />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[12px] font-semibold text-foreground-900">{item.time}</span>
                      <span className="text-[10.5px] text-foreground-500">{item.gps}</span>
                    </div>
                    <p className="mt-0.5 text-[12px] leading-relaxed text-foreground-700">{item.note}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="glass-panel rounded-lg p-4">
          <p className="mb-2 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            Remarks
          </p>
          <p className="text-[12.5px] leading-relaxed text-foreground-800">{record.remarks}</p>
        </div>

        {record.status === "Pending sync" ? (
          <InfoBanner tone="accent" icon="ri-cloud-off-line">
            Saved on this device. Will sync automatically when connectivity is available.
          </InfoBanner>
        ) : null}

        <Link
          to="/patrol/history"
          className="glass-input block w-full cursor-pointer rounded-md py-3 text-center font-label text-sm font-medium text-foreground-700 transition-colors hover:bg-background-50/70"
        >
          Back to Patrol History
        </Link>
      </div>
    </div>
  );
}