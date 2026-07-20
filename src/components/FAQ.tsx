import React, { useState } from 'react';
import { Language } from '../types';
import { HelpCircle, ChevronDown } from 'lucide-react';

interface FAQProps {
  currentLang: Language;
}

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC<FAQProps> = ({ currentLang }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const getTagText = () => {
    if (currentLang === 'fr') return 'FOIRE AUX QUESTIONS';
    if (currentLang === 'es') return 'PREGUNTAS FRECUENTES';
    return 'FREQUENTLY ASKED QUESTIONS';
  };

  const getSectionTitle = () => {
    if (currentLang === 'fr') return 'Tout comprendre sur la réforme 2026 & Documatch';
    if (currentLang === 'es') return 'Preguntas clave sobre la reforma 2026 y Documatch';
    return 'Key questions about the 2026 reform & Documatch';
  };

  const getSubtitle = () => {
    if (currentLang === 'fr') {
      return 'Retrouvez les réponses indispensables pour aborder sereinement les nouvelles exigences légales de facturation et d’archivage électronique.';
    } else if (currentLang === 'es') {
      return 'Encuentre respuestas rápidas sobre las nuevas exigencias de facturación electrónica obligatoria y cómo prepararse de forma segura.';
    } else {
      return 'Get professional, direct answers on B2B e-invoicing compliance, secure document workflows, and audit-proof storage across Europe.';
    }
  };

  const getFAQItems = (): FAQItem[] => {
    if (currentLang === 'fr') {
      return [
        {
          question: "Qu'est-ce que la réforme réglementaire de 2026 ?",
          answer: "À partir du 1er septembre 2026, la facturation électronique B2B devient obligatoire en France en réception pour toutes les entreprises, et en émission pour les Grandes et ETI (suivies des PME/TPE en 2027). Elle impose l'échange de factures structurées sous formats spécifiques (comme Factur-X, UBL, ou CII) acheminées via l'annuaire national officiel en passant par le PPF (Portail Public de Facturation) ou des PDP (Plateformes de Dématérialisation Partenaires agréées)."
        },
        {
          question: "Pourquoi est-il crucial de faire un audit de maturité GED maintenant ?",
          answer: "L'obligation légale n'est que la partie visible de l'iceberg. Intégrer l'e-invoicing nécessite d'adapter en profondeur votre outil de Gestion Électronique des Documents (GED) et votre comptabilité. Cet audit évalue si vos outils actuels savent lire automatiquement les données (OCR/LAD), gérer des workflows d'approbation fluides, s'interfacer avec votre ERP, et archiver légalement à valeur probante. En anticipant aujourd'hui, vous évitez la panique de dernière minute."
        },
        {
          question: "Qu'est-ce que le score de maturité Documatch Lab et comment m'aide-t-il ?",
          answer: "Le score (sur une échelle de 0 à 100) est un indicateur mathématique de préparation technique développé par nos experts. En répondant aux 10 questions concrètes de l'audit, notre algorithme classe votre maturité (Faible, Intermédiaire, Avancée), met en évidence vos vulnérabilités de conformité (GoBD, PPF/PDP, archivage sécurisé), et vous délivre une synthèse personnalisée assortie d'un plan d'actions clair."
        },
        {
          question: "Ce diagnostic est-il réellement gratuit et neutre ?",
          answer: "Oui, à 100%. Documatch.eu est un service de conseil totalement indépendant et objectif. Nous ne commercialisons aucun logiciel et nous ne percevons aucun droit de licence ou commission des éditeurs de logiciels. Notre unique rôle est d'analyser vos besoins et de vous recommander de manière impartiale la solution la plus compatible parmi plus de 200 progiciels évalués sur le marché."
        },
        {
          question: "Quels sont les risques et sanctions encourus en cas de non-conformité ?",
          answer: "La non-conformité réglementaire s'accompagne d'un lourd tribut : amendes administratives en France (15 € par facture non conforme, plafonné à 15 000 € par an), pénalités financières en Espagne (jusqu'à 10 000 € sous la loi Crea y Crece), perte du droit à déduction de la TVA, ou blocage total de l'échange commercial avec vos partenaires clés. De plus, un système GED inefficace entraîne des retards de paiement de vos factures et nuit à votre trésorerie."
        }
      ];
    } else if (currentLang === 'es') {
      return [
        {
          question: "¿En qué consiste la reforma reguladora de 2026?",
          answer: "A partir de 2026, la facturación electrónica obligatoria en transacciones comerciales B2B entra en vigor en España impulsada por el reglamento de la Ley Crea y Crece. Esto obliga a todas las empresas y trabajadores autónomos a emitir, transmitir y recibir sus facturas de forma 100% digital en formatos informáticos estructurados (como Facturae, UBL, etc.) garantizando la interconexión técnica gratuita entre plataformas autorizadas."
        },
        {
          question: "¿Por qué es necesario realizar un diagnóstico de madurez GED ahora?",
          answer: "Adoptar la facturación electrónica no consiste solo en enviar un PDF por correo. Requiere una adecuada Gestión Electrónica de Documentos (GED) para digitalizar los flujos administrativos. El diagnóstico evalúa si sus sistemas son capaces de leer automáticamente los campos con OCR, procesar aprobaciones internas de pagos, sincronizar datos bidireccionalmente con su software ERP o contable actual, y conservar de forma segura el historial en archivos inalterables."
        },
        {
          question: "¿Cómo funciona el score de madurez de Documatch Lab?",
          answer: "El score obtenido (de 0 a 100) mide cuantitativamente el nivel de integración técnica y de cumplimiento normativo de su negocio. Basado en 10 preguntas específicas sobre su organización de archivos, nuestro algoritmo de auditoría clasifica su estado operativo (Bajo, Medio, Alto) y genera de inmediato un informe de madurez con pautas para actualizar sus flujos documentales."
        },
        {
          question: "¿Es este servicio verdaderamente gratuito y neutral?",
          answer: "Sí, es completamente gratuito y sin ningún compromiso comercial. Documatch.eu opera como un tercero neutral en el mercado de software. No vendemos licencias, no somos distribuidores y no favorecemos a ningún fabricante. Ofrecemos recomendaciones de selección de software transparentes y objetivas que evalúan el ecosistema de más de 200 herramientas del mercado europeo."
        },
        {
          question: "¿Cuáles son las sanciones y riesgos si mi empresa no se adapta?",
          answer: "La normativa española de la Ley Crea y Crece establece sanciones económicas estrictas de hasta 10.000 € para aquellas empresas que no ofrezcan a sus clientes la recepción de facturas electrónicas o no mantengan el acceso a ellas durante 4 años. Operativamente, también se arriesga a retrasos en cobros de clientes, fallos de auditoría de Hacienda, y exclusión de licitaciones o contratos públicos."
        }
      ];
    } else {
      return [
        {
          question: "What is the 2026 B2B e-invoicing and document reform?",
          answer: "European nations are actively enforcing mandatory digital business transactions. Major regulations take effect in France from September 2026 (compulsory B2B reception for all businesses and issuance via PPF or certified PDP platforms) and in Spain through the Crea y Crece law. Together with Germany's GoBD requirements and the Dutch Peppol standards, companies are legally required to process structured, machine-readable XML invoice formats (such as Factur-X, UBL, or CII) instead of flat PDF email attachments."
        },
        {
          question: "Why is a document management (DMS) maturity check crucial today?",
          answer: "A digital mandate affects your entire accounting workflow. To prepare, organizations must upgrade their Document Management System (DMS) to process incoming electronic XML datasets automatically. Our check evaluates if your existing tech stack features accurate data ingestion (OCR), compliant multi-level authorization workflows, native interfaces to your ledger or ERP, and audit-proof compliance archiving."
        },
        {
          question: "What is the Documatch Lab maturity score and how does it help?",
          answer: "The score (ranging from 0 to 100) represents an algorithmic index of your operational and technical compliance readiness. By grading your answers across 10 vital workflow pillars, the report highlights potential structural vulnerabilities, maps your preparedness tier (Low, Intermediate, Advanced), and yields a customized action plan with concrete software requirements."
        },
        {
          question: "Is this diagnostic assessment truly free and independent?",
          answer: "Yes, completely. Documatch.eu is a 100% independent consulting guide. We do not sell software packages, do not work as certified resellers, and do not receive commission kickbacks. Our sole objective is to provide a reliable, objective filter to help you discover the ideal Document Management solution from more than 200 major tools analyzed in our European index."
        },
        {
          question: "What are the penalties and financial risks of non-compliance?",
          answer: "Failing to establish compliant pipelines can lead to catastrophic business disruption. Penalties include severe state fines (up to €10,000 in Spain, or €15 per-invoice fines in France), loss of business tax deductions, and total exclusion from procurement bids. Furthermore, outdated, paper-reliant workflows invite manual errors, slower payments, and direct cash flow problems."
        }
      ];
    }
  };

  const faqItems = getFAQItems();

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq-section" className="bg-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-100 print:hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
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

        {/* Accordions List */}
        <div className="space-y-4 max-w-3xl mx-auto" id="faq-accordion-container">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div 
                key={index} 
                className={`border rounded-xl transition-all duration-300 ${
                  isOpen 
                    ? 'border-[#2563eb]/30 bg-blue-50/10 shadow-sm' 
                    : 'border-slate-100 bg-white hover:bg-slate-50/50'
                }`}
                id={`faq-item-${index}`}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full flex items-center justify-between gap-4 p-5 text-left cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-xl"
                  aria-expanded={isOpen}
                  id={`faq-btn-${index}`}
                >
                  <div className="flex items-start gap-3.5">
                    <HelpCircle className={`mt-0.5 shrink-0 ${isOpen ? 'text-[#2563eb]' : 'text-slate-400'}`} size={18} />
                    <span className={`text-xs sm:text-sm font-extrabold leading-snug font-sans transition-colors ${
                      isOpen ? 'text-[#1d4ed8]' : 'text-[#122847]'
                    }`}>
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown 
                    size={16} 
                    className={`text-slate-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 text-[#2563eb]' : ''
                    }`} 
                  />
                </button>

                {/* Accordion Content */}
                <div 
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? 'max-h-[500px] border-t border-slate-100/50' : 'max-h-0'
                  }`}
                  id={`faq-content-${index}`}
                >
                  <div className="p-5 text-[11px] sm:text-xs text-slate-600 leading-relaxed font-sans font-normal">
                    {item.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
