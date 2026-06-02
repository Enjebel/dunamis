import React, { useState, useEffect } from 'react';
import { Camera, Film, Users, Trophy } from 'lucide-react';
import { facebookVideos, localImages } from '../data/siteContent';

const StudentLife = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const galleryImages = [localImages[25], localImages[22], localImages[24], localImages[0], localImages[10], localImages[11], localImages[4], localImages[6]];

  return (
    <div className="pt-16 bg-white min-h-screen">
      <header className="bg-univGreen py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 animate-zoom-in">
          <img 
            src={localImages[6]} 
            alt="Student Life" 
            className="w-full h-full object-cover scale-110 will-change-transform" 
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10 animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-black mb-6 uppercase tracking-tighter">Student <span className="text-univOrange">Life</span></h1>
          <p className="text-xl max-w-2xl mx-auto font-medium opacity-90 leading-relaxed">
            More than just a degree—a community of innovation, culture, and sports.
          </p>
        </div>
      </header>

      {/* Video Reels Section */}
      <section className="py-24 bg-univGray">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-12 animate-fade-up">
            <Film className="text-univOrange" size={32} />
            <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Campus <span className="text-univGreen">Highlights</span></h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 animate-fade-up">
            {facebookVideos.map((url, i) => (
              <div key={i} className="aspect-[9/16] bg-black rounded-[40px] overflow-hidden shadow-2xl border-4 border-white">
                <iframe 
                  src={url} 
                  className="w-full h-full" 
                  style={{ border: 'none', overflow: 'hidden' }} 
                  scrolling="no" 
                  frameBorder="0" 
                  allowFullScreen={true} 
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                ></iframe>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-12 animate-fade-up">
            <Camera className="text-univGreen" size={32} />
            <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">Life in <span className="text-univOrange">Pictures</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-up">
            {galleryImages.map((image, index) => (
              <div key={image} className={`rounded-3xl overflow-hidden bg-slate-100 ${index % 3 === 2 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                <img 
                  src={image} 
                  alt={`Campus view ${index + 1}`} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
            ))}
          </div>
          <div className="mt-12 p-8 bg-univGray rounded-[40px] text-center border border-slate-100 animate-fade-up">
            <p className="text-slate-500 font-medium italic">
              Note: To use your local images, ensure they are named correctly in the <code className="text-univOrange">public/images/</code> folder and update the src attributes above.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StudentLife;
