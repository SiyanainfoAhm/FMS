import type { ReactNode } from "react";

interface SectionHeadingProps {
  title: string;
  action?: ReactNode;
  className?: string;
}

export default function SectionHeading({ title, action, className = "" }: SectionHeadingProps) {
  return (
    <div className={`mb-3 flex items-center justify-between ${className}`}>
      <h2 className="font-heading text-[13px] font-semibold uppercase tracking-[0.12em] text-foreground-600">
        {title}
      </h2>
      {action}
    </div>
  );
}