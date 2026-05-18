"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

// ── Page ────────────────────────────────────────────────────────

export default function LandingPage() {
  const { user, loading } = useAuth();
  const ctaHref = user ? "/dashboard" : "/login";
  const ctaLabel = user ? "Access Dashboard" : "Get Started";

  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex flex-col overflow-x-hidden">
      <LandingNav ctaHref={ctaHref} ctaLabel={ctaLabel} loading={loading} />
      <main className="flex-1">
        <HeroSection ctaHref={ctaHref} ctaLabel={ctaLabel} loading={loading} />
        <FeaturesSection />
        <HowItWorksSection />
      </main>
      <SiteFooter />
    </div>
  );
}

// ── Navbar ──────────────────────────────────────────────────────

function LandingNav({ ctaHref, ctaLabel, loading }: CTAProps) {
  return (
    <header className="sticky top-0 z-50 bg-bg-base/80 backdrop-blur-md border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <WordmarkLogo />
        <nav className="flex items-center gap-6">
          <a
            href="#features"
            className="text-text-muted hover:text-text-secondary text-sm transition-colors hidden sm:block"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-text-muted hover:text-text-secondary text-sm transition-colors hidden sm:block"
          >
            How it works
          </a>
          <CTALink href={ctaHref} label={ctaLabel} loading={loading} size="sm" />
        </nav>
      </div>
    </header>
  );
}

// ── Hero ────────────────────────────────────────────────────────

function HeroSection({ ctaHref, ctaLabel, loading }: CTAProps) {
  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      {/* Atmospheric background glows */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div className="absolute top-1/4 left-1/4 w-130 h-105 rounded-full bg-accent-cyan/6 blur-[130px]" />
        <div className="absolute bottom-1/4 right-1/4 w-110 h-90 rounded-full bg-accent-violet/6 blur-[110px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 py-24 w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Copy */}
        <div className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-bg-card border border-border text-[11px] font-semibold uppercase tracking-widest text-text-muted">
            <span className="size-1.5 rounded-full bg-accent-cyan animate-pulse" />
            Retrospective Platform
          </div>

          <div>
            <h1 className="text-5xl lg:text-[3.75rem] font-bold leading-[1.1] tracking-tight">
              Better retros,{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-brand)" }}
              >
                every sprint.
              </span>
            </h1>
            <p className="mt-6 text-lg text-text-secondary leading-relaxed max-w-md">
              A private, real-time retrospective board for Scrum and Kanban
              teams. Reflect honestly, vote together, and ship action items that
              stick.
            </p>
          </div>

          <div className="flex items-center gap-5 flex-wrap">
            <CTALink href={ctaHref} label={ctaLabel} loading={loading} size="lg" />
            <a
              href="#how-it-works"
              className="text-text-muted hover:text-text-primary text-sm transition-colors inline-flex items-center gap-1.5"
            >
              See how it works
              <ArrowRightIcon />
            </a>
          </div>

          <p className="text-text-muted text-xs">
            Free to use &middot; No credit card required &middot; Works with any team
          </p>
        </div>

        {/* Board preview widget */}
        <div className="hidden lg:block">
          <BoardPreview />
        </div>
      </div>
    </section>
  );
}

// ── Board preview ───────────────────────────────────────────────

