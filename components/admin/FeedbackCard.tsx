import type { Feedback } from "@/types";

function formatDate(feedback: Feedback): string {
  if (!feedback.createdAt) return "";
  const date = feedback.createdAt.toDate();
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function Initials({ name }: { name: string }) {
  const parts = name.trim().split(" ");
  const initials =
    parts.length >= 2
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`
      : name.slice(0, 2);
  return (
    <div className="size-7 rounded-full bg-accent-violet/20 text-accent-violet text-[10px] font-bold flex items-center justify-center shrink-0 uppercase">
      {initials}
    </div>
  );
}

export function FeedbackCard({ item }: { item: Feedback }) {
  return (
    <article className="bg-bg-card border border-border rounded-md p-4 flex flex-col gap-3">
      <div className="flex items-center gap-2.5">
        <Initials name={item.userName || "?"} />
        <div className="min-w-0">
          <p className="text-sm font-medium text-text-primary truncate">
            {item.userName}
          </p>
          <p className="text-[11px] text-text-muted truncate">{item.userEmail}</p>
        </div>
      </div>

      <p className="text-sm text-text-secondary leading-relaxed whitespace-pre-wrap break-words">
        {item.message}
      </p>

      <p className="text-[11px] text-text-muted mt-auto">{formatDate(item)}</p>
    </article>
  );
}
