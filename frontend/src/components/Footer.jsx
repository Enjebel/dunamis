import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { contactInfo } from '../data/siteContent';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const copy = {
    en: {
      tagline: 'The Entrepreneurial University. Empowering the next generation of leaders through innovation, faith, and professional excellence.',
      quick: 'Quick Links',
      mission: 'Mission & Vision',
      programs: 'Our Programs',
      admissions: 'Admissions',
      apprenticeship: 'Apprenticeship',
      studentLife: 'Student Life',
      campusStudy: 'Campus & Study',
      engineering: 'Engineering & Tech',
      commerce: 'Commerce & Finance',
      health: 'Health Sciences',
      clubs: 'Associations & Clubs',
      wellness: 'Health & Wellness',
      abroad: 'Study Abroad',
      contact: 'Contact Us',
      address: 'University Campus, Dunamis Road',
      rights: 'All Rights Reserved. Empowering Innovation.',
    },
    fr: {
      tagline: 'L Universite Entrepreneuriale. Former la prochaine generation de leaders par l innovation, la foi et l excellence professionnelle.',
      quick: 'Liens rapides',
      mission: 'Mission & Vision',
      programs: 'Nos formations',
      admissions: 'Admissions',
      apprenticeship: 'Alternance',
      studentLife: 'Vie etudiante',
      campusStudy: 'Campus & Etudes',
      engineering: 'Ingenierie & Tech',
      commerce: 'Commerce & Finance',
      health: 'Sciences de la sante',
      clubs: 'Associations & Clubs',
      wellness: 'Sante & Bien-etre',
      abroad: 'Etudes a l etranger',
      contact: 'Nous contacter',
      address: 'Campus universitaire, route Dunamis',
      rights: 'Tous droits reserves. Au service de l innovation.',
    },
  }[lang];

  return (
    <footer className="bg-slate-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="Dunamis University" className="h-12 w-12 object-contain" />
              <span className="font-black text-white text-2xl tracking-tighter uppercase">DUNAMIS</span>
            </div>
            <p className="text-slate-400 leading-relaxed">
              {copy.tagline}
            </p>
            <div className="flex gap-4">
              <a href="https://www.facebook.com/profile.php?id=61578043154713" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-univOrange transition-all">
                <Facebook size={20} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-univOrange transition-all">
                <Linkedin size={20} />
              </a>
              <a href="https://www.instagram.com/dunamisresta/?hl=en" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-univOrange transition-all">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-univOrange uppercase tracking-widest">{copy.quick}</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/university/mission-vision" className="hover:text-white transition-colors">{copy.mission}</Link></li>
              <li><Link to="/training" className="hover:text-white transition-colors">{copy.programs}</Link></li>
              <li><Link to="/admission" className="hover:text-white transition-colors">{copy.admissions}</Link></li>
              <li><Link to="/apprenticeship" className="hover:text-white transition-colors">{copy.apprenticeship}</Link></li>
              <li><Link to="/student-life" className="hover:text-white transition-colors">{copy.studentLife}</Link></li>
            </ul>
          </div>

          {/* Study Paths */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-univOrange uppercase tracking-widest">{copy.campusStudy}</h4>
            <ul className="space-y-4 text-slate-400">
              <li><Link to="/training/faculty/engineering-technology" className="hover:text-white transition-colors">{copy.engineering}</Link></li>
              <li><Link to="/training/faculty/commerce-finance-management" className="hover:text-white transition-colors">{copy.commerce}</Link></li>
              <li><Link to="/training/faculty/health-sciences" className="hover:text-white transition-colors">{copy.health}</Link></li>
              <li><Link to="/student-life/clubs" className="hover:text-white transition-colors">{copy.clubs}</Link></li>
              <li><Link to="/student-life/wellness" className="hover:text-white transition-colors">{copy.wellness}</Link></li>
              <li><Link to="/international" className="hover:text-white transition-colors">{copy.abroad}</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6 text-univOrange uppercase tracking-widest">{copy.contact}</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-univOrange shrink-0" size={20} />
                <span>{copy.address}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-univOrange shrink-0" size={20} />
                <a href={contactInfo.phoneHref} className="hover:text-white">{contactInfo.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-univOrange shrink-0" size={20} />
                <a href={`mailto:${contactInfo.email}`} className="hover:text-white">{contactInfo.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-univOrange shrink-0" size={20} />
                <a href={contactInfo.whatsappHref} target="_blank" rel="noreferrer" className="hover:text-white">WhatsApp: {contactInfo.whatsapp}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 text-center text-slate-500 text-sm">
          <p>&copy; {currentYear} Dunamis University. {copy.rights}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
