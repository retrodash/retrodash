import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/legal/LegalPage";
import { getPrivacyContent } from "@/components/legal/privacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy — RetroDash",
  description: "How RetroDash collects, uses, and protects your personal information.",
  robots: { index: false, follow: false },
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage content={getPrivacyContent(locale)} />;
}
