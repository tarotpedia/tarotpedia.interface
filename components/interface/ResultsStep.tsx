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

  return (
    <div className="min-h-[600px] py-8">
      <div className="space-y-6 mx-auto px-2 sm:px-4">
        <div className="space-y-6">
          {reading.numerology_meaning && (
            <div
              className="max-w-5xl mx-auto backdrop-blur-sm rounded-2xl p-4 sm:p-6 md:p-8 border border-[#c19670]/30 animate-fade-in"
              style={{
                animationDelay: '0.2s',
                animationFillMode: 'both',
              }}
            >
              <h2 className="text-xl sm:text-2xl text-center text-[#c19670] mb-4">{t.results.numerologyInsight}</h2>
              <StyledMarkdown content={reading.numerology_meaning} />
            </div>
          )}

          <div className="max-w-7xl mx-auto">
            <h2
              className="text-xl sm:text-2xl text-center text-[#c19670] mb-6 animate-fade-in"
              style={{
                animationDelay: reading.numerology_meaning ? '0.3s' : '0.1s',
                animationFillMode: 'both',
              }}
            >
              {t.results.yourDeck}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-6">
              {['past', 'present', 'future'].map((position, idx) => (
                <div key={position}>
                  <h3
                    className="text-base sm:text-lg text-center text-[#c3beb6] mb-3 uppercase tracking-wide animate-fade-in"
                    style={{
                      animationDelay: `${reading.numerology_meaning ? 0.4 + idx * 0.15 : 0.2 + idx * 0.15}s`,
                      animationFillMode: 'both',
                    }}
                  >
                    {t.results.positions[position as keyof typeof t.results.positions]}
                  </h3>
                  {selectedCards[idx] && reading.interpretations[idx] && (
                    <>
                      <div
                        className="animate-fade-in"
                        style={{
                          animationDelay: `${reading.numerology_meaning ? 0.5 + idx * 0.2 : 0.3 + idx * 0.2}s`,
                          animationFillMode: 'both',
                        }}
                      >
                        <TarotCardComponent card={selectedCards[idx]} />
                      </div>
                      <div
                        className="mt-4 p-3 sm:p-5 animate-fade-in"
                        style={{
                          animationDelay: `${reading.numerology_meaning ? 0.6 + idx * 0.2 : 0.4 + idx * 0.2}s`,
                          animationFillMode: 'both',
                        }}
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
              style={{
                animationDelay: reading.numerology_meaning ? '1.2s' : '1.0s',
                animationFillMode: 'both',
              }}
            >
              <h3 className="text-lg sm:text-xl text-[#c19670] mb-4 flex items-center justify-center gap-2">
                {t.results.overallReading}
              </h3>
              <StyledMarkdown content={reading.summary} />
            </div>
          </div>

          <div
            className="flex items-center justify-center mt-8 pb-12 animate-fade-in"
            style={{
              animationDelay: reading.numerology_meaning ? '1.4s' : '1.2s',
              animationFillMode: 'both',
            }}
          >
            <Button
              onClick={resetReading}
              className="px-6 sm:px-8 py-6 rounded-md bg-gradient-to-br from-[#1a1819] to-[#0f0e0f] text-[#c19670] tracking-wide border border-[#c19670]/30 shadow-[0_0_15px_0_rgba(193,150,112,0.2)] hover:shadow-[0_0_25px_0_rgba(193,150,112,0.4)] hover:scale-[1.01] hover:cursor-pointer transition-all duration-300 group relative overflow-hidden"
            >
              <span className="absolute inset-0 bg-gradient-to-br from-[#c19670]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="relative z-10">{t.results.newReading}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
