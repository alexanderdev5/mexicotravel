"use client";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Marquee from "react-fast-marquee";

// Definir tipos TypeScript
interface LanguageOption {
  value: string;
  label: string;
  flag: string;
  nativeName: string;
}

interface Product {
  id: number;
  name: string;
  price: string;
  image: string;
  discount?: string;
}

type TranslateFunction = (key: string) => string;

interface LanguageDropdownProps {
  currentLang: LanguageOption;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (value: boolean) => void;
  handleLanguageChange: (lang: string) => void;
  selectedLanguage: string;
  variant?: 'top' | 'main';
}

interface DesktopCTAProps {
  t: TranslateFunction;
  variant?: 'top' | 'main';
}

interface TopHeaderProps {
  t: TranslateFunction;
  currentLang: LanguageOption;
  isDropdownOpen: boolean;
  setIsDropdownOpen: (value: boolean) => void;
  handleLanguageChange: (lang: string) => void;
  selectedLanguage: string;
}

// Datos de productos para el marquee
const featuredProducts: Product[] = [
  { id: 1, name: "Cancún Paradise", price: "$599", image: "🏖️", discount: "20% OFF" },
  { id: 2, name: "Tulum Ruins & Beach", price: "$459", image: "🏖️", discount: "15% OFF" },
  { id: 3, name: "Playa del Carmen", price: "$389", image: "🏖️", discount: "10% OFF" },
  { id: 4, name: "Isla Mujeres", price: "$529", image: "�️", discount: "25% OFF" },
  { id: 5, name: "Holbox Magic", price: "$489", image: "🏖️", discount: "30% OFF" },
  { id: 6, name: "Cozumel Diving", price: "$679", image: "🏖️", discount: "18% OFF" },
  { id: 7, name: "Bacalar Lagoon", price: "$1,099", image: "🗽", discount: "22% OFF" },
  { id: 8, name: "Chichen Itzá Tour", price: "$3,299", image: "🏖️", discount: "12% OFF" },
  { id: 9, name: "Puerto Morelos", price: "$349", image: "🏖️", discount: "12% OFF" },
];

// Componente del Selector de Idioma
function LanguageDropdown({
  currentLang,
  isDropdownOpen,
  setIsDropdownOpen,
  handleLanguageChange,
  selectedLanguage,
  variant = 'main'
}: LanguageDropdownProps) {
  const isTopVariant = variant === 'top';
  
  return (
    <div className={`relative language-dropdown ${isTopVariant ? 'hidden sm:block' : ''}`}>
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200 min-w-[80px] justify-center text-[12px] ${
          isTopVariant
            ? 'border-blue-200/60 bg-blue-50/90 hover:bg-blue-100/90 text-blue-900 shadow-sm'
            : 'border-gray-200/60 bg-white/80 hover:bg-gray-50/80 text-gray-700'
        }`}
        aria-label="Seleccionar idioma"
        aria-expanded={isDropdownOpen}
      >
        <span className="text-sm">{currentLang.flag}</span>
        <span className={`font-medium tracking-tight ${isTopVariant ? 'text-blue-800' : 'text-gray-700'}`}>
          {currentLang.label}
        </span>
        <ChevronIcon isOpen={isDropdownOpen} isTopVariant={isTopVariant} />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-1 w-44 bg-white/95 backdrop-blur-lg border border-blue-100 rounded-xl shadow-lg z-50 py-2">
          {[
            { value: "es", label: "ES", flag: "🇪🇸", nativeName: "Español" },
            { value: "en", label: "EN", flag: "🇺🇸", nativeName: "English" },
            { value: "fr", label: "FR", flag: "🇫🇷", nativeName: "Français" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleLanguageChange(option.value)}
              className={`flex items-center gap-3 w-full px-4 py-2.5 transition-all duration-200 hover:bg-blue-50/80 text-[13px] ${
                selectedLanguage === option.value
                  ? 'bg-blue-100/80 text-blue-700'
                  : 'text-gray-700'
              }`}
            >
              <span className="text-base">{option.flag}</span>
              <div className="flex flex-col items-start">
                <span className="font-medium tracking-tight">{option.label}</span>
                <span className="text-[11px] text-gray-500 mt-0.5">{option.nativeName}</span>
              </div>
              {selectedLanguage === option.value && (
                <CheckIcon />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function DesktopCTA({ t, variant = 'main' }: DesktopCTAProps) {
  const isTopVariant = variant === 'top';
  
  return (
    <div className="hidden sm:flex items-center">
      <Link
        href="/book"
        className={`px-4 py-1.5 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 border relative overflow-hidden group flex items-center justify-center text-[12px] tracking-tight min-w-[120px] ${
          isTopVariant
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white border-blue-400/30 hover:from-blue-600 hover:to-blue-700'
            : 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-2 border-white/20'
        }`}
      >
        <span className="relative z-10">{t("bookNow")}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
      </Link>
    </div>
  );
}

// Iconos auxiliares
function ChevronIcon({ isOpen, isTopVariant }: { isOpen: boolean; isTopVariant?: boolean }) {
  return (
    <svg 
      className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${
        isTopVariant ? 'text-blue-600' : 'text-gray-500'
      }`}
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="w-3.5 h-3.5 ml-auto text-blue-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

// Componente TopHeader principal
export default function TopHeader({ 
  t, 
  currentLang, 
  isDropdownOpen, 
  setIsDropdownOpen, 
  handleLanguageChange, 
  selectedLanguage 
}: TopHeaderProps) {
  return (
    <div className="py-2 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-900 border-b border-blue-200/50 relative z-60">
      <div className="max-w-8xl mx-auto px-1 sm:px-2 lg:px-10">
        <div className="flex items-center justify-between h-10">
          {/* Marquee de Ofertas - Lado Izquierdo */}
          <div className="flex-1 overflow-hidden">
            <Marquee 
              speed={35} 
              gradient={true} 
              gradientWidth={80}
              pauseOnHover={true}
              className="overflow-hidden"
            >
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 mx-4 px-3 py-1 bg-gradient-to-r from-blue-200/50 to-blue-300/50 rounded-lg border border-blue-200/60 hover:shadow-lg transition-all duration-200 min-w-[220px] group cursor-pointer"
                >
                  <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                    {product.image}
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-blue-900 whitespace-nowrap">
                      {product.name}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-blue-700">{product.price}</span>
                      {product.discount && (
                        <span className="text-[10px] font-medium bg-green-500 text-white px-1.5 py-0.5 rounded-full">
                          {product.discount}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              ))}
            </Marquee>
          </div>

          {/* Lenguaje y CTA - Lado Derecho */}
          <div className="flex items-center gap-3 pl-4">
            {/* Selector de Idioma */}
            <LanguageDropdown
              currentLang={currentLang}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
              handleLanguageChange={handleLanguageChange}
              selectedLanguage={selectedLanguage}
              variant="top"
            />

            {/* Botón CTA */}
            <DesktopCTA t={t} variant="top" />
          </div>
        </div>
      </div>
    </div>
  );
}