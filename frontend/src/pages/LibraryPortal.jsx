import React, { useEffect, useState } from 'react';
import { BookOpen, Download, Upload } from 'lucide-react';
import PortalLayout from './PortalLayout';
import { apiRequest } from '../lib/api';
import { useAuth } from '../context/AuthContext';

const initialBook = {
  title: '',
  author: '',
  category: 'General',
  programCode: '',
  fileUrl: '',
  accessMode: 'Online',
  availableCopies: 0,
};

const LibraryPortal = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState(initialBook);
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState('');

  const canUpload = ['super_admin', 'academic_admin', 'librarian'].includes(user?.role);

  const loadBooks = async () => {
    const data = await apiRequest('/library');
    setBooks(data);
  };

  useEffect(() => {
    loadBooks().catch((error) => setStatus(error.message));
  }, []);

  const submitBook = async (event) => {
    event.preventDefault();
    setStatus('');
    try {
      if (file) {
        const data = new FormData();
        Object.entries({ ...form, availableCopies: Number(form.availableCopies) }).forEach(([key, value]) => data.append(key, value ?? ''));
        data.append('file', file);
        await apiRequest('/library', { method: 'POST', body: data });
      } else {
        await apiRequest('/library', { method: 'POST', body: JSON.stringify({ ...form, availableCopies: Number(form.availableCopies) }) });
      }
      setForm(initialBook);
      setFile(null);
      await loadBooks();
      setStatus('Library resource saved.');
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <PortalLayout
      eyebrow="Online Library"
      title="Digital Books & Borrowing"
      actions={canUpload ? <button form="library-form" className="bg-univOrange px-4 py-3 text-xs font-black uppercase tracking-widest text-white"><Upload size={15} className="mr-2 inline" /> Save Resource</button> : null}
    >
      {status && <div className="mb-6 bg-univGray p-4 text-sm font-bold text-slate-700">{status}</div>}
      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <article className="du-panel p-6">
          <div className="mb-6 grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-2xl font-black text-slate-950">Library Resources</h2>
              <p className="mt-2 text-slate-600">Books can be online-only, borrowable, or both. PDFs can be linked by URL or uploaded later with file storage.</p>
            </div>
            <label className="du-field">
              <span className="du-label">Search library by title, author, category, or PDF</span>
              <input className="du-input" placeholder="Search books, PDFs, authors..." />
            </label>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            {books.map((book) => (
              <article key={book._id} className="border border-slate-200 p-5">
                <div className="mb-5 flex h-14 w-14 items-center justify-center bg-univGray text-univGreen">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-lg font-black text-slate-950">{book.title}</h3>
                <p className="mt-2 text-sm font-semibold text-slate-500">{book.category}</p>
                <p className="mt-4 text-xs font-black uppercase tracking-widest text-univOrange">{book.accessMode}</p>
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm font-bold text-slate-600">{book.availableCopies} copies</span>
                  {book.fileUrl && <a href={book.fileUrl} className="text-univGreen"><Download size={18} /></a>}
                </div>
              </article>
            ))}
            {!books.length && <p className="text-sm text-slate-500">No library resources yet.</p>}
          </div>
        </article>

        {canUpload && (
          <form id="library-form" onSubmit={submitBook} className="du-panel grid h-fit gap-4 p-6">
            <h2 className="text-2xl font-black text-slate-950">Add Resource</h2>
            <label className="du-field"><span className="du-label">Book or document title</span><input className="du-input" placeholder="Title as it should appear in the library" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></label>
            <label className="du-field"><span className="du-label">Author, publisher, or lecturer</span><input className="du-input" placeholder="Author or source name" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} /></label>
            <label className="du-field"><span className="du-label">Library category or subject</span><input className="du-input" placeholder="General, Accounting, Nursing, Engineering..." value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} /></label>
            <label className="du-field"><span className="du-label">Program code allowed to access this resource</span><input className="du-input" placeholder="Optional, example: BTS-CG or HND-SWE" value={form.programCode} onChange={(e) => setForm({ ...form, programCode: e.target.value })} /></label>
            <label className="du-field"><span className="du-label">Online file link when no upload is selected</span><input className="du-input" placeholder="Paste PDF, document, or reading URL" value={form.fileUrl} onChange={(e) => setForm({ ...form, fileUrl: e.target.value })} required={!file} /></label>
            <label className="du-field"><span className="du-label">Upload PDF, DOC, or DOCX file</span><input className="du-input" type="file" accept=".pdf,.doc,.docx" onChange={(e) => setFile(e.target.files?.[0] || null)} /></label>
            <label className="du-field"><span className="du-label">How students may use this resource</span><select className="du-input" value={form.accessMode} onChange={(e) => setForm({ ...form, accessMode: e.target.value })}>
              <option>Online</option>
              <option>Borrowable</option>
              <option>Online and Borrowable</option>
            </select></label>
            <label className="du-field"><span className="du-label">Number of physical copies available for borrowing</span><input className="du-input" placeholder="Available copies" type="number" value={form.availableCopies} onChange={(e) => setForm({ ...form, availableCopies: e.target.value })} /></label>
            <button className="bg-slate-950 px-5 py-4 text-sm font-black uppercase tracking-widest text-white">Save Resource</button>
          </form>
        )}
      </section>
    </PortalLayout>
  );
};

export default LibraryPortal;
