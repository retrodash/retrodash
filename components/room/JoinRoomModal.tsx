"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface JoinRoomModalProps {
  onClose: () => void;
}

export function JoinRoomModal({ onClose }: JoinRoomModalProps) {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = code.trim();
    if (!trimmed) return;
    onClose();
    router.push(`/room/${trimmed}`);
  };

  return (
    <Modal onClose={onClose} title="Join a Room">
      <p className="text-text-secondary text-sm mb-5 leading-relaxed">
        Paste the room code shared by your facilitator.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input
          autoFocus
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste room code…"
          className="font-mono"
          spellCheck={false}
        />

        <Button type="submit" disabled={!code.trim()} className="w-full">
          Join Room
        </Button>
      </form>
    </Modal>
  );
}
