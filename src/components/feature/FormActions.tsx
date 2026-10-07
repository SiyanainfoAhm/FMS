import type { ReactNode } from "react";

interface FormActionsProps {
  children: ReactNode;
  className?: string;
}

export default function FormActions({ children, className = "" }: FormActionsProps) {
  return <div className={`flex flex-col gap-2.5 ${className}`}>{children}</div>;
}