import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PageHeader from "@/components/base/PageHeader";
import FormField from "@/components/base/FormField";
import LookupField from "@/components/base/LookupField";
import SegmentedField from "@/components/base/SegmentedField";
import TextInput from "@/components/base/TextInput";
import ToggleRow from "@/components/base/ToggleRow";
import FormActions from "@/components/feature/FormActions";
import InfoBanner from "@/components/feature/InfoBanner";
import { useAppSession } from "@/context/AppSessionContext";
import { currentTimeHM, formatTime12 } from "@/lib/time";
import { beatsBySection, ranges, sectionsByRange } from "@/mocks/jurisdiction";
import { patrolTypeOptions, patrolledAreaOptions, staffTeamOptions } from "@/mocks/patrol";

const toOptions = (list: string[]) => list.map((value) => ({ value }));

export default function StartPatrolPage() {
  const navigate = useNavigate();
  const { user } = useAppSession();

  const [date, setDate] = useState("2026-10-01");
  const [range, setRange] = useState(user?.range ?? "");
  const [section, setSection] = useState(user?.section ?? "");
  const [beat, setBeat] = useState(user?.beat ?? "");
  const [patrolType, setPatrolType] = useState("");
  const [staff, setStaff] = useState("");
  const [area, setArea] = useState("");
  const [timeOut, setTimeOut] = useState(currentTimeHM);
  const [gpsTracking, setGpsTracking] = useState(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleStart = () => {
    const next: Record<string, string> = {};
    if (!range) next.range = "Select an authorised Range.";
    if (!section) next.section = "Select the Section for this patrol.";
    if (!beat) next.beat = "Select an authorised Beat.";
    if (!patrolType) next.patrolType = "Patrolling Type is required (Day or Night).";
    if (!timeOut) next.timeOut = "Time Out is required.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;
    localStorage.setItem("fms.patrol.timeOut", timeOut);
    navigate("/patrol/active");
  };

  return (
    <div className="animate-fade-in pb-8">
      <PageHeader
        title="Start Foot Patrol"
        onBack={() => navigate("/home")}
      />

      <div className="space-y-4 px-4 pt-4">
        <div className="glass-panel rounded-lg p-4">
          <p className="mb-3 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            Patrol details
          </p>
          <div className="space-y-4">
            <FormField label="Date" htmlFor="patrol-date" required>
              <TextInput
                id="patrol-date"
                name="patrolDate"
                type="date"
                icon="ri-calendar-line"
                value={date}
                onChange={(event) => setDate(event.target.value)}
              />
            </FormField>

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
              help="Only beats under your authorised jurisdiction are listed."
              icon="ri-map-pin-range-line"
            />

            <SegmentedField
              label="Patrolling Type"
              required
              fullWidth
              options={patrolTypeOptions}
              value={patrolType}
              onChange={setPatrolType}
              error={errors.patrolType}
              help="Day or Night must be recorded explicitly."
            />
          </div>
        </div>

        <div className="glass-panel rounded-lg p-4">
          <p className="mb-3 font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
            Staff &amp; area
          </p>
          <div className="space-y-4">
            <LookupField
              label="Staff / Team"
              value={staff}
              placeholder="Select patrol lead / team"
              options={staffTeamOptions}
              onChange={setStaff}
              icon="ri-group-line"
            />
            <LookupField
              label="Patrolled Area"
              value={area}
              placeholder="Select or describe the area"
              options={patrolledAreaOptions}
              onChange={setArea}
              icon="ri-landscape-line"
            />
            <FormField
              label="Time Out"
              required
              error={errors.timeOut}
              help={`Pre-filled from device time (${formatTime12(currentTimeHM())}). Adjust only if needed.`}
            >
              <TextInput
                name="timeOut"
                type="time"
                icon="ri-time-line"
                value={timeOut}
                onChange={(event) => setTimeOut(event.target.value)}
              />
            </FormField>
            <ToggleRow
              label="GPS Tracking"
              description="Record route for this patrol"
              icon="ri-focus-3-line"
              checked={gpsTracking}
              onChange={setGpsTracking}
            />
          </div>
        </div>

        <InfoBanner tone="neutral" icon="ri-information-line">
          Range, Section and Beat are filtered to your authorised jurisdiction.
        </InfoBanner>

        <FormActions>
          <button
            type="button"
            onClick={handleStart}
            className="w-full cursor-pointer whitespace-nowrap rounded-md bg-primary-600 py-3 font-label text-sm font-semibold text-background-50 transition-colors hover:bg-primary-700"
          >
            Start Patrol
          </button>
        </FormActions>
      </div>
    </div>
  );
}