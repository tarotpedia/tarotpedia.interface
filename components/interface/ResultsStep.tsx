'use client';
import StyledMarkdown from '@/components/common/StyledMarkdown';
import TarotCardComponent from '@/components/common/TarotCard';
import { useTarot } from '@/context/TarotContext';

export default function ResultsStep() {
  const { reading, selectedCards, resetReading } = useTarot();
  if (!reading) return null;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="space-y-6 mx-auto">
      {/* Numerology Section */}
      {reading.numerology_meaning && (
        <div className="max-w-5xl mx-auto backdrop-blur-sm rounded-2xl p-8 border border-[#c19670]/30">
          <h2 className="text-2xl font-bold text-center text-[#c19670] mb-4">Numerology Insight</h2>
          <StyledMarkdown content={reading.numerology_meaning} />
        </div>
      )}

      {/* Cards Section */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-[#c19670] mb-6">Your Tarot Card Deck</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {['Past', 'Present', 'Future'].map((position, idx) => (
            <div key={position}>
              <h3 className="text-lg font-semibold text-center text-[#c3beb6] mb-3 uppercase tracking-wide">
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
        <div className="backdrop-blur-sm rounded-2xl p-8 border border-[#c19670]/30">
          <h3 className="text-xl font-bold text-[#c19670] mb-4 flex items-center justify-center gap-2">
            Overall Reading
          </h3>
          <StyledMarkdown content={reading.summary} />
        </div>

        {/* Reset Button */}
        <div className="text-center mt-12">
          <button
            onClick={resetReading}
            className="px-8 py-3 rounded-lg bg-[#c19670] hover:cursor-pointer text-[#060506] font-bold transition-all hover:shadow-lg hover:shadow-[#c19670]/50"
          >
            New Reading (Start Over)
          </button>
        </div>
      </div>
    </div>
  );
}
