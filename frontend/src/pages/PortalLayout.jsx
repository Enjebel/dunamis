import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { BarChart3, Bell, BookOpen, CalendarDays, FileText, GraduationCap, Library, LogOut, Menu, Newspaper, RotateCcw, ShieldCheck, UserCircle, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { apiAssetUrl } from '../lib/api';

const baseLinks = [
  { to: '/admin', label: 'Admin Dashboard', icon: ShieldCheck, roles: ['super_admin', 'academic_admin'] },
  { to: '/admin/academic-tools', label: 'Academic Tools', icon: BookOpen, roles: ['super_admin', 'academic_admin', 'lecturer'] },
  { to: '/admin/lecture-hours', label: 'Lecture Hours', icon: BarChart3, roles: ['super_admin', 'academic_admin', 'lecturer'] },
  { to: '/admin/timetable', label: 'Timetables', icon: CalendarDays, roles: ['super_admin', 'academic_admin'] },
  { to: '/admin/news', label: 'News & Activities', icon: Newspaper, roles: ['super_admin', 'academic_admin'] },
  { to: '/library', label: 'Online Library', icon: Library, roles: ['super_admin', 'academic_admin', 'librarian', 'student'] },
];

const studentLinks = [
  { to: '/student', label: 'Dashboard', icon: GraduationCap },
  { to: '/student/results', label: 'View Results', icon: FileText },
  { to: '/student/resits', label: 'Resit', icon: RotateCcw, badgeKey: 'resitCount' },
  { to: '/student/profile', label: 'Student Profile', icon: UserCircle },
  { to: '/library', label: 'Online Library', icon: Library },
  { to: '/student/mock-results', label: 'Mock Result HND', icon: BookOpen },
];

const PortalLayout = ({ title, eyebrow, children, actions, studentBadge = 0, studentProfile }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isStudent = user?.role === 'student';
  const links = isStudent ? studentLinks : baseLinks.filter((item) => item.roles.includes(user?.role));

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const portalNav = (onClick) => (
    <nav className="space-y-2">
      {links.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          onClick={onClick}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 text-sm font-black transition ${
              isActive ? 'bg-slate-950 text-white' : 'text-slate-700 hover:bg-univGray hover:text-univGreen'
            }`
          }
        >
          <item.icon size={18} />
          <span className="min-w-0 flex-1">{item.label}</span>
          {item.badgeKey === 'resitCount' && studentBadge > 0 && (
            <span className="flex h-6 min-w-6 items-center justify-center bg-red-600 px-2 text-[11px] text-white">{studentBadge}</span>
          )}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="du-section grid min-w-0 gap-5 py-4 lg:gap-8 lg:py-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <div className="border border-slate-200 bg-white p-4 shadow-sm lg:hidden">
          <div className="flex items-center justify-between gap-3">
            <Link to="/" className="flex min-w-0 items-center gap-3">
              <img src="/logo.png" alt="Dunamis" className="h-11 w-11 shrink-0 object-contain" />
              <div className="min-w-0">
                <p className="truncate text-sm font-black uppercase text-slate-950">Dunamis OS</p>
                <p className="truncate text-[10px] font-black uppercase tracking-[0.16em] text-univGreen">{isStudent ? 'Student Portal' : 'Admin Portal'}</p>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((value) => !value)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center border border-slate-200 text-slate-950"
              aria-label="Toggle portal menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
          {mobileMenuOpen && (
            <div className="mt-4 border-t border-slate-200 pt-4">
              {portalNav(() => setMobileMenuOpen(false))}
              <button onClick={handleLogout} className="mt-4 flex w-full items-center justify-center gap-2 bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-widest text-white">
                <LogOut size={15} /> Logout
              </button>
            </div>
          )}
        </div>

        <aside className="hidden h-fit border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-40 lg:block">
          <Link to="/" className="mb-6 flex items-center gap-3 border-b border-slate-200 pb-5">
            <img src="/logo.png" alt="Dunamis" className="h-12 w-12 object-contain" />
            <div>
              <p className="text-sm font-black uppercase text-slate-950">Dunamis OS</p>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-univGreen">University System</p>
            </div>
          </Link>
          {portalNav()}
          <div className="mt-8 border-t border-slate-200 pt-5">
            <p className="mb-4 text-sm font-black text-slate-950">{user?.name || 'Portal User'}</p>
            <div className="flex items-center gap-3 text-sm font-semibold text-slate-600">
              <BarChart3 className="text-univOrange" size={18} />
              Connected to Dunamis MongoDB system.
            </div>
            <button onClick={handleLogout} className="mt-5 flex w-full items-center justify-center gap-2 bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-widest text-white">
              <LogOut size={15} /> Logout
            </button>
          </div>
        </aside>

        <main className="min-w-0">
          {isStudent && (
            <header className="mb-5 hidden flex-col justify-between gap-4 border border-slate-200 bg-white p-4 shadow-sm md:flex md:flex-row md:items-center lg:mb-6">
              <Link to="/" className="flex items-center gap-3">
                <img src="/logo.png" alt="Dunamis" className="h-12 w-12 object-contain" />
                <div>
                  <p className="text-sm font-black uppercase text-slate-950">Dunamis University</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-univGreen">Student Portal</p>
                </div>
              </Link>
              <div className="grid gap-3 sm:grid-cols-2 md:flex md:flex-wrap md:items-center">
                <div className="flex items-center gap-2 bg-univGray px-3 py-3 text-sm font-black text-slate-700 sm:px-4">
                  <Bell size={17} className="text-univOrange" />
                  {studentBadge} resit notification{studentBadge === 1 ? '' : 's'}
                </div>
                <div className="flex min-w-0 items-center gap-3 border border-slate-200 px-3 py-3 sm:px-4">
                  {studentProfile?.profilePhotoUrl ? (
                    <img src={apiAssetUrl(studentProfile.profilePhotoUrl)} alt="" className="h-10 w-10 object-cover" />
                  ) : (
                    <UserCircle className="text-univGreen" size={32} />
                  )}
                  <div>
                    <p className="truncate text-sm font-black text-slate-950">{studentProfile?.firstName || user?.name} {studentProfile?.lastName || ''}</p>
                    <p className="truncate text-xs font-bold text-slate-500">Level {studentProfile?.level || '-'} - {studentProfile?.programCode || 'Program pending'}</p>
                  </div>
                </div>
              </div>
            </header>
          )}
          {!isStudent && (
            <header className="mb-5 hidden flex-col justify-between gap-4 border border-slate-200 bg-white p-4 shadow-sm md:flex md:flex-row md:items-center lg:mb-6">
              <Link to="/" className="flex items-center gap-3">
                <img src="/logo.png" alt="Dunamis" className="h-12 w-12 object-contain" />
                <div>
                  <p className="text-sm font-black uppercase text-slate-950">Dunamis University</p>
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-univGreen">Administration Portal</p>
                </div>
              </Link>
              <div className="grid gap-3 sm:grid-cols-2 md:flex md:flex-wrap md:items-center">
                <div className="flex items-center gap-2 bg-univGray px-3 py-3 text-sm font-black text-slate-700 sm:px-4">
                  <Bell size={17} className="text-univOrange" />
                  Administrative workspace
                </div>
                <div className="flex min-w-0 items-center gap-3 border border-slate-200 px-3 py-3 sm:px-4">
                  <UserCircle className="text-univGreen" size={32} />
                  <div>
                    <p className="truncate text-sm font-black text-slate-950">{user?.name || 'Administrator'}</p>
                    <p className="truncate text-xs font-bold uppercase tracking-widest text-slate-500">{(user?.role || 'admin').replace(/_/g, ' ')}</p>
                  </div>
                </div>
              </div>
            </header>
          )}
          <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-end lg:mb-8">
            <div className="min-w-0">
              <p className="du-kicker">{eyebrow}</p>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{title}</h1>
            </div>
            <div className="grid gap-3 sm:flex sm:flex-wrap">{actions}</div>
          </div>
          {children}
        </main>
      </div>
    </div>
  );
};

export default PortalLayout;
