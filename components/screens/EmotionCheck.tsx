"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";

interface EmotionCheckProps {
  onStartChat: () => void;
}

const emotions = [
  { id: "tired", label: "지침" },
  { id: "frustrated", label: "답답함" },
  { id: "anxious", label: "불안" },
  { id: "irritated", label: "짜증" },
  { id: "lonely", label: "외로움" },
  { id: "excited", label: "기대됨" },
  { id: "okay", label: "괜찮음" },
  { id: "unsure", label: "잘 모르겠음" },
];

const energyLevels = [
  { id: "low", label: "낮음" },
  { id: "medium", label: "보통" },
  { id: "high", label: "높음" },
];

export function EmotionCheck({ onStartChat }: EmotionCheckProps) {
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [energyLevel, setEnergyLevel] = useState<string>("");
  const [thoughts, setThoughts] = useState("");

  const toggleEmotion = (emotionId: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotionId)
        ? prev.filter((id) => id !== emotionId)
        : [...prev, emotionId]
    );
  };

  return (
    <div className="emotion-check">
      <div className="emotion-check__card">
        <h2 className="emotion-check__title">
          오늘 마음은 어떤 느낌에 가까워요?
        </h2>
        <div className="emotion-chips">
          {emotions.map((emotion) => (
            <button
              key={emotion.id}
              className={`emotion-chips__item ${
                selectedEmotions.includes(emotion.id)
                  ? "emotion-chips__item--selected"
                  : ""
              }`}
              onClick={() => toggleEmotion(emotion.id)}
            >
              {emotion.label}
            </button>
          ))}
        </div>
      </div>

      <div className="emotion-check__card">
        <h2 className="emotion-check__title">에너지 수준</h2>
        <div className="energy-level">
          {energyLevels.map((level) => (
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
          <label className="text-input__label">
            지금 떠오르는 생각이 있다면 편하게 적어주세요
          </label>
          <textarea
            className="text-input__field"
            placeholder="요즘 공부가 잘 안돼요. 시험이 다가와서 답답해요."
            value={thoughts}
            onChange={(e) => setThoughts(e.target.value)}
          />
        </div>
      </div>

      <div className="submit-section">
        <button className="btn-primary" onClick={onStartChat}>
          <MessageCircle size={20} />
          AI와 대화 시작
        </button>
      </div>
    </div>
  );
}
