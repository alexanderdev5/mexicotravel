import { useTranslations } from "next-intl";
import HeroSection from "@/app/[locale]/home/components/HeroSection";

export default function HomeComponent() {
  const t = useTranslations("Home.Hero");

  return (
    <HeroSection
      title={t("title")}
      subtitle={t("subtitle")}
      primaryButtonText={t("primaryButton")}
      secondaryButtonText={t("secondaryButton")}
      imageUrl={t("imageUrl")}
      imageAlt={t("imageAlt")}
      badgeText={t("badge")}
      trustItems={[
        { icon: "check", text: t("trust.check") },
        { icon: "star", text: t("trust.star") },
        { icon: "heart", text: t("trust.heart") },
      ]}
    />
  );
}
