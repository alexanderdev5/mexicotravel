import React from 'react'

import { useTranslations } from "next-intl";
import HeroSection from '@/app/[locale]/home/components/HeroSection';


// En HomeComponent.tsx
interface HomeComponentProps {
  locale: string;
}

export default function HomeComponent({ locale }: HomeComponentProps) {
  // Usa la locale aquí si es necesario
  return (
    <>
      {/* Tu contenido */}
      <HeroSection />
    </>
  );
}