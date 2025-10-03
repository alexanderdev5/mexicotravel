"use client";
import Link from "next/link";
import { useState, useEffect, useCallback, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import TopHeader from "./TopHeader";
import { MobileHamburger, MobileMenu, MobileSkeleton } from "./HeaderMobile";

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

type NavbarProps = Record<string, never>;
type TranslateFunction = (key: string) => string;

// Constantes para mejor mantenibilidad
const BREAKPOINTS = {
  LG: 1024
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

// Interfaces para los props de los componentes
interface DesktopNavigationProps {
  pathname: string;
  t: TranslateFunction;
}

interface LogoLinkProps {
  onCloseMenu: () => void;
  t: TranslateFunction;
  isScrolled: boolean;
}

// Componente Logo Link
function LogoLink({ onCloseMenu, t, isScrolled }: LogoLinkProps) {
  return (
    <Link 
      href="/" 
      className="flex items-center gap-3 group"
      onClick={onCloseMenu}
      aria-label={t("home")}
    >
      <div className="relative">
        <div className={`bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg transform group-hover:scale-105 transition-all duration-300 ${
          isScrolled ? 'w-8 h-8 text-base' : 'w-10 h-10 text-lg'
        }`}>
          M
        </div>
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
      </div>
      <div className={`flex flex-col transition-all duration-300 ${
        isScrolled ? 'scale-95' : 'scale-100'
      }`}>
        <span className="font-bold bg-gradient-to-r from-blue-800 to-blue-600 bg-clip-text text-transparent leading-tight whitespace-nowrap">
          {t("brand")}
        </span>
        <span className="text-blue-500 font-medium leading-tight whitespace-nowrap">
          {t("tagline")}
        </span>
      </div>
    </Link>
  );
}

// Componente Desktop Navigation
function DesktopNavigation({ pathname, t }: DesktopNavigationProps) {
  return (
    <div className="hidden lg:flex items-center gap-1">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`px-4 py-2.5 rounded-xl font-medium transition-all duration-200 relative group flex items-center justify-center text-[13px] tracking-tight
            ${pathname === link.href 
              ? 'text-blue-600 bg-blue-50/80 shadow-sm' 
              : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50/60'}`}
          aria-current={pathname === link.href ? 'page' : undefined}
        >
          {t(link.translationKey)}
          <span className={`absolute bottom-1 left-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-4/5 group-hover:left-[10%] ${
            pathname === link.href ? 'bg-blue-500 w-4/5 left-[10%]' : 'bg-blue-400'
          }`}></span>
        </Link>
      ))}
      
      {/* Botones de autenticación */}
      <div className="flex items-center gap-2 ml-3 pl-3 border-l border-blue-200/60">
        <Link
          href="/login"
          className="px-4 py-2.5 rounded-xl font-medium text-gray-600 hover:text-blue-700 hover:bg-blue-50/80 transition-all duration-200 flex items-center justify-center text-[13px] tracking-tight min-w-[100px] border border-gray-200/60 hover:border-blue-200/80"
        >
          {t("login")}
        </Link>
        <Link
          href="/register"
          className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white font-medium shadow-lg hover:shadow-xl hover:from-blue-600 hover:to-blue-700 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center text-[13px] tracking-tight min-w-[110px] border border-blue-400/30"
        >
          {t("register")}
        </Link>
      </div>
    </div>
  );
}

// Skeleton components
function TopHeaderSkeleton() {
  return (
    <div className="bg-blue-50 text-blue-900 border-b border-blue-200 h-10">
      <div className="max-w-8xl mx-auto px-1 sm:px-2 lg:px-10">
        <div className="flex items-center justify-between h-10">
          <div className="flex-1 h-4 bg-blue-200 rounded animate-pulse"></div>
          <div className="flex items-center gap-3 pl-4">
            <div className="w-20 h-6 bg-blue-200 rounded animate-pulse"></div>
            <div className="w-24 h-6 bg-blue-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavbarSkeleton() {
  return (
    <nav className="bg-white/95 backdrop-blur-lg border-b border-blue-100 shadow-sm sticky top-0 z-50 h-20">
      <div className="max-w-8xl mx-auto px-1 sm:px-2 lg:px-10">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-200 rounded-xl animate-pulse"></div>
            <div className="flex flex-col gap-1">
              <div className="h-4 w-32 bg-blue-200 rounded animate-pulse"></div>
              <div className="h-3 w-24 bg-blue-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="hidden lg:flex gap-2">
            <div className="h-8 w-20 bg-blue-200 rounded animate-pulse"></div>
            <div className="h-8 w-20 bg-blue-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </nav>
  );
}

// Componente Header principal
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
    return (
      <>
        <TopHeaderSkeleton />
        <NavbarSkeleton />
      </>
    );
  }

  return (
    <>
      {/* Top Header con Marquee y Lenguaje + CTA */}
      <TopHeader
        t={t}
        currentLang={currentLang}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
        handleLanguageChange={handleLanguageChange}
        selectedLanguage={selectedLanguage}
      />

      {/* Header Principal */}
      <nav className={`bg-white/95 backdrop-blur-lg border-b transition-all duration-300 sticky top-0 z-50 ${
        isScrolled 
          ? 'border-blue-200/60 shadow-sm h-16' 
          : 'border-blue-100/50 shadow-xs h-20'
      }`} 
           role="navigation" 
           aria-label="Main navigation">
        <div className="max-w-8xl mx-auto sm:px-2 lg:px-10">
          <div className={`flex justify-between items-center transition-all duration-300 ${
            isScrolled ? 'h-16' : 'h-20'
          }`}>
            
            {/* Logo */}
            <LogoLink onCloseMenu={() => setMenuOpen(false)} t={t} isScrolled={isScrolled} />
            
            {/* Navegación Desktop */}
            <DesktopNavigation pathname={pathname} t={t} />

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
    </>
  );
}