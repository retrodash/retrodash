"use client";

import Image from "next/image";
import { useRouter } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { signInWithGoogle } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";
import { GoogleIcon } from "@/components/ui/Icons";
import { Spinner } from "@/components/ui/Spinner";

export function LoginClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const t = useTranslations("login");
  const [signingIn, setSigningIn] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!loading && user) router.push("/dashboard");
  }, [user, loading, router]);

  const handleGoogleSignIn = async () => {
    setSigningIn(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch {
      setError(t("signInFailed"));
      setSigningIn(false);
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-bg-base flex">
      {/* ── Left: brand panel ─────────────────────────────────── */}
      <div className="hidden lg:flex flex-1 flex-col justify-between px-16 py-14 relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 size-140 rounded-full bg-accent-cyan/4 blur-3xl" />
          <div className="absolute -bottom-40 right-0 size-140 rounded-full bg-accent-violet/5 blur-3xl" />
        </div>

        <div className="relative z-10">
          <Image src="/logo.svg" alt="RetroDash" width={240} height={104} priority />
        </div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-[52px] font-extrabold text-text-primary leading-[1.1] tracking-tight mb-5">
            {t("headline")}{" "}
            <span
              style={{
                background: "var(--gradient-brand)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {t("headlineGradient")}
            </span>
          </h1>
          <p className="text-text-secondary text-base leading-relaxed">{t("subtitle")}</p>
        </div>

        <p className="relative z-10 text-text-muted text-xs">{t("footer")}</p>
      </div>

      {/* ── Divider ───────────────────────────────────────────── */}
      <div aria-hidden className="hidden lg:block w-px bg-border self-stretch my-10" />

      {/* ── Right: auth panel ─────────────────────────────────── */}
      <div className="w-full lg:w-120 flex flex-col items-center justify-center px-8 py-12 lg:px-16">
        <div className="mb-10 lg:hidden">
          <Image src="/logo.svg" alt="RetroDash" width={200} height={86} priority />
        </div>

        <div className="w-full max-w-sm">
          <div className="bg-bg-card border border-border rounded-lg p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-text-primary mb-1">{t("welcomeBack")}</h2>
            <p className="text-text-secondary text-sm mb-8">{t("signInTo")}</p>

            {error && (
              <p className="mb-4 text-sm text-red-400 bg-red-400/10 rounded-md px-4 py-2">
                {error}
              </p>
            )}

            <button
              onClick={handleGoogleSignIn}
              disabled={signingIn}
              className="w-full flex items-center justify-center gap-3 h-12 rounded-md bg-white hover:bg-neutral-100 active:bg-neutral-200 disabled:opacity-60 disabled:cursor-not-allowed transition-colors text-neutral-800 font-semibold text-sm cursor-pointer"
            >
              {signingIn ? <Spinner /> : <GoogleIcon />}
              {signingIn ? t("signingIn") : t("continueWithGoogle")}
            </button>

            <p className="mt-6 text-center text-xs text-text-muted leading-relaxed">
              {t("noAccount")}
            </p>
          </div>

          <p className="mt-6 text-center text-xs text-text-muted leading-relaxed">
            {t("byContinuing")}{" "}
            <a href="#" className="text-accent-cyan hover:underline transition-colors">
              {t("termsOfService")}
            </a>{" "}
            {t("and")}{" "}
            <a href="#" className="text-accent-cyan hover:underline transition-colors">
              {t("privacyPolicy")}
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
