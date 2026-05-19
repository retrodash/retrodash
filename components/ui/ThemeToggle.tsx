"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTranslations } from "next-intl";
import { SunIcon, MoonIcon, MonitorIcon } from "@/components/ui/Icons";

const options = [
  { value: "system", Icon: MonitorIcon, labelKey: "system" },
  { value: "light",  Icon: SunIcon,     labelKey: "light"  },
  { value: "dark",   Icon: MoonIcon,    labelKey: "dark"   },
] as const;

const iconMap = { system: MonitorIcon, light: SunIcon, dark: MoonIcon } as const;

interface ThemeToggleProps {
  variant?: "inline" | "dropdown";
}

export function ThemeToggle({ variant = "inline" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("theme");
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  if (!mounted) return <div className="w-[34px] h-[34px]" aria-hidden />;

  if (variant === "inline") {
    return (
      <div className="flex items-center gap-0.5" role="group" aria-label={t("label")}>
        {options.map(({ value, Icon, labelKey }) => (
          <button
            key={value}
            onClick={() => setTheme(value)}
            aria-label={t(labelKey)}
            title={t(labelKey)}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              theme === value
                ? "text-accent-cyan"
                : "text-text-muted hover:text-text-secondary"
            }`}
          >
            <Icon size={14} />
          </button>
        ))}
      </div>
    );
  }

  const ActiveIcon = iconMap[(theme as keyof typeof iconMap) ?? "system"] ?? MonitorIcon;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t("label")}
        aria-expanded={open}
        className={`w-8 h-8 flex items-center justify-center rounded-md border transition-colors cursor-pointer ${
          open
            ? "border-border bg-bg-card text-accent-cyan"
            : "border-transparent text-text-muted hover:border-border hover:bg-bg-card hover:text-text-secondary"
        }`}
      >
        <ActiveIcon size={15} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 bg-bg-surface border border-border rounded-md shadow-lg overflow-hidden z-50">
          {options.map(({ value, Icon, labelKey }) => (
            <button
              key={value}
              onClick={() => { setTheme(value); setOpen(false); }}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors cursor-pointer ${
                theme === value
                  ? "text-accent-cyan bg-bg-card"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
              }`}
            >
              <Icon size={13} />
              {t(labelKey)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
