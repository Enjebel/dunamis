import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InstitutionalInfoBlock from '../components/InstitutionalInfoBlock';
import { FlaskConical, Book, Lightbulb, Handshake } from 'lucide-react';

const Research = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/content/research')
      .then(res => setData(res.data))
      .catch(err => {
        console.error("Error fetching research data:", err);
        // Fallback state to prevent the application from crashing
        setData({
          title: "Research & Innovation",
          institutionalInfo: "Explore groundbreaking research and innovation at Dunamis University, driving solutions for a better future.",
          laboratories: [],
          publications: [],
          callsForProposals: [],
          rdPartnerships: [],
          strategicObjectives: []
        });
      });
  }, []);

  if (!data) return <div className="pt-32 text-center">Loading Research & Innovation...</div>;

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-5xl font-black text-slate-900 mb-8 uppercase tracking-tighter">
        {data.title}
      </h1>
      <InstitutionalInfoBlock content={data.institutionalInfo} />

      <section className="mb-16">
        <h2 className="text-3xl font-black text-univGreen mb-8 flex items-center gap-3">
          <FlaskConical size={32} className="text-univOrange" />
          Our Laboratories
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {data.laboratories.map((lab, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-md border border-slate-100 hover:shadow-lg transition-all">
              <h3 className="text-xl font-bold text-slate-800 mb-2">{lab.name}</h3>
              <p className="text-slate-600 leading-relaxed">{lab.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 bg-univGray p-12 rounded-[40px] border border-slate-100">
        <h2 className="text-3xl font-black text-blue-900 mb-8 flex items-center gap-3">
          <Book size={32} className="text-univOrange" />
          Recent Publications
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {data.publications.map((pub, i) => (
            <div key={i} className="flex flex-col bg-white p-6 rounded-xl shadow-sm border-l-4 border-univGreen">
              <p className="text-slate-700 font-semibold mb-1">{pub.title}</p>
              <p className="text-sm text-slate-500 italic">By {pub.author} ({pub.year})</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-3xl font-black text-univGreen mb-8 flex items-center gap-3">
          <Lightbulb size={32} className="text-univOrange" />
          Calls for Proposals
        </h2>
        <div className="space-y-4">
          {data.callsForProposals.map((call, i) => (
            <div key={i} className="flex items-center bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-900">
              <span className="text-blue-900 font-black mr-4 text-xl">💡</span>
              <p className="text-slate-700 font-semibold">{call}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-blue-900 text-white p-12 rounded-[40px] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <h2 className="text-3xl font-black mb-8 relative z-10 uppercase tracking-tighter text-univOrange flex items-center gap-3">
          <Handshake size={32} />
          R&D Partnerships
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {data.rdPartnerships.map((partner, i) => (
            <div key={i} className="flex items-center bg-white/10 backdrop-blur-sm p-4 rounded-xl">
              <div className="w-2 h-2 rounded-full bg-univOrange mr-3"></div>
              <p className="font-medium">{partner}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Research;
