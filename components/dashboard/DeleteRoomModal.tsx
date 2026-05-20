"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { deleteRoom } from "@/lib/firestore";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import type { Room } from "@/types";

interface DeleteRoomModalProps {
  room: Room;
  onClose: () => void;
}

export function DeleteRoomModal({ room, onClose }: DeleteRoomModalProps) {
  const t = useTranslations("dashboard");
  const tRoom = useTranslations("room");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const confirmWord = t("deleteRoomConfirmWord");
  const isConfirmed = value.trim().toUpperCase() === confirmWord;

  async function handleDelete() {
    if (!isConfirmed) return;
    setLoading(true);
    try {
      await deleteRoom(room.id);
      onClose();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Modal title={t("deleteRoomTitle")} onClose={onClose} size="sm">
      <p className="text-sm text-text-secondary leading-relaxed mb-1">
        <span className="font-semibold text-text-primary">{room.name}</span>
      </p>
      <p className="text-sm text-text-secondary leading-relaxed mb-4">
        {t("deleteRoomSubtitle", { confirmWord })}
      </p>
      <Input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("deleteRoomPlaceholder")}
        spellCheck={false}
        autoComplete="off"
      />
      <div className="flex gap-2 mt-4 justify-end">
        <Button variant="ghost-text" size="sm" onClick={onClose} disabled={loading}>
          {tRoom("cancel")}
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
          disabled={!isConfirmed || loading}
        >
          {loading ? t("deleting") : t("deleteRoomConfirmButton")}
        </Button>
      </div>
    </Modal>
  );
}
