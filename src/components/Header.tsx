import React, { useState, useEffect } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ShieldAlert, ChevronDown, HelpCircle, Menu, X, Home, Globe, Check } from 'lucide-react';
import { Logo } from './Logo';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  onOpenModal: (id: string) => void;
  onHomeClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentLang,
  onLanguageChange,
  onOpenModal,
  onHomeClick,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getUrgencyText = () => {
    if (currentLang === 'fr') {
      return 'Réforme - 1er sept. 2026';
    } else if (currentLang === 'es') {
      return 'Reforma - Enero 2026';
    } else if (currentLang === 'de') {
      return 'E-Rechnungspflicht 2025';
    } else if (currentLang === 'nl') {
      return 'E-Invoicing Verplichting';
    } else {
      return 'e-Invoicing Mandates 2025/2026';
    }
  };

  const LANGUAGES: { code: Language; name: string; flag: string }[] = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'nl', name: 'Nederlands', flag: '🇳🇱' },
  ];

  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  return (
    <header id="site-header" className="bg-[#0f1a2c] sticky top-0 z-50 shadow-md border-b border-white/5 print:hidden">
      {/* --- ANNOUNCEMENT BAR --- */}
      <div className="bg-[#2563eb] text-white text-center text-xs md:text-sm py-2 px-4 font-medium tracking-wide">
        <span>
          {currentLang === 'fr' && TRANSLATIONS['announcement.fr']['fr']}
          {currentLang === 'es' && TRANSLATIONS['announcement.es']['es']}
          {currentLang === 'en' && TRANSLATIONS['announcement.en']['en']}
          {currentLang === 'de' && TRANSLATIONS['announcement.en']['de']}
          {currentLang === 'nl' && TRANSLATIONS['announcement.en']['nl']}
        </span>
      </div>

      {/* --- MAIN CLEAN HEADER --- */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
        {/* Logo */}
        <button 
          onClick={onHomeClick} 
          className="flex items-center gap-2 sm:gap-3 decoration-transparent bg-transparent border-0 cursor-pointer text-left p-0"
        >
          <Logo size="sm" />
          <div className="flex flex-col items-start justify-center">
            <span className="font-sans font-bold text-[20px] sm:text-[26.5px] text-[#fbbf24] leading-none tracking-tight">
              LAB
            </span>
            <span className="text-[11px] sm:text-[12.5px] font-medium text-white leading-none mt-1">
              by Documatch
            </span>
          </div>
        </button>

        {/* Right Nav Controls */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Urgency Badge (hidden on very small screens) */}
          <div className="hidden sm:flex items-center gap-2 text-[11px] font-semibold text-[#fbbf24] bg-amber-500/10 border border-amber-500/20 rounded-full px-3 py-1">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
            <span>{getUrgencyText()}</span>
          </div>

          {/* Home Link (visible on lg+) */}
          <button
            id="btn-desktop-home"
            onClick={onHomeClick}
            className="hidden lg:flex items-center gap-1.5 text-xs font-semibold text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3 py-1.5 transition-all cursor-pointer"
          >
            <Home size={13} className="text-[#3b82f6]" />
            <span>{TRANSLATIONS['btn.home'][currentLang]}</span>
          </button>

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

          {/* Clean Hamburger Menu Button (opens the full drawer with Language selector & Navigation) */}
          <button
            id="btn-toggle-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all cursor-pointer min-h-[36px]"
            aria-label="Menu et Langues"
          >
            <span className="text-sm">{currentLangObj.flag}</span>
            <span className="text-xs font-bold uppercase tracking-wider text-white/90 hidden xs:inline">{currentLangObj.code}</span>
            {isMenuOpen ? <X size={16} className="text-white/80" /> : <Menu size={16} className="text-white/80" />}
          </button>
        </div>
      </div>

      {/* --- SLIDE-DOWN HAMBURGER & LANGUAGE MENU --- */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-[#0e1624]/95 backdrop-blur-md px-4 py-4 space-y-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
          {/* Urgency Badge on small screens */}
          <div className="sm:hidden flex items-center gap-2 text-[11px] font-semibold text-[#fbbf24] bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 w-full">
            <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse flex-shrink-0" />
            <span>{getUrgencyText()}</span>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1.5">
            {/* Inicio / Home button */}
            <button
              id="btn-menu-home"
              onClick={() => {
                if (onHomeClick) onHomeClick();
                setIsMenuOpen(false);
              }}
              className="flex items-center justify-between gap-1.5 text-xs font-semibold text-white/90 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3.5 py-2.5 transition-all cursor-pointer w-full text-left"
            >
              <div className="flex items-center gap-2.5">
                <Home size={15} className="text-[#3b82f6]" />
                <span className="font-bold">{TRANSLATIONS['btn.home'][currentLang]}</span>
              </div>
              <ChevronDown size={14} className="text-white/40 -rotate-90" />
            </button>

            {/* Quick Guide Link */}
            <button
              onClick={() => {
                onOpenModal('guide-modal');
                setIsMenuOpen(false);
              }}
              className="flex items-center justify-between gap-1.5 text-xs font-semibold text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3.5 py-2.5 transition-all cursor-pointer w-full text-left"
            >
              <div className="flex items-center gap-2.5">
                <ShieldAlert size={15} className="text-[#fbbf24]" />
                <span>{TRANSLATIONS['btn.read.guide'][currentLang]}</span>
              </div>
              <ChevronDown size={14} className="text-white/40 -rotate-90" />
            </button>

            {/* FAQ Modal trigger */}
            <button
              onClick={() => {
                onOpenModal('faq-modal');
                setIsMenuOpen(false);
              }}
              className="flex items-center justify-between gap-1.5 text-xs font-semibold text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg px-3.5 py-2.5 transition-all cursor-pointer w-full text-left"
            >
              <div className="flex items-center gap-2.5">
                <HelpCircle size={15} className="text-[#3b82f6]" />
                <span>FAQ</span>
              </div>
              <ChevronDown size={14} className="text-white/40 -rotate-90" />
            </button>
          </div>

          {/* Language Selection Grid */}
          <div className="pt-2 border-t border-white/10">
            <div className="flex items-center gap-2 px-1 mb-2.5 text-[11px] font-bold tracking-wider text-white/50 uppercase">
              <Globe size={13} className="text-[#3b82f6]" />
              <span>{TRANSLATIONS['menu.language'][currentLang]}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2">
              {LANGUAGES.map((l) => {
                const isSelected = currentLang === l.code;
                return (
                  <button
                    key={l.code}
                    id={`btn-lang-${l.code}`}
                    onClick={() => {
                      onLanguageChange(l.code);
                      setIsMenuOpen(false);
                    }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer border ${
                      isSelected
                        ? 'bg-[#2563eb] text-white border-[#3b82f6] shadow-md'
                        : 'bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{l.flag}</span>
                      <span>{l.name}</span>
                    </div>
                    {isSelected && <Check size={14} className="text-white flex-shrink-0" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
