import { useTranslations } from "next-intl";
import { WordmarkLogo } from "@/components/ui/WordmarkLogo";
import { Link } from "@/i18n/navigation";

export function SiteFooter() {
  const t = useTranslations("landing.footer");
  return (
    <footer className="border-t border-border py-8 bg-bg-base">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 flex-wrap">
        <WordmarkLogo />
        <div className="flex items-center gap-6">
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
          <p className="text-text-muted text-xs italic">{t("tagline")}</p>
        </div>
      </div>
    </footer>
  );
}
