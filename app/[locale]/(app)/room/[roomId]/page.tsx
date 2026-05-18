import { RoomClient } from "@/components/room/RoomClient";

export default async function RoomPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  return <RoomClient roomId={roomId} />;
}
