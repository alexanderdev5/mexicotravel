import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import {
  Montserrat,
  Josefin_Sans
} from "next/font/google";
import "../globals.css";
import { setRequestLocale } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { ReactNode } from 'react';
import Footer from "@/components/Footer";
import TopHeader from "@/components/TopHeader";
import Header from "@/components/Header";

// Definir tipos para las props - ahora params es una Promise
interface LocaleLayoutProps {
  children: ReactNode;
  params: Promise<{
    locale: string;
  }>;
}

// Tipos para los parámetros estáticos
interface StaticParams {
  locale: string;
}

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  weight: "400",
  display: "swap",
});

const josefinsans = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefinsans",
  weight: "400",
  display: "swap",
});

export const generateStaticParams = (): StaticParams[] => {
  const locales = ["es", "en"];
  return locales.map((locale) => ({ locale }));
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  // ¡IMPORTANTE! Ahora debemos await params
  const { locale } = await params;
  
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  
  // Enable static rendering
  setRequestLocale(locale);
  
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${montserrat.variable} ${josefinsans.variable} `}
    >
      <body suppressHydrationWarning={true}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <TopHeader />
          <Header />
            {children}
            <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}