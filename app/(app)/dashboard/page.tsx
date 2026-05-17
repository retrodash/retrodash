"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { useRooms } from "@/hooks/useRooms";
import type { Room } from "@/types";

export default function DashboardPage() {
  const { user } = useAuth();
  const { rooms, loading } = useRooms();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      {/* ── Navbar ────────────────────────────────────────────── */}
      <header className="bg-bg-surface border-b border-border px-6 h-16 flex items-center justify-between shrink-0">
        <Image src="/logo.svg" alt="RetroDash" width={130} height={56} priority />

        <div className="flex items-center gap-3">
          {user?.photoURL && (
            <Image
              src={user.photoURL}
              alt={user.displayName ?? "User"}
              width={32}
              height={32}
              className="rounded-full"
            />
          )}
          <span className="text-text-secondary text-sm hidden sm:block">
            {user?.displayName}
          </span>
          <span aria-hidden className="text-border hidden sm:block">|</span>
          <button
            onClick={handleSignOut}
            className="text-text-muted hover:text-text-primary text-sm transition-colors cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* ── Main ──────────────────────────────────────────────── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10">
        {/* Page header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-text-primary tracking-tight">
              My Rooms
            </h1>
            <p className="text-text-secondary text-sm mt-1">
              Retrospective sessions you own
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button className="h-10 px-4 rounded-md border border-border text-text-secondary text-sm font-medium hover:border-accent-cyan hover:text-text-primary transition-colors cursor-pointer">
              Join Room
            </button>
            <Link
              href="/room/new"
              className="h-10 px-5 rounded-md font-semibold text-sm flex items-center gap-2 transition-opacity hover:opacity-90"
              style={{ background: "var(--color-cta)", color: "var(--color-bg-base)" }}
            >
              <PlusIcon />
              New Room
            </Link>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <RoomsSkeleton />
        ) : rooms.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────

function RoomCard({ room }: { room: Room }) {
  const statusMap = {
    waiting: { label: "Waiting", style: { color: "var(--color-text-muted)",    background: "var(--color-bg-elevated)" } },
    active:  { label: "Active",  style: { color: "var(--color-accent-cyan)",   background: "color-mix(in srgb, var(--color-accent-cyan) 12%, transparent)" } },
    ended:   { label: "Ended",   style: { color: "var(--color-text-muted)",    background: "var(--color-bg-elevated)" } },
  } as const;

  const { label, style } = statusMap[room.status];

  const createdDate = room.createdAt
    ? room.createdAt.toDate().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "—";

  return (
    <Link href={`/room/${room.id}`} className="group block">
      <div className="bg-bg-card border border-border rounded-lg p-6 h-full hover:border-accent-cyan/40 transition-colors">
        {/* Status badge */}
        <span
          className="inline-block text-[11px] font-semibold uppercase tracking-widest px-2.5 py-1 rounded-sm mb-4"
          style={style}
        >
          {label}
        </span>

        <h3 className="text-text-primary font-semibold text-lg leading-snug mb-2 group-hover:text-accent-cyan transition-colors">
          {room.name}
        </h3>

        <p className="text-text-muted text-xs">Created {createdDate}</p>
      </div>
    </Link>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-28 text-center">
      <div
        className="w-16 h-16 rounded-lg border border-border flex items-center justify-center mb-6"
        style={{ background: "var(--color-bg-card)" }}
      >
        <BoardIcon />
      </div>

      <h2 className="text-text-primary font-semibold text-lg mb-2">
        No rooms yet
      </h2>
      <p className="text-text-secondary text-sm leading-relaxed mb-8 max-w-xs">
        Create your first retrospective room and invite your team to reflect and improve together.
      </p>

      <Link
        href="/room/new"
        className="h-11 px-6 rounded-md font-semibold text-sm flex items-center gap-2 transition-opacity hover:opacity-90"
        style={{ background: "var(--color-cta)", color: "var(--color-bg-base)" }}
      >
        <PlusIcon />
        Create your first room
      </Link>
    </div>
  );
}

function RoomsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="bg-bg-card border border-border rounded-lg p-6 animate-pulse"
        >
          <div className="h-5 w-16 rounded-sm bg-bg-elevated mb-4" />
          <div className="h-6 w-3/4 rounded bg-bg-elevated mb-2" />
          <div className="h-3 w-1/3 rounded bg-bg-elevated" />
        </div>
      ))}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BoardIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect x="2" y="5" width="24" height="18" rx="3" stroke="var(--color-text-muted)" strokeWidth="1.5" />
      <line x1="2" y1="11" x2="26" y2="11" stroke="var(--color-text-muted)" strokeWidth="1.5" />
      <line x1="10" y1="11" x2="10" y2="23" stroke="var(--color-text-muted)" strokeWidth="1.5" />
    </svg>
  );
}
