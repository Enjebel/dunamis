import React from 'react';

const RectorMessage = () => {
  return (
    <div className="min-h-screen bg-white pt-20 lg:pt-[145px]">
      <section className="du-section grid gap-12 py-20 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <p className="du-kicker">The University</p>
          <h1 className="text-4xl font-black leading-tight text-slate-950 md:text-6xl">
            A Message from <span className="text-univGreen">the Director</span>
          </h1>
          <p className="text-lg leading-relaxed text-slate-600">
            Welcome to Dunamis, the university of entrepreneurship that turns academic potential into concrete success.
          </p>
          <p className="text-lg leading-relaxed text-slate-600">
            Facing youth unemployment in Cameroon, where many graduates have diplomas but limited practical experience, we chose to break away from traditional teaching methods. Our mission is to train leaders and wealth creators with solid know-how acquired at the heart of the corporate world.
          </p>
          <p className="text-lg leading-relaxed text-slate-600">
            At Dunamis, excellence is forged on the field. By choosing our apprenticeship model, you choose boldness, independence, and direct employability. Together, let us make your years of study the launchpad for your professional career.
          </p>
          <div className="flex items-center gap-4 border-t border-slate-100 pt-8">
            <div className="h-px w-12 bg-univOrange" />
            <span className="font-black uppercase tracking-[0.2em] text-slate-800">Director of Dunamis</span>
          </div>
        </div>
        <div className="relative h-[500px] overflow-hidden bg-slate-200 shadow-2xl">
          <img src="/images/Screenshot 2026-05-16 130959.png" alt="Dunamis leadership" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 to-transparent" />
        </div>
      </section>
    </div>
  );
};

export default RectorMessage;
