import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  MessageSquare,
  Send,
  X,
  Sparkles,
  RotateCcw,
  Minimize2,
  Maximize2,
  Bot,
  User,
  ArrowRight,
  ShieldCheck,
  Check
} from 'lucide-react';
import { Language } from '../types';

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

interface ChatbotProps {
  currentLang: Language;
  currentCountry?: string;
  onStartQuiz?: () => void;
  userScore?: number | null;
}

const LANG_CONFIG: Record<Language, { flag: string; code: string; name: string; tag: string }> = {
  fr: { flag: '🇫🇷', code: 'FR', name: 'Français', tag: 'GED 2026' },
  es: { flag: '🇪🇸', code: 'ES', name: 'Español', tag: 'FACTURA 2026' },
  de: { flag: '🇩🇪', code: 'DE', name: 'Deutsch', tag: 'DMS & E-RECHNUNG' },
  nl: { flag: '🇳🇱', code: 'NL', name: 'Nederlands', tag: 'E-INVOICING' },
  en: { flag: '🇬🇧', code: 'EN', name: 'English', tag: 'DMS & INVOICING' },
};

const QUICK_PROMPTS: Record<Language, { label: string; query: string }[]> = {
  fr: [
    { label: '📅 Calendrier 2026', query: 'Quelles sont les dates et obligations de la réforme 2026 en France ?' },
    { label: '🏛️ PPF vs PDP', query: 'Quelle est la différence entre le Portail Public (PPF) et une PDP ?' },
    { label: '🔍 Choisir une GED', query: 'Quels sont les critères pour choisir le bon logiciel GED ?' },
    { label: '💰 Coût & ROI', query: 'Quel est le coût moyen et le retour sur investissement d’une GED ?' },
  ],
  es: [
    { label: '📅 Plazos Ley Crea y Crece', query: '¿Cuáles son los plazos y sanciones de la Ley Crea y Crece en España?' },
    { label: '⚖️ Requisitos Veri*Factu', query: '¿Qué exige el reglamento Veri*Factu y qué formatos son obligatorios?' },
    { label: '🔍 Elegir software documental', query: '¿Cómo elegir la mejor solución de gestión documental para mi ERP?' },
    { label: '💰 Costes y ROI', query: '¿Cuál es el coste medio y rentabilidad de un software de gestión documental?' },
  ],
  de: [
    { label: '📅 E-Rechnungspflicht 2025/26', query: 'Welche Fristen gelten für die E-Rechnungspflicht und das Wachstumschancengesetz in Deutschland?' },
    { label: '📜 GoBD & Archivierung', query: 'Was verlangt die GoBD für die revisionssichere Rechnungsarchivierung?' },
    { label: '🔍 DMS & ERP-Auswahl', query: 'Welche DMS-Systeme bieten die beste Anbindung an gängige ERPs wie SAP oder DATEV?' },
    { label: '💶 Kosten & Nutzen', query: 'Wie hoch sind die typischen Kosten und die Zeitersparnis bei einem DMS?' },
  ],
  nl: [
    { label: '📅 Verplichtingen 2026', query: 'Wat zijn de exacte deadlines voor E-invoicing 2026 en Peppol in Nederland en Europa?' },
    { label: '🌐 Peppol & NLCIUS', query: 'Hoe werkt het Peppol-netwerk en welke formaten zijn vereist?' },
    { label: '🔍 Keuze voor DMS', query: 'Waarop moet ik letten bij het selecteren van een DMS-systeem voor mijn ERP?' },
    { label: '💶 Kosten & ROI', query: 'Wat kost een DMS-implementatie gemiddeld en wat levert het op?' },
  ],
  en: [
    { label: '📅 2026 Deadlines', query: 'What are the upcoming European B2B e-invoicing mandates and deadlines for 2026?' },
    { label: '🌐 Peppol & Standards', query: 'How does the Peppol network and European e-invoicing standard EN 16931 work?' },
    { label: '🔍 Selecting a DMS', query: 'What key features should I look for when choosing a DMS/ECM solution for my ERP?' },
    { label: '💰 Pricing & ROI', query: 'What is the typical pricing model and ROI of a cloud DMS?' },
  ],
};

