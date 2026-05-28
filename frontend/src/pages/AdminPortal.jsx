import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, FileText, KeyRound, Printer, Upload, UserPlus } from 'lucide-react';
import PortalLayout from './PortalLayout';
import { apiRequest } from '../lib/api';

const initialStudent = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  programCode: '',
  level: 1,
  academicYear: '2026/2027',
};

const AdminPortal = () => {
  const [overview, setOverview] = useState(null);
  const [programs, setPrograms] = useState([]);
  const [students, setStudents] = useState([]);
  const [lectureHours, setLectureHours] = useState(null);
  const [studentForm, setStudentForm] = useState(initialStudent);
  const [createdLogin, setCreatedLogin] = useState(null);
  const [resetRequests, setResetRequests] = useState([]);
  const [status, setStatus] = useState('');

  const loadDashboard = async () => {
    const [overviewResult, programResult, hoursResult, resetResult, studentResult] = await Promise.allSettled([
      apiRequest('/system/overview'),
      apiRequest('/programs'),
      apiRequest('/lecture-hours'),
      apiRequest('/auth/password-reset-requests'),
      apiRequest('/students'),
    ]);
    if (overviewResult.status === 'fulfilled') setOverview(overviewResult.value);
    if (programResult.status === 'fulfilled') setPrograms(programResult.value);
    if (hoursResult.status === 'fulfilled') setLectureHours(hoursResult.value);
    if (resetResult.status === 'fulfilled') setResetRequests(resetResult.value);
    if (studentResult.status === 'fulfilled') setStudents(studentResult.value);

    const firstError = [overviewResult, programResult, hoursResult, resetResult, studentResult].find((result) => result.status === 'rejected');
    if (firstError) setStatus(firstError.reason.message);
  };

  useEffect(() => {
    loadDashboard().catch((error) => setStatus(error.message));
  }, []);

  const createStudent = async (event) => {
    event.preventDefault();
    setStatus('');
    setCreatedLogin(null);
    try {
      const payload = { ...studentForm, level: Number(studentForm.level) };
      const result = await apiRequest('/students', { method: 'POST', body: JSON.stringify(payload) });
      setCreatedLogin(result.login);
      setStudentForm(initialStudent);
      await loadDashboard();
    } catch (error) {
      setStatus(error.message);
    }
  };

  const resolveReset = async (id) => {
    try {
      const result = await apiRequest(`/auth/password-reset-requests/${id}/resolve`, { method: 'PATCH' });
      setStatus(`Temporary password for ${result.matricule}: ${result.temporaryPassword}`);
      await loadDashboard();
    } catch (error) {
      setStatus(error.message);
    }
  };

  const regenerateStudentPassword = async (matricule) => {
    try {
      const result = await apiRequest(`/students/${encodeURIComponent(matricule)}/reset-password`, { method: 'PATCH' });
      setStatus(`New password for ${result.login.matricule}: ${result.login.temporaryPassword}`);
      await loadDashboard();
    } catch (error) {
      setStatus(error.message);
    }
  };

  const stats = [
    ['Programs', overview?.programs ?? 0, 'MongoDB academic programs'],
    ['Students', overview?.students ?? 0, 'Registered student records'],
    ['Lecture Hours', lectureHours?.totalHours ?? 0, `${lectureHours?.validatedHours ?? 0} validated`],
    ['Library Files', overview?.books ?? 0, 'Books, PDFs, syllabi, handouts'],
  ];
  const programNames = programs.reduce((acc, program) => ({ ...acc, [program.code]: program.name }), {});

  return (
    <PortalLayout
      eyebrow="Administration"
      title="Admin Dashboard"
      actions={
        <>
          <Link to="/admin/news" className="bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-widest text-white">Post News</Link>
          <Link to="/library" className="bg-univOrange px-4 py-3 text-xs font-black uppercase tracking-widest text-white">Upload Library File</Link>
        </>
      }
    >
      {status && <div className="mb-6 bg-red-50 p-4 text-sm font-bold text-red-700">{status}</div>}

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-5">
        {stats.map(([label, value, detail]) => (
          <article key={label} className="du-panel p-5 sm:p-6">
            <p className="text-xs font-black uppercase tracking-widest text-univOrange">{label}</p>
            <div className="mt-3 text-4xl font-black text-slate-950">{value}</div>
            <p className="mt-2 text-sm text-slate-500">{detail}</p>
          </article>
        ))}
      </section>

      <article className="du-panel mt-8 min-w-0 p-4 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <KeyRound className="text-univGreen" />
          <h2 className="text-2xl font-black text-slate-950">Registered Students & Portal Logins</h2>
        </div>
        <p className="mb-5 text-sm font-semibold text-slate-600">
          This table keeps the last generated student password after page refresh so administration can issue login details.
        </p>
        <div className="grid gap-3 lg:hidden">
          {students.map((student) => {
            const changedAfterIssue = student.portalPasswordChangedAt && student.portalPasswordIssuedAt && new Date(student.portalPasswordChangedAt) > new Date(student.portalPasswordIssuedAt);
            return (
              <div key={student._id} className="border border-slate-200 p-4">
                <div className="flex flex-col gap-1">
                  <p className="font-black text-slate-950">{student.matricule}</p>
                  <p className="font-bold text-slate-700">{student.firstName} {student.lastName}</p>
                  <p className="text-sm text-slate-500">{programNames[student.programCode] || student.programCode} - Year {student.level} - {student.academicYear}</p>
                </div>
                <div className="mt-4 grid gap-1 bg-univGray p-3">
                  <p className="text-[11px] font-black uppercase tracking-widest text-slate-500">Issued Password</p>
                  <p className="break-all font-black text-univGreen">{student.portalLoginPassword || 'Not recorded'}</p>
                  <p className={`text-xs font-black uppercase tracking-widest ${changedAfterIssue ? 'text-univOrange' : 'text-slate-600'}`}>{changedAfterIssue ? 'Changed by student' : 'Last issued by admin'}</p>
                </div>
                <button onClick={() => regenerateStudentPassword(student.matricule)} className="mt-3 w-full bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-widest text-white">Regenerate Password</button>
              </div>
            );
          })}
          {!students.length && <p className="text-sm text-slate-500">No registered students yet.</p>}
        </div>
        <div className="hidden max-w-full overflow-x-auto lg:block">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead className="bg-univGray text-xs uppercase tracking-widest text-slate-500">
              <tr>
                <th className="p-3">Matricule</th>
                <th className="p-3">Student</th>
                <th className="p-3">Program</th>
                <th className="p-3">Level</th>
                <th className="p-3">Academic Year</th>
                <th className="p-3">Issued Password</th>
                <th className="p-3">Password Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => {
                const changedAfterIssue = student.portalPasswordChangedAt && student.portalPasswordIssuedAt && new Date(student.portalPasswordChangedAt) > new Date(student.portalPasswordIssuedAt);
                return (
                  <tr key={student._id} className="border-b border-slate-100">
                    <td className="p-3 font-black text-slate-950">{student.matricule}</td>
                    <td className="p-3 font-bold text-slate-700">{student.firstName} {student.lastName}</td>
                    <td className="p-3 text-slate-600">{programNames[student.programCode] || student.programCode}</td>
                    <td className="p-3">Year {student.level}</td>
                    <td className="p-3">{student.academicYear}</td>
                    <td className="p-3 font-black text-univGreen">{student.portalLoginPassword || 'Not recorded'}</td>
                    <td className={`p-3 font-black ${changedAfterIssue ? 'text-univOrange' : 'text-slate-700'}`}>
                      {changedAfterIssue ? 'Changed by student' : 'Last issued by admin'}
                    </td>
                    <td className="p-3">
                      <button onClick={() => regenerateStudentPassword(student.matricule)} className="bg-slate-950 px-3 py-2 text-[11px] font-black uppercase tracking-widest text-white">Regenerate</button>
                    </td>
                  </tr>
                );
              })}
              {!students.length && (
                <tr><td className="p-4 text-slate-500" colSpan="8">No registered students yet.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </article>

      <section className="mt-6 grid gap-5 xl:mt-8 xl:grid-cols-[1fr_0.95fr] xl:gap-6">
        <form onSubmit={createStudent} className="du-panel grid gap-4 p-5 sm:p-6">
          <div className="mb-2 flex items-center gap-3">
            <UserPlus className="text-univGreen" />
            <h2 className="text-2xl font-black text-slate-950">Register Student & Generate Login</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="du-field"><span className="du-label">Academic year of registration</span><input className="du-input" placeholder="Academic year" value={studentForm.academicYear} onChange={(e) => setStudentForm({ ...studentForm, academicYear: e.target.value })} required /></label>
            <label className="du-field"><span className="du-label">Student first name</span><input className="du-input" placeholder="First name" value={studentForm.firstName} onChange={(e) => setStudentForm({ ...studentForm, firstName: e.target.value })} required /></label>
            <label className="du-field"><span className="du-label">Student last name</span><input className="du-input" placeholder="Last name" value={studentForm.lastName} onChange={(e) => setStudentForm({ ...studentForm, lastName: e.target.value })} required /></label>
            <label className="du-field"><span className="du-label">Student email for portal account</span><input className="du-input" placeholder="Email" type="email" value={studentForm.email} onChange={(e) => setStudentForm({ ...studentForm, email: e.target.value })} /></label>
            <label className="du-field"><span className="du-label">Student phone contact</span><input className="du-input" placeholder="Phone" value={studentForm.phone} onChange={(e) => setStudentForm({ ...studentForm, phone: e.target.value })} /></label>
            <label className="du-field"><span className="du-label">Program / department where student is registered</span><select className="du-input" value={studentForm.programCode} onChange={(e) => setStudentForm({ ...studentForm, programCode: e.target.value })} required>
              <option value="" disabled>Select program</option>
              {programs.map((program) => <option key={program.code} value={program.code}>{program.code} - {program.name}</option>)}
            </select></label>
            <label className="du-field"><span className="du-label">Current academic level</span><select className="du-input" value={studentForm.level} onChange={(e) => setStudentForm({ ...studentForm, level: e.target.value })}>
              <option value="1">Year 1</option>
              <option value="2">Year 2</option>
              <option value="3">Year 3</option>
            </select></label>
          </div>
          <p className="bg-univGray p-4 text-sm font-bold text-slate-700">The system automatically generates a unique matricule in the format DHISP- ME1161020232 and a temporary password after registration.</p>
          <button className="bg-slate-950 px-5 py-4 text-sm font-black uppercase tracking-widest text-white">Create Student Account</button>
          {createdLogin && (
            <div className="bg-green-50 p-5 text-sm">
              <p className="font-black text-green-800">Student login generated</p>
              <p className="mt-2"><strong>Student matricule:</strong> {createdLogin.matricule}</p>
              <p><strong>Temporary password:</strong> {createdLogin.temporaryPassword}</p>
              <p className="mt-2 font-semibold text-green-900">Students should choose the Student tab on the login page. Admin/staff users continue with email login.</p>
            </div>
          )}
        </form>

        <article className="du-panel p-5 sm:p-6">
          <p className="du-kicker">Transcript Center</p>
          <h2 className="mt-2 text-2xl font-black text-slate-950">Print-ready transcripts</h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Transcript data is calculated from registered student results, course credits, semester/year grouping, failed courses, resits, and GPA.
          </p>
          <div className="mt-6 grid gap-3">
            {[
              [FileText, 'Course catalog by ministry source'],
              [Printer, 'Year 1 to Year 3 transcript print mode'],
              [Upload, 'Bulk result import and validation'],
              [Clock, 'Lecture hour validation'],
            ].map(([Icon, text]) => (
              <div key={text} className="flex items-center gap-3 bg-univGray p-4 font-bold text-slate-700">
                <Icon className="text-univOrange" size={18} />
                {text}
              </div>
            ))}
          </div>
          <Link to="/admin/academic-tools" className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-univGreen">
            Open transcript tools <ArrowRight size={18} />
          </Link>
        </article>
      </section>

      <article className="du-panel mt-6 p-5 sm:p-6 lg:mt-8">
        <h2 className="text-2xl font-black text-slate-950">Student Password Reset Requests</h2>
        <div className="mt-5 space-y-3">
          {resetRequests.map((request) => (
            <div key={request._id} className="flex flex-col justify-between gap-3 border border-slate-200 p-4 md:flex-row md:items-center">
              <div>
                <p className="font-black text-slate-950">{request.matricule} - {request.studentName}</p>
                <p className="text-sm font-semibold text-slate-500">{request.status} request</p>
              </div>
              {request.status === 'Pending' && (
                <button onClick={() => resolveReset(request._id)} className="bg-univOrange px-4 py-3 text-xs font-black uppercase tracking-widest text-white">Reset Password</button>
              )}
            </div>
          ))}
          {!resetRequests.length && <p className="text-sm text-slate-500">No password reset requests yet.</p>}
        </div>
      </article>
    </PortalLayout>
  );
};

export default AdminPortal;
