"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useRoom } from "@/hooks/useRoom";
import { useCards } from "@/hooks/useCards";
import { updateRoomStatus, getParticipant } from "@/lib/firestore";
import { signOut } from "@/lib/auth";
import { Board } from "@/components/board/Board";
import { JoinRoom } from "@/components/room/JoinRoom";

export default function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = use(params);
  const { user } = useAuth();
  const { room, columns, loading: roomLoading } = useRoom(roomId);
  const { cards, loading: cardsLoading } = useCards(roomId);
  const router = useRouter();
  const [endingRetro, setEndingRetro] = useState(false);
  const [participantStatus, setParticipantStatus] = useState<
    "loading" | "joined" | "stranger"
  >("loading");

  // Check participant membership once room + user are ready
  useEffect(() => {
    if (!user || roomLoading || !room) return;
    getParticipant(roomId, user.uid).then((p) =>
      setParticipantStatus(p ? "joined" : "stranger")
    );
  }, [roomId, user, room, roomLoading]);

  // Redirect all clients when retro ends
  useEffect(() => {
    if (room?.status === "ended" && participantStatus === "joined") {
      router.push(`/room/${roomId}/summary`);
    }
  }, [room?.status, roomId, router, participantStatus]);

  const isFacilitator = user?.uid === room?.ownerId;
  const loading = roomLoading || cardsLoading || participantStatus === "loading";

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  const handleStartRetro = () => updateRoomStatus(roomId, "active");

  const handleEndRetro = async () => {
    setEndingRetro(true);
    await updateRoomStatus(roomId, "ended");
  };

  if (loading) return <BoardSkeleton />;

  if (!room) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center gap-4">
        <p className="text-text-secondary">Room not found.</p>
        <Link href="/dashboard" className="text-accent-cyan text-sm hover:underline">
          Back to dashboard
        </Link>
      </div>
    );
  }

  if (participantStatus === "stranger") {
    return (
      <JoinRoom
        room={room}
        userId={user?.uid ?? ""}
        onJoined={() => setParticipantStatus("joined")}
      />
    );
  }

  return (
    <div className="h-screen bg-bg-base flex flex-col overflow-hidden">
      {/* ── Navbar ──────────────────────────────────────────── */}
      <header className="bg-bg-surface border-b border-border px-5 h-16 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4 min-w-0">
          <Link href="/dashboard" className="shrink-0">
            <Image src="/logo.svg" alt="RetroDash" width={110} height={48} priority />
          </Link>
          <span aria-hidden className="text-border hidden sm:block shrink-0">|</span>
          <div className="flex items-center gap-2.5 min-w-0">
            <h1 className="text-text-primary font-semibold text-sm truncate">
              {room.name}
            </h1>
            <StatusBadge status={room.status} />
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {/* Facilitator controls */}
          {isFacilitator && room.status === "waiting" && (
            <button
              onClick={handleStartRetro}
              className="h-8 px-4 rounded-md text-xs font-semibold text-bg-base transition-opacity hover:opacity-90 cursor-pointer"
              style={{ background: "var(--color-accent-cyan)" }}
            >
              Start Retro
            </button>
          )}
          {isFacilitator && room.status === "active" && (
            <EndRetroButton loading={endingRetro} onClick={handleEndRetro} />
          )}
          {room.status === "ended" && (
            <Link
              href={`/room/${roomId}/summary`}
              className="h-8 px-4 rounded-md text-xs font-semibold border border-border text-text-secondary hover:text-text-primary hover:border-text-muted transition-colors flex items-center"
            >
              View Summary
            </Link>
          )}

          {/* User */}
          {user?.photoURL && (
            <Image
              src={user.photoURL}
              alt={user.displayName ?? "User"}
              width={28}
              height={28}
              className="rounded-full hidden sm:block"
            />
          )}
          <button
            onClick={handleSignOut}
            className="text-text-muted hover:text-text-primary text-xs transition-colors cursor-pointer hidden sm:block"
          >
            Sign out
          </button>
        </div>
      </header>

      {/* ── Board ───────────────────────────────────────────── */}
      <div className="flex-1 min-h-0">
        <Board
          columns={columns}
          cards={cards}
          roomId={roomId}
          userId={user?.uid ?? ""}
          userName={user?.displayName ?? "Anonymous"}
          isAnonymous={room.isAnonymous}
          isFacilitator={isFacilitator}
        />
      </div>
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────

function StatusBadge({ status }: { status: Room["status"] }) {
  const config = {
    waiting: { label: "Waiting",  color: "var(--color-text-muted)",  bg: "var(--color-bg-elevated)" },
    active:  { label: "Live",     color: "var(--color-accent-cyan)", bg: "color-mix(in srgb, var(--color-accent-cyan) 12%, transparent)" },
    ended:   { label: "Ended",    color: "var(--color-text-muted)",  bg: "var(--color-bg-elevated)" },
  } as const;

  const { label, color, bg } = config[status];

  return (
    <span
      className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest px-2 py-0.5 rounded-sm shrink-0"
      style={{ color, background: bg }}
    >
      {status === "active" && (
        <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      )}
      {label}
    </span>
  );
}

function EndRetroButton({
  loading,
  onClick,
}: {
  loading: boolean;
  onClick: () => void;
}) {
  const [confirming, setConfirming] = useState(false);

  if (confirming) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-text-muted text-xs">End retro?</span>
        <button
          onClick={onClick}
          disabled={loading}
          className="h-8 px-3 rounded-md text-xs font-semibold bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-colors cursor-pointer disabled:opacity-60"
        >
          {loading ? "Ending…" : "Yes, end"}
        </button>
        <button
          onClick={() => setConfirming(false)}
          className="h-8 px-3 rounded-md text-xs text-text-muted hover:text-text-primary transition-colors cursor-pointer"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => setConfirming(true)}
      className="h-8 px-4 rounded-md text-xs font-semibold border border-red-500/30 text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
    >
      End Retro
    </button>
  );
}

function BoardSkeleton() {
  return (
    <div className="h-screen bg-bg-base flex flex-col">
      <div className="h-16 bg-bg-surface border-b border-border" />
      <div className="flex gap-4 p-6">
        {[0, 1, 2].map((i) => (
          <div key={i} className="w-72 shrink-0 h-64 bg-bg-surface rounded-lg border border-border animate-pulse" />
        ))}
      </div>
    </div>
  );
}

// local type alias for the status badge
type Room = { status: "waiting" | "active" | "ended" };
