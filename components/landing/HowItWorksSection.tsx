import { Reveal } from "@/components/ui/Reveal";

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

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-28 border-t border-border bg-bg-surface"
    >
      <div className="max-w-6xl mx-auto px-6">
        <Reveal className="max-w-xl mb-14">
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
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {STEPS.map((step, i) => (
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
