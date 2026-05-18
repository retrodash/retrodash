import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  setDoc,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  serverTimestamp,
  increment,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// ── Room queries ───────────────────────────────────────────────

export function ownedRoomsQuery(userId: string) {
  return query(collection(db, "rooms"), where("ownerId", "==", userId));
}

export function columnsQuery(roomId: string) {
  return query(
    collection(db, "rooms", roomId, "columns"),
    orderBy("order", "asc")
  );
}

export function cardsQuery(roomId: string) {
  return query(
    collection(db, "rooms", roomId, "cards"),
    orderBy("createdAt", "asc")
  );
}

// ── Room mutations ─────────────────────────────────────────────

export function participantsQuery(roomId: string) {
  return query(
    collection(db, "rooms", roomId, "participants"),
    orderBy("joinedAt", "asc"),
  );
}

export function joinedRoomsParticipantQuery(userId: string) {
  return query(
    collectionGroup(db, "participants"),
    where("userId", "==", userId),
  );
}

export function roomDoc(roomId: string) {
  return doc(db, "rooms", roomId);
}

export async function createRoom({
  name,
  passwordHash,
  ownerId,
  ownerName,
  ownerPhotoURL,
  isAnonymous,
  columnTitles,
}: {
  name: string;
  passwordHash: string;
  ownerId: string;
  ownerName: string;
  ownerPhotoURL: string | null;
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

  const actionItemsRef = doc(collection(db, "rooms", roomRef.id, "columns"));
  batch.set(actionItemsRef, {
    title: "Action Items",
    order: columnTitles.length,
    isActionItems: true,
  });

  const participantRef = doc(db, "rooms", roomRef.id, "participants", ownerId);
  batch.set(participantRef, {
    userId: ownerId,
    displayName: ownerName,
    photoURL: ownerPhotoURL,
    joinedAt: serverTimestamp(),
    role: "facilitator",
  });

  await batch.commit();
  return roomRef.id;
}

export async function getParticipant(roomId: string, userId: string) {
  const snap = await getDoc(doc(db, "rooms", roomId, "participants", userId));
  return snap.exists() ? snap.data() : null;
}

export async function joinRoom(
  roomId: string,
  userId: string,
  displayName: string,
  photoURL: string | null,
): Promise<void> {
  await setDoc(doc(db, "rooms", roomId, "participants", userId), {
    userId,
    displayName,
    photoURL,
    joinedAt: serverTimestamp(),
    role: "member",
  });
}

export async function updateRoomStatus(
  roomId: string,
  status: "waiting" | "active" | "ended"
): Promise<void> {
  await updateDoc(doc(db, "rooms", roomId), { status });
}

// ── Card mutations ─────────────────────────────────────────────

export async function addCard(
  roomId: string,
  {
    columnId,
    text,
    authorId,
    authorName,
    isActionItem = false,
  }: { columnId: string; text: string; authorId: string; authorName: string; isActionItem?: boolean }
): Promise<void> {
  await addDoc(collection(db, "rooms", roomId, "cards"), {
    columnId,
    text,
    authorId,
    authorName,
    votes: 0,
    votedBy: [],
    ...(isActionItem && { done: false }),
    createdAt: serverTimestamp(),
  });
}

export async function toggleCardDone(
  roomId: string,
  cardId: string,
  done: boolean
): Promise<void> {
  await updateDoc(doc(db, "rooms", roomId, "cards", cardId), { done: !done });
}

export async function updateCard(
  roomId: string,
  cardId: string,
  text: string
): Promise<void> {
  await updateDoc(doc(db, "rooms", roomId, "cards", cardId), { text });
}

export async function deleteCard(roomId: string, cardId: string): Promise<void> {
  await deleteDoc(doc(db, "rooms", roomId, "cards", cardId));
}

export async function toggleVote(
  roomId: string,
  cardId: string,
  userId: string,
  hasVoted: boolean
): Promise<void> {
  await updateDoc(doc(db, "rooms", roomId, "cards", cardId), {
    votes:   increment(hasVoted ? -1 : 1),
    votedBy: hasVoted ? arrayRemove(userId) : arrayUnion(userId),
  });
}
