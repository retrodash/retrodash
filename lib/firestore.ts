import {
  collection,
  collectionGroup,
  doc,
  getDoc,
  getDocs,
  setDoc,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  deleteDoc,
  writeBatch,
  onSnapshot,
  serverTimestamp,
  increment,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import type { Card, FeedbackType } from "@/types";
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

export async function getUncompletedActionItems(roomId: string): Promise<Card[]> {
  const colSnap = await getDocs(
    query(
      collection(db, "rooms", roomId, "columns"),
      where("isActionItems", "==", true),
    ),
  );
  if (colSnap.empty) return [];
  const actionColId = colSnap.docs[0].id;

  const cardSnap = await getDocs(
    query(
      collection(db, "rooms", roomId, "cards"),
      where("columnId", "==", actionColId),
      where("done", "==", false),
      orderBy("createdAt", "asc"),
    ),
  );
  return cardSnap.docs.map((d) => ({ id: d.id, ...d.data() }) as Card);
}

export async function createRoom({
  name,
  passwordHash,
  isPublic,
  ownerId,
  ownerName,
  ownerPhotoURL,
  isAnonymous,
  columnTitles,
  actionItemsTitle,
  initialActionItemTexts = [],
}: {
  name: string;
  passwordHash: string;
  isPublic: boolean;
  ownerId: string;
  ownerName: string;
  ownerPhotoURL: string | null;
  isAnonymous: boolean;
  columnTitles: string[];
  actionItemsTitle: string;
  initialActionItemTexts?: string[];
}): Promise<string> {
  const batch = writeBatch(db);
  const roomRef = doc(collection(db, "rooms"));

  batch.set(roomRef, {
    name,
    password: passwordHash,
    isPublic,
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
    title: actionItemsTitle,
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

  initialActionItemTexts.forEach((text) => {
    const cardRef = doc(collection(db, "rooms", roomRef.id, "cards"));
    batch.set(cardRef, {
      columnId: actionItemsRef.id,
      text,
      authorId: ownerId,
      authorName: ownerName,
      votes: 0,
      votedBy: [],
      done: false,
      createdAt: serverTimestamp(),
    });
  });

  await batch.commit();
  return roomRef.id;
}

export async function getParticipant(roomId: string, userId: string) {
  const snap = await getDoc(doc(db, "rooms", roomId, "participants", userId));
  return snap.exists() ? snap.data() : null;
}

export function subscribeToParticipant(
  roomId: string,
  userId: string,
  callback: (exists: boolean) => void,
): () => void {
  return onSnapshot(doc(db, "rooms", roomId, "participants", userId), (snap) =>
    callback(snap.exists()),
  );
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
  status: "waiting" | "active" | "ended",
  description?: string,
): Promise<void> {
  await updateDoc(doc(db, "rooms", roomId), {
    status,
    ...(description ? { description } : {}),
  });
}

// ── Card mutations ─────────────────────────────────────────────

export async function addCard(
  roomId: string,
  {
    columnId,
    text,
    authorId,
    authorName,
    authorPhotoURL = null,
    isActionItem = false,
  }: { columnId: string; text: string; authorId: string; authorName: string; authorPhotoURL?: string | null; isActionItem?: boolean }
): Promise<void> {
  await addDoc(collection(db, "rooms", roomId, "cards"), {
    columnId,
    text,
    authorId,
    authorName,
    authorPhotoURL,
    votes: 0,
    votedBy: [],
    published: false,
    ...(isActionItem && { done: false }),
    createdAt: serverTimestamp(),
  });
}

export async function publishCard(roomId: string, cardId: string): Promise<void> {
  await updateDoc(doc(db, "rooms", roomId, "cards", cardId), { published: true });
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

export async function removeParticipant(roomId: string, userId: string): Promise<void> {
  await deleteDoc(doc(db, "rooms", roomId, "participants", userId));
}

export async function deleteRoom(roomId: string): Promise<void> {
  const batch = writeBatch(db);
  const [participantsSnap, columnsSnap, cardsSnap] = await Promise.all([
    getDocs(collection(db, "rooms", roomId, "participants")),
    getDocs(collection(db, "rooms", roomId, "columns")),
    getDocs(collection(db, "rooms", roomId, "cards")),
  ]);
  [...participantsSnap.docs, ...columnsSnap.docs, ...cardsSnap.docs].forEach((d) =>
    batch.delete(d.ref)
  );
  batch.delete(doc(db, "rooms", roomId));
  await batch.commit();
}

export async function addFeedback({
  userId,
  userName,
  userEmail,
  userPhoto,
  type,
  message,
}: {
  userId: string;
  userName: string;
  userEmail: string;
  userPhoto: string | null;
  type: FeedbackType;
  message: string;
}): Promise<void> {
  await addDoc(collection(db, "feedback"), {
    userId,
    userName,
    userEmail,
    userPhoto,
    type,
    message,
    createdAt: serverTimestamp(),
  });
}
