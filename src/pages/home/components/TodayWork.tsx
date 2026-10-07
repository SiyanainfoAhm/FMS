import StatusChip from "@/components/base/StatusChip";
import IconTile from "@/components/base/IconTile";
import type { Tone } from "@/components/base/toneStyles";

interface WorkItem {
  id: string;
  title: string;
  subtitle: string;
  time: string;
  type: string;
  status: string;
}

interface TodayWorkProps {
  items: WorkItem[];
}

const typeTone: Record<string, Tone> = {
  patrol: "primary",
  asset: "accent",
  joint: "secondary",
  task: "accent",
};

const typeIcon: Record<string, string> = {
  patrol: "ri-walk-line",
  asset: "ri-building-2-line",
  joint: "ri-route-line",
  task: "ri-clipboard-line",
};

export default function TodayWork({ items }: TodayWorkProps) {
  return (
    <div className="space-y-2.5">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 glass-panel rounded-lg p-3.5"
        >
          <IconTile
            icon={typeIcon[item.type] ?? "ri-clipboard-line"}
            tone={typeTone[item.type] ?? "primary"}
            size="md"
            className="shrink-0 rounded-md"
          />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-foreground-950">{item.title}</p>
            <p className="mt-0.5 truncate text-[11px] text-foreground-600">{item.subtitle}</p>
            <div className="mt-1.5 flex items-center gap-2">
              <span className="flex items-center gap-1 text-[11px] text-foreground-500">
                <i className="ri-time-line text-[12px]" />
                {item.time}
              </span>
            </div>
          </div>
          <StatusChip label={item.status} />
        </div>
      ))}
    </div>
  );
}