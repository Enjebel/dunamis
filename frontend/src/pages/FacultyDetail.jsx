import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { faculties, heroImages } from '../data/siteContent';

const getLang = (language) => (language?.startsWith('fr') ? 'fr' : 'en');

const FacultyDetail = () => {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const lang = getLang(i18n.language);
  const faculty = faculties.find((item) => item.slug === slug) || faculties[0];

  return (
    <div className="bg-white pt-20 lg:pt-[145px]">
      <section className="relative min-h-[48vh] overflow-hidden bg-slate-950 text-white">
        <img src={heroImages.training} alt="" className="absolute inset-0 h-full w-full object-cover opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/30 to-slate-950/5" />
        <div className="du-section relative flex min-h-[48vh] flex-col justify-center py-16">
          <Link to="/training" className="mb-7 inline-flex w-fit items-center gap-2 text-sm font-black uppercase tracking-widest text-univOrange hover:text-white">
            <ArrowLeft size={18} /> {lang === 'fr' ? 'Retour aux formations' : 'Back to training'}
          </Link>
          <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">{faculty[lang].title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">{faculty[lang].summary}</p>
        </div>
      </section>

      <section className="du-section py-16">
        <h2 className="mb-8 text-3xl font-black text-slate-950">{lang === 'fr' ? 'Programmes et specialisations' : 'Programs and specializations'}</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {faculty[lang].programs.map((program) => (
            <article key={program.title} className="du-panel p-7">
              <CheckCircle2 className="mb-5 text-univGreen" size={28} />
              <h3 className="text-xl font-black text-slate-950">{program.title}</h3>
              <ul className="mt-5 space-y-3">
                {program.courses.map((course) => (
                  <li key={course} className="flex gap-3 text-sm font-semibold leading-relaxed text-slate-700">
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-univOrange" />
                    {course}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FacultyDetail;
