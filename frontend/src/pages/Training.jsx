import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Award, Building2, GraduationCap, HeartPulse } from 'lucide-react';
import PartnerBar from '../components/PartnerBar';
import { faculties, heroImages, professionalCertifications, trainingCycles } from '../data/siteContent';
import { apiRequest } from '../lib/api';

const getLang = (language) => (language?.startsWith('fr') ? 'fr' : 'en');
const icons = [Building2, GraduationCap, HeartPulse];

const Training = () => {
  const { i18n } = useTranslation();
  const { cycle } = useParams();
  const [dbPrograms, setDbPrograms] = useState([]);
  const lang = getLang(i18n.language);
  const selectedCycle = trainingCycles.find((item) => item.slug === cycle);

  useEffect(() => {
    apiRequest('/programs')
      .then(setDbPrograms)
      .catch(() => setDbPrograms([]));
  }, []);

  const copy = {
    en: {
      eyebrow: 'Training Courses',
      title: selectedCycle ? selectedCycle.en.title : 'Choose your professional pathway',
      intro: selectedCycle ? selectedCycle.en.summary : "Dunamis organizes training into BTS, Bachelor's, Master's, HND, and professional certification pathways across three faculties.",
      faculties: 'Faculties and specializations',
      certifications: 'Professional Certifications',
      cta: 'Explore this faculty',
    },
    fr: {
      eyebrow: 'Formations',
      title: selectedCycle ? selectedCycle.fr.title : 'Choisissez votre parcours professionnel',
      intro: selectedCycle ? selectedCycle.fr.summary : 'Dunamis organise ses formations en BTS, Licence, Master, HND et certifications professionnelles dans trois facultes.',
      faculties: 'Facultes et specialisations',
      certifications: 'Certifications professionnelles',
      cta: 'Explorer cette faculte',
    },
  }[lang];

  return (
    <div className="bg-white pt-20 lg:pt-[145px]">
      <section className="relative min-h-[54vh] overflow-hidden bg-slate-950 text-white">
        <img src={heroImages.training} alt="" className="absolute inset-0 h-full w-full object-cover opacity-55" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-slate-950/30" />
        <div className="du-section relative flex min-h-[54vh] flex-col justify-center py-20">
          <p className="du-kicker mb-5">{copy.eyebrow}</p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">{copy.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">{copy.intro}</p>
        </div>
      </section>

      {!selectedCycle && (
        <section className="du-section py-14">
          <div className="grid gap-5 md:grid-cols-3">
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
                  {faculty[lang].programs.map((program) => (
                    <li key={program} className="flex items-center gap-3 text-sm font-semibold text-slate-700">
                      <span className="h-2 w-2 rounded-full bg-univOrange" />
                      {program}
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

      <section className="bg-slate-950 py-16 text-white">
        <div className="du-section">
          <div className="mb-8 max-w-3xl">
            <p className="du-kicker">Executive Learning</p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">{copy.certifications}</h2>
            <p className="mt-4 leading-relaxed text-slate-300">
              {trainingCycles[2][lang].summary}
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {professionalCertifications.map((cert, index) => (
              <article key={cert[lang].title} className="reveal-up border border-white/10 bg-white/5 p-6" style={{ animationDelay: `${index * 0.06}s` }}>
                <h3 className="text-xl font-black leading-tight text-white">{cert[lang].title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-300">{cert[lang].summary}</p>
                <ul className="mt-6 space-y-3">
                  {cert[lang].tracks.map((track) => (
                    <li key={track} className="flex gap-3 text-sm font-semibold text-slate-200">
                      <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-univOrange" />
                      {track}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {dbPrograms.length > 0 && (
        <section className="bg-univGray py-16">
          <div className="du-section">
            <div className="mb-8 max-w-3xl">
              <p className="du-kicker">Academic Database</p>
              <h2 className="mt-3 text-3xl font-black text-slate-950">Imported ministry course catalogues</h2>
              <p className="mt-4 text-slate-600">
                These program records are loaded from MongoDB and connected to the official files in the `programs/` folder.
              </p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {dbPrograms.slice(0, 9).map((program) => (
                <article key={program.code} className="du-panel p-6">
                  <p className="text-xs font-black uppercase tracking-widest text-univOrange">{program.cycle} · {program.code}</p>
                  <h3 className="mt-3 text-xl font-black text-slate-950">{program.name}</h3>
                  <p className="mt-2 text-sm text-slate-500">{program.faculty}</p>
                  <p className="mt-5 text-sm font-black text-univGreen">{program.courses?.length || 0} course records</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <PartnerBar />
    </div>
  );
};

export default Training;
