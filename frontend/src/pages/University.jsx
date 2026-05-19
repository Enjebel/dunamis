import React from 'react';
import { Link } from 'react-router-dom';
import { Landmark, Target, Award, Users, MapPin, Shield, ChevronRight } from 'lucide-react';

const University = () => {
  return (
    <div className="pt-16 bg-white min-h-screen">
      <header className="bg-univGreen py-24 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tight">Dunamis: <span className="text-univOrange">The University</span></h1>
          <p className="text-xl max-w-2xl mx-auto font-medium opacity-90 leading-relaxed">
            Shaping the next generation of global entrepreneurial leaders.
          </p>
        </div>
      </header>

      <section className="py-20 bg-slate-50 animate-fade-up">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-16 items-center">
          <div className="aspect-video bg-slate-200 rounded-[60px] overflow-hidden shadow-2xl border-8 border-white">
             <img src="/images/university-campus.jpg" alt="Campus" className="w-full h-full object-cover" onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1523050853061-80e8a4ff147e?q=80&w=1200'} />
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-8 uppercase tracking-tight">A Word From <span className="text-univGreen">The Rector</span></h2>
            <p className="text-slate-600 leading-relaxed text-lg mb-6 italic">
              "At Dunamis, we don't just teach business or technology; we cultivate the entrepreneurial spirit required to navigate the 4th Industrial Revolution."
            </p>
            <Link to="/university/rector" className="inline-flex items-center gap-2 font-black text-univOrange uppercase tracking-widest text-sm hover:translate-x-2 transition-transform">
              Read Full Message <ChevronRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 container mx-auto px-4 grid md:grid-cols-3 gap-12 animate-fade-up">
        {[
          { icon: Target, title: "Our Mission", text: "Empowering students through professional training and entrepreneurial mindset." },
          { icon: Shield, title: "Our Values", text: "Integrity, Discipline, Innovation, and Service to the Community." },
          { icon: Award, title: "Excellence", text: "Accredited programs designed by industry experts for the job market." }
        ].map((item, i) => (
          <div key={i} className="text-center group p-8 rounded-3xl bg-univGray hover:bg-white hover:shadow-xl transition-all">
            <div className="w-20 h-20 bg-white rounded-[30px] flex items-center justify-center text-univGreen mx-auto mb-8 shadow-sm group-hover:bg-univGreen group-hover:text-white transition-all">
              <item.icon size={36} />
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-4 uppercase tracking-tight">{item.title}</h3>
            <p className="text-slate-500 leading-relaxed">{item.text}</p>
          </div>
        ))}
      </section>

      {/* Upcoming Events Gallery Section */}
      <section className="py-24 bg-white animate-fade-up">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-black text-slate-800 mb-4 uppercase tracking-tight">University <span className="text-univOrange">Events</span></h2>
            <p className="text-slate-500 max-w-xl mx-auto">Stay connected with our campus activities, workshops, and student celebrations.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Campus Open Day", date: "Sept 15, 2024", img: "/images/event-1.jpg" },
              { title: "Innovation Workshop", date: "Oct 05, 2024", img: "/images/event-2.jpg" },
              { title: "Cultural Festival", date: "Nov 20, 2024", img: "/images/event-3.jpg" }
            ].map((event, i) => (
              <div key={i} className="group relative rounded-[40px] overflow-hidden shadow-lg h-80">
                <img 
                  src={event.img} 
                  alt={event.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=800'}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-80"></div>
                <div className="absolute bottom-0 left-0 p-8">
                  <span className="text-univOrange font-bold text-xs uppercase tracking-widest">{event.date}</span>
                  <h3 className="text-xl font-black text-white mt-2">{event.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default University;
