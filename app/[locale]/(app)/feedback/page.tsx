import type { Metadata } from "next";
import { FeedbackClient } from "@/components/feedback/FeedbackClient";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function FeedbackPage() {
  return <FeedbackClient />;
}
