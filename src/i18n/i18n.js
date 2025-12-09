import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from './locales/en.json';
import hi from './locales/hi.json';
import bn from './locales/bn.json';
import or from './locales/or.json';

const LANGUAGE_STORAGE_KEY = 'app_language';

// Get saved or browser language
const getBrowserLanguage = () => {
  const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
  if (savedLanguage) return savedLanguage;

  const browserLang = navigator.language.split('-')[0]; // e.g., 'en-US' -> 'en'
  const supportedLanguages = ['en', 'hi', 'bn', 'or'];
  if (supportedLanguages.includes(browserLang)) return browserLang;

  return 'en'; // fallback
};

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      hi: { translation: hi },
      bn: { translation: bn },
      or: { translation: or },
    },
    lng: getBrowserLanguage(),
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });

// Function to change language
export const changeLanguage = (languageCode) => {
  const supportedLanguages = ['en', 'hi', 'bn', 'or'];
  if (!supportedLanguages.includes(languageCode)) return;

  localStorage.setItem(LANGUAGE_STORAGE_KEY, languageCode);
  i18n.changeLanguage(languageCode);
};

export default i18n;
