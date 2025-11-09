'use client';
import ReadingStep from '@/components/common/ReadingStep';
import DeckStep from '@/components/interface/DeckStep';
import FormStep from '@/components/interface/FormStep';
import ResultsStep from '@/components/interface/ResultsStep';
import { useTarot } from '@/context/TarotContext';

export default function TarotFlow() {
  const { step, progress, progressText } = useTarot();

  return (
    <>
      {step === 'form' && <FormStep />}
      {step === 'deck' && <DeckStep />}
      {step === 'reading' && <ReadingStep progress={progress} progressText={progressText} />}
      {step === 'results' && <ResultsStep />}
    </>
  );
}
