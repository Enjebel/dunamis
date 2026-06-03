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
      eyebrow: "L'Universite",
      title: 'Message du',
      accent: 'Directeur',
      paragraphs: [
        '"Bienvenue a Dunamis, l universite de l entrepreneuriat qui transforme le potentiel academique en succes concret. Face au taux alarmant de chomage des jeunes au Cameroun--ou les diplomes sont nombreux mais l experience pratique reste rare--nous avons choisi de rompre avec les methodes d enseignement traditionnelles. Notre mission est de former une nouvelle generation de leaders et de createurs de richesse, armes non pas de simples theories, mais d un savoir-faire solide et pratique acquis au coeur meme du monde de l entreprise.',
        'A Dunamis, nous croyons fermement que l excellence se forge sur le terrain. En choisissant notre modele unique d alternance, vous choisissez l audace, l autonomie et l emploi direct. Ensemble, faisons de vos deux annees d etudes le tremplin ultime de votre carriere professionnelle."',
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
          {copy.paragraphs.map((paragraph) => (
            <p key={paragraph} className="text-lg leading-relaxed text-slate-600">{paragraph}</p>
          ))}
          <div className="flex items-center gap-4 border-t border-slate-100 pt-8">
            <div className="h-px w-12 bg-univOrange" />
            <span className="font-black uppercase tracking-[0.2em] text-slate-800">{copy.signature}</span>
          </div>
        </div>
        <div className="relative h-[500px] overflow-hidden bg-slate-200 shadow-2xl">
          <img src="/images/Screenshot 2026-05-16 130959.png" alt="Dunamis leadership" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
        </div>
      </section>
    </div>
  );
};

export default RectorMessage;
