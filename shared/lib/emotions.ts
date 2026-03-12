export type ValanceType = 'positive' | 'negative' | 'neutral';

export type ArousalType = 'low' | 'medium' | 'high';

export type EmotionType = {
  key: string;
  label: string;
  valence: ValanceType;
  arousal: ArousalType;
  color: string;
};

export type EnergyLevelType = {
  id: string;
  label: string;
};

export const VALENCE: ValanceType[] = ['positive', 'negative', 'neutral'];

export const EMOTIONS: EmotionType[] = [
  {
    key: 'tired',
    label: '지침',
    valence: 'negative',
    arousal: 'low',
    color: '#6B7280',
  },
  {
    key: 'frustrated',
    label: '답답함',
    valence: 'negative',
    arousal: 'medium',
    color: '#F59E0B',
  },
  {
    key: 'anxious',
    label: '불안',
    valence: 'negative',
    arousal: 'high',
    color: '#8B5CF6',
  },
  {
    key: 'irritated',
    label: '짜증',
    valence: 'negative',
    arousal: 'medium',
    color: '#EF4444',
  },
  {
    key: 'lonely',
    label: '외로움',
    valence: 'negative',
    arousal: 'low',
    color: '#3B82F6',
  },
  {
    key: 'sad',
    label: '슬픔',
    valence: 'negative',
    arousal: 'low',
    color: '#60A5FA',
  },
  {
    key: 'angry',
    label: '화남',
    valence: 'negative',
    arousal: 'high',
    color: '#DC2626',
  },
  {
    key: 'happy',
    label: '행복함',
    valence: 'positive',
    arousal: 'high',
    color: '#FDE047',
  },
  {
    key: 'excited',
    label: '기대됨',
    valence: 'positive',
    arousal: 'high',
    color: '#FBBF24',
  },
  {
    key: 'calm',
    label: '편안함',
    valence: 'positive',
    arousal: 'low',
    color: '#34D399',
  },
  {
    key: 'satisfied',
    label: '만족',
    valence: 'positive',
    arousal: 'medium',
    color: '#22C55E',
  },
  {
    key: 'proud',
    label: '뿌듯함',
    valence: 'positive',
    arousal: 'medium',
    color: '#10B981',
  },
  {
    key: 'unknown',
    label: '잘 모르겠음',
    valence: 'neutral',
    arousal: 'low',
    color: '#9CA3AF',
  },
];

export const ENERGY_LEVELS: EnergyLevelType[] = [
  { id: 'low', label: '낮음' },
  { id: 'medium', label: '보통' },
  { id: 'high', label: '높음' },
];
