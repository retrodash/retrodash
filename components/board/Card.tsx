"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Avatar } from "@/components/ui/Avatar";
import {
  updateCard,
  deleteCard,
  toggleVote,
  setActionStatus,
  publishCard,
} from "@/lib/firestore";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Input";
import type { Card } from "@/types";

interface CardProps {
  card: Card;
  roomId: string;
  userId: string;
  currentUserPhotoURL?: string | null;
  isAnonymous: boolean;
  isFacilitator: boolean;
  isActionItem?: boolean;
}

export function CardItem({
  card,
  roomId,
  userId,
  currentUserPhotoURL,
  isAnonymous,
  isFacilitator,
  isActionItem = false,
}: CardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(card.text);
  const [saving, setSaving] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [improving, setImproving] = useState(false);
  const t = useTranslations("board");

  const isOwnCard = card.authorId === userId;
  const isDraft = card.published === false;
  const hasVoted = card.votedBy.includes(userId);
  const canVote = !isOwnCard && !isDraft;
  const canEdit = isOwnCard;
  const canDelete = isOwnCard || isFacilitator;
  const actionStatus: "pending" | "done" | "keep" =
    card.actionStatus ?? (card.done ? "done" : "pending");


  const voteClass = !canVote
    ? "text-text-muted cursor-default opacity-50"
    : hasVoted
      ? "bg-accent-cyan/15 text-accent-cyan hover:bg-accent-cyan/25 cursor-pointer"
      : "text-text-muted hover:text-text-primary hover:bg-bg-card cursor-pointer";

  const handlePublish = async () => {
    setPublishing(true);
    await publishCard(roomId, card.id);
    setPublishing(false);
  };

  const handleSaveEdit = async () => {
    const trimmed = editText.trim();
    if (!trimmed || trimmed === card.text) {
      setIsEditing(false);
      return;
    }
    setSaving(true);
    await updateCard(roomId, card.id, trimmed);
    setSaving(false);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditText(card.text);
    setIsEditing(false);
  };

  const handleVote = () => {
    if (!canVote) return;
    toggleVote(roomId, card.id, userId, hasVoted);
  };

  const handleDelete = () => deleteCard(roomId, card.id);

  const handleImprove = async () => {
    if (!editText.trim() || improving) return;
    setImproving(true);
    try {
      const res = await fetch("/api/improve-text", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: editText,
          type: isActionItem ? "action" : "card",
        }),
      });
      const data = await res.json();
      if (data.improved) setEditText(data.improved);
    } finally {
      setImproving(false);
    }
  };

  return (
    <div
      className={`group relative bg-bg-elevated rounded-md p-3 border transition-colors ${
        isDraft
          ? "border-dashed border-border/60 opacity-80"
          : isActionItem && actionStatus === "done"
            ? "border-accent-cyan/20"
            : isActionItem && actionStatus === "keep"
              ? "border-accent-violet/20"
              : "border-transparent hover:border-border"
      }`}
    >
      {!isEditing && (
        <div className="absolute top-2 right-2 flex sm:opacity-0 sm:group-hover:opacity-100 transition-opacity items-center gap-1">
          {canEdit && (
            <button
              onClick={() => {
                setEditText(card.text);
                setIsEditing(true);
              }}
              className="size-6 flex items-center justify-center rounded text-text-muted hover:text-text-primary cursor-pointer hover:bg-bg-card transition-colors"
              aria-label={t("editLabel")}
            >
              <PencilIcon />
            </button>
          )}
          {canDelete && (
            <button
              onClick={handleDelete}
              className="size-6 flex items-center justify-center rounded cursor-pointer text-text-muted hover:text-red-400 hover:bg-bg-card transition-colors"
              aria-label={t("deleteLabel")}
            >
              <TrashIcon />
            </button>
          )}
        </div>
      )}

      {isEditing ? (
        <div className="space-y-2">
          <Textarea
            autoFocus
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") handleCancelEdit();
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey))
                handleSaveEdit();
            }}
            rows={3}
            className="bg-bg-card border-accent-cyan"
          />
          <div className="flex items-center gap-2">
            <Button
              size="xs"
              variant="cyan"
              onClick={handleSaveEdit}
              disabled={saving || !editText.trim()}
            >
              {t("save")}
            </Button>
            <Button size="xs" variant="ghost-text" onClick={handleCancelEdit}>
              {t("cancel")}
            </Button>
            {editText.trim() && (
              <button
                type="button"
                onClick={handleImprove}
                disabled={improving}
                className="ml-auto inline-flex items-center gap-1 px-2 h-6 rounded text-[11px] font-medium text-text-muted hover:text-accent-violet hover:bg-bg-card transition-colors cursor-pointer disabled:opacity-50"
                title={t("improveWithAI")}
              >
                {improving ? <MiniSpinner /> : <SparkleIcon />}
                {improving ? t("improving") : t("improveWithAI")}
              </button>
            )}
          </div>
        </div>
      ) : isActionItem ? (
        <div className="pr-14">
          <p
            className={`text-sm leading-relaxed whitespace-pre-wrap wrap-break-word transition-colors ${
              actionStatus === "done"
                ? "line-through text-text-muted"
                : actionStatus === "keep"
                  ? "text-accent-violet"
                  : "text-text-primary"
            }`}
          >
            {card.text}
          </p>
        </div>
      ) : (
        <p className="text-text-primary text-sm leading-relaxed pr-14 whitespace-pre-wrap wrap-break-word">
          {card.text}
        </p>
      )}

      {!isEditing && (
        <div className="flex items-center justify-between mt-3">
          {!isAnonymous && (
            <AuthorChip
              name={isOwnCard ? t("you") : card.authorName}
              photoURL={isOwnCard ? currentUserPhotoURL : card.authorPhotoURL}
            />
          )}

          {isDraft && isOwnCard ? (
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                {t("draft")}
              </span>
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="inline-flex items-center gap-1 px-2 h-6 rounded text-xs font-semibold bg-accent-cyan/15 text-accent-cyan hover:bg-accent-cyan/25 transition-colors cursor-pointer disabled:opacity-50"
              >
                {publishing ? t("publishing") : t("publish")}
              </button>
            </div>
          ) : !isActionItem ? (
            <div className={isAnonymous ? "ml-auto" : ""}>
              <button
                onClick={handleVote}
                disabled={!canVote}
                aria-label={hasVoted ? t("removeVote") : t("vote")}
                className={`inline-flex items-center gap-1.5 px-2 h-6 rounded text-xs font-medium transition-colors ${voteClass}`}
              >
                <ThumbUpIcon filled={hasVoted} />
                {card.votes > 0 && <span>{card.votes}</span>}
              </button>
            </div>
          ) : (
            <div className={isAnonymous ? "ml-auto" : ""}>
              <ActionStatusSegment
                status={actionStatus}
                onChange={(s) => setActionStatus(roomId, card.id, s)}
                t={t}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ActionStatusSegment({
  status,
  onChange,
  t,
}: {
  status: "pending" | "done" | "keep";
  onChange: (s: "pending" | "done" | "keep") => void;
  t: ReturnType<typeof import("next-intl").useTranslations<"board">>;
}) {
  const options = [
    { value: "pending" as const, label: t("statusPending") },
    { value: "done" as const, label: t("statusDone") },
    { value: "keep" as const, label: t("statusKeep") },
  ];

  return (
    <div className="flex items-center gap-px bg-bg-card border border-border rounded p-0.5">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`px-2 h-5 rounded-sm text-[10px] font-medium transition-colors cursor-pointer ${
            status === opt.value
              ? opt.value === "done"
                ? "bg-accent-cyan/20 text-accent-cyan"
                : opt.value === "keep"
                  ? "bg-accent-violet/20 text-accent-violet"
                  : "bg-bg-elevated text-text-primary"
              : "text-text-muted hover:text-text-primary"
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

function AuthorChip({
  name,
  photoURL,
}: {
  name: string;
  photoURL?: string | null;
}) {
  return (
    <div className="flex items-center gap-1.5 min-w-0">
      <Avatar photoURL={photoURL} name={name} size={24} />
      <span className="text-text-muted text-xs truncate max-w-28">{name}</span>
    </div>
  );
}


function PencilIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M8.5 1.5l2 2-7 7H1.5v-2l7-7z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M1.5 3h9M4.5 3V2h3v1M2.5 3l.7 7h5.6l.7-7"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SparkleIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6L12 2z" />
    </svg>
  );
}

function MiniSpinner() {
  return (
    <svg
      className="animate-spin"
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  );
}

function ThumbUpIcon({ filled }: { filled: boolean }) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path
        d="M3.5 11V5.5L6 1l.75.375C7 1.5 7 2 6.75 2.5L6 5h4.5a.5.5 0 01.5.5v1a.5.5 0 01-.1.3l-1.5 3.7a.5.5 0 01-.46.5H3.5zM3.5 5.5H1.5V11h2"
        stroke="currentColor"
        strokeWidth="1.1"
        strokeLinejoin="round"
        fill={filled ? "currentColor" : "none"}
        fillOpacity={filled ? 0.25 : 0}
      />
    </svg>
  );
}
