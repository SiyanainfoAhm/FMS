import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  help?: string;
  children: ReactNode;
  className?: string;
}

export default function FormField({
  label,
  htmlFor,
  required = false,
  error,
  help,
  children,
  className = "",
}: FormFieldProps) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-xs font-semibold text-foreground-700">
        {label}
        {required ? <span className="ml-0.5 text-secondary-700">*</span> : null}
      </label>
      {children}
      {error ? (
        <p className="mt-1.5 flex items-start gap-1.5 text-[11px] font-medium text-secondary-700">
          <i className="ri-error-warning-line mt-[1px] text-[13px]" />
          {error}
        </p>
      ) : help ? (
        <p className="mt-1.5 text-[11px] leading-relaxed text-foreground-500">{help}</p>
      ) : null}
    </div>
  );
}