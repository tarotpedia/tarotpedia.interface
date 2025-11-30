import { useTarot } from '@/context/TarotContext';
import { TarotCard } from '@/types/tarot';

export function useCardSelection() {
  const { selectedCards, setSelectedCards, revealedCards, setRevealedCards } = useTarot();

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
      setRevealedCards([...revealedCards, card]);
    }
  };

  return { handleCardSelect };
}
