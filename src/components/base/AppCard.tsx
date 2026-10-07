import type { ReactNode } from "react";

interface AppCardProps {
  children: ReactNode;
  className?: string;
}

export default function AppCard({ children, className = "" }: AppCardProps) {
  return <div className={`glass-panel rounded-lg p-4 ${className}`}>{children}</div>;
}