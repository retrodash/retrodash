import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { Link } from "@/i18n/navigation";

export function HowItWorksSection() {
  const t = useTranslations("landing.steps");

  const steps = [
    { number: "01", title: t("step1Title"), description: t("step1Desc") },
    { number: "02", title: t("step2Title"), description: t("step2Desc") },
    { number: "03", title: t("step3Title"), description: t("step3Desc") },
  ];

  return (
    <section id="how-it-works" className="py-28 border-t border-border bg-bg-surface">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <Reveal className="max-w-xl mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-cyan mb-3">
            {t("sectionLabel")}
          </p>
          <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
          <p className="mt-4 text-text-secondary leading-relaxed">{t("subtitle")}</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 100}>
              <div className="flex flex-col">
                <div
                  className="size-12 rounded-full flex items-center justify-center mb-5 shrink-0"
                  style={{
                    background:
                      "linear-gradient(var(--color-bg-surface), var(--color-bg-surface)) padding-box, var(--gradient-brand) border-box",
                    border: "1.5px solid transparent",
                  }}
                >
                  <span className="text-sm font-bold text-text-primary">{step.number}</span>
                </div>
                <h3 className="font-semibold text-text-primary text-base mb-2">{step.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{step.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={300}>
          <div className="mt-10 flex justify-start">
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 text-sm text-accent-cyan hover:text-accent-cyan/80 font-medium transition-colors"
            >
              {t("viewGuide")}
              <ArrowRightIcon />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
