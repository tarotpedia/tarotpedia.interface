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
    <div className="w-full py-12 px-4 relative">
      {/* Mystical background glow */}
      <div className="absolute inset-0 bg-gradient-radial from-[#c19670]/5 via-transparent to-transparent pointer-events-none" />

      <div className="flex justify-center items-end gap-4 flex-wrap max-w-6xl mx-auto relative">
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
                className="relative cursor-pointer transition-all duration-500 w-[140px] sm:w-[175px]"
                style={{
                  aspectRatio: '350/620',
                  perspective: '1000px',
                  animation: visible ? 'float-in 1.5s ease forwards' : 'none',
                  transform: hovered ? 'translateY(-20px) scale(1.05)' : 'translateY(0) scale(1)',
                  filter: hovered ? 'brightness(1.2)' : 'brightness(1)',
                }}
              >
                {/* Magical aura on hover */}
                {hovered && (
                  <div
                    className="absolute inset-0 pointer-events-none animate-pulse"
                    style={{
                      background: 'radial-gradient(circle, rgba(193,150,112,0.3) 0%, transparent 70%)',
                      filter: 'blur(20px)',
                      zIndex: -1,
                      transform: 'scale(1.3)',
                    }}
                  />
                )}

                {/* Card Inner */}
                <div
                  className="relative w-full h-full transition-transform duration-700"
                  style={{
                    transformStyle: 'preserve-3d',
                    transform: revealed ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  }}
                >
                  {/* Card Back - NO ROUNDED CORNERS */}
                  <div
                    className="absolute w-full h-full overflow-hidden shadow-2xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      background: 'linear-gradient(135deg, #8b7355 0%, #a0956b 50%, #8b7355 100%)',
                      boxShadow: hovered
                        ? '0 25px 50px -12px rgba(193,150,112,0.5), 0 0 30px rgba(193,150,112,0.3)'
                        : '0 20px 40px -10px rgba(0,0,0,0.5)',
                    }}
                  >
                    <img
                      src="/cardBack.svg"
                      alt="Card back"
                      className="w-full h-full object-cover"
                      style={{ filter: 'sepia(20%) brightness(1.1)' }}
                    />

                    {/* Mystical overlay pattern */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(193,150,112,0.1) 10px, rgba(193,150,112,0.1) 20px)',
                      }}
                    />
                  </div>

                  {/* Card Front - NO ROUNDED CORNERS */}
                  <div
                    className="absolute w-full h-full overflow-hidden shadow-2xl"
                    style={{
                      backfaceVisibility: 'hidden',
                      transform: 'rotateY(180deg)',
                      boxShadow: '0 25px 50px -12px rgba(0,0,0,0.7), 0 0 40px rgba(193,150,112,0.2)',
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

                    {/* Mystical border glow */}
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        boxShadow: 'inset 0 0 20px rgba(193,150,112,0.3)',
                      }}
                    />
                  </div>
                </div>

                {/* Enhanced Hover Glow - NO ROUNDED CORNERS */}
                {hovered && !selected && (
                  <>
                    <div
                      className="absolute inset-0 pointer-events-none transition-opacity duration-300 animate-pulse"
                      style={{
                        boxShadow: '0 0 30px 4px rgba(193, 150, 112, 0.8), inset 0 0 20px rgba(193, 150, 112, 0.3)',
                        border: '2px solid rgba(193, 150, 112, 0.8)',
                        zIndex: 10,
                      }}
                    />

                    {/* Sparkle particles */}
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-[#c19670] rounded-full animate-ping"
                        style={{
                          top: `${20 + i * 30}%`,
                          left: `${10 + i * 40}%`,
                          animationDelay: `${i * 0.2}s`,
                          animationDuration: '1.5s',
                        }}
                      />
                    ))}
                  </>
                )}

                {/* Selection indicator */}
                {selected && (
                  <div
                    className="absolute inset-0 pointer-events-none animate-pulse"
                    style={{
                      border: '3px solid rgba(193, 150, 112, 1)',
                      boxShadow: '0 0 40px rgba(193, 150, 112, 0.9), inset 0 0 30px rgba(193, 150, 112, 0.4)',
                      zIndex: 15,
                    }}
                  />
                )}
              </div>

              {/* === Card Label Section on Hover === */}
              {revealed && hovered && (
                <div
                  className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-50 animate-fade-in"
                  style={{
                    bottom: '100%',
                    marginBottom: '1rem',
                    width: 'max-content',
                    maxWidth: '200px',
                    textAlign: 'center',
                  }}
                >
                  <div className="px-4 py-2 bg-[#0f0e0f]/95 border-2 border-[#c19670]/60 backdrop-blur-md shadow-[0_0_25px_rgba(193,150,112,0.5)]">
                    <h3
                      className="text-[#c19670] font-bold text-sm tracking-wide whitespace-nowrap drop-shadow-[0_0_8px_rgba(193,150,112,0.8)]"
                      title={card.name}
                    >
                      {card.name}
                    </h3>
                    <p className={`text-xs font-medium mt-1 ${isReversed ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {isReversed ? 'Reversed' : 'Upright'}
                    </p>
                  </div>

                  {/* Tooltip arrow */}
                  <div
                    className="absolute left-1/2 -translate-x-1/2 w-0 h-0"
                    style={{
                      top: '100%',
                      borderLeft: '8px solid transparent',
                      borderRight: '8px solid transparent',
                      borderTop: '8px solid rgba(193,150,112,0.6)',
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes float-in {
          0% {
            opacity: 0.3;
            transform: translateY(80px) scale(0.85) rotateY(-15deg);
          }
          60% {
            opacity: 1;
            transform: translateY(-15px) scale(1.05) rotateY(5deg);
          }
          100% {
            transform: translateY(0) scale(1) rotateY(0deg);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateX(-50%) translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default TarotCardDeck;