function BoardPreview() {
  return (
    <div className="relative">
      <div className="absolute -inset-4 rounded-3xl bg-accent-cyan/4 blur-2xl" aria-hidden />
      <div className="relative rounded-2xl border border-border bg-bg-surface shadow-2xl overflow-hidden">
        {/* Fake browser bar */}
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

        {/* Columns */}
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

const FEATURES = [
  {
    icon: <LockIcon />,
    label: "Private Rooms",
    description:
      "Password-protected spaces where your team can speak freely. No uninvited observers, ever.",
  },
  {
    icon: <BoltIcon />,
    label: "Real-time Collaboration",
    description:
      "Cards, votes, and status updates appear instantly for every participant — no refreshing required.",
  },
  {
    icon: <EyeOffIcon />,
    label: "Anonymous Mode",
    description:
      "Let your team share honest feedback without their names attached. Psychological safety, built in.",
  },
  {
    icon: <CheckBoxIcon />,
    label: "Action Items",
    description:
      "Capture outcomes directly on the board and track them to completion — no external tool needed.",
  },
] as const;

function FeaturesSection() {
  return (
    <section id="features" className="py-28 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-cyan mb-3">
            What is RetroDash
          </p>
          <h2 className="text-3xl font-bold tracking-tight">
            Everything your team needs for a great retrospective.
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            Built for teams who care about continuous improvement — not just
            ticking a ceremony box.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.label}
              className="group rounded-xl bg-bg-card border border-border p-6 hover:border-accent-cyan/30 transition-colors duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="size-10 rounded-lg bg-bg-elevated border border-border flex items-center justify-center text-accent-cyan shrink-0 group-hover:border-accent-cyan/40 transition-colors">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-text-primary text-base mb-1.5">
                    {f.label}
                  </h3>
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {f.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── How it works ─────────────────────────────────────────────────

const STEPS = [
  {
    number: "01",
    title: "Create a Room",
    description:
      "Name your retro, choose your columns, and protect it with a password. Ready in under a minute.",
  },
  {
    number: "02",
    title: "Invite Your Team",
    description:
      "Share the room link and password with your teammates. Anyone with the link can join.",
  },
  {
    number: "03",
    title: "Run the Retro",
    description:
      "Add cards, vote on what matters most, discuss as a team, and close with clear action items.",
  },
] as const;

function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-28 border-t border-border bg-bg-surface">
      <div className="max-w-6xl mx-auto px-6">
        <div className="max-w-xl mb-14">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-accent-cyan mb-3">
            How it works
          </p>
          <h2 className="text-3xl font-bold tracking-tight">
            Up and running in minutes.
          </h2>
          <p className="mt-4 text-text-secondary leading-relaxed">
            No onboarding calls. No complex setup. Just open a room and start
            reflecting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {STEPS.map((step) => (
            <div key={step.number} className="flex flex-col">
              {/* Gradient-border circle */}
              <div
                className="size-12 rounded-full flex items-center justify-center mb-5 shrink-0"
                style={{
                  background:
                    "linear-gradient(var(--color-bg-surface), var(--color-bg-surface)) padding-box, var(--gradient-brand) border-box",
                  border: "1.5px solid transparent",
                }}
              >
                <span className="text-sm font-bold text-text-primary">
                  {step.number}
                </span>
              </div>
              <h3 className="font-semibold text-text-primary text-base mb-2">
                {step.title}
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Footer ───────────────────────────────────────────────────────

function SiteFooter() {
  return (
    <footer className="border-t border-border py-8 bg-bg-base">
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between gap-4 flex-wrap">
        <WordmarkLogo />
        <p className="text-text-muted text-xs italic">
          Reflect Together. Improve Always.
        </p>
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

interface CTAProps {
  ctaHref: string;
  ctaLabel: string;
  loading: boolean;
}

function CTALink({
  href,
  label,
  loading,
  size = "md",
}: {
  href: string;
  label: string;
  loading: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const sizes = {
    sm: "h-8 px-4 text-xs",
    md: "h-9 px-5 text-sm",
    lg: "h-11 px-7 text-sm",
  };

  return (
    <Link
      href={loading ? "#" : href}
      className={`inline-flex items-center justify-center rounded-lg font-semibold bg-cta text-bg-base hover:opacity-90 transition-opacity ${sizes[size]} ${loading ? "opacity-50 pointer-events-none" : ""}`}
    >
      {loading ? "   " : label}
    </Link>
  );
}

// ── Icons ────────────────────────────────────────────────────────

function ArrowRightIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M2 6h8M6 2l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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
