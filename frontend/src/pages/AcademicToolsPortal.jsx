import React, { useEffect, useState } from 'react';
import { BookOpen, CheckCircle2, FileUp, Printer, Search } from 'lucide-react';
import PortalLayout from './PortalLayout';
import { API_BASE_URL, apiRequest, getStoredSession } from '../lib/api';

const AcademicToolsPortal = () => {
  const [programs, setPrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState('');
  const [catalog, setCatalog] = useState(null);
  const [programForResults, setProgramForResults] = useState('');
  const [pdfFile, setPdfFile] = useState(null);
  const [importPreview, setImportPreview] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    apiRequest('/programs').then(setPrograms).catch((error) => setStatus(error.message));
  }, []);

  const loadCatalog = async () => {
    if (!selectedProgram) return;
    setStatus('');
    try {
      const data = await apiRequest(`/programs/${selectedProgram}/catalog`);
      setCatalog(data);
    } catch (error) {
      setStatus(error.message);
    }
  };

  const importPdf = async (event) => {
    event.preventDefault();
    if (!pdfFile || !programForResults) return;
    const data = new FormData();
    data.append('file', pdfFile);
    data.append('programCode', programForResults);
    data.append('year', event.currentTarget.year.value);
    data.append('semester', event.currentTarget.semester.value);
    try {
      const result = await apiRequest('/results/import-pdf', { method: 'POST', body: data });
      setImportPreview(result);
      setStatus(`Extracted ${result.rows?.length || 0} rows. Matched ${result.allocations?.length || 0} students. Review before commit.`);
    } catch (error) {
      setStatus(error.message);
    }
  };

  const commitResults = async () => {
    try {
      await apiRequest('/results/commit', {
        method: 'POST',
        body: JSON.stringify({ allocations: importPreview?.allocations || [] }),
      });
      setStatus('Department results committed to student transcripts.');
      setImportPreview(null);
      setPdfFile(null);
    } catch (error) {
      setStatus(error.message);
    }
  };

  const printTranscript = () => {
    const session = getStoredSession();
    const token = session?.token;
    const matricule = window.prompt('Enter student matricule to print transcript');
    if (!matricule || !token) return;
    window.open(`${API_BASE_URL}/students/${encodeURIComponent(matricule)}/transcript/print?token=${token}`, '_blank');
  };

  return (
    <PortalLayout
      eyebrow="Academic Administration"
      title="Catalog, Results & Transcripts"
      actions={<button onClick={printTranscript} className="bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-widest text-white"><Printer size={15} className="mr-2 inline" /> Print Transcript</button>}
    >
      {status && <div className="mb-6 bg-univGray p-4 text-sm font-bold text-slate-700">{status}</div>}
      <section className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr] xl:gap-6">
        <article className="du-panel p-5 sm:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <BookOpen className="text-univGreen" />
            <h2 className="text-2xl font-black text-slate-950">Course catalog by ministry source</h2>
          </div>
          <div className="grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
            <label className="du-field">
              <span className="du-label">Program catalogue linked to ministry source courses</span>
              <select className="du-input" value={selectedProgram} onChange={(e) => setSelectedProgram(e.target.value)}>
                <option value="" disabled>Select program catalogue to view ministry courses</option>
                {programs.map((program) => <option key={program.code} value={program.code}>{program.code} - {program.name}</option>)}
              </select>
            </label>
            <button onClick={loadCatalog} className="bg-univOrange px-5 py-3 text-xs font-black uppercase tracking-widest text-white"><Search size={15} className="mr-2 inline" /> Load</button>
          </div>
          {catalog && (
            <div className="mt-6 max-h-[520px] overflow-y-auto border border-slate-200">
              {Object.entries(catalog.byYear).map(([year, semesters]) => (
                <div key={year} className="border-b border-slate-200 p-4">
                  <h3 className="font-black uppercase text-slate-950">{year}</h3>
                  {Object.entries(semesters).map(([semester, courses]) => (
                    <div key={semester} className="mt-3">
                      <p className="text-xs font-black uppercase tracking-widest text-univOrange">{semester}</p>
                      {courses.slice(0, 30).map((course) => (
                        <div key={`${course.code}-${course.title}`} className="grid gap-1 border-b border-slate-100 py-2 text-sm sm:grid-cols-[90px_1fr_70px] sm:gap-3">
                          <span className="font-black">{course.code}</span>
                          <span>{course.title}</span>
                          <span>{course.credits} cr</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </article>

        <article className="du-panel p-5 sm:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <FileUp className="text-univGreen" />
            <h2 className="text-2xl font-black text-slate-950">Department PDF result import</h2>
          </div>
          <form onSubmit={importPdf} className="grid gap-3 md:grid-cols-2">
            <label className="du-field md:col-span-2">
              <span className="du-label">Department / program receiving these results</span>
              <select className="du-input" value={programForResults} onChange={(e) => setProgramForResults(e.target.value)} required>
                <option value="" disabled>Select department / program</option>
                {programs.map((program) => <option key={program.code} value={program.code}>{program.code} - {program.name}</option>)}
              </select>
            </label>
            <label className="du-field">
              <span className="du-label">Academic year level, e.g. 1, 2, or 3</span>
              <input className="du-input" name="year" type="number" min="1" max="3" placeholder="Year level" defaultValue="1" />
            </label>
            <label className="du-field">
              <span className="du-label">Semester number, e.g. 1 to 6</span>
              <input className="du-input" name="semester" type="number" min="1" max="6" placeholder="Semester" defaultValue="1" />
            </label>
            <label className="du-field md:col-span-2">
              <span className="du-label">Upload department result PDF</span>
              <input className="du-input" type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} required />
            </label>
            <button className="md:col-span-2 bg-slate-950 px-5 py-4 text-xs font-black uppercase tracking-widest text-white">Extract Result PDF</button>
          </form>

          {importPreview?.allocations?.length > 0 && (
            <div className="mt-6">
              <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-black text-slate-950">Review allocations by student</p>
                <button onClick={commitResults} className="bg-univGreen px-4 py-3 text-xs font-black uppercase tracking-widest text-white"><CheckCircle2 size={15} className="mr-2 inline" /> Commit</button>
              </div>
              <div className="max-h-96 overflow-y-auto border border-slate-200">
                {importPreview.allocations.map((allocation) => (
                  <div key={allocation.student.matricule} className="border-b border-slate-200 p-4">
                    <p className="font-black text-slate-950">{allocation.student.matricule} - {allocation.student.firstName} {allocation.student.lastName}</p>
                    <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">{allocation.results.length} result rows</p>
                    {allocation.results.map((row, index) => (
                      <div key={`${row.courseCode}-${index}`} className="grid gap-1 border-b border-slate-100 py-2 text-sm sm:grid-cols-[90px_1fr_60px_70px] sm:gap-3">
                        <span className="font-black">{row.courseCode}</span>
                        <span>{row.courseTitle}</span>
                        <span>{row.credits} cr</span>
                        <span>{row.finalMark}/20</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          )}

          {importPreview?.unmatched?.length > 0 && (
            <div className="mt-6 bg-orange-50 p-4">
              <p className="font-black text-orange-800">Unmatched rows requiring review: {importPreview.unmatched.length}</p>
              <div className="mt-3 max-h-48 overflow-y-auto text-sm text-orange-900">
                {importPreview.unmatched.slice(0, 20).map((row, index) => (
                  <p key={`${row.courseCode}-${index}`}>{row.matricule || row.studentName || 'Unknown'} - {row.courseCode} - {row.reason}</p>
                ))}
              </div>
            </div>
          )}
        </article>
      </section>
    </PortalLayout>
  );
};

export default AcademicToolsPortal;
