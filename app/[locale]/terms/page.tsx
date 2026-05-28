import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/legal/LegalPage";
import { getTermsContent } from "@/components/legal/termsContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "pt-BR") {
    return {
      title: "Termos de Serviço — RetroDash",
      description:
        "Os termos e condições que regem o uso do RetroDash, incluindo direitos, deveres e limitação de responsabilidade.",
      robots: { index: false, follow: false },
    };
  }
  return {
    title: "Terms of Service — RetroDash",
    description:
      "The terms and conditions governing your use of RetroDash, including rights, obligations, and limitation of liability.",
    robots: { index: false, follow: false },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage content={getTermsContent(locale)} />;
}
