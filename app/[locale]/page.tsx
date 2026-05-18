"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useRef, useState, ReactNode } from "react";

function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          ob.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : "translateY(24px)",
        transition: `opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.65s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

interface CTAProps {
  ctaHref: string;
  ctaLabel: string;
  loading: boolean;
}

export default function LandingPage() {
  const { user, loading } = useAuth();
  const t = useTranslations("landing");
  const ctaHref = user ? "/dashboard" : "/login";
  const ctaLabel = user ? t("nav.accessDashboard") : t("nav.getStarted");

  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex flex-col overflow-x-hidden">
      <LandingNav ctaHref={ctaHref} ctaLabel={ctaLabel} loading={loading} />
      <main className="flex-1">
        <HeroSection ctaHref={ctaHref} ctaLabel={ctaLabel} loading={loading} />
        <FeaturesSection />
        <HowItWorksSection />
        <FinalCTASection ctaHref={ctaHref} ctaLabel={ctaLabel} loading={loading} />
      </main>
      <SiteFooter />
    </div>
  );
}

// ── Navbar ───────────────────────────────────────────────────────

function LandingNav({ ctaHref, ctaLabel, loading }: CTAProps) {
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

// ── Hero ─────────────────────────────────────────────────────────

function HeroSection({ ctaHref, ctaLabel, loading }: CTAProps) {
  const t = useTranslations("landing");
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-1/4 left-1/4 w-130 h-105 rounded-full bg-accent-cyan/6 blur-[130px]"
          style={{ animation: "glow-pulse 9s ease-in-out infinite" }}
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-110 h-90 rounded-full bg-accent-violet/6 blur-[110px]"
          style={{ animation: "glow-pulse 12s ease-in-out infinite 3s" }}
        />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-card border border-border text-[11px] font-semibold uppercase tracking-widest text-text-muted"
            style={{ animation: "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0ms both" }}
          >
            <span className="size-1.5 rounded-full bg-accent-cyan animate-pulse" />
            {t("hero.badge")}
          </div>

          <div style={{ animation: "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) 100ms both" }}>
            <h1 className="text-5xl lg:text-[3.75rem] font-bold leading-[1.1] tracking-tight">
              {t("hero.title")}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-brand)" }}
              >
                {t("hero.titleGradient")}
              </span>
            </h1>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-md">
              {t("hero.subtitle")}
            </p>
          </div>

          <div
            className="flex items-center gap-5 flex-wrap"
            style={{ animation: "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) 220ms both" }}
          >
            <CTALink href={ctaHref} label={ctaLabel} loading={loading} size="lg" />
            <a
              href="#how-it-works"
              className="text-text-muted hover:text-text-primary text-sm transition-colors inline-flex items-center gap-1.5"
            >
              {t("hero.seeHowItWorks")}
              <ArrowRightIcon />
            </a>
          </div>

          <p
            className="text-text-muted text-xs"
            style={{ animation: "fade-up 0.6s cubic-bezier(0.22, 1, 0.36, 1) 320ms both" }}
          >
            {t("hero.freeNotice")}
          </p>
        </div>

        <div
          className="hidden lg:block"
          style={{ animation: "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) 150ms both" }}
        >
          <BoardPreview />
        </div>
      </div>
    </section>
  );
}

// ── Board preview ────────────────────────────────────────────────

function BoardPreview() {
  return (
    <div className="relative" style={{ animation: "float 7s ease-in-out infinite" }}>
      <div className="absolute -inset-4 rounded-3xl bg-accent-cyan/4 blur-2xl" aria-hidden />
      <div className="relative rounded-2xl border border-border bg-bg-surface shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-bg-surface">
          <div className="flex gap-1.5" aria-hidden>
            <div className="size-2.5 rounded-full bg-border" />
            <div className="size-2.5 rounded-full bg-border" />
            <div className="size-2.5 rounded-full bg-border" />
          </div>
          <div className="flex-1 h-5 rounded bg-bg-card flex items-center px-2.5">
            <span className="text-[10px] text-text-muted">retrodash.app/room/sprint-42</span>
          </div>
          <div className="text-[9px] font-semibold uppercase tracking-widest text-accent-cyan/60">
            Live · 4
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 p-3">
          <PreviewColumn
            title="What went well"
            cards={[
              { text: "Great team sync", votes: 4, color: "cyan" },
              { text: "Shipped on time!", votes: 3, color: "cyan" },
              { text: "CI pipeline win", votes: 2, color: "cyan" },
            ]}
          />
          <PreviewColumn
            title="To improve"
            cards={[
              { text: "Clearer ticket scope", votes: 5, color: "violet" },
              { text: "More async updates", votes: 2, color: "violet" },
              { text: "Earlier code review", votes: 1, color: "violet" },
            ]}
          />
          <PreviewActionColumn
            title="Action items"
            items={[
              { text: "Add PR template", done: true },
              { text: "Weekly async update", done: false },
              { text: "Refine story sizing", done: false },
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function PreviewColumn({
  title,
  cards,
}: {
  title: string;
  cards: { text: string; votes: number; color: "cyan" | "violet" }[];
}) {
  return (
    <div className="bg-bg-card rounded-lg p-2 space-y-1.5">
      <div className="text-[9px] font-semibold uppercase tracking-wider text-text-muted pb-1.5 border-b border-border">
        {title}
      </div>
      {cards.map((c) => (
        <div
          key={c.text}
          className="rounded bg-bg-elevated border border-border/60 px-2 py-1.5 flex items-center justify-between gap-1"
        >
          <span className="text-[9px] text-text-secondary leading-tight">{c.text}</span>
          {c.votes > 0 && (
            <span
              className={`text-[9px] font-bold shrink-0 ${
                c.color === "cyan" ? "text-accent-cyan/70" : "text-accent-violet/70"
              }`}
            >
              +{c.votes}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

function PreviewActionColumn({
  title,
  items,
}: {
  title: string;
  items: { text: string; done: boolean }[];
}) {
  return (
    <div className="bg-bg-card rounded-lg p-2 space-y-1.5">
      <div className="text-[9px] font-semibold uppercase tracking-wider text-accent-cyan pb-1.5 border-b border-border/50">
        {title}
      </div>
      {items.map((item) => (
        <div
          key={item.text}
          className="rounded bg-bg-elevated border border-border/60 px-2 py-1.5 flex items-center gap-1.5"
        >
          <div
            className={`size-2.5 rounded-sm border shrink-0 flex items-center justify-center ${
              item.done ? "bg-accent-cyan border-accent-cyan" : "border-text-muted"
            }`}
          >
            {item.done && (
              <svg width="6" height="6" viewBox="0 0 6 6" fill="none" aria-hidden>
                <path
                  d="M1 3l1.5 1.5L5 1.5"
                  stroke="var(--color-bg-base)"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <span
            className={`text-[9px] leading-tight ${
              item.done ? "line-through text-text-muted" : "text-text-secondary"
            }`}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Features ─────────────────────────────────────────────────────

function FeaturesSection() {
  const t = useTranslations("landing.features");

  const features = [
    { icon: <LockIcon />, label: t("privateRoomsLabel"), description: t("privateRoomsDesc") },
    { icon: <BoltIcon />, label: t("realtimeLabel"), description: t("realtimeDesc") },
    { icon: <EyeOffIcon />, label: t("anonymousLabel"), description: t("anonymousDesc") },
    { icon: <CheckBoxIcon />, label: t("actionItemsLabel"), description: t("actionItemsDesc") },
  ];

  return (
    <section id="features" className="py-28 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
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
      </div>
    </section>
  );
}

// ── How it works ─────────────────────────────────────────────────

function HowItWorksSection() {
  const t = useTranslations("landing.steps");

  const steps = [
    { number: "01", title: t("step1Title"), description: t("step1Desc") },
    { number: "02", title: t("step2Title"), description: t("step2Desc") },
    { number: "03", title: t("step3Title"), description: t("step3Desc") },
  ];

  return (
    <section id="how-it-works" className="py-28 border-t border-border bg-bg-surface">
      <div className="max-w-6xl mx-auto px-6">
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
      </div>
    </section>
  );
}

// ── Final CTA ────────────────────────────────────────────────────

function FinalCTASection({ ctaHref, ctaLabel, loading }: CTAProps) {
  const t = useTranslations("landing.cta");
  return (
    <section className="py-32 border-t border-border relative overflow-hidden bg-bg-surface">
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-75 rounded-full bg-accent-cyan/5 blur-[110px]"
          style={{ animation: "glow-pulse 8s ease-in-out infinite" }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-100 h-50 rounded-full bg-accent-violet/6 blur-[80px]"
          style={{ animation: "glow-pulse 10s ease-in-out infinite 2s" }}
        />
      </div>

      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <Reveal>
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-cyan mb-6">
              {t("sectionLabel")}
            </p>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight leading-[1.1] mb-6">
              {t("title")}{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-brand)" }}
              >
                {t("titleGradient")}
              </span>
            </h2>
            <p className="text-text-secondary text-lg mb-10 max-w-md mx-auto leading-relaxed">
              {t("subtitle")}
            </p>
            <div className="flex justify-center">
              <CTALink href={ctaHref} label={ctaLabel} loading={loading} size="lg" variant="gradient" />
            </div>
            <p className="mt-6 text-text-muted text-xs">{t("notice")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────

function SiteFooter() {
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

// ── Logo wordmark ────────────────────────────────────────────────

function WordmarkLogo() {
  return (
    <Link href="/" className="shrink-0">
      <Image src="/logo.svg" alt="RetroDash" width={110} height={48} priority />
    </Link>
  );
}

// ── CTA Link ─────────────────────────────────────────────────────

function CTALink({
  href,
  label,
  loading,
  size = "md",
  variant = "solid",
}: {
  href: string;
  label: string;
  loading: boolean;
  size?: "sm" | "md" | "lg";
  variant?: "solid" | "gradient";
}) {
  const sizes = {
    sm: "h-8 px-4 text-xs",
    md: "h-9 px-5 text-sm",
    lg: "h-11 px-7 text-sm",
  };

  return (
    <Link
      href={loading ? "#" : href}
      className={`inline-flex items-center justify-center rounded-lg font-semibold text-bg-base hover:opacity-90 transition-opacity ${sizes[size]} ${variant === "solid" ? "bg-cta" : ""} ${loading ? "opacity-50 pointer-events-none" : ""}`}
      style={variant === "gradient" ? { backgroundImage: "var(--gradient-brand)" } : undefined}
    >
      {loading ? "   " : label}
    </Link>
  );
}

// ── Icons ────────────────────────────────────────────────────────

function ArrowRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
    </svg>
  );
}

function EyeOffIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );
}

function CheckBoxIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="9 11 12 14 22 4" />
      <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
    </svg>
  );
}