const UI_TEXT: Record<Language, {
  badge: string;
  title: string;
  subtitle: string;
  online: string;
  welcome: string;
  placeholder: string;
  send: string;
  clear: string;
  minimize: string;
  maximize: string;
  close: string;
  startQuizBtn: string;
  auditBadge: string;
  suggestedTitle: string;
  disclaimer: string;
  errorRetry: string;
  openAriaLabel: string;
  closeBubbleAriaLabel: string;
}> = {
  fr: {
    badge: 'Une question sur la GED & 2026 ?',
    title: 'DocuBot IA',
    subtitle: 'Conseiller GED & Facturation 2026',
    online: 'En ligne · IA Expert',
    welcome: 'Bonjour ! Je suis DocuBot, l’assistant IA certifié de Documatch. Je peux vous éclairer sur la réforme 2026 (PDP, PPF, Factur-X), les critères de choix d’une GED ou analyser vos besoins. Comment puis-je vous aider ?',
    placeholder: 'Posez votre question (ex: délais, ERP, tarif)...',
    send: 'Envoyer',
    clear: 'Effacer la discussion',
    minimize: 'Réduire',
    maximize: 'Agrandir',
    close: 'Fermer',
    startQuizBtn: 'Faire le diagnostic gratuit (5 min)',
    auditBadge: 'Audit GED 2026',
    suggestedTitle: 'Suggestions rapides :',
    disclaimer: 'Réponses fournies par l’IA Documatch selon les normes européennes en vigueur.',
    errorRetry: 'Une erreur s’est produite. Veuillez réessayer.',
    openAriaLabel: 'Ouvrir l’assistant DocuBot IA',
    closeBubbleAriaLabel: 'Fermer la bulle d’information',
  },
  es: {
    badge: '¿Dudas sobre la factura 2026?',
    title: 'DocuBot IA',
    subtitle: 'Asesor de Factura Electrónica y Software Documental',
    online: 'En línea · Experto IA',
    welcome: '¡Hola! Soy DocuBot, el asistente de IA de Documatch. Puedo resolver sus dudas sobre la Ley Crea y Crece, Veri*Factu, compatibilidad con su ERP o la elección de software de gestión documental. ¿Qué desea consultar?',
    placeholder: 'Escriba su consulta (ej: plazos, ERP, costes)...',
    send: 'Enviar',
    clear: 'Borrar conversación',
    minimize: 'Minimizar',
    maximize: 'Maximizar',
    close: 'Cerrar',
    startQuizBtn: 'Realizar diagnóstico gratuito (5 min)',
    auditBadge: 'Auditoría Factura 2026',
    suggestedTitle: 'Preguntas frecuentes:',
    disclaimer: 'Respuestas generadas por la IA de Documatch conforme a la normativa española y europea.',
    errorRetry: 'Ha ocurrido un error. Por favor, inténtelo de nuevo.',
    openAriaLabel: 'Abrir el asistente DocuBot IA',
    closeBubbleAriaLabel: 'Cerrar el mensaje flotante',
  },
  de: {
    badge: 'Fragen zur E-Rechnung 2025/2026?',
    title: 'DocuBot KI',
    subtitle: 'DMS & E-Rechnungs-Berater',
    online: 'Online · KI-Experte',
    welcome: 'Guten Tag! Ich bin DocuBot, Ihr KI-Berater für DMS, E-Rechnungspflicht (GoBD, XRechnung, ZUGFeRD) und Software-Auswahl. Wie kann ich Ihnen behilflich sein?',
    placeholder: 'Ihre Frage stellen (z.B. Fristen, GoBD, ERP)...',
    send: 'Senden',
    clear: 'Verlauf löschen',
    minimize: 'Minimieren',
    maximize: 'Vergrößern',
    close: 'Schließen',
    startQuizBtn: 'Kostenlose Diagnose starten (5 Min.)',
    auditBadge: 'DMS & E-Rechnung Audit',
    suggestedTitle: 'Häufige Themen:',
    disclaimer: 'Antworten basieren auf aktuellen europäischen GoBD- und E-Rechnungsstandards.',
    errorRetry: 'Ein Fehler ist aufgetreten. Bitte erneut versuchen.',
    openAriaLabel: 'DocuBot KI-Assistent öffnen',
    closeBubbleAriaLabel: 'Hinweis schließen',
  },
  nl: {
    badge: 'Vragen over E-invoicing 2026?',
    title: 'DocuBot AI',
    subtitle: 'DMS & E-invoicing Adviseur',
    online: 'Online · AI Expert',
    welcome: 'Hallo! Ik ben DocuBot, uw AI-adviseur voor Document Management en E-invoicing 2026. Ik help u met Peppol, compliance en DMS-softwarekeuze. Wat kan ik voor u doen?',
    placeholder: 'Stel uw vraag (bijv. Peppol, ERP, kosten)...',
    send: 'Versturen',
    clear: 'Geschiedenis wissen',
    minimize: 'Minimaliseren',
    maximize: 'Maximaliseren',
    close: 'Sluiten',
    startQuizBtn: 'Gratis analyse starten (5 min)',
    auditBadge: 'DMS & E-invoicing Audit',
    suggestedTitle: 'Veelgestelde vragen:',
    disclaimer: 'Antwoorden worden gegenereerd conform de Europese en nationale richtlijnen.',
    errorRetry: 'Er is een fout opgetreden. Probeer het opnieuw.',
    openAriaLabel: 'DocuBot AI-assistent openen',
    closeBubbleAriaLabel: 'Melding sluiten',
  },
  en: {
    badge: 'Questions about 2026 e-Invoicing?',
    title: 'DocuBot AI',
    subtitle: 'DMS & 2026 Compliance Advisor',
    online: 'Online · AI Expert',
    welcome: 'Hello! I am DocuBot, your AI advisor for Document Management Systems (DMS) and 2026 European e-Invoicing compliance. How can I help you today?',
    placeholder: 'Type your question (e.g. deadlines, standards, ROI)...',
    send: 'Send',
    clear: 'Clear conversation',
    minimize: 'Minimize',
    maximize: 'Maximize',
    close: 'Close',
    startQuizBtn: 'Take Free Diagnostic (5 min)',
    auditBadge: '2026 DMS Audit',
    suggestedTitle: 'Quick suggestions:',
    disclaimer: 'AI responses verified against current European regulatory frameworks.',
    errorRetry: 'An error occurred. Please try again.',
    openAriaLabel: 'Open DocuBot AI Assistant',
    closeBubbleAriaLabel: 'Close prompt bubble',
  },
};

