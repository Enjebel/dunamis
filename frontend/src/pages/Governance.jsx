import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InstitutionalInfoBlock from '../components/InstitutionalInfoBlock';
import { ShieldCheck } from 'lucide-react';

const Governance = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/content/governance').then(res => setData(res.data));
  }, []);

  if (!data) return <div className="pt-32 text-center text-slate-500 font-bold">Loading Governance...</div>;

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-5xl font-black text-blue-900 mb-8 uppercase tracking-tighter">{data.title}</h1>
      <InstitutionalInfoBlock content={data.institutionalInfo} />

      <div className="grid md:grid-cols-1 gap-6 mb-16">
        {data.structure.map((item, i) => (
          <div key={i} className="flex flex-col md:flex-row md:items-center gap-6 p-8 bg-white border rounded-[30px] shadow-sm hover:border-univGreen transition-colors">
            <div className="w-12 h-12 bg-univGray rounded-full flex items-center justify-center shrink-0">
              <ShieldCheck className="text-univGreen" />
            </div>
            <div>
              <h3 className="text-xl font-black text-blue-900 uppercase tracking-tight">{item.role}</h3>
              <p className="text-slate-600 mt-2 text-lg">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <section className="bg-blue-900 text-white p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <h2 className="text-3xl font-black mb-8 relative z-10 uppercase tracking-tighter text-univOrange">Governance Objectives</h2>
        <div className="grid gap-4 relative z-10">
          {data.strategicObjectives.map((obj, i) => (
            <div key={i} className="flex gap-4 items-center bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-univOrange"></div>
              <p className="font-medium">{obj}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Governance;
