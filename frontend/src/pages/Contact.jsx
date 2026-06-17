import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InstitutionalInfoBlock from '../components/InstitutionalInfoBlock';
import { Mail, Phone, MapPin } from 'lucide-react';
import { contactInfo } from '../data/siteContent';

const Contact = () => {
  const [data, setData] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const visitorName = formData.get('name') || '';
    const visitorEmail = formData.get('email') || '';
    const message = formData.get('message') || '';
    const subject = encodeURIComponent(`Dunamis website inquiry from ${visitorName || 'visitor'}`);
    const body = encodeURIComponent([
      `Name: ${visitorName}`,
      `Email: ${visitorEmail}`,
      '',
      message,
    ].join('\n'));

    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
  };

  useEffect(() => {
    axios.get('/api/content/contact').then(res => setData(res.data)).catch(() => setData({
      title: "Contact Us",
      institutionalInfo: "Get in touch with us for more information.",
      details: {
        phone: contactInfo.phone,
        email: contactInfo.email,
        address: 'University Campus, Dunamis Road'
      }
    }));
  }, []);

  if (!data) return <div className="pt-32 text-center text-slate-500 font-bold">Loading Contact...</div>;

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-5xl font-black text-slate-900 mb-8 uppercase tracking-tighter">{data.title}</h1>
      <InstitutionalInfoBlock content={data.institutionalInfo} />

      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div className="flex items-center gap-6 p-8 bg-white border border-slate-100 rounded-[30px] shadow-sm">
            <div className="w-12 h-12 bg-univGray rounded-full flex items-center justify-center shrink-0">
              <MapPin className="text-univGreen" />
            </div>
            <div>
              <h3 className="text-lg font-black text-blue-900 uppercase tracking-tight">Visit Us</h3>
              <p className="text-slate-600 font-medium">{data.details?.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-6 p-8 bg-white border border-slate-100 rounded-[30px] shadow-sm">
            <div className="w-12 h-12 bg-univGray rounded-full flex items-center justify-center shrink-0">
              <Phone className="text-univGreen" />
            </div>
            <div>
              <h3 className="text-lg font-black text-blue-900 uppercase tracking-tight">Call Us</h3>
              <p className="text-slate-600 font-medium">{data.details?.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-6 p-8 bg-white border border-slate-100 rounded-[30px] shadow-sm">
            <div className="w-12 h-12 bg-univGray rounded-full flex items-center justify-center shrink-0">
              <Mail className="text-univGreen" />
            </div>
            <div>
              <h3 className="text-lg font-black text-blue-900 uppercase tracking-tight">Email Us</h3>
              <a href={`mailto:${contactInfo.email}`} className="text-slate-600 font-medium hover:text-univGreen">{contactInfo.email}</a>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 shadow-xl border border-slate-100 md:p-12">
          <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter text-slate-950">Send a Message</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <label className="du-field"><span className="du-label">Visitor name</span><input name="name" type="text" placeholder="Enter your full name" className="du-input w-full py-4" required /></label>
            <label className="du-field"><span className="du-label">Visitor email address</span><input name="email" type="email" placeholder="Enter your email address" className="du-input w-full py-4" required /></label>
            <label className="du-field"><span className="du-label">Message or inquiry details</span><textarea name="message" placeholder="Tell us how we can help" rows="4" className="du-input w-full py-4" required></textarea></label>
            <button type="submit" className="w-full bg-univGreen text-white font-black uppercase tracking-widest py-4 hover:bg-univOrange transition-colors">Send Inquiry</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
