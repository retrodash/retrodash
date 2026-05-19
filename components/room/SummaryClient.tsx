"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { Avatar } from "@/components/ui/Avatar";
import { useRoom } from "@/hooks/useRoom";
import { useCards } from "@/hooks/useCards";
import { useParticipants } from "@/hooks/useParticipants";
import { Navbar } from "@/components/ui/Navbar";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  CheckIcon,
  CircleIcon,
  ThumbUpIcon,
  ExportIcon,
  PeopleIcon,
} from "@/components/ui/Icons";
import type { Card, Column } from "@/types";

export function SummaryClient({ roomId }: { roomId: string }) {
  const { room, columns, loading: roomLoading } = useRoom(roomId);
  const { cards, loading: cardsLoading } = useCards(roomId);
  const { participants } = useParticipants(roomId);
  const t = useTranslations("summary");
  const locale = useLocale();

  if (roomLoading || cardsLoading) return <SummarySkeleton />;

  if (!room) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center gap-4">
        <p className="text-text-secondary">{t("notFound")}</p>
        <Link href="/dashboard" className="text-accent-cyan text-sm hover:underline">
          {t("backToDashboard")}
        </Link>
      </div>
    );
  }

  const actionItemsCol = columns.find((c) => c.isActionItems);
  const regularCols = columns.filter((c) => !c.isActionItems);
  const publishedCards = cards.filter((c) => c.published !== false);

  const actionCards = sortByVotes(
    actionItemsCol ? publishedCards.filter((c) => c.columnId === actionItemsCol.id) : [],
  );

  const dateLocale = locale === "pt-BR" ? "pt-BR" : "en-US";
  const endedDate = room.createdAt
    ? room.createdAt.toDate().toLocaleDateString(dateLocale, {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <Navbar logoHref="/dashboard">
        <span className="text-text-primary font-semibold text-sm truncate">{room.name}</span>
        <span className="inline-flex text-[11px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-sm shrink-0 text-text-muted bg-bg-elevated">
          {t("ended")}
        </span>
      </Navbar>

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-1.5 text-text-muted hover:text-text-secondary text-xs mb-3 transition-colors"
            >
              <ArrowLeftIcon size={12} />
              {t("myRooms")}
            </Link>
            <h1 className="text-3xl font-bold text-text-primary tracking-tight">{room.name}</h1>
            {room.description && (
              <p className="text-text-primary text-base italic mt-2">
                &ldquo;{room.description}&rdquo;
              </p>
            )}
            {endedDate && (
              <p className="text-text-muted text-sm mt-1">
                {t("retroLabel")} · {endedDate}
              </p>
            )}
          </div>

          <button
            disabled
            title={t("comingSoon")}
            className="self-start h-9 px-4 rounded-md border border-border text-text-muted text-sm font-medium flex items-center gap-2 opacity-50 cursor-not-allowed shrink-0"
          >
            <ExportIcon />
            {t("export")}
          </button>
        </div>

        {participants.length > 0 && (
          <section>
            <SectionHeader
              icon={<PeopleIcon size={18} />}
              title={t("participants")}
              count={participants.length}
            />
            <div className="mt-4 flex flex-wrap gap-3">
              {participants.map((p) => (
                <div key={p.id} className="flex items-center gap-2 bg-bg-card border border-border rounded-full pl-1 pr-3 py-1">
                  {p.photoURL ? (
                    <Image
                      src={p.photoURL}
                      alt={p.displayName}
                      width={24}
                      height={24}
                      className="size-6 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="size-6 rounded-full bg-bg-elevated border border-border flex items-center justify-center text-[10px] font-semibold text-text-muted shrink-0">
                      {(p.displayName ?? "?")[0].toUpperCase()}
                    </div>
                  )}
                  <span className="text-sm text-text-primary">{p.displayName}</span>
                  {p.role === "facilitator" && (
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-accent-cyan">
                      {t("host")}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <section>
          <SectionHeader
            icon={<CheckCircleIcon />}
            title={t("actionItems")}
            count={actionCards.length}
            accent
          />

          {actionCards.length === 0 ? (
            <p className="text-text-muted text-sm mt-4 pl-1">{t("noActionItems")}</p>
          ) : (
            <div className="mt-4 bg-bg-card border border-border rounded-lg divide-y divide-border overflow-hidden">
              {actionCards.map((card) => (
                <ActionItemRow key={card.id} card={card} isAnonymous={room.isAnonymous} />
              ))}
            </div>
          )}
        </section>

        {regularCols.length > 0 && (
          <section>
            <SectionHeader
              icon={<BoardIcon />}
              title={t("retroRecap")}
              count={publishedCards.filter((c) => !actionCards.includes(c)).length}
            />

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
              {regularCols.map((col) => (
                <ColumnSummary
                  key={col.id}
                  column={col}
                  cards={sortByVotes(publishedCards.filter((c) => c.columnId === col.id))}
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

function sortByVotes(cards: Card[]): Card[] {
  return [...cards].sort((a, b) => b.votes - a.votes);
}

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
      <span className={accent ? "text-accent-cyan" : "text-text-muted"}>{icon}</span>
      <h2 className="text-text-primary font-semibold text-lg">{title}</h2>
      <span className="text-xs text-text-muted bg-bg-elevated px-2 py-0.5 rounded-full ml-0.5">
        {count}
      </span>
    </div>
  );
}

function ActionItemRow({ card, isAnonymous }: { card: Card; isAnonymous: boolean }) {
  const done = card.done ?? false;

  return (
    <div className="flex items-start gap-3 px-5 py-4">
      <span className={`mt-0.5 shrink-0 ${done ? "text-accent-cyan" : "text-text-muted"}`}>
        {done ? <CheckIcon /> : <CircleIcon />}
      </span>
      <div className="flex-1 min-w-0">
        <p
          className={`text-sm leading-relaxed whitespace-pre-wrap wrap-break-word ${
            done ? "line-through text-text-muted" : "text-text-primary"
          }`}
        >
          {card.text}
        </p>
        {!isAnonymous && (
          <div className="flex items-center gap-1.5 mt-1.5">
            <Avatar photoURL={card.authorPhotoURL} name={card.authorName} size={24} />
            <span className="text-text-muted text-xs">{card.authorName}</span>
          </div>
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
  const t = useTranslations("summary");
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-text-primary font-semibold text-sm">{column.title}</h3>
        <span className="text-xs text-text-muted bg-bg-elevated px-2 py-0.5 rounded-full">
          {cards.length}
        </span>
      </div>

      {cards.length === 0 ? (
        <p className="text-text-muted text-xs italic">{t("noCards")}</p>
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

function SummaryCard({ card, isAnonymous }: { card: Card; isAnonymous: boolean }) {
  return (
    <div className="bg-bg-card border border-border rounded-md px-4 py-3">
      <p className="text-text-primary text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">
        {card.text}
      </p>
      <div className="flex items-center justify-between mt-2">
        {!isAnonymous ? (
          <div className="flex items-center gap-1.5">
            <Avatar photoURL={card.authorPhotoURL} name={card.authorName} size={24} />
            <span className="text-text-muted text-xs">{card.authorName}</span>
          </div>
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
      <div className="max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8">
        <Skeleton className="h-8 w-72 bg-bg-card" />
        <div className="space-y-2">
          <Skeleton className="h-5 w-32 bg-bg-card" />
          <Skeleton className="h-24 bg-bg-card rounded-lg" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {[0, 1].map((i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-5 w-24 bg-bg-card" />
              <Skeleton className="h-16 bg-bg-card rounded-md" />
              <Skeleton className="h-16 bg-bg-card rounded-md" />
            </div>
          ))}
        </div>
      </div>
    </div>
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
