import { useEffect, useMemo, useRef, useState } from "react";

export interface LookupOption {
  value: string;
  hint?: string;
}

interface LookupFieldProps {
  label: string;
  value: string;
  placeholder: string;
  options: LookupOption[];
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  help?: string;
  disabled?: boolean;
  icon?: string;
  emptyText?: string;
}

/**
 * Searchable inline dropdown. Renders the option list directly beneath the
 * field (never a bottom sheet) so long forms stay readable on mobile.
 */
export default function LookupField({
  label,
  value,
  placeholder,
  options,
  onChange,
  required = false,
  error,
  help,
  disabled = false,
  icon = "ri-list-check-2",
  emptyText = "No authorised options available",
}: LookupFieldProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return options;
    return options.filter(
      (option) =>
        option.value.toLowerCase().includes(q) || (option.hint ?? "").toLowerCase().includes(q),
    );
  }, [options, query]);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(event.target as Node)) {
        setOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) searchRef.current?.focus();
  }, [open]);

  const close = () => {
    setOpen(false);
    setQuery("");
  };

  return (
    <div ref={wrapRef} className="relative">
      <label className="mb-1.5 block text-xs font-semibold text-foreground-700">
        {label}
        {required ? <span className="ml-0.5 text-secondary-700">*</span> : null}
      </label>

      <button
        type="button"
        disabled={disabled}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={`glass-input flex w-full cursor-pointer items-center gap-2 rounded-md px-3 py-2.5 text-left text-sm transition-colors focus:border-primary-500 focus:ring-2 focus:ring-primary-500/25 disabled:cursor-not-allowed disabled:opacity-55 ${
          error ? "border-secondary-600/60" : ""
        }`}
      >
        <span className="flex h-5 w-5 items-center justify-center text-foreground-400">
          <i className={`${icon} text-[17px]`} />
        </span>
        <span className={`min-w-0 flex-1 truncate ${value ? "text-foreground-900" : "text-foreground-400"}`}>
          {value || placeholder}
        </span>
        <i className={`${open ? "ri-arrow-up-s-line" : "ri-arrow-down-s-line"} text-[18px] text-foreground-400`} />
      </button>

      {error ? (
        <p className="mt-1.5 flex items-start gap-1.5 text-[11px] font-medium text-secondary-700">
          <i className="ri-error-warning-line mt-[1px] text-[13px]" />
          {error}
        </p>
      ) : help ? (
        <p className="mt-1.5 text-[11px] leading-relaxed text-foreground-500">{help}</p>
      ) : null}

      {open ? (
        <div className="glass-strong absolute left-0 right-0 z-40 mt-1.5 overflow-hidden rounded-lg border border-background-300">
          <div className="relative border-b border-background-200 p-2">
            <span className="pointer-events-none absolute left-4 top-1/2 flex h-5 w-5 -translate-y-1/2 items-center justify-center text-foreground-400">
              <i className="ri-search-line text-[16px]" />
            </span>
            <input
              ref={searchRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${label.toLowerCase()}...`}
              className="glass-input w-full rounded-md py-2 pl-8 pr-3 text-sm text-foreground-900 outline-none placeholder:text-foreground-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/25"
            />
          </div>

          <div className="no-scrollbar max-h-60 overflow-y-auto p-1.5">
            {filtered.length === 0 ? (
              <div className="px-3 py-6 text-center">
                <i className="ri-search-eye-line text-[20px] text-foreground-400" />
                <p className="mt-1.5 text-xs text-foreground-600">{emptyText}</p>
              </div>
            ) : (
              filtered.map((option) => {
                const isSelected = option.value === value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      onChange(option.value);
                      close();
                    }}
                    className={`flex w-full cursor-pointer items-center justify-between gap-3 rounded-md px-3 py-2.5 text-left transition-colors ${
                      isSelected ? "bg-primary-500/18" : "hover:bg-background-100"
                    }`}
                  >
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-foreground-950">
                        {option.value}
                      </span>
                      {option.hint ? (
                        <span className="block truncate text-[11px] text-foreground-500">
                          {option.hint}
                        </span>
                      ) : null}
                    </span>
                    {isSelected ? (
                      <i className="ri-check-line shrink-0 text-[18px] text-primary-700" />
                    ) : null}
                  </button>
                );
              })
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}