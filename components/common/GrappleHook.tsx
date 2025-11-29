'use client';
import React from 'react';

interface RopeProps {
  positionClass: string;
  pathD: string;
}

const Rope: React.FC<RopeProps> = ({ positionClass, pathD }) => (
  <div
    className={`absolute ${positionClass} -top-32 w-28 pointer-events-none z-0`}
    style={{
      transformOrigin: 'top center',
      animation: 'swing 5s ease-in-out infinite',
    }}
  >
    <svg viewBox="0 0 80 300" className="w-full h-auto">
      <circle cx="40" cy="4" r="3" fill="#c19670" stroke="#8a8580" strokeWidth="1" />
      <path d={pathD} stroke="#c19670" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  </div>
);

const GrappleHook: React.FC = () => {
  return (
    <div className="relative max-w-2xl mx-auto">
      <Rope positionClass="left-1/8" pathD="M40 8 C40 60 40 150 40 250" />
      <Rope positionClass="right-1/8" pathD="M40 8 C40 60 42 140 40 240" />
    </div>
  );
};

export default GrappleHook;
