import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        university: 'The University',
        training: 'Training Courses',
        admission: 'Admission',
        apprenticeship: 'Apprenticeship',
        international: 'International',
        studentLife: 'Student Life',
        research: 'Research',
        businesses: 'Businesses',
        news: 'News',
        contact: 'Contact',
      },
      actions: {
        apply: 'Apply Online',
        explorePrograms: 'Explore Programs',
        learnMore: 'Learn More',
        viewPage: 'View Page',
      },
    },
  },
  fr: {
    translation: {
      nav: {
        home: 'Accueil',
        university: "L'Université",
        training: 'Formations',
        admission: 'Admission',
        apprenticeship: 'Alternance',
        international: 'International',
        studentLife: 'Vie étudiante',
        research: 'Recherche',
        businesses: 'Entreprises',
        news: 'Actualités',
        contact: 'Contact',
      },
      actions: {
        apply: 'Postuler en ligne',
        explorePrograms: 'Explorer les formations',
        learnMore: 'En savoir plus',
        viewPage: 'Voir la page',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
