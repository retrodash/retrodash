import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { LegalPage } from "@/components/legal/LegalPage";
import { getCookiesContent } from "@/components/legal/cookiesContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale === "pt-BR") {
    return {
      title: "Política de Cookies — RetroDash",
      description:
        "Como o RetroDash usa armazenamento local do navegador. Sem cookies de rastreamento, sem analytics de terceiros.",
      robots: { index: false, follow: false },
    };
  }
  return {
    title: "Cookie Policy — RetroDash",
    description:
      "How RetroDash uses browser local storage. No tracking cookies, no third-party analytics.",
    robots: { index: false, follow: false },
  };
}

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegalPage content={getCookiesContent(locale)} />;
}
