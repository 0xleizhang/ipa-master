export type IPASection = 'Vowels' | 'Diphthongs' | 'Consonants';
export type IPACategory = 'Monophthongs (Short)' | 'Monophthongs (Long)' | 'Diphthongs' | 'Plosives' | 'Fricatives' | 'Affricates' | 'Nasals' | 'Approximants';
export type IPAVoicing = 'Voiced' | 'Voiceless';

export interface IPASymbol {
  symbol: string;
  ph: string; // IPA phoneme for Google TTS API (may differ from symbol)
  filename: string; // Safe filename for audio files
  name: string;
  section: IPASection;
  category: IPACategory;
  voicing: IPAVoicing; // New field for classification
  isDifficult?: boolean; // Marks sounds that are difficult for Chinese speakers
  exampleWord: string; // Used for quick audio preview
  sound: string; // Isolated sound string for TTS (e.g. "buh" for /b/)
  description: string; // English description
  chineseTip: string; // Chinese annotation/tip
  commonSpellings: string[]; // Letter combinations
  examples: { word: string; transcription: string }[];
  sentence: string; // Example sentence
  youtubeId: string; // Video ID for demonstration
  videoStartTime?: number; // Start time in seconds
}

export interface AssessmentResult {
  score: number;
  feedback: string;
  isCorrect: boolean;
}
