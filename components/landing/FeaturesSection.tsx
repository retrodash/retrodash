import { Reveal } from "@/components/ui/Reveal";
import {
  LockIcon,
  BoltIcon,
  EyeOffIcon,
  CheckBoxIcon,
} from "@/components/ui/Icons";

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

export function FeaturesSection() {
  return (
    <section id="features" className="py-28 border-t border-border">
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="max-w-xl mb-14">
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
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map((f, i) => (
            <Reveal key={f.label} delay={i * 80}>
              <div className="group rounded-xl bg-bg-card border border-border p-6 hover:border-accent-cyan/30 transition-colors duration-300 h-full">
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