export const Chatbot: React.FC<ChatbotProps> = ({
  currentLang,
  currentCountry = 'fr',
  onStartQuiz,
  userScore,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [showBadge, setShowBadge] = useState<boolean>(true);
  const [inputMessage, setInputMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const t = UI_TEXT[currentLang] || UI_TEXT.en;
  const langConfig = LANG_CONFIG[currentLang] || LANG_CONFIG.en;
  const quickPrompts = QUICK_PROMPTS[currentLang] || QUICK_PROMPTS.en;

  // Function to get initial/persisted messages for the current language
  const getInitialMessages = (lang: Language): ChatMessage[] => {
    const langT = UI_TEXT[lang] || UI_TEXT.en;
    try {
      const saved = localStorage.getItem(`documatch_chat_${lang}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // If only the welcome message exists in history, ensure it uses the updated localized welcome text
          if (parsed.length === 1 && parsed[0].role === 'assistant' && parsed[0].id?.startsWith('welcome-msg')) {
            return [
              {
                id: `welcome-msg-${lang}`,
                role: 'assistant',
                content: langT.welcome,
                timestamp: parsed[0].timestamp || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              },
            ];
          }
          return parsed;
        }
      }
    } catch (e) {}
    return [
      {
        id: `welcome-msg-${lang}`,
        role: 'assistant',
        content: langT.welcome,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ];
  };

  const [messages, setMessages] = useState<ChatMessage[]>(() => getInitialMessages(currentLang));

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && !isMinimized) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen, isMinimized]);

  // When language changes, synchronize the chatbot immediately to the current language
  useEffect(() => {
    const loadedMessages = getInitialMessages(currentLang);
    setMessages(loadedMessages);
  }, [currentLang]);

  // Persist messages to the active language storage key
  useEffect(() => {
    if (messages.length > 0) {
      try {
        localStorage.setItem(`documatch_chat_${currentLang}`, JSON.stringify(messages));
      } catch (e) {}
    }
  }, [messages, currentLang]);

  // Hide badge after 12 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBadge(false);
    }, 12000);
    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || inputMessage).trim();
    if (!text || isLoading) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          lang: currentLang,
          country: currentCountry,
          score: userScore || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`Chat API responded with ${response.status}`);
      }

      const data = await response.json();
      const replyContent = data.reply || t.errorRetry;

      const assistantMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: replyContent,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (error) {
      console.error('Chat request failed:', error);
      const errorMsg: ChatMessage = {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: t.errorRetry,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearHistory = () => {
    const initialWelcome: ChatMessage = {
      id: `welcome-msg-${currentLang}`,
      role: 'assistant',
      content: t.welcome,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages([initialWelcome]);
    try {
      localStorage.removeItem(`documatch_chat_${currentLang}`);
    } catch (e) {}
  };

  // Helper to format text with Markdown bolding, bullets and paragraphs
  const renderFormattedContent = (content: string) => {
    const lines = content.split('\n');
    return (
      <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }

          // Bullet points
          const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('*');
          const cleanLine = isBullet ? line.trim().replace(/^[•\-*]\s*/, '') : line;

          // Process bold text (**text**)
          const parts = cleanLine.split(/(\*\*.*?\*\*)/g);
          const formattedParts = parts.map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-bold text-inherit">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          });

          if (isBullet) {
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-1">
                <span className="text-[#2563eb] font-bold select-none">•</span>
                <span className="flex-1">{formattedParts}</span>
              </div>
            );
          }

          return <p key={idx}>{formattedParts}</p>;
        })}
      </div>
    );
  };

  return (
    <div id="documatch-chatbot-container" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {/* Floating Prompt Badge */}
      <AnimatePresence>
        {!isOpen && showBadge && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-2 mr-1 bg-white px-3.5 py-2 rounded-2xl shadow-xl border border-blue-100 flex items-center gap-2 cursor-pointer hover:border-blue-300 transition-all max-w-[260px] sm:max-w-xs group"
            onClick={() => {
              setIsOpen(true);
              setIsMinimized(false);
              setShowBadge(false);
            }}
          >
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
            <span className="text-xs font-semibold text-slate-800 leading-tight group-hover:text-blue-600 transition-colors">
              {t.badge}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowBadge(false);
              }}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full"
              aria-label={t.closeBubbleAriaLabel}
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button (When Chat is Closed) */}
      {!isOpen && (
        <motion.button
          id="btn-open-chatbot"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsOpen(true);
            setIsMinimized(false);
            setShowBadge(false);
          }}
          className="relative group flex items-center justify-center w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#0f1a2c] text-white shadow-2xl hover:shadow-blue-500/30 border-2 border-blue-500/40 transition-all focus:outline-none focus:ring-4 focus:ring-blue-300"
          aria-label={t.openAriaLabel}
          style={{ backgroundColor: '#0f1a2c' }}
        >
          <div className="absolute -inset-0.5 bg-blue-500 rounded-full blur opacity-30 group-hover:opacity-60 transition duration-300" />
          <div className="relative flex items-center justify-center">
            <Bot className="w-6 h-6 text-amber-300 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#fbbf24] border-2 border-[#0f1a2c]"></span>
            </span>
          </div>
        </motion.button>
      )}

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="documatch-chat-window"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`w-[calc(100vw-2rem)] sm:w-[410px] bg-white rounded-2xl shadow-2xl border border-slate-300 flex flex-col overflow-hidden transition-all duration-300 z-50 ${
              isMinimized ? 'h-[64px]' : 'h-[560px] max-h-[82vh]'
            }`}
          >
            {/* Header with guaranteed dark background and high-contrast typography */}
            <div 
              className="bg-[#0f1a2c] text-white px-4 py-3 flex items-center justify-between flex-shrink-0 shadow-md border-b border-white/10"
              style={{ backgroundColor: '#0f1a2c' }}
            >
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <div className="w-9 h-9 rounded-xl bg-[#1e293b] border border-white/20 flex items-center justify-center text-white shadow-inner">
                    <Bot className="w-5 h-5 text-amber-300" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 border-2 border-[#0f1a2c] rounded-full" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-sm tracking-tight text-white">{t.title}</h3>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-white/10 border border-white/20 rounded-md text-amber-300 flex items-center gap-1">
                      <span>{langConfig.flag}</span>
                      <span>{langConfig.tag}</span>
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-300 font-medium leading-none mt-1">{t.subtitle}</p>
                </div>
              </div>

              {/* Header Action Buttons */}
              <div className="flex items-center gap-1">
                <button
                  id="btn-clear-chat"
                  onClick={handleClearHistory}
                  title={t.clear}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label={t.clear}
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  id="btn-minimize-chat"
                  onClick={() => setIsMinimized(!isMinimized)}
                  title={isMinimized ? t.maximize : t.minimize}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label={isMinimized ? t.maximize : t.minimize}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  id="btn-close-chat"
                  onClick={() => setIsOpen(false)}
                  title={t.close}
                  className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                  aria-label={t.close}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Chat Body (Hidden when minimized) */}
            {!isMinimized && (
              <>
                {/* Messages Viewport */}
                <div className="flex-1 p-3.5 overflow-y-auto bg-slate-50 space-y-3.5 scroll-smooth">
                  {messages.map((msg) => {
                    const isUser = msg.role === 'user';
                    return (
                      <div
                        key={msg.id}
                        className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                      >
                        {!isUser && (
                          <div className="w-7 h-7 rounded-lg bg-[#0f1a2c] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm" style={{ backgroundColor: '#0f1a2c' }}>
                            <Bot className="w-4 h-4 text-amber-300" />
                          </div>
                        )}
                        <div
                          className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm ${
                            isUser
                              ? 'bg-[#2563eb] text-white rounded-br-none'
                              : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                          }`}
                        >
                          {renderFormattedContent(msg.content)}
                          <div
                            className={`text-[10px] mt-1 text-right select-none ${
                              isUser ? 'text-blue-100' : 'text-slate-400'
                            }`}
                          >
                            {msg.timestamp}
                          </div>
                        </div>
                        {isUser && (
                          <div className="w-7 h-7 rounded-lg bg-[#2563eb] text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                            <User className="w-4 h-4" />
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {/* Loading Typing Animation */}
                  {isLoading && (
                    <div className="flex gap-2.5 justify-start">
                      <div className="w-7 h-7 rounded-lg bg-[#0f1a2c] text-white flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: '#0f1a2c' }}>
                        <Bot className="w-4 h-4 text-amber-300" />
                      </div>
                      <div className="bg-white border border-slate-200 text-slate-500 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Prompts Carousel / Chips */}
                <div className="px-3 py-2 bg-white border-t border-slate-100 flex-shrink-0 overflow-x-auto no-scrollbar">
                  <div className="flex items-center gap-1.5 pb-0.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500 flex-shrink-0" />
                    {quickPrompts.map((qp, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSendMessage(qp.query)}
                        disabled={isLoading}
                        className="text-[11px] font-semibold bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-2.5 py-1 rounded-full border border-slate-200 whitespace-nowrap transition-colors flex-shrink-0 disabled:opacity-50"
                      >
                        {qp.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Optional Quiz Callout if User is in Chat */}
                {onStartQuiz && (
                  <div className="px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 border-t border-blue-100 flex items-center justify-between">
                    <span className="text-[11px] font-medium text-slate-600 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {t.auditBadge}
                    </span>
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        onStartQuiz();
                      }}
                      className="text-[11px] font-bold text-blue-700 hover:text-blue-900 flex items-center gap-1 group"
                    >
                      {t.startQuizBtn}
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                )}

                {/* Input Form Footer */}
                <div className="p-2.5 bg-white border-t border-slate-200 flex-shrink-0">
                  <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-1.5 focus-within:ring-2 focus-within:ring-blue-500 focus-within:bg-white transition-all border border-slate-200">
                    <input
                      ref={inputRef}
                      type="text"
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={t.placeholder}
                      disabled={isLoading}
                      className="flex-1 bg-transparent border-none outline-none text-xs sm:text-sm text-slate-800 placeholder-slate-400 py-1"
                    />
                    <button
                      id="btn-send-message"
                      onClick={() => handleSendMessage()}
                      disabled={!inputMessage.trim() || isLoading}
                      className="w-8 h-8 rounded-lg bg-[#1e3a5f] hover:bg-blue-600 disabled:opacity-40 disabled:hover:bg-[#1e3a5f] text-white flex items-center justify-center transition-colors flex-shrink-0"
                      aria-label={t.send}
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="text-[9px] text-slate-400 text-center mt-1 select-none">
                    {t.disclaimer}
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
