'use client';
import CardShuffle from '@/components/common/CardShuffle';
import TarotCardDeck from '@/components/common/TarotCardDeck';
import { useTarot } from '@/context/TarotContext';
import { useCardSelection } from '@/hooks/useCardSelection';
import { useReadingInterpretation } from '@/hooks/useReadingInterpretation';
import { useI18n } from '@/lib/i18n';

export default function DeckStep() {
  const { t } = useI18n();
  const {
    isShuffling,
    setIsShuffling,
    setProgressText,
    setProgress,
    deckCards,
    selectedCards,
    revealedCards,
    setStep,
    setSelectedCards,
    setRevealedCards,
  } = useTarot();

  const { handleCardSelect } = useCardSelection();
  const { handleGetInterpretation } = useReadingInterpretation();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  return (
    <div className="min-h-[600px] flex items-center justify-center">
      <div className="space-y-6 z-20 relative px-2 sm:px-4 w-full">
        {isShuffling ? (
          <CardShuffle
            onComplete={() => {
              setIsShuffling(false);
              setProgressText(t.form.progress.deckReady);
              setProgress(100);
            }}
          />
        ) : (
          <>
            <div className="text-center delay-300 duration-1000 ease-in-out">
              <h2 className="text-xl sm:text-2xl text-[#c19670]/90 mb-2">{t.deck.title}</h2>
              <p className="text-base sm:text-lg text-[#c19670]/80 mb-1">
                {selectedCards.length}/3 {t.deck.selected}
              </p>
              <p className="text-[#c19670]/70 text-xs sm:text-sm px-4">{t.deck.instruction}</p>
            </div>

            <TarotCardDeck
              cards={deckCards}
              onCardSelect={handleCardSelect}
              selectedCards={selectedCards}
              revealedCards={revealedCards}
            />

            <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 px-4">
              <button
                onClick={() => {
                  setStep('form');
                  setSelectedCards([]);
                  setRevealedCards([]);
                }}
                className="px-6 py-3 text-sm sm:text-base rounded-md text-[#c19670]/70 hover:text-[#c19670] border border-[#c19670]/20 hover:border-[#c19670]/40 bg-[#1a1819]/50 hover:bg-[#1a1819] transition-all duration-300 w-full sm:w-auto"
              >
                {t.deck.back}
              </button>
              <button
                onClick={handleGetInterpretation}
                disabled={selectedCards.length !== 3}
                className="px-6 sm:px-8 py-6 rounded-md bg-gradient-to-br from-[#1a1819] to-[#0f0e0f] text-[#c19670] tracking-wide border border-[#c19670]/30 shadow-[0_0_15px_0_rgba(193,150,112,0.2)] hover:shadow-[0_0_25px_0_rgba(193,150,112,0.4)] hover:scale-[1.01] hover:cursor-pointer transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-[0_0_15px_0_rgba(193,150,112,0.2)] w-full sm:w-auto group relative overflow-hidden"
              >
                <span className="absolute inset-0 bg-gradient-to-br from-[#c19670]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative z-10">{t.deck.reading}</span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
