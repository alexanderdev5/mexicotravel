"use client";
import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

// Definir tipos TypeScript
interface NavLink {
  href: string;
  translationKey: string;
}

interface LanguageOption {
  value: string;
  label: string;
  flag: string;
  nativeName: string;
}

interface NavbarProps {}

// Constantes para mejor mantenibilidad
const CONSTANTS = {
  BREAKPOINTS: {
    LG: 1024
  },
  ANIMATION: {
    DURATION: 200
  }
} as const;

const navLinks: NavLink[] = [
  { href: "/", translationKey: "nav.home" },
  { href: "/destinos", translationKey: "nav.destinations" },
  { href: "/experiencias", translationKey: "nav.experiences" },
  { href: "/ofertas", translationKey: "nav.offers" },
  { href: "/contacto", translationKey: "nav.contact" },
];

const languageOptions: LanguageOption[] = [
  { value: "es", label: "ES", flag: "🇪🇸", nativeName: "Español" },
  { value: "en", label: "EN", flag: "🇺🇸", nativeName: "English" },
  { value: "fr", label: "FR", flag: "🇫🇷", nativeName: "Français" },
];

export default function Header(_props: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [isClient, setIsClient] = useState<boolean>(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  const t = useTranslations("header");
  const pathname = usePathname();
  const router = useRouter();

  // Detectar si estamos en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Efecto para detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determinar el idioma actual basado en la ruta
  const currentLanguage = useMemo(() => 
    pathname.startsWith("/es") ? "es" : 
    pathname.startsWith("/fr") ? "fr" : "en", 
  [pathname]);

  const [selectedLanguage, setSelectedLanguage] = useState<string>(currentLanguage);

  // Sincronizar el estado con la ruta actual
  useEffect(() => {
    setSelectedLanguage(currentLanguage);
  }, [currentLanguage]);

  // Obtener el idioma seleccionado actualmente
  const currentLang = useMemo(() => 
    languageOptions.find(lang => lang.value === selectedLanguage) || languageOptions[0],
  [selectedLanguage]);

  // Cambiar idioma - optimizado con useCallback
  const handleLanguageChange = useCallback((lang: string): void => {
    setSelectedLanguage(lang);
    setIsDropdownOpen(false);
    
    const currentPath = pathname;
    let newPath: string;

    // Construir nueva ruta manteniendo la estructura
    if (currentPath.startsWith("/es") || currentPath.startsWith("/en") || currentPath.startsWith("/fr")) {
      // Reemplazar el locale existente
      newPath = currentPath.replace(/^\/(es|en|fr)/, `/${lang}`);
    } else {
      // Agregar el locale al principio
      newPath = `/${lang}${currentPath}`;
    }

    // Asegurar que la ruta base sea correcta
    if (newPath === `/${lang}`) {
      newPath = `/${lang}`;
    }

    router.replace(newPath);
  }, [pathname, router]);

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-dropdown')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cerrar menú móvil al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Renderizado durante SSR para evitar hydration mismatches
  if (!isClient) {
    return <NavbarSkeleton />;
  }

  return (
    <nav className={`bg-white/95 backdrop-blur-lg border-b transition-all duration-300 sticky top-0 z-50 ${
      isScrolled 
        ? 'border-gray-200/80 shadow-sm h-16' 
        : 'border-gray-100/50 shadow-xs h-20'
    }`} 
         role="navigation" 
         aria-label="Main navigation">
      <div className="max-w-8xl mx-auto px-1 sm:px-2 lg:px-10 bg-white">
        <div className={`flex justify-between items-center transition-all duration-300 ${
          isScrolled ? 'h-16' : 'h-20'
        }`}>
          
          {/* Logo */}
          <LogoLink onCloseMenu={() => setMenuOpen(false)} t={t} isScrolled={isScrolled} />
          
          {/* Navegación Desktop */}
          <DesktopNavigation 
            pathname={pathname}
            t={t}
            currentLang={currentLang}
            isDropdownOpen={isDropdownOpen}
            setIsDropdownOpen={setIsDropdownOpen}
            handleLanguageChange={handleLanguageChange}
            selectedLanguage={selectedLanguage}
          />

          {/* Botón CTA Desktop */}
          <DesktopCTA t={t} />

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

// Componentes auxiliares para mejor organización
function NavbarSkeleton() {
  return (
    <nav className="bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm sticky top-0 z-50 h-20">
      <div className="max-w-8xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
            <div className="flex flex-col gap-1">
              <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-3 w-24 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

function LogoLink({ onCloseMenu, t, isScrolled }: { onCloseMenu: () => void; t: any; isScrolled: boolean }) {
  return (
    <Link 
      href="/" 
      className="flex items-center gap-3 group"
      onClick={onCloseMenu}
      aria-label={t("home")}
    >
      <div className="relative">
        <div className={`bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg transform group-hover:scale-105 transition-all duration-300 ${
          isScrolled ? 'w-8 h-8 text-base' : 'w-10 h-10 text-lg'
        }`}>
          M
        </div>
        <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
      </div>
      <div className={`flex flex-col transition-all duration-300 ${
        isScrolled ? 'scale-95' : 'scale-100'
      }`}>
        <span className="font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent leading-tight whitespace-nowrap">
          {t("brand")}
        </span>
        <span className="text-gray-500 font-medium leading-tight whitespace-nowrap">
          {t("tagline")}
        </span>
      </div>
    </Link>
  );
}

function DesktopNavigation({ 
  pathname, 
  t, 
  currentLang, 
  isDropdownOpen, 
  setIsDropdownOpen, 
  handleLanguageChange, 
  selectedLanguage 
}: any) {
  return (
    <div className="hidden lg:flex items-center gap-1">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 relative group flex items-center justify-center text-[13px] tracking-tight
            ${pathname === link.href 
              ? 'text-orange-600 bg-orange-50/80' 
              : 'text-gray-600 hover:text-orange-600 hover:bg-orange-50/60'}`}
          aria-current={pathname === link.href ? 'page' : undefined}
        >
          {t(link.translationKey)}
          <span className="absolute bottom-1 left-1/2 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%]"></span>
        </Link>
      ))}
      
      {/* Selector de Idioma Desktop */}
      <LanguageDropdownDesktop
        currentLang={currentLang}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        handleLanguageChange={handleLanguageChange}
        selectedLanguage={selectedLanguage}
      />

      {/* Botones de autenticación */}
      <div className="flex items-center gap-2 ml-3 pl-3 border-l border-gray-200/60">
        <Link
          href="/login"
          className="px-4 py-2.5 rounded-xl font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100/80 transition-all duration-200 flex items-center justify-center text-[13px] tracking-tight min-w-[100px]"
        >
          {t("login")}
        </Link>
        <Link
          href="/register"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium shadow-lg hover:shadow-xl hover:from-amber-600 hover:to-orange-700 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center text-[13px] tracking-tight min-w-[110px]"
        >
          {t("register")}
        </Link>
      </div>
    </div>
  );
}

function LanguageDropdownDesktop({
  currentLang,
  isDropdownOpen,
  setIsDropdownOpen,
  handleLanguageChange,
  selectedLanguage
}: any) {
  return (
    <div className="relative language-dropdown ml-2">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 px-3 py-2.5 rounded-xl border border-gray-200/60 bg-white/80 hover:bg-gray-50/80 transition-all duration-200 min-w-[80px] justify-center text-[13px]"
        aria-label="Seleccionar idioma"
        aria-expanded={isDropdownOpen}
      >
        <span className="text-sm">{currentLang.flag}</span>
        <span className="font-medium text-gray-700 tracking-tight">{currentLang.label}</span>
        <ChevronIcon isOpen={isDropdownOpen} />
      </button>

      {isDropdownOpen && (
        <div className="absolute top-full right-0 mt-1 w-44 bg-white/95 backdrop-blur-lg border border-gray-200/80 rounded-xl shadow-lg z-50 py-2">
          {languageOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleLanguageChange(option.value)}
              className={`flex items-center gap-3 w-full px-4 py-2.5 transition-all duration-200 hover:bg-gray-50/80 text-[13px] ${
                selectedLanguage === option.value
                  ? 'bg-orange-50/80 text-orange-600'
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

function DesktopCTA({ t }: { t: any }) {
  return (
    <div className="hidden lg:flex items-center">
      <Link
        href="/book"
        className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold shadow-lg hover:shadow-xl hover:from-emerald-600 hover:to-teal-700 transform hover:-translate-y-0.5 transition-all duration-200 border-2 border-white/20 relative overflow-hidden group flex items-center justify-center text-[13px] tracking-tight min-w-[130px]"
      >
        <span className="relative z-10">{t("bookNow")}</span>
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 transform translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
      </Link>
    </div>
  );
}

function MobileHamburger({ menuOpen, setMenuOpen }: { menuOpen: boolean; setMenuOpen: (value: boolean) => void }) {
  return (
    <button
      className="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl hover:bg-gray-100/80 transition-all duration-200 group"
      aria-label="Abrir menú"
      aria-expanded={menuOpen}
      onClick={() => setMenuOpen(!menuOpen)}
    >
      <HamburgerIcon menuOpen={menuOpen} />
    </button>
  );
}

function MobileMenu({ 
  menuOpen, 
  pathname, 
  t, 
  selectedLanguage, 
  handleLanguageChange, 
  setMenuOpen 
}: any) {
  return (
    <div className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out  ${
      menuOpen ? 'max-h-[90vh]  opacity-100 pb-4' : 'max-h-0 opacity-0'
    }`}>
      <div className="flex flex-col gap-1 pt-3 max-h-[90vh] overflow-y-auto">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 border border-transparent flex items-center text-[14px] ${
              pathname === link.href 
                ? 'text-orange-600 bg-orange-50/80' 
                : 'text-gray-700 hover:text-orange-600 hover:bg-orange-50/60 hover:border-orange-100'
            }`}
            aria-current={pathname === link.href ? 'page' : undefined}
            onClick={() => setMenuOpen(false)}
          >
            {t(link.translationKey)}
          </Link>
        ))}
        
        {/* Selector de Idioma Mobile */}
        <div className="px-4 py-3">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-medium text-gray-500 mb-1">{t("language")}</span>
            <div className="grid grid-cols-3 gap-2">
              {languageOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleLanguageChange(option.value)}
                  className={`flex flex-col items-center gap-1 px-2 py-2.5 rounded-lg border transition-all duration-200 text-[12px] ${
                    selectedLanguage === option.value
                      ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                      : 'bg-white text-gray-700 border-gray-300/80 hover:border-orange-300'
                  }`}
                >
                  <span className="text-base">{option.flag}</span>
                  <span className="text-[10px] opacity-80 mt-0.5">{option.nativeName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex flex-col gap-2 pt-3 mt-1 border-t border-gray-100/80">
          <Link
            href="/login"
            className="px-4 py-3 rounded-xl font-medium text-gray-600 hover:text-gray-800 hover:bg-gray-100/80 transition-all duration-200 text-center flex items-center justify-center text-[14px]"
            onClick={() => setMenuOpen(false)}
          >
            {t("login")}
          </Link>
          <Link
            href="/register"
            className="px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white font-medium text-center shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-[14px]"
            onClick={() => setMenuOpen(false)}
          >
            {t("register")}
          </Link>
          <Link
            href="/book"
            className="px-4 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-semibold text-center shadow-lg hover:shadow-xl transition-all duration-200 mt-1 border-2 border-white/20 flex items-center justify-center text-[14px]"
            onClick={() => setMenuOpen(false)}
          >
            {t("bookNow")}
          </Link>
        </div>
      </div>
    </div>
  );
}

// Iconos como componentes separados
function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <svg 
      className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
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
    <svg className="w-3.5 h-3.5 ml-auto text-orange-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
  );
}

function HamburgerIcon({ menuOpen }: { menuOpen: boolean }) {
  return (
    <div className="relative w-5 h-5">
      <span className={`absolute top-1/2 left-0 w-5 h-0.5 bg-gray-700 transform transition-all duration-300 ${
        menuOpen ? 'rotate-45 translate-y-0' : '-translate-y-1.5'
      }`}></span>
      <span className={`absolute top-1/2 left-0 w-5 h-0.5 bg-gray-700 transform transition-all duration-300 ${
        menuOpen ? 'opacity-0' : 'opacity-100'
      }`}></span>
      <span className={`absolute top-1/2 left-0 w-5 h-0.5 bg-gray-700 transform transition-all duration-300 ${
        menuOpen ? '-rotate-45 translate-y-0' : 'translate-y-1.5'
      }`}></span>
    </div>
  );
}