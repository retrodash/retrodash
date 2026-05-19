import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import "../globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
});

export const metadata: Metadata = {
  title: "RetroDash — Reflect Together. Improve Always.",
  description:
    "Run structured retrospectives with your Scrum or Kanban team in real time. Private rooms, cards, voting, and action items — all in one place.",
  metadataBase: new URL("https://retrodash.vercel.app"),
  openGraph: {
    title: "RetroDash — Reflect Together. Improve Always.",
    description:
      "Run structured retrospectives with your Scrum or Kanban team in real time. Private rooms, cards, voting, and action items — all in one place.",
    url: "https://retrodash.vercel.app",
    siteName: "RetroDash",
    images: [
      {
        url: "/og-image.png",
        width: 1456,
        height: 816,
        alt: "RetroDash — Reflect Together. Improve Always.",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RetroDash — Reflect Together. Improve Always.",
    description:
      "Run structured retrospectives with your Scrum or Kanban team in real time. Private rooms, cards, voting, and action items — all in one place.",
    images: ["/og-image.png"],
  },
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pt-BR" }];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${jakarta.variable} h-full`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col font-sans antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
