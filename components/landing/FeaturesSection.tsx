import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { LockIcon, BoltIcon, EyeOffIcon, CheckBoxIcon, ArrowRightIcon } from "@/components/ui/Icons";
import { Link } from "@/i18n/navigation";

export function FeaturesSection() {
  const t = useTranslations("landing.features");

  const features = [
    { icon: <LockIcon />, label: t("privateRoomsLabel"), description: t("privateRoomsDesc") },
    { icon: <BoltIcon />, label: t("realtimeLabel"), description: t("realtimeDesc") },
    { icon: <EyeOffIcon />, label: t("anonymousLabel"), description: t("anonymousDesc") },
    { icon: <CheckBoxIcon />, label: t("actionItemsLabel"), description: t("actionItemsDesc") },
  ];

  return (
    <section id="features" className="py-28 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <Reveal className="max-w-xl mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-cyan mb-3">
            {t("sectionLabel")}
          </p>
          <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
          <p className="mt-4 text-text-secondary leading-relaxed">{t("subtitle")}</p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {features.map((f, i) => (
            <Reveal key={f.label} delay={i * 80}>
              <div className="group rounded-xl bg-bg-card border border-border p-6 hover:border-accent-cyan/30 transition-colors duration-300 h-full">
                <div className="flex items-start gap-4">
                  <div className="size-10 rounded-lg bg-bg-elevated border border-border flex items-center justify-center text-accent-cyan shrink-0 group-hover:border-accent-cyan/40 transition-colors">
                    {f.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary text-base mb-1.5">{f.label}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{f.description}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={320}>
          <div className="mt-10 flex justify-start">
            <Link
              href="/features"
              className="inline-flex items-center gap-2 text-sm text-accent-cyan hover:text-accent-cyan/80 font-medium transition-colors"
            >
              {t("viewAll")}
              <ArrowRightIcon />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
