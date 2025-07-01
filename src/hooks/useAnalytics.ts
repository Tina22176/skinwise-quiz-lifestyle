
import { useCallback } from 'react';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const useAnalytics = () => {
  const trackEvent = useCallback((eventName: string, parameters?: Record<string, any>) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, parameters);
    }
  }, []);

  const trackQuizStart = useCallback(() => {
    trackEvent('quiz_started', {
      event_category: 'engagement',
      event_label: 'skin_quiz'
    });
  }, [trackEvent]);

  const trackQuizComplete = useCallback((skinType: string) => {
    trackEvent('quiz_completed', {
      event_category: 'conversion',
      event_label: 'skin_quiz',
      skin_type: skinType
    });
  }, [trackEvent]);

  const trackEmailSubscription = useCallback((skinType: string) => {
    trackEvent('email_subscribed', {
      event_category: 'conversion',
      event_label: 'newsletter',
      skin_type: skinType
    });
  }, [trackEvent]);

  const trackPageView = useCallback((pageName: string) => {
    if (typeof window !== 'undefined') {
      trackEvent('page_view', {
        page_title: pageName,
        page_location: window.location.href
      });
    }
  }, [trackEvent]);

  return {
    trackQuizStart,
    trackQuizComplete,
    trackEmailSubscription,
    trackPageView
  };
};
