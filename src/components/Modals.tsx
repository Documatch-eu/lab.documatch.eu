import React, { useState, useMemo } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import {
  HelpCircle,
  ChevronDown,
  Search,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  FileText,
  Scale,
  Layers,
  Clock,
  ArrowRight,
  X,
  CheckCircle2,
} from 'lucide-react';

interface ModalsProps {
  currentLang: Language;
  activeModal: string | null;
  onCloseModal: () => void;
  onStartQuizFromGuide: () => void;
}

export const Modals: React.FC<ModalsProps> = ({
  currentLang,
  activeModal,
  onCloseModal,
  onStartQuizFromGuide,
}) => {
  const [faqOpenIndex, setFaqOpenIndex] = useState<number | null>(null);
  const [faqCategory, setFaqCategory] = useState<string>('all');
  const [faqSearch, setFaqSearch] = useState<string>('');

  if (!activeModal) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return (
    <>
      {/* =====================================================
           GUIDE MODAL
         ===================================================== */}
      {activeModal === 'guide-modal' && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-[100] bg-black/60 overflow-y-auto p-4 flex items-start justify-center backdrop-blur-sm"
        >
          <div className="relative max-w-4xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl my-8 animate-fade-in">
            {/* Close button */}
            <button
              onClick={onCloseModal}
              className="absolute top-4 right-4 w-9 h-9 bg-slate-100 hover:bg-slate-200 border-none rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 text-lg font-bold transition-all cursor-pointer z-50"
            >
              ✕
            </button>

            {/* Deadline Band */}
            <div className="bg-[#f59e0b] px-6 py-3 text-center text-xs sm:text-sm font-bold text-[#0d1f33]">
              {currentLang === 'fr' && (
                <span>⚡ Réforme e-Invoicing 2026 : Réception électronique obligatoire pour toutes les entreprises françaises au <strong>1er septembre 2026</strong></span>
              )}
              {currentLang === 'es' && (
                <span>⚡ Ley Crea y Crece España : Facturación electrónica obligatoria para PYMES y autónomos desde <strong>enero de 2026</strong></span>
              )}
              {currentLang === 'de' && (
                <span>⚡ E-Rechnungspflicht Deutschland : Verpflichtender B2B-Empfang seit <strong>1. Januar 2025</strong> (Wachstumschancengesetz)</span>
              )}
              {currentLang === 'nl' && (
                <span>⚡ Verplichte E-invoicing Nederland : B2B-ontvangst via Peppol/UBL geharmoniseerd voor <strong>2026</strong></span>
              )}
              {(currentLang === 'en' || (!['fr', 'es', 'de', 'nl'].includes(currentLang))) && (
                <span>⚡ GoBD &amp; Peppol Compliance : Mandatory B2B e-invoice reception starts in Germany on <strong>Jan 1, 2025</strong> and aligns with Netherlands standard</span>
              )}
            </div>

            {/* Header */}
            <div 
              style={{
                backgroundColor: '#0d1f33',
                backgroundImage: 'linear-gradient(to right, #0d1f33, #1e3a5f)',
              }}
              className="p-8 text-white relative shadow-md"
            >
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px]" />
              <div className="relative z-10 max-w-2xl">
                <span className="inline-block text-[10px] font-extrabold tracking-widest text-[#fbbf24] uppercase bg-amber-500/10 border border-amber-500/20 rounded px-2.5 py-1 mb-3">
                  {currentLang === 'fr' ? 'GUIDE CONFORMITÉ' : currentLang === 'es' ? 'GUÍA CONFORMIDAD' : currentLang === 'de' ? 'RECHTSKONFORMITÄTS-LEITFADEN' : currentLang === 'nl' ? 'NALEVINGSGIDS' : 'EU COMPLIANCE GUIDE'}
                </span>
                <h2 className="text-xl sm:text-3xl font-extrabold leading-tight">
                  {currentLang === 'fr' && 'Maturité GED & Facturation Électronique 2026'}
                  {currentLang === 'es' && 'Madurez GED y Facturación Electrónica B2B'}
                  {currentLang === 'de' && 'DMS-Reifegrad & E-Rechnungspflicht GoBD'}
                  {currentLang === 'nl' && 'DMS Volwassenheid & E-Invoicing Regelgeving'}
                  {(currentLang === 'en' || (!['fr', 'es', 'de', 'nl'].includes(currentLang))) && 'DMS Archiving & B2B e-Invoicing Regulations'}
                </h2>
                <p className="text-xs sm:text-sm text-white/60 mt-2 max-w-lg leading-relaxed">
                  {currentLang === 'fr' && 'Ce guide pratique explique les implications techniques, réglementaires et organisationnelles de la dématérialisation fiscale pour votre structure.'}
                  {currentLang === 'es' && 'Esta guía práctica detalla las implicaciones técnicas y de cumplimiento de la facturación electrónica B2B.'}
                  {currentLang === 'de' && 'Dieser Leitfaden erklärt die technischen und rechtlichen Anforderungen der E-Rechnungspflicht und GoBD-Archivierung für Ihr Unternehmen.'}
                  {currentLang === 'nl' && 'Deze gids legt de technische en wettelijke vereisten uit voor e-invoicing, Peppol en digitale archivering.'}
                  {(currentLang === 'en' || (!['fr', 'es', 'de', 'nl'].includes(currentLang))) && 'A comprehensive reference guide outlining local European tax audits (GoBD), secure storage retention, and Peppol e-invoice pipelines.'}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto max-h-[60vh] text-slate-700 no-scrollbar">
              {currentLang === 'fr' ? (
                <>
                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">1. Comprendre la Réforme e-Invoicing 2026</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      La loi de finances française généralise la facturation dématérialisée entre professionnels assujettis à la TVA. À compter du <strong>1er septembre 2026</strong>, vous devez obligatoirement être en mesure de <strong>recevoir</strong> des factures électroniques (Factur-X, UBL, CII) de vos fournisseurs. L'obligation d'émission entrera en vigueur au 1er septembre 2027.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">2. PPF vs PDP : quel raccordement choisir\u00a0?</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      Deux options coexistent pour échanger vos factures :
                    </p>
                    <ul className="text-xs sm:text-sm space-y-2 pl-4 list-disc text-slate-500">
                      <li><strong>Le Portail Public (PPF) :</strong> service gratuit de l'État, adapté aux petits volumes mais sans connecteur ERP avancé (ressaisie manuelle).</li>
                      <li><strong>Les Plateformes Partenaires (PDP) :</strong> opérateurs privés agréés par l'État, offrant des liaisons API directes avec vos logiciels de comptabilité, l'indexation LAD/RAD intelligente, et des circuits d'approbation.</li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">3. Les exigences de l'archivage légal (NF Z42-020)</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      Conserver un PDF simple sur un disque dur local n'a aucune valeur juridique en cas de contrôle fiscal. L'intégrité de vos factures et contrats doit être scellée de manière inaltérable (WORM) au sein d'un Coffre-Fort Électronique (CFE) certifié NF Z42-020 pendant une durée légale de 10 ans.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">4. Cycle de vie de la facture et statuts de traitement</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      La réforme introduit l'obligation de notifier l'administration fiscale de l'avancement du traitement d'une facture. Quatre statuts minimaux deviennent obligatoires : <strong>Déposée</strong>, <strong>Rejetée</strong> (si non-conforme), <strong>Refusée</strong> (par le destinataire), et <strong>Encaissée</strong> (pour les prestations de services). Votre outil GED doit pouvoir synchroniser ces statuts en temps réel.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">5. Les sanctions et risques de non-conformité</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      Toute infraction à l'obligation de facturation électronique ou de télétransmission pourra faire l'objet d'une amende de 15 € par facture (plafonnée à 15 000 € par an). Plus grave encore, le non-respect de ces formats de fichiers normalisés peut mener à la perte du droit à déduction de la TVA et à un rejet global de la comptabilité en cas de contrôle fiscal.
                    </p>
                  </div>
                </>
              ) : currentLang === 'es' ? (
                <>
                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">1. Ley Crea y Crece en España</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      La Ley 18/2022 obliga a todas las relaciones comerciales B2B en España a usar facturación electrónica. Las empresas con facturación anual superior a 8 millones de euros deben implementarla antes de <strong>julio de 2025</strong>. El resto de PYMES y autónomos tienen de plazo hasta <strong>enero de 2026</strong>.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">2. Formato FacturaE y Conexión AEAT</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      El formato estándar en España es el XML firmado digitalmente (FacturaE). Es necesario registrarse en el sistema público FACeB2B o bien contratar una plataforma de servicios de facturación (ESF) autorizada por la AEAT para garantizar la interoperabilidad de las facturas.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">3. Trazabilidad, eIDAS y RGPD</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      Para evitar sanciones de hasta 10.000 €, su sistema documental debe garantizar la firma cualificada según el reglamento eIDAS, mantener un histórico de accesos y una política de conservación inalterable de los archivos contables.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">4. Ciclo de vida obligatorio de los estados de factura</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      La normativa española exige reportar de forma obligatoria los diferentes estados por los que pasa una factura. Los dos estados mínimos a comunicar son la <strong>aceptación o rechazo</strong> comercial y la <strong>fecha de pago efectivo</strong>. Esta información debe remitirse en un plazo máximo de 4 días naturales desde que ocurre el evento para luchar eficazmente contra la morosidad comercial.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">5. Régimen sancionador por incumplimiento</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      No facilitar la descarga o acceso a las facturas electrónicas a tus clientes, o bien impedir que los autónomos y PYMES accedan de forma gratuita a ellas durante un periodo de 3 o 4 años, conlleva infracciones administrativas con sanciones económicas de hasta 10.000 €. Asimismo, imposibilita el acceso a subvenciones y ayudas públicas estatales.
                    </p>
                  </div>
                </>
              ) : currentLang === 'de' ? (
                <>
                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">1. E-Rechnungspflicht ab 2025 (Wachstumschancengesetz)</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      Seit dem <strong>1. Januar 2025</strong> gilt in Deutschland die Verpflichtung zum Empfang von e-Rechnungen im B2B-Bereich. Alle in Deutschland ansässigen Unternehmen müssen strukturierte elektronische Rechnungen gemäß der europäischen Norm EN 16931 empfangen und verarbeiten können.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">2. Formate: XRechnung &amp; ZUGFeRD</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      Die zugelassenen Standardformate sind reine XML-Dateien (<strong>XRechnung</strong>) sowie hybride Formate (<strong>ZUGFeRD</strong> ab Version 2.0.1 / Factur-X), die eine visuelle PDF-Datei mit eingebettetem XML-Datensatz kombinieren.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">3. GoBD-Konformität &amp; Revisionssichere Archivierung</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      Nach den GoBD müssen E-Rechnungen im Originalformat unveränderbar und revisionssicher für 8 bis 10 Jahre archiviert werden. Das bloße Ausdrucken oder Ablegen in normalen Ordnerstrukturen ist unzulässig.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">4. Anbindung an ERP- &amp; Buchhaltungssysteme</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      Ein modernes Dokumentenmanagementsystem (DMS) schließt die Lücke zwischen E-Mail-Eingang, OCR-Erfassung, Freigabeworkflow und automatischer Verbuchung in Systemen wie SAP, DATEV, Dynamics 365 oder Haufe Lexware.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">5. Risiken bei Nicht-Einhaltung</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      Fehlt eine GoBD-konforme Archivierung oder wird das E-Rechnungsformat verworfen, drohen bei Betriebsprüfungen durch das Finanzamt der Verlust des Vorsteuerabzugs sowie Hinzuschätzungen der Umsätze.
                    </p>
                  </div>
                </>
              ) : currentLang === 'nl' ? (
                <>
                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">1. Verplichte E-invoicing in Nederland</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      Binnen de Europese Unie en Nederland wordt B2B e-invoicing via het Peppol-netwerk stapsgewijs de norm. Overheden verplichten gestructureerde facturatie al langer, en B2B volgt sneltreinvaart conform de Europese ViDA-richtlijn.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">2. Het Peppol-netwerk &amp; NLius Standaard</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      Elektronische facturen worden veilig uitgewisseld via gecertificeerde Peppol Access Points in het UBL/NLius formaat. Gewone e-mails met PDF-bijlagen verdwijnen geleidelijk omdat deze niet automatisch en foutloos door boekhoudpakketten kunnen worden verwerkt.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">3. Wettelijke Bewaarplicht &amp; Belastingdienst</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      Volgens de Nederlandse Belastingdienst geldt een wettelijke bewaarplicht van 7 jaar (10 jaar voor onroerende zaken) voor alle digitale facturen. Deze moeten in hun oorspronkelijke elektronische vorm bewaard blijven.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">4. Integratie met ERP- &amp; Boekhoudsoftware</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      Een geavanceerd DMS (Document Management System) koppelt uw Peppol Access Point rechtstreeks aan ERP-systemen zoals Exact, AFAS, SAP, Visma of Twinfield.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">5. Risico's en Boetes bij Niet-Naleving</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      Het niet voldoen aan de eisen van digitale dossiervoering en e-invoicing leidt tot verwerkingsfouten, vertraagde betalingen, verlies van BTW-aftrekrecht en boetes bij fiscale controles.
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">1. Germany (Wachstumschancengesetz &amp; GoBD)</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      The German Growth Opportunities Act mandates that all B2B companies must be capable of <strong>receiving compliant structured e-invoices</strong> starting <strong>January 1, 2025</strong>. Supported formats include EN 16931-compliant files like XRechnung or ZUGFeRD. Additionally, fiscal compliance requires audit-proof document storage (GoBD guidelines), ensuring tax-relevant documents cannot be altered or deleted.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">2. Netherlands (Peppol &amp; NLius)</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      While B2G e-invoicing is already fully mandatory, the Dutch B2B market standardizes on the secure <strong>Peppol network</strong> using the <strong>NLius specification</strong>. Invoices must be archived securely for 7 years (10 years for immovable property) under Belastingdienst requirements.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">3. Integrated DMS as the Key to EU ViDA</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      The EU's ViDA (VAT in the Digital Age) initiative harmonizes real-time transaction reporting. A modern DMS, integrated with your central ERP, bridges this gap by automatically parsing incoming XML files, logging access, applying digital signatures, and storing data securely without manual overhead.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">4. Hybrid Formats &amp; Semantic Standards (EN 16931)</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      To facilitate transition, European regulations push for hybrid formats like <strong>Factur-X</strong> or <strong>ZUGFeRD</strong>. These consist of a standard visual PDF containing an embedded machine-readable XML schema. This ensures human operators can quickly view documents while software engines instantly process structured accounting lines without OCR errors.
                    </p>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-extrabold text-[#1e3a5f] text-base border-b pb-2">5. Severe Financial &amp; Operational Penalties</h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-slate-500">
                      Failing to receive or archive digital files according to country-specific guidelines (such as GoBD in Germany or NF standards in France) can lead to retroactive tax reassessments. Tax authorities can discard your entire ledger and estimate taxable corporate income dynamically, alongside enforcing heavy monetary fines and invalidating client VAT deductions.
                    </p>
                  </div>
                </>
              )}

              {/* Action Button inside Guide */}
              <div className="pt-6 border-t flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6">
                <span className="text-xs text-slate-500 max-w-sm text-center sm:text-left leading-normal">
                  {currentLang === 'fr' && 'Vous souhaitez tester la maturité documentaire de votre entreprise face à ces enjeux ?'}
                  {currentLang === 'es' && '¿Quiere comprobar el nivel de preparación de su empresa ante estas leyes?'}
                  {currentLang === 'en' && 'Want to test your company\'s technical readiness against these EU requirements?'}
                </span>
                <button
                  onClick={() => {
                    onCloseModal();
                    onStartQuizFromGuide();
                  }}
                  className="bg-[#2563eb] hover:bg-[#1e3a5f] text-white text-xs font-bold px-6 py-3 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                >
                  {currentLang === 'fr' ? 'Démarrer le diagnostic' : currentLang === 'es' ? 'Iniciar diagnóstico' : 'Start Free Audit'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
           RGPD / PRIVACY MODAL
         ===================================================== */}
      {activeModal === 'rgpd-modal' && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-[100] bg-black/60 overflow-y-auto p-4 flex items-start justify-center backdrop-blur-sm"
        >
          <div className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl my-8 animate-fade-in">
            <button
              onClick={onCloseModal}
              className="absolute top-4 right-4 w-9 h-9 bg-slate-100 hover:bg-slate-200 border-none rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 text-lg font-bold transition-all cursor-pointer z-50"
            >
              ✕
            </button>

            <div className="p-6 sm:p-8 space-y-4 text-slate-700">
              <h2 className="font-sans font-extrabold text-xl text-[#1e3a5f] border-b pb-3">
                {currentLang === 'fr' ? 'Politique de confidentialité' : currentLang === 'es' ? 'Política de Privacidad' : 'Privacy Policy'}
              </h2>

              <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-500 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
                {currentLang === 'fr' ? (
                  <>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">1. Responsable du traitement</h4>
                      <p>Documatch.eu — <a href="mailto:info@documatch.eu" className="text-blue-600 font-semibold hover:underline">info@documatch.eu</a> — Espagne (opérant en France, Espagne, Belgique, Suisse, Luxembourg et Royaume-Uni).</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">2. Données collectées</h4>
                      <p>Prénom, nom, email professionnel, société, fonction, téléphone (optionnel), pays. Également les réponses au questionnaire de diagnostic, traitées de façon anonymisée pour des statistiques sectorielles.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">3. Finalités du traitement</h4>
                      <ul className="list-disc pl-5 space-y-0.5">
                        <li>Envoi du rapport de maturité GED personnalisé</li>
                        <li>Accompagnement dans la sélection d'une solution GED adaptée</li>
                        <li>Communication commerciale de Documatch.eu (avec possibilité de désinscription)</li>
                        <li>Amélioration du service de comparaison</li>
                      </ul>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">4. Base légale</h4>
                      <p>Consentement explicite (Art. 6.1.a RGPD) et intérêt légitime pour la prospection B2B (Art. 6.1.f RGPD).</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">5. Conservation des données</h4>
                      <p>3 ans à compter du dernier contact, puis archivage ou suppression.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">6. Vos droits</h4>
                      <p>Accès, rectification, suppression, opposition, portabilité — exercez vos droits à <a href="mailto:info@documatch.eu" className="text-blue-600 font-semibold hover:underline">info@documatch.eu</a>. Vous pouvez également introduire une réclamation auprès de la CNIL (France) ou de l'AEPD (Espagne).</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">7. Transferts</h4>
                      <p>Vos données ne sont pas transmises à des tiers à des fins commerciales. Un sous-traitant d'envoi d'emails (service conforme RGPD) peut accéder aux données strictement nécessaires à l'envoi du rapport.</p>
                    </div>
                  </>
                ) : currentLang === 'es' ? (
                  <>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">1. Responsable del tratamiento</h4>
                      <p>Documatch.eu — <a href="mailto:info@documatch.eu" className="text-blue-600 font-semibold hover:underline">info@documatch.eu</a> — España (operando en Francia, España, Bélgica, Suiza, Luxemburgo y Reino Unido).</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">2. Datos recopilados</h4>
                      <p>Nombre, apellidos, correo profesional, empresa, cargo, teléfono (opcional), país. También las respuestas del cuestionario de diagnóstico, tratadas de forma anonimizada para estadísticas sectoriales.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">3. Fines del tratamiento</h4>
                      <ul className="list-disc pl-5 space-y-0.5">
                        <li>Envío del informe de madurez GED personalizado</li>
                        <li>Asesoramiento en la selección de una solución GED adaptada</li>
                        <li>Comunicación comercial de Documatch.eu (con posibilidad de darse de baja)</li>
                        <li>Mejora del servicio de comparación</li>
                      </ul>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">4. Base legal</h4>
                      <p>Consentimiento explícito (Art. 6.1.a RGPD) e interés legítimo para la prospección B2B (Art. 6.1.f RGPD).</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">5. Conservación de datos</h4>
                      <p>3 años desde el último contacto, luego archivo o eliminación.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">6. Sus derechos</h4>
                      <p>Acceso, rectificación, supresión, oposición, portabilidad — ejercite sus derechos en <a href="mailto:info@documatch.eu" className="text-blue-600 font-semibold hover:underline">info@documatch.eu</a>. También puede presentar una reclamación ante la AEPD (España) o la CNIL (Francia).</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">7. Transferencias</h4>
                      <p>Sus datos no se transmiten a terceros con fines comerciales. Un subcontratista de envío de correos electrónicos (servicio conforme al RGPD) puede acceder a los datos estrictamente necesarios para enviar el informe.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">1. Data Controller</h4>
                      <p>Documatch.eu — <a href="mailto:info@documatch.eu" className="text-blue-600 font-semibold hover:underline">info@documatch.eu</a> — Spain (operating in France, Spain, Belgium, Switzerland, Luxembourg, and the United Kingdom).</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">2. Collected Data</h4>
                      <p>First name, last name, business email, company, job role, phone (optional), country. Additionally, the answers to the diagnostic questionnaire, processed anonymously for industry sector statistics.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">3. Purposes of Processing</h4>
                      <ul className="list-disc pl-5 space-y-0.5">
                        <li>Delivery of your personalized DMS maturity report</li>
                        <li>Follow-up support in selecting an appropriate DMS solution</li>
                        <li>Commercial updates from Documatch.eu (with opt-out option at any time)</li>
                        <li>Improvement of our comparison algorithms</li>
                      </ul>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">4. Legal Basis</h4>
                      <p>Explicit consent (Art. 6.1.a GDPR) and legitimate interest for B2B marketing prospecting (Art. 6.1.f GDPR).</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">5. Data Retention</h4>
                      <p>3 years from the date of last active contact, followed by archival or deletion.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">6. Your Rights</h4>
                      <p>Access, rectification, deletion, objection, portability — exercise your rights by emailing <a href="mailto:info@documatch.eu" className="text-blue-600 font-semibold hover:underline">info@documatch.eu</a>. You may also lodge a complaint with your local data protection authority, such as CNIL (France) or AEPD (Spain).</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">7. Disclosures & Transfers</h4>
                      <p>Your data is never transmitted to third parties for commercial resale. A compliant email routing partner (GDPR-aligned service) may process the data strictly necessary for delivering your report.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
           CGU MODAL
         ===================================================== */}
      {activeModal === 'cgu-modal' && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-[100] bg-black/60 overflow-y-auto p-4 flex items-start justify-center backdrop-blur-sm"
        >
          <div className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl my-8 animate-fade-in">
            <button
              onClick={onCloseModal}
              className="absolute top-4 right-4 w-9 h-9 bg-slate-100 hover:bg-slate-200 border-none rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 text-lg font-bold transition-all cursor-pointer z-50"
            >
              ✕
            </button>

            <div className="p-6 sm:p-8 space-y-4 text-slate-700">
              <h2 className="font-sans font-extrabold text-xl text-[#1e3a5f] border-b pb-3">
                {currentLang === 'fr' ? "Conditions Générales d'Utilisation" : currentLang === 'es' ? 'Condiciones Generales de Uso' : 'Terms of Use (CGU)'}
              </h2>

              <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-500 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
                {currentLang === 'fr' ? (
                  <>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">1. Objet</h4>
                      <p>Les présentes CGU régissent l'utilisation du service de diagnostic GED proposé gratuitement par Documatch.eu sur la plateforme Documatch Lab.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">2. Service</h4>
                      <p>Documatch Lab est un outil d'évaluation indicatif. Les résultats produits sont donnés à titre informatif et ne constituent pas un avis juridique, fiscal ou de conformité réglementaire certifié.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">3. Propriété intellectuelle</h4>
                      <p>L'ensemble du contenu (questions, méthodologie de scoring, recommandations) est la propriété exclusive de Documatch.eu. Toute reproduction est interdite sans autorisation écrite préalable.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">4. Responsabilité</h4>
                      <p>Documatch.eu ne saurait être tenu responsable des décisions prises sur la base des résultats du diagnostic. L'utilisateur reste seul responsable de ses choix de mise en conformité.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">5. Droit applicable</h4>
                      <p>Les présentes CGU sont soumises au droit espagnol. En cas de litige, les tribunaux de Bayonne sont seuls compétents.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">6. Contact</h4>
                      <p><a href="mailto:info@documatch.eu" className="text-blue-600 font-semibold hover:underline">info@documatch.eu</a> — <a href="https://www.documatch.eu" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">www.documatch.eu</a></p>
                    </div>
                  </>
                ) : currentLang === 'es' ? (
                  <>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">1. Objeto</h4>
                      <p>Las presentes CGU regulan el uso del servicio de diagnóstico GED ofrecido gratuitamente por Documatch.eu en la plataforma Documatch Lab.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">2. Servicio</h4>
                      <p>Documatch Lab es una herramienta de evaluación indicativa. Los resultados producidos se facilitan a título informativo y no constituyen asesoramiento jurídico, fiscal o de conformidad reguladora certificado.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">3. Propiedad intelectual</h4>
                      <p>Todo el contenido (preguntas, metodología de puntuación, recomendaciones) es propiedad exclusiva de Documatch.eu. Queda prohibida cualquier reproducción sin autorización previa por escrito.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">4. Responsabilidad</h4>
                      <p>Documatch.eu no se hace responsable de las decisiones tomadas en base a los resultados del diagnóstico. El usuario es el único responsable de sus decisiones de conformidad.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">5. Ley aplicable</h4>
                      <p>Las presentes CGU están sujetas al derecho español. En caso de litigio, los tribunales de Bayona serán los únicos competentes.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">6. Contacto</h4>
                      <p><a href="mailto:info@documatch.eu" className="text-blue-600 font-semibold hover:underline">info@documatch.eu</a> — <a href="https://www.documatch.eu" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">www.documatch.eu</a></p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">1. Subject Matter</h4>
                      <p>These terms of use govern the complimentary DMS diagnostic and assessment service provided by Documatch.eu on the Documatch Lab web application.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">2. Scope of Service</h4>
                      <p>Documatch Lab is designed as an informative self-assessment utility. The resulting benchmarks and reports are directional and do not constitute formal certified tax audits, compliance certifications, or legal counsel.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">3. Intellectual Property</h4>
                      <p>All core material (diagnostic questions, algorithms, custom scoring, logic matrices, and texts) remains the exclusive proprietary asset of Documatch.eu. Unauthorized reproduction is strictly prohibited.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">4. Limitation of Liability</h4>
                      <p>Documatch.eu accepts no liability for business decisions, vendor choices, or software procurements made based on these diagnostic results. Users assume sole responsibility for their technical compliance structures.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">5. Jurisdiction</h4>
                      <p>These Terms of Use are governed by Spanish law. Any legal disputes arising under these terms shall be resolved exclusively within the competent courts of Bayonne.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">6. Contact</h4>
                      <p><a href="mailto:info@documatch.eu" className="text-blue-600 font-semibold hover:underline">info@documatch.eu</a> — <a href="https://www.documatch.eu" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">www.documatch.eu</a></p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
           COOKIES MODAL
         ===================================================== */}
      {activeModal === 'cookies-modal' && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-[100] bg-black/60 overflow-y-auto p-4 flex items-start justify-center backdrop-blur-sm"
        >
          <div className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl my-8 animate-fade-in">
            <button
              onClick={onCloseModal}
              className="absolute top-4 right-4 w-9 h-9 bg-slate-100 hover:bg-slate-200 border-none rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 text-lg font-bold transition-all cursor-pointer z-50"
            >
              ✕
            </button>

            <div className="p-6 sm:p-8 space-y-4 text-slate-700">
              <h2 className="font-sans font-extrabold text-xl text-[#1e3a5f] border-b pb-3">
                {currentLang === 'fr' ? 'Politique Cookies' : currentLang === 'es' ? 'Política de Cookies' : currentLang === 'de' ? 'Cookie-Richtlinie' : currentLang === 'nl' ? 'Cookiebeleid' : 'Cookie Policy'}
              </h2>

              <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-500 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
                {currentLang === 'fr' ? (
                  <>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Cookies strictement nécessaires</h4>
                      <p>Ces cookies sont indispensables au fonctionnement du site (préférences de langue, session de diagnostic). Ils ne peuvent pas être refusés.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Cookies analytiques (optionnels)</h4>
                      <p>Nous utilisons des cookies analytiques anonymes (statistiques de visite) pour améliorer nos services. Vous pouvez les refuser via le bandeau de consentement.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Pas de cookies publicitaires</h4>
                      <p>Documatch.eu n'utilise aucun cookie de ciblage publicitaire ou de retargeting. Aucun cookie tiers à des fins commerciales n'est déposé.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Durée de conservation</h4>
                      <p>Les cookies analytiques sont conservés 13 mois maximum conformément aux recommandations CNIL.</p>
                    </div>
                  </>
                ) : currentLang === 'es' ? (
                  <>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Cookies estrictamente necesarios</h4>
                      <p>Estas cookies son indispensables para el funcionamiento del sitio (preferencias de idioma, sesión de diagnóstico). No pueden ser rechazadas.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Cookies analíticas (opcionales)</h4>
                      <p>Utilizamos cookies analíticas anónimas (estadísticas de visitas) para mejorar nuestros servicios. Puede rechazarlas a través del banner de consentimiento.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Sin cookies publicitarias</h4>
                      <p>Documatch.eu no utiliza ninguna cookie de segmentación publicitaria o retargeting. No se depositan cookies de terceros con fines comerciales.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Período de conservación</h4>
                      <p>Las cookies analíticas se conservan durante un máximo de 13 meses, de acuerdo con las directrices reglamentarias europeas.</p>
                    </div>
                  </>
                ) : currentLang === 'de' ? (
                  <>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Technisch notwendige Cookies</h4>
                      <p>Diese Cookies sind für den Betrieb der Website (Sprachwahl, Speicherung des Diagnosefortschritts) zwingend erforderlich und können nicht deaktiviert werden.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Analyse-Cookies (Optional)</h4>
                      <p>Wir verwenden anonyme Statistik-Cookies zur Messung von Reichweite und Systemleistung. Sie können diese über das Cookie-Banner ablehnen.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Keine Werbe-Tracker</h4>
                      <p>Documatch.eu setzt keine kommerziellen Retargeting- oder Werbe-Cookies von Drittanbietern ein.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Speicherdauer</h4>
                      <p>Analyse-Cookies werden gemäß DSGVO-Richtlinien maximal 13 Monate gespeichert.</p>
                    </div>
                  </>
                ) : currentLang === 'nl' ? (
                  <>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Strikt noodzakelijke cookies</h4>
                      <p>Deze cookies zijn onmisbaar voor de werking van de site (taalvoorkeur, voortgang van de analyse). Deze kunnen niet worden geweigerd.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Analytische cookies (Optioneel)</h4>
                      <p>Wij gebruiken anonieme analytische cookies om onze diensten te verbeteren. U kunt deze weigeren via de cookiebanner.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Geen advertentiecookies</h4>
                      <p>Documatch.eu gebruikt geen retargeting- of commerciële advertentiecookies van derden.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Bewaartermijn</h4>
                      <p>Analytische cookies worden maximaal 13 maanden bewaard conform AVG/GDPR richtlijnen.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Strictly Necessary Cookies</h4>
                      <p>These essential cookies are mandatory to run the application, saving basic diagnostic steps, session persistence, and localized language choices. They cannot be deactivated.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Analytical Cookies (Optional)</h4>
                      <p>We log fully anonymous statistical cookies to monitor site traffic, errors, and load speed. You may choose to refuse these using our consent banner.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">No Advertising Trackers</h4>
                      <p>Documatch.eu implements zero retargeting, tracking, pixel triggers, or commercial behavioral cookies. No third-party marketing cookies are placed on your device.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Data Lifespan</h4>
                      <p>Performance analytics cookies are kept for a maximum of 13 months, fully aligning with CNIL (France) and GDPR rules.</p>
                    </div>
                  </>
                )}

                <div className="pt-3 border-t mt-4 flex justify-start">
                  <button
                    onClick={() => {
                      onCloseModal();
                      window.dispatchEvent(new CustomEvent('open-cookie-banner'));
                    }}
                    className="bg-[#2563eb] hover:bg-[#1e3a5f] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer font-sans"
                  >
                    {currentLang === 'fr' ? '⚙️ Personnaliser mes choix de cookies' : currentLang === 'es' ? '⚙️ Personalizar mis preferencias de cookies' : currentLang === 'de' ? '⚙️ Cookie-Einstellungen anpassen' : currentLang === 'nl' ? '⚙️ Cookie-instellingen aanpassen' : '⚙️ Manage Cookie Consent Preferences'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
           MENTIONS LEGALES MODAL
         ===================================================== */}
      {activeModal === 'mentions-modal' && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-[100] bg-black/60 overflow-y-auto p-4 flex items-start justify-center backdrop-blur-sm"
        >
          <div className="relative max-w-2xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl my-8 animate-fade-in">
            <button
              onClick={onCloseModal}
              className="absolute top-4 right-4 w-9 h-9 bg-slate-100 hover:bg-slate-200 border-none rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 text-lg font-bold transition-all cursor-pointer z-50"
            >
              ✕
            </button>

            <div className="p-6 sm:p-8 space-y-4 text-slate-700">
              <h2 className="font-sans font-extrabold text-xl text-[#1e3a5f] border-b pb-3">
                {currentLang === 'fr' ? 'Mentions légales' : currentLang === 'es' ? 'Aviso Legal' : currentLang === 'de' ? 'Impressum / Rechtlicher Hinweis' : currentLang === 'nl' ? 'Juridische Kennisgeving' : 'Imprint / Legal Notice'}
              </h2>

              <div className="space-y-4 text-xs sm:text-sm leading-relaxed text-slate-500 max-h-[60vh] overflow-y-auto pr-2 no-scrollbar">
                {currentLang === 'fr' ? (
                  <>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Éditeur du site</h4>
                      <p>Documatch est un service de comparaison de solutions de gestion électronique de documents destiné aux entreprises.</p>
                      <p><strong>Email de contact :</strong> <a href="mailto:contact@documatch.eu" className="text-blue-600 font-semibold hover:underline">contact@documatch.eu</a></p>
                      <p><strong>Directeur de publication :</strong> Documatch</p>
                      <p><strong>SIREN :</strong> 992 752 980, société immatriculée en France</p>
                      <p>TVA non applicable conformément à l'article 293 B du Code Général des Impôts.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Hébergement</h4>
                      <p>Le site Documatch.eu est hébergé par OVH.</p>
                      <p><strong>Adresse :</strong> 2 rue Kellermann, 59100 Roubaix, France.</p>
                      <p><strong>Téléphone :</strong> +33 9 72 10 10 07.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Propriété intellectuelle</h4>
                      <p>L'ensemble des contenus du site Documatch.eu (textes, visuels, logos, éléments graphiques) est protégé par le droit de la propriété intellectuelle et demeure la propriété exclusive de Documatch ou de ses partenaires. Toute reproduction ou exploitation non autorisée est interdite.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Responsabilité</h4>
                      <p>Documatch s'efforce de fournir des informations fiables et régulièrement mises à jour. Toutefois, aucune garantie n'est apportée quant à l'exactitude ou l'exhaustivité des informations présentées. L'utilisateur reconnaît utiliser ces informations sous sa seule responsabilité.</p>
                    </div>
                  </>
                ) : currentLang === 'es' ? (
                  <>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Editor del sitio</h4>
                      <p>Documatch es un servicio de comparación de soluciones de gestión electrónica de documentos dirigido a empresas.</p>
                      <p><strong>Email de contacto :</strong> <a href="mailto:contact@documatch.eu" className="text-blue-600 font-semibold hover:underline">contact@documatch.eu</a></p>
                      <p><strong>Director de publicación :</strong> Documatch</p>
                      <p><strong>SIREN / Identificación :</strong> 992 752 980, sociedad registrada en Francia</p>
                      <p>TVA no aplicable de acuerdo con el artículo 293 B del Código General de Impuestos de Francia.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Alojamiento</h4>
                      <p>El sitio web Documatch.eu está alojado por OVH.</p>
                      <p><strong>Dirección :</strong> 2 rue Kellermann, 59100 Roubaix, Francia.</p>
                      <p><strong>Teléfono :</strong> +33 9 72 10 10 07.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Propiedad intelectual</h4>
                      <p>Todo el contenido del sitio web Documatch.eu (textos, recursos visuales, logotipos, elementos gráficos) está protegido por las leyes de propiedad intelectual y sigue siendo propiedad exclusiva de Documatch o de sus socios. Queda prohibida cualquier reproducción o explotación no autorizada.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Responsabilidad</h4>
                      <p>Documatch hace todo lo posible por facilitar información fiable y actualizada periódicamente. No obstante, no se ofrece garantía alguna en cuanto a la exactitud o integridad de las informaciones presentadas. El usuario reconoce utilizar esta información bajo su única responsabilidad.</p>
                    </div>
                  </>
                ) : currentLang === 'de' ? (
                  <>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Anbieterkennzeichnung</h4>
                      <p>Documatch ist ein unabhäniger Vergleichs- und Beratungsdienst für Dokumentenmanagementsysteme (DMS).</p>
                      <p><strong>E-Mail-Kontakt:</strong> <a href="mailto:contact@documatch.eu" className="text-blue-600 font-semibold hover:underline">contact@documatch.eu</a></p>
                      <p><strong>Verantwortlich für den Inhalt:</strong> Documatch</p>
                      <p><strong>Registrierungsnummer (SIREN):</strong> 992 752 980 (Frankreich)</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Webhosting</h4>
                      <p>Die Website Documatch.eu wird auf sicheren OVH-Servern gehostet.</p>
                      <p><strong>Adresse:</strong> 2 rue Kellermann, 59100 Roubaix, Frankreich.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Urheberrecht</h4>
                      <p>Alle Inhalte (Texte, Grafiken, Logos) auf Documatch.eu sind urheberrechtlich geschützt. Die Vervielfältigung oder kommerzielle Nutzung ohne vorherige schriftliche Genehmigung ist untersagt.</p>
                    </div>
                  </>
                ) : currentLang === 'nl' ? (
                  <>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Uitgever van de website</h4>
                      <p>Documatch is een onafhankelijke vergelijkingsdienst voor documentbeheersystemen (DMS) voor bedrijven.</p>
                      <p><strong>E-mailadres:</strong> <a href="mailto:contact@documatch.eu" className="text-blue-600 font-semibold hover:underline">contact@documatch.eu</a></p>
                      <p><strong>Verantwoordelijke uitgever:</strong> Documatch</p>
                      <p><strong>Ondernemingsnummer (SIREN):</strong> 992 752 980 (Frankrijk)</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Webhosting</h4>
                      <p>De website Documatch.eu wordt gehost op veilige OVH-servers.</p>
                      <p><strong>Adres:</strong> 2 rue Kellermann, 59100 Roubaix, Frankrijk.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Intellectuele eigendom</h4>
                      <p>Alle inhoud op Documatch.eu is beschermd door het auteursrecht. Reproductie of commercieel gebruik zonder voorafgaande toestemming is verboden.</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Publisher Information</h4>
                      <p>Documatch is a B2B independent benchmark and advisory software service matching business entities with optimal Document Management solutions.</p>
                      <p><strong>Email :</strong> <a href="mailto:contact@documatch.eu" className="text-blue-600 font-semibold hover:underline">contact@documatch.eu</a></p>
                      <p><strong>Director of Publication :</strong> Documatch</p>
                      <p><strong>Registration (SIREN) :</strong> 992 752 980, incorporated in France</p>
                      <p>VAT exempted according to Art. 293 B of the French General Tax Code.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Web Hosting</h4>
                      <p>Documatch.eu is hosted on secure OVH servers.</p>
                      <p><strong>Address :</strong> 2 rue Kellermann, 59100 Roubaix, France.</p>
                      <p><strong>Phone :</strong> +33 9 72 10 10 07.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Intellectual Property</h4>
                      <p>All core components on Documatch.eu (texts, visuals, custom logos, graphical design elements) are fully protected under European copyright laws and belong exclusively to Documatch or its official partners. Any unauthorized replication or commercial exploitation is strictly prohibited.</p>
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-[#1e3a5f]">Limitation of Liability</h4>
                      <p>While Documatch strives to compile highly accurate up-to-date vendor information, we extend no warranty regarding final completeness. Users rely on this benchmark at their sole individual business risk.</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
           FAQ MODAL
         ===================================================== */}
      {activeModal === 'faq-modal' && (() => {
        const getFaqData = () => {
          const categories = [
            { id: 'all', label: { fr: 'Toutes', es: 'Todas', en: 'All', de: 'Alle', nl: 'Alle' } },
            { id: 'reform', label: { fr: 'Réforme 2026', es: 'Reforma 2026', en: '2026 Reform', de: 'E-Rechnung', nl: 'E-invoicing' } },
            { id: 'audit', label: { fr: 'Audit & Score', es: 'Diagnóstico & Score', en: 'Audit & Score', de: 'Audit & Score', nl: 'Audit & Score' } },
            { id: 'neutrality', label: { fr: 'Gratuité & Neutralité', es: 'Gratuito & Neutral', en: 'Free & Neutral', de: 'Kostenlos & Neutral', nl: 'Gratis & Neutraal' } },
            { id: 'risks', label: { fr: 'Risques & Sanctions', es: 'Riesgos & Sanciones', en: 'Risks & Penalties', de: 'Risiken & Strafen', nl: 'Risico\'s & Sancties' } },
            { id: 'software', label: { fr: 'ERP & Logiciels', es: 'ERP & Software', en: 'ERP & Software', de: 'ERP & Software', nl: 'ERP & Software' } },
          ];

          const questions = [
            // Q1
            {
              id: 'q1',
              category: 'reform',
              tag: { fr: 'Réglementation 2026', es: 'Reglamento 2026', en: '2026 Regulation', de: 'Gesetzliche Pflicht', nl: 'Regelgeving 2026' },
              icon: Scale,
              iconBg: 'bg-blue-50 text-blue-600',
              q: {
                fr: "Qu'est-ce que la réforme réglementaire de facturation 2026 ?",
                es: "¿En qué consiste la reforma legal de facturación electrónica 2026?",
                en: "What is the 2026 mandatory B2B e-invoicing reform?",
                de: "Was bedeutet die E-Rechnungspflicht ab 2025/2026?",
                nl: "Wat houdt de verplichte B2B e-invoicing in?",
              },
              highlight: {
                fr: "Obligation légale de formats structurés (Factur-X, UBL, CII) via PPF ou PDP agréées.",
                es: "Obligación de formatos estructurados (Facturae, UBL) bajo la Ley Crea y Crece sin PDFs simples.",
                en: "Legal mandate for structured XML formats (Factur-X, UBL, CII) via certified platforms.",
                de: "Verpflichtender Empfang & Versand strukturierter E-Rechnungen (ZUGFeRD, XRechnung).",
                nl: "Verplichte overstap naar gestructureerde UBL/Peppol XML-facturatie voor B2B.",
              },
              a: {
                fr: "À partir du 1er septembre 2026, la facturation électronique B2B devient obligatoire en France en réception pour toutes les entreprises, et en émission pour les Grandes et ETI (puis PME/TPE en 2027). Elle impose l'échange de factures structurées sous formats normalisés (Factur-X, UBL, ou CII) acheminées via l'annuaire national officiel en s'appuyant sur le Portail Public de Facturation (PPF) ou des Plateformes de Dématérialisation Partenaires (PDP) immatriculées.",
                es: "A partir de 2026, la facturación electrónica obligatoria en transacciones comerciales B2B entra en vigor en España impulsada por el reglamento de la Ley Crea y Crece. Esto obliga a todas las empresas y autónomos a emitir, enviar y recibir sus facturas de forma 100% digital en formatos informáticos estructurados (Facturae, UBL, etc.), prohibiendo el uso exclusivo de facturas en papel o PDF sin datos legibles por máquina.",
                en: "European nations are enforcing mandatory digital transactions. Major regulations take effect in France from September 2026 (compulsory B2B reception for all companies and issuance for large/mid caps) and in Spain through the Crea y Crece law. Together with Germany's GoBD and Dutch Peppol standards, companies are legally required to process structured, machine-readable XML invoice formats (Factur-X, UBL, CII) instead of flat PDF email attachments.",
                de: "Seit Januar 2025 gilt in Deutschland die E-Rechnungspflicht im B2B-Bereich für den Rechnungsempfang. Ab 2026/2027 müssen Unternehmen auch elektronische Rechnungen in standardisierten Formaten (wie ZUGFeRD ab 2.0.1 oder XRechnung) ausstellen. Reine PDF-Rechnungen per E-Mail erfüllen die gesetzlichen Vorgaben nicht mehr.",
                nl: "In Europees en nationaal verband wordt gestructureerde elektronische facturatie (UBL/Peppol) stapsgewijs verplicht voor alle B2B-transacties. Gewone PDF-bestanden via e-mail voldoen niet meer aan de nieuwste normen voor automatische en betrouwbare verwerking door overheden en handelspartners.",
              },
            },
            // Q2
            {
              id: 'q2',
              category: 'audit',
              tag: { fr: 'Diagnostic & Préparation', es: 'Diagnóstico & Preparación', en: 'Diagnostic & Prep', de: 'Vorbereitung', nl: 'Voorbereiding' },
              icon: Sparkles,
              iconBg: 'bg-amber-50 text-amber-600',
              q: {
                fr: "Pourquoi un audit de maturité GED est-il indispensable dès maintenant ?",
                es: "¿Por qué es crucial realizar un diagnóstico de madurez GED ahora?",
                en: "Why is a document management (DMS) maturity check crucial today?",
                de: "Warum ist eine DMS-Reifegradanalyse jetzt entscheidend?",
                nl: "Waarom nu een DMS-volwassenheidstest uitvoeren?",
              },
              highlight: {
                fr: "La GED est le cœur opérationnel pour traiter, valider et archiver légalement les factures.",
                es: "La GED es el motor clave para automatizar la captura OCR, flujos de firma y archivo probatorio.",
                en: "A modern DMS is essential to ingest, validate, and legally archive inbound invoice data.",
                de: "Ein DMS garantiert GoBD-konforme Archivierung und automatisierte Freigabeprozesse.",
                nl: "Een modern DMS garandeert soepele verwerking, autorisaties en conforme e-archivering.",
              },
              a: {
                fr: "L'obligation légale n'est que la partie visible de l'iceberg. Intégrer l'e-invoicing nécessite d'adapter en profondeur votre outil de Gestion Électronique des Documents (GED) et votre comptabilité. Cet audit évalue si vos outils actuels savent lire automatiquement les données (OCR/LAD), gérer des workflows d'approbation fluides, s'interfacer avec votre ERP, et archiver légalement à valeur probante (norme NF Z42-013 / eIDAS). En anticipant dès aujourd'hui, vous évitez les goulets d'étranglement.",
                es: "Adoptar la facturación electrónica no consiste únicamente en enviar archivos digitales, sino en modernizar toda la gestión documental de su negocio. El diagnóstico evalúa si sus sistemas son capaces de leer automáticamente los campos con OCR inteligente, procesar aprobaciones internas de pagos, sincronizar datos con su software ERP actual, y conservar de forma segura el historial en archivos inalterables conformes a la legislación.",
                en: "A digital mandate affects your entire accounting workflow. Our audit evaluates if your existing tech stack features accurate automated data ingestion (OCR), compliant multi-level authorization workflows, native interfaces to your ERP, and audit-proof compliance archiving under European standards.",
                de: "Die gesetzliche Pflicht betrifft Ihre gesamten Buchhaltungs- und Dokumentenprozesse. Unsere Reifegradanalyse prüft, ob Ihre Systeme OCR-Datenerfassung, durchgängige Genehmigungsworkflows und GoBD-konforme Revisionssicherheit unterstützen.",
                nl: "E-invoicing vereist een naadloze koppeling met uw Document Management Systeem (DMS) en boekhoudsoftware. Deze test controleert uw gereedheid op het vlak van herkenning, goedkeuring en veilige e-archivering.",
              },
            },
            // Q3
            {
              id: 'q3',
              category: 'audit',
              tag: { fr: 'Méthodologie & Score', es: 'Metodología & Score', en: 'Methodology & Score', de: 'Methodik', nl: 'Methodiek' },
              icon: FileText,
              iconBg: 'bg-indigo-50 text-indigo-600',
              q: {
                fr: "Comment est calculé le score Documatch Lab et que contient le rapport ?",
                es: "¿Cómo se calcula el score Documatch Lab y qué incluye el informe?",
                en: "How is the Documatch Lab maturity score calculated and what does it include?",
                de: "Wie wird der Documatch Lab Reifegrad-Score berechnet?",
                nl: "Hoe wordt de Documatch Lab volwassenheidsscore berekend?",
              },
              highlight: {
                fr: "Score global sur 100, cartographie sur 4 piliers et plan d'actions opérationnel immédiat.",
                es: "Score de 0 a 100, análisis en 4 ejes clave y plan de acción detallado para su ERP.",
                en: "0-100 maturity index, 4-pillar gap analysis, and an actionable software recommendation plan.",
                de: "0-100 Punkte-Index, 4-Säulen-Analyse und ein konkreter Maßnahmenplan für Ihre IT.",
                nl: "Score van 0 tot 100, analyse over 4 pijlers en direct toepasbaar actieplan.",
              },
              a: {
                fr: "Le score (de 0 à 100) est un indicateur mathématique développé par nos experts indépendants. En répondant aux 10 questions de l'audit, notre algorithme classe votre maturité (Faible, Intermédiaire, Avancée) sur 4 piliers fondamentaux : Réglementation & Conformité, Automatisation & OCR, Intégration ERP, et Sécurité & Archivage probant. Vous recevez instantanément un plan d'actions clair et personnalisé.",
                es: "El score obtenido (de 0 a 100) mide cuantitativamente el nivel de integración técnica y de cumplimiento normativo de su negocio. Basado en 10 preguntas específicas sobre su organización de archivos, nuestro algoritmo de auditoría clasifica su estado operativo (Bajo, Medio, Alto) y genera de inmediato un informe de madurez con pautas para actualizar sus flujos documentales.",
                en: "The score (ranging from 0 to 100) represents an algorithmic index of your operational readiness. By grading your answers across 4 vital workflow pillars, the report highlights potential structural vulnerabilities, maps your preparedness tier, and yields a customized action plan with concrete software requirements.",
                de: "Der Score (0 bis 100 Punkte) ermittelt den Vorbereitungsgrad Ihres Unternehmens. Anhand von 10 gezielten Fragen analysieren wir Ihre Dokumentenprozesse und zeigen konkrete Handlungsfelder auf.",
                nl: "De score (0-100) geeft een helder beeld van uw digitale volwassenheid. Op basis van 10 vragen ontvangt u een analyserapport met aanbevelingen.",
              },
            },
            // Q4
            {
              id: 'q4',
              category: 'neutrality',
              tag: { fr: 'Neutralité & Tiers de confiance', es: 'Neutralidad & Confianza', en: 'Neutrality & Trust', de: 'Unabhängigkeit', nl: 'Onafhankelijkheid' },
              icon: ShieldCheck,
              iconBg: 'bg-emerald-50 text-emerald-600',
              q: {
                fr: "Ce diagnostic est-il réellement 100% gratuit et sans engagement ?",
                es: "¿Es este diagnóstico realmente 100% gratuito, neutral y sin compromiso?",
                en: "Is this assessment truly 100% free, impartial and without obligation?",
                de: "Ist dieser Test wirklich 100% kostenlos und unabhängig?",
                nl: "Is deze diagnose echt 100% gratis en onafhankelijk?",
              },
              highlight: {
                fr: "Documatch.eu ne vend aucune licence et ne touche aucune commission d'éditeurs.",
                es: "Documatch.eu no comercializa software ni percibe comisiones por marcas.",
                en: "Documatch.eu sells no software and takes no vendor commissions.",
                de: "Documatch.eu verkauft keine Lizenzen und agiert vollkommen herstellerunabhängig.",
                nl: "Documatch.eu verkoopt geen licenties en ontvangt geen commissies van leveranciers.",
              },
              a: {
                fr: "Oui, à 100%. Documatch.eu est un service de conseil totalement indépendant et objectif. Nous ne commercialisons aucun logiciel et nous ne percevons aucune commission de la part des éditeurs de GED ou d'ERP. Notre unique rôle de tiers de confiance est d'analyser vos besoins réels et de vous recommander de manière impartiale la solution la plus adaptée parmi plus de 200 progiciels évalués sur le marché européen.",
                es: "Sí, es completamente gratuito y sin ningún compromiso comercial. Documatch.eu opera como un tercero neutral en el mercado de software. No vendemos licencias, no somos distribuidores y no favorecemos a ningún fabricante. Ofrecemos recomendaciones transparentes y objetivas basadas en las necesidades específicas de integración de su ERP y sector de actividad.",
                en: "Yes, entirely. Documatch.eu is a 100% independent consulting guide. We do not sell software packages, do not work as certified resellers, and do not receive commission kickbacks. Our sole objective is to provide a reliable, objective filter to help you discover the ideal Document Management solution from more than 200 major tools analyzed in our European index.",
                de: "Ja, zu 100%. Documatch.eu ist ein neutrales Beratungsportal. Wir vertreiben keine Softwarelizenzen und erhalten keine Provisionen von Anbietern. Unser Ziel ist es, Ihnen eine transparente Orientierung im Markt von über 200 DMS-Lösungen zu bieten.",
                nl: "Ja, 100% gratis en onafhankelijk. Documatch.eu verkoopt geen softwarelicenties en heeft geen voorkeur voor specifieke leveranciers. Wij bieden een objectieve vergelijking op basis van meer dan 200 geanalyseerde softwarepakketten.",
              },
            },
            // Q5
            {
              id: 'q5',
              category: 'risks',
              tag: { fr: 'Sanctions & Conformité', es: 'Sanciones & Legalidad', en: 'Fines & Compliance', de: 'Risiken & Strafen', nl: 'Sancties & Risico\'s' },
              icon: AlertTriangle,
              iconBg: 'bg-rose-50 text-rose-600',
              q: {
                fr: "Quels sont les risques et sanctions financières en cas de non-conformité ?",
                es: "¿Cuáles son las sanciones económicas y riesgos legales de no adaptarse?",
                en: "What are the financial penalties and legal risks of non-compliance?",
                de: "Welche steuerlichen und finanziellen Risiken drohen bei Nicht-Einhaltung?",
                nl: "Wat zijn de financiële sancties en risico's van niet-naleving?",
              },
              highlight: {
                fr: "Amendes jusqu'à 15 €/facture en France, 10 000 € en Espagne et blocage des paiements.",
                es: "Multas de hasta 10.000 € bajo la Ley Crea y Crece, retrasos en cobros y auditorías de Hacienda.",
                en: "Fines up to €10,000 in Spain, €15/invoice in France, plus lost tax deductions and cash flow stalls.",
                de: "Verlust des Vorsteuerabzugs, Hinzuschätzungen durch das Finanzamt und Lieferverzögerungen.",
                nl: "Administratieve boetes, verlies van fiscale aftrekbaarheid en vertraagde betalingsstromen.",
              },
              a: {
                fr: "La non-conformité s'accompagne d'un lourd tribut : amendes administratives (15 € par facture non conforme, plafonnées à 15 000 € par an en France), rejet de votre comptabilité par le fisc, perte du droit à déduction de la TVA, ou pénalités financières allant jusqu'à 10 000 € en Espagne sous la loi Crea y Crece. De plus, un système GED inefficace entraîne des retards de paiement de vos factures et nuit directement à votre trésorerie.",
                es: "La normativa española de la Ley Crea y Crece establece sanciones económicas estrictas de hasta 10.000 € para aquellas empresas que no ofrezcan a sus clientes la recepción de facturas electrónicas o no mantengan el acceso a ellas durante 4 años. Operativamente, también se arriesga a retrasos en cobros de clientes, fallos de auditoría de Hacienda, y exclusión de licitaciones públicas.",
                en: "Failing to establish compliant pipelines can lead to catastrophic business disruption. Penalties include severe state fines (up to €10,000 in Spain, or €15 per-invoice fines in France), loss of business tax deductions, and total exclusion from procurement bids. Furthermore, outdated workflows invite manual errors and direct cash flow problems.",
                de: "Bei Nichteinhaltung der GoBD- und E-Rechnungsvorgaben drohen empfindliche steuerliche Konsequenzen: Aberkennung des Vorsteuerabzugs, Schätzungen durch das Finanzamt bei Betriebsprüfungen sowie der Ausschluss von öffentlichen Ausschreibungen.",
                nl: "Niet-conforme systemen leiden tot administratieve sancties, fiscale boetes, vertragingen in betalingen door handelspartners en uitsluiting van openbare aanbestedingen.",
              },
            },
            // Q6
            {
              id: 'q6',
              category: 'software',
              tag: { fr: 'Interopérabilité ERP', es: 'Interconexión ERP', en: 'ERP Interoperability', de: 'ERP-Integration', nl: 'ERP-koppeling' },
              icon: Layers,
              iconBg: 'bg-cyan-50 text-cyan-600',
              q: {
                fr: "Mon ERP ou logiciel comptable actuel est-il compatible avec une GED ?",
                es: "¿Es mi software ERP o de contabilidad compatible con una GED?",
                en: "Is my current ERP or accounting software compatible with a DMS?",
                de: "Ist meine bestehende ERP- oder Buchhaltungssoftware mit einem DMS kompatibel?",
                nl: "Is mijn huidige ERP- of boekhoudsoftware compatibel met een DMS?",
              },
              highlight: {
                fr: "Connecteurs natifs et API pour SAP, Sage, Cegid, Odoo, Microsoft Dynamics, Holded, etc.",
                es: "Conectores nativos y API para SAP, Sage, Holded, Odoo, Navision, A3 y más de 200 programas.",
                en: "Native connectors and APIs for SAP, Sage, Odoo, NetSuite, Dynamics 365, Holded, etc.",
                de: "Schnittstellen zu SAP, DATEV, Sage, Microsoft Dynamics, Odoo und gängigen ERP-Systemen.",
                nl: "Koppelingen mogelijk met Exact, AFAS, SAP, Sage, Odoo en meer dan 200 ERP-oplossingen.",
              },
              a: {
                fr: "Dans 98% des cas, oui. Les solutions GED modernes disposent de connecteurs certifiés et d'API REST bidirectionnelles permettant d'injecter automatiquement les écritures comptables, de synchroniser les plans comptables, et de relier les factures validées aux pièces d'achats dans votre ERP (Sage, SAP, Cegid, Microsoft Dynamics, Odoo, Cegid Loop, etc.).",
                es: "En más del 98% de los casos, sí. Las soluciones de GED modernas disponen de conectores certificados y APIs abiertas para comunicarse bidireccionalmente con su software contable o ERP (Sage, SAP, Holded, Odoo, Microsoft Dynamics, A3, Navision, etc.), evitando la duplicidad de datos y automatizando los asientos contables.",
                en: "In over 98% of cases, yes. Modern Document Management Systems offer native APIs and pre-built connectors that automatically synchronize purchase orders, accounting records, and payment validations directly with your ERP (SAP, Sage, NetSuite, Odoo, Microsoft Dynamics, Holded, etc.).",
                de: "Nahezu alle modernen DMS-Systeme bieten offene Schnittstellen (REST-APIs) oder zertifizierte DATEV-/SAP-/Sage-Konnektoren, um Buchungssätze und Rechnungsdaten automatisiert in Ihre Finanzbuchhaltung zu übertragen.",
                nl: "In de meeste gevallen wel. Hedendaagse DMS-pakketten beschikken over kant-en-klare koppelingen met populaire boekhoudpakketten zoals Exact, AFAS, SAP, Odoo en Sage voor naadloze gegevensuitwisseling.",
              },
            },
          ];

          return { categories, questions };
        };

        const { categories, questions } = getFaqData();

        const filteredQuestions = questions.filter(item => {
          const matchesCategory = faqCategory === 'all' || item.category === faqCategory;
          if (!matchesCategory) return false;
          if (!faqSearch.trim()) return true;
          const query = faqSearch.toLowerCase().trim();
          const qText = (item.q[currentLang] || item.q['en']).toLowerCase();
          const aText = (item.a[currentLang] || item.a['en']).toLowerCase();
          const tagText = (item.tag[currentLang] || item.tag['en']).toLowerCase();
          const highlightText = (item.highlight[currentLang] || item.highlight['en']).toLowerCase();
          return qText.includes(query) || aText.includes(query) || tagText.includes(query) || highlightText.includes(query);
        });

        const getHeaderTitle = () => {
          if (currentLang === 'fr') return 'Questions Fréquentes — Réforme 2026 & Audit GED';
          if (currentLang === 'es') return 'Preguntas Frecuentes — Reforma 2026 y Diagnóstico GED';
          if (currentLang === 'de') return 'Häufig Gestellte Fragen — E-Rechnung 2026 & DMS';
          if (currentLang === 'nl') return 'Veelgestelde Vragen — E-invoicing 2026 & DMS Audit';
          return 'Frequently Asked Questions — 2026 Reform & DMS Audit';
        };

        const getHeaderSubtitle = () => {
          if (currentLang === 'fr') return 'Retrouvez toutes les réponses officielles et pratiques concernant les obligations légales de facturation électronique, l’impact sur votre GED et la méthode d’audit Documatch Lab.';
          if (currentLang === 'es') return 'Respuestas claras y oficiales sobre las nuevas normativas de facturación obligatoria, la integración de su software de gestión y el informe de auditoría independiente.';
          if (currentLang === 'de') return 'Offizielle und praxisnahe Antworten zur E-Rechnungspflicht, GoBD-Konformität und zur neutralen Reifegradanalyse von Documatch Lab.';
          if (currentLang === 'nl') return 'Heldere en officiële antwoorden over de verplichte e-invoicing, de impact op uw documentbeheer en de onafhankelijke audit van Documatch Lab.';
          return 'Comprehensive, objective answers regarding mandatory digital invoice compliance, Document Management Systems integration, and the Documatch Lab assessment method.';
        };

        const getSearchPlaceholder = () => {
          if (currentLang === 'fr') return 'Rechercher une question ou un mot-clé (Factur-X, ERP, sanctions...)...';
          if (currentLang === 'es') return 'Buscar una duda o palabra clave (Facturae, ERP, multas...)...';
          if (currentLang === 'de') return 'Frage oder Stichwort suchen (ZUGFeRD, ERP, Fristen...)...';
          if (currentLang === 'nl') return 'Zoek een vraag of trefwoord (Peppol, ERP, sancties...)...';
          return 'Search a question or keyword (Factur-X, ERP, fines, formats...)...';
        };

        return (
          <div
            onClick={handleOverlayClick}
            className="fixed inset-0 z-[100] bg-black/75 p-2 sm:p-4 flex items-center sm:items-start justify-center backdrop-blur-md"
          >
            <div className="relative max-w-4xl w-full bg-slate-50 rounded-2xl overflow-hidden shadow-2xl my-auto sm:my-6 border border-slate-200/80 animate-fade-in flex flex-col h-[94vh] sm:h-auto sm:max-h-[90vh]">
              
              {/* Header with guaranteed deep navy background and rich illustration */}
              <div
                style={{
                  backgroundColor: '#0a192f',
                  backgroundImage: 'radial-gradient(ellipse at 85% 25%, rgba(37, 99, 235, 0.35) 0%, rgba(10, 25, 47, 0.98) 75%)',
                }}
                className="p-3.5 sm:p-6 lg:p-8 text-white relative flex-shrink-0 border-b border-blue-900/60 shadow-md"
              >
                {/* Background Tech Grid */}
                <div 
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: 'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }}
                />

                {/* Close button */}
                <button
                  onClick={onCloseModal}
                  aria-label="Fermer"
                  className="absolute top-3 right-3 sm:top-6 sm:right-6 w-8 h-8 sm:w-9 sm:h-9 bg-white/10 hover:bg-white/20 border border-white/20 rounded-full flex items-center justify-center text-white text-sm sm:text-base transition-all duration-150 cursor-pointer z-30 hover:scale-105 shadow-md"
                >
                  <X size={16} />
                </button>

                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center pr-8 sm:pr-0">
                  {/* Left Column: Title, Subtitle, Search */}
                  <div className="lg:col-span-7">
                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 text-[9px] sm:text-[10.5px] font-black tracking-wider text-[#fbbf24] uppercase bg-amber-400/15 border border-amber-400/30 rounded-md px-2 sm:px-3 py-0.5 sm:py-1 mb-1.5 sm:mb-3 shadow-sm">
                      <Sparkles size={11} className="text-[#fbbf24] shrink-0" />
                      <span>
                        {currentLang === 'fr' && 'DOCUMATCH LAB — CENTRE D’AIDE & FAQ'}
                        {currentLang === 'es' && 'DOCUMATCH LAB — CENTRO DE AYUDA & FAQ'}
                        {currentLang === 'de' && 'DOCUMATCH LAB — HILFECENTER & FAQ'}
                        {currentLang === 'nl' && 'DOCUMATCH LAB — HELPCENTER & FAQ'}
                        {currentLang === 'en' && 'DOCUMATCH LAB — HELP CENTER & FAQ'}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-base sm:text-2xl lg:text-3xl font-extrabold leading-tight text-white font-sans tracking-tight drop-shadow-sm">
                      {getHeaderTitle()}
                    </h2>

                    {/* Subtitle (hidden on small mobile to maximize questions reading area) */}
                    <p className="hidden sm:block text-xs sm:text-sm text-slate-200 mt-2 max-w-xl leading-relaxed font-sans font-normal">
                      {getHeaderSubtitle()}
                    </p>

                    {/* Search input inside header */}
                    <div className="mt-2.5 sm:mt-5 relative max-w-xl">
                      <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <input
                        type="text"
                        value={faqSearch}
                        onChange={(e) => setFaqSearch(e.target.value)}
                        placeholder={getSearchPlaceholder()}
                        style={{ backgroundColor: 'rgba(15, 34, 61, 0.95)' }}
                        className="w-full pl-8.5 sm:pl-10 pr-8 sm:pr-10 py-1.5 sm:py-2.5 text-white placeholder:text-slate-400 text-xs sm:text-sm rounded-lg sm:rounded-xl border border-blue-500/40 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/30 outline-none transition-all shadow-inner"
                      />
                      {faqSearch && (
                        <button
                          onClick={() => setFaqSearch('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white p-1 cursor-pointer"
                        >
                          <X size={13} />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Visual Brand & Audit Banner Graphic (shown on larger screens) */}
                  <div className="lg:col-span-5 hidden sm:block">
                    <div 
                      style={{ backgroundColor: 'rgba(15, 30, 54, 0.85)', backdropFilter: 'blur(8px)' }}
                      className="rounded-2xl p-4 sm:p-5 border border-blue-500/30 shadow-xl relative overflow-hidden"
                    >
                      {/* Ambient Glow */}
                      <div className="absolute -top-12 -right-12 w-28 h-28 bg-blue-500/20 rounded-full blur-2xl pointer-events-none" />
                      <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

                      {/* Header in card: Documatch Logo & Status */}
                      <div className="flex items-center justify-between gap-3 mb-3 pb-2.5 border-b border-white/10">
                        <div className="bg-white/95 rounded px-2.5 py-1 shadow-sm inline-flex items-center">
                          <img
                            src="https://customer-assets.emergentagent.com/job_7fe777d6-9bad-4a97-9808-a97a60a006ea/artifacts/x40hmr43_nuevo%20logo%20documatch.jpg"
                            alt="Documatch"
                            className="h-5 sm:h-6 w-auto object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-[10.5px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded-full">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>2026 Validé</span>
                        </span>
                      </div>

                      {/* Compliance feature highlights */}
                      <div className="space-y-1.5 text-xs">
                        <div className="flex items-center gap-2 text-slate-200">
                          <ShieldCheck size={14} className="text-[#fbbf24] shrink-0" />
                          <span className="font-semibold text-[11px] sm:text-xs">
                            {currentLang === 'fr' && '100% Conseil Indépendant & Neutre'}
                            {currentLang === 'es' && '100% Asesoría Neutral e Independiente'}
                            {currentLang === 'de' && '100% Unabhängig & Kostenlos'}
                            {currentLang === 'nl' && '100% Onafhankelijk Advies'}
                            {currentLang === 'en' && '100% Neutral & Independent Advice'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-slate-300">
                          <CheckCircle2 size={14} className="text-blue-400 shrink-0" />
                          <span className="text-[11px] sm:text-xs">
                            {currentLang === 'fr' && '+200 Progiciels GED & ERP Référencés'}
                            {currentLang === 'es' && '+200 Software GED y ERP Analizados'}
                            {currentLang === 'de' && '+200 DMS & ERP-Lösungen im Index'}
                            {currentLang === 'nl' && '+200 DMS & ERP Pakketten Beoordeeld'}
                            {currentLang === 'en' && '+200 DMS & ERP Platforms Indexed'}
                          </span>
                        </div>
                      </div>

                      {/* Tech standard format tags */}
                      <div className="mt-3 pt-2.5 border-t border-white/10 flex flex-wrap gap-1.5">
                        <span className="px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-200 text-[9.5px] font-bold border border-blue-700/50">
                          Factur-X
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-200 text-[9.5px] font-bold border border-blue-700/50">
                          Facturae
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-blue-900/60 text-blue-200 text-[9.5px] font-bold border border-blue-700/50">
                          UBL / Peppol
                        </span>
                        <span className="px-1.5 py-0.5 rounded bg-amber-900/40 text-amber-300 text-[9.5px] font-bold border border-amber-700/40">
                          GoBD / eIDAS
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Category Filter Pills */}
                <div className="relative z-10 flex items-center gap-1.5 overflow-x-auto no-scrollbar pt-2.5 sm:pt-4 mt-2.5 sm:mt-5 border-t border-white/10">
                  {categories.map((cat) => {
                    const isSelected = faqCategory === cat.id;
                    const label = cat.label[currentLang] || cat.label['en'];
                    return (
                      <button
                        key={cat.id}
                        onClick={() => setFaqCategory(cat.id)}
                        style={isSelected ? { backgroundColor: '#2563eb' } : { backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
                        className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg text-[11px] sm:text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer flex items-center gap-1 ${
                          isSelected
                            ? 'text-white shadow-md ring-1 ring-white/30 border border-blue-400'
                            : 'text-slate-200 hover:text-white hover:bg-white/15 border border-white/10'
                        }`}
                      >
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Body: Accordion Items (flex-1 fill with smooth scrolling) */}
              <div className="p-3 sm:p-6 space-y-2.5 sm:space-y-3 overflow-y-auto flex-1 min-h-0 text-slate-700 no-scrollbar bg-slate-50/60">
                {filteredQuestions.length === 0 ? (
                  <div className="text-center py-10 px-4 bg-white rounded-xl border border-dashed border-slate-300">
                    <HelpCircle size={32} className="mx-auto text-slate-300 mb-2" />
                    <p className="text-xs sm:text-sm font-bold text-slate-700">
                      {currentLang === 'fr' && 'Aucune question trouvée'}
                      {currentLang === 'es' && 'No se han encontrado preguntas'}
                      {currentLang === 'de' && 'Keine Fragen gefunden'}
                      {currentLang === 'nl' && 'Geen vragen gevonden'}
                      {currentLang === 'en' && 'No questions found'}
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-500 mt-1">
                      {currentLang === 'fr' && 'Essayez un autre mot-clé ou réinitialisez le filtre.'}
                      {currentLang === 'es' && 'Pruebe con otra palabra clave o restablezca el filtro.'}
                      {currentLang === 'de' && 'Versuchen Sie einen anderen Suchbegriff.'}
                      {currentLang === 'nl' && 'Probeer een andere zoekterm.'}
                      {currentLang === 'en' && 'Try another search keyword or reset the filter.'}
                    </p>
                    <button
                      onClick={() => {
                        setFaqSearch('');
                        setFaqCategory('all');
                      }}
                      className="mt-3 text-xs text-[#2563eb] hover:underline font-bold cursor-pointer"
                    >
                      {currentLang === 'fr' ? 'Réinitialiser la recherche' : currentLang === 'es' ? 'Restablecer búsqueda' : 'Reset search'}
                    </button>
                  </div>
                ) : (
                  filteredQuestions.map((item, index) => {
                    const isOpen = faqOpenIndex === index;
                    const IconComp = item.icon;
                    const tagText = item.tag[currentLang] || item.tag['en'];
                    const questionText = item.q[currentLang] || item.q['en'];
                    const answerText = item.a[currentLang] || item.a['en'];
                    const highlightText = item.highlight[currentLang] || item.highlight['en'];

                    return (
                      <div
                        key={item.id}
                        className={`border rounded-xl transition-all duration-200 bg-white overflow-hidden ${
                          isOpen
                            ? 'border-blue-500/50 shadow-md ring-1 ring-blue-500/20'
                            : 'border-slate-200/90 hover:border-slate-300 hover:shadow-sm'
                        }`}
                      >
                        {/* Question Trigger */}
                        <button
                          onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                          className="w-full flex items-center justify-between gap-2.5 sm:gap-3.5 p-3 sm:p-4.5 text-left cursor-pointer outline-none transition-colors"
                        >
                          <div className="flex items-start gap-2.5 sm:gap-3.5 min-w-0">
                            {/* Icon badge */}
                            <div className={`w-7.5 h-7.5 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${item.iconBg}`}>
                              <IconComp size={16} />
                            </div>

                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 mb-0.5 sm:mb-1">
                                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200/60">
                                  {tagText}
                                </span>
                              </div>
                              <h3 className={`text-xs sm:text-sm font-extrabold leading-snug font-sans transition-colors ${
                                isOpen ? 'text-[#1d4ed8]' : 'text-slate-900'
                              }`}>
                                {questionText}
                              </h3>
                            </div>
                          </div>

                          {/* Chevron Icon */}
                          <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                            isOpen ? 'bg-blue-100 text-blue-700 rotate-180' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}>
                            <ChevronDown size={14} />
                          </div>
                        </button>

                        {/* Expandable Answer */}
                        <div
                          className={`transition-all duration-200 ease-in-out overflow-hidden ${
                            isOpen ? 'max-h-[600px] border-t border-slate-100 bg-slate-50/40' : 'max-h-0'
                          }`}
                        >
                          <div className="p-3 sm:p-5 pt-2 sm:pt-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-sans">
                            {/* Highlight Box */}
                            {highlightText && (
                              <div className="mb-2.5 sm:mb-3.5 p-2.5 sm:p-3 rounded-lg bg-blue-50/80 border-l-3 sm:border-l-4 border-[#2563eb] text-slate-800 text-[11px] sm:text-xs font-medium flex items-start gap-2">
                                <CheckCircle2 size={15} className="text-[#2563eb] shrink-0 mt-0.5" />
                                <span>{highlightText}</span>
                              </div>
                            )}

                            <p className="text-slate-700 leading-relaxed font-normal text-[11.5px] sm:text-xs md:text-sm">
                              {answerText}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Action Banner Footer */}
              <div className="p-3 sm:p-4 bg-white border-t border-slate-200 flex flex-col sm:flex-row gap-2.5 sm:gap-4 justify-between items-center flex-shrink-0">
                <div className="flex items-center gap-2.5 text-left w-full sm:w-auto">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#2563eb] flex items-center justify-center shrink-0 hidden sm:flex">
                    <Clock size={16} />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-slate-900">
                      {currentLang === 'fr' && 'Prêt à tester la conformité de votre GED ?'}
                      {currentLang === 'es' && '¿Listo para verificar la conformidad de su GED?'}
                      {currentLang === 'de' && 'Bereit, Ihre DMS-Konformität zu testen?'}
                      {currentLang === 'nl' && 'Klaar om uw DMS-conformiteit te testen?'}
                      {currentLang === 'en' && 'Ready to verify your document management compliance?'}
                    </span>
                    <span className="hidden sm:block text-[11px] text-slate-500">
                      {currentLang === 'fr' && 'Audit indépendant, 10 questions, résultat immédiat gratuit (~3 min)'}
                      {currentLang === 'es' && 'Auditoría independiente, 10 preguntas, resultado inmediato gratis (~3 min)'}
                      {currentLang === 'de' && 'Unabhängiger Test, 10 Fragen, sofortige kostenlose Auswertung (~3 Min)'}
                      {currentLang === 'nl' && 'Onafhankelijke test, 10 vragen, direct gratis resultaat (~3 min)'}
                      {currentLang === 'en' && 'Independent check, 10 questions, instant free results (~3 min)'}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onCloseModal();
                    onStartQuizFromGuide();
                  }}
                  className="w-full sm:w-auto bg-[#2563eb] hover:bg-[#1d4ed8] text-white text-xs font-extrabold px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl transition-all cursor-pointer whitespace-nowrap shadow-sm hover:shadow flex items-center justify-center gap-2"
                >
                  <span>
                    {currentLang === 'fr' ? 'Démarrer le diagnostic' : currentLang === 'es' ? 'Iniciar diagnóstico' : currentLang === 'de' ? 'Test starten' : currentLang === 'nl' ? 'Start diagnose' : 'Start Free Audit'}
                  </span>
                  <ArrowRight size={14} />
                </button>
              </div>

            </div>
          </div>
        );
      })()}

      {/* =====================================================
           SITEMAP MODAL
         ===================================================== */}
      {activeModal === 'sitemap-modal' && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-[100] bg-black/60 overflow-y-auto p-4 flex items-start justify-center backdrop-blur-sm"
        >
          <div className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl my-8 animate-fade-in font-sans">
            {/* Close button */}
            <button
              onClick={onCloseModal}
              className="absolute top-4 right-4 w-9 h-9 bg-slate-100 hover:bg-slate-200 border-none rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 text-lg font-bold transition-all cursor-pointer z-50"
            >
              ✕
            </button>

            {/* Header */}
            <div className="bg-[#0d1f33] p-6 sm:p-8 text-white">
              <div className="inline-block px-3 py-1 bg-blue-500/20 border border-blue-400/30 rounded-full text-[10px] font-extrabold uppercase tracking-widest text-blue-300 mb-3">
                SEO &amp; Navigation
              </div>
              <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                {currentLang === 'fr' && 'Plan du site (Sitemap)'}
                {currentLang === 'es' && 'Mapa del sitio (Sitemap)'}
                {currentLang === 'en' && 'Website Sitemap'}
                {currentLang === 'de' && 'Seitenstruktur & Sitemap'}
                {currentLang === 'nl' && 'Website Sitemap'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl">
                {currentLang === 'fr' && 'Structure complète des pages, outils de diagnostic et ressources juridiques de Documatch.eu.'}
                {currentLang === 'es' && 'Estructura completa de páginas, herramientas de diagnóstico y recursos legales de Documatch.eu.'}
                {currentLang === 'en' && 'Complete index of pages, diagnostic tools, and compliance resources on Documatch.eu.'}
                {currentLang === 'de' && 'Vollständige Übersicht aller Seiten, Diagnose-Tools und Rechtshinweise auf Documatch.eu.'}
                {currentLang === 'nl' && 'Volledig overzicht van alle pagina\'s, analysetools en juridische bronnen op Documatch.eu.'}
              </p>
            </div>

            {/* Content grid */}
            <div className="p-6 sm:p-8 space-y-6 text-slate-700 text-xs sm:text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Section 1: Main Application & Audit Tool */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-[#1d4ed8] font-black text-sm">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                    <h3>
                      {currentLang === 'fr' ? '1. Diagnostic & Test de Maturité' : currentLang === 'es' ? '1. Diagnóstico y Test de Madurez' : '1. Diagnostic & Audit Tool'}
                    </h3>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600 pl-4 border-l-2 border-blue-200">
                    <li>
                      <button 
                        onClick={() => { onCloseModal(); onStartQuizFromGuide(); }} 
                        className="text-blue-600 hover:underline font-semibold bg-transparent border-none p-0 cursor-pointer text-left"
                      >
                        • {currentLang === 'fr' ? 'Test de conformité GED (20 questions)' : currentLang === 'es' ? 'Test de conformidad GED (20 preguntas)' : 'DMS Compliance Test (20 questions)'}
                      </button>
                    </li>
                    <li>
                      <span className="text-slate-500">
                        • {currentLang === 'fr' ? 'Évaluation des 5 axes : Profil, Système, Conformité, ERP, Projet' : currentLang === 'es' ? 'Evaluación de los 5 ejes: Perfil, Sistema, Conformidad, ERP, Proyecto' : 'Evaluation across 5 axes'}
                      </span>
                    </li>
                    <li>
                      <span className="text-slate-500">
                        • {currentLang === 'fr' ? 'Génération de rapport PDF gratuit' : currentLang === 'es' ? 'Generación de informe PDF gratuito' : 'Free downloadable PDF Report'}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Section 2: Compliance Guide & FAQ */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-[#1d4ed8] font-black text-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                    <h3>
                      {currentLang === 'fr' ? '2. Guides & Informations Légales' : currentLang === 'es' ? '2. Guías e Información Legal' : '2. Guides & Regulatory Hub'}
                    </h3>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600 pl-4 border-l-2 border-emerald-200">
                    <li>
                      <button 
                        onClick={() => { onCloseModal(); window.dispatchEvent(new CustomEvent('open-modal', { detail: 'guide-modal' })); }} 
                        className="text-emerald-700 hover:underline font-semibold bg-transparent border-none p-0 cursor-pointer text-left"
                      >
                        • {currentLang === 'fr' ? 'Guide complet réforme e-Invoicing' : currentLang === 'es' ? 'Guía completa reforma e-Factura' : 'e-Invoicing Compliance Guide'}
                      </button>
                    </li>
                    <li>
                      <button 
                        onClick={() => { onCloseModal(); window.dispatchEvent(new CustomEvent('open-modal', { detail: 'faq-modal' })); }} 
                        className="text-emerald-700 hover:underline font-semibold bg-transparent border-none p-0 cursor-pointer text-left"
                      >
                        • {currentLang === 'fr' ? 'Foire Aux Questions (FAQ)' : currentLang === 'es' ? 'Preguntas Frecuentes (FAQ)' : 'Frequently Asked Questions (FAQ)'}
                      </button>
                    </li>
                    <li>
                      <span className="text-slate-500">
                        • {currentLang === 'fr' ? 'Normes NF Z42-020, eIDAS, GoBD, Peppol / UBL' : currentLang === 'es' ? 'Normativa Ley Crea y Crece, eIDAS, GoBD, Peppol' : 'Compliance standards (eIDAS, GoBD, Peppol)'}
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Section 3: Legal Policies */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-[#1d4ed8] font-black text-sm">
                    <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                    <h3>
                      {currentLang === 'fr' ? '3. Politique & Confidentialité' : currentLang === 'es' ? '3. Políticas y Privacidad' : '3. Legal & Privacy Policies'}
                    </h3>
                  </div>
                  <ul className="space-y-2 text-xs text-slate-600 pl-4 border-l-2 border-amber-200">
                    <li>
                      <button onClick={() => { onCloseModal(); window.dispatchEvent(new CustomEvent('open-modal', { detail: 'mentions-modal' })); }} className="text-slate-700 hover:text-blue-600 underline bg-transparent border-none p-0 cursor-pointer text-left">
                        • {TRANSLATIONS['footer.legal.mentions'][currentLang]}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onCloseModal(); window.dispatchEvent(new CustomEvent('open-modal', { detail: 'rgpd-modal' })); }} className="text-slate-700 hover:text-blue-600 underline bg-transparent border-none p-0 cursor-pointer text-left">
                        • {TRANSLATIONS['footer.legal.privacy'][currentLang]}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onCloseModal(); window.dispatchEvent(new CustomEvent('open-modal', { detail: 'cgu-modal' })); }} className="text-slate-700 hover:text-blue-600 underline bg-transparent border-none p-0 cursor-pointer text-left">
                        • {TRANSLATIONS['footer.legal.cgu'][currentLang]}
                      </button>
                    </li>
                    <li>
                      <button onClick={() => { onCloseModal(); window.dispatchEvent(new CustomEvent('open-modal', { detail: 'cookies-modal' })); }} className="text-slate-700 hover:text-blue-600 underline bg-transparent border-none p-0 cursor-pointer text-left">
                        • {TRANSLATIONS['footer.legal.cookies'][currentLang]}
                      </button>
                    </li>
                  </ul>
                </div>

                {/* Section 4: European Countries & Languages */}
                <div className="bg-slate-50 border border-slate-200/80 rounded-xl p-5 space-y-3">
                  <div className="flex items-center gap-2 text-[#1d4ed8] font-black text-sm">
                    <span className="w-2 h-2 rounded-full bg-indigo-600"></span>
                    <h3>
                      {currentLang === 'fr' ? '4. Couverture Européenne' : currentLang === 'es' ? '4. Cobertura Europea' : '4. European Coverage'}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    {currentLang === 'fr' ? 'Diagnostics personnalisés par marché :' : currentLang === 'es' ? 'Diagnósticos personalizados por país:' : 'Localized diagnostic models:'}
                  </p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-semibold text-slate-700">🇫🇷 France (FR)</span>
                    <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-semibold text-slate-700">🇪🇸 España (ES)</span>
                    <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-semibold text-slate-700">🇩🇪 Deutschland (DE)</span>
                    <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-semibold text-slate-700">🇳🇱 Nederland (NL)</span>
                    <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-semibold text-slate-700">🇧🇪 Belgique</span>
                    <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-semibold text-slate-700">🇨🇭 Suisse</span>
                    <span className="px-2 py-0.5 bg-white border border-slate-200 rounded text-[11px] font-semibold text-slate-700">🇱🇺 Luxembourg</span>
                  </div>
                </div>

              </div>

              {/* XML Sitemap Action Footer */}
              <div className="pt-4 border-t flex flex-col sm:flex-row items-center justify-between gap-4 bg-blue-50/50 p-4 rounded-xl border border-blue-100">
                <div className="text-xs text-slate-600">
                  <strong className="text-slate-800">XML Sitemap Engine:</strong>{' '}
                  {currentLang === 'fr' ? 'Fichier XML structuré conforme aux normes Google et Bing Webmaster.' : currentLang === 'es' ? 'Archivo XML estructurado conforme a las normas de Google y Bing Webmaster.' : 'Standard XML file compliant with Google Search Console & Bing Webmaster.'}
                </div>
                <a
                  href="/sitemap.xml"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-5 py-2.5 rounded-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer no-underline"
                >
                  <span>{currentLang === 'fr' ? 'Ouvrir sitemap.xml' : currentLang === 'es' ? 'Abrir sitemap.xml' : 'Open sitemap.xml'}</span>
                  <span>↗</span>
                </a>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};
