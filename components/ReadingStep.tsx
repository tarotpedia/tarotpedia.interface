interface ReadingStepProps {
  progress: number;
  progressText: string;
}

const ReadingStep: React.FC<ReadingStepProps> = ({ progress, progressText }) => {
  return (
    <div className="max-w-4xl mx-auto text-center px-4">
      <div className="relative min-h-[400px] md:min-h-[500px] flex items-center justify-center">
        {/* Mystical Background Glow */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 md:w-96 md:h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
        </div>

        {/* Orbiting Planets */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative w-48 h-48 md:w-72 md:h-72">
            {[0, 120, 240].map((angle, i) => (
              <div
                key={i}
                className="absolute inset-0 animate-spin"
                style={{
                  animationDuration: `${8 + i * 2}s`,
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                <div
                  className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full shadow-lg"
                  style={{
                    background: ['#fbbf24', '#a78bfa', '#f472b6'][i],
                    top: '50%',
                    left: '50%',
                    transform: `translate(-50%, -50%) translateY(-${24 + i * 12}px) md:translateY(-${36 + i * 18}px)`,
                    boxShadow: `0 0 20px ${['#fbbf24', '#a78bfa', '#f472b6'][i]}`,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Central Mystical Book */}
        <div className="relative z-10">
          <div className="relative">
            {/* Magical Sparkles */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-amber-300 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `sparkle ${1 + Math.random()}s ease-in-out infinite`,
                  animationDelay: `${Math.random() * 2}s`,
                }}
              />
            ))}

            {/* Mystical Circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[0, 1, 2].map(i => (
                <div
                  key={i}
                  className="absolute border-2 rounded-full"
                  style={{
                    width: `${120 + i * 40}%`,
                    height: `${120 + i * 40}%`,
                    borderColor: `rgba(251, 191, 36, ${0.2 - i * 0.05})`,
                    animation: `spin ${20 - i * 5}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Progress Text */}
          <div className="mt-12 md:mt-16 bg-[#fdfdf8]/80 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-amber-900/30 shadow-xl w-80 md:w-96 mx-auto">
            <h2 className="text-xl md:text-2xl font-bold text-[#3d3a2a] mb-4">{progressText}</h2>

            {/* Progress Bar */}
            <div className="relative w-full h-2 bg-amber-900/20 rounded-xl overflow-hidden">
              <div
                className="h-full bg-amber-500 transition-all duration-500 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[#3d3a2a] mt-3 text-sm md:text-base font-medium">{progress}%</p>
          </div>
        </div>

        <style jsx>{`
          @keyframes float {
            0%,
            100% {
              transform: translateY(0) rotate(var(--rotation));
            }
            50% {
              transform: translateY(-20px) rotate(var(--rotation));
            }
          }

          @keyframes drift {
            0% {
              transform: translateX(-10px);
            }
            50% {
              transform: translateX(10px);
            }
            100% {
              transform: translateX(-10px);
            }
          }

          @keyframes bookFloat {
            0%,
            100% {
              transform: translateY(0) rotateY(0deg);
            }
            25% {
              transform: translateY(-10px) rotateY(5deg);
            }
            75% {
              transform: translateY(-10px) rotateY(-5deg);
            }
          }

          @keyframes sparkle {
            0%,
            100% {
              opacity: 0;
              transform: scale(0);
            }
            50% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
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
        `}</style>
      </div>
    </div>
  );
};

export default ReadingStep;
