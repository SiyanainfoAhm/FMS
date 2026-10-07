import type { ReactNode } from "react";

type BannerTone = "primary" | "accent" | "secondary" | "neutral";

interface InfoBannerProps {
  tone?: BannerTone;
  icon: string;
  children: ReactNode;
  action?: ReactNode;
}

const toneStyles: Record<BannerTone, string> = {
  primary: "border-primary-500/30 bg-primary-500/14 text-primary-900",
  accent: "border-accent-500/35 bg-accent-500/20 text-accent-900",
  secondary: "border-secondary-500/30 bg-secondary-500/16 text-secondary-900",
  neutral: "border-foreground-500/20 bg-foreground-500/8 text-foreground-700",
};

export default function InfoBanner({ tone = "neutral", icon, children, action }: InfoBannerProps) {
  return (
    <div
      className={`flex items-start gap-2.5 rounded-md border px-3 py-2.5 backdrop-blur-md ${toneStyles[tone]}`}
    >
      <i className={`${icon} mt-0.5 text-[15px]`} />
      <div className="min-w-0 flex-1 text-[11px] leading-relaxed">{children}</div>
      {action}
    </div>
  );
}