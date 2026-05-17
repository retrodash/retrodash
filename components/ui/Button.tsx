import React from "react";

type Variant = "primary" | "cyan" | "ghost" | "destructive" | "ghost-text";
type Size = "xs" | "sm" | "md" | "lg";

export interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-cta text-bg-base hover:opacity-90 disabled:opacity-50",
  cyan:
    "bg-accent-cyan text-bg-base hover:opacity-90 disabled:opacity-50",
  ghost:
    "border border-border text-text-secondary hover:border-accent-cyan hover:text-text-primary disabled:opacity-50",
  destructive:
    "bg-red-500/20 text-red-400 hover:bg-red-500/30 disabled:opacity-60",
  "ghost-text":
    "text-text-muted hover:text-text-primary disabled:opacity-50",
};

const sizeClasses: Record<Size, string> = {
  xs: "h-7 px-3 text-xs",
  sm: "h-8 px-4 text-xs",
  md: "h-10 px-4 text-sm",
  lg: "h-11 px-6 text-sm",
};

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`inline-flex items-center justify-center gap-2 rounded-md font-semibold transition-colors cursor-pointer disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {children}
    </button>
  );
}
