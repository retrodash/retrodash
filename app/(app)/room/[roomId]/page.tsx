"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { useRoom } from "@/hooks/useRoom";
import { useCards } from "@/hooks/useCards";
import { updateRoomStatus, getParticipant } from "@/lib/firestore";
import { Board } from "@/components/board/Board";
import { JoinRoom } from "@/components/room/JoinRoom";
import { ShareRoomModal } from "@/components/room/ShareRoomModal";
import { Navbar } from "@/components/ui/Navbar";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Skeleton } from "@/components/ui/Skeleton";

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
  const [shareOpen, setShareOpen] = useState(false);
  const [participantStatus, setParticipantStatus] = useState<
    "loading" | "joined" | "stranger"
  >("loading");

  // Check participant membership once room + user are ready
  useEffect(() => {
    if (!user || roomLoading || !room) return;
    getParticipant(roomId, user.uid).then((p) =>
      setParticipantStatus(p ? "joined" : "stranger"),
    );
  }, [roomId, user, room, roomLoading]);

  // Redirect all clients when retro ends
  useEffect(() => {
    if (room?.status === "ended" && participantStatus === "joined") {
      router.push(`/room/${roomId}/summary`);
    }
  }, [room?.status, roomId, router, participantStatus]);

  const isFacilitator = user?.uid === room?.ownerId;
  const loading =
    roomLoading || cardsLoading || participantStatus === "loading";

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
        <Link
          href="/dashboard"
          className="text-accent-cyan text-sm hover:underline"
        >
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
      <Navbar
        logoHref="/dashboard"
        actions={
          <>
            {isFacilitator && room.status === "waiting" && (
              <Button variant="cyan" size="sm" onClick={handleStartRetro}>
                Start Retro
              </Button>
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
          </>
        }
      >
        <h1 className="text-text-primary font-semibold text-sm truncate">
          {room.name}
        </h1>
        <StatusBadge status={room.status} />
        <button
          onClick={() => setShareOpen(true)}
          title="Invite teammates"
          className="text-text-muted hover:text-accent-cyan transition-colors cursor-pointer shrink-0"
          aria-label="Invite teammates"
        >
          <LinkIcon />
        </button>
      </Navbar>

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

      {shareOpen && (
        <ShareRoomModal
          roomId={roomId}
          roomName={room.name}
          onClose={() => setShareOpen(false)}
        />
      )}
    </div>
  );
}

// ── Sub-components ─────────────────────────────────────────────

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
        <Button
          variant="destructive"
          size="sm"
          onClick={onClick}
          disabled={loading}
        >
          {loading ? "Ending…" : "Yes, end"}
        </Button>
        <Button
          variant="ghost-text"
          size="sm"
          onClick={() => setConfirming(false)}
        >
          Cancel
        </Button>
      </div>
    );
  }

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={() => setConfirming(true)}
      className="border border-red-500/30 bg-transparent hover:bg-red-500/10"
    >
      End Retro
    </Button>
  );
}

function BoardSkeleton() {
  return (
    <div className="h-screen bg-bg-base flex flex-col">
      <div className="h-16 bg-bg-surface border-b border-border" />
      <div className="flex gap-4 p-6">
        {[0, 1, 2].map((i) => (
          <Skeleton
            key={i}
            className="w-72 shrink-0 h-64 bg-bg-surface border border-border"
          />
        ))}
      </div>
    </div>
  );
}

function LinkIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
