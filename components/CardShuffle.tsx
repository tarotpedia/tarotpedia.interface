'use client';
import React, { useEffect, useState } from 'react';

interface CardPosition {
  x: number;
  y: number;
  zIndex: number;
}

const CardShuffle: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [cardPositions, setCardPositions] = useState<CardPosition[]>(
    Array.from({ length: 24 }).map((_, i) => ({
      x: i * 20,
      y: 0,
      zIndex: 10 - i,
    }))
  );
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCardPositions(prev => {
        const newPositions = [...prev];
        const idx1 = Math.floor(Math.random() * newPositions.length);
        let idx2 = Math.floor(Math.random() * newPositions.length);
        while (idx2 === idx1) idx2 = Math.floor(Math.random() * newPositions.length);
        [newPositions[idx1], newPositions[idx2]] = [newPositions[idx2], newPositions[idx1]];
        return newPositions;
      });
    }, 350);

    const fadeTimer = setTimeout(() => {
      setIsFading(true);
      clearInterval(interval);

      const completeTimer = setTimeout(() => {
        onComplete?.();
      }, 3000);

      return () => clearTimeout(completeTimer);
    }, 6000);

    return () => {
      clearInterval(interval);
      clearTimeout(fadeTimer);
    };
  }, [onComplete]);

  return (
    <>
      <style jsx global>{`
        @layer utilities {
          @keyframes casino-shuffle {
            0% {
              transform: translateY(0) rotate(0deg);
            }
            25% {
              transform: translateY(-20px) rotate(-5deg);
            }
            50% {
              transform: translateY(0) rotate(0deg);
            }
            75% {
              transform: translateY(20px) rotate(5deg);
            }
            100% {
              transform: translateY(0) rotate(0deg);
            }
          }

          @keyframes card-fadeout {
            from {
              opacity: 1;
            }
            to {
              opacity: 0;
            }
          }

          .animate-shuffle {
            animation: casino-shuffle 2.2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
            transform-origin: center;
            max-width: 105px;
            max-height: 180px;
          }

          .animate-fadeout {
            animation: card-fadeout 1s ease-in-out forwards;
            transform-origin: center;
            max-width: 105px;
            max-height: 180px;
          }

          .card-container {
            position: absolute;
            transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
          }
        }
      `}</style>

      <div className="flex flex-col items-center justify-center gap-8 animate-fade-in duration-700">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#3d3a2a] mb-2">Shuffling</h2>
          <p className="text-[#3d3a2a] text-sm">Please wait while we prepare your cards...</p>
        </div>

        <div className="relative w-full h-96 flex justify-center items-center overflow-hidden">
          <div className="relative" style={{ width: '600px', height: '200px' }}>
            {cardPositions.map((pos, i) => (
              <div
                key={i}
                className={`card-container ${isFading ? 'animate-fadeout' : 'animate-shuffle'}`}
                style={{
                  left: `calc(50% - 52px + ${pos.x - 24 * 10}px)`,
                  top: `calc(50% - 90px + ${pos.y}px)`,
                  zIndex: pos.zIndex,
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <img src="/cardBack.svg" alt="Card" className="w-full h-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardShuffle;
