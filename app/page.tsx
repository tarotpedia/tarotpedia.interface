'use client';
import { useState } from 'react';
import { Calendar, User, ShieldQuestion, Eye, Wand } from 'lucide-react';

import { TarotCard, TarotReading } from '@/types/tarot';
import { drawCards, getTarotReading, getNumerology } from '@/utils/api';

import TarotCardDeck from '@/components/TarotCardDeck';
import TarotCardComponent from '@/components/TarotCard';
import StyledMarkdown from '@/components/StyledMarkdown';
import CardShuffle from '@/components/CardShuffle';
import ReadingStep from '@/components/ReadingStep';
import DatePicker from '@/components/DatePicker';
import GrappleHook from '@/components/GrappleHook';
import ParallaxBackground from '@/components/ParallaxBackground';

import Footer from '@/app/footer';
import Header from '@/app/header';

export default function TarotpediaApp() {
  const [step, setStep] = useState<'form' | 'deck' | 'reading' | 'results'>('form');
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    question: '',
  });

  const [isShuffling, setIsShuffling] = useState(false);
  const [deckCards, setDeckCards] = useState<TarotCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [revealedCards, setRevealedCards] = useState<TarotCard[]>([]);
  const [reading, setReading] = useState<TarotReading | null>(null);

  const handleGetReading = async () => {
    if (!formData.name || !formData.dob || !formData.question) {
      alert('Please fill in all fields');
      return;
    }

    setStep('deck');
    setIsShuffling(true);
    setProgress(0);
    setProgressText('Shuffling the deck...');

    try {
      const response = await drawCards({
        name: formData.name,
        dob: formData.dob,
        count: 5,
        follow_numerology: false,
      });

      const shuffledCards = [...response.data.cards].sort(() => Math.random() - 0.5);
      setDeckCards(shuffledCards);
    } catch (error) {
      console.error('Error drawing cards:', error);
      alert('Failed to draw cards. Please try again.');
      setStep('form');
      setIsShuffling(false);
    }
  };

  const handleCardSelect = (card: TarotCard) => {
    if (revealedCards.some(c => c.name === card.name)) return;

    if (selectedCards.length >= 3) {
      if (selectedCards.some(c => c.name === card.name)) {
        setSelectedCards(selectedCards.filter(c => c.name !== card.name));
      }
      return;
    }

    if (selectedCards.some(c => c.name === card.name)) {
      setSelectedCards(selectedCards.filter(c => c.name !== card.name));
    } else {
      const newSelected = [...selectedCards, card];
      setSelectedCards(newSelected);

      setTimeout(() => {
        setRevealedCards(prev => [...prev, card]);
      }, 300);
    }
  };

  const handleGetInterpretation = async () => {
    if (selectedCards.length !== 3) {
      alert('Please select exactly 3 cards');
      return;
    }

    setStep('reading');
    setProgress(0);

    try {
      setProgressText('Interpreting tarot reading...');
      const tarotResponse = await getTarotReading({
        name: formData.name,
        question: formData.question,
        past_card: {
          name: selectedCards[0].name,
          is_upright: selectedCards[0].is_upright,
        },
        present_card: {
          name: selectedCards[1].name,
          is_upright: selectedCards[1].is_upright,
        },
        future_card: {
          name: selectedCards[2].name,
          is_upright: selectedCards[2].is_upright,
        },
      });

      setProgress(66);
      setProgressText('Calculating numerology insights...');

      const numerologyResponse = await getNumerology({
        name: formData.name,
        dob: formData.dob,
        question: formData.question,
      });

      setProgress(100);
      setProgressText('Reading complete');

      setReading({
        ...tarotResponse.data,
        numerology_meaning: numerologyResponse.data.numerology_meaning,
        original_cards: selectedCards,
      });

      setTimeout(() => setStep('results'), 500);
    } catch (error) {
      console.error('Error getting reading:', error);
      alert('Failed to get reading. Please try again.');
      setStep('deck');
    }
  };

  const resetReading = () => {
    setStep('form');
    setDeckCards([]);
    setSelectedCards([]);
    setRevealedCards([]);
    setIsShuffling(false);
    setReading(null);
    setFormData({ ...formData, question: '' });
    setProgress(0);
  };

  return (
    <div className="relative min-h-screen bg-[#fdfdf8] overflow-hidden">
      <ParallaxBackground />

      <div className="relative z-10 container mx-auto px-4 py-16 max-w-7xl">
        <Header />

        {/* Form Step */}
        {step === 'form' && (
          <>
            <GrappleHook />
            <div
              className="relative max-w-2xl mx-auto origin-top"
              style={{
                filter: 'blur(0px)',
                animation: 'swing 5s infinite',
                transformOrigin: 'top center',
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d',
                WebkitFontSmoothing: 'subpixel-antialiased',
                transform: 'translateZ(0)',
              }}
              onFocus={() => {
                const element = document.querySelector(
                  '.relative.max-w-2xl.mx-auto.origin-top'
                ) as HTMLElement;
                if (element) element.style.animation = 'none';
              }}
              onBlur={() => {
                const element = document.querySelector(
                  '.relative.max-w-2xl.mx-auto.origin-top'
                ) as HTMLElement;
                if (element) element.style.animation = 'swing 5s infinite';
              }}
              onFocusCapture={() => {
                const element = document.querySelector(
                  '.relative.max-w-2xl.mx-auto.origin-top'
                ) as HTMLElement;
                if (element) element.style.animation = 'none';
              }}
              onBlurCapture={() => {
                const element = document.querySelector(
                  '.relative.max-w-2xl.mx-auto.origin-top'
                ) as HTMLElement;
                if (element) element.style.animation = 'swing 5s infinite';
              }}
            >
              <style jsx>{`
                @keyframes swing {
                  0% {
                    transform: rotate(1deg);
                  }
                  50% {
                    transform: rotate(-1deg);
                  }
                  100% {
                    transform: rotate(1deg);
                  }
                }
              `}</style>

              {/* static inner container, no transform → crisp text */}
              <div className="p-10 rounded-2xl border border-amber-800/40 bg-[#fdfdf8] shadow-[0_0_60px_-10px_rgba(100,70,20,0.5)] backdrop-blur-xl text-[#3d3a2a] font-[Caudex]">
                <div className="relative z-10">
                  <h2 className="flex items-center justify-center gap-2 mb-6 text-2xl font-bold tracking-wide bg-linear-to-r from-amber-900 via-amber-600 to-amber-400 bg-clip-text text-transparent">
                    <Wand className="w-6 h-6 text-amber-900" />
                    Seek your guidance from the cards
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <label className="block mb-2 text-sm font-semibold tracking-wide text-amber-900">
                        <User className="w-4 h-4 inline-block mr-1" />
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-md border border-amber-900/30 bg-[#fdfdf8]/95 focus:border-amber-700 text-[#3d3a2a] placeholder-amber-800/50 focus:ring-0 focus:outline-none transition-all duration-200"
                        placeholder="Enter your name"
                      />
                    </div>

                    <div>
                      <label className="flex items-center gap-2 mb-2 text-sm font-semibold tracking-wide text-amber-900">
                        <Calendar className="w-4 h-4" />
                        Date of Birth
                      </label>
                      <DatePicker
                        value={formData.dob}
                        onChange={date => setFormData({ ...formData, dob: date })}
                        placeholder="Select your date of birth"
                      />
                    </div>

                    <div>
                      <label className="block mb-2 text-sm font-semibold tracking-wide text-amber-900">
                        <ShieldQuestion className="w-4 h-4 inline-block mr-1" />
                        Your Question/Problem
                      </label>
                      <textarea
                        value={formData.question}
                        onChange={e => setFormData({ ...formData, question: e.target.value })}
                        className="w-full px-4 py-3 rounded-md border border-amber-900/30 bg-[#fdfdf8]/95 focus:border-amber-700 text-[#3d3a2a] placeholder-amber-800/50 focus:ring-0 focus:outline-none resize-none transition-all duration-200"
                        placeholder="What guidance do you seek?"
                        rows={4}
                      />
                    </div>

                    <button
                      onClick={handleGetReading}
                      className="w-full py-3 mt-4 rounded-md bg-linear-to-br from-amber-900 via-amber-800 to-amber-600 text-[#fdfaf4] font-semibold tracking-wide shadow-md hover:shadow-lg hover:shadow-amber-900/40 hover:from-amber-800 hover:to-amber-600 hover:cursor-pointer transition-all duration-300 flex items-center justify-center gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Draw My Deck
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Deck Selection Step */}
        {step === 'deck' && (
          <div className="space-y-6 z-20 relative">
            {isShuffling ? (
              <CardShuffle
                onComplete={() => {
                  setIsShuffling(false);
                  setProgressText('Deck ready! Select 3 cards...');
                  setProgress(100);
                }}
              />
            ) : (
              <>
                <div className="text-center delay-300 duration-1000 ease-in-out">
                  <h2 className="text-2xl font-bold text-[#3d3a2a] mb-2">
                    Select Your Three Cards
                  </h2>
                  <p className="text-[#3d3a2a] mb-1">{selectedCards.length}/3 cards selected</p>
                  <p className="text-[#3d3a2a] text-sm">
                    Click on a card to select it. The card will reveal itself when chosen.
                  </p>
                </div>

                <TarotCardDeck
                  cards={deckCards}
                  onCardSelect={handleCardSelect}
                  selectedCards={selectedCards}
                  revealedCards={revealedCards}
                />
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => {
                      setStep('form');
                      setSelectedCards([]);
                      setRevealedCards([]);
                    }}
                    className="px-6 py-3 hover:bg-gray-800 hover:text-gray-50 rounded-lg text-[#3d3a2a] transition-colors border border-gray-800"
                  >
                    ← Back
                  </button>
                  <button
                    onClick={handleGetInterpretation}
                    disabled={selectedCards.length !== 3}
                    className="px-8 py-3 bg-linear-to-r from-amber-900 to-amber-800 hover:from-amber-800 hover:to-amber-700 rounded-lg text-gray-100 hover:cursor-pointer font-medium transition-all disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-amber-900/50"
                  >
                    Reading
                  </button>
                </div>
              </>
            )}
          </div>
        )}

        {/* Loading Step */}
        {step === 'reading' && <ReadingStep progress={progress} progressText={progressText} />}

        {/* Results Step */}
        {step === 'results' && reading && (
          <div className="space-y-6 mx-auto">
            {/* Numerology Section */}
            {reading.numerology_meaning && (
              <div className="max-w-5xl mx-auto backdrop-blur-sm rounded-2xl p-8 border border-amber-900/30">
                <h2 className="text-xl font-bold text-[#3d3a2a] mb-4 flex items-center justify-center gap-2">
                  Numerology
                </h2>
                <StyledMarkdown content={reading.numerology_meaning} />
              </div>
            )}

            {/* Cards Section */}
            <div className="max-w-7xl mx-auto">
              <h2 className="text-2xl font-bold text-center text-[#3d3a2a] mb-6">
                Your Tarot Card Deck
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                {['Past', 'Present', 'Future'].map((position, idx) => (
                  <div key={position}>
                    <h3 className="text-lg font-semibold text-center text-[#3d3a2a] mb-3 uppercase tracking-wide">
                      {position}
                    </h3>
                    {selectedCards[idx] && reading.interpretations[idx] && (
                      <>
                        <TarotCardComponent card={selectedCards[idx]} />
                        <div className="mt-4 p-5">
                          <StyledMarkdown content={reading.interpretations[idx].meaning} />
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div className="backdrop-blur-sm rounded-2xl p-8 border border-amber-900/30">
                <h3 className="text-xl font-bold text-[#3d3a2a] mb-4 flex items-center justify-center gap-2">
                  Overall Reading
                </h3>
                <StyledMarkdown content={reading.summary} />
              </div>

              {/* Reset Button */}
              <div className="text-center mt-12">
                <button
                  onClick={resetReading}
                  className="px-8 py-3 rounded-lg bg-amber-700 hover:cursor-pointer text-gray-100 font-medium transition-all hover:shadow-lg hover:shadow-amber-900/50"
                >
                  New Reading (Start Over)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
