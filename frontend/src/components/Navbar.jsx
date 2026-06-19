import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, FileText, ImageIcon, Mail, Menu, MessageCircle, Phone, X } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { contactInfo, navigation } from '../data/siteContent';

const labelFor = (child, lang) => (lang?.startsWith('fr') ? child[1] : child[0]);

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  const [open, setOpen] = useState(false);
  const [desktopMenu, setDesktopMenu] = useState(false);

  const mainItems = navigation.filter((item) => ['university', 'training', 'admission', 'apprenticeship', 'studentLife', 'contact'].includes(item.id));
  const menuColumns = navigation.filter((item) => item.id !== 'home');

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white shadow-sm">
      <div className="hidden border-b border-slate-200 bg-slate-950 text-white lg:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-8 text-[11px] font-bold uppercase tracking-widest">
          <div className="flex items-center gap-6 text-slate-300">
            <a href={contactInfo.phoneHref} className="flex items-center gap-2 hover:text-white"><Phone size={13} /> {contactInfo.phone}</a>
            <a href={contactInfo.whatsappHref} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white"><MessageCircle size={13} /> WhatsApp</a>
            <Link to="/gallery" className="flex items-center gap-2 hover:text-white"><ImageIcon size={13} /> {lang === 'fr' ? 'Galerie' : 'Gallery'}</Link>
          </div>
          <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-2 text-slate-300 hover:text-white"><Mail size={13} /> {contactInfo.email}</a>
        </div>
      </div>

      <div className="mx-auto hidden max-w-7xl items-stretch justify-between px-6 lg:flex xl:px-8">
        <Link to="/" className="flex w-56 shrink-0 items-center gap-3 border-r border-slate-200 py-4 pr-4 xl:w-64 xl:gap-4 xl:pr-6">
          <img src="/logo.png" alt="Dunamis University" className="h-16 w-16 object-contain" />
          <div className="leading-tight">
            <span className="block text-xl font-black uppercase tracking-tight text-slate-950 xl:text-2xl">Dunamis</span>
            <span className="block text-[10px] font-black uppercase tracking-[0.22em] text-univGreen">The Entrepreneurial University</span>
          </div>
        </Link>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex h-11 items-center justify-between border-b border-slate-200 pl-7">
            <button
              type="button"
              onClick={() => setDesktopMenu((value) => !value)}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.25em] text-slate-950 hover:text-univGreen"
            >
              {desktopMenu ? <X size={17} /> : <Menu size={17} />} Menu
            </button>
            <div className="flex items-center gap-5 text-xs font-black uppercase tracking-widest">
              <Link to="/news" className="text-slate-700 hover:text-univGreen">{lang === 'fr' ? 'Infos en continu' : 'News Now'}</Link>
              <LanguageSwitcher />
            </div>
          </div>

          <div className="grid h-20 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 pl-4 xl:gap-4 xl:pl-5">
            <nav className="flex min-w-0 items-center gap-0 overflow-hidden">
              {mainItems.map((item) => (
                <div key={item.id} className="group relative">
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center gap-1 whitespace-nowrap px-2 py-3 text-[10px] font-black uppercase tracking-wider transition-colors xl:px-2.5 xl:text-[11px] ${
                        isActive ? 'text-univOrange' : 'text-slate-800 hover:text-univGreen'
                      }`
                    }
                  >
                    {t(`nav.${item.id}`)}
                    {item.children && <ChevronDown size={14} />}
                  </NavLink>

                  {item.children && (
                    <div className="invisible absolute left-0 top-full w-80 translate-y-3 border border-slate-100 bg-white p-3 opacity-0 shadow-2xl transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {item.children.map((child) => (
                        <Link key={child[2]} to={child[2]} className="block border-b border-slate-100 px-4 py-3 text-sm font-bold text-slate-700 last:border-b-0 hover:bg-univGray hover:text-univGreen">
                          {labelFor(child, i18n.language)}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex shrink-0 items-center justify-end">
              <Link to="/admission/apply" className="whitespace-nowrap bg-univOrange px-3 py-4 text-[10px] font-black uppercase tracking-wider text-white hover:bg-univGreen xl:px-4 xl:text-[11px]">
                Apply Online
              </Link>
            </div>
          </div>
        </div>
      </div>

      {desktopMenu && (
        <div className="absolute left-1/2 top-[145px] hidden max-h-[calc(100vh-155px)] w-full max-w-7xl -translate-x-1/2 overflow-y-auto border-t border-slate-200 bg-white p-8 shadow-2xl lg:block">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_1fr_1fr_1fr]">
            <div className="bg-slate-950 p-7 text-white">
              <p className="du-kicker">Dunamis</p>
              <h2 className="mt-4 text-3xl font-black leading-tight">{lang === 'fr' ? 'Trouvez le bon parcours selon votre niveau, votre filiere ou votre ambition.' : 'Find the right path by level, faculty, or ambition.'}</h2>
              <div className="mt-7 flex flex-wrap gap-3">
                <Link to="/admission/apply" onClick={() => setDesktopMenu(false)} className="bg-univOrange px-4 py-3 text-xs font-black uppercase tracking-widest text-white">{lang === 'fr' ? 'Postuler' : 'Apply'}</Link>
                <Link to="/contact" onClick={() => setDesktopMenu(false)} className="border border-white/30 px-4 py-3 text-xs font-black uppercase tracking-widest text-white hover:border-univOrange hover:text-univOrange">Contact</Link>
              </div>
              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="mb-3 text-xs font-black uppercase tracking-[0.25em] text-slate-400">{lang === 'fr' ? 'Portails' : 'Portals'}</p>
                <div className="grid gap-2">
                  <Link to="/login/staff" onClick={() => setDesktopMenu(false)} className="text-sm font-bold text-white hover:text-univOrange">{lang === 'fr' ? 'Portail Administration' : 'Administration Portal'}</Link>
                  <Link to="/login/student" onClick={() => setDesktopMenu(false)} className="text-sm font-bold text-white hover:text-univOrange">{lang === 'fr' ? 'Portail étudiant' : 'Student Portal'}</Link>
                  <Link to="/library" onClick={() => setDesktopMenu(false)} className="text-sm font-bold text-white hover:text-univOrange">{lang === 'fr' ? 'Bibliothèque en ligne' : 'Online Library'}</Link>
                </div>
              </div>
            </div>
            {menuColumns.slice(0, 9).map((item) => (
              <div key={item.id}>
                <Link to={item.path} onClick={() => setDesktopMenu(false)} className="mb-4 block text-sm font-black uppercase tracking-[0.2em] text-univGreen">
                  {t(`nav.${item.id}`)}
                </Link>
                <div className="space-y-2">
                  {(item.children || []).map((child) => (
                    <Link key={child[2]} to={child[2]} onClick={() => setDesktopMenu(false)} className="block text-sm font-semibold text-slate-600 hover:text-univOrange">
                      {labelFor(child, i18n.language)}
                    </Link>
                  ))}
                  {!item.children && <p className="text-sm text-slate-500">{lang === 'fr' ? 'Explorer cette rubrique' : 'Explore this section'}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex h-20 items-center justify-between px-4 lg:hidden">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/logo.png" alt="Dunamis University" className="h-12 w-12 object-contain" />
          <div className="leading-tight">
            <span className="block text-lg font-black uppercase tracking-tight text-slate-950">Dunamis</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.2em] text-univGreen">The Entrepreneurial University</span>
          </div>
        </Link>
        <button type="button" onClick={() => setOpen((value) => !value)} className="inline-flex h-11 w-11 items-center justify-center border border-slate-200 text-slate-900" aria-label="Toggle navigation">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {open && (
        <div className="max-h-[calc(100vh-5rem)] overflow-y-auto border-t border-slate-200 bg-white px-4 py-5 lg:hidden">
          <div className="mb-5 grid grid-cols-2 gap-3">
            <a href={contactInfo.phoneHref} className="border border-slate-200 px-4 py-3 text-center text-xs font-black uppercase tracking-widest text-slate-900">Call</a>
            <Link to="/admission/apply" onClick={() => setOpen(false)} className="bg-univOrange px-4 py-3 text-center text-xs font-black uppercase tracking-widest text-white">Apply Online</Link>
          </div>
          <div className="mb-5 flex items-center justify-between border-y border-slate-200 py-3">
            <Link to="/news" onClick={() => setOpen(false)} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-univGreen"><FileText size={14} /> {lang === 'fr' ? 'Infos en continu' : 'News Now'}</Link>
            <Link to="/gallery" onClick={() => setOpen(false)} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 hover:text-univGreen"><ImageIcon size={14} /> {lang === 'fr' ? 'Galerie' : 'Gallery'}</Link>
            <LanguageSwitcher />
          </div>
          <div className="mb-5 grid gap-2 bg-univGray p-4">
            <p className="text-xs font-black uppercase tracking-[0.25em] text-slate-500">Portals</p>
            <Link to="/login/staff" onClick={() => setOpen(false)} className="font-black text-slate-900">Administration Portal</Link>
            <Link to="/login/student" onClick={() => setOpen(false)} className="font-black text-slate-900">Student Portal</Link>
            <Link to="/library" onClick={() => setOpen(false)} className="font-black text-slate-900">Online Library</Link>
          </div>
          <nav className="space-y-2">
            {navigation.map((item) => (
              <div key={item.id} className="border-b border-slate-100 pb-2">
                <Link to={item.path} onClick={() => setOpen(false)} className="block py-2 text-sm font-black uppercase tracking-widest text-slate-900">
                  {t(`nav.${item.id}`)}
                </Link>
                {item.children && (
                  <div className="grid gap-1 pb-2 pl-4">
                    {item.children.map((child) => (
                      <Link key={child[2]} to={child[2]} onClick={() => setOpen(false)} className="py-2 text-sm font-semibold text-slate-600">
                        {labelFor(child, i18n.language)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
