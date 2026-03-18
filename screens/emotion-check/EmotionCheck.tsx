'use client';

import { useState, useMemo } from 'react';
import { MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { EMOTIONS, ENERGY_LEVELS, type ValanceType, type EmotionType } from '@/shared/lib/emotions';
import { Textarea } from '@/shared/ui/textarea/Textarea';
import { Toggle, ToggleOption } from '@/shared/ui/toggle/Toggle';

import styles from './EmotionCheck.module.scss';

const VALENCE_OPTIONS: ToggleOption[] = [
  { value: 'positive', label: '긍정' },
  { value: 'negative', label: '부정' },
];

export function EmotionCheck() {
  const router = useRouter();

  /** 오늘의 마음은 어떤 느낌에 가까워요? 선택지 (긍정, 부정) */
  const [valence, setValence] = useState<ValanceType>('positive');

  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [energyLevel, setEnergyLevel] = useState<string>('');
  const [thoughts, setThoughts] = useState('');

  const currentEmotions = useMemo<EmotionType[]>(() => {
    if (valence === 'positive') {
      return EMOTIONS.filter((e) => e.valence === 'positive');
    }
    return EMOTIONS.filter((e) => e.valence === 'negative');
  }, [valence]);

  const toggleEmotion = (emotionKey: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotionKey) ? prev.filter((key) => key !== emotionKey) : [...prev, emotionKey]
    );
  };

  return (
    <div className={styles.emotion_check}>
      <div className={styles.card}>
        <div className={styles.header}>
          <h2 className={styles.title}>오늘 마음은 어떤 느낌에 가까워요?</h2>
          <Toggle
            options={VALENCE_OPTIONS}
            value={valence}
            onChange={(v) => setValence(v as ValanceType)}
          />
        </div>
        <div className={styles.emotion_chips}>
          {currentEmotions.map((emotion) => (
            <button
              key={emotion.key}
              className={`${styles.chip_item} ${selectedEmotions.includes(emotion.key) ? styles.selected : ''}`}
              onClick={() => toggleEmotion(emotion.key)}
            >
              {emotion.label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <h2 className={styles.title}>에너지 수준</h2>
        <div className={styles.energy_level}>
          {ENERGY_LEVELS.map((level) => (
            <div key={level.id} className={styles.energy_item}>
              <input
                type="radio"
                id={level.id}
                name="energy"
                value={level.id}
                checked={energyLevel === level.id}
                onChange={(e) => setEnergyLevel(e.target.value)}
              />
              <label htmlFor={level.id}>{level.label}</label>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.card}>
        <Textarea
          label="지금 떠오르는 생각이 있다면 편하게 적어주세요"
          placeholder="요즘 공부가 잘 안돼요. 시험이 다가와서 답답해요."
          value={thoughts}
          onChange={(e) => setThoughts(e.target.value)}
        />
      </div>

      <div className={styles.submit_section}>
        <button
          className={styles.btn_primary}
          onClick={() => {
            router.push('/chat');
          }}
        >
          <MessageCircle size={20} />
          AI와 대화 시작
        </button>
      </div>
    </div>
  );
}
