import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InstitutionalInfoBlock from '../components/InstitutionalInfoBlock';
import { Mail, Phone, MapPin } from 'lucide-react';

const Contact = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/content/contact').then(res => setData(res.data)).catch(() => setData({
      title: "Contact Us",
      institutionalInfo: "Get in touch with us for more information.",
      details: {}
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
              <p className="text-slate-600 font-medium">{data.details?.email}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 p-12 rounded-[40px] shadow-2xl text-white">
          <h2 className="text-3xl font-black mb-8 uppercase tracking-tighter text-univOrange">Send a Message</h2>
          <form className="space-y-6">
            <label className="du-field"><span className="du-label text-slate-300">Visitor name</span><input type="text" placeholder="Enter your full name" className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder:text-slate-500" /></label>
            <label className="du-field"><span className="du-label text-slate-300">Visitor email address</span><input type="email" placeholder="Enter your email address" className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder:text-slate-500" /></label>
            <label className="du-field"><span className="du-label text-slate-300">Message or inquiry details</span><textarea placeholder="Tell us how we can help" rows="4" className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder:text-slate-500"></textarea></label>
            <button className="w-full bg-univGreen text-white font-black uppercase tracking-widest py-4 rounded-xl hover:bg-univOrange transition-colors">Send Inquiry</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
