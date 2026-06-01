import React from 'react';
import { officialPartners } from '../data/siteContent';

const PartnerBar = () => {
  return (
    <section className="border-y border-slate-200 bg-white py-12">
      <div className="du-section">
        <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <p className="du-kicker">Official Partners</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950">Institutional and professional ecosystem</h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-slate-500">
            Partners support professional exposure, work-study opportunities, mentoring, and sector-based learning.
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
                <p className="mt-2 text-xs font-black uppercase tracking-widest text-univOrange">{partner.category}</p>
              </CardTag>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PartnerBar;
