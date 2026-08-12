import { useState, useEffect } from 'react';
import { Language, LeadData } from './types';
import { QUESTIONS } from './data/questions';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { HowItWorks } from './components/HowItWorks';
import { WhySection } from './components/WhySection';
import { FAQ } from './components/FAQ';
import { Quiz } from './components/Quiz';
import { LeadForm } from './components/LeadForm';
import { Result } from './components/Result';
import { Modals } from './components/Modals';
import { CookieBanner } from './components/CookieBanner';
import { Footer } from './components/Footer';

export default function App() {
  const [currentLang, setCurrentLang] = useState<Language>('fr');
  const [currentCountry, setCurrentCountry] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('documatch_country');
      if (saved) return saved;
    } catch (e) {}
    
    // Default country based on URL or language fallback
    const hash = window.location.hash;
    if (hash.includes('/es')) return 'es';
    if (hash.includes('/en')) return 'de';
    return 'fr';
  });

  // Always default currentScreen to 'intro' on initial load so the home page (Header & Hero) loads first
  const [currentScreen, setCurrentScreen] = useState<'intro' | 'quiz' | 'lead' | 'result'>('intro');

  const [currentQ, setCurrentQ] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('documatch_currentQ');
      if (saved) {
        const val = parseInt(saved, 10);
        if (!isNaN(val)) return val;
      }
    } catch (e) {}
    return 0;
  });

  const [answers, setAnswers] = useState<(number | null)[]>(() => {
    try {
      const saved = localStorage.getItem('documatch_answers');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === QUESTIONS.length) {
          return parsed;
        }
      }
    } catch (e) {}
    return new Array(QUESTIONS.length).fill(null);
  });

  const [leadData, setLeadData] = useState<LeadData>(() => {
    try {
      const saved = localStorage.getItem('documatch_leadData');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {}
    return {
      firstname: '',
      lastname: '',
      email: '',
      company: '',
      role: '',
      phone: '',
      country: '',
    };
  });
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Synchronize state with localStorage
  useEffect(() => {
    try {
      localStorage.setItem('documatch_screen', currentScreen);
      localStorage.setItem('documatch_currentQ', currentQ.toString());
      localStorage.setItem('documatch_answers', JSON.stringify(answers));
      localStorage.setItem('documatch_leadData', JSON.stringify(leadData));
      localStorage.setItem('documatch_country', currentCountry);
    } catch (e) {
      console.error('Failed to sync to localStorage:', e);
    }
  }, [currentScreen, currentQ, answers, leadData, currentCountry]);

  // Parse hash and auto-detect browser language if no hash exists on mount
  useEffect(() => {
    const parseHashLang = (): Language => {
      const hash = window.location.hash;
      if (hash.includes('/es')) return 'es';
      if (hash.includes('/de')) return 'de';
      if (hash.includes('/nl')) return 'nl';
      if (hash.includes('/en')) return 'en';
      if (hash.includes('/fr')) return 'fr';
      
      const navLang = window.navigator.language?.toLowerCase() || '';
      if (navLang.startsWith('es')) return 'es';
      if (navLang.startsWith('de')) return 'de';
      if (navLang.startsWith('nl')) return 'nl';
      if (navLang.startsWith('en')) return 'en';
      if (navLang.startsWith('fr')) return 'fr';
      return 'fr'; // default
    };

    const initialLang = parseHashLang();
    setCurrentLang(initialLang);
    window.location.hash = `/${initialLang}`;

    // Infer country for initial load if none saved
    try {
      if (!localStorage.getItem('documatch_country')) {
        if (initialLang === 'es') {
          setCurrentCountry('es');
        } else if (initialLang === 'de') {
          setCurrentCountry('de');
        } else if (initialLang === 'nl') {
          setCurrentCountry('nl');
        } else if (initialLang === 'en') {
          setCurrentCountry('de');
        } else {
          setCurrentCountry('fr');
        }
      }
    } catch (e) {}

    const handleHashChange = () => {
      const newLang = parseHashLang();
      setCurrentLang(newLang);
      
      // Auto-update country if needed to stay synchronized with hash
      if (newLang === 'es') {
        setCurrentCountry('es');
      } else if (newLang === 'de') {
        setCurrentCountry('de');
      } else if (newLang === 'nl') {
        setCurrentCountry('nl');
      } else if (newLang === 'en') {
        setCurrentCountry('de');
      } else if (newLang === 'fr') {
        setCurrentCountry(prev => (['fr', 'be', 'ch', 'lu'].includes(prev) ? prev : 'fr'));
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Update dynamic document metadata and language attributes for top SEO indexing
  useEffect(() => {
    const currentHash = window.location.hash;
    if (currentHash !== `#/${currentLang}`) {
      window.location.hash = `/${currentLang}`;
    }

    document.documentElement.lang = currentLang;

    let title = 'Documatch Lab — Diagnostic GED 2026';
    let description = 'Évaluez gratuitement la maturité de votre système GED face aux obligations 2026.';

    if (currentLang === 'fr') {
      title = 'Documatch Lab — Diagnostic GED 2026 | Test de maturité & e-Invoicing';
      description = 'Évaluez gratuitement la maturité de votre système GED face aux nouvelles obligations de facturation électronique et d’archivage réglementaire 2026 en France (PPF, PDP).';
    } else if (currentLang === 'es') {
      title = 'Documatch Lab — Diagnóstico GED 2026 | Test de madurez y Factura Electrónica';
      description = 'Evalúe de forma gratuita la madurez de su sistema GED frente a las nuevas obligaciones de facturación electrónica en España (Ley Crea y Crece).';
    } else {
      title = 'Documatch Lab — Document Management Maturity Diagnostic 2026';
      description = 'Assess your DMS and B2B e-invoicing compliance readiness for German GoBD and Netherlands Peppol standards. Free independent audit report.';
    }

    document.title = title;

    // Helper to update or create meta tags
    const updateMetaTag = (attribute: string, attributeValue: string, content: string) => {
      let element = document.querySelector(`meta[${attribute}="${attributeValue}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // Helper to update or create link tags
    const updateLinkTag = (rel: string, href: string, additionalAttrs?: Record<string, string>) => {
      let selector = `link[rel="${rel}"]`;
      if (additionalAttrs) {
        Object.entries(additionalAttrs).forEach(([k, v]) => {
          selector += `[${k}="${v}"]`;
        });
      }
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('link');
        element.setAttribute('rel', rel);
        if (additionalAttrs) {
          Object.entries(additionalAttrs).forEach(([k, v]) => {
            element!.setAttribute(k, v);
          });
        }
        document.head.appendChild(element);
      }
      element.setAttribute('href', href);
    };

    // Map country code to proper Geo data
    let geoRegion = 'EU';
    let geoPlacename = 'Europe';
    let ogLocale = 'fr_FR';

    switch (currentCountry) {
      case 'fr':
        geoRegion = 'FR';
        geoPlacename = 'France';
        ogLocale = 'fr_FR';
        break;
      case 'be':
        geoRegion = 'BE';
        geoPlacename = 'Belgium';
        ogLocale = 'fr_BE';
        break;
      case 'ch':
        geoRegion = 'CH';
        geoPlacename = 'Switzerland';
        ogLocale = 'fr_CH';
        break;
      case 'lu':
        geoRegion = 'LU';
        geoPlacename = 'Luxembourg';
        ogLocale = 'fr_LU';
        break;
      case 'es':
        geoRegion = 'ES';
        geoPlacename = 'Spain';
        ogLocale = 'es_ES';
        break;
      case 'de':
        geoRegion = 'DE';
        geoPlacename = 'Germany';
        ogLocale = 'de_DE';
        break;
      case 'nl':
        geoRegion = 'NL';
        geoPlacename = 'Netherlands';
        ogLocale = 'nl_NL';
        break;
      default:
        geoRegion = 'EU';
        geoPlacename = 'Europe';
        ogLocale = currentLang === 'fr' ? 'fr_FR' : currentLang === 'es' ? 'es_ES' : 'en_US';
    }

    // Update Core SEO Description
    updateMetaTag('name', 'description', description);

    // Update Geo-Targeting Metadata
    updateMetaTag('name', 'geo.region', geoRegion);
    updateMetaTag('name', 'geo.placename', geoPlacename);

    // Update OpenGraph properties
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:locale', ogLocale);
    updateMetaTag('property', 'og:url', `https://www.documatch.eu/#/${currentLang}`);

    // Update Twitter metadata
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);
    updateMetaTag('name', 'twitter:url', `https://www.documatch.eu/#/${currentLang}`);

    // Update Dynamic Canonical link
    updateLinkTag('canonical', `https://www.documatch.eu/#/${currentLang}`);

    // Update/Inject JSON-LD structured data for modern rich snippet SEO indexing
    let jsonLdScript = document.querySelector('script[id="documatch-jsonld"]');
    if (!jsonLdScript) {
      jsonLdScript = document.createElement('script');
      jsonLdScript.setAttribute('id', 'documatch-jsonld');
      jsonLdScript.setAttribute('type', 'application/ld+json');
      document.head.appendChild(jsonLdScript);
    }
    
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Quiz',
      'name': title,
      'description': description,
      'about': {
        '@type': 'Thing',
        'name': currentLang === 'fr' 
          ? 'Facturation électronique B2B & Gestion Électronique de Documents (GED)' 
          : currentLang === 'es' 
          ? 'Facturación electrónica B2B y Gestión Documental (GED)' 
          : 'B2B e-Invoicing & Document Management Systems (DMS)'
      },
      'educationalLevel': 'Professional',
      'assesses': currentLang === 'fr' 
        ? 'Conformité règlementaire GED et Facturation électronique 2026' 
        : currentLang === 'es' 
        ? 'Conformidad legal GED y Factura Electrónica' 
        : 'Regulatory compliance for DMS and e-Invoicing standards',
      'publisher': {
        '@type': 'Organization',
        'name': 'Documatch.eu',
        'url': 'https://www.documatch.eu',
        'logo': 'https://www.documatch.eu/assets/logo.png',
        'contactPoint': {
          '@type': 'ContactPoint',
          'email': 'info@documatch.eu',
          'contactType': 'customer support'
        }
      }
    };
    
    jsonLdScript.textContent = JSON.stringify(structuredData);
  }, [currentLang, currentCountry]);

  const handleLanguageChange = (lang: Language) => {
    setCurrentLang(lang);
    window.location.hash = `/${lang}`;
    if (lang === 'es') {
      setCurrentCountry('es');
    } else if (lang === 'de') {
      setCurrentCountry('de');
    } else if (lang === 'nl') {
      setCurrentCountry('nl');
    } else if (lang === 'en') {
      setCurrentCountry('de');
    } else if (lang === 'fr') {
      setCurrentCountry(prev => (['fr', 'be', 'ch', 'lu'].includes(prev) ? prev : 'fr'));
    }
  };

  const handleCountryChange = (countryCode: string, lang: Language) => {
    setCurrentCountry(countryCode);
    setCurrentLang(lang);
    window.location.hash = `/${lang}`;
  };

  const handleStartQuiz = () => {
    try {
      const saved = localStorage.getItem('documatch_screen');
      if (saved && ['quiz', 'lead', 'result'].includes(saved)) {
        setCurrentScreen(saved as any);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }
    } catch (e) {}
    setCurrentScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleClose = () => {
    setCurrentScreen('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRestartFresh = () => {
    setAnswers(new Array(QUESTIONS.length).fill(null));
    setCurrentQ(0);
    setLeadData({
      firstname: '',
      lastname: '',
      email: '',
      company: '',
      role: '',
      phone: '',
      country: '',
    });
    try {
      localStorage.removeItem('documatch_answers');
      localStorage.removeItem('documatch_currentQ');
      localStorage.removeItem('documatch_screen');
      localStorage.removeItem('documatch_leadData');
    } catch (e) {}
    setCurrentScreen('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (idx: number) => {
    const updated = [...answers];
    updated[currentQ] = idx;
    setAnswers(updated);

    if (currentQ < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQ((prev) => prev + 1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 350);
    }
  };

  const handleNext = () => {
    if (answers[currentQ] === null) return;
    if (currentQ === QUESTIONS.length - 1) {
      setCurrentScreen('lead');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    setCurrentQ((prev) => prev + 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrev = () => {
    if (currentQ > 0) {
      setCurrentQ((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLeadSubmit = async (data: LeadData) => {
    setLeadData(data);
    setCurrentScreen('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          lead: data,
          answers,
          lang: currentLang,
        }),
      });
      if (!response.ok) {
        console.error('Failed to submit diagnostic form:', await response.text());
      }
    } catch (err) {
      console.error('Error in lead submission:', err);
    }
  };

  const handleRestart = () => {
    setAnswers(new Array(QUESTIONS.length).fill(null));
    setCurrentQ(0);
    setLeadData({
      firstname: '',
      lastname: '',
      email: '',
      company: '',
      role: '',
      phone: '',
      country: '',
    });
    try {
      localStorage.removeItem('documatch_answers');
      localStorage.removeItem('documatch_currentQ');
      localStorage.removeItem('documatch_screen');
      localStorage.removeItem('documatch_leadData');
    } catch (e) {}
    setCurrentScreen('intro');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenModal = (id: string) => {
    if (id === 'cookies-modal' || id === 'cookie-banner') {
      window.dispatchEvent(new CustomEvent('open-cookie-banner'));
    }
    setActiveModal(id);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans select-none antialiased text-slate-800">
      {/* Header */}
      <Header
        currentLang={currentLang}
        onLanguageChange={handleLanguageChange}
        onOpenModal={handleOpenModal}
        onHomeClick={handleClose}
      />

      {/* Main Screen Router */}
      <main className="flex-grow">
        {currentScreen === 'intro' && (
          <>
            <Hero
              currentLang={currentLang}
              onStartQuiz={handleStartQuiz}
              hasSavedProgress={answers.some((a) => a !== null)}
              onRestart={handleRestartFresh}
            />
            <HowItWorks currentLang={currentLang} />
            <WhySection currentLang={currentLang} />
            <FAQ currentLang={currentLang} />
          </>
        )}

        {currentScreen === 'quiz' && (
          <Quiz
            currentLang={currentLang}
            questions={QUESTIONS}
            currentQ={currentQ}
            answers={answers}
            onSelectOption={handleSelectOption}
            onNext={handleNext}
            onPrev={handlePrev}
            onClose={handleClose}
          />
        )}

        {currentScreen === 'lead' && (
          <LeadForm
            currentLang={currentLang}
            leadData={leadData}
            onDataChange={setLeadData}
            onSubmit={handleLeadSubmit}
            onOpenModal={handleOpenModal}
            onClose={handleClose}
          />
        )}

        {currentScreen === 'result' && (
          <Result
            currentLang={currentLang}
            answers={answers}
            questions={QUESTIONS}
            leadData={leadData}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        currentLang={currentLang}
        onOpenModal={handleOpenModal}
        currentCountry={currentCountry}
        onCountryChange={handleCountryChange}
      />

      {/* Cookie Consent Banner */}
      <CookieBanner currentLang={currentLang} onOpenModal={handleOpenModal} />

      {/* Modals Container */}
      <Modals
        currentLang={currentLang}
        activeModal={activeModal}
        onCloseModal={handleCloseModal}
        onStartQuizFromGuide={handleStartQuiz}
      />
    </div>
  );
}
