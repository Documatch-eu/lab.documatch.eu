import React, { useEffect, useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ShieldCheck, Cookie, Settings, Check, X } from 'lucide-react';

interface CookieBannerProps {
  currentLang: Language;
  onOpenModal: (id: string) => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ currentLang, onOpenModal }) => {
  const [visible, setVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsConsent, setAnalyticsConsent] = useState(true);

  useEffect(() => {
    // Event listener to manually reopen cookie preferences
    const handleReopen = () => {
      setShowPreferences(false);
      setVisible(true);
    };

    window.addEventListener('open-cookie-banner', handleReopen);

    try {
      const consent = localStorage.getItem('dm_cookies');
      if (!consent) {
        setVisible(true);
      } else if (consent === 'declined') {
        setAnalyticsConsent(false);
      }
    } catch (e) {
      // Storage unavailable, safe fallback
      setVisible(true);
    }

    return () => {
      window.removeEventListener('open-cookie-banner', handleReopen);
    };
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('dm_cookies', 'accepted');
      localStorage.setItem('dm_cookies_analytics', 'true');
    } catch (e) {}
    setVisible(false);
    setShowPreferences(false);
  };

  const handleDeclineAll = () => {
    try {
      localStorage.setItem('dm_cookies', 'declined');
      localStorage.setItem('dm_cookies_analytics', 'false');
    } catch (e) {}
    setVisible(false);
    setShowPreferences(false);
  };

  const handleSavePreferences = () => {
    try {
      localStorage.setItem('dm_cookies', analyticsConsent ? 'accepted' : 'declined');
      localStorage.setItem('dm_cookies_analytics', analyticsConsent ? 'true' : 'false');
    } catch (e) {}
    setVisible(false);
    setShowPreferences(false);
  };

  if (!visible) return null;

  // Localized texts
  const titles = {
    fr: 'Gestion de la confidentialité & Cookies',
    es: 'Gestión de Privacidad y Cookies',
    en: 'Privacy & Cookie Consent',
    de: 'Datenschutz & Cookie-Einstellungen',
    nl: 'Privacy & Cookie-instellingen',
  };

  const badgeTexts = {
    fr: 'Conforme RGPD / ePrivacy',
    es: 'Cumple RGPD / ePrivacy',
    en: 'GDPR / ePrivacy Compliant',
    de: 'DSGVO / ePrivacy-konform',
    nl: 'AVG / ePrivacy-conform',
  };

  const learnMoreTexts = {
    fr: 'En savoir plus dans notre Politique de confidentialité',
    es: 'Saber más en nuestra Política de privacidad',
    en: 'Learn more in our Privacy Policy',
    de: 'Mehr erfahren in unserer Datenschutzerklärung',
    nl: 'Lees meer in ons Privacybeleid',
  };

  const customizeBtnTexts = {
    fr: 'Personaliser',
    es: 'Personalizar',
    en: 'Customize',
    de: 'Anpassen',
    nl: 'Aanpassen',
  };

  const saveBtnTexts = {
    fr: 'Enregistrer mes choix',
    es: 'Guardar mis preferencias',
    en: 'Save Preferences',
    de: 'Einstellungen speichern',
    nl: 'Voorkeuren opslaan',
  };

  const essentialTitle = {
    fr: 'Cookies strictement nécessaires (Obligatoires)',
    es: 'Cookies estrictamente necesarias (Obligatorias)',
    en: 'Strictly Necessary Cookies (Mandatory)',
    de: 'Technisch notwendige Cookies (Erforderlich)',
    nl: 'Strik noodzakelijke cookies (Verplicht)',
  };

  const essentialDesc = {
    fr: 'Indispensables pour mémoriser votre progression dans le diagnostic, votre langue et vos préférences de pays.',
    es: 'Indispensables para recordar su avance en el diagnóstico, su idioma y sus preferencias de país.',
    en: 'Essential for remembering your diagnostic progress, language choice, and country preferences.',
    de: 'Erforderlich für die Speicherung Ihres Diagnose-Fortschritts, der Sprache und der Länderauswahl.',
    nl: 'Noodzakelijk voor het onthouden van uw analysevoortgang, taal en landkeuze.',
  };

  const analyticsTitle = {
    fr: 'Cookies analytiques & statistiques (Optionnels)',
    es: 'Cookies analíticas y estadísticas (Opcionales)',
    en: 'Analytics & Performance Cookies (Optional)',
    de: 'Analyse- & Statistik-Cookies (Optional)',
    nl: 'Analytische cookies (Optioneel)',
  };

  const analyticsDesc = {
    fr: 'Mesures anonymes d\'audience et d\'erreurs pour optimiser l\'expérience utilisateur. Aucun profilage publicitaire.',
    es: 'Medición anónima de audiencia y rendimiento para mejorar el servicio. Sin perfilado publicitario.',
    en: 'Anonymous measurement of traffic and usage to improve app stability. Zero advertising tracking.',
    de: 'Anonyme Verkehrsmessung zur Optimierung der Benutzererfahrung. Keine Werbetracker.',
    nl: 'Anonieme meting van bezoekersstatistieken om de werking te verbeteren. Geen advertentieprofielen.',
  };

  const alwaysActiveText = {
    fr: 'Toujours actif',
    es: 'Siempre activo',
    en: 'Always active',
    de: 'Immer aktiv',
    nl: 'Altijd actief',
  };

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-lg bg-[#0f172a]/95 backdrop-blur-md text-white rounded-2xl p-5 sm:p-6 shadow-2xl z-[9999] animate-fade-in border border-slate-700/80 print:hidden font-sans">
      
      {/* Header Badge */}
      <div className="flex items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 shrink-0">
            <Cookie size={18} />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-100 leading-tight">
              {titles[currentLang] || titles.es}
            </h3>
            <span className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
              <ShieldCheck size={12} />
              {badgeTexts[currentLang] || badgeTexts.es}
            </span>
          </div>
        </div>
        <button
          onClick={handleDeclineAll}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          title="Close / Reject"
        >
          <X size={16} />
        </button>
      </div>

      {/* Standard Notice or Customizer Panel */}
      {!showPreferences ? (
        <>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            {TRANSLATIONS['cookies.text'][currentLang]}{' '}
            <button
              onClick={() => onOpenModal('cookies-modal')}
              className="text-blue-400 font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer inline"
            >
              {learnMoreTexts[currentLang] || learnMoreTexts.es}.
            </button>
          </p>

          <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-2 pt-1 border-t border-slate-800">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={handleAcceptAll}
                className="flex-1 sm:flex-initial text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2.5 cursor-pointer transition-colors shadow-lg shadow-blue-600/20"
              >
                {TRANSLATIONS['cookies.accept'][currentLang]}
              </button>
              <button
                onClick={handleDeclineAll}
                className="flex-1 sm:flex-initial text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 rounded-xl px-4 py-2.5 cursor-pointer transition-colors"
              >
                {TRANSLATIONS['cookies.decline'][currentLang]}
              </button>
            </div>
            <button
              onClick={() => setShowPreferences(true)}
              className="text-xs font-medium text-slate-400 hover:text-blue-300 underline cursor-pointer flex items-center gap-1 self-center py-1"
            >
              <Settings size={13} />
              <span>{customizeBtnTexts[currentLang] || customizeBtnTexts.es}</span>
            </button>
          </div>
        </>
      ) : (
        /* Preferences Customizer Panel */
        <div className="space-y-3 pt-2">
          {/* Item 1: Essential */}
          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-start justify-between gap-3">
            <div className="space-y-0.5 pr-2">
              <div className="text-xs font-bold text-slate-200">
                {essentialTitle[currentLang]}
              </div>
              <div className="text-[11px] text-slate-400 leading-tight">
                {essentialDesc[currentLang]}
              </div>
            </div>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded px-2 py-0.5 shrink-0 whitespace-nowrap mt-0.5">
              {alwaysActiveText[currentLang]}
            </span>
          </div>

          {/* Item 2: Analytics */}
          <div className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl flex items-start justify-between gap-3">
            <div className="space-y-0.5 pr-2">
              <div className="text-xs font-bold text-slate-200">
                {analyticsTitle[currentLang]}
              </div>
              <div className="text-[11px] text-slate-400 leading-tight">
                {analyticsDesc[currentLang]}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setAnalyticsConsent(!analyticsConsent)}
              className={`relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none mt-0.5 ${
                analyticsConsent ? 'bg-blue-600' : 'bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                  analyticsConsent ? 'translate-x-4' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-2 pt-2">
            <button
              onClick={() => setShowPreferences(false)}
              className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
            >
              ← Back
            </button>
            <button
              onClick={handleSavePreferences}
              className="text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-2 cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <Check size={14} />
              <span>{saveBtnTexts[currentLang] || saveBtnTexts.es}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
