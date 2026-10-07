import { useState, type TextareaHTMLAttributes } from "react";

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export default function TextArea({
  invalid = false,
  className = "",
  maxLength = 500,
  value,
  ...rest
}: TextAreaProps) {
  const [length, setLength] = useState(String(value ?? "").length);

  return (
    <div>
      <textarea
        {...rest}
        value={value}
        maxLength={maxLength}
        onChange={(event) => {
          setLength(event.target.value.length);
          rest.onChange?.(event);
        }}
        className={`glass-input w-full resize-none rounded-md px-3 py-2.5 text-sm leading-relaxed text-foreground-900 outline-none transition-colors placeholder:text-foreground-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/25 ${
          invalid ? "border-secondary-600/60" : ""
        } ${className}`}
      />
      <p className="mt-1 text-right text-[10.5px] text-foreground-400">
        {length}/{maxLength}
      </p>
    </div>
  );
}