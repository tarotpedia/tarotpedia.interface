import { useTarot } from '@/context/TarotContext';
import { getNumerology, getTarotReading } from '@/lib/api';
import { useI18n } from '@/lib/i18n';

import { toast } from 'sonner';

export function useReadingInterpretation() {
  const { t } = useI18n();
  const { selectedCards, formData, setStep, setProgress, setProgressText, setReading } = useTarot();

  const handleGetInterpretation = async () => {
    if (selectedCards.length !== 3) {
      toast.warning('Please select exactly 3 cards');
      return;
    }

    setStep('reading');
    setProgress(10);
    setProgressText(t.reading.progress.interpreting);

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      await delay(1000);

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

      setProgress(45);
      setProgressText(t.reading.progress.numerology);
      await delay(1000);

      const numerologyResponse = await getNumerology({
        name: formData.name,
        dob: formData.dob,
        question: formData.question,
      });

      setProgress(80);
      setProgressText(t.reading.progress.finalizing);
      await delay(1000);

      setProgress(100);
      setProgressText(t.reading.progress.complete);

      setReading({
        ...tarotResponse.data,
        numerology_meaning: numerologyResponse.data.numerology_meaning,
        original_cards: selectedCards,
      });

      setTimeout(() => setStep('confirm'), 800);
    } catch (error) {
      console.error('Error getting reading:', error);
      toast.warning('Failed to get reading. Please try again.');
      setStep('deck');
    }
  };

  return { handleGetInterpretation };
}
