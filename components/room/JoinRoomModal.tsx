"use client";

import { useState } from "react";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface JoinRoomModalProps {
  onClose: () => void;
}

export function JoinRoomModal({ onClose }: JoinRoomModalProps) {
  const [code, setCode] = useState("");
  const router = useRouter();
  const t = useTranslations("joinRoomModal");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;
    onClose();
    router.push(`/room/${trimmed}`);
  };

  return (
    <Modal onClose={onClose} title={t("title")}>
      <p className="text-text-secondary text-sm mb-5 leading-relaxed">{t("subtitle")}</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          autoFocus
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={t("placeholder")}
          className="font-mono"
          spellCheck={false}
        />

        <Button type="submit" disabled={!code.trim()} className="w-full">
          {t("join")}
        </Button>
      </form>
    </Modal>
  );
}
