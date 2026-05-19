import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { PrivacyPolicyPage } from "@/components/legal/PrivacyPolicyPage";

export const metadata: Metadata = {
  title: "Privacy Policy — RetroDash",
  description: "How RetroDash collects, uses, and protects your personal information.",
};

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <PrivacyPolicyPage locale={locale} />;
}
