"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParticipants } from "@/hooks/useParticipants";
import { Modal } from "@/components/ui/Modal";

interface ParticipantsModalProps {
  roomId: string;
  onClose: () => void;
}

export function ParticipantsModal({ roomId, onClose }: ParticipantsModalProps) {
  const t = useTranslations("room");
  const { participants, loading } = useParticipants(roomId);

  return (
    <Modal
      title={`${t("participants")}${!loading ? ` (${participants.length})` : ""}`}
      onClose={onClose}
      size="sm"
    >
      {loading ? (
        <div className="space-y-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3 animate-pulse">
              <div className="size-8 rounded-full bg-bg-elevated shrink-0" />
              <div className="h-3 flex-1 rounded bg-bg-elevated" />
            </div>
          ))}
        </div>
      ) : (
        <ul className="space-y-1">
          {participants.map((p) => (
            <li key={p.id} className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-bg-elevated transition-colors">
              <Avatar name={p.displayName} photoURL={p.photoURL} />
              <span className="flex-1 text-sm text-text-primary truncate">
                {p.displayName || t("unknown")}
              </span>
              {p.role === "facilitator" && (
                <span className="text-[10px] font-semibold uppercase tracking-widest text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded-sm shrink-0">
                  {t("host")}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </Modal>
  );
}

function Avatar({
  name,
  photoURL,
}: {
  name: string;
  photoURL: string | null;
}) {
  const initials = name
    ? name
        .split(" ")
        .map((w) => w[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "?";

  if (photoURL) {
    return (
      <Image
        src={photoURL}
        alt={name}
        width={32}
        height={32}
        className="size-8 rounded-full shrink-0 object-cover"
      />
    );
  }

  return (
    <div className="size-8 rounded-full shrink-0 bg-bg-elevated border border-border flex items-center justify-center text-[11px] font-semibold text-text-muted">
      {initials}
    </div>
  );
}
