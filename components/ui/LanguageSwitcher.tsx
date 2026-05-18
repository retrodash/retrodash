"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTransition } from "react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (next: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div className={`flex items-center gap-0.5 ${isPending ? "opacity-60 pointer-events-none" : ""}`}>
      <button
        onClick={() => switchLocale("en")}
        className={`text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded transition-colors cursor-pointer ${
          locale === "en"
            ? "text-accent-cyan"
            : "text-text-muted hover:text-text-secondary"
        }`}
      >
        EN
      </button>
      <span className="text-text-muted/40 text-xs select-none" aria-hidden>
        |
      </span>
      <button
        onClick={() => switchLocale("pt-BR")}
        className={`text-xs font-semibold uppercase tracking-wide px-2 py-1 rounded transition-colors cursor-pointer ${
          locale === "pt-BR"
            ? "text-accent-cyan"
            : "text-text-muted hover:text-text-secondary"
        }`}
      >
        PT
      </button>
    </div>
  );
}
