export type Language = 'fr' | 'es' | 'en';

export interface Option {
  fr: string;
  es: string;
  en: string;
  s: number; // Score value
}

export interface Question {
  id: number;
  phase: number;
  axis: 'profil' | 'systeme' | 'conformite' | 'erp' | 'projet';
  tagFr: string;
  tagEs: string;
  tagEn: string;
  fr: {
    q: string;
    hint?: string;
  };
  es: {
    q: string;
    hint?: string;
  };
  en: {
    q: string;
    hint?: string;
  };
  opts: Option[];
}

export interface LeadData {
  firstname: string;
  lastname: string;
  email: string;
  company: string;
  role: string;
  phone: string;
  country: string;
}

export interface AxisConfig {
  name: {
    fr: string;
    es: string;
    en: string;
  };
  color: string;
}

export interface TranslationSet {
  [key: string]: {
    fr: string;
    es: string;
    en: string;
  };
}
