import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';

interface CookieBannerProps {
  currentLang: Language;
  onOpenModal: (id: string) => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ currentLang, onOpenModal }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('dm_cookies');
      if (!consent) {
        const timer = setTimeout(() => setVisible(true), 2500);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // Storage unavailable, safe fallback
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('dm_cookies', 'accepted');
    } catch (e) {}
    setVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('dm_cookies', 'declined');
    } catch (e) {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 left-5 right-5 max-w-lg bg-[#1e293b] text-white rounded-xl p-5 shadow-2xl z-50 flex flex-col gap-4 animate-fade-in border border-slate-700 print:hidden">
      <div>
        <div className="font-extrabold text-sm mb-1 text-slate-100 flex items-center gap-2">
          <span>{TRANSLATIONS['cookies.title'][currentLang]}</span>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed">
          {TRANSLATIONS['cookies.text'][currentLang]}{' '}
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onOpenModal('cookies-modal');
            }}
            className="text-blue-400 font-semibold underline"
          >
            {currentLang === 'fr' ? 'En savoir plus' : currentLang === 'es' ? 'Saber más' : 'Learn more'}
          </a>
          .
        </p>
      </div>
      <div className="flex gap-2 flex-wrap sm:flex-nowrap">
        <button
          onClick={handleAccept}
          className="text-xs font-bold bg-[#2563eb] hover:bg-[#3b82f6] text-white rounded-lg px-4 py-2 cursor-pointer transition-colors"
        >
          {TRANSLATIONS['cookies.accept'][currentLang]}
        </button>
        <button
          onClick={handleDecline}
          className="text-xs font-semibold bg-transparent hover:bg-white/5 text-slate-400 hover:text-white border border-slate-700 hover:border-slate-500 rounded-lg px-4 py-2 cursor-pointer transition-all"
        >
          {TRANSLATIONS['cookies.decline'][currentLang]}
        </button>
      </div>
    </div>
  );
};
