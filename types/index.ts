import type { Timestamp } from "firebase/firestore";

export interface Room {
  id: string;
  name: string;
  password: string;
  ownerId: string;
  isAnonymous: boolean;
  status: "waiting" | "active" | "ended";
  description?: string;
  createdAt: Timestamp;
}

export interface Column {
  id: string;
  title: string;
  order: number;
  isActionItems: boolean;
}

export interface Card {
  id: string;
  columnId: string;
  text: string;
  authorId: string;
  authorName: string;
  votes: number;
  votedBy: string[];
  done?: boolean;
  published?: boolean;
  createdAt: Timestamp;
}

export interface Participant {
  id: string;
  displayName: string;
  photoURL: string | null;
  joinedAt: Timestamp;
  role: "facilitator" | "member";
}
