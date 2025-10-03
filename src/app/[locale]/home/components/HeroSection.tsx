
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiMap, FiChevronRight, FiCheckCircle, FiStar, FiHeart } from 'react-icons/fi';

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  imageUrl?: string;
  imageAlt?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title = "Vive <span className='text-amber-400'>México</span><br />Como Nunca Antes",
  subtitle = "Descubre la magia detrás de cada rincón. Desde playas de ensueño hasta ciudades llenas de historia, te llevamos a experiencias que transforman viajeros en <span className='text-amber-300 font-semibold'>amantes de México</span>",
  primaryButtonText = "Descubrir Experiencias",
  secondaryButtonText = "Crear Mi Ruta",
  imageUrl = "https://images.unsplash.com/photo-1668810074709-30f08bd3b12f?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  imageAlt = "Vista panorámica de las pirámides de Teotihuacán al amanecer"
}) => {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gray-900 overflow-hidden">
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
      
      <div className="container mx-auto px-4 z-10 text-center">
        {/* Badge de autenticidad */}
        <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/30">
          <span className="text-white text-sm font-semibold">✨ Experiencias 100% Auténticas</span>
        </div>
        
        <h1 
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        
        <p 
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <Link 
            href="/experiencias" 
            className="bg-amber-500 hover:bg-amber-600 text-white px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-amber-500/25 hover:scale-105 transition-all duration-300 flex items-center justify-center group"
          >
            <FiMap className="mr-3" />
            {primaryButtonText}
          </Link>
          <Link 
            href="/rutas-personalizadas" 
            className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border border-white/40 px-10 py-5 rounded-2xl text-lg font-bold shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all duration-300 flex items-center justify-center group"
          >
            {secondaryButtonText} <FiChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
        
        {/* Elementos de confianza */}
        <div className="flex flex-wrap justify-center gap-6 text-white/80 text-sm">
          <div className="flex items-center">
            <FiCheckCircle className="text-green-400 mr-2" />
            <span>Guías locales certificados</span>
          </div>
          <div className="flex items-center">
            <FiStar className="text-amber-400 mr-2" />
            <span>+10,000 viajeros satisfechos</span>
          </div>
          <div className="flex items-center">
            <FiHeart className="text-red-400 mr-2" />
            <span>Turismo sostenible</span>
          </div>
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