'use client';
import { FormData, Step, TarotContextType } from '@/types/interface';
import { TarotCard, TarotReading } from '@/types/tarot';

import { ReactNode, createContext, useContext, useState } from 'react';

const TarotContext = createContext<TarotContextType | undefined>(undefined);

export { TarotContext };

export function TarotProvider({ children }: { children: ReactNode }) {
  const [step, setStep] = useState<Step>('form');
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState('');
  const [isShuffling, setIsShuffling] = useState(false);
  const [deckCards, setDeckCards] = useState<TarotCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<TarotCard[]>([]);
  const [revealedCards, setRevealedCards] = useState<TarotCard[]>([]);
  const [reading, setReading] = useState<TarotReading | null>(null);
  const [showQuestionHint, setShowQuestionHint] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    dob: '2000-01-01',
    question: '',
  });

  const resetReading = () => {
    setStep('form');
    setDeckCards([]);
    setSelectedCards([]);
    setRevealedCards([]);
    setIsShuffling(false);
    setReading(null);
    setFormData({ ...formData, question: '' });
    setProgress(0);
  };

  return (
    <TarotContext.Provider
      value={{
        step,
        setStep,
        progress,
        setProgress,
        progressText,
        setProgressText,
        isShuffling,
        setIsShuffling,
        deckCards,
        setDeckCards,
        selectedCards,
        setSelectedCards,
        revealedCards,
        setRevealedCards,
        reading,
        setReading,
        showQuestionHint,
        setShowQuestionHint,
        formData,
        setFormData,
        resetReading,
      }}
    >
      {children}
    </TarotContext.Provider>
  );
}

export function useTarot() {
  const context = useContext(TarotContext);
  if (!context) {
    throw new Error('useTarot must be used within TarotProvider');
  }
  return context;
}
