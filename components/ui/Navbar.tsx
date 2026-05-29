"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "@/i18n/navigation";
import { useTranslations, useLocale } from "next-intl";
import { signOut } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { RetroDashLogo } from "@/components/ui/RetroDashLogo";
import { MenuIcon, MessageIcon } from "@/components/ui/Icons";

interface NavbarProps {
  logoHref?: string;
  children?: React.ReactNode;
  leftActions?: React.ReactNode;
  actions?: React.ReactNode;
  showHamburger?: boolean;
}

export function Navbar({
  logoHref,
  children,
  leftActions,
  actions,
  showHamburger,
}: NavbarProps) {
  const { user } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("navbar");
  const [menuOpen, setMenuOpen] = useState(false);
  const [, startTransition] = useTransition();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpen]);

  const handleSignOut = async () => {
    setMenuOpen(false);
    await signOut();
    router.push("/login");
  };

  const switchLocale = (next: string) => {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
    setMenuOpen(false);
  };

  const logo = <RetroDashLogo width={110} className="w-20.5 sm:w-27.5" />;

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
        {(children || leftActions) && (
          <>
            <span aria-hidden className="text-border hidden sm:block shrink-0">
              |
            </span>
            <div className="flex items-center gap-2.5 min-w-0">
              {children && (
                <div
                  className={`flex items-center gap-2.5 min-w-0 ${showHamburger ? "hidden sm:flex" : "flex"}`}
                >
                  {children}
                </div>
              )}
              {leftActions}
            </div>
          </>
        )}
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {actions}

        {/* Theme, language, user info, sign out — hidden on mobile when hamburger is active */}
        <div
          className={`flex items-center gap-3 ${showHamburger ? "hidden sm:flex" : "flex"}`}
        >
          <ThemeToggle variant="dropdown" />
          <LanguageSwitcher />
          <span aria-hidden className="text-border hidden sm:block">
            |
          </span>
          <Link
            href="/feedback"
            title={t("feedback")}
            className="hidden sm:flex w-8 h-8 items-center justify-center rounded-md border border-transparent text-text-muted hover:border-border hover:bg-bg-card hover:text-text-secondary transition-colors"
          >
            <MessageIcon size={16} />
          </Link>
          <span aria-hidden className="text-border hidden sm:block">
            |
          </span>
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
          <span aria-hidden className="text-border hidden sm:block">
            |
          </span>
          <button
            onClick={handleSignOut}
            className="text-text-muted hover:text-text-primary text-sm transition-colors cursor-pointer"
          >
            {t("signOut")}
          </button>
        </div>

        {/* Hamburger button — mobile only, when showHamburger is true */}
        {showHamburger && (
          <div ref={menuRef} className="relative sm:hidden">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
              aria-expanded={menuOpen}
              className={`w-8 h-8 flex items-center justify-center rounded-md border transition-colors cursor-pointer ${
                menuOpen
                  ? "border-border bg-bg-card text-accent-primary"
                  : "border-transparent text-text-muted hover:border-border hover:bg-bg-card hover:text-text-secondary"
              }`}
            >
              <MenuIcon />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-bg-surface border border-border rounded-lg shadow-lg overflow-hidden z-50 py-1">
                <div className="px-3 py-2.5">
                  <ThemeToggle variant="inline" />
                </div>

                <div className="mx-3 h-px bg-border" />

                <div className="px-3 py-2.5 flex">
                  <button
                    onClick={() => switchLocale("en")}
                    className={`flex-1 h-7 rounded text-xs font-medium transition-colors cursor-pointer ${
                      locale === "en"
                        ? "bg-accent-primary/15 text-accent-primary"
                        : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
                    }`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => switchLocale("pt-BR")}
                    className={`flex-1 h-7 rounded text-xs font-medium transition-colors cursor-pointer ${
                      locale === "pt-BR"
                        ? "bg-accent-primary/15 text-accent-primary"
                        : "text-text-secondary hover:text-text-primary hover:bg-bg-elevated"
                    }`}
                  >
                    PT
                  </button>
                </div>

                <div className="mx-3 h-px bg-border" />

                <div className="px-3 py-2.5">
                  <Link
                    href="/feedback"
                    onClick={() => setMenuOpen(false)}
                    className="block text-sm text-text-secondary hover:text-text-primary transition-colors"
                  >
                    {t("feedback")}
                  </Link>
                </div>

                <div className="mx-3 h-px bg-border" />

                <div className="px-3 py-2.5">
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left text-sm text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
                  >
                    {t("signOut")}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
