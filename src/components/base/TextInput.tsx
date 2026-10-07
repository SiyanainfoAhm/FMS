import type { InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: string;
  invalid?: boolean;
}

export default function TextInput({ icon, invalid = false, className = "", ...rest }: TextInputProps) {
  return (
    <div className="relative">
      {icon ? (
        <span className="pointer-events-none absolute left-3 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-foreground-400">
          <i className={`${icon} text-[17px]`} />
        </span>
      ) : null}
      <input
        {...rest}
        className={`glass-input w-full rounded-md py-2.5 text-sm text-foreground-900 outline-none transition-colors placeholder:text-foreground-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/25 ${
          icon ? "pl-10" : "pl-3"
        } pr-3 ${invalid ? "border-secondary-600/60" : ""} ${className}`}
      />
    </div>
  );
}