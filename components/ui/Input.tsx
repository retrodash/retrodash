import React from "react";

// ── Input ──────────────────────────────────────────────────────

type InputSize = "sm" | "md";

export interface InputProps extends Omit<React.ComponentProps<"input">, "size"> {
  size?: InputSize;
}

const inputSizeClasses: Record<InputSize, string> = {
  sm: "h-10 px-3",
  md: "h-11 px-4",
};

const inputBase =
  "w-full bg-bg-elevated border border-border rounded-md text-text-primary placeholder:text-text-muted text-sm outline-hidden focus:border-accent-primary transition-colors";

export function Input({ size = "md", className = "", ...props }: InputProps) {
  return (
    <input
      {...props}
      className={`${inputBase} ${inputSizeClasses[size]} ${className}`}
    />
  );
}

// ── Textarea ───────────────────────────────────────────────────

const textareaBase =
  "w-full bg-bg-elevated border border-border rounded-md p-2.5 text-sm text-text-primary placeholder:text-text-muted resize-none outline-hidden focus:border-accent-primary transition-colors";

export function Textarea({
  className = "",
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      {...props}
      className={`${textareaBase} ${className}`}
    />
  );
}
