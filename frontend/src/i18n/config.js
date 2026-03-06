import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslations from './locales/en.json';
import frTranslations from './locales/fr.json';
import esTranslations from './locales/es.json';

// Récupérer la langue sauvegardée ou utiliser français par défaut
const savedLanguage = localStorage.getItem('language') || 'fr';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslations
      },
      fr: {
        translation: frTranslations
      },
      es: {
        translation: esTranslations
      }
    },
    lng: savedLanguage,
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

// Sauvegarder la langue quand elle change
i18n.on('languageChanged', (lng) => {
  localStorage.setItem('language', lng);
});

export default i18n;
