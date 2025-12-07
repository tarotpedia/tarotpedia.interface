'use client';
import Footer from '@/app/footer';
import Navbar from '@/components/common/Navbar';
import { getCardInfo } from '@/lib/api';
import { useI18n } from '@/lib/i18n';
import { BASE_API_URL } from '@/lib/variables';

import React, { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { ArrowLeft, HelpCircle, Moon, Sun, User } from 'lucide-react';

interface CardMeanings {
  light: string[];
  shadow: string[];
}

interface CardInfo {
  name: string;
  number: string;
  arcana: string;
  suit: string;
  image_url: string;
  fortune_telling: string[];
  keywords: string[];
  meanings: CardMeanings;
  archetype: string;
  hebrew_alphabet: string;
  numerology: string;
  elemental: string;
  mythical_spiritual: string;
  questions_to_ask: string[];
}

export default function CardDetailPage({ params }: { params: Promise<{ cardNumber: string }> }) {
  const { t } = useI18n();
  const router = useRouter();
  const resolvedParams = React.use(params);
  const cardNumber = resolvedParams.cardNumber;

  const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCardInfo = async () => {
      try {
        setLoading(true);
        const response = await getCardInfo(parseInt(cardNumber));
        setCardInfo(response.data);
      } catch (err) {
        console.error('Error fetching card info:', err);
        setError('Failed to load card information. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchCardInfo();
  }, [cardNumber]);

  return (
    <div className="relative bg-[#060506] min-h-screen flex flex-col">
      <Navbar />
      <div className="relative flex-1 z-10 container mx-auto px-4 py-8 max-w-7xl">
        <button
          onClick={() => router.push('/tarot-guide')}
          className="flex items-center gap-2 text-[#c19670] hover:text-[#d4a574] transition-colors mb-6 text-sm sm:text-base"
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>{t.deck.back}</span>
        </button>

        {loading && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-[#c19670] text-xl">Loading...</div>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-red-500 text-xl">{error}</div>
          </div>
        )}

        {cardInfo && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-[#0f0e0f] border border-[#c19670]/30 rounded-lg p-6 sm:p-8 md:p-10 mb-8">
              <div className="flex gap-6 md:gap-8 flex-col md:flex-row">
                <div className="w-full md:w-64 flex-shrink-0 mx-auto md:mx-0">
                  <div className="rounded-md shadow-lg bg-[#1a1819] overflow-hidden">
                    <img
                      src={`${BASE_API_URL}/tarot-cards/images/${cardNumber}.jpg`}
                      alt={cardInfo.name}
                      className="w-full object-cover"
                    />
                  </div>
                </div>

                <div className="flex-1 text-center md:text-left">
                  <div className="text-xs uppercase tracking-wider text-[#8a8580] mb-2">{cardInfo.arcana}</div>
                  <h1 className="text-3xl sm:text-4xl md:text-5xl mb-3 text-[#c19670]">{cardInfo.name}</h1>
                  <div className="text-lg text-[#c3beb6] mb-4">
                    {t.tarotGuide.cardNumber} {cardNumber}
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                    {cardInfo.keywords.map((keyword, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-[#1a1819] rounded-full text-sm text-[#c3beb6] border border-[#c19670]/20"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {cardInfo.fortune_telling.length > 0 && (
              <div className="bg-[#0f0e0f] border border-[#c19670]/30 rounded-lg p-6 sm:p-8 mb-6">
                <h2 className="text-2xl sm:text-3xl mb-4 text-[#c19670]">{t.tarotGuide.fortuneTelling}</h2>
                <ul className="list-none p-0 space-y-2">
                  {cardInfo.fortune_telling.map((fortune, idx) => (
                    <li key={idx} className="flex">
                      <span className="text-purple-600 mr-2">•</span>
                      <span className="text-base text-[#c3beb6]">{fortune}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {cardInfo.meanings && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-[#0f0e0f] border border-[#c19670]/30 rounded-lg p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl mb-4 text-[#c19670] flex items-center gap-2">
                    <Sun size={20} /> {t.tarotGuide.lightMeanings}
                  </h2>
                  <ul className="list-none p-0 space-y-2">
                    {cardInfo.meanings.light.map((meaning, idx) => (
                      <li key={idx} className="flex">
                        <span className="text-amber-600 mr-2">•</span>
                        <span className="text-[#c3beb6] text-sm">{meaning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-[#0f0e0f] border border-[#c19670]/30 rounded-lg p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl mb-4 text-[#c19670] flex items-center gap-2">
                    <Moon size={20} /> {t.tarotGuide.shadowMeanings}
                  </h2>
                  <ul className="list-none p-0 space-y-2">
                    {cardInfo.meanings.shadow.map((meaning, idx) => (
                      <li key={idx} className="flex">
                        <span className="text-[#8a8580] mr-2">•</span>
                        <span className="text-[#c3beb6] text-sm">{meaning}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {cardInfo.archetype && (
              <div className="bg-[#0f0e0f] border border-[#c19670]/30 rounded-lg p-6 sm:p-8 mb-6">
                <h2 className="text-xl sm:text-2xl mb-3 text-[#c19670] flex items-center gap-2">
                  <User size={20} />
                  {t.tarotGuide.archetype}
                </h2>
                <p className="text-base text-[#c3beb6]">{cardInfo.archetype}</p>
              </div>
            )}

            {cardInfo.questions_to_ask.length > 0 && (
              <div className="bg-[#0f0e0f] border border-[#c19670]/30 rounded-lg p-6 sm:p-8 mb-6">
                <h2 className="text-xl sm:text-2xl mb-4 text-[#c19670]">{t.tarotGuide.questionsToAsk}</h2>
                <ul className="list-none p-0 space-y-2">
                  {cardInfo.questions_to_ask.map((q, idx) => (
                    <li key={idx} className="flex items-start">
                      <HelpCircle size={16} className="text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-base text-[#c3beb6] italic">{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(cardInfo.hebrew_alphabet || cardInfo.numerology || cardInfo.elemental) && (
              <div className="bg-[#0f0e0f] border border-[#c19670]/30 rounded-lg p-6 sm:p-8 mb-6">
                <h2 className="text-xl sm:text-2xl mb-4 text-[#c19670]">{t.tarotGuide.symbolism}</h2>
                <div className="text-base text-[#c3beb6] space-y-2">
                  {cardInfo.hebrew_alphabet && (
                    <p>
                      <strong>{t.tarotGuide.hebrewAlphabet}</strong> {cardInfo.hebrew_alphabet}
                    </p>
                  )}
                  {cardInfo.numerology && (
                    <p>
                      <strong>{t.tarotGuide.numerology}</strong> {cardInfo.numerology}
                    </p>
                  )}
                  {cardInfo.elemental && (
                    <p>
                      <strong>{t.tarotGuide.element}</strong> {cardInfo.elemental}
                    </p>
                  )}
                </div>
              </div>
            )}

            {cardInfo.mythical_spiritual && (
              <div className="bg-[#0f0e0f] border border-[#c19670]/30 rounded-lg p-6 sm:p-8 mb-6">
                <h2 className="text-xl sm:text-2xl mb-3 text-[#c19670]">{t.tarotGuide.mythicalSpiritual}</h2>
                <p className="text-base text-[#c3beb6]">{cardInfo.mythical_spiritual}</p>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
