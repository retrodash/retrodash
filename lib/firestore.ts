import { collection, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export function ownedRoomsQuery(userId: string) {
  return query(
    collection(db, "rooms"),
    where("ownerId", "==", userId)
  );
}
