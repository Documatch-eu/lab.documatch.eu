import React, { useState, useRef, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ShieldAlert, ChevronDown, HelpCircle, Menu, X } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenModal: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onOpenModal,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getUrgencyText = () => {
    if (currentLang === 'fr') {
      return 'Réforme - 1er sept. 2026';
    } else if (currentLang === 'es') {
      return 'Réforme - 1er sept. 2026';
    } else {
      return 'Réforme - 1er sept. 2026';
    }
  };

  return (
    <header id="site-header" className="bg-[#0f1a2c] sticky top-0 z-50 shadow-md border-b border-white/5 print:hidden">
      {/* --- ANNOUNCEMENT BAR --- */}
      <div className="bg-[#2563eb] text-white text-center text-xs md:text-sm py-2 px-4 font-medium tracking-wide">
        <span>
          {currentLang === 'fr' && TRANSLATIONS['announcement.fr']['fr']}
          {currentLang === 'es' && TRANSLATIONS['announcement.es']['es']}
          {currentLang === 'en' && TRANSLATIONS['announcement.en']['en']}
        </span>
      </div>

      {/* --- MAIN HEADER --- */}
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo */}
        <a href="https://www.documatch.eu" className="flex items-center gap-1.5 sm:gap-2.5 decoration-transparent" target="_blank" rel="noopener noreferrer">
          <Logo size="sm" />
          <div className="flex items-center">
            <span className="font-sans font-bold text-lg sm:text-2xl text-white leading-none tracking-tight">
              Docu<span className="text-[#2563eb]">match</span>
            </span>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#f59e0b] uppercase bg-[#2e3748] border border-[#f59e0b] rounded-[6px] px-1.5 sm:px-2 py-0.5 ml-1.5 sm:ml-2.5 leading-none">
              LAB
            </span>
          </div>
        </a>

        {/* Right Nav Controls */}
        <div className="flex items-center gap-2 sm:gap-5">
          {/* Urgency Badge (Matches image perfectly, hidden on small screens to prevent layout squeeze on mobile) */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-[#fbbf24] bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span>{getUrgencyText()}</span>
          </div>

          {/* Quick Guide Link (visible on md+) */}
          <button
            onClick={() => onOpenModal('guide-modal')}
            className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 transition-all cursor-pointer"
          >
            <ShieldAlert size={13} className="text-[#fbbf24]" />
            <span>{TRANSLATIONS['btn.read.guide'][currentLang]}</span>
          </button>

          {/* FAQ Modal trigger (visible on md+) */}
          <button
            onClick={() => onOpenModal('faq-modal')}
            className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 transition-all cursor-pointer"
          >
            <HelpCircle size={13} className="text-[#3b82f6]" />
            <span>FAQ</span>
          </button>

          {/* Custom Responsive Dropdown for Smartphones & Segmented Selector for Desktops */}
          <div className="relative" ref={dropdownRef}>
            {/* Mobile Touch-Friendly Dropdown Button (Visible on mobile only) */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="sm:hidden flex items-center gap-1.5 px-3 py-1.5 bg-[#1e293b]/80 border border-white/10 rounded-lg text-xs font-bold text-white uppercase cursor-pointer min-h-[34px] min-w-[72px] justify-between shadow-sm active:bg-[#2d3a50] transition-colors"
            >
              <span className="flex items-center gap-1">
                <span className="text-[#2563eb] text-[15px] leading-none select-none">•</span>
                {currentLang}
              </span>
              <ChevronDown size={14} className={`text-white/60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Desktop Segmented Control (Visible on sm and larger) */}
            <div className="hidden sm:flex items-center bg-[#1e293b]/60 border border-white/5 rounded-lg p-0.5" id="lang-selector">
              <button
                onClick={() => onLanguageChange('fr')}
                className={`px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md text-xs font-bold uppercase transition-all cursor-pointer min-h-[30px] sm:min-h-[36px] min-w-[30px] sm:min-w-[36px] flex items-center justify-center ${
                  currentLang === 'fr' 
                    ? 'bg-[#2563eb] text-white shadow-sm' 
                    : 'text-white/45 hover:text-white/80'
                }`}
              >
                FR
              </button>
              <button
                onClick={() => onLanguageChange('es')}
                className={`px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md text-xs font-bold uppercase transition-all cursor-pointer min-h-[30px] sm:min-h-[36px] min-w-[30px] sm:min-w-[36px] flex items-center justify-center ${
                  currentLang === 'es' 
                    ? 'bg-[#2563eb] text-white shadow-sm' 
                    : 'text-white/45 hover:text-white/80'
                }`}
              >
                ES
              </button>
              <button
                onClick={() => onLanguageChange('en')}
                className={`px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-md text-xs font-bold uppercase transition-all cursor-pointer min-h-[30px] sm:min-h-[36px] min-w-[30px] sm:min-w-[36px] flex items-center justify-center ${
                  currentLang === 'en' 
                    ? 'bg-[#2563eb] text-white shadow-sm' 
                    : 'text-white/45 hover:text-white/80'
                }`}
              >
                EN
              </button>
            </div>

            {/* Custom Popover Dropdown Menu (Renders as a direct floating layer above layout constraints on mobile) */}
            {isOpen && (
              <div className="sm:hidden absolute right-0 mt-2 w-32 bg-[#15233c] border border-white/10 rounded-lg shadow-2xl overflow-hidden z-[110] animate-in fade-in slide-in-from-top-1 duration-100">
                {(['fr', 'es', 'en'] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => {
                      onLanguageChange(lang);
                      setIsOpen(false);
                    }}
                    className={`w-full px-3 py-2.5 text-left text-xs font-bold uppercase transition-all flex items-center justify-between cursor-pointer border-b border-white/5 last:border-0 ${
                      currentLang === lang
                        ? 'bg-[#2563eb] text-white'
                        : 'text-white/70 hover:bg-[#1e2d45] hover:text-white'
                    }`}
                  >
                    <span>{lang === 'fr' ? 'Français' : lang === 'es' ? 'Español' : 'English'}</span>
                    {currentLang === lang && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden flex items-center justify-center p-2 rounded-lg text-white/80 hover:text-white hover:bg-white/5 border border-white/10 transition-colors cursor-pointer min-h-[34px]"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE SLIDE-DOWN MENU --- */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-white/5 bg-[#0e1624] px-4 py-4 space-y-3 shadow-inner">
          {/* Urgency Badge */}
          <div className="flex items-center gap-2 text-[11px] font-semibold text-[#fbbf24] bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 w-full">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
            <span>{getUrgencyText()}</span>
          </div>

          <div className="flex flex-col gap-2">
            {/* Quick Guide Link */}
            <button
              onClick={() => {
                onOpenModal('guide-modal');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-between gap-1.5 text-xs font-semibold text-white/80 hover:text-white bg-white/5 active:bg-white/10 border border-white/10 rounded-lg px-3.5 py-3 transition-all cursor-pointer w-full text-left"
            >
              <div className="flex items-center gap-2">
                <ShieldAlert size={14} className="text-[#fbbf24]" />
                <span>{TRANSLATIONS['btn.read.guide'][currentLang]}</span>
              </div>
              <ChevronDown size={14} className="text-white/40 -rotate-90" />
            </button>

            {/* FAQ Modal trigger */}
            <button
              onClick={() => {
                onOpenModal('faq-modal');
                setIsMobileMenuOpen(false);
              }}
              className="flex items-center justify-between gap-1.5 text-xs font-semibold text-white/80 hover:text-white bg-white/5 active:bg-white/10 border border-white/10 rounded-lg px-3.5 py-3 transition-all cursor-pointer w-full text-left"
            >
              <div className="flex items-center gap-2">
                <HelpCircle size={14} className="text-[#3b82f6]" />
                <span>FAQ</span>
              </div>
              <ChevronDown size={14} className="text-white/40 -rotate-90" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
