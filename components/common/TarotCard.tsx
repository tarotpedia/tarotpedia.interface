'use client';
import { BASE_API_URL } from '@/lib/variables';
import { TarotCard } from '@/types/tarot';

import { ArrowDown, ArrowUp } from 'lucide-react';

export default function TarotCardComponent({ card }: { card: TarotCard }) {
  const isReversed = !card.is_upright;
  const imageUrl = card.image_url.startsWith('http') ? card.image_url : `${BASE_API_URL}${card.image_url}`;

  return (
    <div className="relative group w-full max-w-[160px] sm:max-w-[200px] mx-auto">
      <div className="relative transform transition-all duration-300">
        <div
          className="absolute inset-0 blur-xl opacity-30 transition-opacity duration-300"
          style={{
            background: 'radial-gradient(circle, rgba(193,150,112,0.4) 0%, transparent 70%)',
          }}
        />

        <div className="relative">
          <div
            className="overflow-hidden rounded-sm shadow-2xl border-2 border-[#c19670]/60"
            style={{
              boxShadow: '0 20px 40px -10px rgba(0,0,0,0.5), 0 0 20px rgba(193,150,112,0.3)',
            }}
          >
            <div
              className="relative w-full bg-white"
              style={{
                transform: isReversed ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.6s',
              }}
            >
              <img src={imageUrl} alt={card.name} className="w-full h-full object-cover" />

              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: 'inset 0 0 20px rgba(193,150,112,0.2)',
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-3 text-center">
          <h3 className="text-sm sm:text-base text-[#c19670] font-medium mb-1">{card.name}</h3>
          <p className="text-base sm:text-lg text-[#c19670]/80 flex items-center justify-center gap-1">
            {isReversed ? <ArrowDown className="inline w-3 h-3" /> : <ArrowUp className="inline w-3 h-3" />}
            <span className="text-sm sm:text-base">{isReversed ? 'Reversed' : 'Upright'}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
