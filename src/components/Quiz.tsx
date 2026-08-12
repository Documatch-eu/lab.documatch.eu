import React from 'react';
import { Language, Question } from '../types';
import { TRANSLATIONS } from '../data/translations';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface QuizProps {
  currentLang: Language;
  questions: Question[];
  currentQ: number;
  answers: (number | null)[];
  onSelectOption: (idx: number) => void;
  onNext: () => void;
  onPrev: () => void;
  onClose: () => void;
}

const PHASES_FR = [
  'Phase 1 — Profil décisionnel',
  'Phase 2 — Système actuel',
  'Phase 3 — Conformité & normes',
  'Phase 4 — ERP & intégrations',
  'Phase 5 — Projet & budget',
];

const PHASES_ES = [
  'Fase 1 — Perfil decisional',
  'Fase 2 — Sistema actual',
  'Fase 3 — Conformidad y normas',
  'Fase 4 — ERP e integraciones',
  'Fase 5 — Proyecto y presupuesto',
];

const PHASES_EN = [
  'Phase 1 — Profiling & Identity',
  'Phase 2 — Existing Document Systems',
  'Phase 3 — Local & European Compliance',
  'Phase 4 — Enterprise ERP & Integrations',
  'Phase 5 — Scope, Timeline & Budget',
];

const PHASES_DE = [
  'Phase 1 — Entscheidungsprofil',
  'Phase 2 — Aktuelles System',
  'Phase 3 — Rechtssicherheit & Normen',
  'Phase 4 — ERP & Integrationen',
  'Phase 5 — Projekt & Budget',
];

const PHASES_NL = [
  'Fase 1 — Beslissingsprofiel',
  'Fase 2 — Huidig systeem',
  'Fase 3 — Naleving & Normen',
  'Fase 4 — ERP & Integraties',
  'Fase 5 — Project & Budget',
];

const PHASE_TAGS = [
  'bg-blue-50 text-blue-700 border border-blue-100',
  'bg-emerald-50 text-emerald-700 border border-emerald-100',
  'bg-amber-50 text-amber-700 border border-amber-100',
  'bg-purple-50 text-purple-700 border border-purple-100',
  'bg-rose-50 text-rose-700 border border-rose-100',
];

export const Quiz: React.FC<QuizProps> = ({
  currentLang,
  questions,
  currentQ,
  answers,
  onSelectOption,
  onNext,
  onPrev,
  onClose,
}) => {
  const q = questions[currentQ];
  const total = questions.length;
  const progressPercent = ((currentQ + 1) / total) * 100;

  const getPhaseLabel = () => {
    if (currentLang === 'fr') return PHASES_FR[q.phase];
    if (currentLang === 'es') return PHASES_ES[q.phase];
    if (currentLang === 'de') return PHASES_DE[q.phase];
    if (currentLang === 'nl') return PHASES_NL[q.phase];
    return PHASES_EN[q.phase];
  };

  const getQuestionText = () => {
    return q[currentLang]?.q || q.en?.q || q.fr.q;
  };

  const getQuestionHint = () => {
    return q[currentLang]?.hint || q.en?.hint || q.fr.hint;
  };

  const getTagLabel = () => {
    if (currentLang === 'fr') return q.tagFr;
    if (currentLang === 'es') return q.tagEs;
    if (currentLang === 'de') return q.tagDe || q.tagEn;
    if (currentLang === 'nl') return q.tagNl || q.tagEn;
    return q.tagEn;
  };

  const isLast = currentQ === total - 1;
  const nextBtnText = currentLang === 'fr'
    ? (isLast ? 'Voir mes résultats' : 'Suivant')
    : currentLang === 'es'
    ? (isLast ? 'Ver mis resultados' : 'Siguiente')
    : currentLang === 'de'
    ? (isLast ? 'Ergebnisse anzeigen' : 'Weiter')
    : currentLang === 'nl'
    ? (isLast ? 'Bekijk mijn resultaten' : 'Volgende')
    : (isLast ? 'See My Results' : 'Next');

  const prevBtnText = currentLang === 'fr' 
    ? 'Précédent' 
    : currentLang === 'es' 
    ? 'Anterior' 
    : currentLang === 'de' 
    ? 'Zurück' 
    : currentLang === 'nl' 
    ? 'Vorige' 
    : 'Previous';

  return (
    <section className="bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
        {/* Progress Bar Header */}
        <div className="bg-[#1e3a5f] p-6 sm:p-8 pb-5">
          <div className="flex justify-between items-center mb-4 text-xs font-bold tracking-wider">
            <span className="text-[#fbbf24] uppercase">{getPhaseLabel()}</span>
            <div className="flex items-center gap-2">
              <span className="text-white/60">
                {currentQ + 1} / {total}
              </span>
              <span className="text-white/20">|</span>
              <button
                onClick={onClose}
                className="text-[#fbbf24] hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wider cursor-pointer"
              >
                {currentLang === 'fr' ? 'Quitter' : currentLang === 'es' ? 'Salir' : currentLang === 'de' ? 'Beenden' : currentLang === 'nl' ? 'Afbreken' : 'Exit'}
              </button>
            </div>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-blue-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Question Body */}
        <div className="p-6 sm:p-8">
          <span className={`inline-block text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md mb-4 ${PHASE_TAGS[q.phase]}`}>
            {getTagLabel()}
          </span>

          <h2 className="font-sans font-extrabold text-lg sm:text-xl text-[#1e3a5f] leading-snug mb-2">
            {getQuestionText().replace(/\s\?/g, '\u00A0?')}
          </h2>

          {getQuestionHint() && (
            <p className="text-xs text-slate-500 italic mb-6 leading-relaxed">
              {getQuestionHint()}
            </p>
          )}

          {/* Options list */}
          <div className="space-y-3">
            {q.opts.map((opt, i) => {
              const isSelected = answers[currentQ] === i;
              const optionText = opt[currentLang] || opt.en || opt.fr;

              return (
                <button
                  key={i}
                  onClick={() => onSelectOption(i)}
                  className={`w-full flex items-center gap-4 text-left border rounded-xl p-4 transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-blue-50/50 border-[#2563eb] text-[#1e3a5f] font-semibold'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-100 hover:border-slate-300 text-slate-700'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
                    isSelected ? 'border-[#2563eb]' : 'border-slate-300'
                  }`}>
                    {isSelected && (
                      <div className="w-2.5 h-2.5 rounded-full bg-[#2563eb]" />
                    )}
                  </div>
                  <span className="text-xs sm:text-sm leading-normal">{optionText}</span>
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-100">
            <button
              onClick={onPrev}
              disabled={currentQ === 0}
              className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#64748b] hover:text-[#1e3a5f] bg-white border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-2.5 transition-all cursor-pointer ${
                currentQ === 0 ? 'opacity-0 pointer-events-none' : ''
              }`}
            >
              <ArrowLeft size={16} />
              <span>{prevBtnText}</span>
            </button>

            <button
              onClick={onNext}
              disabled={answers[currentQ] === null}
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-[#2563eb] hover:bg-[#1e3a5f] disabled:opacity-40 disabled:cursor-not-allowed rounded-xl px-5 py-2.5 transition-all cursor-pointer"
            >
              <span>{nextBtnText}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
