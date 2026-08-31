// Google Analytics 4 (GA4) Analytics and Telemetry Helper
// Configured for Documatch Lab Satellite

declare global {
  interface Window {
    dataLayer: any[];
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Checks if analytics cookies are accepted by the user
 */
export function hasAnalyticsConsent(): boolean {
  try {
    const consent = localStorage.getItem('dm_cookies_analytics');
    if (consent === 'false') return false;
    const general = localStorage.getItem('dm_cookies');
    if (general === 'declined') return false;
    return true;
  } catch (e) {
    return true;
  }
}

/**
 * Safely push custom events to GA4
 */
export function trackEvent(eventName: string, params: Record<string, any> = {}): void {
  if (!hasAnalyticsConsent()) return;

  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        app_name: 'Documatch Lab',
        ...params,
      });
    } else if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
      window.dataLayer.push({
        event: eventName,
        app_name: 'Documatch Lab',
        ...params,
      });
    }
  } catch (e) {
    // Non-blocking telemetry failure
  }
}

/**
 * Track virtual page view for SPA routes
 */
export function trackPageView(pagePath: string, pageTitle: string): void {
  if (!hasAnalyticsConsent()) return;

  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
    page_location: window.location.href,
  });
}

/**
 * Track Diagnostic Funnel Events
 */
export function trackQuizStart(lang: string, country: string): void {
  trackEvent('diagnostic_start', {
    language: lang,
    country: country,
    step_name: 'quiz_start',
  });
}

export function trackQuizStep(questionIndex: number, totalQuestions: number, category?: string): void {
  trackEvent('diagnostic_step', {
    question_number: questionIndex + 1,
    total_questions: totalQuestions,
    category: category || 'general',
  });
}

export function trackLeadSubmit(country: string, role: string): void {
  trackEvent('lead_submission', {
    country: country,
    role: role,
    conversion_type: 'diagnostic_lead',
  });
}

export function trackReportView(score: number): void {
  trackEvent('report_view', {
    maturity_score: score,
  });
}

export function trackPdfDownload(): void {
  trackEvent('report_download_pdf', {
    action: 'download_pdf',
  });
}
