'use client';
import React from 'react';

const GrappleHook: React.FC = () => {
  return (
    <div className="relative max-w-2xl mx-auto">
      {/* left rope */}
      <div
        className="absolute left-1/8 -top-32 w-28 pointer-events-none z-0"
        style={{
          transformOrigin: 'top center',
          animation: 'swing 5s ease-in-out infinite',
        }}
      >
        <svg viewBox="0 0 80 600" className="w-full h-auto">
          {/* metal ring at top */}
          <circle cx="40" cy="4" r="3" fill="#c19670" stroke="#8a8580" strokeWidth="1" />
          {/* rope - much longer */}
          <path d="M40 8 C40 100 40 300 40 500" stroke="#c19670" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* right rope */}
      <div
        className="absolute right-1/8 -top-32 w-28 pointer-events-none z-0"
        style={{
          transformOrigin: 'top center',
          animation: 'swing 5s ease-in-out infinite',
        }}
      >
        <svg viewBox="0 0 80 600" className="w-full h-auto">
          <circle cx="40" cy="4" r="3" fill="#c19670" stroke="#8a8580" strokeWidth="1" />
          <path d="M40 8 C40 90 42 280 40 490" stroke="#c19670" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

export default GrappleHook;
