'use client';
import { TarotStar } from '@/components/icons/TarotStar';
import { Button } from '@/components/ui/button';
import { useTarot } from '@/context/TarotContext';
import { useI18n } from '@/lib/i18n';

import { AlertCircle } from 'lucide-react';

export default function ConfirmStep() {
  const { t } = useI18n();
  const { setStep } = useTarot();

  const handleViewResults = () => {
    setStep('results');
  };

  window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="min-h-[600px] flex items-center justify-center px-4 py-8 sm:py-8">
      <div className="max-w-xl w-full">
        <div
          className="backdrop-blur-sm rounded-2xl p-4 sm:p-8 md:p-10 border border-[#c19670]/30 bg-[#0f0e0f]/80 shadow-[0_0_60px_-10px_rgba(193,150,112,0.3)] animate-fade-in"
          style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
        >
          <div className="text-center space-y-4 sm:space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-[#c19670]/20 rounded-full blur-xl animate-pulse" />
                <div className="relative bg-[#c19670]/10 rounded-full p-3 sm:p-4 border border-[#c19670]/30">
                  <TarotStar className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-[#c19670]" />
                </div>
              </div>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl text-[#c19670] tracking-wide px-2">{t.confirm.title}</h2>

            <p className="text-[#c3beb6] text-sm sm:text-base md:text-lg leading-relaxed px-2">
              {t.confirm.description}
            </p>

            <div className="bg-[#c19670]/5 border border-[#c19670]/20 rounded-lg p-3 sm:p-4 md:p-6">
              <div className="flex items-start gap-2 sm:gap-3">
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-[#c19670]/70 flex-shrink-0 mt-0.5" />
                <p className="text-[#c19670]/70 text-xs sm:text-sm md:text-base text-left italic">
                  {t.confirm.disclaimer}
                </p>
              </div>
            </div>

            <div className="pt-2 sm:pt-4 flex justify-center">
              <Button
                onClick={handleViewResults}
                className="w-full sm:w-auto px-6 sm:px-8 py-6 rounded-md bg-linear-to-br from-[#1a1819] to-[#0f0e0f] text-[#c19670] tracking-wide border border-[#c19670]/30 shadow-[0_0_15px_0_rgba(193,150,112,0.2)] hover:shadow-[0_0_25px_0_rgba(193,150,112,0.4)] hover:scale-[1.01] hover:cursor-pointer transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-linear-to-br from-[#c19670]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <TarotStar className="w-4 h-4 sm:w-5 sm:h-5 text-[#c19670] relative z-10" />
                <span className="relative z-10">{t.confirm.button}</span>
                <TarotStar className="w-4 h-4 sm:w-5 sm:h-5 text-[#c19670] relative z-10" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
