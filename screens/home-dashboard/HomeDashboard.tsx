'use client';

import dayjs from 'dayjs';
import { useMemo } from 'react';
import 'dayjs/locale/ko';
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/shared/store/useAuthStore';

import useGetRecentQuery from '@/shared/query/mood-entries/useGetRecentQuery';
import { RecentMoodColors } from '@/features/mood/recent/RecentMoodColors';

import styles from './HomeDashboard.module.scss';

export function HomeDashboard() {
  const router = useRouter();

  const profile = useAuthStore((state) => state.profile);

  const { data: recentMoodEntries, isLoading: isLoadingRecentMoodEntries } = useGetRecentQuery();

  const moodHistory = useMemo(() => {
    if (!recentMoodEntries?.success || !recentMoodEntries?.data) return [];

    return recentMoodEntries?.data?.map((item) => ({
      day: dayjs(item.check_date).locale('ko').format('ddd'),
      mood: item.emotion_key,
    }));
  }, [recentMoodEntries]);

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
          <RecentMoodColors moodHistory={moodHistory} />
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
