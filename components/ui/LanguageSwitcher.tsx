"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useEffect, useRef, useState, useTransition } from "react";
import { GlobeIcon } from "@/components/ui/Icons";

const options = [
  { locale: "en",   labelKey: "en"   },
  { locale: "pt-BR", labelKey: "ptBR" },
] as const;

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("language");
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  const switchLocale = (next: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
    setOpen(false);
  };

  return (
    <div ref={ref} className={`relative${isPending ? " opacity-60 pointer-events-none" : ""}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={t("label")}
        aria-expanded={open}
        className={`w-8 h-8 flex items-center justify-center rounded-md border transition-colors cursor-pointer ${
          open
            ? "border-border bg-bg-card text-accent-primary"
            : "border-transparent text-text-muted hover:border-border hover:bg-bg-card hover:text-text-secondary"
        }`}
      >
        <GlobeIcon size={15} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-36 bg-bg-surface border border-border rounded-md shadow-lg overflow-hidden z-50">
          {options.map(({ locale: opt, labelKey }) => (
            <button
              key={opt}
              onClick={() => switchLocale(opt)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors cursor-pointer ${
                locale === opt
                  ? "text-accent-primary bg-bg-card"
                  : "text-text-secondary hover:text-text-primary hover:bg-bg-card"
              }`}
            >
              {t(labelKey)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
