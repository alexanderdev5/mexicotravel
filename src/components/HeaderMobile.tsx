"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

// Definir tipos TypeScript
interface NavLink {
  href: string;
  translationKey: string;
  icon?: string;
}

interface LanguageOption {
  value: string;
  label: string;
  flag: string;
  nativeName: string;
}

type TranslateFunction = (key: string) => string;

interface MobileHamburgerProps {
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
}

interface MobileMenuProps {
  menuOpen: boolean;
  pathname: string;
  t: TranslateFunction;
  selectedLanguage: string;
  handleLanguageChange: (lang: string) => void;
  setMenuOpen: (value: boolean) => void;
}

interface LogoLinkProps {
  onCloseMenu: () => void;
  t: TranslateFunction;
  isScrolled: boolean;
}

interface DesktopNavProps {
  pathname: string;
  t: TranslateFunction;
  selectedLanguage: string;
  handleLanguageChange: (lang: string) => void;
}

const navLinks: NavLink[] = [
  { href: "/", translationKey: "nav.home", icon: "🏠" },
  { href: "/destinos", translationKey: "nav.destinations", icon: "✈️" },
  { href: "/experiencias", translationKey: "nav.experiences", icon: "🌟" },
  { href: "/ofertas", translationKey: "nav.offers", icon: "🔥" },
  { href: "/contacto", translationKey: "nav.contact", icon: "📞" },
];

const languageOptions: LanguageOption[] = [
  { value: "es", label: "ES", flag: "🇪🇸", nativeName: "Español" },
  { value: "en", label: "EN", flag: "🇺🇸", nativeName: "English" },
  { value: "fr", label: "FR", flag: "🇫🇷", nativeName: "Français" },
];

// Componente Logo Link
function LogoLink({ onCloseMenu, t, isScrolled }: LogoLinkProps) {
  return (
    <Link 
      href="/" 
      className="flex items-center gap-3 group flex-shrink-0"
      onClick={onCloseMenu}
      aria-label={t("home")}
    >
      <div className="relative">
        <div className={`bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg transform group-hover:scale-105 transition-all duration-300 ${
          isScrolled ? 'w-8 h-8 text-sm' : 'w-10 h-10 text-lg'
        }`}>
          ✈️
        </div>
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
      </div>
      <div className={`flex flex-col transition-all duration-300 ${
        isScrolled ? 'scale-90' : 'scale-100'
      }`}>
        <span className="font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent leading-tight whitespace-nowrap text-lg tracking-tight">
          {t("brand")}
        </span>
        <span className="text-gray-500 font-medium leading-tight whitespace-nowrap text-xs tracking-wide">
          {t("tagline")}
        </span>
      </div>
    </Link>
  );
}

