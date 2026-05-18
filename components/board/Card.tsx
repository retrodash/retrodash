"use client";

import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import {
  updateCard,
  deleteCard,
  toggleVote,
  toggleCardDone,
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

  const isOwnCard = card.authorId === userId;
  const isDraft = card.published === false;
  const hasVoted = card.votedBy.includes(userId);
  const canVote = !isOwnCard && !isDraft;
  const canEdit = isOwnCard;
  const canDelete = isOwnCard || isFacilitator;
  const isDone = card.done ?? false;
  const [publishing, setPublishing] = useState(false);

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

  return (
    <div
      className={`group relative bg-bg-elevated rounded-md p-3 border transition-colors ${
        isDraft
          ? "border-dashed border-border/60 opacity-80"
          : isActionItem && isDone
            ? "border-accent-cyan/20"
            : "border-transparent hover:border-border"
      }`}
    >
      {/* Edit / delete actions */}
      {!isEditing && (
        <div className="absolute top-2 right-2 hidden group-hover:flex items-center gap-1">
          {canEdit && (
            <button
              onClick={() => {
                setEditText(card.text);
                setIsEditing(true);
              }}
              className="size-6 flex items-center justify-center rounded text-text-muted hover:text-text-primary hover:bg-bg-card transition-colors"
              aria-label="Edit"
            >
              <PencilIcon />
            </button>
          )}
          {canDelete && (
            <button
              onClick={handleDelete}
              className="size-6 flex items-center justify-center rounded text-text-muted hover:text-red-400 hover:bg-bg-card transition-colors"
              aria-label="Delete"
            >
              <TrashIcon />
            </button>
          )}
        </div>
      )}

      {/* Content */}
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
          <div className="flex gap-2">
            <Button
              size="xs"
              variant="cyan"
              onClick={handleSaveEdit}
              disabled={saving || !editText.trim()}
            >
              Save
            </Button>
            <Button size="xs" variant="ghost-text" onClick={handleCancelEdit}>
              Cancel
            </Button>
          </div>
        </div>
      ) : isActionItem ? (
        /* ── Action item row ── */
        <div className="flex items-start gap-2.5 pr-14">
          <button
            onClick={() => toggleCardDone(roomId, card.id, isDone)}
            aria-label={isDone ? "Mark as not done" : "Mark as done"}
            className={`mt-0.5 shrink-0 size-4 rounded border transition-colors cursor-pointer flex items-center justify-center ${
              isDone
                ? "bg-accent-cyan border-accent-cyan"
                : "bg-transparent border-text-muted"
            }`}
          >
            {isDone && <SmallCheckIcon />}
          </button>
          <p
            className={`text-sm leading-relaxed whitespace-pre-wrap wrap-break-word transition-colors ${
              isDone ? "line-through text-text-muted" : "text-text-primary"
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

      {/* Footer */}
      {!isEditing && (
        <div className="flex items-center justify-between mt-3">
          {!isAnonymous && (
            <AuthorChip
              name={isOwnCard ? "You" : card.authorName}
              photoURL={isOwnCard ? currentUserPhotoURL : card.authorPhotoURL}
            />
          )}

          {isDraft && isOwnCard ? (
            <div className="flex items-center gap-2 ml-auto">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-text-muted">
                Draft
              </span>
              <button
                onClick={handlePublish}
                disabled={publishing}
                className="inline-flex items-center gap-1 px-2 h-6 rounded text-xs font-semibold bg-accent-cyan/15 text-accent-cyan hover:bg-accent-cyan/25 transition-colors cursor-pointer disabled:opacity-50"
              >
                {publishing ? "Publishing…" : "Publish"}
              </button>
            </div>
          ) : !isActionItem ? (
            <div className={isAnonymous ? "ml-auto" : ""}>
              <button
                onClick={handleVote}
                disabled={!canVote}
                aria-label={hasVoted ? "Remove vote" : "Vote"}
                className={`inline-flex items-center gap-1.5 px-2 h-6 rounded text-xs font-medium transition-colors cursor-pointer
                  ${
                    canVote
                      ? hasVoted
                        ? "bg-accent-cyan/15 text-accent-cyan hover:bg-accent-cyan/25"
                        : "text-text-muted hover:text-text-primary hover:bg-bg-card"
                      : "text-text-muted cursor-default"
                  }`}
              >
                <ThumbUpIcon filled={hasVoted} />
                {card.votes > 0 && <span>{card.votes}</span>}
              </button>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}

// ── Author chip ────────────────────────────────────────────────

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

// ── Icons ──────────────────────────────────────────────────────

function SmallCheckIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path
        d="M1.5 5l2.5 2.5 4.5-4.5"
        stroke="var(--color-bg-base)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
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
