import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiMap, FiChevronRight, FiCheckCircle, FiStar, FiHeart } from "react-icons/fi";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  primaryButtonText: string;
  secondaryButtonText: string;
  imageUrl: string;
  imageAlt: string;
  badgeText: string;
  trustItems: { icon: "check" | "star" | "heart"; text: string }[];
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  primaryButtonText,
  secondaryButtonText,
  imageUrl,
  imageAlt,
  badgeText,
  trustItems
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden py-16 sm:py-20 md:py-0">
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
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-amber-500/30 opacity-80"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 z-10 text-center mt-6 sm:mt-8 md:mt-0 w-full">
        {/* Badge */}
        <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-4 sm:py-2 mb-4 sm:mb-6 border border-white/30 max-w-full mx-auto">
          <span className="text-white text-xs sm:text-sm font-semibold whitespace-nowrap truncate">
            {badgeText}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight break-words px-2">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed break-words px-4 sm:px-6">
          {subtitle}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4 sm:px-6 w-full max-w-2xl mx-auto">
          <Link
            href="/experiencias"
            className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg font-bold shadow-2xl hover:shadow-amber-500/25 hover:scale-105 transition-all duration-300 flex items-center justify-center group w-full sm:w-auto min-h-[44px]"
          >
            <FiMap className="mr-2 sm:mr-3 flex-shrink-0" size={18} />
            <span className="truncate">{primaryButtonText}</span>
          </Link>
          <Link
            href="/rutas-personalizadas"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/40 px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-4 rounded-xl sm:rounded-2xl text-sm sm:text-base md:text-lg font-bold shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 flex items-center justify-center group w-full sm:w-auto min-h-[44px]"
          >
            <span className="truncate">{secondaryButtonText}</span>
            <FiChevronRight className="ml-2 sm:ml-2 group-hover:translate-x-1 transition-transform flex-shrink-0" size={18} />
          </Link>
        </div>

        {/* Trust items */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 text-white/80 text-xs sm:text-sm px-4 max-w-4xl mx-auto">
          {trustItems.map((item, idx) => (
            <div 
              key={idx} 
              className="flex items-center bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 sm:px-3 sm:py-1 border border-white/20 flex-shrink-0"
            >
              {item.icon === "check" && <FiCheckCircle className="text-green-400 mr-1.5 sm:mr-2 flex-shrink-0" size={14} />}
              {item.icon === "star" && <FiStar className="text-amber-400 mr-1.5 sm:mr-2 flex-shrink-0" size={14} />}
              {item.icon === "heart" && <FiHeart className="text-red-400 mr-1.5 sm:mr-2 flex-shrink-0" size={14} />}
              <span className="whitespace-nowrap text-xs sm:text-sm">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
        <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-2 sm:h-3 bg-white rounded-full mt-1.5 sm:mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;