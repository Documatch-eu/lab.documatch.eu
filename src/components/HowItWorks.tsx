import React from 'react';
import { Language } from '../types';

interface HowItWorksProps {
  currentLang: Language;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ currentLang }) => {
  const getTagText = () => {
    if (currentLang === 'fr') return 'COMMENT ÇA FONCTIONNE';
    if (currentLang === 'es') return 'CÓMO FUNCIONA';
    if (currentLang === 'de') return 'SO FUNKTIONIERT ES';
    if (currentLang === 'nl') return 'HOE HET WERKT';
    return 'HOW IT WORKS';
  };

  const getSectionTitle = () => {
    if (currentLang === 'fr') return 'Un diagnostic en 4 étapes';
    if (currentLang === 'es') return 'Un diagnóstico en 4 pasos';
    if (currentLang === 'de') return 'Eine Diagnose in 4 Schritten';
    if (currentLang === 'nl') return 'Een analyse in 4 stappen';
    return 'A simple 4-step diagnostic';
  };

  const getSteps = () => {
    if (currentLang === 'fr') {
      return [
        {
          num: '1',
          title: 'Répondez aux 20 questions',
          desc: 'Profil, système actuel, conformité légale, intégrations ERP et maturité projet — en 5 minutes chrono.',
        },
        {
          num: '2',
          title: 'Renseignez vos coordonnées',
          desc: 'Pour recevoir votre rapport personnalisé et être mis en relation avec les meilleures solutions adaptées.',
        },
        {
          num: '3',
          title: 'Obtenez votre score de maturité',
          desc: 'Score sur 100, analyse par axe et recommandations prioritaires personnalisées pour votre profil.',
        },
        {
          num: '4',
          title: 'Comparez les meilleures solutions',
          desc: 'Accédez au comparateur Documatch.eu et prenez la meilleure décision avant le 1er septembre 2026.',
        },
      ];
    } else if (currentLang === 'es') {
      return [
        {
          num: '1',
          title: 'Responda a las 20 preguntas',
          desc: 'Perfil, sistema actual, conformidad legal, integraciones ERP y madurez del proyecto — en 5 minutos.',
        },
        {
          num: '2',
          title: 'Introduzca sus datos',
          desc: 'Para recibir su informe personalizado y conectar con las mejores soluciones adaptadas.',
        },
        {
          num: '3',
          title: 'Obtenga su puntuación de madurez',
          desc: 'Puntuación sobre 100, análisis por áreas y recomendaciones prioritarias personalizadas para su perfil.',
        },
        {
          num: '4',
          title: 'Compare las mejores soluciones',
          desc: 'Acceda al comparador Documatch.eu y tome la mejor decisión para su empresa.',
        },
      ];
    } else if (currentLang === 'de') {
      return [
        {
          num: '1',
          title: 'Beantworten Sie 20 Fragen',
          desc: 'Unternehmensprofil, bestehendes DMS, GoBD-Konformität, ERP-Anbindung und Projektstand — in nur 5 Minuten.',
        },
        {
          num: '2',
          title: 'Geben Sie Ihre Kontaktdaten ein',
          desc: 'Um Ihren individuellen Analysebericht zu erhalten und mit den passenden DMS-Anbietern gematcht zu werden.',
        },
        {
          num: '3',
          title: 'Erhalten Sie Ihren Reifegrad-Score',
          desc: 'Score von 100 Punkten, Aufschlüsselung nach Teilbereichen und Handlungsempfehlungen.',
        },
        {
          num: '4',
          title: 'Vergleichen Sie Top-Softwarelösungen',
          desc: 'Nutzen Sie das Documatch.eu Vergleichsportal und treffen Sie die optimale Entscheidung vor den Stichtagen.',
        },
      ];
    } else if (currentLang === 'nl') {
      return [
        {
          num: '1',
          title: 'Beantwoord 20 vragen',
          desc: 'Bedrijfsprofiel, huidig DMS, e-invoicing geschiktheid, ERP-koppeling en projectrijpheid — in 5 minuten.',
        },
        {
          num: '2',
          title: 'Vul uw gegevens in',
          desc: 'Om uw persoonlijke analyserapport te ontvangen en gekoppeld te worden aan de beste DMS-leveranciers.',
        },
        {
          num: '3',
          title: 'Ontvang uw volwassenheidsscore',
          desc: 'Score op 100, analyse per domein en geprioriteerde actiepunten voor uw organisatie.',
        },
        {
          num: '4',
          title: 'Vergelijk de beste DMS-pakketten',
          desc: 'Gebruik de vergelijker van Documatch.eu en maak de beste keuze voor uw organisatie.',
        },
      ];
    } else {
      return [
        {
          num: '1',
          title: 'Answer the 20 questions',
          desc: 'Company profile, existing systems, legal compliance, ERP integrations, and project readiness — in 5 minutes.',
        },
        {
          num: '2',
          title: 'Enter your business details',
          desc: 'To receive your custom audit report and match with the most suitable software solutions.',
        },
        {
          num: '3',
          title: 'Get your maturity score',
          desc: 'Score out of 100, analysis by operational dimension, and prioritized action points.',
        },
        {
          num: '4',
          title: 'Compare the best solutions',
          desc: 'Access the Documatch.eu comparator and make the optimal decision before the compliance deadline.',
        },
      ];
    }
  };

  return (
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-[11px] font-black tracking-widest text-sky-800 bg-[#e0f2fe] rounded-full px-4 py-1.5 mb-4 uppercase">
            {getTagText()}
          </span>
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#122847] leading-tight tracking-tight">
            {getSectionTitle()}
          </h2>
        </div>

        {/* 4 Steps Row with vertical thin divider lines */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-100 max-w-6xl mx-auto">
          {getSteps().map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center px-6 py-6 md:py-2">
              {/* Step Circle (solid dark blue background) */}
              <div className="w-11 h-11 rounded-full bg-[#122847] text-white font-extrabold text-lg flex items-center justify-center mb-5 shadow-sm">
                {step.num}
              </div>
              <h3 className="text-sm font-extrabold text-[#122847] mb-2.5 leading-tight">
                {step.title}
              </h3>
              <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed max-w-[210px]">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
