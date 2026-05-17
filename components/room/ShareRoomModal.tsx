"use client";

import { useState } from "react";

interface ShareRoomModalProps {
  roomId: string;
  roomName: string;
  onClose: () => void;
}

export function ShareRoomModal({
  roomId,
  roomName,
  onClose,
}: ShareRoomModalProps) {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const url = `${window.location.origin}/room/${roomId}`;

  const copy = async (text: string, setter: (v: boolean) => void) => {
    await navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-bg-card border border-border rounded-[22px] w-full max-w-md p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-text-primary font-semibold text-lg">
            Invite teammates
          </h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors cursor-pointer"
            aria-label="Close"
          >
            <XIcon />
          </button>
        </div>

        <p className="text-text-secondary text-sm mb-5 leading-relaxed">
          Share the link or room code below to invite people to{" "}
          <span className="text-text-primary font-medium">{roomName}</span>.
          They will need the room password to join.
        </p>

        {/* Room code */}
        <div className="mb-4">
          <label className="text-text-muted text-[11px] font-semibold uppercase tracking-widest mb-2 block">
            Room Code
          </label>
          <div className="flex gap-2">
            <div className="flex-1 bg-bg-elevated border border-border rounded-[14px] px-4 py-2.5 font-mono text-accent-cyan text-sm tracking-widest truncate">
              {roomId}
            </div>
            <button
              onClick={() => copy(roomId, setCopiedCode)}
              className="h-10 px-4 rounded-[14px] text-xs font-semibold transition-all cursor-pointer shrink-0 border"
              style={
                copiedCode
                  ? {
                      background:
                        "color-mix(in srgb, var(--color-accent-cyan) 12%, transparent)",
                      color: "var(--color-accent-cyan)",
                      borderColor: "var(--color-accent-cyan)",
                    }
                  : {
                      background: "transparent",
                      color: "var(--color-text-secondary)",
                      borderColor: "var(--color-border)",
                    }
              }
            >
              {copiedCode ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Share link */}
        <div>
          <label className="text-text-muted text-[11px] font-semibold uppercase tracking-widest mb-2 block">
            Share Link
          </label>
          <div className="flex gap-2">
            <div className="flex-1 bg-bg-elevated border border-border rounded-[14px] px-4 py-2.5 text-text-secondary text-sm truncate">
              {url}
            </div>
            <button
              onClick={() => copy(url, setCopiedUrl)}
              className="h-10 px-4 rounded-[14px] text-xs font-semibold transition-all cursor-pointer shrink-0"
              style={
                copiedUrl
                  ? {
                      background:
                        "color-mix(in srgb, var(--color-accent-cyan) 12%, transparent)",
                      color: "var(--color-accent-cyan)",
                    }
                  : {
                      background: "var(--color-accent-cyan)",
                      color: "var(--color-bg-base)",
                    }
              }
            >
              {copiedUrl ? "Copied!" : "Copy link"}
            </button>
          </div>
        </div>
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
