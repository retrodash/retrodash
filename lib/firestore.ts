import {
  collection,
  doc,
  query,
  where,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export function ownedRoomsQuery(userId: string) {
  return query(collection(db, "rooms"), where("ownerId", "==", userId));
}

export async function createRoom({
  name,
  passwordHash,
  ownerId,
  isAnonymous,
  columnTitles,
}: {
  name: string;
  passwordHash: string;
  ownerId: string;
  isAnonymous: boolean;
  columnTitles: string[];
}): Promise<string> {
  const batch = writeBatch(db);

  const roomRef = doc(collection(db, "rooms"));

  batch.set(roomRef, {
    name,
    password: passwordHash,
    ownerId,
    isAnonymous,
    status: "waiting",
    createdAt: serverTimestamp(),
  });

  columnTitles.forEach((title, index) => {
    const colRef = doc(collection(db, "rooms", roomRef.id, "columns"));
    batch.set(colRef, { title, order: index, isActionItems: false });
  });

  // Action Items is always the last column
  const actionItemsRef = doc(collection(db, "rooms", roomRef.id, "columns"));
  batch.set(actionItemsRef, {
    title: "Action Items",
    order: columnTitles.length,
    isActionItems: true,
  });

  const participantRef = doc(db, "rooms", roomRef.id, "participants", ownerId);
  batch.set(participantRef, {
    joinedAt: serverTimestamp(),
    role: "facilitator",
  });

  await batch.commit();
  return roomRef.id;
}
