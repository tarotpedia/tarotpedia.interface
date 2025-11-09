'use client';
import React from 'react';

const GrappleHook: React.FC = () => {
  return (
    <div className="relative max-w-2xl mx-auto">
      {/* left rope */}
      <div
        className="absolute left-1/8 -top-12 w-28 pointer-events-none z-0"
        style={{
          transformOrigin: 'top center',
          animation: 'swing 5s ease-in-out infinite',
        }}
      >
        <svg viewBox="0 0 80 220" className="w-full h-auto">
          {/* metal ring at top */}
          <circle cx="40" cy="4" r="3" fill="#8b7355" stroke="#5a4633" strokeWidth="1" />
          {/* rope */}
          <path d="M40 8 C40 40 40 80 40 120" stroke="#6b4f2a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>

      {/* right rope */}
      <div
        className="absolute right-1/8 -top-12 w-28 pointer-events-none z-0"
        style={{
          transformOrigin: 'top center',
          animation: 'swing 5s ease-in-out infinite',
        }}
      >
        <svg viewBox="0 0 80 220" className="w-full h-auto">
          <circle cx="40" cy="4" r="3" fill="#8b7355" stroke="#5a4633" strokeWidth="1" />
          <path d="M40 8 C40 30 42 70 40 110" stroke="#6b4f2a" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};

export default GrappleHook;
