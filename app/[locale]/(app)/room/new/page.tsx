import type { Metadata } from "next";
import { NewRoomClient } from "@/components/room/NewRoomClient";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function NewRoomPage() {
  return <NewRoomClient />;
}
