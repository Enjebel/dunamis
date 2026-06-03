import React from 'react';
import { useTranslation } from 'react-i18next';
import { officialPartners } from '../data/siteContent';

const PartnerBar = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const copy = {
    en: {
      eyebrow: 'Official Partners',
      title: 'Institutional and professional ecosystem',
      intro: 'Partners support professional exposure, work-study opportunities, mentoring, and sector-based learning.',
      categories: {
        'Foundation partner': 'Foundation partner',
        'Financial partner': 'Financial partner',
        'Institutional finance': 'Institutional finance',
        'Enterprise partner': 'Enterprise partner',
        'Hospitality partner': 'Hospitality partner',
      },
    },
    fr: {
      eyebrow: 'Partenaires officiels',
      title: 'Ecosysteme institutionnel et professionnel',
      intro: 'Les partenaires soutiennent l exposition professionnelle, les opportunites d alternance, le mentorat et l apprentissage par secteur.',
      categories: {
        'Foundation partner': 'Partenaire fondation',
        'Financial partner': 'Partenaire financier',
        'Institutional finance': 'Finance institutionnelle',
        'Enterprise partner': 'Partenaire entreprise',
        'Hospitality partner': 'Partenaire hotellerie',
      },
    },
  }[lang];

  return (
    <section className="border-y border-slate-200 bg-white py-12">
      <div className="du-section">
        <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="du-kicker">{copy.eyebrow}</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">{copy.title}</h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-slate-500">
            {copy.intro}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {officialPartners.map((partner, index) => {
            const CardTag = partner.url ? 'a' : 'div';
            const linkProps = partner.url ? { href: partner.url, target: '_blank', rel: 'noreferrer' } : {};

            return (
              <CardTag key={partner.name} {...linkProps} className="du-panel du-hover-lift reveal-up block p-5" style={{ animationDelay: `${index * 0.04}s` }}>
                <div className="mb-5 flex h-24 items-center justify-center border border-slate-200 bg-white p-2">
                  <img
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    className="h-full w-full object-contain"
                />
              </div>
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-950">{partner.name}</h3>
                <p className="mt-2 text-xs font-black uppercase tracking-widest text-univOrange">{copy.categories[partner.category] || partner.category}</p>
              </CardTag>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnerBar;
