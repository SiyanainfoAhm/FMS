import { Link, useNavigate } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import IconTile from "@/components/base/IconTile";
import type { Tone } from "@/components/base/toneStyles";
import InfoBanner from "@/components/feature/InfoBanner";
import { incidentTypes } from "@/mocks/incidents";

const tones: Tone[] = ["primary", "secondary"];

export default function IncidentsPage() {
  const navigate = useNavigate();

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader title="Report Incident" onBack={() => navigate("/home")} />

      <div className="space-y-4 px-4 pt-4">
        <InfoBanner tone="neutral" icon="ri-information-line">
          Select the incident type to open the appropriate field form.
        </InfoBanner>

        <div className="space-y-3">
          {incidentTypes.map((type, index) => (
            <Link
              key={type.id}
              to={type.to}
              className="glass-panel flex cursor-pointer items-start gap-3 rounded-lg p-4 transition-colors hover:bg-background-50/75"
            >
              <IconTile icon={type.icon} tone={tones[index % tones.length]} size="md" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-foreground-950">{type.title}</p>
                <p className="mt-0.5 text-[11.5px] leading-relaxed text-foreground-600">
                  {type.description}
                </p>
              </div>
              <i className="ri-arrow-right-s-line mt-1 text-[18px] text-foreground-400" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}