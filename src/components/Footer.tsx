"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";

// Tipos TypeScript
interface FooterLink {
  href: string;
  label: string;
  external?: boolean;
}

interface SocialMedia {
  name: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}

interface ContactInfo {
  type: "phone" | "email" | "address";
  value: string;
  href?: string;
  icon: React.ReactNode;
}

interface PaymentMethod {
  name: string;
  icon: React.ReactNode;
}

// Iconos para títulos de secciones
const SectionIcons = {
  destinations: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  experiences: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
    </svg>
  ),
  company: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  support: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  legal: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  newsletter: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  contact: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  social: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
    </svg>
  )
};

// Datos del footer
const socialMedia: SocialMedia[] = [
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
    color: "hover:text-blue-600"
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.2 14.786 3.71 13.635 3.71 12.338s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297z"/>
      </svg>
    ),
    color: "hover:text-pink-600"
  },
  {
    name: "Twitter",
    href: "https://twitter.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
      </svg>
    ),
    color: "hover:text-blue-400"
  },
  {
    name: "YouTube",
    href: "https://youtube.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
    color: "hover:text-red-600"
  },
  {
    name: "TikTok",
    href: "https://tiktok.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
      </svg>
    ),
    color: "hover:text-gray-900"
  }
];

const paymentMethods: PaymentMethod[] = [
  {
    name: "Visa",
    icon: (
      <svg className="w-8 h-5" viewBox="0 0 24 16" fill="none">
        <path d="M9.6 15.2H14.4L16.8 0.8H12L9.6 15.2Z" fill="#1A1F71"/>
        <path d="M21.6 0.8L19.2 15.2H23.2L24 0.8H21.6Z" fill="#1A1F71"/>
        <path d="M0 0.8L2.4 15.2H6.4L4 0.8H0Z" fill="#1A1F71"/>
      </svg>
    )
  },
  {
    name: "Mastercard",
    icon: (
      <svg className="w-8 h-5" viewBox="0 0 24 16" fill="none">
        <circle cx="9.6" cy="8" r="7.2" fill="#EB001B"/>
        <circle cx="14.4" cy="8" r="7.2" fill="#F79E1B"/>
        <path d="M12 12.8C13.7673 11.456 14.4 9.728 14.4 8C14.4 6.272 13.7673 4.544 12 3.2C10.2327 4.544 9.6 6.272 9.6 8C9.6 9.728 10.2327 11.456 12 12.8Z" fill="#FF5F00"/>
      </svg>
    )
  },
  {
    name: "PayPal",
    icon: (
      <svg className="w-8 h-5" viewBox="0 0 24 16" fill="none">
        <path d="M20 0.8H4C1.8 0.8 0 2.6 0 4.8V11.2C0 13.4 1.8 15.2 4 15.2H20C22.2 15.2 24 13.4 24 11.2V4.8C24 2.6 22.2 0.8 20 0.8Z" fill="#003087"/>
        <path d="M18.4 6.4C18.4 8.6 16.6 10.4 14.4 10.4H10.8L9.6 15.2H12L12.8 11.2H14.4C16.6 11.2 18.4 9.4 18.4 7.2V6.4Z" fill="#009CDE"/>
        <path d="M14.4 10.4C16.6 10.4 18.4 8.6 18.4 6.4V4.8C18.4 2.6 16.6 0.8 14.4 0.8H8L5.6 15.2H8L8.8 11.2H10.8L10 15.2H12L12.8 11.2H14.4Z" fill="#012169"/>
      </svg>
    )
  },
  {
    name: "American Express",
    icon: (
      <svg className="w-8 h-5" viewBox="0 0 24 16" fill="none">
        <path d="M0 0.8H24V15.2H0V0.8Z" fill="#007BC3"/>
        <path d="M2.4 4.8H21.6V11.2H2.4V4.8Z" fill="white"/>
        <path d="M4.8 6.4H19.2V9.6H4.8V6.4Z" fill="#007BC3"/>
      </svg>
    )
  }
];

const contactInfo: ContactInfo[] = [
  {
    type: "phone",
    value: "+52 55 1234 5678",
    href: "tel:+525512345678",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    )
  },
  {
    type: "email",
    value: "hola@mexicotravel.com",
    href: "mailto:hola@mexicotravel.com",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    type: "address",
    value: "Ciudad de México, MX",
    href: "https://maps.google.com",
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    )
  }
];

