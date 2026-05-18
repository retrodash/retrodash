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
          <span className="text-[9px] text-text-secondary leading-tight">
            {c.text}
          </span>
          {c.votes > 0 && (
            <span
              className={`text-[9px] font-bold shrink-0 ${
                c.color === "cyan"
                  ? "text-accent-cyan/70"
                  : "text-accent-violet/70"
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
              item.done
                ? "bg-accent-cyan border-accent-cyan"
                : "border-text-muted"
            }`}
          >
            {item.done && (
              <svg
                width="6"
                height="6"
                viewBox="0 0 6 6"
                fill="none"
                aria-hidden
              >
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

export function BoardPreview() {
  return (
    <div
      className="relative"
      style={{ animation: "float 7s ease-in-out infinite" }}
    >
      <div
        className="absolute -inset-4 rounded-3xl bg-accent-cyan/4 blur-2xl"
        aria-hidden
      />
      <div className="relative rounded-2xl border border-border bg-bg-surface shadow-2xl overflow-hidden">
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border bg-bg-surface">
          <div className="flex gap-1.5" aria-hidden>
            <div className="size-2.5 rounded-full bg-border" />
            <div className="size-2.5 rounded-full bg-border" />
            <div className="size-2.5 rounded-full bg-border" />
          </div>
          <div className="flex-1 h-5 rounded bg-bg-card flex items-center px-2.5">
            <span className="text-[10px] text-text-muted">
              retrodash.app/room/sprint-42
            </span>
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
