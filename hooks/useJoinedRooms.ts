"use client";

import { useEffect, useState } from "react";
import { onSnapshot, getDoc } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { joinedRoomsParticipantQuery, roomDoc } from "@/lib/firestore";
import type { Room } from "@/types";

export function useJoinedRooms() {
  const { user } = useAuth();
  const [joinedRooms, setJoinedRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setJoinedRooms([]);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const unsub = onSnapshot(
      joinedRoomsParticipantQuery(user.uid),
      async (snap) => {
        // Only member participant docs (role !== "facilitator" = rooms I joined, not created)
        const memberDocs = snap.docs.filter(
          (d) => d.data().role !== "facilitator",
        );

        if (memberDocs.length === 0) {
          if (!cancelled) { setJoinedRooms([]); setLoading(false); }
          return;
        }

        const roomIds = memberDocs.map((d) => d.ref.parent.parent!.id);
        const roomSnaps = await Promise.all(roomIds.map((id) => getDoc(roomDoc(id))));

        if (!cancelled) {
          setJoinedRooms(
            roomSnaps
              .filter((d) => d.exists())
              .map((d) => ({ id: d.id, ...d.data() }) as Room)
              .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds),
          );
          setLoading(false);
        }
      },
    );

    return () => {
      cancelled = true;
      unsub();
    };
  }, [user]);

  return { joinedRooms, loading };
}
