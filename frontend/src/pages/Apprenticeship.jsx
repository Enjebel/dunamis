import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InstitutionalInfoBlock from '../components/InstitutionalInfoBlock';
import { Briefcase, Calendar, Users } from 'lucide-react';

const Apprenticeship = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/content/apprenticeship').then(res => setData(res.data));
  }, []);

  if (!data) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-5xl font-black text-slate-900 mb-8 uppercase tracking-tighter italic">
        The <span className="text-univOrange underline">3/3</span> Rhythm
      </h1>
      <InstitutionalInfoBlock content={data.institutionalInfo} />

      <section className="grid md:grid-cols-2 gap-12 mb-20">
        <div className="bg-univGreen text-white p-10 rounded-[40px] shadow-xl">
          <Calendar className="mb-6 text-univOrange" size={40} />
          <h2 className="text-3xl font-black mb-4 uppercase">How it works</h2>
          <p className="text-lg opacity-90 leading-relaxed italic">{data.rhythm}</p>
        </div>
        <div className="bg-slate-50 p-10 rounded-[40px] border border-slate-200">
          <Users className="mb-6 text-univGreen" size={40} />
          <h2 className="text-3xl font-black mb-4 uppercase text-slate-900">Partner Companies</h2>
          <div className="flex flex-wrap gap-4 mt-6">
            {data.partners.map(p => (
              <span key={p} className="bg-white px-4 py-2 rounded-lg shadow-sm font-bold text-univGreen border border-slate-100">{p}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white p-12 rounded-[40px] border-4 border-slate-900">
        <h2 className="text-3xl font-black mb-8 uppercase text-center">Apprenticeship Steps</h2>
        <div className="grid md:grid-cols-4 gap-8">
          {data.steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-12 h-12 bg-univOrange rounded-full flex items-center justify-center text-white font-black mx-auto mb-4">{i + 1}</div>
              <p className="font-bold text-slate-800">{step}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Apprenticeship;
