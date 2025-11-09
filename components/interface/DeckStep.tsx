'use client';
import CardShuffle from '@/components/common/CardShuffle';
import TarotCardDeck from '@/components/common/TarotCardDeck';
import { useTarot } from '@/context/TarotContext';
import { useCardSelection } from '@/hooks/useCardSelection';
import { useReadingInterpretation } from '@/hooks/useReadingInterpretation';

export default function DeckStep() {
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

  return (
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
            <h2 className="text-2xl font-bold text-[#3d3a2a] mb-2">Select Your Three Cards</h2>
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
  );
}
