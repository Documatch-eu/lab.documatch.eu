import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ShieldAlert, ArrowRight, Check, Shield, Lock, Clock, Scale } from 'lucide-react';

interface HeroProps {
  currentLang: Language;
  onStartQuiz: () => void;
  hasSavedProgress?: boolean;
  onRestart?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ currentLang, onStartQuiz, hasSavedProgress = false, onRestart }) => {
  // Get localized titles with highlighted segments
  const renderTitle = () => {
    if (currentLang === 'fr') {
      return (
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight mb-6">
          Votre entreprise est-elle prête pour les <br />
          <span className="text-[#fbbf24]">nouvelles obligations documentaires de 2026 ?</span>
        </h1>
      );
    } else if (currentLang === 'es') {
      return (
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight mb-6">
          ¿Está su empresa preparada para las <br />
          <span className="text-[#fbbf24]">nuevas obligaciones documentales de 2026?</span>
        </h1>
      );
    } else if (currentLang === 'de') {
      return (
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight mb-6">
          Ist Ihr Unternehmen bereit für die <br />
          <span className="text-[#fbbf24]">neue E-Rechnungspflicht &amp; GoBD 2025/2026?</span>
        </h1>
      );
    } else if (currentLang === 'nl') {
      return (
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight mb-6">
          Is uw organisatie voorbereid op de <br />
          <span className="text-[#fbbf24]">nieuwe verplichte E-invoicing 2026?</span>
        </h1>
      );
    } else {
      return (
        <h1 className="font-sans font-extrabold text-3xl sm:text-4xl md:text-5xl text-white leading-tight tracking-tight mb-6">
          Is your company ready for the <br />
          <span className="text-[#fbbf24]">new European document mandates of 2026?</span>
        </h1>
      );
    }
  };

  const getSubtitle = () => {
    if (currentLang === 'fr') {
      return "20 questions clés pour évaluer la maturité documentaire de votre organisation face à la facturation électronique, à l'archivage légal et aux nouvelles exigences réglementaires françaises.";
    } else if (currentLang === 'es') {
      return "20 cuestiones para evaluar la madurez documental de su organización frente a la facturación electrónica, el archivo legal y las nuevas exigencias reglamentarias.";
    } else if (currentLang === 'de') {
      return "20 gezielte Fragen zur Bewertung des Reifegrads Ihres Dokumentenmanagements bezüglich E-Rechnungspflicht (Wachstumschancengesetz), GoBD und digitaler Archivierung.";
    } else if (currentLang === 'nl') {
      return "20 essentiële vragen om de digitale volwassenheid van uw documentbeheer te toetsen aan verplichte e-invoicing (Peppol/UBL) en wettelijke archivering.";
    } else {
      return "20 questions to assess your document management maturity regarding electronic invoicing, legal archiving, and new compliance standards.";
    }
  };

  const getUrgencyText = () => {
    if (currentLang === 'fr') {
      return (
        <span>
          À partir du <strong className="text-[#fbbf24] font-bold">1er septembre 2026</strong>, toutes les entreprises françaises devront être capables de recevoir des factures électroniques. Les entreprises non préparées devront adapter leurs processus, leurs outils et leur gouvernance documentaire.
        </span>
      );
    } else if (currentLang === 'es') {
      return (
        <span>
          A partir de <strong className="text-[#fbbf24] font-bold">2026</strong>, todas las empresas españolas deberán cumplir con la facturación electrónica obligatoria (<strong className="text-[#fbbf24] font-bold">Ley Crea y Crece</strong>). Las empresas no preparadas deberán adaptar sus procesos, herramientas y gobernanza.
        </span>
      );
    } else if (currentLang === 'de') {
      return (
        <span>
          Seit dem <strong className="text-[#fbbf24] font-bold">1. Januar 2025</strong> gilt in Deutschland der Vorrang für E-Rechnungen im B2B-Bereich (Wachstumschancengesetz). Nicht vorbereitete Unternehmen riskieren den Verlust des Vorsteuerabzugs und schwere GoBD-Beanstandungen.
        </span>
      );
    } else if (currentLang === 'nl') {
      return (
        <span>
          Met de verplichting voor <strong className="text-[#fbbf24] font-bold">B2B e-invoicing</strong> via het Peppol-netwerk moeten organisaties voorbereid zijn op gestructureerde UBL-facturen. Niet-conforme systemen eisen dringende herinrichting.
        </span>
      );
    } else {
      return (
        <span>
          Under <strong className="text-[#fbbf24] font-bold">GoBD (Germany)</strong> and <strong className="text-[#fbbf24] font-bold">Peppol (Netherlands)</strong>, European companies must support electronic business document workflows. Unprepared firms face critical tax audit compliance risks.
        </span>
      );
    }
  };

  const getBulletPoints = () => {
    if (currentLang === 'fr') {
      return [
        'Score de maturité documentaire (/100)',
        'Niveau de préparation à la facturation électronique',
        'Risques prioritaires identifiés',
        'Recommandations parmi +50 solutions référencées',
      ];
    } else if (currentLang === 'es') {
      return [
        'Puntuación de madurez documental (/100)',
        'Nivel de preparación para la facturación electrónica',
        'Riesgos prioritarios identificados',
        'Recomendaciones entre +50 soluciones referenciadas',
      ];
    } else if (currentLang === 'de') {
      return [
        'DMS-Reifegrad-Score (/100)',
        'E-Rechnungs- & GoBD-Bereitschaftsstufe',
        'Priorisierte Nichteinhaltungsrisiken',
        'Anbieterempfehlungen aus +50 geprüften Systemen',
      ];
    } else if (currentLang === 'nl') {
      return [
        'Documentvolwassenheidsscore (/100)',
        'Gereedheidsniveau voor verplichte e-invoicing',
        'Geprioriteerde compliancerisico\'s',
        'Aanbevelingen uit 50+ getoetste DMS-pakketten',
      ];
    } else {
      return [
        'Document maturity score (/100)',
        'Readiness level for e-invoicing compliance',
        'Prioritized compliance risks identified',
        'Recommendations from 50+ audited solutions',
      ];
    }
  };

  const getKPIs = () => {
    if (currentLang === 'fr') {
      return [
        { num: '20', label: 'Questions clés' },
        { num: '5 min', label: 'Durée estimée' },
        { num: '100%', label: 'Gratuit & Confidentiel' },
        { num: '+50', label: 'Solutions GED & DMS Comparées' },
      ];
    } else if (currentLang === 'es') {
      return [
        { num: '20', label: 'Cuestiones' },
        { num: '5 min', label: 'Duración estimada' },
        { num: '100%', label: 'Gratis y Confidencial' },
        { num: '+50', label: 'Soluciones GED y DMS Comparadas' },
      ];
    } else if (currentLang === 'de') {
      return [
        { num: '20', label: 'Schlüsselfragen' },
        { num: '5 min', label: 'Geschätzte Dauer' },
        { num: '100%', label: 'Kostenlos & Vertraulich' },
        { num: '+50', label: 'Verglichene DMS-Systeme' },
      ];
    } else if (currentLang === 'nl') {
      return [
        { num: '20', label: 'Essentiële vragen' },
        { num: '5 min', label: 'Geschatte tijd' },
        { num: '100%', label: 'Gratis & Vertrouwelijk' },
        { num: '+50', label: 'Vergeleken DMS-pakketten' },
      ];
    } else {
      return [
        { num: '20', label: 'Questions' },
        { num: '5 min', label: 'Estimated Time' },
        { num: '100%', label: 'Free & Confidential' },
        { num: '+50', label: 'DMS & E-Invoicing Tools Compared' },
      ];
    }
  };

  const getTrustBadges = () => {
    if (currentLang === 'fr') {
      return [
        { icon: <Shield size={14} className="text-sky-400" />, text: 'Conforme RGPD' },
        { icon: <Lock size={14} className="text-sky-400" />, text: 'Données sécurisées' },
        { icon: <Clock size={14} className="text-sky-400" />, text: 'Aucune inscription requise' },
        { icon: <Scale size={14} className="text-sky-400" />, text: 'Comparateur 100% indépendant' },
      ];
    } else if (currentLang === 'es') {
      return [
        { icon: <Shield size={14} className="text-sky-400" />, text: 'Cumple RGPD' },
        { icon: <Lock size={14} className="text-sky-400" />, text: 'Datos protegidos' },
        { icon: <Clock size={14} className="text-sky-400" />, text: 'Sin registro obligatorio' },
        { icon: <Scale size={14} className="text-sky-400" />, text: 'Comparador 100% independiente' },
      ];
    } else if (currentLang === 'de') {
      return [
        { icon: <Shield size={14} className="text-sky-400" />, text: 'DSGVO-konform' },
        { icon: <Lock size={14} className="text-sky-400" />, text: 'Sichere Datenverarbeitung' },
        { icon: <Clock size={14} className="text-sky-400" />, text: 'Keine Registrierung erforderlich' },
        { icon: <Scale size={14} className="text-sky-400" />, text: '100% unabhängiges Portal' },
      ];
    } else if (currentLang === 'nl') {
      return [
        { icon: <Shield size={14} className="text-sky-400" />, text: 'AVG / GDPR conform' },
        { icon: <Lock size={14} className="text-sky-400" />, text: 'Beveiligde verwerking' },
        { icon: <Clock size={14} className="text-sky-400" />, text: 'Geen verplichte registratie' },
        { icon: <Scale size={14} className="text-sky-400" />, text: '100% onafhankelijk vergelijk' },
      ];
    } else {
      return [
        { icon: <Shield size={14} className="text-sky-400" />, text: 'GDPR Compliant' },
        { icon: <Lock size={14} className="text-sky-400" />, text: 'Secured Data' },
        { icon: <Clock size={14} className="text-sky-400" />, text: 'No registration required' },
        { icon: <Scale size={14} className="text-sky-400" />, text: '100% Independent Comparator' },
      ];
    }
  };

  return (
    <section className="relative overflow-hidden bg-[#0a1829] py-16 px-4 sm:px-6 lg:px-8">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1.5px,transparent_1.5px),linear-gradient(90deg,rgba(37,99,235,0.03)_1.5px,transparent_1.5px)] bg-[size:40px_40px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-5xl mx-auto text-center z-10">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-1.5 text-[11px] font-extrabold tracking-widest text-[#fbbf24] uppercase border border-[#fbbf24]/30 rounded-full px-4 py-1 mb-8 bg-amber-500/5">
          <span>★ {currentLang === 'fr' ? 'DIAGNOSTIC OFFICIEL DOCUMATCH — ÉDITION 2026' : currentLang === 'es' ? 'DIAGNÓSTICO OFICIAL DOCUMATCH — EDICIÓN 2026' : currentLang === 'de' ? 'OFFIZIELLE DOCUMATCH DIAGNOSE — AUSGABE 2026' : currentLang === 'nl' ? 'OFFICIËLE DOCUMATCH DIAGNOSE — EDITIE 2026' : 'OFFICIAL DOCUMATCH DIAGNOSTIC — 2026 EDITION'}</span>
        </div>

        {/* Dynamic Highlighted Title */}
        {renderTitle()}

        {/* Localized Subtitle */}
        <p className="text-base sm:text-lg text-slate-300/85 max-w-3xl mx-auto leading-relaxed mb-10 font-sans font-light">
          {getSubtitle()}
        </p>

        {/* KPI Row (Matches image with fine dividers and sky-blue numbers) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-y border-white/10 max-w-4xl mx-auto mb-10 text-center divide-y md:divide-y-0 md:divide-x divide-white/10">
          {getKPIs().map((kpi, idx) => (
            <div key={idx} className="flex flex-col justify-center py-2 md:py-0 px-2">
              <span className="text-3xl md:text-4xl font-black text-sky-400 tracking-tight leading-none mb-1.5">
                {kpi.num}
              </span>
              <span className="text-[10px] md:text-xs text-slate-400 uppercase font-bold tracking-wider">
                {kpi.label}
              </span>
            </div>
          ))}
        </div>

        {/* Translucent Warning Box & List Combined (Matches image perfectly) */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-xl p-5 md:p-6 max-w-3xl mx-auto text-left mb-10 backdrop-blur-sm">
          {/* Alert Message */}
          <div className="flex gap-3 items-start pb-5 border-b border-white/10">
            <ShieldAlert size={18} className="text-[#fbbf24] mt-0.5 flex-shrink-0" />
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
              {getUrgencyText()}
            </p>
          </div>

          {/* checklist header */}
          <div className="pt-4">
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-slate-400/80 mb-3">
              {currentLang === 'fr' && 'À LA FIN DU DIAGNOSTIC, OBTENEZ :'}
              {currentLang === 'es' && 'AL FINAL DEL DIAGNÓSTICO, OBTENGA :'}
              {currentLang === 'de' && 'NACH DER DIAGNOSE ERHALTEN SIE:'}
              {currentLang === 'nl' && 'AAN HET EINDE VAN DE ANALYSE ONTVANGT U:'}
              {(currentLang === 'en' || (!['fr', 'es', 'de', 'nl'].includes(currentLang))) && 'AT THE END OF THE DIAGNOSTIC, GET:'}
            </h4>
            
            {/* 2x2 Grid of green checklists */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2.5">
              {getBulletPoints().map((pt, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs md:text-sm text-slate-200">
                  <Check size={15} className="text-emerald-500 flex-shrink-0 stroke-[3]" />
                  <span>{pt}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Action button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onStartQuiz}
            className="inline-flex items-center gap-2 text-sm sm:text-base font-extrabold text-white bg-[#2563eb] hover:bg-blue-600 rounded-full px-8 py-3.5 sm:px-10 sm:py-4 transition-all duration-200 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/25 cursor-pointer shadow-md"
          >
            <span>
              {hasSavedProgress
                ? currentLang === 'fr'
                  ? 'Reprendre mon diagnostic'
                  : currentLang === 'es'
                  ? 'Reanudar mi diagnóstico'
                  : currentLang === 'de'
                  ? 'Diagnose fortsetzen'
                  : currentLang === 'nl'
                  ? 'Hervat mijn diagnose'
                  : 'Resume my diagnostic'
                : TRANSLATIONS['btn.start'][currentLang]}
            </span>
            <ArrowRight size={16} className="stroke-[2.5]" />
          </button>

          {hasSavedProgress && onRestart && (
            <button
              onClick={onRestart}
              className="text-xs font-semibold text-slate-400 hover:text-white underline decoration-dotted underline-offset-4 bg-transparent border-none p-2 cursor-pointer transition-colors"
            >
              {currentLang === 'fr'
                ? 'Recommencer à zéro'
                : currentLang === 'es'
                ? 'Comenzar de nuevo'
                : currentLang === 'de'
                ? 'Neu starten'
                : currentLang === 'nl'
                ? 'Opnieuw beginnen'
                : 'Restart fresh'}
            </button>
          )}
        </div>

        {/* Attribution Subtext */}
        <p className="text-[11px] text-slate-400/60 max-w-xl mx-auto mt-6 leading-relaxed px-4 font-sans font-normal">
          {TRANSLATIONS['comparator.info'][currentLang]}
        </p>

        {/* Trust Badges Row (Matches image exactly with direct icons and text) */}
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-3 mt-8 pt-4 border-t border-white/5 max-w-3xl mx-auto">
          {getTrustBadges().map((badge, idx) => (
            <div key={idx} className="flex items-center gap-1.5 text-[11px] font-medium text-slate-400">
              {badge.icon}
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
