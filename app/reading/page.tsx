'use client';

import Footer from '@/app/footer';
import Navbar from '@/components/common/Navbar';
import ParallaxBackground from '@/components/common/ParallaxBackground';
import StyledMarkdown from '@/components/common/StyledMarkdown';
import TarotCardComponent from '@/components/common/TarotCard';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/lib/i18n';

import { Suspense, useEffect, useState } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

interface CardInterpretation {
  card_name: string;
  position: string;
  orientation: string;
  meaning: string;
}

interface ReadingCard {
  position: string;
  card_name: string;
  is_upright: boolean;
  image_url: string;
  full_card_name: string;
}

interface SavedReading {
  reading_id: string;
  user_name: string;
  user_dob: string;
  question: string;
  cards: ReadingCard[];
  interpretations: CardInterpretation[];
  summary: string;
  numerology_meaning?: string;
  created_at: string;
}

function ReadingContent() {
  const { t } = useI18n();
  const router = useRouter();
  const searchParams = useSearchParams();
  const readingId = searchParams.get('read_id');

  const [reading, setReading] = useState<SavedReading | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!readingId) {
      setError('No reading ID provided');
      setLoading(false);
      return;
    }

    const fetchReading = async () => {
      try {
        const response = await fetch(`/api/readings/${readingId}`);

        if (!response.ok) {
          throw new Error('Reading not found');
        }

        const data = await response.json();
        setReading(data);
        setLoading(false);

        setTimeout(() => {
          setShowContent(true);
        }, 100);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load reading');
        setLoading(false);
      }
    };

    fetchReading();
  }, [readingId]);

  if (loading) {
    return (
      <div className="relative bg-[#060506] min-h-screen flex flex-col">
        <ParallaxBackground />
        <Navbar />
        <div className="relative flex-1 z-10 flex items-center justify-center">
          <div className="text-[#c19670] text-xl">{t.results?.loading || 'Loading...'}</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !reading) {
    return (
      <div className="relative bg-[#060506] min-h-screen flex flex-col">
        <ParallaxBackground />
        <Navbar />
        <div className="relative flex-1 z-10 flex flex-col items-center justify-center gap-4">
          <div className="text-[#c19670] text-xl">{error || 'Reading not found'}</div>
          <Button
            onClick={() => router.push('/')}
            className="px-6 py-3 rounded-md bg-gradient-to-br from-[#1a1819] to-[#0f0e0f] text-[#c19670] border border-[#c19670]/30"
          >
            {t.results?.newReading || 'New Reading'}
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const positionOrder = ['past', 'present', 'future'];
  const sortedCards = [...reading.cards].sort(
    (a, b) => positionOrder.indexOf(a.position) - positionOrder.indexOf(b.position)
  );

  return (
    <div className="relative bg-[#060506] min-h-screen flex flex-col">
      <ParallaxBackground />
      <Navbar />
      <div className="relative flex-1 z-10">
        <div className="min-h-[600px] py-8">
          <div className="max-w-7xl mx-auto px-4">
            <div className="space-y-6">
              {reading.numerology_meaning && (
                <div
                  className="backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-[#c19670]/30 transition-all duration-700 ease-out"
                  style={{
                    opacity: showContent ? 1 : 0,
                    transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: '0.2s',
                  }}
                >
                  <h2 className="text-xl sm:text-2xl text-center text-[#c19670] mb-4">
                    {t.results?.numerologyInsight || 'Numerology Insight'}
                  </h2>
                  <StyledMarkdown content={reading.numerology_meaning} />
                </div>
              )}

              <div>
                <h2
                  className="text-xl sm:text-2xl text-center text-[#c19670] mb-6 transition-all duration-700 ease-out"
                  style={{
                    opacity: showContent ? 1 : 0,
                    transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: reading.numerology_meaning ? '0.3s' : '0.1s',
                  }}
                >
                  {t.results?.yourDeck || 'Your Deck'}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
                  {sortedCards.map((card, idx) => {
                    const interpretation = reading.interpretations.find(i => i.position === card.position);
                    return (
                      <div key={card.position}>
                        <h3
                          className="text-base sm:text-lg text-center text-[#c3beb6] mb-3 uppercase tracking-wide transition-all duration-700 ease-out"
                          style={{
                            opacity: showContent ? 1 : 0,
                            transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                            transitionDelay: `${reading.numerology_meaning ? 0.4 + idx * 0.15 : 0.2 + idx * 0.15}s`,
                          }}
                        >
                          {t.results?.positions?.[card.position as keyof typeof t.results.positions] || card.position}
                        </h3>
                        <div
                          className="transition-all duration-700 ease-out"
                          style={{
                            opacity: showContent ? 1 : 0,
                            transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                            transitionDelay: `${reading.numerology_meaning ? 0.5 + idx * 0.2 : 0.3 + idx * 0.2}s`,
                          }}
                        >
                          <TarotCardComponent
                            card={{
                              name: card.card_name,
                              is_upright: card.is_upright,
                              image_url: card.image_url,
                              full_card_name: card.full_card_name,
                            }}
                          />
                        </div>
                        {interpretation && (
                          <div
                            className="mt-4 p-3 sm:p-5 transition-all duration-700 ease-out"
                            style={{
                              opacity: showContent ? 1 : 0,
                              transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                              transitionDelay: `${reading.numerology_meaning ? 0.6 + idx * 0.2 : 0.4 + idx * 0.2}s`,
                            }}
                          >
                            <StyledMarkdown content={interpretation.meaning} />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div
                  className="backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-[#c19670]/30 transition-all duration-700 ease-out"
                  style={{
                    opacity: showContent ? 1 : 0,
                    transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                    transitionDelay: reading.numerology_meaning ? '1.2s' : '1.0s',
                  }}
                >
                  <h3 className="text-lg sm:text-xl text-[#c19670] mb-4 flex items-center justify-center gap-2">
                    {t.results?.overallReading || 'Overall Reading'}
                  </h3>
                  <StyledMarkdown content={reading.summary} />
                </div>
              </div>

              <div
                className="flex items-center justify-center mt-8 pb-12 transition-all duration-700 ease-out"
                style={{
                  opacity: showContent ? 1 : 0,
                  transform: showContent ? 'translateY(0)' : 'translateY(20px)',
                  transitionDelay: reading.numerology_meaning ? '1.4s' : '1.2s',
                }}
              >
                <Button
                  onClick={() => router.push('/')}
                  className="px-6 sm:px-8 py-6 rounded-md bg-gradient-to-br from-[#1a1819] to-[#0f0e0f] text-[#c19670] tracking-wide border border-[#c19670]/30 shadow-[0_0_15px_0_rgba(193,150,112,0.2)] hover:shadow-[0_0_25px_0_rgba(193,150,112,0.4)] hover:scale-[1.01] hover:cursor-pointer transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="absolute inset-0 bg-gradient-to-br from-[#c19670]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                  <span className="relative z-10">{t.results?.newReading || 'New Reading'}</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default function ReadingPage() {
  const { t } = useI18n();

  return (
    <Suspense
      fallback={
        <div className="relative bg-[#060506] min-h-screen flex flex-col">
          <ParallaxBackground />
          <Navbar />
          <div className="relative flex-1 z-10 flex items-center justify-center">
            <div className="text-[#c19670] text-xl">Loading...</div>
          </div>
          <Footer />
        </div>
      }
    >
      <ReadingContent />
    </Suspense>
  );
}
