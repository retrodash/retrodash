import { AdminGuard } from "@/components/admin/AdminGuard";
import { FeedbackBoard } from "@/components/admin/FeedbackBoard";

export default function AdminPage() {
  return (
    <AdminGuard>
      <FeedbackBoard />
    </AdminGuard>
  );
}
