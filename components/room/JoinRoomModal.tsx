"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

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
        <input
          autoFocus
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste room code…"
          className="w-full bg-bg-elevated border border-border rounded-md px-4 py-2.5 text-text-primary text-sm font-mono placeholder:text-text-muted focus:outline-hidden focus:border-accent-cyan transition-colors"
          spellCheck={false}
        />

        <Button type="submit" disabled={!code.trim()} className="w-full">
          Join Room
        </Button>
      </form>
    </Modal>
  );
}
