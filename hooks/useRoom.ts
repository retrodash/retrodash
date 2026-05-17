"use client";

import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { columnsQuery } from "@/lib/firestore";
import type { Room, Column } from "@/types";

export function useRoom(roomId: string) {
  const [room, setRoom]       = useState<Room | null>(null);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let roomReady    = false;
    let columnsReady = false;

    const trySetLoaded = () => {
      if (roomReady && columnsReady) setLoading(false);
    };

    const unsubRoom = onSnapshot(doc(db, "rooms", roomId), (snap) => {
      setRoom(snap.exists() ? ({ id: snap.id, ...snap.data() } as Room) : null);
      roomReady = true;
      trySetLoaded();
    });

    const unsubColumns = onSnapshot(columnsQuery(roomId), (snap) => {
      setColumns(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Column)));
      columnsReady = true;
      trySetLoaded();
    });

    return () => {
      unsubRoom();
      unsubColumns();
    };
  }, [roomId]);

  return { room, columns, loading };
}
