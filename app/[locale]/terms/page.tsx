import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/legal/LegalPage";
import { getTermsContent } from "@/components/legal/termsContent";

export const metadata: Metadata = {
  title: "Terms of Service — RetroDash",
  description: "The terms and conditions governing your use of RetroDash.",
  robots: { index: false, follow: false },
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage content={getTermsContent(locale)} />;
}
