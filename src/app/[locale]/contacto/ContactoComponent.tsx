import { useTranslations } from "next-intl";
import ContactoSection from "./components/ContactoSection";

export default function ContactoComponent() {
  const t = useTranslations("Contacto");

  return (
    <ContactoSection
      title={t("title")}
      subtitle={t("subtitle")}
      formTitle={t("formTitle")}
      formFields={{
        name: t("formFields.name"),
        email: t("formFields.email"),
        phone: t("formFields.phone"),
        subject: t("formFields.subject"),
        message: t("formFields.message"),
        company: t("formFields.company")
      }}
      submitButton={t("submitButton")}
      loadingButton={t("loadingButton")}
      successMessage={t("successMessage")}
      errorMessage={t("errorMessage")}
      contactInfo={{
        title: t("contactInfo.title"),
        items: [
          {
            icon: "phone",
            title: t("contactInfo.phone.title"),
            content: t("contactInfo.phone.content"),
            link: "tel:+34987654321"
          },
          {
            icon: "email",
            title: t("contactInfo.email.title"),
            content: t("contactInfo.email.content"),
            link: "mailto:info@empresa.com"
          },
          {
            icon: "location",
            title: t("contactInfo.location.title"),
            content: t("contactInfo.location.content"),
            link: "https://maps.google.com"
          },
          {
            icon: "schedule",
            title: t("contactInfo.schedule.title"),
            content: t("contactInfo.schedule.content"),
            link: ""
          }
        ]
      }}
      socialMedia={{
        title: t("socialMedia.title"),
        items: [
          {
            name: "Instagram",
            icon: "instagram",
            url: "https://instagram.com",
            color: "hover:text-pink-500"
          },
          {
            name: "Facebook",
            icon: "facebook",
            url: "https://facebook.com",
            color: "hover:text-blue-600"
          },
          {
            name: "WhatsApp",
            icon: "whatsapp",
            url: "https://wa.me/123456789",
            color: "hover:text-green-500"
          },
          {
            name: "TikTok",
            icon: "tiktok",
            url: "https://tiktok.com",
            color: "hover:text-black"
          }
        ]
      }}
    />
  );
}