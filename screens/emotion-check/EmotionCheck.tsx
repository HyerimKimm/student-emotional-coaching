'use client';

import { useState, useMemo } from 'react';
import { MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  EMOTION_OPTIONS,
  ENERGY_LEVEL_OPTIONS,
  type ValanceType,
  type EmotionOptionType,
  VALENCE_OPTIONS,
  EnergyLevelType,
  EmotionType,
} from '@/shared/lib/emotions';
import { Textarea } from '@/shared/ui/textarea/Textarea';
import { Toggle } from '@/shared/ui/toggle/Toggle';

import styles from './EmotionCheck.module.scss';
import useGetTodayQuery from '@/shared/query/mood-entries/useGetTodayQuery';
import useAddTodayMutation from '@/shared/query/mood-entries/useAddTodayMutation';
import useUpdateTodayMutation from '@/shared/query/mood-entries/useUpdateTodayMutation';

export function EmotionCheck() {
  const router = useRouter();

  const { data: todayMoodEntry } = useGetTodayQuery(); // 오늘의 기분 기록 조회
  const { mutate: addTodayMutation } = useAddTodayMutation(); // 오늘의 기분 기록 추가
  const { mutate: updateTodayMutation } = useUpdateTodayMutation(); // 오늘의 기분 기록 수정
  /** 오늘의 마음은 어떤 느낌에 가까워요? 선택지 (긍정, 부정) */
  const [valence, setValence] = useState<ValanceType>('positive');

  const [selectedEmotions, setSelectedEmotions] = useState<EmotionType[]>([]);
  const [energyLevel, setEnergyLevel] = useState<EnergyLevelType>('medium');
  const [thoughts, setThoughts] = useState('');

  const currentEmotions = useMemo<EmotionOptionType[]>(() => {
    if (valence === 'positive') {
      return EMOTION_OPTIONS.filter((e) => e.valence === 'positive');
    }
    return EMOTION_OPTIONS.filter((e) => e.valence === 'negative');
  }, [valence]);

  const toggleEmotion = (emotion: EmotionType) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotion) ? prev.filter((key) => key !== emotion) : [...prev, emotion]
    );
  };

  const handleSubmit = async () => {
    if (todayMoodEntry?.data) {
      /* Todo. 오늘의 기분 기록이 있으면 수정 */
      updateTodayMutation(
        {
          emotions: selectedEmotions.join(','),
          energyLevel: energyLevel,
          thoughts: thoughts,
        },
        {
          onSuccess: () => {
            router.push('/chat');
          },
          onError: (e) => {
            console.error(e);
          },
        }
      );
    } else {
      /* 오늘의 기분 기록이 없으면 추가 */
      addTodayMutation(
        {
          emotions: selectedEmotions.join(','),
          energyLevel: energyLevel,
          thoughts: thoughts,
        },
        {
          onSuccess: () => {
            router.push('/chat');
          },
          onError: (e) => {
            console.error(e);
          },
        }
      );
    }
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
          {ENERGY_LEVEL_OPTIONS.map((level) => (
            <div key={level.value} className={styles.energy_item}>
              <input
                type="radio"
                id={level.value}
                name="energy"
                value={level.value}
                checked={energyLevel === level.value}
                onChange={(e) => setEnergyLevel(e.target.value as EnergyLevelType)}
              />
              <label htmlFor={level.value}>{level.label}</label>
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
        <button className={styles.btn_primary} onClick={handleSubmit}>
          <MessageCircle size={20} />
          AI와 대화 시작
        </button>
      </div>
    </div>
  );
}
