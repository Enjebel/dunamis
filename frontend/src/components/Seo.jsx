import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const siteUrl = 'https://dunamis-university.vercel.app';
const defaultSeo = {
  title: 'Dunamis University Cameroon | The Entrepreneurial University',
  description:
    'Dunamis University Cameroon offers entrepreneurial higher education, BTS, HND, Bachelor and Master training, work-study, admissions support and student services.',
};

const seoByRoute = {
  '/': {
    title: 'Dunamis University Cameroon | The Entrepreneurial University',
    description:
      'Official web platform for Dunamis University Cameroon: practical higher education, work-study training, student benefits, admissions and campus news.',
  },
  '/university': {
    title: 'About Dunamis University Cameroon | Mission, Vision and Governance',
    description:
      'Learn about Dunamis University Cameroon, its entrepreneurial mission, values, governance, faculty, campus and professional training model.',
  },
  '/training': {
    title: 'BTS, HND, Bachelor and Master Programs | Dunamis University Cameroon',
    description:
      'Explore Dunamis University Cameroon training programs across engineering, technology, commerce, finance, management and health sciences.',
  },
  '/admission': {
    title: 'Admissions | Dunamis University Cameroon',
    description:
      'Find admission requirements, student benefits, class sessions and application support for Dunamis University Cameroon.',
  },
  '/admission/apply': {
    title: 'Apply Online | Dunamis University Cameroon',
    description:
      'Submit an online admission request for Dunamis University Cameroon and contact the admissions team for registration support.',
  },
  '/apprenticeship': {
    title: 'Work-Study Program | 3 Days Class, 3 Days Company | Dunamis',
    description:
      'Dunamis University Cameroon combines classroom theory and company immersion through a practical work-study model.',
  },
  '/international': {
    title: 'International Study Support | Dunamis University Cameroon',
    description:
      'Discover international study guidance, student mobility and study abroad support from Dunamis University Cameroon.',
  },
  '/student-life': {
    title: 'Student Life | Clubs, Placements and Student Bureau | Dunamis',
    description:
      'Explore student life at Dunamis University Cameroon, including clubs, job placements, health, sports and the student bureau.',
  },
  '/businesses': {
    title: 'Business Partnerships | Recruit Dunamis Students',
    description:
      'Companies can recruit Dunamis students, host work-study learners, offer placements and partner with the university.',
  },
  '/news': {
    title: 'News and Campus Activities | Dunamis University Cameroon',
    description:
      'Read official news, daily activities, events, blog posts and updates from Dunamis University Cameroon.',
  },
  '/contact': {
    title: 'Contact Dunamis University Cameroon',
    description:
      'Contact Dunamis University Cameroon by phone, WhatsApp or email for admissions, partnerships and campus information.',
  },
};

const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);
  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
};

const upsertCanonical = (href) => {
  let element = document.head.querySelector('link[rel="canonical"]');
  if (!element) {
    element = document.createElement('link');
    element.setAttribute('rel', 'canonical');
    document.head.appendChild(element);
  }
  element.setAttribute('href', href);
};

const Seo = () => {
  const location = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    const path = location.pathname.replace(/\/$/, '') || '/';
    const matchedPath = Object.keys(seoByRoute)
      .filter((route) => path === route || (route !== '/' && path.startsWith(route)))
      .sort((a, b) => b.length - a.length)[0];
    const seo = seoByRoute[matchedPath] || defaultSeo;
    const canonical = `${siteUrl}${path}`;

    document.documentElement.lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
    document.title = seo.title;
    upsertCanonical(canonical);
    upsertMeta('meta[name="description"]', { name: 'description', content: seo.description });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: seo.title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: seo.description });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: seo.title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: seo.description });
  }, [location.pathname, i18n.language]);

  return null;
};

export default Seo;
