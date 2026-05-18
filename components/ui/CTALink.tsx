import Link from "next/link";

export interface CTAProps {
  ctaHref: string;
  ctaLabel: string;
  loading: boolean;
}

interface CTALinkProps {
  href: string;
  label: string;
  loading: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "gradient";
}

const sizes: Record<"sm" | "md" | "lg", string> = {
  sm: "h-8 px-4 text-xs",
  md: "h-9 px-5 text-sm",
  lg: "h-11 px-7 text-sm",
};

export function CTALink({
  href,
  label,
  loading,
  size = "md",
  variant = "solid",
}: CTALinkProps) {
  return (
    <Link
      href={loading ? "#" : href}
      className={`inline-flex items-center justify-center rounded-lg font-semibold text-bg-base hover:opacity-90 transition-opacity ${sizes[size]} ${variant === "solid" ? "bg-cta" : ""} ${loading ? "opacity-50 pointer-events-none" : ""}`}
      style={
        variant === "gradient"
          ? { backgroundImage: "var(--gradient-brand)" }
          : undefined
      }
    >
      {loading ? "   " : label}
    </Link>
  );
}
