"use client";

import { use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useRoom } from "@/hooks/useRoom";
import { useCards } from "@/hooks/useCards";
import { signOut } from "@/lib/auth";
import type { Card, Column } from "@/types";

export default function SummaryPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = use(params);
  const { user } = useAuth();
  const { room, columns, loading: roomLoading } = useRoom(roomId);
  const { cards, loading: cardsLoading } = useCards(roomId);
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  if (roomLoading || cardsLoading) return <SummarySkeleton />;

  if (!room) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center gap-4">
        <p className="text-text-secondary">Room not found.</p>
        <Link href="/dashboard" className="text-accent-cyan text-sm hover:underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  const actionItemsCol = columns.find((c) => c.isActionItems);
  const regularCols    = columns.filter((c) => !c.isActionItems);

  const actionCards = sortByVotes(
    actionItemsCol ? cards.filter((c) => c.columnId === actionItemsCol.id) : []
  );

  const endedDate = room.createdAt
    ? room.createdAt.toDate().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      {/* ── Navbar ──────────────────────────────────────────── */}
      <header className="bg-bg-surface border-b border-border px-5 h-16 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4 min-w-0">
          <Link href="/dashboard" className="shrink-0">
            <Image src="/logo.svg" alt="RetroDash" width={110} height={48} priority />
          </Link>
          <span aria-hidden className="text-border hidden sm:block shrink-0">|</span>
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="text-text-primary font-semibold text-sm truncate">
              {room.name}
            </span>
            <span className="inline-flex text-[11px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-sm shrink-0 text-text-muted bg-bg-elevated">
              Ended
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user?.photoURL && (
            <Image
              src={user.photoURL}
              alt={user.displayName ?? "User"}
              width={28}
              height={28}
              className="rounded-full hidden sm:block"
            />
          )}
          <button
            onClick={handleSignOut}
            className="text-text-muted hover:text-text-primary text-xs transition-colors cursor-pointer hidden sm:block"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* ── Content ─────────────────────────────────────────── */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-6 py-10 space-y-10">
        {/* Page header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-text-muted hover:text-text-secondary text-xs mb-3 transition-colors"
            >
              <ArrowLeftIcon />
              My Rooms
            </Link>
            <h1 className="text-3xl font-bold text-text-primary tracking-tight">
              {room.name}
            </h1>
            {endedDate && (
              <p className="text-text-muted text-sm mt-1">
                Retrospective · {endedDate}
              </p>
            )}
          </div>

          {/* Export placeholder */}
          <button
            disabled
            title="Coming soon"
            className="h-9 px-4 rounded-md border border-border text-text-muted text-sm font-medium flex items-center gap-2 opacity-50 cursor-not-allowed shrink-0"
          >
            <ExportIcon />
            Export
          </button>
        </div>

        {/* ── Action Items ─────────────────────────────────── */}
        <section>
          <SectionHeader
            icon={<CheckCircleIcon />}
            title="Action Items"
            count={actionCards.length}
            accent
          />

          {actionCards.length === 0 ? (
            <p className="text-text-muted text-sm mt-4 pl-1">
              No action items were added.
            </p>
          ) : (
            <div className="mt-4 bg-bg-card border border-border rounded-lg divide-y divide-border overflow-hidden">
              {actionCards.map((card) => (
                <ActionItemRow
                  key={card.id}
                  card={card}
                  isAnonymous={room.isAnonymous}
                />
              ))}
            </div>
          )}
        </section>

        {/* ── Retro Recap ──────────────────────────────────── */}
        {regularCols.length > 0 && (
          <section>
            <SectionHeader
              icon={<BoardIcon />}
              title="Retro Recap"
              count={cards.filter((c) => !actionCards.includes(c)).length}
            />

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {regularCols.map((col) => (
                <ColumnSummary
                  key={col.id}
                  column={col}
                  cards={sortByVotes(cards.filter((c) => c.columnId === col.id))}
                  isAnonymous={room.isAnonymous}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────

function sortByVotes(cards: Card[]): Card[] {
  return [...cards].sort((a, b) => b.votes - a.votes);
}

// ── Sub-components ─────────────────────────────────────────────

function SectionHeader({
  icon,
  title,
  count,
  accent = false,
}: {
  icon: React.ReactNode;
  title: string;
  count: number;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center gap-2.5 pb-3 border-b border-border">
      <span style={{ color: accent ? "var(--color-accent-cyan)" : "var(--color-text-muted)" }}>
        {icon}
      </span>
      <h2 className="text-text-primary font-semibold text-lg">{title}</h2>
      <span className="text-xs text-text-muted bg-bg-elevated px-2 py-0.5 rounded-full ml-0.5">
        {count}
      </span>
    </div>
  );
}

function ActionItemRow({
  card,
  isAnonymous,
}: {
  card: Card;
  isAnonymous: boolean;
}) {
  return (
    <div className="flex items-start gap-3 px-5 py-4">
      <span className="mt-0.5 shrink-0" style={{ color: "var(--color-accent-cyan)" }}>
        <CheckIcon />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-text-primary text-sm leading-relaxed whitespace-pre-wrap break-words">
          {card.text}
        </p>
        {!isAnonymous && (
          <p className="text-text-muted text-xs mt-1">{card.authorName}</p>
        )}
      </div>
      {card.votes > 0 && (
        <span className="shrink-0 flex items-center gap-1 text-xs text-text-muted">
          <ThumbUpIcon />
          {card.votes}
        </span>
      )}
    </div>
  );
}

function ColumnSummary({
  column,
  cards,
  isAnonymous,
}: {
  column: Column;
  cards: Card[];
  isAnonymous: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-text-primary font-semibold text-sm">{column.title}</h3>
        <span className="text-xs text-text-muted bg-bg-elevated px-2 py-0.5 rounded-full">
          {cards.length}
        </span>
      </div>

      {cards.length === 0 ? (
        <p className="text-text-muted text-xs italic">No cards added.</p>
      ) : (
        <div className="space-y-2">
          {cards.map((card) => (
            <SummaryCard key={card.id} card={card} isAnonymous={isAnonymous} />
          ))}
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  card,
  isAnonymous,
}: {
  card: Card;
  isAnonymous: boolean;
}) {
  return (
    <div className="bg-bg-card border border-border rounded-md px-4 py-3">
      <p className="text-text-primary text-sm leading-relaxed whitespace-pre-wrap break-words">
        {card.text}
      </p>
      <div className="flex items-center justify-between mt-2">
        {!isAnonymous ? (
          <span className="text-text-muted text-xs">{card.authorName}</span>
        ) : (
          <span />
        )}
        {card.votes > 0 && (
          <span className="flex items-center gap-1 text-xs text-text-muted">
            <ThumbUpIcon />
            {card.votes}
          </span>
        )}
      </div>
    </div>
  );
}

function SummarySkeleton() {
  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <div className="h-16 bg-bg-surface border-b border-border" />
      <div className="max-w-5xl w-full mx-auto px-6 py-10 space-y-8 animate-pulse">
        <div className="h-8 w-72 bg-bg-card rounded" />
        <div className="space-y-2">
          <div className="h-5 w-32 bg-bg-card rounded" />
          <div className="h-24 bg-bg-card rounded-lg" />
        </div>
        <div className="grid grid-cols-2 gap-6">
          {[0, 1].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-5 w-24 bg-bg-card rounded" />
              <div className="h-16 bg-bg-card rounded-md" />
              <div className="h-16 bg-bg-card rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────────

function ArrowLeftIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M8 2L3 6l5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckCircleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <circle cx="9" cy="9" r="7.5" stroke="currentColor" strokeWidth="1.3" />
      <path d="M5.5 9l2.5 2.5L12.5 7" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" aria-hidden>
      <path d="M2.5 8l4 4L12.5 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ThumbUpIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M3.5 11V5.5L6 1l.75.375C7 1.5 7 2 6.75 2.5L6 5h4.5a.5.5 0 01.5.5v1a.5.5 0 01-.1.3l-1.5 3.7a.5.5 0 01-.46.5H3.5zM3.5 5.5H1.5V11h2" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round" />
    </svg>
  );
}

function BoardIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 17 17" fill="none" aria-hidden>
      <rect x="1.5" y="2.5" width="14" height="12" rx="2" stroke="currentColor" strokeWidth="1.3" />
      <line x1="1.5" y1="7" x2="15.5" y2="7" stroke="currentColor" strokeWidth="1.3" />
      <line x1="7" y1="7" x2="7" y2="14.5" stroke="currentColor" strokeWidth="1.3" />
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M7 1v8M4 6l3 3 3-3M2 10v1.5A1.5 1.5 0 003.5 13h7a1.5 1.5 0 001.5-1.5V10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
