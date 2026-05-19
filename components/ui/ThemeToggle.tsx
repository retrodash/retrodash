"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { SunIcon, MoonIcon, MonitorIcon } from "@/components/ui/Icons";

const options = [
  { value: "system", Icon: MonitorIcon, labelKey: "system" },
  { value: "light",  Icon: SunIcon,     labelKey: "light"  },
  { value: "dark",   Icon: MoonIcon,    labelKey: "dark"   },
] as const;

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const t = useTranslations("theme");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return <div className="w-[72px]" aria-hidden />;

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
