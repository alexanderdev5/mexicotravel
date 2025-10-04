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
  { id: 1, name: "Cancún Paradise", price: "$599", image: "🌴", discount: "20%" },
  { id: 2, name: "Tulum Ruins", price: "$459", image: "🏛️", discount: "15%" },
  { id: 3, name: "Playa del Carmen", price: "$389", image: "🏖️", discount: "10%" },
  { id: 4, name: "Isla Mujeres", price: "$529", image: "⛵", discount: "25%" },
  { id: 5, name: "Holbox Magic", price: "$489", image: "🐬", discount: "30%" },
  { id: 6, name: "Cozumel Diving", price: "$679", image: "🤿", discount: "18%" },
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
        className={`flex items-center gap-2 px-3 py-1.5 transition-all duration-300 min-w-[85px] justify-center text-sm backdrop-blur-sm border ${
          isTopVariant
            ? 'bg-white/95 hover:bg-white text-slate-800 shadow-sm hover:shadow-md border-slate-200/80 rounded-lg'
            : 'bg-white/95 hover:bg-white text-slate-800 rounded-lg'
        }`}
        aria-label="Seleccionar idioma"
        aria-expanded={isDropdownOpen}
      >
        <span className="text-[15px]">{currentLang.flag}</span>
        <span className={`font-medium tracking-tight text-[13px] ${isTopVariant ? 'text-slate-700' : 'text-slate-700'}`}>
          {currentLang.label}
        </span>
        <ChevronIcon isOpen={isDropdownOpen} />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white/98 backdrop-blur-xl border border-slate-200/80 shadow-xl z-50 py-2 rounded-xl">
          {[
            { value: "es", label: "ES", flag: "🇪🇸", nativeName: "Español" },
            { value: "en", label: "EN", flag: "🇺🇸", nativeName: "English" },
            { value: "fr", label: "FR", flag: "🇫🇷", nativeName: "Français" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => handleLanguageChange(option.value)}
              className={`flex items-center gap-3 w-full px-3 py-2 transition-all duration-200 hover:bg-slate-50/80 text-[13px] group rounded-lg mx-2 ${
                selectedLanguage === option.value
                  ? 'bg-blue-50/80 text-blue-600'
                  : 'text-slate-700'
              }`}
            >
              <span className="text-[16px] group-hover:scale-105 transition-transform duration-200">
                {option.flag}
              </span>
              <div className="flex flex-col items-start flex-1">
                <span className="font-medium tracking-tight">{option.label}</span>
                <span className="text-[11px] text-slate-500 mt-0.5">{option.nativeName}</span>
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
        className={`px-4 py-1.5 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 relative overflow-hidden group flex items-center justify-center text-[13px] tracking-tight min-w-[110px] rounded-lg ${
          isTopVariant
            ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white hover:from-blue-600 hover:to-cyan-600'
            : 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
        }`}
      >
        <span className="relative z-10 flex items-center gap-1.5">
          {t("bookNow")}
          <ArrowIcon />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-white/10 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-400"></div>
      </Link>
    </div>
  );
}

// Iconos auxiliares modernizados
function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg 
      className={`w-3.5 h-3.5 transition-all duration-300 ${isOpen ? 'rotate-180' : ''} text-slate-500`}
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
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

function ArrowIcon() {
  return (
    <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
    <div className="py-2.5 bg-gradient-to-r from-slate-50/95 to-slate-50/90 text-slate-800 border-b border-slate-200/50 relative z-60 backdrop-blur-sm">
      <div className="max-w-8xl mx-auto px-0 sm:px-6 lg:px-10">
        <div className="flex items-center justify-between h-11">
          {/* Marquee de Ofertas - Lado Izquierdo */}
          <div className="flex-1 overflow-hidden mr-0 sm:mr-6">
            <Marquee 
              speed={35} 
              gradient={true} 
              gradientWidth={40}
              gradientColor="rgb(248 250 252)"
              pauseOnHover={true}
              className="overflow-visible"
            >
              {featuredProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3 mx-1 sm:mx-2 px-2 sm:px-3 py-1.5 bg-white/90 hover:bg-white transition-all duration-300 min-w-[160px] sm:min-w-[180px] group cursor-pointer border border-slate-200/60 hover:border-blue-300/50 hover:shadow-sm rounded-lg"
                >
                  <div className="relative">
                    <span className="text-[16px] sm:text-[18px] group-hover:scale-110 transition-transform duration-300">
                      {product.image}
                    </span>
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <span className="text-[11px] sm:text-[12px] font-medium text-slate-800 whitespace-nowrap truncate group-hover:text-blue-600 transition-colors duration-300">
                      {product.name}
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] sm:text-[12px] font-bold text-slate-900">{product.price}</span>
                      {product.discount && (
                        <span className="text-[9px] sm:text-[10px] font-bold bg-gradient-to-r from-green-500 to-emerald-500 text-white px-1.5 py-0.5 rounded-md">
                          {product.discount}
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                    <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse mr-1"></div>
                    <svg className="w-3 h-3 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              ))}
            </Marquee>
          </div>

          {/* Lenguaje y CTA - Lado Derecho */}
          <div className="flex items-center gap-3 pr-2 sm:pr-0">
            {/* Selector de Idioma */}
            <LanguageDropdown
              currentLang={currentLang}
              isDropdownOpen={isDropdownOpen}
              setIsDropdownOpen={setIsDropdownOpen}
              handleLanguageChange={handleLanguageChange}
              selectedLanguage={selectedLanguage}
              variant="top"
            />

            {/* Separador visual sutil */}
            <div className="h-5 w-px bg-slate-300/50 hidden sm:block"></div>

            {/* Botón CTA */}
            <DesktopCTA t={t} variant="top" />
          </div>
        </div>
      </div>
    </div>
  );
}