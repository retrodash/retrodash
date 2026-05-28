"use client";

import { useTranslations } from "next-intl";
import { WordmarkLogo } from "@/components/ui/WordmarkLogo";
import { Link, usePathname } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("landing.footer");
  const pathname = usePathname();
  return (
    <footer className="border-t border-border py-10 bg-bg-base">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <div className="flex flex-col sm:flex-row items-start justify-between gap-8">
          <div className="space-y-2">
            <WordmarkLogo />
            <p className="text-text-muted text-xs italic">{t("tagline")}</p>
          </div>

          <div className="flex flex-wrap gap-x-12 gap-y-6">
            <div className="space-y-2">
              <p className="text-text-primary text-xs font-semibold uppercase tracking-widest">
                Product
              </p>
              <div className="flex flex-col gap-1.5">
                {(
                  [
                    { href: "/features", label: t("features") },
                    { href: "/how-it-works", label: t("howItWorks") },
                    { href: "/use-cases", label: t("useCases") },
                  ] as const
                ).map(({ href, label }) => {
                  const active = pathname === href;
                  return (
                    <Link
                      key={href}
                      href={href}
                      className={`text-xs transition-colors ${
                        active
                          ? "text-accent-cyan font-medium"
                          : "text-text-muted hover:text-text-secondary"
                      }`}
                    >
                      {label}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-text-primary text-xs font-semibold uppercase tracking-widest">
                Legal
              </p>
              <div className="flex flex-col gap-1.5">
                <Link
                  href="/privacy"
                  className="text-text-muted hover:text-text-secondary text-xs transition-colors"
                >
                  {t("privacy")}
                </Link>
                <Link
                  href="/terms"
                  className="text-text-muted hover:text-text-secondary text-xs transition-colors"
                >
                  {t("terms")}
                </Link>
                <Link
                  href="/cookies"
                  className="text-text-muted hover:text-text-secondary text-xs transition-colors"
                >
                  {t("cookies")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
