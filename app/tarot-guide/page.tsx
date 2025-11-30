'use client';
import Footer from '@/app/footer';
import Navbar from '@/components/common/Navbar';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { getCardInfo } from '@/lib/api';
import { useI18n } from '@/lib/i18n';
import { BASE_API_URL } from '@/lib/variables';

import { useEffect, useState } from 'react';

import { HelpCircle, Moon, Sun, User, X } from 'lucide-react';

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

export default function TarotGuidePage() {
  const { t } = useI18n();
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [cardInfo, setCardInfo] = useState<CardInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '0px';
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [open]);

  const handleCardClick = async (cardNumber: number): Promise<void> => {
    setError(null);
    setSelectedCard(cardNumber);
    setCardInfo(null);
    try {
      const response = await getCardInfo(cardNumber);
      setCardInfo(response.data);
      setOpen(true);
    } catch (err) {
      console.error('Error fetching card info:', err);
      setError('Failed to load card information. Please try again.');
    }
  };

  const closeModal = (): void => {
    setOpen(false);
    setSelectedCard(null);
    setCardInfo(null);
    setError(null);
  };

  return (
    <>
      <div className="relative bg-[#060506] min-h-screen flex flex-col">
        <Navbar />
        <div className="relative flex-1 z-10 container mx-auto px-4 sm:py-8 py-8 max-w-7xl">
          <section className="text-center mb-12">
            <h1 className="text-4xl text-white mb-4">{t.tarotGuide.title}</h1>
            <p className="text-[#c3beb6] max-w-4xl mx-auto">{t.tarotGuide.subtitle}</p>
            <p className="text-gray-400 max-w-4xl mx-auto mt-4 text-sm italic">{t.tarotGuide.note}</p>
          </section>
          <section className="mb-12">
            <div className="mb-8">
              <h2 className="text-2xl text-[#c19670] mb-4 justify-center flex">{t.tarotGuide.majorArcana}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {Array.from({ length: 22 }, (_, i) => i + 1).map(cardNumber => (
                  <div
                    key={cardNumber}
                    onClick={() => handleCardClick(cardNumber)}
                    className="group relative overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:z-10 bg-gray-200"
                  >
                    <img
                      src={`${BASE_API_URL}/tarot-cards/images/${cardNumber}.jpg`}
                      alt={`Tarot Card ${cardNumber}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl text-[#c19670] mb-4 justify-center flex">{t.tarotGuide.minorArcana}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
                {Array.from({ length: 56 }, (_, i) => i + 23).map(cardNumber => (
                  <div
                    key={cardNumber}
                    onClick={() => handleCardClick(cardNumber)}
                    className="group relative overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:z-10 bg-gray-200"
                  >
                    <img
                      src={`${BASE_API_URL}/tarot-cards/images/${cardNumber}.jpg`}
                      alt={`Tarot Card ${cardNumber}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        <Footer />
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="!max-w-6xl w-[95vw] max-h-[90vh] overflow-hidden p-0 bg-[#0f0e0f] border-[#2a2729] !top-[2rem] sm:!top-[50%] !translate-y-0 sm:!-translate-y-1/2"
          showCloseButton={false}
        >
          {cardInfo && (
            <>
              <DialogTitle className="sr-only">
                {cardInfo.name} - {t.tarotGuide.cardDetails}
              </DialogTitle>

              <button
                onClick={closeModal}
                className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 p-1.5 sm:p-2 bg-[#c19670]/90 hover:bg-[#c19670] rounded-full transition-all hover:scale-110"
              >
                <X size={18} className="sm:w-5 sm:h-5" />
              </button>

              <div className="overflow-y-auto max-h-[90vh]">
                <div className="p-4 sm:p-6 md:p-8 border-b border-[#2a2729]">
                  <div className="flex gap-4 sm:gap-6 md:gap-8 flex-wrap">
                    <div className="w-24 sm:w-32 md:w-48 flex-shrink-0 mx-auto sm:mx-0">
                      <div className="rounded-md shadow-md bg-[#1a1819] flex items-center justify-center overflow-hidden">
                        <img
                          src={`${BASE_API_URL}/tarot-cards/images/${selectedCard?.toString()}.jpg`}
                          alt={cardInfo.name}
                          className="w-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="flex-1 min-w-0 text-center sm:text-left">
                      <div className="text-xs uppercase tracking-wider text-[#8a8580] mb-2">{cardInfo.arcana}</div>
                      <h3 className="text-2xl sm:text-3xl md:text-4xl mb-2 text-[#c19670]">{cardInfo.name}</h3>
                      <div className="text-base sm:text-lg text-[#c3beb6] mb-4">
                        {t.tarotGuide.cardNumber} {selectedCard?.toString()}
                      </div>
                      <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                        {cardInfo.keywords.map((keyword, idx) => (
                          <span
                            key={idx}
                            className="px-2 sm:px-3 py-1 bg-[#1a1819] rounded-full text-xs sm:text-sm text-[#c3beb6]"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 md:p-8">
                  {cardInfo.fortune_telling.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xl sm:text-2xl mb-3 text-[#c19670]">{t.tarotGuide.fortuneTelling}</h4>
                      <ul className="list-none p-0">
                        {cardInfo.fortune_telling.map((fortune, idx) => (
                          <li key={idx} className="flex mb-2">
                            <span className="text-purple-600 mr-2">•</span>
                            <span className="text-sm sm:text-base text-[#c3beb6]">{fortune}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {cardInfo.meanings && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6">
                      <div className="bg-[#1a1819] p-4 sm:p-6 rounded-md">
                        <h4 className="text-lg sm:text-xl mb-3 text-[#c19670] flex items-center gap-2">
                          <Sun size={18} className="sm:w-5 sm:h-5" /> {t.tarotGuide.lightMeanings}
                        </h4>
                        <ul className="list-none p-0">
                          {cardInfo.meanings.light.map((meaning, idx) => (
                            <li key={idx} className="flex mb-2">
                              <span className="text-amber-600 mr-2">•</span>
                              <span className="text-[#c3beb6] text-xs sm:text-sm">{meaning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-[#1a1819] p-4 sm:p-6 rounded-md">
                        <h4 className="text-lg sm:text-xl mb-3 text-[#c19670] flex items-center gap-2">
                          <Moon size={18} className="sm:w-5 sm:h-5" /> {t.tarotGuide.shadowMeanings}
                        </h4>
                        <ul className="list-none p-0">
                          {cardInfo.meanings.shadow.map((meaning, idx) => (
                            <li key={idx} className="flex mb-2">
                              <span className="text-[#8a8580] mr-2">•</span>
                              <span className="text-[#c3beb6] text-xs sm:text-sm">{meaning}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {cardInfo.archetype && (
                    <div className="bg-[#1a1819] p-4 sm:p-6 rounded-md mb-6">
                      <h4 className="text-lg sm:text-xl mb-2 text-[#c19670] flex items-center gap-2">
                        <User size={18} className="sm:w-5 sm:h-5" />
                        {t.tarotGuide.archetype}
                      </h4>
                      <p className="text-sm sm:text-base text-[#c3beb6]">{cardInfo.archetype}</p>
                    </div>
                  )}

                  {cardInfo.questions_to_ask.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-xl sm:text-2xl mb-3 text-[#c19670]">{t.tarotGuide.questionsToAsk}</h4>
                      <ul className="list-none p-0">
                        {cardInfo.questions_to_ask.map((q, idx) => (
                          <li key={idx} className="flex mb-2 items-start">
                            <HelpCircle size={14} className="sm:w-4 sm:h-4 text-indigo-600 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-sm sm:text-base text-[#c3beb6] italic">{q}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(cardInfo.hebrew_alphabet || cardInfo.numerology || cardInfo.elemental) && (
                    <div className="bg-[#1a1819] p-4 sm:p-6 rounded-md mb-6">
                      <h4 className="text-lg sm:text-xl mb-3 text-[#c19670]">{t.tarotGuide.symbolism}</h4>
                      <div className="text-sm sm:text-base text-[#c3beb6]">
                        {cardInfo.hebrew_alphabet && (
                          <p className="mb-2">
                            <strong>{t.tarotGuide.hebrewAlphabet}</strong> {cardInfo.hebrew_alphabet}
                          </p>
                        )}
                        {cardInfo.numerology && (
                          <p className="mb-2">
                            <strong>{t.tarotGuide.numerology}</strong> {cardInfo.numerology}
                          </p>
                        )}
                        {cardInfo.elemental && (
                          <p className="mb-2">
                            <strong>{t.tarotGuide.element}</strong> {cardInfo.elemental}
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {cardInfo.mythical_spiritual && (
                    <div>
                      <h4 className="text-lg sm:text-xl mb-2 text-[#c19670]">{t.tarotGuide.mythicalSpiritual}</h4>
                      <p className="text-sm sm:text-base text-[#c3beb6]">{cardInfo.mythical_spiritual}</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
