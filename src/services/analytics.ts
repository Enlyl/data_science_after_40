import ReactGA from 'react-ga4';

/**
 * Analytics Service wrapper for GA4.
 * Centralizes tracking logic so it can be enabled/disabled or configured easily.
 */

// @ts-ignore
const MEASUREMENT_ID = import.meta.env?.VITE_GA_MEASUREMENT_ID;

class AnalyticsService {
  private initialized = false;

  init() {
    if (!MEASUREMENT_ID || this.initialized) return;
    
    ReactGA.initialize(MEASUREMENT_ID);
    this.initialized = true;
    console.log('Analytics initialized');
  }

  // Configuration: toggle for privacy/GDPR
  setAnalyticsEnabled(enabled: boolean) {
    if (enabled) {
      this.init();
    } else {
      // Logic for opting out if needed (GA4 usually handles this via cookies/consent)
    }
  }

  trackPageView(path: string) {
    if (!this.initialized) return;
    ReactGA.send({ hitType: 'pageview', page: path });
  }

  trackLessonView(lessonId: string, lessonTitle: string) {
    if (!this.initialized) return;
    ReactGA.event({
      category: 'Lesson',
      action: 'view_lesson',
      label: lessonTitle,
      value: parseInt(lessonId, 10) || 0,
    });
  }

  trackLessonComplete(lessonId: string, lessonTitle: string, xpGain: number) {
    if (!this.initialized) return;
    ReactGA.event({
      category: 'Lesson',
      action: 'complete_lesson',
      label: lessonTitle,
      value: xpGain,
    });
  }

  trackTutorMessage(role: 'user' | 'ai') {
    if (!this.initialized) return;
    ReactGA.event({
      category: 'Tutor',
      action: 'send_message',
      label: role,
    });
  }

  // Generic event for "configuring events" if user wants custom tracking
  trackCustomEvent(action: string, params?: any) {
    if (!this.initialized) return;
    ReactGA.event(action, params);
  }
}

export const analytics = new AnalyticsService();
