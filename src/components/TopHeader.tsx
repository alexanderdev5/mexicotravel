'use client';

// components/TopHeader.tsx
import React, { useState } from 'react';
import Marquee from 'react-fast-marquee';

interface Message {
  icon: string;
  text: string;
}

interface Language {
  code: string;
  name: string;
  flag: string;
}

const TopHeader: React.FC = () => {
  const messages: Message[] = [
    { icon: "🚚", text: "¡Envíos gratis en compras superiores a S/. 150!" },
    { icon: "💳", text: "Pagos rápidos y seguros con YAPE, PLIN y BIPAY" },
    { icon: "🔒", text: "Procesamos tu pedido al confirmar el pago con un screenshot" },
    { icon: "📱", text: "Realiza tus pedidos fácilmente en línea o vía WhatsApp" },
    { icon: "🕙", text: "Atendemos de lunes a sábado, de 10:00 AM a 8:00 PM" },
    { icon: "🤝", text: "Confía en nosotros, somos 100% confiables" },
  ];

  const languages: Language[] = [
    { code: 'ES', name: 'Español', flag: '🇪🇸' },
    { code: 'EN', name: 'English', flag: '🇺🇸' },
    { code: 'FR', name: 'Français', flag: '🇫🇷' }
  ];

  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleReserveNow = () => {
    console.log('Reserva iniciada');
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-black text-white border-b border-gray-800/50">
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center justify-between h-8 px-4 gap-4">
          {/* Columna izquierda - Marquee */}
          <div className="flex-1 min-w-0">
            <Marquee
              direction="left"
              speed={45}
              pauseOnHover
              pauseOnClick
              gradient={false}
              className="flex items-center gap-6 text-xs font-medium tracking-tight"
            >
              {messages.map(({ icon, text }, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                >
                  <span className="text-sm group-hover:scale-110 transition-transform duration-300">
                    {icon}
                  </span>
                  <span className="text-[11px] whitespace-nowrap text-gray-100 group-hover:text-white transition-colors">
                    {text}
                  </span>
                </div>
              ))}
            </Marquee>
          </div>

          {/* Columna derecha - Language Selector y Botón */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center gap-1 px-2 py-1 bg-white/5 rounded border border-white/10 hover:bg-white/10 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <span className="text-xs">{selectedLanguage.flag}</span>
                <span className="text-xs font-medium text-gray-200">{selectedLanguage.code}</span>
                <svg 
                  className={`w-3 h-3 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isDropdownOpen && (
                <div className="absolute right-0 top-full mt-1 w-36 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-50">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setSelectedLanguage(language);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-white/10 transition-colors duration-150 ${
                        selectedLanguage.code === language.code ? 'bg-green-600/20 text-green-400' : 'text-gray-200'
                      }`}
                    >
                      <span className="text-sm">{language.flag}</span>
                      <span className="text-xs font-medium">{language.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Botón Reservar Ahora */}
            <button
              onClick={handleReserveNow}
              className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white text-xs font-semibold rounded shadow hover:shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-1 focus:ring-green-500 whitespace-nowrap"
            >
              Reservar Ahora
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;