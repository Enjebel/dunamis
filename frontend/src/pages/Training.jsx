import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Award, Building2, GraduationCap, HeartPulse } from 'lucide-react';
import PartnerBar from '../components/PartnerBar';
import { faculties, heroImagePositions, heroImages, trainingCycles } from '../data/siteContent';

const getLang = (language) => (language?.startsWith('fr') ? 'fr' : 'en');
const icons = [Building2, GraduationCap, HeartPulse];

const Training = () => {
  const { i18n } = useTranslation();
  const { cycle } = useParams();
  const lang = getLang(i18n.language);
  const selectedCycle = trainingCycles.find((item) => item.slug === cycle);

  const copy = {
    en: {
      eyebrow: 'Training Courses',
      title: selectedCycle ? selectedCycle.en.title : 'Choose your professional pathway',
      intro: selectedCycle ? selectedCycle.en.summary : 'Dunamis organizes training into French-language BTS, Bachelor, Master and English-language HND, Bachelor, Master pathways across three faculties.',
      faculties: 'Faculties and specializations',
      cta: 'Explore this faculty',
    },
    fr: {
      eyebrow: 'Formations',
      title: selectedCycle ? selectedCycle.fr.title : 'Choisissez votre parcours professionnel',
      intro: selectedCycle ? selectedCycle.fr.summary : 'Dunamis organise ses formations en BTS, Licence, Master et HND dans trois facultés.',
      faculties: 'Facultés et spécialisations',
      cta: 'Explorer cette faculté',
    },
  }[lang];

  return (
    <div className="bg-white pt-20 lg:pt-[145px]">
      <section className="relative min-h-[54vh] overflow-hidden bg-slate-950 text-white">
        <img src={heroImages.training} alt="" className="absolute inset-0 h-full w-full object-cover opacity-85" style={{ objectPosition: heroImagePositions.training }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/30 to-slate-950/5" />
        <div className="du-section relative flex min-h-[54vh] flex-col justify-center py-20">
          <p className="du-kicker mb-5">{copy.eyebrow}</p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">{copy.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">{copy.intro}</p>
        </div>
      </section>

      {!selectedCycle && (
        <section className="du-section py-14">
          <div className="grid gap-5 md:grid-cols-2">
            {trainingCycles.map((item) => (
              <Link key={item.slug} to={`/training/${item.slug}`} className="du-panel du-hover-lift reveal-up p-7 hover:border-univGreen" style={{ animationDelay: `${trainingCycles.indexOf(item) * 0.05}s` }}>
                <Award className="mb-5 text-univOrange" size={28} />
                <h2 className="text-xl font-black text-slate-950">{item[lang].title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item[lang].summary}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="du-section py-16">
        <h2 className="mb-8 text-3xl font-black tracking-tight text-slate-950">{copy.faculties}</h2>
        <div className="grid gap-6 lg:grid-cols-3">
          {faculties.map((faculty, index) => {
            const Icon = icons[index];
            return (
              <article key={faculty.slug} className="du-panel du-hover-lift reveal-up flex flex-col p-7" style={{ animationDelay: `${index * 0.06}s` }}>
                <Icon className="mb-6 text-univGreen" size={34} />
                <h3 className="text-xl font-black text-slate-950">{faculty[lang].title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{faculty[lang].summary}</p>
                <ul className="mt-6 grow space-y-3">
                  {faculty[lang].programs.slice(0, 5).map((program) => (
                    <li key={program.title} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <span className="h-2 w-2 rounded-full bg-univOrange" />
                      {program.title}
                    </li>
                  ))}
                </ul>
                <Link to={`/training/faculty/${faculty.slug}`} className="mt-8 inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-univGreen hover:text-univOrange">
                  {copy.cta} <ArrowRight size={18} />
                </Link>
              </article>
            );
          })}
        </div>
      </section>

      <PartnerBar />
    </div>
  );
};

export default Training;
