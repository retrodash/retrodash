"use client";

import { useRef, useState } from "react";
import { addCard } from "@/lib/firestore";
import { CardItem } from "@/components/board/Card";
import type { Column, Card } from "@/types";

interface ColumnProps {
  column: Column;
  cards: Card[];
  roomId: string;
  userId: string;
  userName: string;
  isAnonymous: boolean;
  isFacilitator: boolean;
}

export function BoardColumn({
  column,
  cards,
  roomId,
  userId,
  userName,
  isAnonymous,
  isFacilitator,
}: ColumnProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [newText, setNewText]   = useState("");
  const [adding, setAdding]     = useState(false);
  const textareaRef             = useRef<HTMLTextAreaElement>(null);

  const handleAddCard = async () => {
    const text = newText.trim();
    if (!text) return;
    setAdding(true);
    await addCard(roomId, {
      columnId: column.id,
      text,
      authorId: userId,
      authorName: userName,
      isActionItem: column.isActionItems,
    });
    setNewText("");
    setAdding(false);
    setIsAdding(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleAddCard(); }
    if (e.key === "Escape") { setIsAdding(false); setNewText(""); }
  };

  const headerAccent = column.isActionItems
    ? "var(--color-accent-cyan)"
    : "var(--color-text-muted)";

  return (
    <div className="w-72 shrink-0 flex flex-col bg-bg-surface rounded-lg border border-border max-h-full">
      {/* Column header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border shrink-0">
        <div className="flex items-center gap-2">
          {column.isActionItems && (
            <span style={{ color: headerAccent }}>
              <CheckIcon />
            </span>
          )}
          <h2 className="font-semibold text-sm text-text-primary">{column.title}</h2>
        </div>
        <span className="text-xs text-text-muted bg-bg-elevated px-2 py-0.5 rounded-full">
          {cards.length}
        </span>
      </div>

      {/* Cards */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2 min-h-0">
        {cards.map((card) => (
          <CardItem
            key={card.id}
            card={card}
            roomId={roomId}
            userId={userId}
            isAnonymous={isAnonymous}
            isFacilitator={isFacilitator}
            isActionItem={column.isActionItems}
          />
        ))}
      </div>

      {/* Add card */}
      <div className="p-3 border-t border-border shrink-0">
        {isAdding ? (
          <div className="space-y-2">
            <textarea
              ref={textareaRef}
              autoFocus
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={column.isActionItems ? "Describe the action item…" : "What's on your mind?"}
              rows={3}
              className="w-full bg-bg-elevated border border-border focus:border-accent-cyan rounded-md p-2.5 text-sm text-text-primary placeholder:text-text-muted resize-none outline-none transition-colors"
            />
            <div className="flex gap-2">
              <button
                onClick={handleAddCard}
                disabled={adding || !newText.trim()}
                className="h-7 px-3 rounded-md text-xs font-semibold transition-opacity hover:opacity-90 disabled:opacity-50 cursor-pointer"
                style={{ background: "var(--color-cta)", color: "var(--color-bg-base)" }}
              >
                Add
              </button>
              <button
                onClick={() => { setIsAdding(false); setNewText(""); }}
                className="h-7 px-3 rounded-md text-xs text-text-muted hover:text-text-primary transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-text-muted hover:text-text-primary hover:bg-bg-elevated text-sm transition-colors cursor-pointer"
          >
            <SmallPlusIcon />
            {column.isActionItems ? "Add action item" : "Add a card"}
          </button>
        )}
      </div>
    </div>
  );
}

// ── Icons ──────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path d="M2 7l3.5 3.5L11 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SmallPlusIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
      <path d="M6.5 1.5v10M1.5 6.5h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
