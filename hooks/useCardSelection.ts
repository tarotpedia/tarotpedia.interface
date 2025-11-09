import { useTarot } from '@/context/TarotContext';
import { TarotCard } from '@/types/tarot';

export function useCardSelection() {
  const { selectedCards, setSelectedCards, revealedCards, setRevealedCards } = useTarot();

  const handleCardSelect = (card: TarotCard) => {
    // Don't allow selecting already revealed cards
    if (revealedCards.some(c => c.name === card.name)) return;

    // If 3 cards are already selected
    if (selectedCards.length >= 3) {
      // Only allow deselecting
      if (selectedCards.some(c => c.name === card.name)) {
        setSelectedCards(selectedCards.filter(c => c.name !== card.name));
      }
      return;
    }

    // Toggle selection
    if (selectedCards.some(c => c.name === card.name)) {
      setSelectedCards(selectedCards.filter(c => c.name !== card.name));
    } else {
      const newSelected = [...selectedCards, card];
      setSelectedCards(newSelected);

      // Reveal card after selection
      setTimeout(() => {
        setRevealedCards([...revealedCards, card]);
      }, 300);
    }
  };

  return { handleCardSelect };
}
