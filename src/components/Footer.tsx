import React from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ShieldAlert, Info, ShieldCheck, HelpCircle, Mail } from 'lucide-react';
import { Logo } from './Logo';

interface FooterProps {
  currentLang: Language;
  onOpenModal: (id: string) => void;
  currentCountry: string;
  onCountryChange: (countryCode: string, lang: Language) => void;
}

export const Footer: React.FC<FooterProps> = ({
  currentLang,
  onOpenModal,
  currentCountry,
  onCountryChange,
}) => {
  return (
    <footer className="bg-[#0d1f33] text-white/50 py-12 px-4 sm:px-6 lg:px-8 text-xs border-t border-white/5 print:hidden">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-white/5">
          {/* Brand Col */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Logo size="sm" />
              <div className="flex flex-col items-start justify-center">
                <span className="font-sans font-bold text-2xl text-[#fbbf24] leading-none tracking-tight">
                  LAB
                </span>
                <span className="text-[12px] font-medium text-white leading-none mt-1">
                  by Documatch
                </span>
              </div>
            </div>
            <p className="text-white/40 leading-relaxed max-w-xs">
              {TRANSLATIONS['footer.brand.desc'][currentLang]}
            </p>
          </div>

          {/* Links Col 1: Reform */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold tracking-widest text-white/30 uppercase">
              {currentLang === 'fr' ? 'Réforme 2026' : currentLang === 'es' ? 'Reforma 2026' : currentLang === 'de' ? 'E-Rechnung 2025/2026' : currentLang === 'nl' ? 'E-Invoicing 2026' : 'Compliance 2026'}
            </h4>
            <ul className="space-y-2.5">
              {currentLang === 'de' ? (
                <>
                  <li>
                    <a
                      href="https://www.e-rechnung-bund.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLinkIcon />
                      <span>E-Rechnung Bund (BMF)</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.kos-it.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLinkIcon />
                      <span>KoSIT Standards (XRechnung)</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.bundesfinanzministerium.de"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLinkIcon />
                      <span>Wachstumschancengesetz</span>
                    </a>
                  </li>
                </>
              ) : currentLang === 'nl' ? (
                <>
                  <li>
                    <a
                      href="https://www.rijksoverheid.nl/onderwerpen/e-factureren"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLinkIcon />
                      <span>E-factureren Rijksoverheid</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.logius.nl/diensten/peppol"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLinkIcon />
                      <span>Logius Peppol Autoriteit</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.helpdesk-efactureren.nl"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLinkIcon />
                      <span>Helpdesk E-factureren NL</span>
                    </a>
                  </li>
                </>
              ) : currentLang === 'es' ? (
                <>
                  <li>
                    <a
                      href="https://www.boe.es/buscar/act.php?id=BOE-A-2022-15818"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLinkIcon />
                      <span>E-factura (Ley Crea y Crece)</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.facturae.gob.es"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLinkIcon />
                      <span>Portal Facturae</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.agenciatributaria.es"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLinkIcon />
                      <span>Agencia Tributaria (AEAT)</span>
                    </a>
                  </li>
                </>
              ) : currentLang === 'fr' ? (
                <>
                  <li>
                    <a
                      href="https://www.impots.gouv.fr/portail/node/13464"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLinkIcon />
                      <span>E-invoicing France</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.impots.gouv.fr/facturation-electronique-et-plateformes-partenaires"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLinkIcon />
                      <span>Portail PPF</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.impots.gouv.fr/je-consulte-la-liste-des-plateformes-agreees"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLinkIcon />
                      <span>PDP Agréés</span>
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <a
                      href="https://ec.europa.eu/digital-building-blocks/sites/display/DIGITAL/eInvoicing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLinkIcon />
                      <span>EU E-Invoicing Directive</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://peppol.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLinkIcon />
                      <span>OpenPEPPOL Association</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://ec.europa.eu"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors flex items-center gap-1.5"
                    >
                      <ExternalLinkIcon />
                      <span>EU Digital Standards</span>
                    </a>
                  </li>
                </>
              )}
              <li>
                <button
                  onClick={() => onOpenModal('guide-modal')}
                  className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer font-sans text-left flex items-center gap-1.5"
                >
                  <Info size={12} className="text-[#3b82f6]" />
                  <span>
                    {currentLang === 'fr'
                      ? 'Guide conformité'
                      : currentLang === 'es'
                      ? 'Guía de conformidad'
                      : currentLang === 'de'
                      ? 'Compliance-Leitfaden'
                      : currentLang === 'nl'
                      ? 'Compliancegids'
                      : 'Compliance Guide'}
                  </span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenModal('faq-modal')}
                  className="hover:text-white transition-colors bg-transparent border-none p-0 cursor-pointer font-sans text-left flex items-center gap-1.5"
                >
                  <HelpCircle size={12} className="text-[#3b82f6]" />
                  <span>
                    {currentLang === 'fr'
                      ? 'Questions fréquentes (FAQ)'
                      : currentLang === 'es'
                      ? 'Preguntas frecuentes (FAQ)'
                      : currentLang === 'de'
                      ? 'Häufige Fragen (FAQ)'
                      : currentLang === 'nl'
                      ? 'Veelgestelde vragen (FAQ)'
                      : 'Frequently Asked Questions (FAQ)'}
                  </span>
                </button>
              </li>
            </ul>
          </div>

          {/* Links Col 2: Security & Contact */}
          <div className="space-y-4">
            <h4 className="text-[10px] font-bold tracking-widest text-white/30 uppercase">
              {currentLang === 'fr' ? 'Accompagnement' : currentLang === 'es' ? 'Soporte' : currentLang === 'de' ? 'Beratung & Support' : currentLang === 'nl' ? 'Advies & Ondersteuning' : 'Advisory'}
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:contact@documatch.eu" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Mail size={12} className="text-[#3b82f6]" />
                  <span>contact@documatch.eu</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@documatch.eu" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <Mail size={12} className="text-[#3b82f6]" />
                  <span>info@documatch.eu</span>
                </a>
              </li>
              <li>
                <a href="https://www.documatch.eu" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors flex items-center gap-1.5">
                  <ExternalLinkIcon />
                  <span>www.documatch.eu</span>
                </a>
              </li>
            </ul>
            <div className="pt-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-white/80">
                <ShieldCheck size={12} className="text-emerald-500" />
                <span className="font-semibold text-[10px]">SSL Encrypted / Secure</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex gap-4 flex-wrap justify-center text-white/40">
            <button onClick={() => onOpenModal('mentions-modal')} className="hover:text-white bg-transparent border-none p-0 cursor-pointer text-xs font-sans">
              {TRANSLATIONS['footer.legal.mentions'][currentLang]}
            </button>
            <button onClick={() => onOpenModal('rgpd-modal')} className="hover:text-white bg-transparent border-none p-0 cursor-pointer text-xs font-sans">
              {TRANSLATIONS['footer.legal.privacy'][currentLang]}
            </button>
            <button onClick={() => onOpenModal('cgu-modal')} className="hover:text-white bg-transparent border-none p-0 cursor-pointer text-xs font-sans">
              {TRANSLATIONS['footer.legal.cgu'][currentLang]}
            </button>
            <button onClick={() => onOpenModal('cookies-modal')} className="hover:text-white bg-transparent border-none p-0 cursor-pointer text-xs font-sans">
              {TRANSLATIONS['footer.legal.cookies'][currentLang]}
            </button>
            <button onClick={() => onOpenModal('sitemap-modal')} className="hover:text-white bg-transparent border-none p-0 cursor-pointer text-xs font-sans">
              {TRANSLATIONS['footer.legal.sitemap'][currentLang]}
            </button>
            <a href="/sitemap.xml" target="_blank" rel="noopener noreferrer" className="hover:text-blue-300 text-blue-400 bg-transparent border-none p-0 cursor-pointer text-xs font-sans font-bold flex items-center gap-1">
              <span>XML</span>
            </a>
          </div>

          <p className="text-white/20 text-[11px] order-last md:order-none text-center md:text-right font-sans">
            © 2026 Documatch.eu — {currentLang === 'fr' ? 'Tous droits réservés.' : currentLang === 'es' ? 'Todos los derechos reservados.' : currentLang === 'de' ? 'Alle Rechte vorbehalten.' : currentLang === 'nl' ? 'Alle rechten voorbehouden.' : 'All rights reserved.'}
          </p>

          <div className="flex gap-2 flex-wrap justify-center items-center text-[10px] font-semibold uppercase">
            {[
              { code: 'fr', flag: '🇫🇷', label: { fr: 'France', es: 'Francia', en: 'France', de: 'Frankreich', nl: 'Frankrijk' }, lang: 'fr' as Language },
              { code: 'es', flag: '🇪🇸', label: { fr: 'Espagne', es: 'España', en: 'Spain', de: 'Spanien', nl: 'Spanje' }, lang: 'es' as Language },
              { code: 'be', flag: '🇧🇪', label: { fr: 'Belgique', es: 'Bélgica', en: 'Belgium', de: 'Belgien', nl: 'België' }, lang: 'fr' as Language },
              { code: 'ch', flag: '🇨🇭', label: { fr: 'Suisse', es: 'Suiza', en: 'Switzerland', de: 'Schweiz', nl: 'Zwitserland' }, lang: 'fr' as Language },
              { code: 'lu', flag: '🇱🇺', label: { fr: 'Luxembourg', es: 'Luxemburgo', en: 'Luxembourg', de: 'Luxemburg', nl: 'Luxemburg' }, lang: 'fr' as Language },
              { code: 'de', flag: '🇩🇪', label: { fr: 'Allemagne', es: 'Alemania', en: 'Germany', de: 'Deutschland', nl: 'Duitsland' }, lang: 'de' as Language },
              { code: 'nl', flag: '🇳🇱', label: { fr: 'Pays-Bas', es: 'Países Bajos', en: 'Netherlands', de: 'Niederlande', nl: 'Nederland' }, lang: 'nl' as Language },
            ].map((country) => {
              const isSelected = currentCountry === country.code;
              return (
                <button
                  key={country.code}
                  onClick={() => onCountryChange(country.code, country.lang)}
                  className={`transition-all duration-150 px-2.5 py-1 rounded-full text-[10.5px] font-bold flex items-center gap-1.5 cursor-pointer border ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-500 shadow-sm shadow-blue-500/20'
                      : 'bg-white/5 text-white/50 border-white/5 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <span className="text-xs select-none">{country.flag}</span>
                  <span>{country.label[currentLang]}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </footer>
  );
};

const ExternalLinkIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
    <polyline points="15 3 21 3 21 9"></polyline>
    <line x1="10" y1="14" x2="21" y2="3"></line>
  </svg>
);
