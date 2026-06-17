import React from 'react';
import { useTranslation } from 'react-i18next';

const RectorMessage = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const copy = {
    en: {
      eyebrow: 'The University',
      title: 'A Message from',
      accent: 'the Director',
      paragraphs: [
        '"Welcome to Dunamis, the university of entrepreneurship that turns academic potential into concrete success. Facing the alarming rate of youth unemployment in Cameroon--where graduates are plenty but practical experience is scarce--we chose to break away from traditional teaching methods. Our mission is to train a new generation of leaders and wealth creators who are armed not with mere theories, but with solid, practical know-how acquired at the very heart of the corporate world.',
        'At Dunamis, we firmly believe that excellence is forged on the field. By choosing our unique apprenticeship model, you are choosing boldness, independence, and direct employment. Together, let us make your two years of study the ultimate launchpad for your professional career."',
      ],
      signature: 'Director of Dunamis',
    },
    fr: {
      eyebrow: "L'Université",
      title: 'Message du',
      accent: 'Directeur',
      paragraphs: [
        `"Bienvenue à Dunamis, l'université de l'entrepreneuriat qui transforme le potentiel académique en succès concret. Face au taux alarmant de chômage des jeunes au Cameroun, où les diplômés sont nombreux mais l'expérience pratique reste rare, nous avons choisi de rompre avec les méthodes d'enseignement traditionnelles. Notre mission est de former une nouvelle génération de leaders et de créateurs de richesse, armés non pas de simples théories, mais d'un savoir-faire solide et pratique acquis au cœur même du monde de l'entreprise.`,
        `À Dunamis, nous croyons fermement que l'excellence se forge sur le terrain. En choisissant notre modèle unique d'alternance, vous choisissez l'audace, l'autonomie et l'emploi direct. Ensemble, faisons de vos deux années d'études le tremplin ultime de votre carrière professionnelle."`,
      ],
      signature: 'Directeur de Dunamis',
    },
  }[lang];

  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-[145px]">
      <section className="du-section grid gap-12 py-20 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <p className="du-kicker">{copy.eyebrow}</p>
          <h1 className="text-4xl font-black leading-tight text-slate-950 md:text-6xl">
            {copy.title} <span className="text-univGreen">{copy.accent}</span>
          </h1>
          <div className="space-y-5 text-lg leading-relaxed text-slate-700">
            {copy.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-univOrange">{copy.signature}</p>
        </div>
        <div className="overflow-hidden border border-slate-200 bg-univGray">
          <img src="/images/director.jpeg" alt="Director of Dunamis" className="h-full min-h-[420px] w-full object-cover" style={{ objectPosition: 'center top' }} />
        </div>
      </section>
    </div>
  );
};

export default RectorMessage;
