"use client";

import { useTranslations } from "next-intl";
import type { Room } from "@/types";

type Status = Room["status"];

const styles: Record<Status, { color: string; bg: string; pulse?: boolean }> = {
  waiting: {
    color: "var(--color-text-muted)",
    bg: "var(--color-bg-elevated)",
  },
  active: {
    color: "var(--color-accent-primary)",
    bg: "color-mix(in srgb, var(--color-accent-primary) 12%, transparent)",
    pulse: true,
  },
  ended: {
    color: "var(--color-text-muted)",
    bg: "var(--color-bg-elevated)",
  },
};

export function StatusBadge({ status }: { status: Status }) {
  const t = useTranslations("statusBadge");
  const { color, bg, pulse } = styles[status];
  const label = status === "active" ? t("live") : t(status);

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
