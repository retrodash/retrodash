import type { Timestamp } from "firebase/firestore";

export interface Room {
  id: string;
  name: string;
  password: string;
  isPublic: boolean;
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
  authorPhotoURL?: string | null;
  votes: number;
  votedBy: string[];
  done?: boolean;
  actionStatus?: "pending" | "done" | "keep";
  published?: boolean;
  linkedCardId?: string;
  linkedCardText?: string;
  createdAt: Timestamp;
}

export interface Participant {
  id: string;
  displayName: string;
  photoURL: string | null;
  joinedAt: Timestamp;
  role: "facilitator" | "member";
}

export type FeedbackType = "bug" | "feature" | "general";

export interface Feedback {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhoto: string | null;
  type: FeedbackType;
  message: string;
  createdAt: Timestamp;
}
