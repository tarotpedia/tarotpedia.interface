import { en } from './locales/en';
import { vi } from './locales/vi';

export const translations = {
  en,
  vi,
} as const;

export type Locale = keyof typeof translations;
export type TranslationKeys = (typeof translations)[Locale];

export const defaultLocale: Locale = 'en';

/**
 * Detects the user's locale based on their timezone
 * If timezone indicates Vietnam, returns 'vi', otherwise 'en'
 */
export function detectLocale(): Locale {
  if (typeof window === 'undefined') return defaultLocale;

  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    if (timezone === 'Asia/Ho_Chi_Minh' || timezone === 'Asia/Saigon') {
      return 'vi';
    }

    const browserLang = navigator.language.toLowerCase();
    if (browserLang.startsWith('vi')) {
      return 'vi';
    }

    return 'en';
  } catch (error) {
    console.error('Error detecting locale:', error);
    return defaultLocale;
  }
}

/**
 * Gets translations for a specific locale
 */
export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale];
}
