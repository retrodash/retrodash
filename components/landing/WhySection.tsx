import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { TrophyIcon, LoopIcon, EyeOffIcon, MonitorIcon } from "@/components/ui/Icons";

export function WhySection() {
  const t = useTranslations("landing.why");

  const items = [
    {
      icon: <TrophyIcon />,
      label: t("gamificationLabel"),
      description: t("gamificationDesc"),
      color: "cyan" as const,
    },
    {
      icon: <LoopIcon />,
      label: t("carryOverLabel"),
      description: t("carryOverDesc"),
      color: "violet" as const,
    },
    {
      icon: <EyeOffIcon />,
      label: t("anonymousModeLabel"),
      description: t("anonymousModeDesc"),
      color: "cyan" as const,
    },
    {
      icon: <MonitorIcon size={18} />,
      label: t("themingLabel"),
      description: t("themingDesc"),
      color: "violet" as const,
    },
  ];

  return (
    <section className="py-28 border-t border-border bg-bg-surface">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <Reveal className="max-w-xl mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-cyan mb-3">
            {t("sectionLabel")}
          </p>
          <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
          <p className="mt-4 text-text-secondary leading-relaxed">{t("subtitle")}</p>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 80}>
              <div className="group rounded-xl bg-bg-card border border-border p-7 hover:border-accent-cyan/30 transition-colors duration-300 h-full">
                <div className="flex items-start gap-5">
                  <div
                    className={`size-11 rounded-xl bg-bg-elevated border border-border flex items-center justify-center shrink-0 group-hover:border-accent-cyan/40 transition-colors ${
                      item.color === "cyan" ? "text-accent-cyan" : "text-accent-violet"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-text-primary text-base mb-1.5">
                      {item.label}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
