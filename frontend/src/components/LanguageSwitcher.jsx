import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const GOOGLE_TRANSLATE_SCRIPT_ID = 'google-translate-script';

const applyGoogleLanguage = (language) => {
  const select = document.querySelector('.goog-te-combo');

  if (!select) {
    return false;
  }

  const target = language === 'fr' ? 'fr' : 'en';
  const hasTarget = Array.from(select.options).some((option) => option.value === target);
  select.value = hasTarget ? target : '';
  select.dispatchEvent(new Event('change'));
  return true;
};

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();
  const activeLanguage = i18n.language?.startsWith('fr') ? 'fr' : 'en';

  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (!window.google?.translate?.TranslateElement) {
        return;
      }

      new window.google.translate.TranslateElement(
        {
          pageLanguage: 'en',
          includedLanguages: 'en,fr',
          autoDisplay: false,
          layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
        },
        'google_translate_element'
      );
    };

    if (!document.getElementById(GOOGLE_TRANSLATE_SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = GOOGLE_TRANSLATE_SCRIPT_ID;
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      window.googleTranslateElementInit();
    }
  }, []);

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);

    if (!applyGoogleLanguage(language)) {
      window.setTimeout(() => applyGoogleLanguage(language), 700);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div id="google_translate_element" className="sr-only" />
      <button 
        type="button"
        onClick={() => changeLanguage('en')}
        className={`px-3 py-1 text-sm font-bold rounded ${activeLanguage === 'en' ? 'bg-univOrange text-white' : 'bg-slate-200'}`}
      >
        EN
      </button>
      <button 
        type="button"
        onClick={() => changeLanguage('fr')}
        className={`px-3 py-1 text-sm font-bold rounded ${activeLanguage === 'fr' ? 'bg-univOrange text-white' : 'bg-slate-200'}`}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageSwitcher;
