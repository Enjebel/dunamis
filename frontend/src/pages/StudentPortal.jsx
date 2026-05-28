import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { AlertTriangle, CalendarDays, CheckCircle2, Clock, Download, FileText, GraduationCap, Save, UserCircle } from 'lucide-react';
import PortalLayout from './PortalLayout';
import { API_BASE_URL, apiAssetUrl, apiRequest, getStoredSession } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const flattenSemesters = (semesters = {}) => {
  return Object.entries(semesters).flatMap(([yearKey, semesterGroup]) =>
    Object.entries(semesterGroup).flatMap(([semesterKey, results]) =>
      results.map((result) => ({ ...result, yearKey, semesterKey }))
    )
  );
};

const StudentPortal = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [dashboard, setDashboard] = useState(null);
  const [profileForm, setProfileForm] = useState({});
  const [passwordForm, setPasswordForm] = useState({ currentPassword: '', newPassword: '' });
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [status, setStatus] = useState('');
  const [now, setNow] = useState(new Date());

  const loadDashboard = () => {
    if (!user?.matricule) {
      setStatus('This account is not linked to a student matricule yet.');
      return Promise.resolve();
    }

    return apiRequest(`/students/${user.matricule}/dashboard`)
      .then((data) => {
        setDashboard(data);
        setProfileForm({
          email: data.student?.email || '',
          phone: data.student?.phone || '',
          sex: data.student?.sex || '',
          dateOfBirth: data.student?.dateOfBirth ? data.student.dateOfBirth.slice(0, 10) : '',
          placeOfBirth: data.student?.placeOfBirth || '',
          nationality: data.student?.nationality || '',
          address: data.student?.address || '',
          emergencyContactName: data.student?.emergencyContactName || '',
          emergencyContactPhone: data.student?.emergencyContactPhone || '',
        });
      })
      .catch((error) => setStatus(error.message));
  };

  useEffect(() => {
    loadDashboard();
  }, [user?.matricule]);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 30000);
    return () => window.clearInterval(timer);
  }, []);

  const updateProfile = async (event) => {
    event.preventDefault();
    setStatus('');
    try {
      const data = new FormData();
      Object.entries(profileForm).forEach(([key, value]) => data.append(key, value ?? ''));
      if (profilePhoto) data.append('profilePhoto', profilePhoto);
      const result = await apiRequest('/students/me/profile', { method: 'PATCH', body: data });
      setStatus(result.message);
      setProfilePhoto(null);
      await loadDashboard();
    } catch (error) {
      setStatus(error.message);
    }
  };

  const updatePassword = async (event) => {
    event.preventDefault();
    setStatus('');
    try {
      const result = await apiRequest('/auth/me/password', { method: 'PATCH', body: JSON.stringify(passwordForm) });
      setStatus(result.message);
      setPasswordForm({ currentPassword: '', newPassword: '' });
    } catch (error) {
      setStatus(error.message);
    }
  };

  const results = flattenSemesters(dashboard?.semesters);
  const failed = dashboard?.failedCourses || [];
  const passedCount = results.filter((course) => course.status === 'Passed').length;
  const resitCount = failed.length;
  const totalDecided = passedCount + resitCount;
  const passedPercent = totalDecided ? Math.round((passedCount / totalDecided) * 100) : 0;
  const resitPercent = totalDecided ? 100 - passedPercent : 0;
  const activeView = location.pathname.includes('/results')
    ? 'results'
    : location.pathname.includes('/resits')
      ? 'resits'
      : location.pathname.includes('/profile')
        ? 'profile'
        : location.pathname.includes('/mock-results')
          ? 'mock'
          : 'dashboard';

  const downloadTranscript = () => {
    const token = getStoredSession()?.token;
    if (!token || !user?.matricule) return;
    window.open(`${API_BASE_URL}/students/${encodeURIComponent(user.matricule)}/transcript/print?token=${token}`, '_blank');
  };

  const groupedResults = Object.entries(dashboard?.semesters || {});
  const timetable = dashboard?.timetable || [];
  const todayTimetable = timetable.filter((entry) => entry.dayOfWeek?.toLowerCase() === now.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase());

  return (
    <PortalLayout
      eyebrow="Student Portal"
      title={activeView === 'dashboard' ? 'My Academic Dashboard' : activeView === 'results' ? 'All Semester Results' : activeView === 'resits' ? 'Resit Courses' : activeView === 'mock' ? 'Mock Result HND' : 'Student Profile'}
      studentBadge={resitCount}
      studentProfile={dashboard?.student}
      actions={<button onClick={downloadTranscript} className="bg-slate-950 px-4 py-3 text-xs font-black uppercase tracking-widest text-white"><Download size={15} className="mr-2 inline" /> Download transcript</button>}
    >
      {status && <div className="mb-6 bg-orange-50 p-4 text-sm font-bold text-orange-700">{status}</div>}

      {activeView === 'dashboard' && (
        <>
      <section className="grid gap-4 md:grid-cols-3 lg:gap-5">
        {[
          ['Current Level', dashboard?.student?.level ? `Year ${dashboard.student.level}` : '-', dashboard?.student?.programCode || 'Program pending'],
          ['GPA', dashboard?.gpa ?? 0, 'Calculated from credits and marks'],
          ['Courses to Resit', dashboard?.resitCount ?? 0, 'Automatically counted from results'],
        ].map(([label, value, detail]) => (
          <article key={label} className="du-panel p-5 sm:p-6">
            <p className="text-xs font-black uppercase tracking-widest text-univOrange">{label}</p>
            <div className="mt-3 text-4xl font-black text-slate-950">{value}</div>
            <p className="mt-2 text-sm text-slate-500">{detail}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-5 xl:mt-8 xl:grid-cols-[1fr_380px] xl:gap-6">
        <article className="du-panel p-5 sm:p-6">
          <h2 className="text-2xl font-black text-slate-950">Academic Cycle Progress</h2>
          <div className="mt-6 grid gap-5 md:grid-cols-[220px_1fr] md:items-center lg:gap-6">
            <div
              className="mx-auto flex h-48 w-48 items-center justify-center rounded-full"
              style={{ background: `conic-gradient(#178f55 0 ${passedPercent}%, #dc2626 ${passedPercent}% 100%)` }}
            >
              <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full bg-white text-center">
                <span className="text-4xl font-black text-slate-950">{passedPercent}%</span>
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">Passed</span>
              </div>
            </div>
            <div className="grid gap-3">
              <div className="border border-slate-200 p-4">
                <p className="text-xs font-black uppercase tracking-widest text-univGreen">Passed</p>
                <p className="mt-1 text-2xl font-black text-slate-950">{passedCount} courses - {passedPercent}%</p>
              </div>
              <div className="border border-slate-200 p-4">
                <p className="text-xs font-black uppercase tracking-widest text-red-600">Resit</p>
                <p className="mt-1 text-2xl font-black text-slate-950">{resitCount} courses - {resitPercent}%</p>
              </div>
            </div>
          </div>
        </article>

        <aside className="grid gap-5 lg:gap-6">
          <div className="du-panel p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <Clock className="text-univGreen" />
              <h2 className="text-2xl font-black text-slate-950">Calendar & Time</h2>
            </div>
            <p className="mt-5 text-4xl font-black text-slate-950">{now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p className="mt-2 font-bold text-slate-600">{now.toLocaleDateString([], { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          <div className="du-panel p-5 sm:p-6">
            <div className="flex items-center gap-3">
              <CalendarDays className="text-univOrange" />
              <h2 className="text-2xl font-black text-slate-950">Today Timetable</h2>
            </div>
            <div className="mt-5 grid gap-3">
              {todayTimetable.map((entry) => (
                <div key={entry._id} className="border border-slate-200 p-4">
                  <p className="font-black text-slate-950">{entry.startTime} - {entry.endTime}</p>
                  <p className="mt-1 font-bold text-slate-700">{entry.courseCode} - {entry.courseTitle}</p>
                  <p className="text-sm text-slate-500">{entry.lecturerName || 'Lecturer pending'} - {entry.room || 'Room pending'}</p>
                </div>
              ))}
              {!todayTimetable.length && <p className="text-sm font-semibold text-slate-500">No timetable entry for today.</p>}
            </div>
          </div>
        </aside>
      </section>

      <article className="du-panel mt-6 p-5 sm:p-6 lg:mt-8">
        <div className="mb-5 flex items-center gap-3">
          <CalendarDays className="text-univGreen" />
          <h2 className="text-2xl font-black text-slate-950">Weekly Timetable</h2>
        </div>
        <div className="grid gap-3 md:hidden">
          {timetable.map((entry) => (
            <div key={entry._id} className="border border-slate-200 p-4">
              <p className="font-black text-slate-950">{entry.dayOfWeek}</p>
              <p className="mt-1 text-sm font-bold text-slate-700">{entry.startTime} - {entry.endTime}</p>
              <p className="mt-3 font-bold text-slate-700">{entry.courseCode} - {entry.courseTitle}</p>
              <p className="mt-1 text-sm text-slate-500">{entry.lecturerName || '-'} - {entry.room || '-'}</p>
            </div>
          ))}
          {!timetable.length && <p className="text-sm text-slate-500">No timetable has been published for your program yet.</p>}
        </div>
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-univGray text-xs uppercase tracking-widest text-slate-500">
              <tr><th className="p-3">Day</th><th className="p-3">Time</th><th className="p-3">Course</th><th className="p-3">Lecturer</th><th className="p-3">Room</th></tr>
            </thead>
            <tbody>
              {timetable.map((entry) => (
                <tr key={entry._id} className="border-b border-slate-100">
                  <td className="p-3 font-black text-slate-950">{entry.dayOfWeek}</td>
                  <td className="p-3">{entry.startTime} - {entry.endTime}</td>
                  <td className="p-3 font-bold text-slate-700">{entry.courseCode} - {entry.courseTitle}</td>
                  <td className="p-3">{entry.lecturerName || '-'}</td>
                  <td className="p-3">{entry.room || '-'}</td>
                </tr>
              ))}
              {!timetable.length && <tr><td className="p-4 text-slate-500" colSpan="5">No timetable has been published for your program yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </article>
        </>
      )}

      {activeView === 'results' && (
        <article className="du-panel p-5 sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <GraduationCap className="text-univGreen" size={28} />
            <h2 className="text-2xl font-black text-slate-950">Results by Year and Semester</h2>
          </div>
          <div className="grid gap-5 lg:gap-6">
            {groupedResults.map(([yearKey, semesterGroup]) => (
              <section key={yearKey} className="border border-slate-200">
                <h3 className="bg-univGray p-4 text-lg font-black uppercase text-slate-950">{yearKey.replace('year', 'Year ')}</h3>
                {Object.entries(semesterGroup).map(([semesterKey, semesterResults]) => (
                  <div key={semesterKey} className="p-4">
                    <p className="mb-3 text-xs font-black uppercase tracking-widest text-univOrange">{semesterKey.replace('semester', 'Semester ')}</p>
          <div className="grid gap-3 md:hidden">
            {semesterResults.map((course) => (
              <div key={`${course.courseCode}-${course.semester}-${course.year}`} className="border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-black text-slate-950">{course.courseCode}</p>
                    <p className="mt-1 text-sm font-bold text-slate-700">{course.courseTitle}</p>
                  </div>
                  <span className={`shrink-0 text-xs font-black uppercase ${course.status === 'Passed' ? 'text-univGreen' : 'text-univOrange'}`}>{course.status}</span>
                </div>
                <p className="mt-3 text-sm text-slate-500">{course.credits} credits - {course.finalMark}/20</p>
              </div>
            ))}
          </div>
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-univGray text-xs uppercase tracking-widest text-slate-500">
                <tr>
                  <th className="p-3">Code</th>
                  <th className="p-3">Course</th>
                  <th className="p-3">Credits</th>
                  <th className="p-3">Mark</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                            {semesterResults.map((course) => (
                  <tr key={`${course.courseCode}-${course.semester}-${course.year}`} className="border-b border-slate-100">
                    <td className="p-3 font-black text-slate-950">{course.courseCode}</td>
                    <td className="p-3 text-slate-700">{course.courseTitle}</td>
                    <td className="p-3">{course.credits}</td>
                    <td className="p-3 font-black">{course.finalMark}/20</td>
                    <td className={`p-3 font-black ${course.status === 'Passed' ? 'text-univGreen' : 'text-univOrange'}`}>{course.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
                  </div>
                ))}
              </section>
            ))}
            {!groupedResults.length && <p className="text-sm text-slate-500">No results have been published yet.</p>}
          </div>
        </article>
      )}

      {activeView === 'profile' && (
        <div className="du-panel p-5 sm:p-6">
          <h2 className="text-2xl font-black text-slate-950">Student Profile</h2>
          <div className="mt-5 flex flex-col gap-4 border border-slate-200 p-4 sm:flex-row sm:items-center">
            {dashboard?.student?.profilePhotoUrl ? (
              <img src={apiAssetUrl(dashboard.student.profilePhotoUrl)} alt="" className="h-20 w-20 object-cover" />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center bg-univGray text-univGreen"><UserCircle size={38} /></div>
            )}
            <div>
              <p className="font-black text-slate-950">{dashboard?.student?.firstName} {dashboard?.student?.lastName}</p>
              <p className="text-sm font-bold text-slate-500">{dashboard?.student?.matricule}</p>
              <p className="text-xs font-black uppercase tracking-widest text-univOrange">Names and matricule are locked</p>
            </div>
          </div>
          <form onSubmit={updateProfile} className="mt-5 grid gap-3">
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-1">
              <label className="du-field"><span className="du-label">Sex</span><select className="du-input" value={profileForm.sex || ''} onChange={(e) => setProfileForm({ ...profileForm, sex: e.target.value })}>
                <option value="">Select sex</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select></label>
              <label className="du-field"><span className="du-label">Date of birth</span><input className="du-input" type="date" value={profileForm.dateOfBirth || ''} onChange={(e) => setProfileForm({ ...profileForm, dateOfBirth: e.target.value })} /></label>
              <label className="du-field"><span className="du-label">Place of birth</span><input className="du-input" placeholder="Town or city of birth" value={profileForm.placeOfBirth || ''} onChange={(e) => setProfileForm({ ...profileForm, placeOfBirth: e.target.value })} /></label>
              <label className="du-field"><span className="du-label">Nationality</span><input className="du-input" placeholder="Nationality" value={profileForm.nationality || ''} onChange={(e) => setProfileForm({ ...profileForm, nationality: e.target.value })} /></label>
              <label className="du-field"><span className="du-label">Phone / WhatsApp</span><input className="du-input" placeholder="Student phone contact" value={profileForm.phone || ''} onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })} /></label>
              <label className="du-field"><span className="du-label">Email</span><input className="du-input" placeholder="Student email address" type="email" value={profileForm.email || ''} onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })} /></label>
              <label className="du-field md:col-span-2 xl:col-span-1"><span className="du-label">Address</span><input className="du-input" placeholder="Current address" value={profileForm.address || ''} onChange={(e) => setProfileForm({ ...profileForm, address: e.target.value })} /></label>
              <label className="du-field"><span className="du-label">Emergency contact name</span><input className="du-input" placeholder="Parent, guardian, or sponsor" value={profileForm.emergencyContactName || ''} onChange={(e) => setProfileForm({ ...profileForm, emergencyContactName: e.target.value })} /></label>
              <label className="du-field"><span className="du-label">Emergency contact phone</span><input className="du-input" placeholder="Emergency phone number" value={profileForm.emergencyContactPhone || ''} onChange={(e) => setProfileForm({ ...profileForm, emergencyContactPhone: e.target.value })} /></label>
              <label className="du-field md:col-span-2 xl:col-span-1"><span className="du-label">Profile picture</span><input className="du-input" type="file" accept="image/*" onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)} /></label>
            </div>
            <button className="bg-univGreen px-5 py-4 text-xs font-black uppercase tracking-widest text-white"><Save size={15} className="mr-2 inline" /> Save Profile</button>
          </form>
        </div>
      )}

      {activeView === 'profile' && (
        <div className="du-panel mt-5 p-5 sm:p-6">
          <h2 className="text-2xl font-black text-slate-950">Change Password</h2>
          <form onSubmit={updatePassword} className="mt-5 grid gap-3">
            <label className="du-field"><span className="du-label">Current password</span><input className="du-input" type="password" placeholder="Enter current password" value={passwordForm.currentPassword} onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })} required /></label>
            <label className="du-field"><span className="du-label">New password</span><input className="du-input" type="password" placeholder="At least 8 characters" value={passwordForm.newPassword} onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })} required /></label>
            <button className="bg-slate-950 px-5 py-4 text-xs font-black uppercase tracking-widest text-white">Update Password</button>
          </form>
        </div>
      )}

      {activeView === 'resits' && (
        <div className="du-panel p-5 sm:p-6">
          <h2 className="text-2xl font-black text-slate-950">Resit Alert</h2>
          <div className="mt-5 space-y-4">
            {failed.map((course) => (
              <div key={`${course.courseCode}-${course.semester}`} className="flex gap-3 bg-orange-50 p-4">
                <AlertTriangle className="shrink-0 text-univOrange" size={20} />
                <div>
                  <p className="font-black text-slate-950">{course.courseCode}</p>
                  <p className="text-sm text-slate-600">{course.courseTitle}</p>
                </div>
              </div>
            ))}
            {!failed.length && (
              <div className="flex gap-3 bg-green-50 p-4">
                <CheckCircle2 className="shrink-0 text-univGreen" size={20} />
                <p className="font-bold text-slate-700">No failed courses currently recorded.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeView === 'mock' && (
        <article className="du-panel p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <FileText className="text-univGreen" />
            <h2 className="text-2xl font-black text-slate-950">Mock Result for HND Students</h2>
          </div>
          <p className="mt-4 leading-relaxed text-slate-600">Mock HND results will appear here when academic administration publishes practice or mock examination records for this student.</p>
          <div className="mt-6 bg-univGray p-5 text-sm font-bold text-slate-600">No mock HND result has been published yet.</div>
        </article>
      )}
    </PortalLayout>
  );
};

export default StudentPortal;
