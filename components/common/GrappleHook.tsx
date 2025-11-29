'use client';
import { useAnimations } from '@/context/AnimationContext';

import React from 'react';

interface RopeProps {
  positionClass: string;
  pathD: string;
  animationsEnabled: boolean;
}

const Rope: React.FC<RopeProps> = ({ positionClass, pathD, animationsEnabled }) => (
  <div
    className={`absolute ${positionClass} -top-20 md:-top-32 w-20 md:w-28 pointer-events-none z-0`}
    style={{
      transformOrigin: 'top center',
      animation: animationsEnabled ? 'swing 5s ease-in-out infinite' : 'none',
    }}
  >
    <svg viewBox="0 0 80 300" className="w-full h-auto">
      <circle cx="40" cy="4" r="3" fill="#c19670" stroke="#8a8580" strokeWidth="1" />
      <path d={pathD} stroke="#c19670" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  </div>
);

const GrappleHook: React.FC = () => {
  const { animationsEnabled } = useAnimations();

  return (
    <div className="relative max-w-2xl mx-auto">
      <Rope positionClass="left-1/8" pathD="M40 8 C40 60 40 150 40 250" animationsEnabled={animationsEnabled} />
      <Rope positionClass="right-1/8" pathD="M40 8 C40 60 42 140 40 240" animationsEnabled={animationsEnabled} />
    </div>
  );
};

export default GrappleHook;
