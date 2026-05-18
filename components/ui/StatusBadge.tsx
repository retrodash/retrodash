import type { Room } from "@/types";

type Status = Room["status"];

const config: Record<
  Status,
  { label: string; color: string; bg: string; pulse?: boolean }
> = {
  waiting: {
    label: "Waiting",
    color: "var(--color-text-muted)",
    bg: "var(--color-bg-elevated)",
  },
  active: {
    label: "Live",
    color: "var(--color-accent-cyan)",
    bg: "color-mix(in srgb, var(--color-accent-cyan) 12%, transparent)",
    pulse: true,
  },
  ended: {
    label: "Ended",
    color: "var(--color-text-muted)",
    bg: "var(--color-bg-elevated)",
  },
};

export function StatusBadge({ status }: { status: Status }) {
  const { label, color, bg, pulse } = config[status];

  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-sm shrink-0"
      style={{ color, background: bg }}
    >
      {pulse && <span className="size-1.5 rounded-full bg-current animate-pulse" />}
      {label}
    </span>
  );
}
