import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Clock, FileText, ArrowRight, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { Language } from '../types';
import { Logo } from './Logo';

interface CtaPopupProps {
  currentLang: Language;
  onStartQuiz: () => void;
  isOpenEnabled?: boolean;
}

export const CtaPopup: React.FC<CtaPopupProps> = ({
  currentLang,
  onStartQuiz,
  isOpenEnabled = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if already dismissed in this session
    try {
      const dismissed = sessionStorage.getItem('documatch_cta_popup_dismissed');
      if (dismissed === 'true') {
        return;
      }
    } catch (e) {}

    if (!isOpenEnabled) return;

    // Trigger after approximately 20 seconds (20,000 ms)
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, [isOpenEnabled]);

  const handleDismiss = () => {
    setIsVisible(false);
    try {
      sessionStorage.setItem('documatch_cta_popup_dismissed', 'true');
    } catch (e) {}
  };

  const handleCtaClick = () => {
    handleDismiss();
    onStartQuiz();
  };

  const textContent = {
    es: {
      badge: 'AUDITORÍA OFICIAL 2026',
      title: '¿Su empresa está preparada para la Factura Electrónica y GED?',
      subtitle: 'Realice un test de madurez de 4 minutos y obtenga su diagnóstico gratuito con puntuación de conformidad, análisis de riesgos y comparador de software.',
      benefits: [
        'Conformidad Ley Crea y Crece & e-Invoicing 2026',
        'Puntuación y diagnóstico instantáneo sobre 100',
        'Informe descargable en PDF sin coste ni compromiso',
      ],
      cta: 'Evaluar mi madurez documental',
      dismiss: 'Continuar navegando',
      duration: '4 minutos',
      free: '100% Gratuito & Confidencial',
    },
    fr: {
      badge: 'AUDIT OFFICIEL 2026',
      title: 'Votre entreprise est-elle prête pour la réforme GED & Facturation 2026 ?',
      subtitle: 'Réalisez un test de maturité en 4 minutes et obtenez votre diagnostic complet avec score de conformité, analyse des risques et comparateur de logiciels.',
      benefits: [
        'Conformité Réforme Facturation Électronique 2026 (PPF & PDP)',
        'Score de maturité documentaire instantané sur 100',
        'Rapport PDF personnalisé sans engagement',
      ],
      cta: 'Évaluer ma maturité documentaire',
      dismiss: 'Continuer à explorer',
      duration: '4 minutes',
      free: '100% Gratuit & Confidentiel',
    },
    en: {
      badge: 'OFFICIAL AUDIT 2026',
      title: 'Is your organization ready for the 2026 e-Invoicing & DMS mandates?',
      subtitle: 'Complete a quick 4-minute maturity assessment to receive your free compliance score, risk analysis, and DMS software benchmark.',
      benefits: [
        'EU e-Invoicing & Digital Document Compliance 2026',
        'Instant maturity scoring benchmark out of 100',
        'Downloadable customized PDF report with no obligations',
      ],
      cta: 'Evaluate my document maturity',
      dismiss: 'Continue exploring',
      duration: '4 minutes',
      free: '100% Free & Confidential',
    },
    de: {
      badge: 'OFFIZIELLES AUDIT 2026',
      title: 'Ist Ihr Unternehmen für die E-Rechnungspflicht und GoBD 2026 gerüstet?',
      subtitle: 'Führen Sie in 4 Minuten einen Reifegrad-Test durch und erhalten Sie Ihren kostenlosen Diagnosebericht mit Konformitätsbewertung und Software-Vergleich.',
      benefits: [
        'Konformität E-Rechnung 2025/2026 & GoBD Archivierung',
        'Sofortige Bewertung des Dokumenten-Reifegrads auf 100',
        'Kostenloser PDF-Bericht ohne Kaufverpflichtung',
      ],
      cta: 'Meine Dokumenten-Reife bewerten',
      dismiss: 'Weiter umsehen',
      duration: '4 Minuten',
      free: '100% Kostenlos & Vertraulich',
    },
    nl: {
      badge: 'OFFICIËLE AUDIT 2026',
      title: 'Is uw organisatie klaar voor de e-Invoicing & DMS verplichtingen van 2026?',
      subtitle: 'Doe in 4 minuten een volwassenheidstest en ontvang uw gratis analyserapport met compliance-score en softwarevergelijking.',
      benefits: [
        'Compliance e-Facturatie & Peppol regelgeving 2026',
        'Directe volwassenheidsscore op 100 punten',
        'Downloadbaar PDF-rapport zonder verplichtingen',
      ],
      cta: 'Mijn documentvolwassenheid evalueren',
      dismiss: 'Verder verkennen',
      duration: '4 minuten',
      free: '100% Gratis & Vertrouwelijk',
    },
  };

  const t = textContent[currentLang] || textContent.en;

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-[#070f1e]/75 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-lg bg-[#0f1a2c] text-white border border-blue-500/30 rounded-2xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8"
            role="dialog"
            aria-modal="true"
          >
            {/* Top Accent Gradient Line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#2563eb] via-[#fbbf24] to-[#2563eb]" />

            {/* Close Button */}
            <button
              onClick={handleDismiss}
              className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-white/10 transition-colors"
              aria-label="Cerrar ventana"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header / Brand Badge */}
            <div className="flex items-center gap-3 mb-4">
              <Logo size="sm" />
              <div>
                <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-extrabold tracking-wider text-[#fbbf24] bg-amber-500/10 border border-[#fbbf24]/30 rounded-md px-2 py-0.5 uppercase">
                  <Sparkles className="w-3 h-3 text-[#fbbf24]" />
                  {t.badge}
                </span>
              </div>
            </div>

            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-extrabold text-white leading-snug tracking-tight mb-2.5">
              {t.title}
            </h2>

            {/* Subtitle Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-5">
              {t.subtitle}
            </p>

            {/* Value Highlights List */}
            <div className="space-y-2 mb-6 bg-[#16253b] border border-white/10 rounded-xl p-3.5 sm:p-4 text-xs text-slate-200">
              {t.benefits.map((benefit, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span className="leading-snug">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Quick Meta Indicators */}
            <div className="flex items-center justify-between text-[11px] text-slate-400 mb-6 px-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#fbbf24]" />
                {t.duration}
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                {t.free}
              </span>
              <span className="flex items-center gap-1">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                PDF
              </span>
            </div>

            {/* Actions: Primary CTA & Dismiss */}
            <div className="flex flex-col gap-2.5">
              <button
                id="btn-popup-cta-start"
                onClick={handleCtaClick}
                className="w-full group flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] hover:from-[#1d4ed8] hover:to-[#1e40af] text-white font-bold text-sm sm:text-base py-3.5 px-6 rounded-xl shadow-lg hover:shadow-blue-500/25 transition-all transform active:scale-[0.99] cursor-pointer"
              >
                <span>{t.cta}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={handleDismiss}
                className="w-full text-center text-xs text-slate-400 hover:text-slate-200 py-1.5 transition-colors cursor-pointer"
              >
                {t.dismiss}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
