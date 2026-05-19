import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InstitutionalInfoBlock from '../components/InstitutionalInfoBlock';

const ValuesCharter = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/content/values_charter')
      .then(res => setData(res.data))
      .catch(err => {
        console.error("Error fetching values & charter data:", err);
        // Fallback state to prevent the application from crashing
        setData({
          title: "Values & Charter",
          institutionalInfo: "Our core values are the foundation of our entrepreneurial ecosystem, guiding our students toward professional excellence and global impact.",
          values: []
        });
      });
  }, []);

  if (!data) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-black text-slate-900 mb-8 uppercase tracking-tight animate-fade-up">
        {data.title}
      </h1>
      <InstitutionalInfoBlock content={data.institutionalInfo} />

      <div className="grid md:grid-cols-2 gap-8">
        {data.values?.map((val, i) => (
          <div 
            key={i} 
            className="p-8 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-all animate-fade-up"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <h3 className="text-xl font-bold text-univGreen mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-univOrange rounded-full" />
              {val.name}
            </h3>
            <p className="text-slate-600 leading-relaxed">{val.description}</p>
          </div>
        ))}
      </div>

      {data.charter && (
        <section className="mt-20 p-10 bg-univGray rounded-[40px] border border-slate-100">
          <h2 className="text-2xl font-black text-blue-900 mb-4 uppercase">Our Charter</h2>
          <p className="text-lg text-slate-700 leading-relaxed">{data.charter}</p>
        </section>
      )}
    </div>
  );
};

export default ValuesCharter;
