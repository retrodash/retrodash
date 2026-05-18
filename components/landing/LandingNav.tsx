import { useTranslations } from "next-intl";
import { WordmarkLogo } from "@/components/ui/WordmarkLogo";
import { CTALink, type CTAProps } from "@/components/ui/CTALink";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";

export function LandingNav({ ctaHref, ctaLabel, loading }: CTAProps) {
  const t = useTranslations("landing");
  return (
    <header className="sticky top-0 z-50 bg-bg-base/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <WordmarkLogo />
        <nav className="flex items-center gap-4">
          <a
            href="#features"
            className="text-text-muted hover:text-text-secondary text-sm transition-colors hidden sm:block"
          >
            {t("nav.features")}
          </a>
          <a
            href="#how-it-works"
            className="text-text-muted hover:text-text-secondary text-sm transition-colors hidden sm:block"
          >
            {t("nav.howItWorks")}
          </a>
          <LanguageSwitcher />
          <CTALink href={ctaHref} label={ctaLabel} loading={loading} size="sm" />
        </nav>
      </div>
    </header>
  );
}
