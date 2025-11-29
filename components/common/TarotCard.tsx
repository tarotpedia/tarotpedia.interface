'use client';
import { BASE_API_URL } from '@/lib/variables';
import { TarotCard } from '@/types/tarot';

import { ArrowDown, ArrowUp } from 'lucide-react';

export default function TarotCardComponent({ card }: { card: TarotCard }) {
  const isReversed = !card.is_upright;
  const imageUrl = card.image_url.startsWith('http') ? card.image_url : `${BASE_API_URL}${card.image_url}`;

  return (
    <div className="relative group w-96 sm:w-64 md:w-72 mx-auto">
      <div className="relative transform transition-all duration-300">
        <div className="absolute inset-0 blur-xl opacity-0 transition-opacity duration-300" />
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="relative w-full"
              style={{
                transform: isReversed ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.6s',
              }}
            >
              <img src={imageUrl} alt={card.name} className="w-full h-full object-cover" />
              <div className="absolute inset-0" />
            </div>
          </div>
        </div>
        <div className="mt-3 text-center">
          <h3 className="font-semibold text-sm sm:text-base text-[#c19670] mb-1">{card.name}</h3>
          <p className="text-lg sm:text-xl text-[#c19670]/80">
            {isReversed ? <ArrowDown className="inline w-3 h-3 mr-1" /> : <ArrowUp className="inline w-3 h-3 mr-1" />}
            {isReversed ? 'Reversed' : 'Upright'}
          </p>
        </div>
      </div>
    </div>
  );
}
