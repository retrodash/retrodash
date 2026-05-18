"use client";

import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { participantsQuery } from "@/lib/firestore";
import type { Participant } from "@/types";

export function useParticipants(roomId: string) {
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(participantsQuery(roomId), (snap) => {
      setParticipants(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Participant),
      );
      setLoading(false);
    });
    return unsub;
  }, [roomId]);

  return { participants, loading };
}
