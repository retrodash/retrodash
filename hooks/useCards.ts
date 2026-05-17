"use client";

import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { cardsQuery } from "@/lib/firestore";
import type { Card } from "@/types";

export function useCards(roomId: string) {
  const [cards, setCards]   = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(cardsQuery(roomId), (snap) => {
      setCards(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Card)));
      setLoading(false);
    });

    return unsubscribe;
  }, [roomId]);

  return { cards, loading };
}
