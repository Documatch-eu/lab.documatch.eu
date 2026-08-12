import React from 'react';
import { Language } from '../types';
import { Shield, Zap, BarChart3, Cloud } from 'lucide-react';

interface WhySectionProps {
  currentLang: Language;
}

export const WhySection: React.FC<WhySectionProps> = ({ currentLang }) => {
  const getTagText = () => {
    if (currentLang === 'fr') return 'POURQUOI CE DIAGNOSTIC\u00A0?';
    if (currentLang === 'es') return '¿POR QUÉ ESTE DIAGNÓSTICO?';
    if (currentLang === 'de') return 'WARUM DIESE DIAGNOSE?';
    if (currentLang === 'nl') return 'WAAROM DEZE ANALYSE?';
    return 'WHY THIS DIAGNOSTIC?';
  };

  const getSectionTitle = () => {
    if (currentLang === 'fr') return 'La réforme documentaire 2026 vous concerne directement';
    if (currentLang === 'es') return 'La reforma documental 2026 le afecta directamente';
    if (currentLang === 'de') return 'Die E-Rechnungspflicht & GoBD betreffen Ihr Unternehmen direkt';
    if (currentLang === 'nl') return 'De verplichte e-invoicing betreft uw organisatie rechtstreeks';
    return 'European document reforms affect your business directly';
  };

  const getSubtitle = () => {
    if (currentLang === 'fr') {
      return "À partir du 1er septembre 2026, la facturation électronique B2B devient obligatoire en France. Les organisations non conformes s'exposent à des pénalités financières et à un risque opérationnel majeur. Êtes-vous prêt\u00A0?";
    } else if (currentLang === 'es') {
      return "A partir del 2026, la facturación electrónica B2B será obligatoria en España (Ley Crea y Crece). Las empresas no preparadas se exponen a sanciones de hasta 10.000 € y riesgos operativos graves. ¿Está preparado?";
    } else if (currentLang === 'de') {
      return "Seit dem 1. Januar 2025 gilt in Deutschland der Vorrang der E-Rechnung im B2B-Bereich. Unternehmen müssen strukturierte E-Rechnungen empfangen und rechtssicher archivieren können. Ist Ihr System bereit?";
    } else if (currentLang === 'nl') {
      return "Met de Europese richtlijnen en Peppol-verplichtingen moeten bedrijven voorbereid zijn op B2B e-invoicing. Niet-conforme systemen riskeren verwerkingsproblemen en boetes. Bent u klaar?";
    } else {
      return "With the B2B e-invoicing laws in Germany (GoBD/Wachstumschancengesetz) and the Netherlands (Peppol), European businesses face strict regulatory and audit-proof workflows. Are you compliant?";
    }
  };

  const getCards = () => {
    if (currentLang === 'fr') {
      return [
        {
          icon: <Shield className="text-[#2563eb]" size={20} />,
          title: 'Conformité réglementaire',
          desc: 'Réforme e-invoicing, PPF, PDP agréés, e-reporting — identifiez vos lacunes avant l\'échéance légale.',
        },
        {
          icon: <Zap className="text-[#2563eb]" size={20} />,
          title: 'Efficacité opérationnelle',
          desc: 'Identifiez les gains de productivité concrets : workflows, LAD/RAD, intégration ERP, recherche documentaire.',
        },
        {
          icon: <BarChart3 className="text-[#2563eb]" size={20} />,
          title: 'Comparaison de solutions',
          desc: '+200 solutions GED évaluées. Recevez un shortlist personnalisé adapté à votre secteur, taille et ERP existant.',
        },
        {
          icon: <Cloud className="text-[#2563eb]" size={20} />,
          title: 'Conseil expert indépendant',
          desc: 'Documatch.eu ne vend aucune solution. Notre rôle est de vous guider vers le meilleur choix pour votre organisation.',
        },
      ];
    } else if (currentLang === 'es') {
      return [
        {
          icon: <Shield className="text-[#2563eb]" size={20} />,
          title: 'Conformidad reglamentaria',
          desc: 'Ley Crea y Crece, FACeB2B, e-factura estructurada — identifique sus brechas antes del vencimiento legal.',
        },
        {
          icon: <Zap className="text-[#2563eb]" size={20} />,
          title: 'Eficiencia operacional',
          desc: 'Identifique ganancias de productividad reales: flujos de aprobación, lectura OCR/LAD, integraciones ERP.',
        },
        {
          icon: <BarChart3 className="text-[#2563eb]" size={20} />,
          title: 'Comparación de soluciones',
          desc: 'Más de 200 soluciones de software evaluadas de forma neutra según su tamaño, sector y sistema contable.',
        },
        {
          icon: <Cloud className="text-[#2563eb]" size={20} />,
          title: 'Asesoramiento independiente',
          desc: 'Documatch.eu es 100% neutral. No vendemos licencias, nuestro único rol es guiarle hacia la mejor herramienta.',
        },
      ];
    } else if (currentLang === 'de') {
      return [
        {
          icon: <Shield className="text-[#2563eb]" size={20} />,
          title: 'Rechtssicherheit & GoBD',
          desc: 'Wachstumschancengesetz, XRechnung, ZUGFeRD, Peppol — decken Sie Compliance-Lücken rechtzeitig auf.',
        },
        {
          icon: <Zap className="text-[#2563eb]" size={20} />,
          title: 'Prozesseffizienz',
          desc: 'Konkrete Produktivitätsgewinne erkennen: Automatische Freigabeworkflows, OCR-Erfassung & ERP-Abgleich.',
        },
        {
          icon: <BarChart3 className="text-[#2563eb]" size={20} />,
          title: 'Neutrale Anbietervergleiche',
          desc: 'Über 200 geprüfte DMS-Lösungen. Erhalten Sie eine auf Ihre Unternehmensgröße abgestimmte Shortlist.',
        },
        {
          icon: <Cloud className="text-[#2563eb]" size={20} />,
          title: 'Unabhängige Beratung',
          desc: 'Documatch.eu ist 100% unabhängig. Wir verkaufen keine Softwarelizenzen, sondern beraten neutral.',
        },
      ];
    } else if (currentLang === 'nl') {
      return [
        {
          icon: <Shield className="text-[#2563eb]" size={20} />,
          title: 'Wettelijke naleving',
          desc: 'Peppol/UBL e-invoicing, eIDAS en e-archivering — identificeer uw knelpunten voor de deadline.',
        },
        {
          icon: <Zap className="text-[#2563eb]" size={20} />,
          title: 'Operationele efficiëntie',
          desc: 'Ontdek directe productiviteitswinst: automatische factuurherkenning, goedkeuringsflows en ERP-koppelingen.',
        },
        {
          icon: <BarChart3 className="text-[#2563eb]" size={20} />,
          title: 'Onafhankelijke vergelijking',
          desc: 'Meer dan 200 DMS-pakketten geanalyseerd. Ontvang een shortlist op maat van uw organisatie en ERP.',
        },
        {
          icon: <Cloud className="text-[#2563eb]" size={20} />,
          title: '100% Onafhankelijk advies',
          desc: 'Documatch.eu verkoopt geen licenties. Ons enige doel is u te begeleiden naar het beste DMS-pakket.',
        },
      ];
    } else {
      return [
        {
          icon: <Shield className="text-[#2563eb]" size={20} />,
          title: 'Regulatory Compliance',
          desc: 'GoBD-certified storage, Peppol XML compliance, and B2B electronic reception — address audit vulnerabilities today.',
        },
        {
          icon: <Zap className="text-[#2563eb]" size={20} />,
          title: 'Operational Efficiency',
          desc: 'Uncover immediate productivity and cost benefits: automated workflows, smart OCR capture, and ERP matching.',
        },
        {
          icon: <BarChart3 className="text-[#2563eb]" size={20} />,
          title: 'Software Comparison',
          desc: 'Over 200 European document systems audited. Receive a neutral vendor shortlist customized for your business size.',
        },
        {
          icon: <Cloud className="text-[#2563eb]" size={20} />,
          title: '100% Independent Advice',
          desc: 'Documatch.eu does not sell licenses or represent any vendors. Our consulting matches you only with optimal tools.',
        },
      ];
    }
  };

  const cards = getCards();

  return (
    <section className="bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-[11px] font-black tracking-widest text-[#0369a1] bg-[#e0f2fe] rounded-full px-4 py-1.5 mb-4 uppercase">
            {getTagText()}
          </span>
          <h2 className="font-sans font-extrabold text-2xl sm:text-3xl text-[#122847] leading-tight tracking-tight mb-4">
            {getSectionTitle()}
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {getSubtitle()}
          </p>
        </div>

        {/* 3 Cards Top + 1 Card Centered Bottom Grid Layout (Matches image precisely!) */}
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Row 1: 3 Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cards.slice(0, 3).map((card, idx) => (
              <div
                key={idx}
                className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Small blue rounded icon container */}
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-5">
                  {card.icon}
                </div>
                <h3 className="text-sm font-extrabold text-[#122847] mb-2 leading-tight">
                  {card.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Row 2: 4th Card Centered */}
          <div className="flex justify-center">
            <div className="w-full md:w-1/3">
              <div
                className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Small blue rounded icon container */}
                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center mb-5">
                  {cards[3].icon}
                </div>
                <h3 className="text-sm font-extrabold text-[#122847] mb-2 leading-tight">
                  {cards[3].title}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
                  {cards[3].desc}
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
