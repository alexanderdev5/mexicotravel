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
  minHeight = "min-h-[60vh] sm:min-h-[70vh] md:min-h-[80vh]",
  overlayOpacity = 90
}) => {
  // Clases de alineación de texto
  const alignmentClasses = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end"
  };

  return (
    <section className={`relative ${minHeight} flex items-center justify-center bg-gray-900 overflow-hidden py-8 sm:py-12 md:py-16`}>
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          className="object-cover opacity-90"
          priority
          quality={100}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
        />
        <div 
          className={`absolute inset-0 bg-gradient-to-t ${gradientFrom} ${gradientVia} ${gradientTo} opacity-${overlayOpacity}`}
        ></div>
      </div>

      <div className={`container mx-auto px-4 sm:px-6 z-10 flex flex-col ${alignmentClasses[textAlignment]} mt-6 sm:mt-8 md:mt-0 w-full`}>
        {/* Badge */}
        {badgeText && (
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 border border-white/30 max-w-full mx-auto sm:mx-0">
            <span className="text-white text-xs sm:text-sm font-semibold whitespace-nowrap truncate">
              {badgeText}
            </span>
          </div>
        )}

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight max-w-4xl mx-auto w-full break-words px-2">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-4 sm:mb-6 max-w-2xl mx-auto w-full leading-relaxed px-4 sm:px-0 break-words">
          {subtitle}
        </p>

        {/* Trust items */}
        {trustItems && trustItems.length > 0 && (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 text-white/80 text-xs sm:text-sm max-w-4xl mx-auto w-full px-2 sm:px-0">
            {trustItems.map((item, idx) => (
              <div 
                key={idx} 
                className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-3 sm:py-1 border border-white/20 flex-shrink-0"
              >
                {item.icon === "check" && <FiCheckCircle className="text-green-400 mr-1.5 sm:mr-2 flex-shrink-0" size={14} />}
                {item.icon === "star" && <FiStar className="text-amber-400 mr-1.5 sm:mr-2 flex-shrink-0" size={14} />}
                {item.icon === "heart" && <FiHeart className="text-red-400 mr-1.5 sm:mr-2 flex-shrink-0" size={14} />}
                <span className="whitespace-nowrap truncate max-w-[120px] sm:max-w-none">{item.text}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Scroll indicator */}
      {showScrollIndicator && (
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-1.5 sm:mt-2"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSectionReu;