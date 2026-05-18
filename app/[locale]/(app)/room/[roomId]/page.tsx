"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";
import { useRoom } from "@/hooks/useRoom";
import { useCards } from "@/hooks/useCards";
import { updateRoomStatus, getParticipant } from "@/lib/firestore";
import { Board } from "@/components/board/Board";
import { JoinRoom } from "@/components/room/JoinRoom";
import { ShareRoomModal } from "@/components/room/ShareRoomModal";
import { ParticipantsModal } from "@/components/room/ParticipantsModal";
import { Navbar } from "@/components/ui/Navbar";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Textarea } from "@/components/ui/Input";
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
  const t = useTranslations("room");
  const [endingRetro, setEndingRetro] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [participantsOpen, setParticipantsOpen] = useState(false);
  const [participantStatus, setParticipantStatus] = useState<
    "loading" | "joined" | "stranger"
  >("loading");

  useEffect(() => {
    if (!user || roomLoading || !room) return;
    getParticipant(roomId, user.uid).then((p) =>
      setParticipantStatus(p ? "joined" : "stranger"),
    );
  }, [roomId, user, room, roomLoading]);

  useEffect(() => {
    if (room?.status === "ended" && participantStatus === "joined") {
      router.push(`/room/${roomId}/summary`);
    }
  }, [room?.status, roomId, router, participantStatus]);

  const isFacilitator = user?.uid === room?.ownerId;
  const loading =
    roomLoading || cardsLoading || participantStatus === "loading";

  const handleStartRetro = () => updateRoomStatus(roomId, "active");

  const handleEndRetro = async (description: string) => {
    setEndingRetro(true);
    await updateRoomStatus(roomId, "ended", description || undefined);
  };

  if (loading) return <BoardSkeleton />;

  if (!room) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center gap-4">
        <p className="text-text-secondary">{t("notFound")}</p>
        <Link href="/dashboard" className="text-accent-cyan text-sm hover:underline">
          {t("backToDashboard")}
        </Link>
      </div>
    );
  }

  if (participantStatus === "stranger") {
    return (
      <JoinRoom
        room={room}
        userId={user?.uid ?? ""}
        userDisplayName={user?.displayName ?? "Member"}
        userPhotoURL={user?.photoURL ?? null}
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
                {t("startRetro")}
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
                {t("viewSummary")}
              </Link>
            )}
          </>
        }
      >
        <h1 className="text-text-primary font-semibold text-sm truncate">{room.name}</h1>
        <StatusBadge status={room.status} />
        {!room.isAnonymous && (
          <button
            onClick={() => setParticipantsOpen(true)}
            title={t("viewParticipants")}
            className="text-text-muted hover:text-accent-cyan transition-colors cursor-pointer shrink-0"
            aria-label={t("viewParticipants")}
          >
            <PeopleIcon />
          </button>
        )}
        <button
          onClick={() => setShareOpen(true)}
          title={t("inviteTeammates")}
          className="text-text-muted hover:text-accent-cyan transition-colors cursor-pointer shrink-0"
          aria-label={t("inviteTeammates")}
        >
          <LinkIcon />
        </button>
      </Navbar>

      <div className="flex-1 min-h-0">
        <Board
          columns={columns}
          cards={cards}
          roomId={roomId}
          userId={user?.uid ?? ""}
          userName={user?.displayName ?? "Anonymous"}
          userPhotoURL={user?.photoURL ?? null}
          isAnonymous={room.isAnonymous}
          isFacilitator={isFacilitator}
        />
      </div>

      {participantsOpen && (
        <ParticipantsModal roomId={roomId} onClose={() => setParticipantsOpen(false)} />
      )}

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
  onClick: (description: string) => void;
}) {
  const t = useTranslations("room");
  const [open, setOpen] = useState(false);
  const [phrase, setPhrase] = useState("");

  const handleConfirm = () => {
    onClick(phrase.trim());
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="destructive"
        size="sm"
        onClick={() => setOpen(true)}
        className="border border-red-500/30 bg-transparent hover:bg-red-500/10"
      >
        {t("endRetro")}
      </Button>

      {open && (
        <Modal title={t("endRetroTitle")} onClose={() => setOpen(false)} size="sm">
          <p className="text-text-secondary text-sm mb-4 leading-relaxed">
            {t("endRetroSubtitle")}
          </p>
          <Textarea
            autoFocus
            placeholder={t("endRetroPlaceholder")}
            value={phrase}
            onChange={(e) => setPhrase(e.target.value)}
            rows={3}
          />
          <div className="flex gap-2 mt-4 justify-end">
            <Button variant="ghost-text" size="sm" onClick={() => setOpen(false)}>
              {t("cancel")}
            </Button>
            <Button variant="destructive" size="sm" onClick={handleConfirm} disabled={loading}>
              {loading ? t("ending") : t("confirmEnd")}
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}

function BoardSkeleton() {
  return (
    <div className="h-screen bg-bg-base flex flex-col">
      <div className="h-16 bg-bg-surface border-b border-border" />
      <div className="flex flex-1 gap-3 p-3 overflow-x-auto snap-x snap-mandatory lg:snap-none lg:gap-4 lg:p-4">
        <Skeleton className="w-[85vw] shrink-0 snap-start lg:flex-1 lg:w-auto lg:min-w-48 bg-bg-surface border border-border" />
        <Skeleton className="w-[85vw] shrink-0 snap-start lg:flex-1 lg:w-auto lg:min-w-48 bg-bg-surface border border-border" />
        <div className="hidden lg:block w-px shrink-0 bg-border" />
        <Skeleton className="w-[85vw] shrink-0 snap-start lg:flex-1 lg:w-auto lg:min-w-48 bg-bg-surface border border-border" />
      </div>
    </div>
  );
}

function PeopleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
