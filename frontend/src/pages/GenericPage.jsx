import React from 'react';

const GenericPage = ({ children, title }) => {
  return (
    <div className="pt-32 pb-20 container mx-auto px-4 min-h-screen">
      {title && (
        <h1 className="text-4xl font-black text-[#002147] mb-8 uppercase font-poppins border-b-4 border-[#FFD700] inline-block">
          {title}
        </h1>
      )}
      <div className="animate-fade-up">
        {children}
      </div>
    </div>
  );
};

export default GenericPage;
