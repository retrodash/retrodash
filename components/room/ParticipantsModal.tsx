"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useParticipants } from "@/hooks/useParticipants";
import { removeParticipant } from "@/lib/firestore";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { XIcon } from "@/components/ui/Icons";

interface ParticipantsModalProps {
  roomId: string;
  isFacilitator: boolean;
  onClose: () => void;
}

export function ParticipantsModal({ roomId, isFacilitator, onClose }: ParticipantsModalProps) {
  const t = useTranslations("room");
  const { participants, loading } = useParticipants(roomId);
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);
  const [removing, setRemoving] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!confirmRemoveId) return;
    function handleOutsideClick(e: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(e.target as Node)) {
        setConfirmRemoveId(null);
      }
    }
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [confirmRemoveId]);

  async function handleRemove() {
    if (!confirmRemoveId) return;
    setRemoving(true);
    try {
      await removeParticipant(roomId, confirmRemoveId);
      setConfirmRemoveId(null);
    } finally {
      setRemoving(false);
    }
  }

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

              {p.role === "facilitator" ? (
                <span className="text-[10px] font-semibold uppercase tracking-widest text-accent-cyan bg-accent-cyan/10 px-2 py-0.5 rounded-sm shrink-0">
                  {t("host")}
                </span>
              ) : isFacilitator ? (
                <div className="relative shrink-0">
                  <button
                    onClick={() =>
                      setConfirmRemoveId(confirmRemoveId === p.id ? null : p.id)
                    }
                    aria-label={t("removeParticipantLabel")}
                    className="size-6 flex items-center justify-center rounded cursor-pointer text-text-muted hover:text-red-400 hover:bg-red-400/10 transition-colors"
                  >
                    <XIcon size={12} />
                  </button>

                  {confirmRemoveId === p.id && (
                    <div
                      ref={popoverRef}
                      className="absolute right-0 top-full mt-2 z-10 w-56 bg-bg-card border border-border rounded-lg shadow-xl p-3"
                    >
                      <p className="text-xs text-text-secondary leading-relaxed mb-3">
                        {t("removeParticipantConfirm", {
                          name: p.displayName || t("unknown"),
                        })}
                      </p>
                      <div className="flex gap-2 justify-end">
                        <Button
                          variant="ghost-text"
                          size="xs"
                          onClick={() => setConfirmRemoveId(null)}
                          disabled={removing}
                        >
                          {t("cancel")}
                        </Button>
                        <Button
                          variant="destructive"
                          size="xs"
                          onClick={handleRemove}
                          disabled={removing}
                        >
                          {removing ? t("removing") : t("removeParticipantButton")}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ) : null}
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
