import React, { useEffect, useState } from 'react';
import { Language, LeadData } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { AlertCircle, ArrowRight, ArrowLeft, ExternalLink, Mail, CheckCircle2, ChevronRight, Printer, Share2 } from 'lucide-react';
import { Logo } from './Logo';
import { ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface ResultProps {
  currentLang: Language;
  answers: (number | null)[];
  questions: any[];
  leadData: LeadData;
  onRestart: () => void;
}

const AXIS_CONF = {
  profil: {
    name: { fr: 'Profil décisionnel', es: 'Perfil decisional', en: 'Decision Profile' },
    color: '#3b82f6',
  },
  systeme: {
    name: { fr: 'Maturité système', es: 'Madurez del sistema', en: 'System Maturity' },
    color: '#10b981',
  },
  conformite: {
    name: { fr: 'Conformité légale', es: 'Conformidad legal', en: 'Legal Compliance' },
    color: '#f59e0b',
  },
  erp: {
    name: { fr: 'Intégrations ERP', es: 'Integraciones ERP', en: 'ERP Integrations' },
    color: '#8b5cf6',
  },
  projet: {
    name: { fr: 'Maturité projet', es: 'Madurez del proyecto', en: 'Project Readiness' },
    color: '#ef4444',
  },
};

const LinkedinIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const XIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

export const Result: React.FC<ResultProps> = ({
  currentLang,
  answers,
  questions,
  leadData,
  onRestart,
}) => {
  const [score, setScore] = useState(0);
  const [copied, setCopied] = useState(false);
  const [iframeWarning, setIframeWarning] = useState(false);
  const [sendingEmail, setSendingEmail] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Compute scores
  const axisScores: { [key: string]: number } = {};
  const axisTotals: { [key: string]: { sum: number; count: number } } = {};

  questions.forEach((q, idx) => {
    const selectedOptIdx = answers[idx];
    if (selectedOptIdx !== null) {
      if (!axisTotals[q.axis]) {
        axisTotals[q.axis] = { sum: 0, count: 0 };
      }
      axisTotals[q.axis].sum += q.opts[selectedOptIdx].s;
      axisTotals[q.axis].count += 1;
    }
  });

  Object.keys(axisTotals).forEach((axis) => {
    const data = axisTotals[axis];
    axisScores[axis] = Math.round((data.sum / data.count) * 10);
  });

  const finalScore = Math.round(
    Object.values(axisScores).reduce((a, b) => a + b, 0) / Object.keys(axisScores).length
  );

  const getShareTextAndHashtags = () => {
    let text = '';
    let hashtags = '';
    const shareUrl = `https://www.documatch.eu/#/${currentLang}`;

    if (currentLang === 'fr') {
      text = `J'ai évalué la maturité de ma GED pour la facturation électronique 2026 sur Documatch Lab ! Mon score de conformité : ${finalScore}/100. Faites le test gratuit vous aussi :`;
      hashtags = 'GED,eInvoicing,FacturationElectronique,Documatch,Conformite2026';
    } else if (currentLang === 'es') {
      text = `¡He evaluado la madurez de mi gestión documental para la factura electrónica en Documatch Lab! Puntuación de conformidad: ${finalScore}/100. Evalúa tu empresa gratis aquí:`;
      hashtags = 'Documatch,FacturaElectronica,GED,Digitalizacion,LeyCreaYCrece';
    } else {
      text = `I just evaluated our Document Management System maturity for B2B e-invoicing compliance on Documatch Lab! Our compliance score: ${finalScore}/100. Take the free diagnostic here:`;
      hashtags = 'DMS,eInvoicing,Documatch,DigitalTransformation,Compliance2026';
    }

    return { text, hashtags, shareUrl };
  };

  const handleCopyPost = () => {
    const { text, hashtags, shareUrl } = getShareTextAndHashtags();
    const hashStr = hashtags.split(',').map(h => `#${h}`).join(' ');
    const fullMessage = `${text} ${shareUrl}\n\n${hashStr}`;
    
    navigator.clipboard.writeText(fullMessage).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  useEffect(() => {
    let displayed = 0;
    const ticker = setInterval(() => {
      displayed = Math.min(displayed + 2, finalScore);
      setScore(displayed);
      if (displayed >= finalScore) clearInterval(ticker);
    }, 20);
    return () => clearInterval(ticker);
  }, [finalScore]);

  // Level thresholds
  const getLevelConfig = () => {
    const fr = currentLang === 'fr';
    const es = currentLang === 'es';

    if (finalScore >= 80) {
      return {
        pill: fr ? '🏆 Maturité Avancée' : es ? '🏆 Madurez Avanzada' : '🏆 Advanced Maturity',
        color: '#10b981',
        bg: 'rgba(16,185,129,0.15)',
        title: fr 
          ? 'Votre organisation est en excellente posture' 
          : es 
          ? 'Su organización está en excelente posición' 
          : 'Excellent digital compliance and workflow design',
        intro: fr
          ? `${leadData.firstname}, votre infrastructure documentaire est parmi les plus matures de votre secteur. Quelques ajustements de conformité liés à la réforme 2026 pourraient encore optimiser votre dispositif avant l'échéance de septembre.`
          : es
          ? `${leadData.firstname}, su infraestructura documental está entre las más maduras de su sector. Algunos ajustes de conformidad relacionados con la reforma de la Ley Crea y Crece optimizarían aún más su dispositivo.`
          : `${leadData.firstname}, your document management workflows are highly robust. Some minor localized e-invoicing alignments (e.g. GoBD / Peppol standards) will perfect your platform ahead of 2025/2026 deadlines.`,
      };
    } else if (finalScore >= 60) {
      return {
        pill: fr ? '📈 Maturité Intermédiaire' : es ? '📈 Madurez Intermedia' : '📈 Intermediate Maturity',
        color: '#2563eb',
        bg: 'rgba(37,99,235,0.1)',
        title: fr 
          ? 'De bonnes bases — des actions prioritaires s\'imposent' 
          : es 
          ? 'Tiene buenas bases — se imponen acciones prioritarias' 
          : 'Solid foundations — critical updates needed soon',
        intro: fr
          ? `${leadData.firstname}, votre organisation a engagé le virage numérique. Mais face aux obligations du 1er septembre 2026, 3 à 4 points critiques nécessitent une attention rapide pour éviter tout risque de non-conformité et ses pénalités.`
          : es
          ? `${leadData.firstname}, su organización ha iniciado la transformación digital. Pero frente a las obligaciones de la Ley Crea y Crece, de 3 a 4 puntos críticos requieren atención urgente para evitar sanciones.`
          : `${leadData.firstname}, your organization has implemented basic document flows. However, to meet Germany\'s GoBD or Netherlands\' Peppol mandates, a few critical system integrations require urgent alignment.`,
      };
    } else if (finalScore >= 40) {
      return {
        pill: fr ? '⚠️ Maturité en Développement' : es ? '⚠️ Madurez en Desarrollo' : '⚠️ Evolving Maturity',
        color: '#f59e0b',
        bg: 'rgba(245,158,11,0.12)',
        title: fr 
          ? 'Un plan d\'action structuré est nécessaire' 
          : es 
          ? 'Se necesita un plan de acción estructurado' 
          : 'Structured action plan is highly recommended',
        intro: fr
          ? `${leadData.firstname}, il reste un chemin important à parcourir avant le 1er septembre 2026. La bonne nouvelle : des solutions GED adaptées à votre profil permettent une mise en conformité rapide.`
          : es
          ? `${leadData.firstname}, queda un camino importante por recorrer antes del plazo legal. La buena noticia: las soluciones GED adaptadas a su perfil permiten una puesta en conformidad rápida.`
          : `${leadData.firstname}, your document systems require structured development to meet audit requirements. With 2025/2026 mandates fast approaching, adopting a certified cloud DMS is your safest route to compliance.`,
      };
    } else {
      return {
        pill: fr ? '🚨 Risque de Non-Conformité' : es ? '🚨 Riesgo de Incumplimiento' : '🚨 High Compliance Risk',
        color: '#ef4444',
        bg: 'rgba(239,68,68,0.1)',
        title: fr 
          ? 'Votre exposition légale est significative' 
          : es 
          ? 'Su exposición legal es significativa' 
          : 'High risk of non-compliance identified',
        intro: fr
          ? `${leadData.firstname}, votre organisation est exposée à des risques importants liés à la réforme du 1er septembre 2026. Une intervention rapide est indispensable pour éviter d'importantes pénalités fiscales.`
          : es
          ? `${leadData.firstname}, su organización está expuesta a riesgos importantes de sanciones (hasta 10.000 €). Una intervención rápida es indispensable para cumplir con la Ley Crea y Crece.`
          : `${leadData.firstname}, your current setup leaves your firm heavily exposed to severe audit vulnerabilities. Rapid implementation of a certified, compliant DMS partner is highly critical.`,
      };
    }
  };

  const lvlConf = getLevelConfig();

  // Custom recommendations based on scores
  const getCustomRecommendations = () => {
    const fr = currentLang === 'fr';
    const es = currentLang === 'es';
    const list = [];

    if (axisScores.conformite < 60) {
      list.push({
        urgent: true,
        text: fr
          ? 'Votre conformité réglementaire est critique. La facturation électronique B2B sera obligatoire en France dès le 1er septembre 2026. Vous devez engager dès maintenant le choix d\'une plateforme PDP agréée par la DGFiP ou vous préparer au raccordement PPF.'
          : es
          ? 'Su conformidad legal es crítica. La Ley Crea y Crece exige facturación B2B certificada. Contacte de inmediato con un operador privado (ESF) homologado por la AEAT para digitalizar sus facturas.'
          : 'Urgent: Your local tax and invoice compliance level is critical. Ensure GoBD-certified archiving (Germany) or Peppol-compatible XML (NLius, Netherlands) is fully set up via a certified DMS immediately.'
      });
    }

    if (axisScores.systeme < 50) {
      list.push({
        urgent: true,
        text: fr
          ? 'Éliminez le papier et les silos : Votre taux actuel de numérisation ou vos classeurs partagés nuisent à votre efficacité opérationnelle. Migrez vers une solution GED centrale avec indexation intelligente (LAD/RAD) pour gagner jusqu\'à 30% de temps administratif.'
          : es
          ? 'Elimine el papel: Su tasa de digitalización o uso de carpetas compartidas pone en riesgo su eficiencia. Adopte una GED con indexación OCR inteligente para agilizar su contabilidad.'
          : 'Upgrade your document capture: Outdated folder silos or physical paper files delay invoice processing. Transition to intelligent automated indexing (OCR/LAD) to speed up invoice ingestion.'
      });
    }

    if (axisScores.erp < 60) {
      list.push({
        urgent: false,
        text: fr
          ? 'Évitez la double saisie : Connectez votre GED à votre ERP actuel via des connecteurs API natifs. Cela éliminera 99% des erreurs de transfert d\'écritures comptables.'
          : es
          ? 'Evite duplicar datos: Conecte su GED a su ERP mediante sincronización bidireccional en tiempo real para agilizar los asientos contables.'
          : 'Bridge your DMS and ERP: Manual export/imports are inefficient. Seek native API sync connectors to route extracted metadata directly into your ledger without double-handling.'
      });
    }

    if (axisScores.conformite >= 60 && axisScores.conformite < 80) {
      list.push({
        urgent: false,
        text: fr
          ? 'Sécurisez vos archives à long terme : Mettez en place un coffre-fort électronique certifié (norme NF Z42-020) pour préserver l\'intégrité légale de vos factures et contrats pendant 10 ans.'
          : es
          ? 'Asegure su archivo a largo plazo: Implemente un almacén electrónico con valor probatorio legal eIDAS para proteger sus documentos contractuales.'
          : 'Strengthen security: Deploy eIDAS-certified digital signatures and a compliant electronic safe (WORM-compliant) to safeguard contracts and tax documents over their full legal retention span.'
      });
    }

    if (axisScores.systeme >= 75) {
      list.push({
        urgent: false,
        text: fr
          ? 'Excellent niveau technologique ! Tirez parti des nouvelles fonctionnalités d\'intelligence artificielle et de recherche sémantique intégrées pour simplifier l\'accès à l\'information.'
          : es
          ? '¡Excelente nivel tecnológico! Aproveche la inteligencia artificial y la búsqueda semántica en su GED para optimizar aún más sus procesos de negocio.'
          : 'Leverage AI search capabilities: With a mature base system, deploying semantic and intelligent AI search filters will maximize information accessibility across departments.'
      });
    }

    list.push({
      urgent: false,
      text: fr
        ? `Consultez gratuitement le comparateur indépendant Documatch.eu pour identifier les outils GED/DMS certifiés PDP, parfaitement compatibles avec votre ERP et adaptés à votre secteur.`
        : es
        ? `Consulte de forma gratuita el comparador independiente Documatch.eu para encontrar las soluciones GED/DMS con soporte de FacturaE compatibles con su ERP.`
        : 'Consult Documatch.eu specialists for a free, independent software evaluation. We match your ERP and local tax needs with the ideal, certified international DMS vendors.'
    });

    return list.slice(0, 4);
  };

  const handlePrint = () => {
    const isIframe = typeof window !== 'undefined' && window.self !== window.top;
    if (isIframe) {
      setIframeWarning(true);
    }
    try {
      window.print();
    } catch (err) {
      console.error('Print call failed:', err);
    }
  };

  const handleSendEmail = () => {
    setSendingEmail(true);
    setTimeout(() => {
      setSendingEmail(false);
      setEmailSent(true);
    }, 1200);
  };

  return (
    <section className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Print-Only Header Block */}
        <div className="hidden print:flex items-center justify-between border-b-2 border-slate-200 pb-5 mb-6 text-slate-800">
          <div className="flex items-center gap-2">
            <Logo size="sm" />
            <div className="flex items-baseline gap-1.5">
              <span className="font-sans font-bold text-2xl text-slate-900 leading-none tracking-tight">
                Docu<span className="text-[#2563eb]">match</span>
              </span>
              <span className="text-[9px] font-bold tracking-wider text-[#f59e0b] uppercase bg-slate-100 border border-[#f59e0b] rounded px-1 py-0.5 leading-none">
                LAB
              </span>
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-base font-extrabold text-slate-900">
              {currentLang === 'fr' ? 'RAPPORT DE MATURITÉ GED' : currentLang === 'es' ? 'INFORME DE MADUREZ GED' : 'DMS MATURITY REPORT'}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              {new Date().toLocaleDateString(currentLang === 'fr' ? 'fr-FR' : currentLang === 'es' ? 'es-ES' : 'en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
        </div>

        {/* Print-Only Lead Metadata Table */}
        <div className="hidden print:grid print-metadata-grid grid-cols-2 gap-y-2 gap-x-4 border border-slate-200 bg-slate-50/50 rounded-xl p-4 text-xs text-slate-700 mb-6">
          <div>
            <span className="font-semibold text-slate-500">{currentLang === 'fr' ? 'Destinataire :' : currentLang === 'es' ? 'Destinatario:' : 'Prepared for:'} </span>
            <span className="font-bold text-slate-900">{leadData.firstname} {leadData.lastname}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-500">{currentLang === 'fr' ? 'Entreprise :' : currentLang === 'es' ? 'Empresa:' : 'Company:'} </span>
            <span className="font-bold text-slate-900">{leadData.company}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-500">{currentLang === 'fr' ? 'Fonction :' : currentLang === 'es' ? 'Cargo:' : 'Role:'} </span>
            <span className="font-bold text-slate-900">{leadData.role}</span>
          </div>
          <div>
            <span className="font-semibold text-slate-500">Email : </span>
            <span className="font-bold text-slate-900">{leadData.email}</span>
          </div>
          {leadData.phone && (
            <div>
              <span className="font-semibold text-slate-500">{currentLang === 'fr' ? 'Téléphone :' : currentLang === 'es' ? 'Teléfono:' : 'Phone:'} </span>
              <span className="font-bold text-slate-900">{leadData.phone}</span>
            </div>
          )}
          {leadData.country && (
            <div>
              <span className="font-semibold text-slate-500">{currentLang === 'fr' ? 'Région / Pays :' : currentLang === 'es' ? 'País:' : 'Country:'} </span>
              <span className="font-bold text-slate-900">{leadData.country}</span>
            </div>
          )}
        </div>

        {/* Result Hero Card */}
        <div className="bg-[#1e3a5f] rounded-2xl p-8 text-center text-white relative overflow-hidden shadow-xl print:bg-white print:text-slate-800 print:border print:border-slate-200 print:shadow-none">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none print:hidden" />
          
          <div className="relative z-10 space-y-6">
            {/* Score circle */}
            <div className="flex justify-center">
              <div className="relative w-40 h-40 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'score', value: score },
                        { name: 'remaining', value: Math.max(0, 100 - score) }
                      ]}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={62}
                      outerRadius={74}
                      startAngle={90}
                      endAngle={-270}
                      stroke="none"
                      isAnimationActive={false}
                    >
                      <Cell fill={lvlConf.color} />
                      <Cell fill="rgba(255,255,255,0.08)" className="print:fill-slate-200" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-4xl font-extrabold text-white print:text-slate-900 leading-none">{score}</span>
                  <span className="text-[10px] text-white/50 print:text-slate-500 tracking-wider font-semibold mt-1">/ 100</span>
                </div>
              </div>
            </div>

            {/* Level badge */}
            <div className="inline-block text-xs font-bold px-4 py-1.5 rounded-full print:border print:border-slate-300" style={{ backgroundColor: lvlConf.bg, color: lvlConf.color }}>
              {lvlConf.pill}
            </div>

            <h2 className="font-sans font-extrabold text-xl sm:text-2xl text-white print:text-slate-900">
              {lvlConf.title}
            </h2>

            <p className="text-xs sm:text-sm text-white/70 print:text-slate-600 leading-relaxed max-w-2xl mx-auto">
              {lvlConf.intro}
            </p>

            {/* Download PDF / Send to Email Actions */}
            <div className="pt-4 print:hidden flex flex-col items-center gap-3">
              <div className="flex flex-wrap items-center justify-center gap-3">
                {/* Save/Download PDF Button */}
                <button
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-white bg-[#2563eb] hover:bg-[#1d4ed8] active:bg-[#1e40af] border border-white/10 rounded-full px-6 py-3 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-150"
                >
                  <Printer size={16} />
                  <span>{TRANSLATIONS['result.btn.print'][currentLang]}</span>
                </button>

                {/* Send Report to Email Button */}
                <button
                  onClick={handleSendEmail}
                  disabled={sendingEmail}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-extrabold text-slate-800 bg-emerald-400 hover:bg-emerald-300 active:bg-emerald-500 rounded-full px-6 py-3 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-150 disabled:opacity-60"
                >
                  <Mail size={16} />
                  <span>
                    {sendingEmail
                      ? (currentLang === 'fr' ? 'Envoi en cours...' : currentLang === 'es' ? 'Enviando...' : 'Sending...')
                      : (currentLang === 'fr' ? `Envoyer par email` : currentLang === 'es' ? `Enviar a mi correo` : `Send to my email`)}
                  </span>
                </button>
              </div>

              {/* Email Sent Toast Banner */}
              {emailSent && (
                <div className="p-3 bg-emerald-500/20 border border-emerald-400/40 rounded-xl text-emerald-300 text-xs flex items-center gap-2 animate-fade-in max-w-md">
                  <CheckCircle2 size={18} className="shrink-0 text-emerald-400" />
                  <span>
                    {currentLang === 'fr'
                      ? `Rapport envoyé avec succès à ${leadData.email || 'votre adresse email'} !`
                      : currentLang === 'es'
                      ? `¡Informe enviado con éxito a ${leadData.email || 'su correo electrónico'}!`
                      : `Report successfully sent to ${leadData.email || 'your email'}!`}
                  </span>
                </div>
              )}

              <p className="text-[10px] text-white/50 max-w-md text-center font-normal leading-relaxed mt-1">
                {currentLang === 'fr' 
                  ? 'Astuce : Le bouton PDF ouvre les options d\'impression pour enregistrer le fichier localement. Utilisez "Enviar a mi correo" pour recevoir une copie dans votre boîte email.' 
                  : currentLang === 'es' 
                  ? 'Consejo: El botón "Descargar informe PDF" abre la ventana del navegador para guardarlo en tu equipo. Usa "Enviar a mi correo" para recibir una copia directa a ' + (leadData.email ? leadData.email : 'tu email') + '.' 
                  : 'Tip: The "Download PDF" button opens your browser print dialog to save locally. Use "Send to my email" to receive a direct copy at ' + (leadData.email ? leadData.email : 'your email') + '.'}
              </p>

              {iframeWarning && (
                <div className="mt-4 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-left max-w-md mx-auto space-y-2 animate-fade-in">
                  <div className="flex gap-2 text-amber-400">
                    <AlertCircle size={18} className="shrink-0 mt-0.5" />
                    <span className="text-xs font-bold uppercase tracking-wider">
                      {currentLang === 'fr' 
                        ? 'Aperçu Bloqué par le Navigateur' 
                        : currentLang === 'es' 
                        ? 'Vista Previa Bloqueada por el Navegador' 
                        : 'Preview Blocked by Browser'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {currentLang === 'fr' 
                      ? "Comme vous visualisez actuellement l'application dans l'aperçu intégré (iframe) d'AI Studio, les navigateurs bloquent la fonction d'impression par sécurité. Veuillez ouvrir l'application dans un nouvel onglet et cliquer sur 'Télécharger le rapport PDF' depuis celui-ci pour générer votre rapport instantanément." 
                      : currentLang === 'es' 
                      ? "Como está visualizando la aplicación dentro de la vista previa (iframe) de AI Studio, los navegadores bloquean la función de impresión por seguridad. Por favor, abra la aplicación en una pestaña nueva y haga clic en 'Descargar informe PDF' desde allí para generar su informe al instante." 
                      : "Because you are currently viewing the app inside the AI Studio preview frame, browsers block direct print functions for security. Please open the application in a new tab and click 'Download PDF Report' from there to generate your report instantly."}
                  </p>
                  <a
                    href={window.location.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 underline pt-1"
                  >
                    <ExternalLink size={14} />
                    <span>
                      {currentLang === 'fr'
                        ? "Ouvrir l'application dans un nouvel onglet"
                        : currentLang === 'es'
                        ? 'Abrir la aplicación en una pestaña nueva'
                        : 'Open application in a new tab'}
                    </span>
                  </a>
                </div>
              )}
            </div>

            {/* Social Share Section */}
            <div className="mt-8 pt-6 border-t border-white/10 print:hidden text-center space-y-4">
              <p className="text-xs font-bold uppercase tracking-wider text-white/60">
                {currentLang === 'fr' 
                  ? 'Partagez votre score de conformité' 
                  : currentLang === 'es' 
                  ? '¡Comparta su resultado!' 
                  : 'Share your compliance score'}
              </p>
              
              <div className="flex flex-wrap justify-center items-center gap-3">
                {/* LinkedIn Button */}
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(getShareTextAndHashtags().shareUrl)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-white bg-[#0077b5] hover:bg-[#005a87] active:bg-[#004466] border border-white/10 rounded-full px-5 py-2.5 shadow hover:shadow-lg transition-all duration-150 cursor-pointer"
                >
                  <LinkedinIcon size={14} />
                  <span>LinkedIn</span>
                </a>

                {/* Twitter/X Button */}
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(getShareTextAndHashtags().text)}&url=${encodeURIComponent(getShareTextAndHashtags().shareUrl)}&hashtags=${encodeURIComponent(getShareTextAndHashtags().hashtags)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-white bg-black hover:bg-neutral-950 active:bg-neutral-900 border border-white/10 rounded-full px-5 py-2.5 shadow hover:shadow-lg transition-all duration-150 cursor-pointer"
                >
                  <XIcon size={14} />
                  <span>Twitter / X</span>
                </a>

                {/* Copy Post Button */}
                <button
                  onClick={handleCopyPost}
                  className="inline-flex items-center gap-2 text-xs font-bold text-white bg-white/10 hover:bg-white/20 active:bg-white/30 border border-white/10 rounded-full px-5 py-2.5 shadow hover:shadow-lg transition-all duration-150 cursor-pointer"
                >
                  {copied ? <CheckCircle2 size={14} className="text-emerald-400 animate-pulse" /> : <Share2 size={14} />}
                  <span>
                    {copied 
                      ? (currentLang === 'fr' ? 'Message copié !' : currentLang === 'es' ? '¡Mensaje copiado!' : 'Message copied!') 
                      : (currentLang === 'fr' ? 'Copier le message' : currentLang === 'es' ? 'Copiar mensaje' : 'Copy message')}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Individual Axes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 print-axes-grid">
          {Object.keys(AXIS_CONF).map((key) => {
            const axisVal = axisScores[key];
            if (axisVal === undefined) return null;
            const cfg = AXIS_CONF[key as keyof typeof AXIS_CONF];
            const axisName = currentLang === 'fr' ? cfg.name.fr : currentLang === 'es' ? cfg.name.es : cfg.name.en;
            
            const axisLabel = axisVal >= 80 
              ? TRANSLATIONS['result.ax.lvl.ex'][currentLang] 
              : axisVal >= 60 
              ? TRANSLATIONS['result.ax.lvl.go'][currentLang] 
              : axisVal >= 40 
              ? TRANSLATIONS['result.ax.lvl.im'][currentLang] 
              : TRANSLATIONS['result.ax.lvl.cr'][currentLang];

            return (
              <div key={key} className="bg-white border border-slate-100 rounded-xl p-5 shadow-sm">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
                  {axisName}
                </div>
                {/* Progress Mini Bar */}
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden mb-4">
                  <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${axisVal}%`, backgroundColor: cfg.color }} />
                </div>
                <div className="flex justify-between items-baseline">
                  <span className="text-xl font-extrabold" style={{ color: cfg.color }}>
                    {axisVal}
                    <span className="text-[10px] text-slate-400 font-normal">/100</span>
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {axisLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Actionable recommendations card */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 sm:p-8 shadow-sm">
          <h3 className="font-sans font-extrabold text-base sm:text-lg text-[#1e3a5f] border-b border-slate-100 pb-4 mb-6">
            {currentLang === 'fr' ? '📋 Recommandations prioritaires' : currentLang === 'es' ? '📋 Recomendaciones prioritarias' : '📋 Strategic Action Plan'}
          </h3>
          <ul className="space-y-4">
            {getCustomRecommendations().map((reco, idx) => (
              <li key={idx} className="flex gap-4 items-start">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5 ${
                  reco.urgent 
                    ? 'bg-red-50 text-red-600' 
                    : 'bg-blue-50 text-blue-600'
                }`}>
                  {reco.urgent ? '!' : <ChevronRight size={14} />}
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  {reco.text}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Brand Comparison CTA */}
        <div 
          className="bg-[#1e3a5f] bg-gradient-to-br from-[#1e3a5f] to-[#142842] rounded-2xl p-8 sm:p-10 text-center text-white relative overflow-hidden shadow-xl print:hidden"
          style={{ background: 'linear-gradient(135deg, #1e3a5f 0%, #142842 100%)' }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />
          
          <div className="relative z-10 max-w-xl mx-auto space-y-6">
            <h3 className="font-sans font-extrabold text-xl sm:text-2xl">
              {TRANSLATIONS['result.cta.title'][currentLang]}
            </h3>
            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">
              {TRANSLATIONS['result.cta.desc'][currentLang]}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-2">
              <a
                href="https://www.documatch.eu"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-bold text-white bg-[#2563eb] hover:bg-[#3b82f6] rounded-full px-6 py-3 shadow-md shadow-blue-500/10 cursor-pointer decoration-transparent w-full sm:w-auto"
              >
                <span>{TRANSLATIONS['result.cta.btn.compare'][currentLang]}</span>
                <ExternalLink size={14} />
              </a>
              <a
                href="mailto:info@documatch.eu"
                className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-white/80 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-full px-5 py-3 transition-colors decoration-transparent w-full sm:w-auto"
              >
                <Mail size={14} />
                <span>{TRANSLATIONS['result.cta.btn.expert'][currentLang]}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Retake button */}
        <div className="text-center print:hidden">
          <button
            onClick={onRestart}
            className="text-xs text-slate-400 hover:text-slate-600 underline font-semibold transition-colors cursor-pointer bg-transparent border-none outline-none font-sans"
          >
            {TRANSLATIONS['result.restart'][currentLang]}
          </button>
        </div>
      </div>
    </section>
  );
};
