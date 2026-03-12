'use client';

import { useState, useMemo } from 'react';
import { MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { EMOTIONS, ENERGY_LEVELS, type ValanceType, type EmotionType } from '@/shared/lib/emotions';

const VALENCE_LABELS: Record<ValanceType, string> = {
  positive: '긍정',
  negative: '부정',
  neutral: '중립',
};

export function EmotionCheck() {
  const router = useRouter();

  const [valence, setValence] = useState<ValanceType>('positive');
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [energyLevel, setEnergyLevel] = useState<string>('');
  const [thoughts, setThoughts] = useState('');

  const currentEmotions = useMemo<EmotionType[]>(() => {
    if (valence === 'positive') {
      return EMOTIONS.filter((e) => e.valence === 'positive');
    }
    return EMOTIONS.filter((e) => e.valence === 'negative' || e.valence === 'neutral');
  }, [valence]);

  const toggleEmotion = (emotionKey: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotionKey) ? prev.filter((key) => key !== emotionKey) : [...prev, emotionKey]
    );
  };

  return (
    <div className="emotion-check">
      <div className="emotion-check__card">
        <div className="emotion-check__header">
          <h2 className="emotion-check__title">오늘 마음은 어떤 느낌에 가까워요?</h2>
          <div className="emotion-toggle">
            <button
              className={`emotion-toggle__btn ${valence === 'positive' ? 'emotion-toggle__btn--active' : ''}`}
              onClick={() => setValence('positive')}
            >
              {VALENCE_LABELS.positive}
            </button>
            <button
              className={`emotion-toggle__btn ${valence === 'negative' ? 'emotion-toggle__btn--active' : ''}`}
              onClick={() => setValence('negative')}
            >
              {VALENCE_LABELS.negative}
            </button>
          </div>
        </div>
        <div className="emotion-chips">
          {currentEmotions.map((emotion) => (
            <button
              key={emotion.key}
              className={`emotion-chips__item ${
                selectedEmotions.includes(emotion.key) ? 'emotion-chips__item--selected' : ''
              }`}
              onClick={() => toggleEmotion(emotion.key)}
            >
              {emotion.label}
            </button>
          ))}
        </div>
      </div>

      <div className="emotion-check__card">
        <h2 className="emotion-check__title">에너지 수준</h2>
        <div className="energy-level">
          {ENERGY_LEVELS.map((level) => (
            <div key={level.id} className="energy-level__item">
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

      <div className="emotion-check__card">
        <div className="text-input">
          <label className="text-input__label">지금 떠오르는 생각이 있다면 편하게 적어주세요</label>
          <textarea
            className="text-input__field"
            placeholder="요즘 공부가 잘 안돼요. 시험이 다가와서 답답해요."
            value={thoughts}
            onChange={(e) => setThoughts(e.target.value)}
          />
        </div>
      </div>

      <div className="submit-section">
        <button
          className="btn-primary"
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
