import React, { useState } from 'react';
import { ShieldCheck, FileText, DollarSign, Calendar, HelpCircle } from 'lucide-react';
import axios from 'axios';

const Admission = () => {
  const [status, setStatus] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    program: '',
    message: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      // Update URL if your backend is on a different port/host
      const response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:5001/api'}/apply`, formData);
      setStatus(response.data.message);
      setFormData({ name: '', email: '', phone: '', program: '', message: '' });
    } catch (error) {
      setStatus('Submission failed. Please check your connection.');
    }
  };

  return (
    <div className="pt-16 bg-slate-50 min-h-screen">
      <header className="bg-univGreen py-20 text-white text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase tracking-tighter">Admission <span className="text-univOrange">Process</span></h1>
          <p className="text-xl max-w-2xl mx-auto opacity-90">Start your entrepreneurial journey at Dunamis today.</p>
        </div>
      </header>

      <section className="container mx-auto px-4 py-16 animate-fade-up">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="bg-white p-8 md:p-12 rounded-[40px] shadow-2xl">
            <h2 className="text-3xl font-black text-slate-800 mb-8 uppercase tracking-tight">Apply <span className="text-univGreen">Online</span></h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <label className="du-field"><span className="du-label">Applicant full name</span><input type="text" placeholder="Enter your full name" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-univGreen outline-none transition-all" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></label>
              <div className="grid md:grid-cols-2 gap-6">
                <label className="du-field"><span className="du-label">Applicant email address</span><input type="email" placeholder="Enter your email address" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-univGreen outline-none transition-all" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} /></label>
                <label className="du-field"><span className="du-label">Phone or WhatsApp number</span><input type="tel" placeholder="Enter your phone number" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-univGreen outline-none transition-all" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} /></label>
              </div>
              <label className="du-field"><span className="du-label">Desired faculty or program area</span><select className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-univGreen outline-none transition-all text-slate-500" required value={formData.program} onChange={e => setFormData({...formData, program: e.target.value})}>
                <option value="" disabled>Select desired program</option>
                <option value="engineering">Engineering & Technology</option>
                <option value="commerce">Commerce & Management</option>
                <option value="health">Health Sciences</option>
              </select></label>
              <label className="du-field"><span className="du-label">Motivation, background, or questions</span><textarea rows="4" placeholder="Tell us your motivation, current level, and any questions" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-univGreen outline-none transition-all" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}></textarea></label>
              <button type="submit" className="w-full py-5 bg-univOrange text-white font-black rounded-2xl hover:bg-univGreen transition-all uppercase tracking-widest shadow-lg">Submit Application</button>
              {status && <p className="text-center font-bold text-univGreen mt-4">{status}</p>}
            </form>
          </div>

          <div className="space-y-8">
            {[
              { icon: FileText, title: "Requirements", text: "Transcripts, ID copy, and a motivation letter are required for all cycles." },
              { icon: DollarSign, title: "Tuition Fees", text: "Transparent pricing with flexible payment. 100% covered for apprentices." },
              { icon: Calendar, title: "Calendar", text: "Intakes in September and February. Early applications are encouraged." },
              { icon: HelpCircle, title: "Financial Aid", text: "Merit-based scholarships available for students in health and tech." }
            ].map((item, i) => (
              <div key={i} className="flex gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-univGray rounded-2xl flex items-center justify-center text-univGreen shrink-0">
                  <item.icon size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Admission;
