"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const wasAuthenticated = useRef(false);

  useEffect(() => {
    if (user) wasAuthenticated.current = true;
  }, [user]);

  useEffect(() => {
    if (!loading && !user) {
      if (wasAuthenticated.current) {
        router.push("/login");
      } else {
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
      }
    }
  }, [user, loading, router, pathname]);

  if (loading || !user) return null;

  return <>{children}</>;
}
