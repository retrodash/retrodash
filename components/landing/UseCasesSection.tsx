import { useTranslations } from "next-intl";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon, PeopleIcon, GlobeIcon, BoardIcon } from "@/components/ui/Icons";
import { Link } from "@/i18n/navigation";

export function UseCasesSection() {
  const t = useTranslations("landing.useCasesTeaser");

  const cases = [
    {
      icon: <PeopleIcon size={20} />,
      title: t("scrumTitle"),
      description: t("scrumDesc"),
    },
    {
      icon: <GlobeIcon size={20} />,
      title: t("remoteTitle"),
      description: t("remoteDesc"),
    },
    {
      icon: <BoardIcon />,
      title: t("productTitle"),
      description: t("productDesc"),
    },
  ];

  return (
    <section className="py-28 border-t border-border">
      <div className="max-w-6xl mx-auto px-4 lg:px-6">
        <Reveal className="max-w-xl mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-cyan mb-3">
            {t("sectionLabel")}
          </p>
          <h2 className="text-3xl font-bold tracking-tight">{t("title")}</h2>
          <p className="mt-4 text-text-secondary leading-relaxed">{t("subtitle")}</p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {cases.map((c, i) => (
            <Reveal key={c.title} delay={i * 80}>
              <div className="group rounded-xl bg-bg-card border border-border p-6 hover:border-accent-cyan/30 transition-colors duration-300 h-full flex flex-col">
                <div className="size-10 rounded-lg bg-bg-elevated border border-border flex items-center justify-center text-accent-cyan mb-4 group-hover:border-accent-cyan/40 transition-colors shrink-0">
                  {c.icon}
                </div>
                <h3 className="font-semibold text-text-primary text-base mb-2">{c.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed flex-1">
                  {c.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={240}>
          <div className="flex justify-start">
            <Link
              href="/use-cases"
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
