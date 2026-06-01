import { WordmarkLogo } from "@/components/ui/WordmarkLogo";
import { Link } from "@/i18n/navigation";
import type { LegalContent } from "./privacyContent";

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
          if (block.type === "p-link") {
            return (
              <p key={i} className="text-[15px] text-text-secondary leading-[1.75]">
                {block.before}
                <Link
                  href={block.href as Parameters<typeof Link>[0]["href"]}
                  className="text-accent-primary hover:underline transition-colors"
                >
                  {block.linkText}
                </Link>
                {block.after}
              </p>
            );
          }
          if (block.type === "h3") {
            return (
              <h3 key={i} className="text-base font-semibold text-text-primary mt-6 mb-1">
                {block.text}
              </h3>
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
          if (block.type === "table") {
            return (
              <div key={i} className="overflow-x-auto rounded-md border border-border">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="border-b border-border bg-bg-elevated">
                      {block.headers.map((h, j) => (
                        <th
                          key={j}
                          className="text-left py-2.5 px-3 text-xs font-semibold text-text-muted uppercase tracking-wide whitespace-nowrap"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, j) => (
                      <tr
                        key={j}
                        className="border-b border-border/50 last:border-0 even:bg-bg-surface"
                      >
                        {row.map((cell, k) => (
                          <td
                            key={k}
                            className="py-2.5 px-3 text-[13px] text-text-secondary leading-snug align-top"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
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
        <span className="inline-block text-xs font-semibold uppercase tracking-[2px] text-accent-primary mb-4">
          {c.label}
        </span>
        <h1 className="text-4xl font-bold text-text-primary tracking-tight">{c.title}</h1>
        <p className="mt-3 text-sm text-text-muted">{c.lastUpdated}</p>
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
