import React from 'react';
import { useTranslation } from 'react-i18next';
import { ImageIcon, PlayCircle } from 'lucide-react';
import { facebookVideos, heroImages } from '../data/siteContent';

const getLang = (language) => (language?.startsWith('fr') ? 'fr' : 'en');

const galleryImages = [
  '/pictures/WhatsApp Image 2026-06-07 at 4.17.09 PM.jpeg',
  '/pictures/WhatsApp Image 2026-06-07 at 4.17.10 PM (1).jpeg',
  '/pictures/WhatsApp Image 2026-06-07 at 4.17.10 PM.jpeg',
  '/pictures/WhatsApp Image 2026-06-07 at 4.17.11 PM.jpeg',
  '/pictures/WhatsApp Image 2026-06-07 at 5.59.29 AM.jpeg',
  '/pictures/WhatsApp Image 2026-06-07 at 5.59.30 AM.jpeg',
  '/student life/WhatsApp Image 2026-06-07 at 4.17.10 PM (1).jpeg',
  '/student life/WhatsApp Image 2026-06-07 at 4.17.10 PM.jpeg',
  '/student life/WhatsApp Image 2026-06-07 at 4.17.11 PM.jpeg',
];

const Gallery = () => {
  const { i18n } = useTranslation();
  const lang = getLang(i18n.language);
  const copy = {
    en: {
      eyebrow: 'School Gallery',
      title: 'Dunamis campus in pictures and videos',
      intro: 'Explore student life, activities, campus moments, and official Dunamis videos in one place.',
      images: 'Photo Gallery',
      videos: 'Campus Videos',
    },
    fr: {
      eyebrow: 'Galerie de l’ecole',
      title: 'Le campus Dunamis en images et en videos',
      intro: 'Decouvrez la vie etudiante, les activites, les moments du campus et les videos officielles de Dunamis.',
      images: 'Galerie Photo',
      videos: 'Videos du Campus',
    },
  }[lang];

  return (
    <div className="bg-white pt-20 lg:pt-[145px]">
      <section className="relative min-h-[52vh] overflow-hidden bg-slate-950 text-white">
        <img src={heroImages.studentLife} alt="" className="absolute inset-0 h-full w-full object-cover opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/60 via-slate-950/25 to-slate-950/5" />
        <div className="du-section relative flex min-h-[52vh] flex-col justify-center py-20">
          <p className="du-kicker mb-5">{copy.eyebrow}</p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">{copy.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-100">{copy.intro}</p>
        </div>
      </section>

      <section className="du-section py-16">
        <div className="mb-8 flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center bg-univGray text-univGreen">
            <ImageIcon size={22} />
          </span>
          <h2 className="text-3xl font-black tracking-tight text-slate-950">{copy.images}</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {galleryImages.map((image, index) => (
            <article key={image} className="du-panel du-hover-lift reveal-up overflow-hidden" style={{ animationDelay: `${index * 0.06}s` }}>
              <img src={image} alt={lang === 'fr' ? 'Vie etudiante Dunamis' : 'Dunamis student life'} className="h-80 w-full object-cover" />
            </article>
          ))}
        </div>
      </section>

      <section className="bg-univGray py-16">
        <div className="du-section">
          <div className="mb-8 flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center bg-white text-univOrange">
              <PlayCircle size={24} />
            </span>
            <h2 className="text-3xl font-black tracking-tight text-slate-950">{copy.videos}</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facebookVideos.map((url, index) => (
              <div key={url} className="aspect-[9/16] overflow-hidden bg-black shadow-2xl reveal-up" style={{ animationDelay: `${index * 0.05}s` }}>
                <iframe
                  src={url}
                  title={`Dunamis campus video ${index + 1}`}
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
    </div>
  );
};

export default Gallery;
