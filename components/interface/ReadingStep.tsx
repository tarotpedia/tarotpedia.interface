'use client';
import React from 'react';

interface ReadingStepProps {
  progress: number;
  progressText: string;
}

const ReadingStep: React.FC<ReadingStepProps> = ({ progress, progressText }) => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <>
      <div className="relative max-w-3xl mx-auto text-center px-4 py-16 mt-48 mb-32">
        <div className="absolute top-1/2 left-1/2 w-56 h-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-linear-to-br from-[#c19670]/60 to-[#8a8580]/40 blur-2xl animate-pulse" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-40">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute border-2 rounded-full"
              style={{
                width: `${240 + i * 35}px`,
                height: `${240 + i * 35}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderImage:
                  i % 3 === 0
                    ? 'linear-gradient(45deg, #c19670, #d4a574, #c3beb6) 1'
                    : i % 3 === 1
                      ? 'linear-gradient(135deg, #c19670, #8a8580, #c3beb6) 1'
                      : 'linear-gradient(225deg, #c3beb6, #c19670, #d4a574) 1',
                borderStyle: i % 2 === 0 ? 'dashed' : 'dotted',
                animation: `orbitRotate ${12 + i * 4}s ease-in-out infinite ${i % 2 ? 'reverse' : ''}`,
                filter: 'drop-shadow(0 0 8px rgba(193, 150, 112, 0.3))',
              }}
            />
          ))}
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(12)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-2 h-2 rounded-full opacity-70"
              style={{
                background: `linear-gradient(45deg, ${
                  i % 3 === 0 ? '#c19670, #d4a574' : i % 3 === 1 ? '#c3beb6, #8a8580' : '#c19670, #c3beb6'
                })`,
                left: `${50 + Math.cos((i * 30 * Math.PI) / 180) * 150}px`,
                top: `${50 + Math.sin((i * 30 * Math.PI) / 180) * 150}px`,
                animation: `orbitRotate ${20 + i * 2}s linear infinite`,
                filter: 'blur(0.5px) drop-shadow(0 0 4px currentColor)',
                boxShadow: '0 0 6px rgba(193, 150, 112, 0.5)',
              }}
            />
          ))}
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(3)].map((_, i) => (
            <div
              key={`wave-${i}`}
              className="absolute rounded-full border opacity-20"
              style={{
                width: `${400 + i * 100}px`,
                height: `${400 + i * 100}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderWidth: '1px',
                borderColor: '#c19670',
                animation: `pulse ${3 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.1}s`,
              }}
            />
          ))}
        </div>

        <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-md px-6 py-8">
          <h2 className="text-xl md:text-2xl font-bold text-[#c19670] mb-4 tracking-wide">{progressText}</h2>

          <div className="relative w-full h-3 bg-[#1a1819] rounded-xl overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-[#c19670] rounded-xl transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>

          <p className="text-[#c19670] mt-3 text-sm md:text-base font-medium">{progress}%</p>
        </div>
      </div>

      <style jsx>{`
        @keyframes orbitRotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
      `}</style>
    </>
  );
};

export default ReadingStep;
