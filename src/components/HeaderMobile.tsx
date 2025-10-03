"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

// Componente Mobile Hamburger
export function MobileHamburger({ menuOpen, setMenuOpen }: MobileHamburgerProps) {
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

// Icono Hamburger
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

// Skeleton para mobile
export function MobileSkeleton() {
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
          <div className="w-10 h-10 bg-gray-200 rounded-xl animate-pulse lg:hidden"></div>
        </div>
      </div>
    </nav>
  );
}