"use client";

import Link from "next/link";
import { useState } from "react";
import { useRooms } from "@/hooks/useRooms";
import { useJoinedRooms } from "@/hooks/useJoinedRooms";
import { Navbar } from "@/components/ui/Navbar";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Skeleton } from "@/components/ui/Skeleton";
import { JoinRoomModal } from "@/components/room/JoinRoomModal";
import type { Room } from "@/types";

export default function DashboardPage() {
  const { rooms, loading } = useRooms();
  const { joinedRooms, loading: joinedLoading } = useJoinedRooms();
  const [joinOpen, setJoinOpen] = useState(false);

  return (
    <div className="min-h-screen bg-bg-base flex flex-col">
      <Navbar />

      {/* ── Main ──────────────────────────────────────────────── */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-10 space-y-12">
        {/* ── My Rooms ──────────────────────────────────────── */}
        <section>
          <div className="flex items-start justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-text-primary tracking-tight">
                My Rooms
              </h1>
              <p className="text-text-secondary text-sm mt-1">
                Retrospective sessions you created
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => setJoinOpen(true)}>
                Join Room
              </Button>
              <Link
                href="/room/new"
                className="h-10 px-5 rounded-md font-semibold text-sm flex items-center gap-2 bg-cta text-bg-base transition-opacity hover:opacity-90"
              >
                <PlusIcon />
                New Room
              </Link>
            </div>
          </div>

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
        </section>

        {/* ── Joined Rooms ──────────────────────────────────── */}
        <section>
          <div className="mb-6">
            <h2 className="text-xl font-bold text-text-primary tracking-tight">
              Joined Rooms
            </h2>
            <p className="text-text-secondary text-sm mt-1">
              Sessions you participated in
            </p>
          </div>

          {joinedLoading ? (
            <RoomsSkeleton />
          ) : joinedRooms.length === 0 ? (
            <p className="text-text-muted text-sm">
              No joined rooms yet. Use{" "}
              <button
                onClick={() => setJoinOpen(true)}
                className="text-accent-cyan hover:underline cursor-pointer"
              >
                Join Room
              </button>{" "}
              to enter a session with a room code.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {joinedRooms.map((room) => (
                <RoomCard key={room.id} room={room} />
              ))}
            </div>
          )}
        </section>
      </main>

      {joinOpen && <JoinRoomModal onClose={() => setJoinOpen(false)} />}
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────

function RoomCard({ room }: { room: Room }) {
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
        <div className="mb-4">
          <StatusBadge status={room.status} />
        </div>

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
      <div className="size-16 rounded-lg border border-border bg-bg-card flex items-center justify-center mb-6">
        <BoardIcon />
      </div>

      <h2 className="text-text-primary font-semibold text-lg mb-2">
        No rooms yet
      </h2>
      <p className="text-text-secondary text-sm leading-relaxed mb-8 max-w-xs">
        Create your first retrospective room and invite your team to reflect and
        improve together.
      </p>

      <Link
        href="/room/new"
        className="h-11 px-6 rounded-md font-semibold text-sm flex items-center gap-2 bg-cta text-bg-base transition-opacity hover:opacity-90"
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
        <div key={i} className="bg-bg-card border border-border rounded-lg p-6">
          <Skeleton className="h-5 w-16 rounded-sm mb-4" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      ))}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M7 1v12M1 7h12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function BoardIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden>
      <rect
        x="2"
        y="5"
        width="24"
        height="18"
        rx="3"
        stroke="var(--color-text-muted)"
        strokeWidth="1.5"
      />
      <line
        x1="2"
        y1="11"
        x2="26"
        y2="11"
        stroke="var(--color-text-muted)"
        strokeWidth="1.5"
      />
      <line
        x1="10"
        y1="11"
        x2="10"
        y2="23"
        stroke="var(--color-text-muted)"
        strokeWidth="1.5"
      />
    </svg>
  );
}
