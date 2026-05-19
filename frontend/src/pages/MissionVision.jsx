import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InstitutionalInfoBlock from '../components/InstitutionalInfoBlock';
import { Target, Compass } from 'lucide-react';

const MissionVision = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/content/mission_vision').then(res => setData(res.data));
  }, []);

  if (!data) return <div className="pt-32 text-center text-slate-500 font-bold">Loading Mission & Vision...</div>;

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-5xl font-black text-blue-900 mb-8 uppercase tracking-tighter">{data.title}</h1>
      <InstitutionalInfoBlock content={data.institutionalInfo} />

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Mission Card */}
        <div className="p-10 bg-white border border-slate-200 rounded-[40px] shadow-sm hover:shadow-xl transition-all group">
          <div className="w-16 h-16 bg-univOrange rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
            <Target className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-black text-univGreen uppercase mb-4 tracking-tight">Our Mission</h2>
          <p className="text-lg text-slate-600 leading-relaxed italic">
            "{data.mission}"
          </p>
        </div>

        {/* Vision Card */}
        <div className="p-10 bg-univGreen text-white rounded-[40px] shadow-xl hover:translate-y-[-5px] transition-all group">
          <div className="w-16 h-16 bg-univOrange rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Compass className="text-white" size={32} />
          </div>
          <h2 className="text-3xl font-black uppercase mb-4 tracking-tight text-white">Our Vision</h2>
          <p className="text-lg opacity-90 leading-relaxed font-medium">
            {data.vision}
          </p>
        </div>
      </div>

      <section className="bg-univGray p-12 rounded-[40px] border border-slate-100">
        <h2 className="text-3xl font-black text-blue-900 mb-8 flex items-center">
          <span className="w-12 h-2 bg-univOrange mr-4"></span>
          Strategic Roadmap
        </h2>
        <div className="space-y-6">
          {data.strategicObjectives.map((obj, i) => (
            <div key={i} className="flex items-start bg-white p-6 rounded-2xl shadow-sm border-l-4 border-univGreen">
              <span className="text-univGreen font-black mr-6 text-xl">0{i + 1}.</span>
              <p className="text-slate-700 font-semibold">{obj}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default MissionVision;
