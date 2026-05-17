"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { signInWithGoogle } from "@/lib/auth";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
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
      setError("Sign-in failed. Please try again.");
      setSigningIn(false);
    }
  };

  if (loading) return null;

  return (
    <div className="min-h-screen bg-bg-base flex">
      {/* ── Left: brand panel ─────────────────────────────────── */}
      <div className="hidden lg:flex flex-1 flex-col justify-between px-16 py-14 relative overflow-hidden">
        {/* Atmospheric glows */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 -left-40 size-140 rounded-full bg-accent-cyan/4 blur-3xl" />
          <div className="absolute -bottom-40 right-0 size-140 rounded-full bg-accent-violet/5 blur-3xl" />
        </div>

        {/* Logo */}
        <div className="relative z-10">
          <Image
            src="/logo.svg"
            alt="RetroDash"
            width={240}
            height={104}
            priority
          />
        </div>

        {/* Hero copy */}
        <div className="relative z-10 max-w-md">
          <h1 className="text-[52px] font-extrabold text-text-primary leading-[1.1] tracking-tight mb-5">
            Reflect<br />Together.{" "}
            <span
              style={{
                background: "var(--gradient-brand)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Improve Always.
            </span>
          </h1>
          <p className="text-text-secondary text-base leading-relaxed">
            Structured retrospectives for high-performing teams.
            Real-time, collaborative, and genuinely useful.
          </p>
        </div>

        {/* Footer */}
        <p className="relative z-10 text-text-muted text-xs">
          Built for Scrum &amp; Kanban teams
        </p>
      </div>

      {/* ── Divider ───────────────────────────────────────────── */}
      <div aria-hidden className="hidden lg:block w-px bg-border self-stretch my-10" />

      {/* ── Right: auth panel ─────────────────────────────────── */}
      <div className="w-full lg:w-120 flex flex-col items-center justify-center px-8 py-12 lg:px-16">
        {/* Mobile logo */}
        <div className="mb-10 lg:hidden">
          <Image src="/logo.svg" alt="RetroDash" width={200} height={86} priority />
        </div>

        <div className="w-full max-w-sm">
          {/* Card */}
          <div className="bg-bg-card border border-border rounded-lg p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-text-primary mb-1">
              Welcome back
            </h2>
            <p className="text-text-secondary text-sm mb-8">
              Sign in to continue to RetroDash
            </p>

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
              {signingIn ? (
                <Spinner />
              ) : (
                <GoogleIcon />
              )}
              {signingIn ? "Signing in…" : "Continue with Google"}
            </button>

            <p className="mt-6 text-center text-xs text-text-muted leading-relaxed">
              No account yet? It&apos;s created automatically on your first sign-in.
            </p>
          </div>

          {/* Terms */}
          <p className="mt-6 text-center text-xs text-text-muted leading-relaxed">
            By continuing, you agree to our{" "}
            <a href="#" className="text-accent-cyan hover:underline transition-colors">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-accent-cyan hover:underline transition-colors">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
    </svg>
  );
}

function Spinner() {
  return (
    <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}
