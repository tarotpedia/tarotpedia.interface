'use client';
import { useI18n } from '@/lib/i18n';

import React, { useEffect, useState } from 'react';

interface CardPosition {
  x: number;
  y: number;
  rotation: number;
  zIndex: number;
}

const CardShuffle: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const { t } = useI18n();
  const [cardPositions, setCardPositions] = useState<CardPosition[]>(
    Array.from({ length: 24 }).map((_, i) => ({
      x: i * 20,
      y: 0,
      rotation: 0,
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
      <div className="flex flex-col items-center justify-center gap-4 sm:gap-6 animate-fade-in duration-700">
        <div className="text-center mt-8 sm:mt-0">
          <h2 className="text-2xl sm:text-3xl text-[#c19670]/90 mb-2">{t.deck.shuffling.title}</h2>
          <p className="text-[#c19670]/70 text-sm sm:text-base">{t.deck.shuffling.description}</p>
        </div>

        <div className="relative w-full h-64 sm:h-[400px] md:h-[450px] flex justify-center items-center overflow-hidden">
          <div className="relative w-[280px] h-[150px] sm:w-[700px] sm:h-[300px] md:w-[1000px] md:h-[350px]">
            {cardPositions.map((pos, i) => (
              <div
                key={i}
                className={`card-container ${isFading ? 'animate-fadeout' : 'animate-shuffle'}`}
                style={{
                  left: `calc(50% - 25px + ${(pos.x - 24 * 10) * (window.innerWidth >= 768 ? 0.75 : 0.47)}px - ${window.innerWidth >= 768 ? '20px' : '0px'})`,
                  top: `calc(50% - 42px + ${pos.y}px - ${window.innerWidth >= 768 ? '30px' : '0px'})`,
                  zIndex: pos.zIndex,
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <img
                  src="/cardBack.jpeg"
                  alt="Card"
                  className="w-full h-full object-cover border-2 border-[#c19670]/60 shadow-[0_0_10px_rgba(193,150,112,0.3)]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CardShuffle;
