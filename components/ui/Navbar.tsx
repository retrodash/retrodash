"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { signOut } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface NavbarProps {
  logoHref?: string;
  children?: React.ReactNode;
  actions?: React.ReactNode;
}

export function Navbar({ logoHref, children, actions }: NavbarProps) {
  const { user } = useAuth();
  const router = useRouter();
  const t = useTranslations("navbar");

  const handleSignOut = async () => {
    await signOut();
    router.push("/login");
  };

  const logo = (
    <Image src="/logo.svg" alt="RetroDash" width={110} height={48} style={{ height: 'auto' }} priority />
  );

  return (
    <header className="bg-bg-surface border-b border-border px-4 sm:px-6 h-16 flex items-center justify-between shrink-0">
      <div className="flex items-center gap-4 min-w-0">
        {logoHref ? (
          <Link href={logoHref} className="shrink-0">
            {logo}
          </Link>
        ) : (
          logo
        )}
        {children && (
          <>
            <span aria-hidden className="text-border hidden sm:block shrink-0">
              |
            </span>
            <div className="flex items-center gap-2.5 min-w-0">{children}</div>
          </>
        )}
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {actions}
        <ThemeToggle />
        <LanguageSwitcher />
        <span aria-hidden className="text-border hidden sm:block">|</span>
        {user?.photoURL && (
          <Image
            src={user.photoURL}
            alt={user.displayName ?? "User"}
            width={32}
            height={32}
            className="rounded-full"
          />
        )}
        <span className="text-text-secondary text-sm hidden sm:block">
          {user?.displayName}
        </span>
        <span aria-hidden className="text-border hidden sm:block">|</span>
        <button
          onClick={handleSignOut}
          className="text-text-muted hover:text-text-primary text-sm transition-colors cursor-pointer"
        >
          {t("signOut")}
        </button>
      </div>
    </header>
  );
}
