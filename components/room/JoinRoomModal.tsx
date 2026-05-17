"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface JoinRoomModalProps {
  onClose: () => void;
}

export function JoinRoomModal({ onClose }: JoinRoomModalProps) {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;
    onClose();
    router.push(`/room/${trimmed}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-bg-card border border-border rounded-lg w-full max-w-sm p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-text-primary font-semibold text-lg">Join a Room</h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            aria-label="Close"
          >
            <XIcon />
          </button>
        </div>

        <p className="text-text-secondary text-sm mb-5 leading-relaxed">
          Paste the room code shared by your facilitator.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            autoFocus
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste room code…"
            className="w-full bg-bg-elevated border border-border rounded-md px-4 py-2.5 text-text-primary text-sm font-mono placeholder:text-text-muted focus:outline-none focus:border-accent-cyan transition-colors"
            spellCheck={false}
          />

          <button
            type="submit"
            disabled={!code.trim()}
            className="h-10 w-full rounded-md text-sm font-semibold transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            style={{
              background: "var(--color-cta)",
              color: "var(--color-bg-base)",
            }}
          >
            Join Room
          </button>
        </form>
      </div>
    </div>
  );
}

function XIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
