export interface TarotCard {
  name: string;
  is_upright: boolean;
  image_url: string;
  full_card_name: string;
}

export interface CardInterpretation {
  card_name: string;
  position: 'past' | 'present' | 'future';
  orientation: string;
  meaning: string;
}

export interface TarotReading {
  interpretations: CardInterpretation[];
  summary: string;
  numerology_meaning?: string;
  original_cards?: TarotCard[];
}
