import React, { useEffect, useState } from 'react';
import { CalendarDays, PlusCircle } from 'lucide-react';
import PortalLayout from './PortalLayout';
import { apiRequest } from '../lib/api';

const initialForm = {
  programCode: '',
  level: 1,
  semester: 1,
  dayOfWeek: 'Monday',
  startTime: '',
  endTime: '',
  courseCode: '',
  courseTitle: '',
  lecturerName: '',
  room: '',
  academicYear: '2026/2027',
};

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const TimetableAdminPortal = () => {
  const [programs, setPrograms] = useState([]);
  const [entries, setEntries] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState('');

  const load = async () => {
    const [programData, entryData] = await Promise.all([
      apiRequest('/programs'),
      apiRequest('/timetable'),
    ]);
    setPrograms(programData);
    setEntries(entryData);
  };

  useEffect(() => {
    load().catch((error) => setStatus(error.message));
  }, []);

  const submit = async (event) => {
    event.preventDefault();
    setStatus('');
    try {
      await apiRequest('/timetable', {
        method: 'POST',
        body: JSON.stringify({
          ...form,
          level: Number(form.level),
          semester: Number(form.semester),
        }),
      });
      setForm(initialForm);
      await load();
      setStatus('Timetable entry saved.');
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <PortalLayout eyebrow="Academic Administration" title="Department Timetables">
      {status && <div className="mb-6 bg-univGray p-4 text-sm font-bold text-slate-700">{status}</div>}

      <section className="grid gap-5 xl:grid-cols-[420px_1fr] xl:gap-6">
        <form onSubmit={submit} className="du-panel grid h-fit gap-4 p-5 sm:p-6">
          <h2 className="flex items-center gap-3 text-2xl font-black text-slate-950"><PlusCircle className="text-univGreen" /> Add Timetable Entry</h2>
          <label className="du-field"><span className="du-label">Department / program</span><select className="du-input" value={form.programCode} onChange={(e) => setForm({ ...form, programCode: e.target.value })} required>
            <option value="" disabled>Select department / program</option>
            <option value="ALL">All departments</option>
            {programs.map((program) => <option key={program.code} value={program.code}>{program.code} - {program.name}</option>)}
          </select></label>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="du-field"><span className="du-label">Level</span><input className="du-input" type="number" min="1" max="3" value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} /></label>
            <label className="du-field"><span className="du-label">Semester</span><input className="du-input" type="number" min="1" max="6" value={form.semester} onChange={(e) => setForm({ ...form, semester: e.target.value })} /></label>
          </div>
          <label className="du-field"><span className="du-label">Academic year</span><input className="du-input" placeholder="2026/2027" value={form.academicYear} onChange={(e) => setForm({ ...form, academicYear: e.target.value })} required /></label>
          <label className="du-field"><span className="du-label">Day</span><select className="du-input" value={form.dayOfWeek} onChange={(e) => setForm({ ...form, dayOfWeek: e.target.value })}>
            {days.map((day) => <option key={day}>{day}</option>)}
          </select></label>
          <div className="grid gap-3 md:grid-cols-2">
            <label className="du-field"><span className="du-label">Start time</span><input className="du-input" type="time" value={form.startTime} onChange={(e) => setForm({ ...form, startTime: e.target.value })} required /></label>
            <label className="du-field"><span className="du-label">End time</span><input className="du-input" type="time" value={form.endTime} onChange={(e) => setForm({ ...form, endTime: e.target.value })} required /></label>
          </div>
          <label className="du-field"><span className="du-label">Course code</span><input className="du-input" placeholder="Course code" value={form.courseCode} onChange={(e) => setForm({ ...form, courseCode: e.target.value })} required /></label>
          <label className="du-field"><span className="du-label">Course title</span><input className="du-input" placeholder="Course title" value={form.courseTitle} onChange={(e) => setForm({ ...form, courseTitle: e.target.value })} required /></label>
          <label className="du-field"><span className="du-label">Lecturer</span><input className="du-input" placeholder="Lecturer name" value={form.lecturerName} onChange={(e) => setForm({ ...form, lecturerName: e.target.value })} /></label>
          <label className="du-field"><span className="du-label">Room / campus location</span><input className="du-input" placeholder="Room or hall" value={form.room} onChange={(e) => setForm({ ...form, room: e.target.value })} /></label>
          <button className="bg-slate-950 px-5 py-4 text-xs font-black uppercase tracking-widest text-white">Save Timetable</button>
        </form>

        <article className="du-panel min-w-0 p-5 sm:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center">
            <CalendarDays className="text-univOrange" />
            <h2 className="text-2xl font-black text-slate-950">All Department Timetable Entries</h2>
          </div>
          <div className="grid gap-3 lg:hidden">
            {entries.map((entry) => (
              <div key={entry._id} className="border border-slate-200 p-4">
                <p className="font-black text-slate-950">{entry.programCode} - Year {entry.level}</p>
                <p className="mt-1 text-sm font-bold text-slate-700">{entry.dayOfWeek}, {entry.startTime} - {entry.endTime}</p>
                <p className="mt-3 font-bold text-slate-700">{entry.courseCode} - {entry.courseTitle}</p>
                <p className="mt-1 text-sm text-slate-500">{entry.lecturerName || '-'} - {entry.room || '-'}</p>
              </div>
            ))}
            {!entries.length && <p className="text-sm text-slate-500">No timetable entries yet.</p>}
          </div>
          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[860px] text-left text-sm">
              <thead className="bg-univGray text-xs uppercase tracking-widest text-slate-500">
                <tr><th className="p-3">Program</th><th className="p-3">Level</th><th className="p-3">Day</th><th className="p-3">Time</th><th className="p-3">Course</th><th className="p-3">Lecturer</th><th className="p-3">Room</th></tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry._id} className="border-b border-slate-100">
                    <td className="p-3 font-black text-slate-950">{entry.programCode}</td>
                    <td className="p-3">Year {entry.level}</td>
                    <td className="p-3">{entry.dayOfWeek}</td>
                    <td className="p-3">{entry.startTime} - {entry.endTime}</td>
                    <td className="p-3">{entry.courseCode} - {entry.courseTitle}</td>
                    <td className="p-3">{entry.lecturerName || '-'}</td>
                    <td className="p-3">{entry.room || '-'}</td>
                  </tr>
                ))}
                {!entries.length && <tr><td colSpan="7" className="p-4 text-slate-500">No timetable entries yet.</td></tr>}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </PortalLayout>
  );
};

export default TimetableAdminPortal;
