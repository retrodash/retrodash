import type { Timestamp } from "firebase/firestore";

export interface Room {
  id: string;
  name: string;
  ownerId: string;
  isAnonymous: boolean;
  status: "waiting" | "active" | "ended";
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
  createdAt: Timestamp;
}

export interface Participant {
  joinedAt: Timestamp;
  role: "facilitator" | "member";
}