export default function Footer() {
  const t = useTranslations("footer");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const footerSections = [
    {
      title: t("destinations.title"),
      icon: SectionIcons.destinations,
      links: [
        { href: "/destinos/playas", label: t("destinations.beaches") },
        { href: "/destinos/ciudades", label: t("destinations.cities") },
        { href: "/destinos/pueblos-magicos", label: t("destinations.magicTowns") },
        { href: "/destinos/arqueologia", label: t("destinations.archaeology") },
        { href: "/destinos/naturaleza", label: t("destinations.nature") }
      ]
    },
    {
      title: t("experiences.title"),
      icon: SectionIcons.experiences,
      links: [
        { href: "/experiencias/gastronomia", label: t("experiences.gastronomy") },
        { href: "/experiencias/aventura", label: t("experiences.adventure") },
        { href: "/experiencias/cultura", label: t("experiences.culture") },
        { href: "/experiencias/romantico", label: t("experiences.romantic") },
        { href: "/experiencias/familiar", label: t("experiences.family") }
      ]
    },
    {
      title: t("company.title"),
      icon: SectionIcons.company,
      links: [
        { href: "/nosotros", label: t("company.about") },
        { href: "/blog", label: t("company.blog") },
        { href: "/empleo", label: t("company.careers") },
        { href: "/prensa", label: t("company.press") },
        { href: "/sostenibilidad", label: t("company.sustainability") }
      ]
    },
    {
      title: t("support.title"),
      icon: SectionIcons.support,
      links: [
        { href: "/ayuda", label: t("support.help") },
        { href: "/contacto", label: t("support.contact") },
        { href: "/faq", label: t("support.faq") },
        { href: "/cancelaciones", label: t("support.cancellations") },
        { href: "/garantia", label: t("support.guarantee") }
      ]
    },
    {
      title: t("legal.title"),
      icon: SectionIcons.legal,
      links: [
        { href: "/privacidad", label: t("legal.privacy") },
        { href: "/terminos", label: t("legal.terms") },
        { href: "/cookies", label: t("legal.cookies") },
        { href: "/aviso-legal", label: t("legal.legalNotice") },
        { href: "/condiciones", label: t("legal.conditions") }
      ]
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-800 border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Brand & Newsletter Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 group">
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl w-12 h-12 flex items-center justify-center text-white font-bold text-xl shadow-lg transform group-hover:scale-105 transition-all duration-300">
                M
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                  {t("brand")}
                </h3>
                <p className="text-blue-600 font-medium text-sm">{t("tagline")}</p>
              </div>
            </div>
            
            <p className="text-gray-600 max-w-md text-lg leading-relaxed">
              {t("description")}
            </p>

            {/* Newsletter Subscription */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="text-blue-600">
                  {SectionIcons.newsletter}
                </div>
                <h4 className="font-semibold text-gray-900">{t("newsletter.title")}</h4>
              </div>
              {subscribed ? (
                <div className="bg-green-100 border border-green-200 rounded-xl p-4 text-green-700 flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  {t("newsletter.success")}
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t("newsletter.placeholder")}
                    className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-xl placeholder-gray-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 shadow-sm"
                    required
                  />
                  <button
                    type="submit"
                    className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 shadow-lg hover:shadow-xl border border-blue-500"
                  >
                    {t("newsletter.subscribe")}
                  </button>
                </form>
              )}
              <p className="text-gray-500 text-sm">
                {t("newsletter.disclaimer")}
              </p>
            </div>
          </div>

          {/* Links Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600">{section.icon}</span>
                  <h4 className="font-semibold text-gray-900 text-lg">
                    {section.title}
                  </h4>
                </div>
                <ul className="space-y-3">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-blue-600 transition-all duration-200 text-sm leading-relaxed flex items-center gap-2 group"
                      >
                        <span className="w-1.5 h-1.5 bg-blue-200 rounded-full group-hover:bg-blue-500 transition-all duration-200"></span>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact & Social Section */}
        <div className="border-t border-gray-200 pt-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Contact Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="text-blue-600">
                  {SectionIcons.contact}
                </div>
                <h4 className="font-semibold text-gray-900 text-lg">
                  {t("contact.title")}
                </h4>
              </div>
              <div className="space-y-3">
                {contactInfo.map((contact, index) => (
                  <div key={index} className="flex items-center gap-3 text-gray-600 group">
                    <span className="text-blue-500 group-hover:scale-110 transition-transform duration-200">
                      {contact.icon}
                    </span>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        className="hover:text-blue-600 transition-all duration-200 flex items-center gap-1 font-medium"
                      >
                        {contact.value}
                        <svg className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    ) : (
                      <span className="font-medium">{contact.value}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="text-blue-600">
                  {SectionIcons.social}
                </div>
                <h4 className="font-semibold text-gray-900 text-lg">
                  {t("social.title")}
                </h4>
              </div>
              <div className="flex gap-3">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-gray-600 ${social.color} transition-all duration-200 hover:border-blue-300 hover:shadow-md hover:scale-110`}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 mb-8 border border-blue-200">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h5 className="font-semibold text-gray-900 mb-2 flex items-center justify-center md:justify-start gap-2">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  {t("trust.title")}
                </h5>
                <p className="text-gray-600 text-sm">
                  {t("trust.description")}
                </p>
              </div>
              <div className="flex items-center gap-4 flex-wrap justify-center">
                {paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-2 shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200"
                    title={method.name}
                  >
                    {method.icon}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-gray-200">
            <div className="text-gray-500 text-sm text-center md:text-left">
              <p>
                {t("copyright", { year: new Date().getFullYear() })}
              </p>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-500">
              <Link href="/privacidad" className="hover:text-blue-600 transition-colors duration-200 flex items-center gap-1 font-medium">
                {t("legal.privacy")}
              </Link>
              <Link href="/terminos" className="hover:text-blue-600 transition-colors duration-200 flex items-center gap-1 font-medium">
                {t("legal.terms")}
              </Link>
              <Link href="/cookies" className="hover:text-blue-600 transition-colors duration-200 flex items-center gap-1 font-medium">
                {t("legal.cookies")}
              </Link>
            </div>

            <div className="flex items-center gap-2 text-gray-500 text-sm font-medium">
              <span className="text-lg">🇲🇽</span>
              <span>{t("madeInMexico")}</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}