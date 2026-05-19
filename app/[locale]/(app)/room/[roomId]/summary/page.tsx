import type { Metadata } from "next";
import { SummaryClient } from "@/components/room/SummaryClient";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function SummaryPage({
  params,
}: {
  params: Promise<{ roomId: string }>;
}) {
  const { roomId } = await params;
  return <SummaryClient roomId={roomId} />;
}
