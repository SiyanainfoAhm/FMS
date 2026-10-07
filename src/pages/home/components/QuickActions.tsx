import { Link } from "react-router-dom";
import IconTile from "@/components/base/IconTile";
import type { Tone } from "@/components/base/toneStyles";

export interface QuickActionItem {
  id: string;
  label: string;
  icon: string;
  tone: string;
  to?: string;
}

interface QuickActionsProps {
  actions: QuickActionItem[];
  onAction?: (id: string) => void;
}

const tileClass =
  "flex cursor-pointer flex-col items-center gap-2 glass-panel rounded-lg p-3 text-center transition-colors hover:border-background-300 hover:bg-background-100 active:bg-background-200";

export default function QuickActions({ actions, onAction }: QuickActionsProps) {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {actions.map((action) =>
        action.to ? (
          <Link key={action.id} to={action.to} className={tileClass}>
            <IconTile icon={action.icon} tone={action.tone as Tone} size="md" />
            <span className="text-[11.5px] font-medium leading-tight text-foreground-800">
              {action.label}
            </span>
          </Link>
        ) : (
          <button
            key={action.id}
            type="button"
            onClick={() => onAction?.(action.id)}
            className={tileClass}
          >
            <IconTile icon={action.icon} tone={action.tone as Tone} size="md" />
            <span className="text-[11.5px] font-medium leading-tight text-foreground-800">
              {action.label}
            </span>
          </button>
        ),
      )}
    </div>
  );
}