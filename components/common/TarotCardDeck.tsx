import { BASE_API_URL } from '@/lib/variables';
import { TarotCard } from '@/types/tarot';

import React, { useEffect, useState } from 'react';

interface CardDeckProps {
  cards: TarotCard[];
  onCardSelect: (card: TarotCard) => void;
  selectedCards: TarotCard[];
  revealedCards: TarotCard[];
}

const TarotCardDeck: React.FC<CardDeckProps> = ({ cards, onCardSelect, selectedCards, revealedCards }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visibleCards, setVisibleCards] = useState<number>(0);
  let hoverTimeout: NodeJS.Timeout;

  const isSelected = (card: TarotCard) => selectedCards.some(sc => sc.name === card.name);
  const isRevealed = (card: TarotCard) => revealedCards.some(rc => rc.name === card.name);
  const getCardFrontUrl = (card: TarotCard) =>
    card.image_url.startsWith('http') ? card.image_url : `${BASE_API_URL}${card.image_url}`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      setVisibleCards(index);
      if (index >= cards.length) clearInterval(interval);
    }, 50);
    return () => clearInterval(interval);
  }, [cards.length]);

  return (
    <div className="w-full py-12 px-4">
      <div className="flex justify-center items-end gap-4 flex-wrap max-w-6xl mx-auto">
        {cards.map((card, index) => {
          const selected = isSelected(card);
          const revealed = isRevealed(card);
          const isReversed = !card.is_upright;
          const hovered = hoveredIndex === index;
          const visible = index < visibleCards;

          return (
            <div
              key={`${card.name}-${index}`}
              className={`relative transition-all duration-700 ease-out ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{
                transitionDelay: `${index * 0.1}s`,
                transform: 'translateY(0)',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => onCardSelect(card)}
            >
              {/* Card Container */}
              <div
                className="relative cursor-pointer transition-transform duration-300 hover:-translate-y-4 w-[140px] sm:w-[175px]"
                style={{
                  aspectRatio: '350/600',
                  perspective: '1000px',
                  animation: visible ? 'float-in 1.5s ease forwards' : 'none',
                }}
              >
                {/* Card Inner */}
                <div
                  className="relative w-full h-full transition-transform duration-700"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: revealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Card Back */}
                  <div
                    className="absolute w-full h-full overflow-hidden shadow-lg rounded-lg"
                    style={{
                      backfaceVisibility: 'hidden',
                      background: 'linear-gradient(135deg, #8b7355 0%, #a0956b 50%, #8b7355 100%)',
                    }}
                  >
                    <img
                      src="/cardBack.svg"
                      alt="Card back"
                      className="w-full h-full object-cover"
                      style={{ filter: 'sepia(20%) brightness(1.1)' }}
                    />
                  </div>

                  {/* Card Front */}
                  <div
                    className="absolute w-full h-full overflow-hidden shadow-lg rounded-lg"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                    }}
                  >
                    <img
                      src={getCardFrontUrl(card)}
                      alt={card.name}
                      className="w-full h-full object-cover"
                      style={{
                        transform: isReversed ? 'rotate(180deg)' : 'none',
                        transition: 'transform 0.6s',
                      }}
                    />
                  </div>
                </div>

                {/* Hover Glow */}
                {hovered && !selected && (
                  <div
                    className="absolute inset-0 pointer-events-none rounded-lg transition-opacity duration-300"
                    style={{
                      boxShadow: '0 0 20px 2px rgba(193, 150, 112, 0.6)',
                      border: '1px solid rgba(193, 150, 112, 0.5)',
                      zIndex: 10,
                    }}
                  />
                )}
              </div>

              {/* === Card Label Section on Hover === */}
              {revealed && hovered && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-50"
                  style={{
                    bottom: '100%',
                    marginBottom: '1rem',
                    width: 'max-content',
                    maxWidth: '200px',
                    textAlign: 'center',
                  }}
                >
                  <div className="px-4 py-2 bg-[#0f0e0f]/95 border border-[#c19670]/30 rounded-lg backdrop-blur-md shadow-[0_0_15px_rgba(0,0,0,0.5)]">
                    <h3 className="text-[#c19670] font-bold text-sm tracking-wide whitespace-nowrap" title={card.name}>
                      {card.name}
                    </h3>
                    <p className={`text-xs font-medium mt-1 ${isReversed ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {isReversed ? 'Reversed' : 'Upright'}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes float-in {
          0% {
            opacity: 0.5;
            transform: translateY(60px) scale(0.9);
          }
          60% {
            opacity: 1;
            transform: translateY(-10px) scale(1.02);
          }
          100% {
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default TarotCardDeck;
