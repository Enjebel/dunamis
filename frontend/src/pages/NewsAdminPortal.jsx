import React, { useEffect, useState } from 'react';
import { Edit3, PlusCircle, Send } from 'lucide-react';
import PortalLayout from './PortalLayout';
import { apiRequest } from '../lib/api';

const initialPost = { title: '', category: 'News', excerpt: '', body: '', published: true };

const NewsAdminPortal = () => {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState(initialPost);
  const [media, setMedia] = useState(null);
  const [status, setStatus] = useState('');

  const loadPosts = async () => {
    const data = await apiRequest('/news-posts?all=true');
    setPosts(data);
  };

  useEffect(() => {
    loadPosts().catch((error) => setStatus(error.message));
  }, []);

  const submitPost = async (event) => {
    event.preventDefault();
    setStatus('');
    try {
      const data = new FormData();
      Object.entries(form).forEach(([key, value]) => data.append(key, value));
      if (media) data.append('media', media);
      await apiRequest('/news-posts', { method: 'POST', body: data });
      setForm(initialPost);
      setMedia(null);
      await loadPosts();
      setStatus('Post saved successfully.');
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <PortalLayout
      eyebrow="Content Administration"
      title="News, Daily Activities & Blog"
      actions={<button form="post-form" className="bg-univOrange px-4 py-3 text-xs font-black uppercase tracking-widest text-white"><PlusCircle size={15} className="mr-2 inline" /> New Post</button>}
    >
      {status && <div className="mb-6 bg-univGray p-4 text-sm font-bold text-slate-700">{status}</div>}
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <article className="du-panel p-6">
          <h2 className="text-2xl font-black text-slate-950">Publishing Queue</h2>
          <div className="mt-6 space-y-4">
            {posts.map((post) => (
              <div key={post._id} className="flex items-center justify-between gap-4 border border-slate-200 p-4">
                <div className="min-w-0">
                  <p className="font-black text-slate-950">{post.title}</p>
                  <p className="text-sm text-slate-500">{post.category}{post.mediaType && post.mediaType !== 'none' ? ` - ${post.mediaType}` : ''}</p>
                </div>
                <span className="bg-univGray px-3 py-2 text-xs font-black uppercase tracking-widest text-slate-600">{post.published ? 'Published' : 'Draft'}</span>
              </div>
            ))}
            {!posts.length && <p className="text-sm text-slate-500">No posts yet.</p>}
          </div>
        </article>

        <form id="post-form" onSubmit={submitPost} className="du-panel grid gap-4 p-6">
          <h2 className="flex items-center gap-3 text-2xl font-black text-slate-950"><Edit3 className="text-univGreen" /> Create Content</h2>
          <label className="du-field"><span className="du-label">Headline shown on the website</span><input className="du-input py-4" placeholder="Post title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required /></label>
          <label className="du-field"><span className="du-label">Content category for filtering</span><select className="du-input py-4" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
            <option>News</option>
            <option>Daily Activity</option>
            <option>Event</option>
            <option>Blog</option>
          </select></label>
          <label className="du-field"><span className="du-label">Short summary shown in cards and previews</span><input className="du-input py-4" placeholder="Short excerpt" value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} /></label>
          <label className="du-field"><span className="du-label">Image or video for the public website</span><input className="du-input py-4" type="file" accept="image/*,video/*" onChange={(e) => setMedia(e.target.files?.[0] || null)} /></label>
          <label className="du-field"><span className="du-label">Full post content</span><textarea className="du-input min-h-48 py-4" placeholder="Write the article, activity report, event details, or blog content..." value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} required /></label>
          <label className="flex items-center gap-3 text-sm font-bold text-slate-700">
            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
            Publish immediately
          </label>
          <button className="bg-slate-950 px-5 py-4 text-sm font-black uppercase tracking-widest text-white"><Send size={15} className="mr-2 inline" /> Save Post</button>
        </form>
      </section>
    </PortalLayout>
  );
};

export default NewsAdminPortal;
