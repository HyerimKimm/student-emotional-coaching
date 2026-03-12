"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const positiveEmotions = [
  { id: "happy", label: "행복함" },
  { id: "excited", label: "기대됨" },
  { id: "peaceful", label: "평온함" },
  { id: "grateful", label: "감사함" },
  { id: "confident", label: "자신감" },
  { id: "proud", label: "뿌듯함" },
  { id: "hopeful", label: "희망적" },
  { id: "okay", label: "괜찮음" },
];

const negativeEmotions = [
  { id: "tired", label: "지침" },
  { id: "frustrated", label: "답답함" },
  { id: "anxious", label: "불안" },
  { id: "irritated", label: "짜증" },
  { id: "lonely", label: "외로움" },
  { id: "sad", label: "슬픔" },
  { id: "angry", label: "화남" },
  { id: "unsure", label: "잘 모르겠음" },
];

const energyLevels = [
  { id: "low", label: "낮음" },
  { id: "medium", label: "보통" },
  { id: "high", label: "높음" },
];

export function EmotionCheck() {
  const router = useRouter();

  const [emotionCategory, setEmotionCategory] = useState<"positive" | "negative">("negative");
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
  const [energyLevel, setEnergyLevel] = useState<string>("");
  const [thoughts, setThoughts] = useState("");

  const currentEmotions = emotionCategory === "positive" ? positiveEmotions : negativeEmotions;

  const toggleEmotion = (emotionId: string) => {
    setSelectedEmotions((prev) =>
      prev.includes(emotionId)
        ? prev.filter((id) => id !== emotionId)
        : [...prev, emotionId],
    );
  };

  return (
    <div className="emotion-check">
      <div className="emotion-check__card">
        <div className="emotion-check__header">
          <h2 className="emotion-check__title">
            오늘 마음은 어떤 느낌에 가까워요?
          </h2>
          <div className="emotion-toggle">
            <button
              className={`emotion-toggle__btn ${emotionCategory === "positive" ? "emotion-toggle__btn--active" : ""}`}
              onClick={() => setEmotionCategory("positive")}
            >
              긍정
            </button>
            <button
              className={`emotion-toggle__btn ${emotionCategory === "negative" ? "emotion-toggle__btn--active" : ""}`}
              onClick={() => setEmotionCategory("negative")}
            >
              부정
            </button>
          </div>
        </div>
        <div className="emotion-chips">
          {currentEmotions.map((emotion) => (
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
        <button
          className="btn-primary"
          onClick={() => {
            router.push("/chat");
          }}
        >
          <MessageCircle size={20} />
          AI와 대화 시작
        </button>
      </div>
    </div>
  );
}