// Componente Desktop Navigation
function DesktopNav({ pathname, t, selectedLanguage, handleLanguageChange }: DesktopNavProps) {
  return (
    <div className="hidden lg:flex items-center gap-6">
      {/* Menú de Navegación Centrado */}
      <nav className="flex items-center gap-1" aria-label="Main navigation">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`relative px-4 py-2.5 rounded-xl font-medium transition-all duration-200 text-sm group/nav-link flex items-center gap-2 ${
              pathname === link.href 
                ? 'text-orange-600 bg-orange-50/80 font-semibold shadow-sm' 
                : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50/50'
            }`}
            aria-current={pathname === link.href ? 'page' : undefined}
          >
            <span className="text-base opacity-70">{link.icon}</span>
            {t(link.translationKey)}
            {pathname === link.href && (
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-orange-500 rounded-full"></div>
            )}
          </Link>
        ))}
      </nav>

      <div className="w-px h-6 bg-gradient-to-b from-transparent via-gray-200 to-transparent mx-2"></div>

      {/* Selector de Idioma */}
      <div className="relative group" role="combobox" aria-haspopup="listbox">
        <button 
          className="flex items-center gap-2 px-3 py-2 rounded-xl border border-gray-200/80 hover:border-orange-300 hover:bg-orange-50/50 transition-all duration-200 text-sm text-gray-700 min-w-[85px] backdrop-blur-sm"
          aria-label="Seleccionar idioma"
        >
          <span className="text-base">
            {languageOptions.find(lang => lang.value === selectedLanguage)?.flag}
          </span>
          <span className="font-medium text-xs">
            {languageOptions.find(lang => lang.value === selectedLanguage)?.label}
          </span>
          <svg className="w-3 h-3 text-gray-400 transition-transform duration-200 group-hover:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        <div className="absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100/80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform origin-top-right scale-95 group-hover:scale-100">
          <div className="p-2 space-y-1">
            {languageOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleLanguageChange(option.value)}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl transition-all duration-200 text-sm backdrop-blur-sm ${
                  selectedLanguage === option.value
                    ? 'bg-orange-50 text-orange-600 font-semibold shadow-sm'
                    : 'text-gray-700 hover:bg-gray-50/80'
                }`}
                role="option"
                aria-selected={selectedLanguage === option.value}
              >
                <span className="text-lg flex-shrink-0">{option.flag}</span>
                <div className="flex flex-col items-start flex-1 min-w-0">
                  <span className="font-medium text-sm">{option.nativeName}</span>
                  <span className="text-gray-400 text-xs">{option.label}</span>
                </div>
                {selectedLanguage === option.value && (
                  <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="w-px h-6 bg-gradient-to-b from-transparent via-gray-200 to-transparent mx-2"></div>

      {/* Botones de Acción - COMPACTOS Y MEJOR ESPACIADOS */}
      <div className="flex items-center gap-2">
        <Link
          href="/login"
          className="px-4 py-2.5 rounded-xl font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100/80 transition-all duration-200 text-sm whitespace-nowrap border border-transparent hover:border-gray-200 mx-0.5"
        >
          {t("login")}
        </Link>
        <Link
          href="/register"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 text-sm whitespace-nowrap mx-0.5 relative overflow-hidden group"
        >
          <span className="relative z-10">{t("register")}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </Link>
        <Link
          href="/book"
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 text-sm whitespace-nowrap border-2 border-white/20 mx-0.5 relative overflow-hidden group"
        >
          <span className="relative z-10 flex items-center gap-1.5">
            <span>🎯</span>
            {t("bookNow")}
          </span>
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
        </Link>
      </div>
    </div>
  );
}

// Componente Mobile Hamburger
export function MobileHamburger({ menuOpen, setMenuOpen }: MobileHamburgerProps) {
  return (
    <button
      className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100/80 transition-all duration-200 group backdrop-blur-sm"
      aria-label="Abrir menú"
      aria-expanded={menuOpen}
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <HamburgerIcon menuOpen={menuOpen} />
    </button>
  );
}

// Componente Mobile Menu
export function MobileMenu({ 
  menuOpen, 
  pathname, 
  t, 
  selectedLanguage, 
  handleLanguageChange, 
  setMenuOpen 
}: MobileMenuProps) {
  return (
    <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-white/95 backdrop-blur-lg border-t border-gray-100/80 ${
      menuOpen ? 'max-h-[90vh] opacity-100 pb-4' : 'max-h-0 opacity-0'
    }`}>
      <div className="flex flex-col gap-1 pt-3 max-h-[90vh] overflow-y-auto">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-3.5 rounded-xl font-medium transition-all duration-200 border border-transparent flex items-center gap-3 text-sm mx-3 ${
              pathname === link.href 
                ? 'text-orange-600 bg-orange-50/80 shadow-sm' 
                : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/60 hover:border-orange-100'
            }`}
            aria-current={pathname === link.href ? 'page' : undefined}
            onClick={() => setMenuOpen(false)}
          >
            <span className="text-base opacity-70">{link.icon}</span>
            {t(link.translationKey)}
          </Link>
        ))}
        
        {/* Selector de Idioma Mobile */}
        <div className="px-4 py-3 mx-3">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-gray-500 mb-1">{t("language")}</span>
            <div className="grid grid-cols-3 gap-2">
              {languageOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleLanguageChange(option.value)}
                  className={`flex flex-col items-center gap-1 px-2 py-2.5 rounded-lg border transition-all duration-200 text-xs backdrop-blur-sm ${
                    selectedLanguage === option.value
                      ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                      : 'bg-white/80 text-gray-700 border-gray-300/80 hover:border-orange-300'
                  }`}
                >
                  <span className="text-base">{option.flag}</span>
                  <span className="text-[10px] opacity-80 mt-0.5">{option.nativeName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 pt-3 mt-1 border-t border-gray-100/80 mx-3">
          <Link
            href="/login"
            className="px-4 py-3.5 rounded-xl font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100/80 transition-all duration-200 text-center flex items-center justify-center text-sm border border-transparent hover:border-gray-200 mx-1"
            onClick={() => setMenuOpen(false)}
          >
            {t("login")}
          </Link>
          <Link
            href="/register"
            className="px-4 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium text-center shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-sm mx-1 relative overflow-hidden group"
            onClick={() => setMenuOpen(false)}
          >
            <span className="relative z-10">{t("register")}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-600 to-orange-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </Link>
          <Link
            href="/book"
            className="px-4 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-center shadow-lg hover:shadow-xl transition-all duration-200 mt-1 border-2 border-white/20 flex items-center justify-center text-sm mx-1 relative overflow-hidden group"
            onClick={() => setMenuOpen(false)}
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <span>🎯</span>
              {t("bookNow")}
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
          </Link>
        </div>
      </div>
    </div>
  );
}

// Icono Hamburger mejorado
function HamburgerIcon({ menuOpen }: { menuOpen: boolean }) {
  return (
    <div className="relative w-5 h-5">
      <span className={`absolute top-1/2 left-0 w-5 h-0.5 bg-gray-700 transform transition-all duration-300 ${
        menuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
      }`}></span>
      <span className={`absolute top-1/2 left-0 w-5 h-0.5 bg-gray-700 transform transition-all duration-300 ${
        menuOpen ? 'opacity-0 scale-0' : 'opacity-100 scale-100'
      }`}></span>
      <span className={`absolute top-1/2 left-0 w-5 h-0.5 bg-gray-700 transform transition-all duration-300 ${
        menuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
      }`}></span>
    </div>
  );
}

// Skeleton para mobile mejorado
export function MobileSkeleton() {
  return (
    <nav className="bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm sticky top-0 z-50 h-16">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl animate-pulse"></div>
            <div className="flex flex-col gap-1.5">
              <div className="h-3.5 w-28 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
              <div className="h-2.5 w-20 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-xl animate-pulse lg:hidden"></div>
          <div className="hidden lg:flex items-center gap-4">
            <div className="h-8 w-48 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-8 w-24 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-8 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Componente principal de navegación
export default function Navigation({ 
  t, 
  selectedLanguage, 
  handleLanguageChange,
  isScrolled 
}: { 
  t: TranslateFunction; 
  selectedLanguage: string; 
  handleLanguageChange: (lang: string) => void;
  isScrolled: boolean;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <nav className={`bg-white/95 backdrop-blur-lg border-b border-gray-100/80 sticky top-0 z-50 transition-all duration-500 ${
      isScrolled ? 'shadow-lg h-16' : 'shadow-sm h-20'
    }`}>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          {/* Logo */}
          <LogoLink 
            onCloseMenu={() => setMenuOpen(false)} 
            t={t} 
            isScrolled={isScrolled}
          />

          {/* Desktop Navigation */}
          <DesktopNav 
            pathname={pathname}
            t={t}
            selectedLanguage={selectedLanguage}
            handleLanguageChange={handleLanguageChange}
          />

          {/* Mobile Hamburger */}
          <MobileHamburger menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        </div>

        {/* Mobile Menu */}
        <MobileMenu
          menuOpen={menuOpen}
          pathname={pathname}
          t={t}
          selectedLanguage={selectedLanguage}
          handleLanguageChange={handleLanguageChange}
          setMenuOpen={setMenuOpen}
        />
      </div>
    </nav>
  );
}