import { ValanceType, EnergyLevelType, EmotionType } from '@/shared/type/mood_entries';

export type EmotionOptionType = {
  key: EmotionType;
  label: string;
  valence: ValanceType;
  color: string;
};

export const VALENCE_OPTIONS = [
  { value: 'positive', label: '긍정' },
  { value: 'negative', label: '부정' },
];

export const EMOTION_OPTIONS: EmotionOptionType[] = [
  {
    key: 'tired',
    label: '지침',
    valence: 'negative',
    color: '#6B7280',
  },
  {
    key: 'frustrated',
    label: '답답함',
    valence: 'negative',
    color: '#F59E0B',
  },
  {
    key: 'anxious',
    label: '불안',
    valence: 'negative',
    color: '#8B5CF6',
  },
  {
    key: 'irritated',
    label: '짜증',
    valence: 'negative',
    color: '#EF4444',
  },
  {
    key: 'lonely',
    label: '외로움',
    valence: 'negative',
    color: '#3B82F6',
  },
  {
    key: 'sad',
    label: '슬픔',
    valence: 'negative',
    color: '#60A5FA',
  },
  {
    key: 'angry',
    label: '화남',
    valence: 'negative',
    color: '#DC2626',
  },
  {
    key: 'happy',
    label: '행복함',
    valence: 'positive',
    color: '#FDE047',
  },
  {
    key: 'excited',
    label: '기대됨',
    valence: 'positive',
    color: '#FBBF24',
  },
  {
    key: 'calm',
    label: '편안함',
    valence: 'positive',
    color: '#34D399',
  },
  {
    key: 'satisfied',
    label: '만족',
    valence: 'positive',
    color: '#22C55E',
  },
  {
    key: 'proud',
    label: '뿌듯함',
    valence: 'positive',
    color: '#10B981',
  },
  {
    key: 'unknown',
    label: '잘 모르겠음',
    valence: 'negative',
    color: '#9CA3AF',
  },
];

export const ENERGY_LEVEL_OPTIONS: { value: EnergyLevelType; label: string }[] = [
  { value: 'low', label: '낮음' },
  { value: 'medium', label: '보통' },
  { value: 'high', label: '높음' },
];
