'use client';
import DatePicker from '@/components/common/DatePicker';
import GrappleHook from '@/components/common/GrappleHook';
import { useTarot } from '@/context/TarotContext';
import { drawCards } from '@/lib/api';

import { Calendar, Eye, ShieldQuestion, User } from 'lucide-react';
import { toast } from 'sonner';

export default function FormStep() {
  const {
    formData,
    setFormData,
    showQuestionHint,
    setShowQuestionHint,
    setStep,
    setIsShuffling,
    setProgress,
    setProgressText,
    setDeckCards,
  } = useTarot();

  const handleGetReading = async () => {
    if (!formData.name || !formData.dob || !formData.question) {
      toast.warning('Please fill in all fields');
      return;
    }

    if (formData.question.trim().length < 20) {
      setShowQuestionHint(true);
      return;
    }

    setShowQuestionHint(false);
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
      toast.warning('Failed to draw cards. Please try again.');
      setStep('form');
      setIsShuffling(false);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes swing {
            0% { transform: rotate(1deg); }
            50% { transform: rotate(-1deg); }
            100% { transform: rotate(1deg); }
          }
        `}
      </style>
      <GrappleHook />
      <div
        className="relative max-w-2xl mx-auto origin-top animate-swing"
        tabIndex={-1}
        style={{
          filter: 'blur(0px)',
          animation: 'swing 5s infinite',
          transformOrigin: 'top center',
          backfaceVisibility: 'hidden',
          transformStyle: 'preserve-3d',
          WebkitFontSmoothing: 'subpixel-antialiased',
          transform: 'translateZ(0)',
        }}
      >
        <div className="p-6 sm:p-10 rounded-2xl border border-amber-800/40 bg-[#fdfdf8] shadow-[0_0_60px_-10px_rgba(100,70,20,0.5)] backdrop-blur-xl text-[#3d3a2a] font-[Caudex]">
          <div className="relative z-10">
            <h2 className="flex flex-col items-center justify-center gap-2 mb-6 text-lg sm:text-2xl font-bold tracking-wide bg-linear-to-r from-amber-900 via-amber-600 to-amber-400 bg-clip-text text-transparent text-center">
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
                {showQuestionHint && (
                  <p className="mt-2 text-amber-700 text-sm italic justify-center flex items-center gap-2">
                    The mystical universe doesn't understand short problems. Please be more clarifying.
                  </p>
                )}
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
  );
}
