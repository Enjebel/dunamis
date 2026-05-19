import React, { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Training from './pages/Training';
import FacultyDetail from './pages/FacultyDetail';
import RectorMessage from './pages/RectorMessage';
import SectionPage from './pages/SectionPage';
import ApplyPage from './pages/ApplyPage';

const universityFocus = {
  'mission-vision': 1,
  'values-charter': 2,
  governance: 3,
  faculty: 4,
  accreditations: 5,
  'campus-infrastructure': 6,
};

const admissionFocus = {
  'how-to-apply': 0,
  requirements: 1,
  'tuition-fees': 2,
  scholarships: 3,
  calendar: 4,
};

function App() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen w-full items-center justify-center bg-slate-950">
          <div className="animate-pulse text-2xl font-black uppercase tracking-[0.3em] text-univOrange">Dunamis</div>
        </div>
      }
    >
      <div className="flex min-h-screen flex-col bg-white font-sans text-slate-900 antialiased selection:bg-univOrange selection:text-white">
        <Navbar />
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
            <Route path="/research" element={<SectionPage pageKey="research" />} />
            <Route path="/businesses" element={<SectionPage pageKey="businesses" />} />
            <Route path="/news" element={<SectionPage pageKey="news" />} />
            <Route path="/contact" element={<SectionPage pageKey="contact" />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Suspense>
  );
}

export default App;
