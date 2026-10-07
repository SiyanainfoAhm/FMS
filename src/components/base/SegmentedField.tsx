interface SegmentedOption {
  value: string;
  label: string;
  icon?: string;
}

interface SegmentedFieldProps {
  label?: string;
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  help?: string;
  fullWidth?: boolean;
}

export default function SegmentedField({
  label,
  options,
  value,
  onChange,
  required = false,
  error,
  help,
  fullWidth = false,
}: SegmentedFieldProps) {
  return (
    <div>
      {label ? (
        <label className="mb-1.5 block text-xs font-semibold text-foreground-700">
          {label}
          {required ? <span className="ml-0.5 text-secondary-700">*</span> : null}
        </label>
      ) : null}
      <div
        className={`glass-input inline-flex rounded-full p-1 ${fullWidth ? "flex w-full" : ""}`}
      >
        {options.map((option) => {
          const isActive = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`flex cursor-pointer items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                fullWidth ? "flex-1" : ""
              } ${
                isActive
                  ? "bg-primary-600 text-background-50"
                  : "text-foreground-600 hover:text-foreground-900"
              }`}
            >
              {option.icon ? <i className={`${option.icon} text-[14px]`} /> : null}
              {option.label}
            </button>
          );
        })}
      </div>
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