'use client';
import { useAnimations } from '@/context/AnimationContext';

import React from 'react';

interface ReadingStepProps {
  progress: number;
  progressText: string;
}

const ReadingStep: React.FC<ReadingStepProps> = ({ progress, progressText }) => {
  const { animationsEnabled } = useAnimations();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <>
      <div className="relative max-w-3xl mx-auto text-center px-4 py-16 mt-48 mb-32">
        {}
        <div className="absolute top-1/2 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-radial from-[#c19670]/40 via-[#8a8580]/20 to-transparent blur-3xl animate-pulse" />

        {}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute border-2 rounded-full"
              style={{
                width: `${150 + i * 30}px`,
                height: `${150 + i * 30}px`,
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
        {}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div
            className="absolute w-12 h-12 rounded-full shadow-2xl"
            style={{
              background: 'radial-gradient(circle at 35% 35%, #d0d0d0, #b0b0b0, #808080)',
              boxShadow:
                '0 0 10px rgba(255, 255, 255, 0.2), 0 0 20px rgba(193, 150, 112, 0.1), inset 0 0 5px rgba(0, 0, 0, 0.05)',
              filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.15))',
              animation: 'gentle-pulse 5s ease-in-out infinite, planet-float 10s ease-in-out infinite',
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-black/5" />
            <div
              className="absolute inset-0 rounded-full"
              style={{
                background: 'radial-gradient(circle at 60% 40%, transparent 30%, rgba(0, 0, 0, 0.05) 70%)',
              }}
            />

            <div
              className="absolute"
              style={{
                width: '140px',
                height: '100px',
                left: '-70px',
                top: '-50px',
                animation: 'orbit-ellipse-1 8s linear infinite',
              }}
            >
              <div
                className="absolute w-6 h-6 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #e0c24f, #d5a62a, #b08d1e)',
                  boxShadow:
                    '0 0 15px rgba(213, 166, 42, 0.7), 0 0 30px rgba(213, 166, 42, 0.3), inset 0 0 7px rgba(255, 255, 255, 0.3)',
                  filter: 'drop-shadow(0 0 7px rgba(213, 166, 42, 0.7))',
                  left: '100%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'counter-rotate-1 8s linear infinite reverse',
                }}
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/70 to-transparent animate-pulse" />
              </div>
            </div>

            <div
              className="absolute"
              style={{
                width: '160px',
                height: '160px',
                left: '-80px',
                top: '-80px',
                animation: 'orbit-circle-2 12s linear infinite reverse',
              }}
            >
              <div
                className="absolute w-5 h-5 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #e0c24f, #d5a62a, #b08d1e)',
                  boxShadow:
                    '0 0 15px rgba(213, 166, 42, 0.7), 0 0 30px rgba(213, 166, 42, 0.3), inset 0 0 7px rgba(255, 255, 255, 0.3)',
                  filter: 'drop-shadow(0 0 7px rgba(213, 166, 42, 0.7))',
                  left: '100%',
                  top: '50%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'counter-rotate-2 12s linear infinite',
                }}
              >
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-white/70 to-transparent animate-pulse"
                  style={{ animationDelay: '0.3s' }}
                />
              </div>
            </div>

            <div
              className="absolute"
              style={{
                width: '120px',
                height: '180px',
                left: '-60px',
                top: '-90px',
                animation: 'orbit-ellipse-3 15s linear infinite',
                transform: 'rotate(45deg)',
              }}
            >
              <div
                className="absolute w-5.5 h-5.5 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, #e0c24f, #d5a62a, #b08d1e)',
                  boxShadow:
                    '0 0 15px rgba(213, 166, 42, 0.7), 0 0 30px rgba(213, 166, 42, 0.3), inset 0 0 7px rgba(255, 255, 255, 0.3)',
                  filter: 'drop-shadow(0 0 7px rgba(213, 166, 42, 0.7))',
                  left: '100%',
                  top: '50%',
                  transform: 'translate(-50%, -50%) rotate(-45deg)',
                  animation: 'counter-rotate-3 15s linear infinite reverse',
                }}
              >
                <div
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-white/70 to-transparent animate-pulse"
                  style={{ animationDelay: '0.6s' }}
                />
              </div>
            </div>
          </div>

          {}
          {[...Array(2)].map((_, i) => (
            <div
              key={`trail-${i}`}
              className="absolute rounded-full border opacity-10"
              style={{
                width: `${160 + i * 40}px`,
                height: `${160 + i * 40}px`,
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

        {}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(16)].map((_, i) => (
            <div
              key={`particle-${i}`}
              className="absolute w-1.5 h-1.5 rounded-full opacity-60"
              style={{
                background: `radial-gradient(circle, ${
                  i % 3 === 0 ? '#c19670' : i % 3 === 1 ? '#c3beb6' : '#d4a574'
                }, transparent)`,
                left: `${50 + Math.cos((i * 22.5 * Math.PI) / 180) * 120}px`,
                top: `${50 + Math.sin((i * 22.5 * Math.PI) / 180) * 120}px`,
                animation: `float-particle ${15 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
                filter: 'blur(1px)',
                boxShadow: '0 0 8px currentColor',
              }}
            />
          ))}
        </div>

        {}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {[...Array(2)].map((_, i) => (
            <div
              key={`wave-${i}`}
              className="absolute rounded-full border opacity-15"
              style={{
                width: `${300 + i * 80}px`,
                height: `${300 + i * 80}px`,
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

        {}
        <div className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md px-6">
          <h2 className="text-xl md:text-2xl font-bold text-[#c19670] mb-6 tracking-wide drop-shadow-[0_0_10px_rgba(193,150,112,0.5)]">
            {progressText}
          </h2>

          {}
          <div className="w-full max-w-sm mx-auto">
            <div className="relative w-full h-1.5 bg-[#1a1819]/40 rounded-full overflow-visible">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#c19670]/60 via-[#d4a574]/70 to-[#c19670]/60 rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${progress}%`,
                  boxShadow: '0 0 8px rgba(193, 150, 112, 0.3)',
                }}
              />

              {progress > 0 && (
                <>
                  <div
                    className="absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
                    style={{
                      left: `calc(${progress}% - 8px)`,
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" className="animate-pulse">
                      <path
                        d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                        fill="#c19670"
                        opacity="0.8"
                      />
                      <circle cx="12" cy="12" r="2" fill="#fffef8" opacity="0.9" />
                    </svg>
                  </div>

                  {progress > 25 && (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
                      style={{
                        left: `calc(${progress * 0.6}% - 6px)`,
                      }}
                    >
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        className="animate-pulse"
                        style={{ animationDelay: '0.2s' }}
                      >
                        <path
                          d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                          fill="#d4a574"
                          opacity="0.6"
                        />
                      </svg>
                    </div>
                  )}

                  {progress > 50 && (
                    <div
                      className="absolute top-1/2 -translate-y-1/2 transition-all duration-500 ease-out"
                      style={{
                        left: `calc(${progress * 0.3}% - 5px)`,
                      }}
                    >
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 24 24"
                        className="animate-pulse"
                        style={{ animationDelay: '0.4s' }}
                      >
                        <path
                          d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                          fill="#c3beb6"
                          opacity="0.5"
                        />
                      </svg>
                    </div>
                  )}
                </>
              )}
            </div>
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

        @keyframes gentle-pulse {
          0%,
          100% {
            transform: scale(1);
            filter: drop-shadow(0 0 15px rgba(255, 255, 255, 0.8));
          }
          50% {
            transform: scale(1.08);
            filter: drop-shadow(0 0 25px rgba(255, 255, 255, 1)) drop-shadow(0 0 40px rgba(193, 150, 112, 0.5));
          }
        }

        @keyframes planet-float {
          0%,
          100% {
            transform: translate(0px, 0px);
          }
          25% {
            transform: translate(8px, -10px);
          }
          50% {
            transform: translate(-5px, -18px);
          }
          75% {
            transform: translate(-10px, -5px);
          }
        }

        @keyframes orbit-ellipse-1 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes orbit-circle-2 {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes orbit-ellipse-3 {
          from {
            transform: rotate(45deg) rotateZ(0deg);
          }
          to {
            transform: rotate(45deg) rotateZ(360deg);
          }
        }

        @keyframes counter-rotate-1 {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(-360deg);
          }
        }

        @keyframes counter-rotate-2 {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(-360deg);
          }
        }

        @keyframes counter-rotate-3 {
          from {
            transform: translate(-50%, -50%) rotate(-45deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(-405deg);
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
