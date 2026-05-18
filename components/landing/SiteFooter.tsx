import { useTranslations } from "next-intl";
import { WordmarkLogo } from "@/components/ui/WordmarkLogo";

export function SiteFooter() {
  const t = useTranslations("landing.footer");
  return (
    <footer className="border-t border-border py-8 bg-bg-base">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4 flex-wrap">
        <WordmarkLogo />
        <p className="text-text-muted text-xs italic">{t("tagline")}</p>
      </div>
    </footer>
  );
}
