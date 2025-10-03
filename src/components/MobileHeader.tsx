"use client";
import Link from "next/link";

// Definir tipos para las props
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

interface MobileHeaderProps {
  menuOpen: boolean;
  pathname: string;
  t: any;
  selectedLanguage: string;
  handleLanguageChange: (lang: string) => void;
  setMenuOpen: (open: boolean) => void;
  navLinks: NavLink[];
  languageOptions: LanguageOption[];
}

export default function MobileHeader({
  menuOpen,
  pathname,
  t,
  selectedLanguage,
  handleLanguageChange,
  setMenuOpen,
  navLinks,
  languageOptions
}: MobileHeaderProps) {
  return (
    <div className={`border-red-200 border lg:hidden overflow-hidden transition-all duration-300 ease-in-out bg-gray-100 ${
      menuOpen ? 'max-h-[100vh] opacity-100 pb-2' : 'max-h-0 opacity-0'
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
                  <span className="font-medium">{option.label}</span>
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