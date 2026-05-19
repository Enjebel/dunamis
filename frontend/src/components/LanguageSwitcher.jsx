import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  return (
    <div className="flex gap-2">
      <button 
        onClick={() => i18n.changeLanguage('en')}
        className={`px-3 py-1 text-sm font-bold rounded ${i18n.language === 'en' ? 'bg-univOrange text-white' : 'bg-slate-200'}`}
      >
        EN
      </button>
      <button 
        onClick={() => i18n.changeLanguage('fr')}
        className={`px-3 py-1 text-sm font-bold rounded ${i18n.language === 'fr' ? 'bg-univOrange text-white' : 'bg-slate-200'}`}
      >
        FR
      </button>
    </div>
  );
};

export default LanguageSwitcher;