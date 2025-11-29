'use client';

import { type ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { type Locale, type TranslationKeys, defaultLocale, detectLocale, getTranslations } from './config';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationKeys;
}

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [translations, setTranslations] = useState<TranslationKeys>(() => getTranslations(defaultLocale));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    try {
      const savedLocale = localStorage.getItem('locale') as Locale | null;
      if (savedLocale && (savedLocale === 'en' || savedLocale === 'vi')) {
        setLocaleState(savedLocale);
        setTranslations(getTranslations(savedLocale));
        return;
      }

      const detectedLocale = detectLocale();
      setLocaleState(detectedLocale);
      setTranslations(getTranslations(detectedLocale));
      localStorage.setItem('locale', detectedLocale);
    } catch {}
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    setTranslations(getTranslations(newLocale));
    if (mounted) {
      localStorage.setItem('locale', newLocale);
    }
  };

  return <I18nContext.Provider value={{ locale, setLocale, t: translations }}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}
