"use client";

import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiClock, 
  FiInstagram, 
  FiFacebook,
  FiSend,
  FiCheckCircle,
  FiAlertCircle
} from "react-icons/fi";
import { FaWhatsapp, FaTiktok } from "react-icons/fa";
import { createContactSchema, ContactFormData } from "../schemas/contact";
import HeroSectionReu from "@/components/HeroSectionReu";

interface ContactSectionProps {
  title: string;
  subtitle: string;
  formTitle: string;
  formFields: {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
    company: string;
  };
  submitButton: string;
  loadingButton: string;
  successMessage: string;
  errorMessage: string;
  contactInfo: {
    title: string;
    items: {
      icon: "phone" | "email" | "location" | "schedule";
      title: string;
      content: string;
      link: string;
    }[];
  };
  socialMedia: {
    title: string;
    items: {
      name: string;
      icon: "whatsapp" | "instagram" | "facebook" | "tiktok";
      url: string;
      color: string;
    }[];
  };
}

const ContactSection: React.FC<ContactSectionProps> = ({
  title,
  subtitle,
  formTitle,
  formFields,
  submitButton,
  loadingButton,
  successMessage,
  errorMessage,
  contactInfo,
  socialMedia
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const t = useTranslations("Contacto");

  // Crear el schema con las traducciones usando useMemo para optimización
  const contactSchema = useMemo(() => {
    const validationMessages = {
      name: {
        min: t("validation.name.min"),
        max: t("validation.name.max"),
        invalid: t("validation.name.invalid")
      },
      email: {
        invalid: t("validation.email.invalid"),
        min: t("validation.email.min"),
        max: t("validation.email.max")
      },
      phone: {
        invalid: t("validation.phone.invalid")
      },
      company: {
        max: t("validation.company.max")
      },
      subject: {
        required: t("validation.subject.required"),
        max: t("validation.subject.max")
      },
      message: {
        min: t("validation.message.min"),
        max: t("validation.message.max"),
        invalid: t("validation.message.invalid")
      }
    };
    
    return createContactSchema(validationMessages);
  }, [t]);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
    watch
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      subject: "",
      message: ""
    }
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simular envío a API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aquí iría tu llamada real a la API
      // const response = await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(data)
      // });
      
      // if (!response.ok) throw new Error('Error en el envío');
      
      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus("idle"), 5000);
    }
  };

  const getIcon = (iconName: string, size: number = 20) => {
    const icons: { [key: string]: React.JSX.Element } = {
      phone: <FiPhone size={size} />,
      email: <FiMail size={size} />,
      location: <FiMapPin size={size} />,
      schedule: <FiClock size={size} />,
      whatsapp: <FaWhatsapp size={size} />,
      instagram: <FiInstagram size={size} />,
      facebook: <FiFacebook size={size} />,
      tiktok: <FaTiktok size={size} />
    };
    return icons[iconName] || <FiMail size={size} />;
  };

  const subjectOptions = [
    { value: "general", label: t("formFields.subject") === "¿En qué podemos ayudarte?" ? "Consulta General" : "General Inquiry" },
    { value: "booking", label: t("formFields.subject") === "¿En qué podemos ayudarte?" ? "Reserva de Tours" : "Tour Booking" },
    { value: "custom", label: t("formFields.subject") === "¿En qué podemos ayudarte?" ? "Ruta Personalizada" : "Custom Route" },
    { value: "support", label: t("formFields.subject") === "¿En qué podemos ayudarte?" ? "Soporte al Cliente" : "Customer Support" },
    { value: "group", label: t("formFields.subject") === "¿En qué podemos ayudarte?" ? "Viaje en Grupo" : "Group Travel" },
    { value: "other", label: t("formFields.subject") === "¿En qué podemos ayudarte?" ? "Otro" : "Other" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-amber-50">
      {/* Header Section Reu */}
      <HeroSectionReu
        title={title}
        subtitle={subtitle}
        imageUrl={t("imageUrl")}
        imageAlt={t("imageAlt")}
        badgeText={t("badge")}
        trustItems={[
          { icon: "check", text: t("trust.check") },
          { icon: "star", text: t("trust.star") },
          { icon: "heart", text: t("trust.heart") },
        ]} 
      />

      {/* Resto del componente se mantiene igual */}
      <div className="container mx-auto px-4 pb-20 mt-10">
        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          
          {/* Contact Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-blue-100">
            <div className="flex items-center mb-8">
              <div className="w-2 h-10 bg-gradient-to-b from-amber-400 to-amber-500 rounded-full mr-4"></div>
              <h2 className="text-2xl md:text-3xl font-bold text-blue-900">{formTitle}</h2>
            </div>

            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-center">
                <FiCheckCircle className="text-green-500 mr-3" size={24} />
                <span className="text-green-700 font-medium">{successMessage}</span>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-center">
                <FiAlertCircle className="text-red-500 mr-3" size={24} />
                <span className="text-red-700 font-medium">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Los campos del formulario se mantienen igual */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Nombre */}
                <div>
                  <label className="block text-blue-900 font-semibold mb-3">
                    {formFields.name} *
                  </label>
                  <input
                    type="text"
                    {...register("name")}
                    className={`w-full px-4 py-3 bg-blue-50 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.name 
                        ? "border-red-300 focus:ring-red-500" 
                        : "border-blue-200 focus:ring-blue-500 focus:border-transparent"
                    }`}
                    placeholder={formFields.name}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <FiAlertCircle className="mr-1" size={14} />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-blue-900 font-semibold mb-3">
                    {formFields.email} *
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className={`w-full px-4 py-3 bg-blue-50 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.email 
                        ? "border-red-300 focus:ring-red-500" 
                        : "border-blue-200 focus:ring-blue-500 focus:border-transparent"
                    }`}
                    placeholder={formFields.email}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <FiAlertCircle className="mr-1" size={14} />
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Teléfono */}
                <div>
                  <label className="block text-blue-900 font-semibold mb-3">
                    {formFields.phone}
                  </label>
                  <input
                    type="tel"
                    {...register("phone")}
                    className={`w-full px-4 py-3 bg-blue-50 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.phone 
                        ? "border-red-300 focus:ring-red-500" 
                        : "border-blue-200 focus:ring-blue-500 focus:border-transparent"
                    }`}
                    placeholder={formFields.phone}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <FiAlertCircle className="mr-1" size={14} />
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                {/* Tamaño del Grupo */}
                <div>
                  <label className="block text-blue-900 font-semibold mb-3">
                    {formFields.company}
                  </label>
                  <input
                    type="text"
                    {...register("company")}
                    className={`w-full px-4 py-3 bg-blue-50 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                      errors.company 
                        ? "border-red-300 focus:ring-red-500" 
                        : "border-blue-200 focus:ring-blue-500 focus:border-transparent"
                    }`}
                    placeholder={formFields.company === "Tamaño del Grupo" ? "Ej: 2 personas, familia de 4, etc." : "Ex: 2 people, family of 4, etc."}
                  />
                  {errors.company && (
                    <p className="text-red-500 text-sm mt-2 flex items-center">
                      <FiAlertCircle className="mr-1" size={14} />
                      {errors.company.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Asunto */}
              <div>
                <label className="block text-blue-900 font-semibold mb-3">
                  {formFields.subject} *
                </label>
                <select
                  {...register("subject")}
                  className={`w-full px-4 py-3 bg-blue-50 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.subject 
                      ? "border-red-300 focus:ring-red-500" 
                      : "border-blue-200 focus:ring-blue-500 focus:border-transparent"
                  }`}
                >
                  <option value="">{formFields.subject}</option>
                  {subjectOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                {errors.subject && (
                  <p className="text-red-500 text-sm mt-2 flex items-center">
                    <FiAlertCircle className="mr-1" size={14} />
                    {errors.subject.message}
                  </p>
                )}
              </div>

              {/* Mensaje */}
              <div>
                <label className="block text-blue-900 font-semibold mb-3">
                  {formFields.message} *
                </label>
                <textarea
                  rows={6}
                  {...register("message")}
                  className={`w-full px-4 py-3 bg-blue-50 border rounded-2xl focus:outline-none focus:ring-2 transition-all duration-300 resize-none ${
                    errors.message 
                      ? "border-red-300 focus:ring-red-500" 
                      : "border-blue-200 focus:ring-blue-500 focus:border-transparent"
                  }`}
                  placeholder={formFields.message}
                />
                <div className="flex justify-between items-center mt-2">
                  {errors.message ? (
                    <p className="text-red-500 text-sm flex items-center">
                      <FiAlertCircle className="mr-1" size={14} />
                      {errors.message.message}
                    </p>
                  ) : (
                    <div className="text-sm text-blue-600">
                      {watch('message')?.length || 0}/1000 caracteres
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !isDirty || !isValid}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-8 rounded-2xl shadow-lg hover:shadow-xl disabled:shadow-none transform hover:scale-105 disabled:scale-100 transition-all duration-300 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    {loadingButton}
                  </>
                ) : (
                  <>
                    <FiSend className="mr-3" />
                    {submitButton}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information - Se mantiene igual */}
          <div className="space-y-8">
            {/* Contact Info Cards */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-blue-100">
              <h3 className="text-2xl font-bold text-blue-900 mb-8">
                {contactInfo.title}
              </h3>
              <div className="space-y-6">
                {contactInfo.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 rounded-2xl bg-blue-50 hover:bg-blue-100 transition-all duration-300 group cursor-pointer border border-blue-200"
                    onClick={() => item.link && window.open(item.link, '_blank')}
                  >
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl mr-4 group-hover:scale-110 transition-transform duration-300">
                      {getIcon(item.icon, 24)}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-blue-900 mb-1">{item.title}</h4>
                      <p className="text-blue-700">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-blue-100">
              <h3 className="text-2xl font-bold text-blue-900 mb-8">
                {socialMedia.title}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {socialMedia.items.map((item, index) => (
                  <a
                    key={index}
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center justify-center p-4 rounded-2xl bg-blue-50 text-blue-700 font-semibold transition-all duration-300 ${item.color} hover:bg-blue-100 hover:scale-105 transform border border-blue-200`}
                  >
                    {getIcon(item.icon, 20)}
                    <span className="ml-3">{item.name}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 border border-blue-100">
              <div 
                className="w-full h-64 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300"
                onClick={() => window.open('https://maps.google.com/?q=Cancún+Quintana+Roo+México', '_blank')}
              >
                <div className="text-center text-white">
                  <FiMapPin size={48} className="mx-auto mb-4" />
                  <p className="text-xl font-semibold">
                    {t("formFields.name") === "Nombre Completo" ? "Nuestra Ubicación en Cancún" : "Our Location in Cancún"}
                  </p>
                  <p className="text-blue-100 mt-2">
                    {t("formFields.name") === "Nombre Completo" ? "Clic para ver en Google Maps" : "Click to view on Google Maps"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;