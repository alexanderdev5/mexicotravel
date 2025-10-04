import { getTranslations } from "next-intl/server";
import { use } from 'react';
import ContactoComponent from "./ContactoComponent";

// Define the type for params
interface PageParams {
  locale: string;
}



// Función generateMetadata corregida
export async function generateMetadata({ params }: { params: Promise<PageParams> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contacto" });

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

export default function ContactoPage( ) {


  return <ContactoComponent />;
}
