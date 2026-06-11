import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CalendarDays, Newspaper } from 'lucide-react';
import { apiAssetUrl, apiRequest } from '../lib/api';
import { heroImagePositions, heroImages } from '../data/siteContent';

const PublicNews = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const [posts, setPosts] = useState([]);
  const [status, setStatus] = useState('');
  const copy = {
    en: {
      eyebrow: 'News',
      title: 'News, Activities, Events & Blog',
      intro: 'Published updates from Dunamis administration appear here automatically.',
      published: 'Published',
      empty: 'No published posts yet.',
    },
    fr: {
      eyebrow: 'Actualités',
      title: 'Actualités, activites, événements & blog',
      intro: 'Les publications de l administration de Dunamis apparaissent automatiquement ici.',
      published: 'Publie',
      empty: 'Aucune publication pour le moment.',
    },
  }[lang];

  useEffect(() => {
    apiRequest('/news-posts')
      .then(setPosts)
      .catch((error) => setStatus(error.message));
  }, []);

  const getPostMedia = (post) => {
    if (Array.isArray(post.media) && post.media.length) return post.media;
    if (post.mediaUrl && post.mediaType && post.mediaType !== 'none') return [{ url: post.mediaUrl, type: post.mediaType }];
    return [];
  };

  return (
    <div className="bg-white pt-20 lg:pt-[145px]">
      <section className="relative min-h-[46vh] overflow-hidden bg-slate-950 text-white">
        <img src={heroImages.news} alt="" className="absolute inset-0 h-full w-full object-cover opacity-85" style={{ objectPosition: heroImagePositions.news }} />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/55 via-slate-950/30 to-slate-950/5" />
        <div className="du-section relative flex min-h-[46vh] flex-col justify-center py-16">
          <p className="du-kicker mb-5">{copy.eyebrow}</p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-tight md:text-6xl">{copy.title}</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-200">{copy.intro}</p>
        </div>
      </section>

      <section className="du-section py-16">
        {status && <div className="mb-6 bg-orange-50 p-4 text-sm font-bold text-orange-700">{status}</div>}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {posts.map((post) => (
            <article key={post._id} className="du-panel overflow-hidden">
              {(() => {
                const mediaItems = getPostMedia(post);
                if (!mediaItems.length) {
                  return (
                    <div className="flex aspect-video items-center justify-center bg-univGray text-univGreen">
                      <Newspaper size={42} />
                    </div>
                  );
                }

                return (
                  <div className={mediaItems.length === 1 ? '' : 'grid grid-cols-2 gap-1 bg-slate-100'}>
                    {mediaItems.map((item, index) => (
                      <div key={`${item.url}-${index}`} className={`${mediaItems.length === 1 ? 'aspect-video' : 'aspect-square'} overflow-hidden bg-black`}>
                        {item.type === 'video' ? (
                          <video src={apiAssetUrl(item.url)} controls className="h-full w-full object-cover" />
                        ) : (
                          <img src={apiAssetUrl(item.url)} alt="" className="h-full w-full object-cover" />
                        )}
                      </div>
                    ))}
                  </div>
                );
              })()}
              <div className="p-5">
                <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-500">
                  <span className="text-univOrange">{post.category}</span>
                  <span className="flex items-center gap-1"><CalendarDays size={14} /> {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-US') : copy.published}</span>
                </div>
                <h2 className="text-xl font-black text-slate-950">{post.title}</h2>
                {post.excerpt && <p className="mt-3 text-sm font-semibold leading-relaxed text-slate-600">{post.excerpt}</p>}
                <p className="mt-4 whitespace-pre-line text-sm leading-relaxed text-slate-700">{post.body}</p>
              </div>
            </article>
          ))}
          {!posts.length && !status && <p className="text-sm font-semibold text-slate-500">{copy.empty}</p>}
        </div>
      </section>
    </div>
  );
};

export default PublicNews;
