import React, { useState } from 'react';
import { Language } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { HelpCircle, ChevronDown } from 'lucide-react';

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
            <div className="bg-gradient-to-r from-[#0d1f33] to-[#1e3a5f] p-8 text-white relative">
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
      {activeModal === 'faq-modal' && (
        <div
          onClick={handleOverlayClick}
          className="fixed inset-0 z-[100] bg-black/60 overflow-y-auto p-4 flex items-start justify-center backdrop-blur-sm"
        >
          <div className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl my-8 animate-fade-in">
            {/* Close button */}
            <button
              onClick={onCloseModal}
              className="absolute top-4 right-4 w-9 h-9 bg-slate-100 hover:bg-slate-200 border-none rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 text-lg font-bold transition-all cursor-pointer z-50"
            >
              ✕
            </button>

            {/* Header */}
            <div className="bg-gradient-to-r from-[#0d1f33] to-[#1e3a5f] p-8 text-white relative">
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:30px_30px]" />
              <div className="relative z-10 max-w-2xl">
                <span className="inline-block text-[10px] font-extrabold tracking-widest text-[#fbbf24] uppercase bg-amber-500/10 border border-amber-500/20 rounded px-2.5 py-1 mb-3">
                  FAQ
                </span>
                <h2 className="text-xl sm:text-3xl font-extrabold leading-tight font-sans">
                  {currentLang === 'fr' && 'Questions fréquentes — Réforme 2026 & Audit'}
                  {currentLang === 'es' && 'Preguntas frecuentes — Reforma 2026 y Diagnóstico'}
                  {currentLang === 'en' && 'Frequently Asked Questions — 2026 Reform & Audit'}
                </h2>
                <p className="text-xs text-white/60 mt-2 max-w-lg leading-relaxed font-sans font-normal">
                  {currentLang === 'fr' && 'Retrouvez les réponses clés concernant les nouvelles obligations légales de facturation et l’intérêt du diagnostic de maturité.'}
                  {currentLang === 'es' && 'Respuestas directas sobre la nueva normativa de facturación obligatoria y el rol del test de madurez.'}
                  {currentLang === 'en' && 'Find key answers regarding the upcoming mandatory B2B billing regulations and how this diagnostic audit supports your transition.'}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="p-6 sm:p-8 space-y-4 overflow-y-auto max-h-[60vh] text-slate-700 no-scrollbar">
              
              {/* Accordion container */}
              <div className="space-y-3">
                {[
                  // Q1
                  {
                    q: {
                      fr: "Qu'est-ce que la réforme réglementaire de 2026 ?",
                      es: "¿En qué consiste la reforma reguladora de 2026?",
                      en: "What is the 2026 B2B e-invoicing and document reform?"
                    },
                    a: {
                      fr: "À partir du 1er septembre 2026, la facturation électronique B2B devient obligatoire en France en réception pour toutes les entreprises, et en émission pour les Grandes et ETI. Elle impose l'échange de factures structurées sous formats normalisés (Factur-X, UBL, ou CII) acheminées via l'annuaire national officiel en s'appuyant sur le PPF ou des PDP agréées.",
                      es: "A partir de 2026, la facturación electrónica obligatoria en transacciones comerciales B2B entra en vigor en España a través de la Ley Crea y Crece. Esto obliga a todas las empresas y trabajadores autónomos a emitir y recibir sus facturas de forma 100% digital en formatos informáticos estructurados (como Facturae o UBL).",
                      en: "European nations are actively enforcing mandatory digital business transactions. Major regulations take effect in France from September 2026 (compulsory B2B reception) and in Spain through the Crea y Crece law. Together with Germany's GoBD and Dutch Peppol standards, companies are legally required to process structured, machine-readable XML invoice formats instead of flat PDF attachments."
                    }
                  },
                  // Q2
                  {
                    q: {
                      fr: "Pourquoi est-il crucial de faire un audit de maturité GED maintenant ?",
                      es: "¿Por qué es necesario realizar un diagnóstico de madurez GED ahora?",
                      en: "Why is a document management (DMS) maturity check crucial today?"
                    },
                    a: {
                      fr: "L'obligation légale n'est que la partie visible. Intégrer l'e-invoicing nécessite d'adapter votre outil de Gestion Électronique des Documents (GED) et votre comptabilité. Cet audit évalue si vos outils actuels savent lire automatiquement les données (OCR/LAD), gérer des workflows d'approbation fluides, s'interfacer avec votre ERP, et archiver de façon légale à valeur probante.",
                      es: "Adoptar la facturación electrónica requiere una adecuada Gestión Electrónica de Documentos (GED) para digitalizar los flujos administrativos. El diagnóstico evalúa si sus sistemas son capaces de leer automáticamente los campos con OCR, procesar aprobaciones internas de pagos, sincronizar datos con su software ERP o contable actual, y conservar los archivos de forma inalterable.",
                      en: "A digital mandate affects your entire accounting workflow. Our check evaluates if your existing tech stack features accurate data ingestion (OCR), compliant multi-level authorization workflows, native interfaces to your ledger or ERP, and audit-proof compliance archiving."
                    }
                  },
                  // Q3
                  {
                    q: {
                      fr: "Qu'est-ce que le score de maturité Documatch Lab et comment m'aide-t-il ?",
                      es: "¿Cómo funciona el score de madurez de Documatch Lab?",
                      en: "What is the Documatch Lab maturity score and how does it help?"
                    },
                    a: {
                      fr: "Le score (de 0 à 100) est un indicateur mathématique de préparation technique développé par nos experts. En répondant aux 10 questions de l'audit, notre algorithme classe votre maturité (Faible, Intermédiaire, Avancée), met en évidence vos vulnérabilités de conformité, et vous délivre une synthèse personnalisée assortie d'un plan d'actions clair.",
                      es: "El score obtenido (de 0 a 100) mide el nivel de integración técnica y de cumplimiento normativo de su negocio. Basado en 10 preguntas específicas sobre su organización de archivos, nuestro algoritmo de auditoría clasifica su estado operativo (Bajo, Medio, Alto) y genera de inmediato un informe de madurez con pautas.",
                      en: "The score (ranging from 0 to 100) represents an algorithmic index of your operational and technical compliance readiness. By grading your answers across 10 vital workflow pillars, the report highlights potential structural vulnerabilities, maps your preparedness tier, and yields a customized action plan with concrete software requirements."
                    }
                  },
                  // Q4
                  {
                    q: {
                      fr: "Ce diagnostic est-il réellement gratuit et neutre ?",
                      es: "¿Es este servicio verdaderamente gratuito y neutral?",
                      en: "Is this diagnostic assessment truly free and independent?"
                    },
                    a: {
                      fr: "Oui, à 100%. Documatch.eu est un service de conseil totalement indépendant et objectif. Nous ne commercialisons aucun logiciel et nous ne percevons aucune commission. Notre unique rôle de tiers de confiance est d'analyser vos besoins et de vous recommander de manière impartiale la solution la plus compatible parmi plus de 200 progiciels évalués sur le marché.",
                      es: "Sí, es completamente gratuito y sin ningún compromiso comercial. Documatch.eu opera como un tercero neutral en el mercado de software. No vendemos licencias, no somos distribuidores y no favorecemos a ningún fabricante. Ofrecemos recomendaciones transparentes basadas en las necesidades específicas de integración de su ERP.",
                      en: "Yes, entirely. Documatch.eu is a 100% independent consulting guide. We do not sell software packages, do not work as certified resellers, and do not receive commission kickbacks. Our sole objective is to provide a reliable, objective filter to help you discover the ideal Document Management solution from more than 200 major tools analyzed in our European index."
                    }
                  },
                  // Q5
                  {
                    q: {
                      fr: "Quels sont les risques et sanctions encourus en cas de non-conformité ?",
                      es: "¿Cuáles son las sanciones y riesgos si mi empresa no se adapta?",
                      en: "What are the penalties and financial risks of non-compliance?"
                    },
                    a: {
                      fr: "La non-conformité s'accompagne d'un lourd tribut : amendes administratives (15 € par facture non conforme), rejet de votre comptabilité par le fisc, perte du droit à déduction de la TVA, retards de paiement, ou pénalités financières allant jusqu'à 10 000 € en Espagne sous la loi Crea y Crece.",
                      es: "La normativa española de la Ley Crea y Crece establece sanciones económicas estrictas de hasta 10.000 € para aquellas empresas que no ofrezcan a sus clientes la recepción de facturas electrónicas. Operativamente, también se arriesga a retrasos en cobros de clientes, fallos de auditoría de Hacienda, y exclusión de licitaciones públicas.",
                      en: "Failing to establish compliant pipelines can lead to catastrophic business disruption. Penalties include severe state fines (up to €10,000 in Spain, or €15 per-invoice fines in France), loss of business tax deductions, and total exclusion from procurement bids. Furthermore, outdated workflows invite manual errors and direct cash flow problems."
                    }
                  }
                ].map((item, index) => {
                  const isOpen = faqOpenIndex === index;
                  return (
                    <div
                      key={index}
                      className={`border rounded-xl transition-all duration-200 ${
                        isOpen
                          ? 'border-[#2563eb]/30 bg-blue-50/10 shadow-sm'
                          : 'border-slate-100 bg-white hover:bg-slate-50/50'
                      }`}
                    >
                      <button
                        onClick={() => setFaqOpenIndex(isOpen ? null : index)}
                        className="w-full flex items-center justify-between gap-4 p-4 text-left cursor-pointer outline-none rounded-xl"
                      >
                        <div className="flex items-start gap-3">
                          <HelpCircle className={`mt-0.5 shrink-0 ${isOpen ? 'text-[#2563eb]' : 'text-slate-400'}`} size={16} />
                          <span className={`text-xs sm:text-sm font-extrabold leading-snug font-sans transition-colors ${
                            isOpen ? 'text-[#1d4ed8]' : 'text-[#122847]'
                          }`}>
                            {item.q[currentLang] || item.q['en']}
                          </span>
                        </div>
                        <ChevronDown
                          size={14}
                          className={`text-slate-400 shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[#2563eb]' : ''
                          }`}
                        />
                      </button>

                      <div
                        className={`transition-all duration-200 ease-in-out overflow-hidden ${
                          isOpen ? 'max-h-[350px] border-t border-slate-100/50' : 'max-h-0'
                        }`}
                      >
                        <div className="p-4 text-[11px] sm:text-xs text-slate-600 leading-relaxed font-sans font-normal">
                          {item.a[currentLang] || item.a['en']}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action Button inside Guide */}
              <div className="pt-6 border-t flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50 -mx-6 sm:-mx-8 -mb-6 sm:-mb-8 p-6 mt-4">
                <span className="text-xs text-slate-500 max-w-sm text-center sm:text-left leading-normal font-sans font-medium">
                  {currentLang === 'fr' && 'Prêt à tester la conformité de votre GED ?'}
                  {currentLang === 'es' && '¿Listo para probar el nivel de preparación de su GED?'}
                  {currentLang === 'en' && 'Ready to verify your document management compliance readiness?'}
                </span>
                <button
                  onClick={() => {
                    onCloseModal();
                    onStartQuizFromGuide();
                  }}
                  className="bg-[#2563eb] hover:bg-[#1e3a5f] text-white text-xs font-bold px-6 py-3 rounded-xl transition-all cursor-pointer whitespace-nowrap font-sans"
                >
                  {currentLang === 'fr' ? 'Démarrer le diagnostic' : currentLang === 'es' ? 'Iniciar diagnóstico' : 'Start Free Audit'}
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

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
