"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user)
      router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
  }, [user, loading, router, pathname]);

  if (loading || !user) return null;

  return <>{children}</>;
}
