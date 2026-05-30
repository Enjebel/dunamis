import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, CheckCircle2, Mail, MapPin, MessageCircle, Phone } from 'lucide-react';
import { contactInfo, facebookVideos, heroImages, localImages, pages } from '../data/siteContent';

const getLang = (language) => (language?.startsWith('fr') ? 'fr' : 'en');

const SectionPage = ({ pageKey, focusTitle, focusIndex }) => {
  const { t, i18n } = useTranslation();
  const lang = getLang(i18n.language);
  const page = pages[pageKey]?.[lang] || pages.university[lang];
  const image = heroImages[pageKey] || pages[pageKey]?.image || localImages[0];
  const sections = Number.isInteger(focusIndex) ? [page.sections[focusIndex]].filter(Boolean) : focusTitle ? page.sections.filter((section) => section.title.toLowerCase() === focusTitle.toLowerCase()) : page.sections;
  const visibleSections = sections.length ? sections : page.sections;
  const handleContactSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const message = [
      'Dunamis website contact request',
      `Name: ${data.get('name') || ''}`,
      `Email: ${data.get('email') || ''}`,
      `Message: ${data.get('message') || ''}`,
    ].join('\n');
    window.open(`${contactInfo.whatsappHref}?text=${encodeURIComponent(message)}`, '_blank', 'noreferrer');
  };

  return (
    <div className="bg-white pt-20 lg:pt-[145px]">
      <section className="relative min-h-[54vh] overflow-hidden bg-slate-950 text-white">
        <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-85" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/30 to-slate-950/5" />
        <div className="du-section relative flex min-h-[54vh] flex-col justify-center py-20">
          <p className="du-kicker mb-5">{page.eyebrow}</p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">{focusTitle || page.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">{page.intro}</p>
          {pageKey === 'admission' && (
            <Link to="/admission/apply" className="mt-9 inline-flex w-fit items-center gap-2 rounded bg-univOrange px-6 py-4 text-sm font-black uppercase tracking-widest text-white hover:bg-univGreen">
              {t('actions.apply')} <ArrowRight size={18} />
            </Link>
          )}
        </div>
      </section>

      {pageKey !== 'contact' && visibleSections.length > 0 && (
      <section className="du-section grid gap-10 py-16 lg:grid-cols-[280px_1fr]">
        <aside className="h-fit border border-slate-200 bg-univGray p-6 lg:sticky lg:top-36">
          <p className="du-kicker mb-4">{page.eyebrow}</p>
          <nav className="space-y-2">
            {page.sections.map((section) => (
              <a key={section.title} href={`#${section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} className="block border-b border-slate-200 py-3 text-sm font-black text-slate-700 last:border-b-0 hover:text-univGreen">
                {section.title}
              </a>
            ))}
          </nav>
        </aside>
        <div className="grid gap-6 md:grid-cols-2">
          {visibleSections.map((section, index) => (
            <article id={section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')} key={section.title} className="du-panel du-hover-lift reveal-up p-7 hover:border-univGreen" style={{ animationDelay: `${index * 0.05}s` }}>
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded bg-univGray text-univGreen">
                <CheckCircle2 size={22} />
              </div>
              <h2 className="mb-3 text-xl font-black tracking-tight text-slate-950">{section.title}</h2>
              <p className="leading-relaxed text-slate-600">{section.text}</p>
              <div className="mt-6 text-xs font-black uppercase tracking-[0.2em] text-univOrange">0{index + 1}</div>
            </article>
          ))}
        </div>
      </section>
      )}

      {pageKey === 'university' && Number.isInteger(focusIndex) && (
        <section className="bg-univGray py-16">
          <div className="du-section grid gap-6 md:grid-cols-3">
            {[
              ['mission-vision', ['Mission: train creators and leaders', 'Vision: a reference entrepreneurial university', 'Method: practice, mentorship, and industry projects']],
              ['values-charter', ['Integrity in every academic act', 'Discipline and respect for commitments', 'Service, innovation, and community impact']],
              ['governance', ['Rectorate and academic leadership', 'Quality assurance and program review', 'Industry advisory input for employability']],
              ['faculty', ['Practitioner lecturers and researchers', 'Professional mentors from companies', 'Student supervision and applied projects']],
              ['accreditations', ['Programs aligned to recognized standards', 'Internal review of learning outcomes', 'Employability and professional relevance indicators']],
              ['campus-infrastructure', ['Modern classrooms and seminar rooms', 'Computer, digital, and applied science labs', 'Student services, incubation, and collaboration spaces']],
            ][focusIndex]?.[1]?.map((item) => (
              <div key={item} className="du-panel p-6 reveal-up">
                <p className="text-xs font-black uppercase tracking-[0.2em] text-univOrange">Dunamis</p>
                <h3 className="mt-3 text-xl font-black text-slate-950">{item}</h3>
              </div>
            ))}
          </div>
        </section>
      )}

      {pageKey === 'studentLife' && (
        <section className="bg-univGray py-16 text-slate-950">
          <div className="du-section">
            <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.3em] text-univOrange">Facebook</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight md:text-4xl">Campus Highlights</h2>
              </div>
              <a href="https://www.facebook.com/people/Dunamis-The-Entrepreneurial-University/61578043154713/" target="_blank" rel="noreferrer" className="text-sm font-black uppercase tracking-widest text-univOrange hover:text-univGreen">
                Facebook page
              </a>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {facebookVideos.map((url) => (
                <div key={url} className="aspect-[9/16] overflow-hidden bg-black shadow-2xl">
                  <iframe
                    src={url}
                    title="Dunamis Facebook video"
                    className="h-full w-full"
                    style={{ border: 'none', overflow: 'hidden' }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {pageKey === 'contact' && (
        <section className="du-section grid gap-8 pb-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-4">
            {[
              [MapPin, 'Campus', lang === 'fr' ? 'Campus Dunamis, Cameroun' : 'Dunamis Campus, Cameroon'],
              [Phone, 'Phone', contactInfo.phone],
              [MessageCircle, 'WhatsApp', contactInfo.whatsapp],
              [Mail, 'Email', contactInfo.email],
            ].map(([Icon, label, value]) => (
              <div key={label} className="du-panel flex items-center gap-4 p-6">
                <span className="flex h-12 w-12 items-center justify-center rounded bg-univGray text-univGreen"><Icon size={22} /></span>
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-univOrange">{label}</p>
                  <p className="font-bold text-slate-800">{value}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleContactSubmit} className="du-panel grid gap-4 p-6 md:p-8">
            <label className="du-field"><span className="du-label">{lang === 'fr' ? 'Nom du visiteur' : 'Visitor name'}</span><input name="name" className="du-input py-4" placeholder={lang === 'fr' ? 'Entrez votre nom' : 'Enter your name'} required /></label>
            <label className="du-field"><span className="du-label">{lang === 'fr' ? 'Adresse email' : 'Email address'}</span><input name="email" className="du-input py-4" placeholder={lang === 'fr' ? 'Entrez votre email' : 'Enter your email'} type="email" /></label>
            <label className="du-field"><span className="du-label">{lang === 'fr' ? 'Message a envoyer' : 'Message to send'}</span><textarea name="message" className="du-input min-h-36 py-4" placeholder={lang === 'fr' ? 'Ecrivez votre message' : 'Write your message'} required /></label>
            <button className="bg-univOrange px-5 py-4 text-sm font-black uppercase tracking-widest text-white hover:bg-univGreen" type="submit">
              {lang === 'fr' ? 'Envoyer sur WhatsApp' : 'Send on WhatsApp'}
            </button>
            <a href={`mailto:${contactInfo.email}`} className="text-center text-xs font-black uppercase tracking-widest text-slate-500 hover:text-univGreen">{contactInfo.email}</a>
          </form>
        </section>
      )}
    </div>
  );
};

export default SectionPage;
