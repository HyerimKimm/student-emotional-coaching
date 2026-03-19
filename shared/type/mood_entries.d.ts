export type ValanceType = 'positive' | 'negative';

export type EnergyLevelType = 'low' | 'medium' | 'high';

export type EmotionType =
  | 'tired'
  | 'frustrated'
  | 'anxious'
  | 'irritated'
  | 'lonely'
  | 'sad'
  | 'angry'
  | 'happy'
  | 'excited'
  | 'calm'
  | 'satisfied'
  | 'proud'
  | 'unknown';

export type MoodEntryType = {
  id: string;
  user_id: string;
  check_date: string;
  emotion_key: string;
  energy_level: EnergyLevelType;
  note: string;
  created_at: string;
  updated_at: string;
};
