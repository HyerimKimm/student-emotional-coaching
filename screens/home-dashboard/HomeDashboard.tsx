'use client';

import { useAuthStore } from '@/shared/store/useAuthStore';
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import styles from './HomeDashboard.module.scss';

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
    <div className={styles.home_wrap}>
      <header className={styles.header}>
        <h1 className={styles.greeting}>{`안녕 ${profile?.name} 👋`}</h1>
        <p className={styles.question}>오늘 마음은 어때?</p>
      </header>

      <div className={styles.main_action}>
        <button
          className={styles.btn_primary}
          onClick={() => {
            router.push('/check');
          }}
        >
          <Sparkles size={20} />
          오늘 마음 체크하기
        </button>
      </div>

      <section className={styles.section}>
        <h2 className={styles.section_title}>최근 감정 기록</h2>
        <div className={styles.mood_history}>
          <div className={styles.mood_history_list}>
            {moodHistory.map((item, index) => (
              <div key={index} className={styles.mood_history_item}>
                <div className={`${styles.mood_history_circle} ${styles[`circle_${item.mood}`]}`} />
                <span className={styles.mood_history_day}>{item.day}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.section_title}>AI 코치 추천</h2>
        <div className={styles.ai_card}>
          <div className={styles.ai_card_header}>
            <span className={styles.ai_card_badge}>
              <MessageCircle size={14} />
              오늘의 추천
            </span>
          </div>
          <p className={styles.ai_card_text}>
            오늘은 에너지가 낮은 날이에요.
            <br />
            작은 시작을 해볼까요?
          </p>
          <button
            className={styles.btn_secondary}
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
