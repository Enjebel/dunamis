import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Briefcase, CalendarDays, Globe2, GraduationCap, Users } from 'lucide-react';
import PartnerBar from '../components/PartnerBar';
import { faculties, heroImages, localImages, pages, trainingCycles } from '../data/siteContent';

const getLang = (language) => (language?.startsWith('fr') ? 'fr' : 'en');

const Home = () => {
  const { t, i18n } = useTranslation();
  const lang = getLang(i18n.language);
  const [activeSlide, setActiveSlide] = useState(0);
  const copy = {
    en: {
      title: 'Dunamis, The Entrepreneurial University',
      lead: 'A professional university for students who want recognized training, company experience, international mobility, and the confidence to create value.',
      slides: [
        {
          image: heroImages.university,
          kicker: 'Dunamis University',
          title: 'Dunamis, The Entrepreneurial University',
          lead: 'A professional university for recognized training, company experience, international mobility, and the confidence to create value.',
          primary: 'Apply Online',
          primaryPath: '/admission/apply',
          secondary: 'Explore Programs',
          secondaryPath: '/training',
        },
        {
          image: heroImages.apprenticeship,
          kicker: 'Work-study model',
          title: '3 days in class, 3 days in a company',
          lead: 'Dunamis connects lessons with real professional practice: students spend part of the week in class, then apply what they learn inside a company, building confidence, discipline, and practical work experience before graduation.',
          primary: 'See Apprenticeship',
          primaryPath: '/apprenticeship',
          secondary: 'Contact Admissions',
          secondaryPath: '/contact',
        },
        {
          image: localImages[9],
          kicker: 'Why choose us',
          title: 'Scholarship, laptop offers, modern labs, and Wi-Fi',
          lead: 'Students choose Dunamis for practical teaching, scholarship support, laptop offers for eligible early registrations, day and evening sessions, equipped multimedia rooms, biomedical laboratories, campus Wi-Fi, and lecturers focused on professional success.',
          primary: 'Admission Requirements',
          primaryPath: '/admission/requirements',
          secondary: 'Apply Online',
          secondaryPath: '/admission/apply',
        },
      ],
      admission: 'Admission 2026',
      session: 'Book an information or admission appointment',
      why: 'Why Choose Dunamis',
      programs: 'Find Your Program',
      news: 'Campus News & Events',
      stats: [
        ['3', 'Faculties'],
        ['3/3', 'Class / company rhythm'],
        ['EN + FR', 'Bilingual pathways'],
        ['100%', 'Professional ambition'],
      ],
      reasons: [
        ['Work-study culture', 'A clear 3 days in class / 3 days in a company model that connects theory to responsibility.'],
        ['Career support', 'CV coaching, company matching, professional events, and apprenticeship preparation.'],
        ['International routes', 'Canada, Germany, student mobility, and partnerships for students with global ambition.'],
      ],
    },
    fr: {
      title: "Dunamis, l'Universite Entrepreneuriale",
      lead: 'Une universite professionnelle pour les etudiants qui veulent une formation reconnue, une experience entreprise, une mobilite internationale et la confiance pour creer de la valeur.',
      slides: [
        {
          image: heroImages.university,
          kicker: 'Dunamis University',
          title: "Dunamis, l'Universite Entrepreneuriale",
          lead: 'Une universite professionnelle pour une formation reconnue, une experience en entreprise, la mobilite internationale et la creation de valeur.',
          primary: 'Postuler en ligne',
          primaryPath: '/admission/apply',
          secondary: 'Voir les formations',
          secondaryPath: '/training',
        },
        {
          image: heroImages.apprenticeship,
          kicker: 'Alternance',
          title: '3 jours en cours, 3 jours en entreprise',
          lead: 'Dunamis relie les cours a la pratique: les etudiants apprennent en classe puis appliquent en entreprise pour developper confiance, discipline et experience professionnelle avant le diplome.',
          primary: 'Voir l alternance',
          primaryPath: '/apprenticeship',
          secondary: 'Contacter les admissions',
          secondaryPath: '/contact',
        },
        {
          image: localImages[9],
          kicker: 'Pourquoi nous choisir',
          title: 'Bourse, laptop, salles modernes, labo et Wi-Fi',
          lead: 'Dunamis offre un cadre pratique avec bourse, offre laptop pour inscriptions eligibles, cours du jour et du soir, salles multimedia, laboratoire biomedical, Wi-Fi et enseignants orientes vers la reussite professionnelle.',
          primary: 'Conditions d admission',
          primaryPath: '/admission/requirements',
          secondary: 'Postuler',
          secondaryPath: '/admission/apply',
        },
      ],
      admission: 'Admission 2026',
      session: "Prendre un rendez-vous d'information ou d'admission",
      why: 'Pourquoi Choisir Dunamis',
      programs: 'Trouvez Votre Formation',
      news: 'Actualites & Evenements',
      stats: [
        ['3', 'Facultes'],
        ['3/3', 'Rythme cours / entreprise'],
        ['EN + FR', 'Parcours bilingues'],
        ['100%', 'Ambition professionnelle'],
      ],
      reasons: [
        ['Culture alternance', 'Un modele clair de 3 jours en cours / 3 jours en entreprise pour relier theorie et responsabilite.'],
        ['Accompagnement carriere', 'Coaching CV, mise en relation entreprise, evenements professionnels et preparation alternance.'],
        ['Parcours internationaux', 'Canada, Allemagne, mobilite et partenariats pour les etudiants ambitieux a l international.'],
      ],
    },
  }[lang];
  const slide = copy.slides[activeSlide] || copy.slides[0];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % copy.slides.length);
    }, 5500);
    return () => window.clearInterval(timer);
  }, [copy.slides.length]);

  return (
    <div className="bg-white pt-20 lg:pt-[145px]">
      <section className="relative overflow-hidden bg-slate-950 text-white">
        {copy.slides.map((item, index) => (
          <img
            key={item.title}
            src={item.image || heroImages.home}
            alt=""
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out ${activeSlide === index ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/35 to-slate-950/5" />
        <div className="du-section relative grid min-h-[76vh] gap-10 py-16 lg:grid-cols-[1fr_380px] lg:items-center">
          <div key={slide.title} className="reveal-up flex min-h-[430px] flex-col justify-center md:min-h-[470px]">
            <p className="du-kicker mb-5">{slide.kicker}</p>
            <h1 className="max-w-4xl text-5xl font-black leading-[0.98] tracking-tight md:text-7xl">{slide.title}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-slate-100 md:text-xl">{slide.lead}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link to={slide.primaryPath} className="inline-flex items-center gap-2 bg-univOrange px-6 py-4 text-sm font-black uppercase tracking-widest text-white hover:bg-univGreen">
                {slide.primary} <ArrowRight size={18} />
              </Link>
              <Link to={slide.secondaryPath} className="inline-flex items-center gap-2 border border-white/50 px-6 py-4 text-sm font-black uppercase tracking-widest text-white hover:bg-white hover:text-slate-950">
                {slide.secondary}
              </Link>
            </div>
            <div className="mt-8 flex gap-2">
              {copy.slides.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Show slide ${index + 1}`}
                  className={`h-2.5 transition-all ${activeSlide === index ? 'w-10 bg-univOrange' : 'w-2.5 bg-white/60 hover:bg-white'}`}
                />
              ))}
            </div>
          </div>

          <aside className="reveal-soft bg-white p-7 text-slate-950 shadow-2xl" style={{ animationDelay: '0.12s' }}>
            <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-5">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.25em] text-univOrange">{copy.admission}</p>
                <h2 className="mt-2 text-2xl font-black">{copy.session}</h2>
              </div>
              <CalendarDays className="text-univGreen" size={34} />
            </div>
            <div className="space-y-3">
              {trainingCycles.map((cycle) => (
                <Link key={cycle.slug} to={`/training/${cycle.slug}`} className="flex items-center justify-between border border-slate-200 px-4 py-3 font-bold hover:border-univGreen hover:text-univGreen">
                  {cycle[lang].title}
                  <ArrowRight size={16} />
                </Link>
              ))}
            </div>
            <Link to="/contact" className="mt-6 block bg-slate-950 px-5 py-4 text-center text-xs font-black uppercase tracking-widest text-white hover:bg-univGreen">
              {lang === 'fr' ? 'Contacter les admissions' : 'Contact admissions'}
            </Link>
          </aside>
        </div>
      </section>

      <section className="border-b border-slate-200">
        <div className="du-section grid grid-cols-2 gap-px bg-slate-200 px-0 md:grid-cols-4">
          {copy.stats.map(([value, label]) => (
            <div key={label} className="bg-white px-4 py-9 text-center">
              <div className="text-4xl font-black text-slate-950">{value}</div>
              <div className="mt-2 text-xs font-black uppercase tracking-widest text-slate-500">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="du-section py-20">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="du-kicker">Academic Offer</p>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">{copy.programs}</h2>
          </div>
          <Link to="/training" className="text-sm font-black uppercase tracking-widest text-univGreen hover:text-univOrange">{t('actions.viewPage')}</Link>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {faculties.map((faculty, index) => (
            <Link key={faculty.slug} to={`/training/faculty/${faculty.slug}`} className="group du-panel du-hover-lift reveal-up overflow-hidden" style={{ animationDelay: `${index * 0.06}s` }}>
              <img src={localImages[index + 1]} alt="" className="h-56 w-full object-cover du-image-zoom" />
              <div className="p-7">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-univOrange">Faculty 0{index + 1}</p>
                <h3 className="text-2xl font-black tracking-tight text-slate-950">{faculty[lang].title}</h3>
                <p className="mt-3 leading-relaxed text-slate-600">{faculty[lang].summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-slate-950 py-20 text-white">
        <div className="du-section grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <div>
            <p className="du-kicker">Alternance</p>
            <h2 className="mt-4 text-4xl font-black tracking-tight">{lang === 'fr' ? 'Le rythme 3/3 qui professionnalise vraiment' : 'The 3/3 rhythm that makes training professional'}</h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">
              {lang === 'fr'
                ? 'L alternance n est pas un detail dans le projet Dunamis: elle structure la semaine, les competences et l insertion.'
                : 'Apprenticeship is not a side feature at Dunamis: it shapes the week, the skills, and the path to employment.'}
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {copy.reasons.map(([title, text], index) => {
              const Icon = [Briefcase, Users, Globe2][index];
              return (
                <article key={title} className="reveal-up border border-white/10 bg-white/5 p-6" style={{ animationDelay: `${index * 0.08}s` }}>
                  <Icon className="mb-5 text-univOrange" size={30} />
                  <h3 className="text-xl font-black">{title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">{text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <PartnerBar />

      <section className="bg-univGray py-20">
        <div className="du-section">
          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="du-kicker">Dunamis Live</p>
              <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950">{copy.news}</h2>
            </div>
            <Link to="/news" className="text-sm font-black uppercase tracking-widest text-univGreen hover:text-univOrange">{t('actions.viewPage')}</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {pages.news[lang].sections.slice(0, 3).map((item, index) => (
              <article key={item.title} className="du-panel du-hover-lift reveal-up" style={{ animationDelay: `${index * 0.06}s` }}>
                <img src={localImages[index + 7]} alt="" className="h-52 w-full object-cover" />
                <div className="p-6">
                  <p className="mb-3 text-xs font-black uppercase tracking-widest text-univOrange">Dunamis</p>
                  <h3 className="text-xl font-black text-slate-950">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
