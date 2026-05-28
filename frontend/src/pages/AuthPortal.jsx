import React, { useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { LockKeyhole } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { requestPasswordReset } from '../lib/api';

const landingForRole = (role) => {
  if (role === 'student') return '/student';
  if (role === 'librarian') return '/library';
  return '/admin';
};

const AuthPortal = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();
  const initialAccessType = params.accessType === 'student' || location.state?.roles?.includes('student') ? 'student' : 'staff';
  const [accessType, setAccessType] = useState(initialAccessType);
  const [form, setForm] = useState({ identifier: '', password: '' });
  const [resetMatricule, setResetMatricule] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus('');
    try {
      const session = await login(form.identifier, form.password, accessType);
      navigate(location.state?.from || landingForRole(session.user.role), { replace: true });
    } catch (error) {
      setStatus(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResetRequest = async () => {
    setStatus('');
    try {
      const result = await requestPasswordReset(resetMatricule || form.identifier);
      setStatus(result.message);
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <section className="du-section grid min-h-screen gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <Link to="/" className="mb-10 flex items-center gap-3">
            <img src="/logo.png" alt="Dunamis" className="h-16 w-16 object-contain" />
            <div>
              <p className="text-2xl font-black uppercase text-slate-950">Dunamis</p>
              <p className="text-xs font-black uppercase tracking-[0.2em] text-univGreen">University System</p>
            </div>
          </Link>
          <p className="du-kicker">Secure Access</p>
          <h1 className="mt-4 text-5xl font-black leading-tight text-slate-950">Login to the university portals</h1>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Admin, lecturer, librarian, and student accounts are role-based. Student accounts are generated automatically when admins register students.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="du-panel grid gap-5 p-8">
          <div className="mb-2 flex h-14 w-14 items-center justify-center bg-univGray text-univGreen">
            <LockKeyhole size={28} />
          </div>
          <h2 className="text-3xl font-black text-slate-950">Sign in</h2>
          <div className="grid grid-cols-2 border border-slate-200 p-1">
            <button type="button" onClick={() => setAccessType('staff')} className={`px-4 py-3 text-xs font-black uppercase tracking-widest ${accessType === 'staff' ? 'bg-slate-950 text-white' : 'text-slate-600'}`}>Staff/Admin</button>
            <button type="button" onClick={() => setAccessType('student')} className={`px-4 py-3 text-xs font-black uppercase tracking-widest ${accessType === 'student' ? 'bg-slate-950 text-white' : 'text-slate-600'}`}>Student</button>
          </div>
          <label className="du-field">
            <span className="du-label">{accessType === 'student' ? 'Student matricule' : 'Staff or admin email'}</span>
            <input
              className="du-input py-4"
              placeholder={accessType === 'student' ? 'Enter the matricule issued by administration' : 'Enter admin, lecturer, or librarian email'}
              type={accessType === 'student' ? 'text' : 'email'}
              value={form.identifier}
              onChange={(e) => setForm({ ...form, identifier: e.target.value })}
              required
            />
          </label>
          <label className="du-field"><span className="du-label">Portal account password</span><input className="du-input py-4" placeholder="Enter the password issued by administration" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required /></label>
          {accessType === 'student' && (
            <div className="grid gap-3 bg-univGray p-4">
              <label className="du-field">
                <span className="du-label">Forgotten student matricule for reset request</span>
                <input className="du-input bg-white" placeholder="Enter matricule to request password reset" value={resetMatricule} onChange={(e) => setResetMatricule(e.target.value)} />
              </label>
              <button type="button" onClick={handleResetRequest} className="text-left text-xs font-black uppercase tracking-widest text-univGreen">Request password reset</button>
            </div>
          )}
          <button className="bg-slate-950 px-5 py-4 text-sm font-black uppercase tracking-widest text-white disabled:opacity-60" disabled={loading}>
            {loading ? 'Signing in...' : 'Login'}
          </button>
          {status && <p className="bg-red-50 p-4 text-sm font-bold text-red-700">{status}</p>}
        </form>
      </section>
    </div>
  );
};

export default AuthPortal;
