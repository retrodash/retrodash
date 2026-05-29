"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { ADMIN_UID } from "@/lib/admin";
import { Spinner } from "@/components/ui/Spinner";

export function AdminGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/en/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-bg-base flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (!user) return null;

  if (!ADMIN_UID || user.uid !== ADMIN_UID) {
    return (
      <div className="min-h-screen bg-bg-base flex flex-col items-center justify-center gap-4">
        <p className="text-2xl font-bold text-text-primary">Access Denied</p>
        <p className="text-text-secondary text-sm">
          You do not have permission to view this page.
        </p>
        <button
          onClick={() => router.replace("/en/dashboard")}
          className="mt-2 text-accent-cyan text-sm hover:underline cursor-pointer"
        >
          Go to dashboard
        </button>
      </div>
    );
  }

  return <>{children}</>;
}
