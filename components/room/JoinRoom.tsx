"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { hashPassword } from "@/lib/auth";
import { joinRoom } from "@/lib/firestore";
import type { Room } from "@/types";

interface JoinRoomProps {
  room: Room;
  userId: string;
  onJoined: () => void;
}

export function JoinRoom({ room, userId, onJoined }: JoinRoomProps) {
  const [password, setPassword] = useState("");
  const [error, setError]       = useState<string | null>(null);
  const [joining, setJoining]   = useState(false);

  const handleJoin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!password.trim()) return;

    setJoining(true);
    setError(null);

    const hash = await hashPassword(password.trim());

    if (hash !== room.password) {
      setError("Incorrect password. Please try again.");
      setJoining(false);
      return;
    }

    await joinRoom(room.id, userId);
    onJoined();
  };

  return (
    <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center px-6">
      {/* Logo */}
      <div className="mb-10">
        <Image src="/logo.svg" alt="RetroDash" width={180} height={78} priority />
      </div>

      {/* Card */}
      <div className="w-full max-w-sm bg-bg-card border border-border rounded-lg p-8">
        {/* Room identity */}
        <div className="flex items-start gap-3 mb-6">
          <span className="mt-0.5 shrink-0" style={{ color: "var(--color-accent-violet)" }}>
            <LockIcon />
          </span>
          <div className="min-w-0">
            <p className="text-text-muted text-xs uppercase tracking-widest font-semibold mb-1">
              Join Room
            </p>
            <h1 className="text-text-primary font-bold text-lg leading-snug truncate">
              {room.name}
            </h1>
          </div>
        </div>

        <p className="text-text-secondary text-sm mb-6">
          This room is password-protected. Enter the password to join.
        </p>

        <form onSubmit={handleJoin} noValidate className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-text-primary text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              autoFocus
              placeholder="Enter room password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(null); }}
              className="w-full h-11 px-4 bg-bg-elevated border border-border rounded-md text-text-primary placeholder:text-text-muted text-sm outline-none focus:border-accent-cyan transition-colors"
            />
            {error && (
              <p className="text-red-400 text-xs">{error}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={joining || !password.trim()}
            className="w-full h-11 rounded-md font-semibold text-sm transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
            style={{ background: "var(--color-cta)", color: "var(--color-bg-base)" }}
          >
            {joining ? "Joining…" : "Join Room"}
          </button>
        </form>
      </div>

      <Link
        href="/dashboard"
        className="mt-6 text-text-muted hover:text-text-secondary text-sm transition-colors"
      >
        ← Back to dashboard
      </Link>
    </div>
  );
}

function LockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden>
      <rect x="3" y="8" width="12" height="9" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M6 8V6a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="9" cy="13" r="1.2" fill="currentColor" />
    </svg>
  );
}
