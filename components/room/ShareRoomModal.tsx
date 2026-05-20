"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/Modal";

interface ShareRoomModalProps {
  roomId: string;
  roomName: string;
  isPublic?: boolean;
  onClose: () => void;
}

export function ShareRoomModal({ roomId, roomName, isPublic = false, onClose }: ShareRoomModalProps) {
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const t = useTranslations("shareRoomModal");

  const url = `${window.location.origin}/room/${roomId}`;

  const copy = async (text: string, setter: (v: boolean) => void) => {
    await navigator.clipboard.writeText(text);
    setter(true);
    setTimeout(() => setter(false), 2000);
  };

  return (
    <Modal onClose={onClose} title={t("title")} size="md">
      <p className="text-text-secondary text-sm mb-5 leading-relaxed">
        {t("subtitle")}{" "}
        <span className="text-text-primary font-medium">{roomName}</span>.{" "}
        {isPublic ? t("subtitleEndPublic") : t("subtitleEnd")}
      </p>

      <div className="mb-4">
        <label className="text-text-muted text-[11px] font-semibold uppercase tracking-widest mb-2 block">
          {t("roomCode")}
        </label>
        <div className="flex gap-2">
          <div className="flex-1 bg-bg-elevated border border-border rounded-md px-4 py-2.5 font-mono text-accent-cyan text-sm tracking-widest truncate">
            {roomId}
          </div>
          <button
            onClick={() => copy(roomId, setCopiedCode)}
            className="h-10 px-4 rounded-md text-xs font-semibold transition-all cursor-pointer shrink-0 border"
            style={
              copiedCode
                ? {
                    background: "color-mix(in srgb, var(--color-accent-cyan) 12%, transparent)",
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
            {copiedCode ? t("copied") : t("copy")}
          </button>
        </div>
      </div>

      <div>
        <label className="text-text-muted text-[11px] font-semibold uppercase tracking-widest mb-2 block">
          {t("shareLink")}
        </label>
        <div className="flex gap-2">
          <div className="flex-1 bg-bg-elevated border border-border rounded-md px-4 py-2.5 text-text-secondary text-sm truncate">
            {url}
          </div>
          <button
            onClick={() => copy(url, setCopiedUrl)}
            className="h-10 px-4 rounded-md text-xs font-semibold transition-all cursor-pointer shrink-0"
            style={
              copiedUrl
                ? {
                    background: "color-mix(in srgb, var(--color-accent-cyan) 12%, transparent)",
                    color: "var(--color-accent-cyan)",
                  }
                : {
                    background: "var(--color-accent-cyan)",
                    color: "var(--color-bg-base)",
                  }
            }
          >
            {copiedUrl ? t("copied") : t("copyLink")}
          </button>
        </div>
      </div>
    </Modal>
  );
}
