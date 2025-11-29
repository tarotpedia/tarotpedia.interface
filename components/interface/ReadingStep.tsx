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
        {/* Mystical nebula background */}
        <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-[#c19670]/40 via-[#8a8580]/20 to-transparent blur-3xl animate-pulse" />

        {/* Cosmic rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute border-2 rounded-full"
              style={{
                width: `${200 + i * 40}px`,
                height: `${200 + i * 40}px`,
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
                animation: `orbitRotate ${10 + i * 3}s ease-in-out infinite ${i % 2 ? 'reverse' : ''}`,
                filter: 'drop-shadow(0 0 10px rgba(193, 150, 112, 0.4))',
              }}
            />
          ))}
        </div>

        {/* Three-body problem chaotic orbits - 3 planets */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {/* Planet 1 - Golden */}
          <div
            className="absolute w-8 h-8 rounded-full shadow-lg"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #f4d03f, #c19670)',
              boxShadow: '0 0 20px rgba(193, 150, 112, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.3)',
              animation: 'chaotic-orbit-1 12s ease-in-out infinite',
              filter: 'drop-shadow(0 0 8px rgba(193, 150, 112, 0.6))',
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
          </div>

          {/* Planet 2 - Silver */}
          <div
            className="absolute w-6 h-6 rounded-full shadow-lg"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #e8e6e3, #8a8580)',
              boxShadow: '0 0 20px rgba(138, 133, 128, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.3)',
              animation: 'chaotic-orbit-2 15s ease-in-out infinite',
              filter: 'drop-shadow(0 0 8px rgba(138, 133, 128, 0.6))',
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
          </div>

          {/* Planet 3 - Bronze */}
          <div
            className="absolute w-7 h-7 rounded-full shadow-lg"
            style={{
              background: 'radial-gradient(circle at 30% 30%, #d4a574, #a0956b)',
              boxShadow: '0 0 20px rgba(212, 165, 116, 0.8), inset 0 0 10px rgba(255, 255, 255, 0.3)',
              animation: 'chaotic-orbit-3 18s ease-in-out infinite',
              filter: 'drop-shadow(0 0 8px rgba(212, 165, 116, 0.6))',
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
          </div>

          {/* Orbit trails */}
          {[...Array(3)].map((_, i) => (
            <div
              key={`trail-${i}`}
              className="absolute rounded-full border opacity-10"
              style={{
                width: `${180 + i * 60}px`,
                height: `${180 + i * 60}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderWidth: '2px',
                borderColor: i === 0 ? '#c19670' : i === 1 ? '#8a8580' : '#d4a574',
                borderStyle: 'dashed',
                animation: `orbitRotate ${12 + i * 3}s linear infinite ${i % 2 ? 'reverse' : ''}`,
              }}
            />
          ))}
        </div>

        {/* Mystical particles */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(16)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full opacity-60"
              style={{
                background: `radial-gradient(circle, ${
                  i % 3 === 0 ? '#c19670' : i % 3 === 1 ? '#c3beb6' : '#d4a574'
                }, transparent)`,
                left: `${50 + Math.cos((i * 22.5 * Math.PI) / 180) * 180}px`,
                top: `${50 + Math.sin((i * 22.5 * Math.PI) / 180) * 180}px`,
                animation: `float-particle ${15 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                filter: 'blur(1px)',
                boxShadow: '0 0 8px currentColor',
              }}
            />
          ))}
        </div>

        {/* Pulsing waves */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(3)].map((_, i) => (
            <div
              key={`wave-${i}`}
              className="absolute rounded-full border opacity-15"
              style={{
                width: `${450 + i * 120}px`,
                height: `${450 + i * 120}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                borderWidth: '2px',
                borderColor: '#c19670',
                animation: `pulse ${3 + i}s ease-in-out infinite`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>

        {/* Progress content - Fixed width container */}
        <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#c19670] mb-6 tracking-wide drop-shadow-[0_0_10px_rgba(193,150,112,0.5)]">
            {progressText}
          </h2>

          {/* Fixed width progress bar container */}
          <div className="w-full max-w-sm mx-auto">
            <div className="relative w-full h-4 bg-[#1a1819] rounded-full overflow-hidden shadow-inner">
              {/* Progress bar glow */}
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#c19670] via-[#d4a574] to-[#c19670] rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${progress}%`,
                  boxShadow: '0 0 15px rgba(193, 150, 112, 0.6)',
                }}
              />

              {/* Shimmer effect */}
              <div
                className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>

            <p className="text-[#c19670] mt-4 text-base md:text-lg font-bold drop-shadow-[0_0_8px_rgba(193,150,112,0.4)]">
              {progress}%
            </p>
          </div>
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

        @keyframes chaotic-orbit-1 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          16% {
            transform: translate(120px, -80px);
          }
          33% {
            transform: translate(80px, 100px);
          }
          50% {
            transform: translate(-100px, 60px);
          }
          66% {
            transform: translate(-120px, -90px);
          }
          83% {
            transform: translate(60px, -110px);
          }
        }

        @keyframes chaotic-orbit-2 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          20% {
            transform: translate(-90px, 110px);
          }
          40% {
            transform: translate(110px, 70px);
          }
          60% {
            transform: translate(70px, -100px);
          }
          80% {
            transform: translate(-110px, -80px);
          }
        }

        @keyframes chaotic-orbit-3 {
          0%,
          100% {
            transform: translate(0, 0);
          }
          14% {
            transform: translate(100px, 90px);
          }
          28% {
            transform: translate(-80px, 120px);
          }
          42% {
            transform: translate(-110px, -70px);
          }
          57% {
            transform: translate(90px, -100px);
          }
          71% {
            transform: translate(120px, 50px);
          }
          85% {
            transform: translate(-60px, -110px);
          }
        }

        @keyframes float-particle {
          0%,
          100% {
            transform: translate(0, 0) scale(1);
            opacity: 0.6;
          }
          25% {
            transform: translate(10px, -15px) scale(1.2);
            opacity: 0.8;
          }
          50% {
            transform: translate(-8px, 12px) scale(0.9);
            opacity: 0.4;
          }
          75% {
            transform: translate(12px, 8px) scale(1.1);
            opacity: 0.7;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </>
  );
};

export default ReadingStep;
