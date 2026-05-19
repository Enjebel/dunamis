import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InstitutionalInfoBlock from '../components/InstitutionalInfoBlock';
import { Globe, Plane, University } from 'lucide-react';

const International = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/content/international')
      .then(res => setData(res.data))
      .catch(err => {
        console.error("Error fetching international data:", err);
        // Fallback state to prevent the application from crashing
        setData({
          title: "International Mobility",
          institutionalInfo: "Explore global opportunities with Dunamis University's extensive international programs and partnerships.",
          destinations: [],
          opportunities: []
        });
      });
  }, []);

  if (!data) return <div className="pt-32 text-center">Loading International Opportunities...</div>;

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-5xl font-black text-slate-900 mb-8 uppercase tracking-tighter">
        {data.title}
      </h1>
      <InstitutionalInfoBlock content={data.institutionalInfo} />

      <section className="mb-16">
        <h2 className="text-3xl font-black text-univGreen mb-8 flex items-center gap-3">
          <Globe size={32} className="text-univOrange" />
          Global Destinations
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {data.destinations.map((dest, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-all">
              <div className="flex items-center gap-4 mb-4">
                <Plane size={28} className="text-blue-900" />
                <h3 className="text-xl font-bold text-slate-800">{dest.country}</h3>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Partner University: <span className="font-semibold text-univGreen">{dest.partner}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-univGray p-12 rounded-[40px] border border-slate-100">
        <h2 className="text-3xl font-black text-blue-900 mb-8 flex items-center gap-3">
          <University size={32} className="text-univOrange" />
          Mobility Opportunities
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.opportunities.map((opportunity, i) => (
            <div key={i} className="flex items-center bg-white p-6 rounded-xl shadow-sm border-l-4 border-univGreen">
              <span className="text-univGreen font-black mr-4 text-xl">✓</span>
              <p className="text-slate-700 font-semibold">{opportunity}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default International;
