import React, { Suspense, useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Training from './pages/Training';
import FacultyDetail from './pages/FacultyDetail';
import RectorMessage from './pages/RectorMessage';
import SectionPage from './pages/SectionPage';
import ApplyPage from './pages/ApplyPage';
import AdminPortal from './pages/AdminPortal';
import StudentPortal from './pages/StudentPortal';
import LibraryPortal from './pages/LibraryPortal';
import NewsAdminPortal from './pages/NewsAdminPortal';
import AuthPortal from './pages/AuthPortal';
import RequireAuth from './components/RequireAuth';
import AcademicToolsPortal from './pages/AcademicToolsPortal';
import LectureValidationPortal from './pages/LectureValidationPortal';
import TimetableAdminPortal from './pages/TimetableAdminPortal';
import PublicNews from './pages/PublicNews';

const universityFocus = {
  'mission-vision': 1,
  'values-charter': 2,
  governance: 3,
  faculty: 4,
  'campus-infrastructure': 5,
};

const admissionFocus = {
  'how-to-apply': 0,
  requirements: 0,
  'tuition-fees': 2,
  scholarships: 1,
  calendar: 3,
};

const studentLifeFocus = {
  clubs: 0,
  sports: 1,
  wellness: 2,
  incubator: 3,
};

function App() {
  const location = useLocation();
  const isPortal = ['/admin', '/student', '/library', '/login'].some((path) => location.pathname === path || location.pathname.startsWith(`${path}/`));

  useEffect(() => {
    window.requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, [location.pathname]);

  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-slate-950">
          <div className="animate-pulse text-2xl font-black uppercase tracking-[0.3em] text-univOrange">Dunamis</div>
        </div>
      }
    >
      <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900 antialiased selection:bg-univOrange selection:text-white">
        {!isPortal && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/university" element={<SectionPage pageKey="university" />} />
            <Route path="/university/rector" element={<RectorMessage />} />
            {Object.entries(universityFocus).map(([slug, index]) => (
              <Route key={slug} path={`/university/${slug}`} element={<SectionPage pageKey="university" focusIndex={index} />} />
            ))}
            <Route path="/training" element={<Training />} />
            <Route path="/training/faculty/:slug" element={<FacultyDetail />} />
            <Route path="/training/:cycle" element={<Training />} />
            <Route path="/admission" element={<SectionPage pageKey="admission" />} />
            <Route path="/admission/apply" element={<ApplyPage />} />
            {Object.entries(admissionFocus).map(([slug, index]) => (
              <Route key={slug} path={`/admission/${slug}`} element={<SectionPage pageKey="admission" focusIndex={index} />} />
            ))}
            <Route path="/apprenticeship" element={<SectionPage pageKey="apprenticeship" />} />
            <Route path="/international" element={<SectionPage pageKey="international" />} />
            <Route path="/student-life" element={<SectionPage pageKey="studentLife" />} />
            {Object.entries(studentLifeFocus).map(([slug, index]) => (
              <Route key={slug} path={`/student-life/${slug}`} element={<SectionPage pageKey="studentLife" focusIndex={index} />} />
            ))}
            <Route path="/research" element={<SectionPage pageKey="research" />} />
            <Route path="/businesses" element={<SectionPage pageKey="businesses" />} />
            <Route path="/news" element={<PublicNews />} />
            <Route path="/contact" element={<SectionPage pageKey="contact" />} />
            <Route path="/admin" element={<RequireAuth roles={['super_admin', 'academic_admin']}><AdminPortal /></RequireAuth>} />
            <Route path="/admin/academic-tools" element={<RequireAuth roles={['super_admin', 'academic_admin']}><AcademicToolsPortal /></RequireAuth>} />
            <Route path="/admin/lecture-hours" element={<RequireAuth roles={['super_admin', 'academic_admin']}><LectureValidationPortal /></RequireAuth>} />
            <Route path="/admin/timetable" element={<RequireAuth roles={['super_admin', 'academic_admin']}><TimetableAdminPortal /></RequireAuth>} />
            <Route path="/admin/news" element={<RequireAuth roles={['super_admin', 'academic_admin']}><NewsAdminPortal /></RequireAuth>} />
            <Route path="/student" element={<RequireAuth roles={['student']}><StudentPortal /></RequireAuth>} />
            <Route path="/student/results" element={<RequireAuth roles={['student']}><StudentPortal /></RequireAuth>} />
            <Route path="/student/resits" element={<RequireAuth roles={['student']}><StudentPortal /></RequireAuth>} />
            <Route path="/student/profile" element={<RequireAuth roles={['student']}><StudentPortal /></RequireAuth>} />
            <Route path="/student/mock-results" element={<RequireAuth roles={['student']}><StudentPortal /></RequireAuth>} />
            <Route path="/library" element={<RequireAuth roles={['student', 'librarian', 'super_admin', 'academic_admin']}><LibraryPortal /></RequireAuth>} />
            <Route path="/login" element={<AuthPortal />} />
            <Route path="/login/:accessType" element={<AuthPortal />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        {!isPortal && <Footer />}
      </div>
    </Suspense>
  );
}

export default App;
