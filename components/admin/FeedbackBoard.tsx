"use client";

import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";
import { allFeedbackQuery } from "@/lib/firestore";
import { Skeleton } from "@/components/ui/Skeleton";
import { RetroDashLogo } from "@/components/ui/RetroDashLogo";
import { FeedbackCard } from "@/components/admin/FeedbackCard";
import type { Feedback, FeedbackType } from "@/types";

const COLUMNS: {
  type: FeedbackType;
  title: string;
  accent: string;
  dot: string;
}[] = [
  {
    type: "bug",
    title: "Errors",
    accent: "text-red-400",
    dot: "bg-red-400",
  },
  {
    type: "feature",
    title: "Improvements",
    accent: "text-accent-cyan",
    dot: "bg-accent-cyan",
  },
  {
    type: "general",
    title: "General",
    accent: "text-accent-violet",
    dot: "bg-accent-violet",
  },
];

function ColumnSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <Skeleton key={i} className="h-28 w-full" />
      ))}
    </div>
  );
}

function EmptyColumn({ title }: { title: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-10 text-center">
      <p className="text-text-muted text-sm">No {title.toLowerCase()} yet</p>
    </div>
  );
}

export function FeedbackBoard() {
  const [items, setItems] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsub = onSnapshot(allFeedbackQuery(), (snap) => {
      setItems(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Feedback)
      );
      setLoading(false);
    });
    return unsub;
  }, []);

  const grouped = COLUMNS.reduce<Record<FeedbackType, Feedback[]>>(
    (acc, col) => {
      acc[col.type] = items.filter((item) => item.type === col.type);
      return acc;
    },
    { bug: [], feature: [], general: [] }
  );

  const handleSignOut = async () => {
    await signOut();
    router.replace("/en/login");
  };

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <header className="bg-bg-surface border-b border-border px-4 sm:px-6 h-16 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <RetroDashLogo width={110} className="w-20.5 sm:w-27.5" />
          <span aria-hidden className="text-border hidden sm:block">|</span>
          <span className="text-text-muted text-sm hidden sm:block">
            Feedback Board
          </span>
        </div>
        <button
          onClick={handleSignOut}
          className="text-text-muted hover:text-text-primary text-sm transition-colors cursor-pointer"
        >
          Sign out
        </button>
      </header>

      <main className="flex-1 px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {COLUMNS.map((col) => {
              const colItems = grouped[col.type];
              return (
                <section key={col.type} className="flex flex-col gap-4 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`size-2 rounded-full shrink-0 ${col.dot}`}
                    />
                    <h2
                      className={`text-sm font-semibold ${col.accent} uppercase tracking-wide`}
                    >
                      {col.title}
                    </h2>
                    {!loading && (
                      <span className="ml-auto text-xs text-text-muted tabular-nums">
                        {colItems.length}
                      </span>
                    )}
                  </div>

                  <div className="h-px bg-border" />

                  {loading ? (
                    <ColumnSkeleton />
                  ) : colItems.length === 0 ? (
                    <EmptyColumn title={col.title} />
                  ) : (
                    <div className="flex flex-col gap-3">
                      {colItems.map((item) => (
                        <FeedbackCard key={item.id} item={item} />
                      ))}
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
