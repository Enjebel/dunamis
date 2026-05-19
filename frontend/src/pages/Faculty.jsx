import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InstitutionalInfoBlock from '../components/InstitutionalInfoBlock';

const Faculty = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/content/faculty')
      .then(res => setData(res.data))
      .catch(err => {
        console.error("Error fetching faculty data:", err);
        setData({
          title: "Our Faculty",
          institutionalInfo: "Our academic body consists of industry experts and world-class researchers dedicated to entrepreneurial excellence.",
          members: []
        });
      });
  }, []);

  if (!data) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-black text-slate-900 mb-8 uppercase tracking-tight">{data.title}</h1>
      <InstitutionalInfoBlock content={data.institutionalInfo} />
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.members?.map((member, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100 group hover:border-univGreen transition-all">
            <img 
              src={member.image || 'https://via.placeholder.com/400x300?text=Faculty+Member'} 
              alt={member.name} 
              className="w-full h-56 object-cover grayscale group-hover:grayscale-0 transition-all"
            />
            <div className="p-6">
              <div className="text-univOrange font-black text-[10px] uppercase tracking-[0.2em] mb-2">
                {member.role}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {member.name}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {member.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faculty;
