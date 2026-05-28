import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clock, PlusCircle } from 'lucide-react';
import PortalLayout from './PortalLayout';
import { apiRequest } from '../lib/api';

const initialAllocation = {
  lecturerName: '',
  lecturerPhone: '',
  courseCode: '',
  courseTitle: '',
  programCode: '',
  level: 1,
  semester: 1,
  academicYear: '2026/2027',
  allocatedHours: 0,
  hourlyRate: 0,
};

const initialSession = {
  allocationId: '',
  date: '',
  startTime: '',
  endTime: '',
  hours: 0,
  topic: '',
};

const LectureValidationPortal = () => {
  const [allocations, setAllocations] = useState([]);
  const [sessions, setSessions] = useState(null);
  const [allocationForm, setAllocationForm] = useState(initialAllocation);
  const [sessionForm, setSessionForm] = useState(initialSession);
  const [status, setStatus] = useState('');

  const load = async () => {
    const [allocationData, sessionData] = await Promise.all([
      apiRequest('/lecture-allocations'),
      apiRequest('/lecture-hours'),
    ]);
    setAllocations(allocationData);
    setSessions(sessionData);
  };

  useEffect(() => {
    load().catch((error) => setStatus(error.message));
  }, []);

  const createAllocation = async (event) => {
    event.preventDefault();
    try {
      await apiRequest('/lecture-allocations', {
        method: 'POST',
        body: JSON.stringify({
          ...allocationForm,
          level: Number(allocationForm.level),
          semester: Number(allocationForm.semester),
          allocatedHours: Number(allocationForm.allocatedHours),
          hourlyRate: Number(allocationForm.hourlyRate),
        }),
      });
      setAllocationForm(initialAllocation);
      await load();
    } catch (error) {
      setStatus(error.message);
    }
  };

  const createSession = async (event) => {
    event.preventDefault();
    try {
      await apiRequest('/lecture-hours', {
        method: 'POST',
        body: JSON.stringify({ ...sessionForm, hours: Number(sessionForm.hours) }),
      });
      setSessionForm(initialSession);
      await load();
    } catch (error) {
      setStatus(error.message);
    }
  };

  const validate = async (id) => {
    try {
      await apiRequest(`/lecture-hours/${id}/validate`, { method: 'PATCH' });
      await load();
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <PortalLayout eyebrow="Academic Administration" title="Lecture Hour Allocation & Validation">
      {status && <div className="mb-6 bg-red-50 p-4 text-sm font-bold text-red-700">{status}</div>}

      <section className="grid gap-5 xl:grid-cols-2 xl:gap-6">
        <form onSubmit={createAllocation} className="du-panel grid gap-4 p-5 sm:p-6">
          <h2 className="flex flex-col gap-3 text-2xl font-black text-slate-950 sm:flex-row sm:items-center"><PlusCircle className="text-univGreen" /> Allocate lecturer hours</h2>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="du-field"><span className="du-label">Lecturer full name</span><input className="du-input" placeholder="Lecturer name" value={allocationForm.lecturerName} onChange={(e) => setAllocationForm({ ...allocationForm, lecturerName: e.target.value })} required /></label>
            <label className="du-field"><span className="du-label">Lecturer phone number</span><input className="du-input" placeholder="Lecturer phone" value={allocationForm.lecturerPhone} onChange={(e) => setAllocationForm({ ...allocationForm, lecturerPhone: e.target.value })} /></label>
            <label className="du-field"><span className="du-label">Course code assigned to lecturer</span><input className="du-input" placeholder="Course code" value={allocationForm.courseCode} onChange={(e) => setAllocationForm({ ...allocationForm, courseCode: e.target.value })} required /></label>
            <label className="du-field"><span className="du-label">Course title assigned to lecturer</span><input className="du-input" placeholder="Course title" value={allocationForm.courseTitle} onChange={(e) => setAllocationForm({ ...allocationForm, courseTitle: e.target.value })} required /></label>
            <label className="du-field"><span className="du-label">Program / department code</span><input className="du-input" placeholder="Program code" value={allocationForm.programCode} onChange={(e) => setAllocationForm({ ...allocationForm, programCode: e.target.value })} required /></label>
            <label className="du-field"><span className="du-label">Academic year for the allocation</span><input className="du-input" placeholder="Academic year" value={allocationForm.academicYear} onChange={(e) => setAllocationForm({ ...allocationForm, academicYear: e.target.value })} required /></label>
            <label className="du-field"><span className="du-label">Class level, 1 to 3</span><input className="du-input" type="number" min="1" max="3" placeholder="Level" value={allocationForm.level} onChange={(e) => setAllocationForm({ ...allocationForm, level: e.target.value })} /></label>
            <label className="du-field"><span className="du-label">Semester, 1 to 6</span><input className="du-input" type="number" min="1" max="6" placeholder="Semester" value={allocationForm.semester} onChange={(e) => setAllocationForm({ ...allocationForm, semester: e.target.value })} /></label>
            <label className="du-field"><span className="du-label">Total hours allocated for this course</span><input className="du-input" type="number" placeholder="Allocated hours" value={allocationForm.allocatedHours} onChange={(e) => setAllocationForm({ ...allocationForm, allocatedHours: e.target.value })} required /></label>
            <label className="du-field"><span className="du-label">Optional payment rate per hour</span><input className="du-input" type="number" placeholder="Hourly rate" value={allocationForm.hourlyRate} onChange={(e) => setAllocationForm({ ...allocationForm, hourlyRate: e.target.value })} /></label>
          </div>
          <button className="bg-slate-950 px-5 py-4 text-xs font-black uppercase tracking-widest text-white">Save Allocation</button>
        </form>

        <form onSubmit={createSession} className="du-panel grid h-fit gap-4 p-5 sm:p-6">
          <h2 className="flex flex-col gap-3 text-2xl font-black text-slate-950 sm:flex-row sm:items-center"><Clock className="text-univGreen" /> Log lecture session</h2>
          <label className="du-field">
            <span className="du-label">Lecturer/course allocation being taught</span>
            <select className="du-input" value={sessionForm.allocationId} onChange={(e) => setSessionForm({ ...sessionForm, allocationId: e.target.value })} required>
            <option value="" disabled>Select allocation</option>
            {allocations.map((allocation) => (
              <option key={allocation._id} value={allocation._id}>
                {allocation.lecturerName} - {allocation.courseCode} ({allocation.remainingHours}h remaining)
              </option>
            ))}
          </select>
          </label>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="du-field"><span className="du-label">Date of lecture</span><input className="du-input" type="date" value={sessionForm.date} onChange={(e) => setSessionForm({ ...sessionForm, date: e.target.value })} required /></label>
            <label className="du-field"><span className="du-label">Hours taught during this session</span><input className="du-input" type="number" placeholder="Hours taught" value={sessionForm.hours} onChange={(e) => setSessionForm({ ...sessionForm, hours: e.target.value })} required /></label>
            <label className="du-field"><span className="du-label">Start time / arrival</span><input className="du-input" type="time" value={sessionForm.startTime} onChange={(e) => setSessionForm({ ...sessionForm, startTime: e.target.value })} required /></label>
            <label className="du-field"><span className="du-label">End time / departure</span><input className="du-input" type="time" value={sessionForm.endTime} onChange={(e) => setSessionForm({ ...sessionForm, endTime: e.target.value })} required /></label>
          </div>
          <label className="du-field"><span className="du-label">Lesson topic or observation</span><input className="du-input" placeholder="Topic covered" value={sessionForm.topic} onChange={(e) => setSessionForm({ ...sessionForm, topic: e.target.value })} /></label>
          <button className="bg-univOrange px-5 py-4 text-xs font-black uppercase tracking-widest text-white">Save Session</button>
        </form>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3 lg:mt-8 lg:gap-5">
        {[
          ['Total Hours', sessions?.totalHours || 0],
          ['Validated Hours', sessions?.validatedHours || 0],
          ['Pending Hours', sessions?.pendingHours || 0],
        ].map(([label, value]) => (
          <article key={label} className="du-panel p-5 sm:p-6">
            <p className="text-xs font-black uppercase tracking-widest text-univOrange">{label}</p>
            <div className="mt-3 text-4xl font-black text-slate-950">{value}</div>
          </article>
        ))}
      </section>

      <article className="du-panel mt-6 p-5 sm:p-6 lg:mt-8">
        <h2 className="mb-5 text-2xl font-black text-slate-950">Allocated Hours by Lecturer</h2>
        <div className="grid gap-3 lg:hidden">
          {allocations.map((allocation) => (
            <div key={allocation._id} className="border border-slate-200 p-4">
              <p className="font-black text-slate-950">{allocation.lecturerName}</p>
              <p className="mt-1 text-sm font-bold text-slate-700">{allocation.courseCode} - {allocation.courseTitle}</p>
              <p className="mt-1 text-sm text-slate-500">{allocation.programCode}</p>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <span>Allocated: <strong>{allocation.allocatedHours}</strong></span>
                <span>Done: <strong>{allocation.hoursDone}</strong></span>
                <span className="text-univGreen">Validated: <strong>{allocation.validatedHours}</strong></span>
                <span className="text-univOrange">Remaining: <strong>{allocation.remainingHours}</strong></span>
              </div>
            </div>
          ))}
          {!allocations.length && <p className="text-sm text-slate-500">No lecture allocations yet.</p>}
        </div>
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-univGray text-xs uppercase tracking-widest text-slate-500">
              <tr><th className="p-3">Lecturer</th><th className="p-3">Course</th><th className="p-3">Program</th><th className="p-3">Allocated</th><th className="p-3">Done</th><th className="p-3">Validated</th><th className="p-3">Remaining</th></tr>
            </thead>
            <tbody>
              {allocations.map((allocation) => (
                <tr key={allocation._id} className="border-b border-slate-100">
                  <td className="p-3 font-bold">{allocation.lecturerName}</td>
                  <td className="p-3">{allocation.courseCode} - {allocation.courseTitle}</td>
                  <td className="p-3">{allocation.programCode}</td>
                  <td className="p-3 font-black">{allocation.allocatedHours}</td>
                  <td className="p-3">{allocation.hoursDone}</td>
                  <td className="p-3 text-univGreen font-black">{allocation.validatedHours}</td>
                  <td className="p-3 text-univOrange font-black">{allocation.remainingHours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>

      <article className="du-panel mt-6 p-5 sm:p-6 lg:mt-8">
        <h2 className="mb-5 text-2xl font-black text-slate-950">Session Validation</h2>
        <div className="grid gap-3 lg:hidden">
          {(sessions?.sessions || []).map((session) => (
            <div key={session._id} className="border border-slate-200 p-4">
              <p className="font-black text-slate-950">{session.lecturerName}</p>
              <p className="mt-1 text-sm font-bold text-slate-700">{session.courseCode} - {session.courseTitle}</p>
              <p className="mt-2 text-sm">Hours: <strong>{session.hours}</strong></p>
              <p className={`mt-1 text-xs font-black uppercase tracking-widest ${session.validated ? 'text-univGreen' : 'text-univOrange'}`}>{session.validated ? 'Validated' : 'Pending'}</p>
              {!session.validated && <button onClick={() => validate(session._id)} className="mt-3 bg-univGreen px-3 py-2 text-xs font-black uppercase text-white"><CheckCircle2 size={14} className="mr-1 inline" /> Validate</button>}
            </div>
          ))}
          {!(sessions?.sessions || []).length && <p className="text-sm text-slate-500">No lecture sessions yet.</p>}
        </div>
        <div className="hidden overflow-x-auto lg:block">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-univGray text-xs uppercase tracking-widest text-slate-500">
              <tr><th className="p-3">Lecturer</th><th className="p-3">Course</th><th className="p-3">Hours</th><th className="p-3">Status</th><th className="p-3">Action</th></tr>
            </thead>
            <tbody>
              {(sessions?.sessions || []).map((session) => (
                <tr key={session._id} className="border-b border-slate-100">
                  <td className="p-3 font-bold">{session.lecturerName}</td>
                  <td className="p-3">{session.courseCode} - {session.courseTitle}</td>
                  <td className="p-3 font-black">{session.hours}</td>
                  <td className={`p-3 font-black ${session.validated ? 'text-univGreen' : 'text-univOrange'}`}>{session.validated ? 'Validated' : 'Pending'}</td>
                  <td className="p-3">
                    {!session.validated && <button onClick={() => validate(session._id)} className="bg-univGreen px-3 py-2 text-xs font-black uppercase text-white"><CheckCircle2 size={14} className="mr-1 inline" /> Validate</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </PortalLayout>
  );
};

export default LectureValidationPortal;
