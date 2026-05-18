import { SummaryClient } from "@/components/room/SummaryClient";

export default async function SummaryPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  return <SummaryClient roomId={roomId} />;
}
