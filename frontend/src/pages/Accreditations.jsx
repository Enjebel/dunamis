import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InstitutionalInfoBlock from '../components/InstitutionalInfoBlock';

const Accreditations = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get('/api/content/accreditations').then(res => setData(res.data));
  }, []);

  if (!data) return <div className="pt-32 text-center">Loading...</div>;

  return (
    <div className="pt-32 pb-20 px-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-extrabold text-blue-900 mb-8">{data.title}</h1>
      <InstitutionalInfoBlock content={data.institutionalInfo} />
      <p className="text-xl text-slate-600 leading-relaxed mb-10">{data.description}</p>

      <div className="grid sm:grid-cols-2 gap-4 mb-16">
        {data.affiliations.map((item, i) => (
          <div key={i} className="flex items-center p-5 bg-gray-50 border-l-4 border-yellow-500 rounded shadow-sm">
            <span className="text-blue-900 font-bold mr-3 text-xl">✓</span>
            <p className="text-gray-800 font-medium">{item}</p>
          </div>
        ))}
      </div>

      <section className="mb-12">
        <h2 className="text-3xl font-bold text-blue-900 mb-6">Benefits of Accreditation</h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-700">
          {data.benefits.map((benefit, i) => <li key={i}>{benefit}</li>)}
        </ul>
      </section>

      <section className="border-t pt-12">
        <div className="bg-blue-50 p-10 rounded-2xl">
          <h2 className="text-3xl font-bold text-blue-900 mb-6">Strategic Objectives</h2>
          <div className="space-y-6">
            {data.strategicObjectives.map((obj, i) => (
              <div key={i} className="flex items-start bg-white p-4 border rounded shadow-sm">
                <span className="text-blue-900 font-bold mr-4">0{i + 1}.</span>
                <p className="text-gray-700 italic">{obj}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <p className="mt-12 text-center text-gray-500 text-sm italic">
        Dunamis University is committed to academic integrity and transparency.
      </p>
    </div>
  );
};

export default Accreditations;
