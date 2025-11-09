import { useTarot } from '@/context/TarotContext';
import { getNumerology, getTarotReading } from '@/lib/api';

import { toast } from 'sonner';

export function useReadingInterpretation() {
  const { selectedCards, formData, setStep, setProgress, setProgressText, setReading } = useTarot();

  const handleGetInterpretation = async () => {
    if (selectedCards.length !== 3) {
      toast.warning('Please select exactly 3 cards');
      return;
    }

    setStep('reading');
    setProgress(5);

    try {
      setProgressText('Interpreting tarot reading...');
      const tarotResponse = await getTarotReading({
        name: formData.name,
        question: formData.question,
        past_card: {
          name: selectedCards[0].name,
          is_upright: selectedCards[0].is_upright,
        },
        present_card: {
          name: selectedCards[1].name,
          is_upright: selectedCards[1].is_upright,
        },
        future_card: {
          name: selectedCards[2].name,
          is_upright: selectedCards[2].is_upright,
        },
      });

      setProgress(Math.floor(Math.random() * (60 - 30 + 1)) + 30);
      setProgressText('Calculating numerology insights...');

      const numerologyResponse = await getNumerology({
        name: formData.name,
        dob: formData.dob,
        question: formData.question,
      });

      setProgress(90);
      setProgressText('Reading complete');
      setReading({
        ...tarotResponse.data,
        numerology_meaning: numerologyResponse.data.numerology_meaning,
        original_cards: selectedCards,
      });

      setProgress(100);
      setTimeout(() => setStep('results'), 500);
    } catch (error) {
      console.error('Error getting reading:', error);
      toast.warning('Failed to get reading. Please try again.');
      setStep('deck');
    }
  };

  return { handleGetInterpretation };
}
