import { getTranslations } from "next-intl/server";
import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import HomeComponent from "./home/HomeComponent";

// Define the type for params
interface PageParams {
  locale: string;
}

// Define the props type for the component
interface HomePageProps {
  params: Promise<PageParams>; // Si estás usando Next.js 14 con Server Components async
}

// Función generateMetadata corregida
export async function generateMetadata({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });

  const siteUrl = "https://mexicotravel.vercel.app";
  const title = t("metaTitle");
  const description = t("metaDescription");
  const imageUrl = `${siteUrl}/imgMexicoTravel.webp`;
  const siteName = t("metaSiteName");

  // Mapeo de locales para OpenGraph (default en inglés)
  const ogLocale = locale === "es"
    ? "es_ES"
    : locale === "fr"
      ? "fr_FR"
      : "en_US"; // por defecto inglés

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: siteUrl,
      siteName: siteName,
      images: [
        {
          url: imageUrl,
          width: 600,
          height: 600,
          alt: t("imageAlt"),
        },
      ],
      locale: ogLocale,
      type: "website",
    },
    alternates: {
      canonical: siteUrl, // canonical principal en inglés
      languages: {
        "en-US": `${siteUrl}/en`,
        "es-ES": `${siteUrl}/es`,
        "fr-FR": `${siteUrl}/fr`,
      },
    },
  };
}

export default function HomePage({ params }: HomePageProps) {
  const { locale } = use(params) as PageParams;
  
  // Enable static rendering
  setRequestLocale(locale);

  return <HomeComponent locale={locale} />;
}
