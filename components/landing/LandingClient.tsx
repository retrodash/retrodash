"use client";

import { useAuth } from "@/hooks/useAuth";
import { LandingNav } from "./LandingNav";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeaturesSection";
import { HowItWorksSection } from "./HowItWorksSection";
import { FinalCTASection } from "./FinalCTASection";
import { SiteFooter } from "./SiteFooter";

export function LandingClient() {
  const { user, loading } = useAuth();
  const ctaHref = user ? "/dashboard" : "/login";
  const ctaLabel = user ? "Access Dashboard" : "Get Started";

  return (
    <div className="min-h-screen bg-bg-base text-text-primary flex flex-col overflow-x-hidden">
      <LandingNav ctaHref={ctaHref} ctaLabel={ctaLabel} loading={loading} />
      <main className="flex-1">
        <HeroSection ctaHref={ctaHref} ctaLabel={ctaLabel} loading={loading} />
        <FeaturesSection />
        <HowItWorksSection />
        <FinalCTASection ctaHref={ctaHref} ctaLabel={ctaLabel} loading={loading} />
      </main>
      <SiteFooter />
    </div>
  );
}
