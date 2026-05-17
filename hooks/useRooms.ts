"use client";

import { useEffect, useState } from "react";
import { onSnapshot } from "firebase/firestore";
import { useAuth } from "@/hooks/useAuth";
import { ownedRoomsQuery } from "@/lib/firestore";
import type { Room } from "@/types";

export function useRooms() {
  const { user } = useAuth();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setRooms([]);
      setLoading(false);
      return;
    }

    const unsubscribe = onSnapshot(ownedRoomsQuery(user.uid), (snapshot) => {
      const data = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Room)
      );
      data.sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
      setRooms(data);
      setLoading(false);
    });

    return unsubscribe;
  }, [user]);

  return { rooms, loading };
}
