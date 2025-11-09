'use client';
import StyledMarkdown from '@/components/common/StyledMarkdown';
import TarotCardComponent from '@/components/common/TarotCard';
import { useTarot } from '@/context/TarotContext';

export default function ResultsStep() {
  const { reading, selectedCards, resetReading } = useTarot();

  if (!reading) return null;

  return (
    <div className="space-y-6 mx-auto">
      {/* Numerology Section */}
      {reading.numerology_meaning && (
        <div className="max-w-5xl mx-auto backdrop-blur-sm rounded-2xl p-8 border border-amber-900/30">
          <h2 className="text-xl font-bold text-[#3d3a2a] mb-4 flex items-center justify-center gap-2">Numerology</h2>
          <StyledMarkdown content={reading.numerology_meaning} />
        </div>
      )}

      {/* Cards Section */}
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-[#3d3a2a] mb-6">Your Tarot Card Deck</h2>

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
  );
}
