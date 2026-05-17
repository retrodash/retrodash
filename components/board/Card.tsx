"use client";

import { useState } from "react";
import { updateCard, deleteCard, toggleVote } from "@/lib/firestore";
import type { Card } from "@/types";

interface CardProps {
  card: Card;
  roomId: string;
  userId: string;
  isAnonymous: boolean;
  isFacilitator: boolean;
}

export function CardItem({
  card,
  roomId,
  userId,
  isAnonymous,
  isFacilitator,
}: CardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText]   = useState(card.text);
  const [saving, setSaving]       = useState(false);

  const isOwnCard  = card.authorId === userId;
  const hasVoted   = card.votedBy.includes(userId);
  const canVote    = !isOwnCard;
  const canEdit    = isOwnCard;
  const canDelete  = isOwnCard || isFacilitator;

  const handleSaveEdit = async () => {
    const trimmed = editText.trim();
    if (!trimmed || trimmed === card.text) { setIsEditing(false); return; }
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
    <div className="group relative bg-bg-elevated rounded-md p-3 border border-transparent hover:border-border transition-colors">
      {/* Edit / delete actions */}
      {!isEditing && (
        <div className="absolute top-2 right-2 hidden group-hover:flex items-center gap-1">
          {canEdit && (
            <button
              onClick={() => { setEditText(card.text); setIsEditing(true); }}
              className="w-6 h-6 flex items-center justify-center rounded text-text-muted hover:text-text-primary hover:bg-bg-card transition-colors"
              aria-label="Edit card"
            >
              <PencilIcon />
            </button>
          )}
          {canDelete && (
            <button
              onClick={handleDelete}
              className="w-6 h-6 flex items-center justify-center rounded text-text-muted hover:text-red-400 hover:bg-bg-card transition-colors"
              aria-label="Delete card"
            >
              <TrashIcon />
            </button>
          )}
        </div>
      )}

      {/* Content */}
      {isEditing ? (
        <div className="space-y-2">
          <textarea
            autoFocus
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") handleCancelEdit();
              if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) handleSaveEdit();
            }}
            rows={3}
            className="w-full bg-bg-card border border-accent-cyan rounded-md p-2 text-sm text-text-primary resize-none outline-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSaveEdit}
              disabled={saving || !editText.trim()}
              className="h-7 px-3 rounded bg-accent-cyan text-bg-base text-xs font-semibold disabled:opacity-50 cursor-pointer"
            >
              Save
            </button>
            <button
              onClick={handleCancelEdit}
              className="h-7 px-3 rounded text-text-muted hover:text-text-primary text-xs transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <p className="text-text-primary text-sm leading-relaxed pr-14 whitespace-pre-wrap break-words">
          {card.text}
        </p>
      )}

      {/* Footer */}
      {!isEditing && (
        <div className="flex items-center justify-between mt-3">
          {!isAnonymous && (
            <span className="text-text-muted text-xs truncate max-w-[120px]">
              {isOwnCard ? "You" : card.authorName}
            </span>
          )}
          <div className={isAnonymous ? "ml-auto" : ""}>
            <button
              onClick={handleVote}
              disabled={!canVote}
              aria-label={hasVoted ? "Remove vote" : "Vote"}
              className={`inline-flex items-center gap-1.5 px-2 h-6 rounded text-xs font-medium transition-colors cursor-pointer
                ${canVote
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
        </div>
      )}
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────────

function PencilIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M8.5 1.5l2 2-7 7H1.5v-2l7-7z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
      <path d="M1.5 3h9M4.5 3V2h3v1M2.5 3l.7 7h5.6l.7-7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
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
