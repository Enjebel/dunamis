import React from 'react';
import { Info } from 'lucide-react';

const InstitutionalInfoBlock = ({ content, blockTitle = "Institutional Information" }) => {
  if (!content) return null;
  
  return (
    <div className="bg-slate-50 border-l-4 border-univOrange p-8 mb-12 rounded-r-2xl shadow-sm animate-fade-up">
      <div className="flex items-start gap-4">
        <Info className="text-univOrange shrink-0" size={24} />
        <div>
          <h4 className="font-black text-slate-900 uppercase tracking-widest mb-3 text-xs opacity-60">{blockTitle}</h4>
          <p className="text-lg text-slate-600 leading-relaxed italic">"{content}"</p>
        </div>
      </div>
    </div>
  );
};

export default InstitutionalInfoBlock;