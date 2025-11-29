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
      <div className="flex flex-col items-center justify-center gap-8 animate-fade-in duration-700">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#c19670]/90 mb-2">{t.deck.shuffling.title}</h2>
          <p className="text-[#c19670]/70 text-sm">{t.deck.shuffling.description}</p>
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
