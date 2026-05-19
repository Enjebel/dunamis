import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InstitutionalInfoBlock from '../components/InstitutionalInfoBlock';

const CampusInfrastructure = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/content/campus_infrastructure')
      .then(res => setData(res.data))
      .catch(err => {
        console.error("Error fetching campus infrastructure data:", err);
        // Provide fallback state to prevent infinite loading
        setData({
          title: "Campus & Infrastructure",
          facilities: [],
          strategicObjectives: [],
          institutionalInfo: "Infrastructure details are currently unavailable."
        });
      });
  }, []);

  if (!data) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-black text-slate-900 mb-8 uppercase tracking-tight">{data.title}</h1>
      <InstitutionalInfoBlock content={data.institutionalInfo} />

      <div className="grid md:grid-cols-2 gap-6 mb-16">
        {data.facilities?.map((fac, i) => (
          <div key={i} className="group p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <h3 className="text-xl font-bold text-univGreen mb-2 group-hover:text-univOrange transition-colors">
              {fac.name}
            </h3>
            <p className="text-gray-600">{fac.description}</p>
          </div>
        ))}
      </div>

      <section className="border-t pt-10">
        <h2 className="text-3xl font-black text-slate-900 mb-6 flex items-center uppercase tracking-tight">
          <span className="w-8 h-1 bg-univOrange mr-3"></span>
          Strategic Objectives
        </h2>
        <div className="space-y-4">
          {data.strategicObjectives?.map((obj, i) => (
            <div key={i} className="flex items-start bg-white p-4 border rounded shadow-sm">
              <span className="text-univOrange font-black mr-4">0{i+1}.</span>
              <p className="text-gray-700 italic">{obj}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CampusInfrastructure;
