'use client';
import { TarotCard, TarotReading } from '@/types/tarot';

export type Step = 'form' | 'deck' | 'reading' | 'confirm' | 'results';

export interface FormData {
  name: string;
  dob: string | null;
  question: string;
}

export interface TarotContextType {
  step: Step;
  setStep: (step: Step) => void;
  progress: number;
  setProgress: (progress: number) => void;
  progressText: string;
  setProgressText: (text: string) => void;
  isShuffling: boolean;
  setIsShuffling: (shuffling: boolean) => void;
  deckCards: TarotCard[];
  setDeckCards: (cards: TarotCard[]) => void;
  selectedCards: TarotCard[];
  setSelectedCards: (cards: TarotCard[]) => void;
  revealedCards: TarotCard[];
  setRevealedCards: (cards: TarotCard[]) => void;
  reading: TarotReading | null;
  setReading: (reading: TarotReading | null) => void;
  showQuestionHint: boolean;
  setShowQuestionHint: (show: boolean) => void;
  formData: FormData;
  setFormData: (data: FormData) => void;
  resetReading: () => void;
}
