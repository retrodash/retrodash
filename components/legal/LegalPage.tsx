import { WordmarkLogo } from "@/components/ui/WordmarkLogo";
import { Link } from "@/i18n/navigation";
import type { LegalContent } from "./privacyContent";

function LegalNote({ text }: { text: string }) {
  return (
    <div className="flex gap-3 rounded-lg bg-accent-cta/5 border border-accent-cta/20 p-4">
      <p className="text-sm text-accent-cta/80 leading-relaxed">{text}</p>
    </div>
  );
}

function Section({ section }: { section: LegalContent["sections"][number] }) {
  return (
    <section id={section.id}>
      <h2 className="text-xl font-semibold text-text-primary pb-3 mb-6 border-b border-border">
        {section.title}
      </h2>
      <div className="space-y-4">
        {section.blocks.map((block, i) => {
          if (block.type === "p") {
            return (
              <p key={i} className="text-[15px] text-text-secondary leading-[1.75]">
                {block.text}
              </p>
            );
          }
          if (block.type === "ul") {
            return (
              <ul key={i} className="space-y-2 pl-5 list-disc marker:text-text-muted">
                {block.items.map((item, j) => (
                  <li key={j} className="text-[15px] text-text-secondary leading-[1.75]">
                    {item}
                  </li>
                ))}
              </ul>
            );
          }
          if (block.type === "legal") {
            return <LegalNote key={i} text={block.text} />;
          }
          return null;
        })}
      </div>
    </section>
  );
}

export function LegalPage({ content }: { content: LegalContent }) {
  const c = content;

  return (
    <div className="min-h-screen bg-bg-base text-text-primary">
      <header className="sticky top-0 z-50 bg-bg-base/90 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <WordmarkLogo />
          <Link
            href="/"
            className="text-sm text-text-muted hover:text-text-secondary transition-colors"
          >
            {c.backHome}
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-6 pt-16 pb-10 border-b border-border">
        <span className="inline-block text-xs font-semibold uppercase tracking-[2px] text-accent-cyan mb-4">
          {c.label}
        </span>
        <h1 className="text-4xl font-bold text-text-primary tracking-tight">{c.title}</h1>
        <p className="mt-3 text-sm text-text-muted">{c.lastUpdated}</p>

        <div className="mt-6 flex gap-3 rounded-lg bg-bg-card border border-border p-4">
          <span className="text-accent-cta text-base leading-none mt-0.5 shrink-0">⚠️</span>
          <p className="text-sm text-text-secondary leading-relaxed">{c.disclaimer}</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16 space-y-14">
        {c.sections.map((section) => (
          <Section key={section.id} section={section} />
        ))}
      </div>

      <footer className="border-t border-border py-10">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between gap-4 flex-wrap">
          <WordmarkLogo />
          <p className="text-text-muted text-xs italic">Reflect Together. Improve Always.</p>
        </div>
      </footer>
    </div>
  );
}
