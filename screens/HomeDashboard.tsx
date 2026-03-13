'use client';

import { useAuthStore } from '@/shared/stores/useAuthStore';
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

const moodHistory = [
  { day: '월', mood: 'tired' },
  { day: '화', mood: 'frustrated' },
  { day: '수', mood: 'anxious' },
  { day: '목', mood: 'okay' },
  { day: '금', mood: 'excited' },
  { day: '토', mood: 'lonely' },
  { day: '일', mood: 'okay' },
];

export function HomeDashboard() {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const profile = useAuthStore((state) => state.profile);

  return (
    <div className="home">
      <header className="home__header">
        <h1 className="home__greeting">{`안녕 ${profile?.name} 👋`}</h1>
        <p className="home__question">오늘 마음은 어때?</p>
      </header>

      <div className="home__main-action">
        <button
          className="btn-primary"
          onClick={() => {
            router.push('/check');
          }}
        >
          <Sparkles size={20} />
          오늘 마음 체크하기
        </button>
      </div>

      <section className="section">
        <h2 className="section__title">최근 감정 기록</h2>
        <div className="mood-history">
          <div className="mood-history__list">
            {moodHistory.map((item, index) => (
              <div key={index} className="mood-history__item">
                <div className={`mood-history__circle mood-history__circle--${item.mood}`} />
                <span className="mood-history__day">{item.day}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <h2 className="section__title">AI 코치 추천</h2>
        <div className="ai-card">
          <div className="ai-card__header">
            <span className="ai-card__badge">
              <MessageCircle size={14} />
              오늘의 추천
            </span>
          </div>
          <p className="ai-card__text">
            오늘은 에너지가 낮은 날이에요.
            <br />
            작은 시작을 해볼까요?
          </p>
          <button
            className="btn-secondary"
            onClick={() => {
              router.push('/chat');
            }}
          >
            대화 시작하기
            <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
