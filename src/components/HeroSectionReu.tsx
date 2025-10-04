import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMap, FiChevronRight, FiCheckCircle, FiStar, FiHeart, FiArrowDown } from "react-icons/fi";

interface HeroSectionReuProps {
  // Contenido principal
  title: string;
  subtitle: string;

  // Imagen de fondo
  imageUrl: string;
  imageAlt: string;
  
  // Badge
  badgeText: string;
  
  // Elementos de confianza
  trustItems: { 
    icon: "check" | "star" | "heart"; 
    text: string; 
  }[];
  
  // Opciones de personalización
  gradientFrom?: string;
  gradientVia?: string;
  gradientTo?: string;
  gradientOpacity?: number;
  showScrollIndicator?: boolean;
  textAlignment?: "left" | "center" | "right";
  minHeight?: string;
  overlayOpacity?: number;
}

const HeroSectionReu: React.FC<HeroSectionReuProps> = ({
  title,
  subtitle,
  imageUrl,
  imageAlt,
  badgeText,
  trustItems,
  gradientFrom = "from-blue-900/80",
  gradientVia = "via-transparent",
  gradientTo = "to-amber-500/30",
  gradientOpacity = 80,
  showScrollIndicator = true,
  textAlignment = "center",
  minHeight = "min-h-[70vh] md:min-h-[80vh]",
  overlayOpacity = 90
}) => {
  // Clases de alineación de texto
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end"
  };

  return (
    <section className={`relative ${minHeight} flex items-center justify-center bg-gray-900 overflow-hidden py-12 md:py-16`}>
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover opacity-90"
          priority
          quality={100}
        />
        <div 
          className={`absolute inset-0 bg-gradient-to-t ${gradientFrom} ${gradientVia} ${gradientTo} opacity-${gradientOpacity}`}
        ></div>
      </div>

      <div className={`container mx-auto px-4 z-10 flex flex-col ${alignmentClasses[textAlignment]} mt-8 md:mt-0`}>
        {/* Badge */}
        {badgeText && (
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/30">
            <span className="text-white text-sm font-semibold">{badgeText}</span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight max-w-4xl">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg lg:text-xl text-white/90 mb-6 max-w-2xl leading-relaxed">
          {subtitle}
        </p>

        {/* Trust items */}
        {trustItems && trustItems.length > 0 && (
          <div className="flex flex-wrap gap-3 md:gap-4 text-white/80 text-xs md:text-sm">
            {trustItems.map((item, idx) => (
              <div key={idx} className="flex items-center">
                {item.icon === "check" && <FiCheckCircle className="text-green-400 mr-2" />}
                {item.icon === "star" && <FiStar className="text-amber-400 mr-2" />}
                {item.icon === "heart" && <FiHeart className="text-red-400 mr-2" />}
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSectionReu;