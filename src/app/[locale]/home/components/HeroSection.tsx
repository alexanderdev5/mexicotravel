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
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden py-20 md:py-0">
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
        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-transparent to-amber-500/30 opacity-80"></div>
      </div>

      <div className="container mx-auto px-4 z-10 text-center mt-8 md:mt-0">
        {/* Badge */}
        <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/30">
          <span className="text-white text-sm font-semibold">{badgeText}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          {title}
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed px-4">
          {subtitle}
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8 px-4">
          <Link
            href="/experiencias"
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-4 md:px-10 md:py-5 rounded-2xl text-base md:text-lg font-bold shadow-2xl hover:shadow-amber-500/25 hover:scale-105 transition-all duration-300 flex items-center justify-center group"
          >
            <FiMap className="mr-3" />
            {primaryButtonText}
          </Link>
          <Link
            href="/rutas-personalizadas"
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/40 px-6 py-4 md:px-10 md:py-5 rounded-2xl text-base md:text-lg font-bold shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 flex items-center justify-center group"
          >
            {secondaryButtonText}
            <FiChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Trust items */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-6 text-white/80 text-xs md:text-sm px-4">
          {trustItems.map((item, idx) => (
            <div key={idx} className="flex items-center">
              {item.icon === "check" && <FiCheckCircle className="text-green-400 mr-2" />}
              {item.icon === "star" && <FiStar className="text-amber-400 mr-2" />}
              {item.icon === "heart" && <FiHeart className="text-red-400 mr-2" />}
              <span>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;