'use client';
import StyledMarkdown from '@/components/common/StyledMarkdown';
import TarotCardComponent from '@/components/common/TarotCard';
import { Button } from '@/components/ui/button';
import { useTarot } from '@/context/TarotContext';
import { useI18n } from '@/lib/i18n';

export default function ResultsStep() {
  const { t } = useI18n();
  const { reading, selectedCards, resetReading } = useTarot();

  if (!reading) return null;
  window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="space-y-6 mx-auto px-2 sm:px-4">
      <div className="space-y-6">
        {reading.numerology_meaning && (
          <div
            className="max-w-5xl mx-auto backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-[#c19670]/30 animate-fade-in"
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            <h2 className="text-xl sm:text-2xl text-center text-[#c19670] mb-4">{t.results.numerologyInsight}</h2>
            <StyledMarkdown content={reading.numerology_meaning} />
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          <h2 className="text-xl sm:text-2xl text-center text-[#c19670] mb-6">{t.results.yourDeck}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
            {['past', 'present', 'future'].map((position, idx) => (
              <div key={position}>
                <h3 className="text-base sm:text-lg text-center text-[#c3beb6] mb-3 uppercase tracking-wide">
                  {t.results.positions[position as keyof typeof t.results.positions]}
                </h3>
                {selectedCards[idx] && reading.interpretations[idx] && (
                  <>
                    <TarotCardComponent card={selectedCards[idx]} />
                    <div
                      className="mt-4 p-3 sm:p-5 animate-fade-in"
                      style={{ animationDelay: `${0.5 + idx * 0.3}s`, animationFillMode: 'both' }}
                    >
                      <StyledMarkdown content={reading.interpretations[idx].meaning} />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          <div
            className="backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-[#c19670]/30 animate-fade-in"
            style={{ animationDelay: '1.5s', animationFillMode: 'both' }}
          >
            <h3 className="text-lg sm:text-xl text-[#c19670] mb-4 flex items-center justify-center gap-2">
              {t.results.overallReading}
            </h3>
            <StyledMarkdown content={reading.summary} />
          </div>
        </div>

        <div className="text-center mt-8 pb-4 px-4">
          <p className="text-[#c19670]/40 text-xs sm:text-sm italic">{t.results.aiDisclaimer}</p>
        </div>
      </div>

      <div className="flex items-center justify-center mt-8 pb-12">
        <Button
          onClick={resetReading}
          className="px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base rounded-md bg-[#c19670] hover:cursor-pointer text-[#060506] transition-all hover:shadow-lg hover:shadow-[#c19670]/50 hover:bg-[#c19670]/90"
        >
          {t.results.newReading}
        </Button>
      </div>
    </div>
  );
}
