"use client";

import { useEffect, useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useAuth } from "@/hooks/useAuth";
import { useRoom } from "@/hooks/useRoom";
import { useCards } from "@/hooks/useCards";
import { updateRoomStatus, getParticipant, joinRoom } from "@/lib/firestore";
import { Board } from "@/components/board/Board";
import { JoinRoom } from "@/components/room/JoinRoom";
import { ShareRoomModal } from "@/components/room/ShareRoomModal";
import { ParticipantsModal } from "@/components/room/ParticipantsModal";
import { EndRetroButton } from "@/components/room/EndRetroButton";
import { Navbar } from "@/components/ui/Navbar";
import { Button } from "@/components/ui/Button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Skeleton } from "@/components/ui/Skeleton";
import { PeopleIcon, LinkIcon } from "@/components/ui/Icons";

interface RoomClientProps {
  roomId: string;
}

export function RoomClient({ roomId }: RoomClientProps) {
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
    if (!user || !room || participantStatus !== "stranger" || !room.isPublic) return;
    joinRoom(roomId, user.uid, user.displayName ?? "Member", user.photoURL ?? null)
      .then(() => setParticipantStatus("joined"));
  }, [participantStatus, room, user, roomId]);

  useEffect(() => {
    if (room?.status === "ended" && participantStatus === "joined") {
      router.push(`/room/${roomId}/summary`);
    }
  }, [room?.status, roomId, router, participantStatus]);

  const isFacilitator = user?.uid === room?.ownerId;
  const loading = roomLoading || cardsLoading || participantStatus === "loading";

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
        showHamburger
        leftActions={
          <>
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
          </>
        }
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
          isPublic={room.isPublic}
          onClose={() => setShareOpen(false)}
        />
      )}
    </div>
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
