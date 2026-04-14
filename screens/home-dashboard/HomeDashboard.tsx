'use client';

import { useMemo } from 'react';
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/shared/store/useAuthStore';

import useGetRecentQuery from '@/shared/query/mood-entries/useGetRecentQuery';
import { RecentMoodColors } from '@/features/mood/recent/RecentMoodColors';
import { EMOTION_OPTIONS } from '@/shared/lib/emotions';
import { EmotionType } from '@/shared/type/mood_entries';

import styles from './HomeDashboard.module.scss';

export function HomeDashboard() {
  const router = useRouter();

  const profile = useAuthStore((state) => state.profile);

  const { data: recentMoodEntries, isLoading: isLoadingRecentMoodEntries } = useGetRecentQuery();

  const moodHistory = useMemo(() => {
    if (!recentMoodEntries?.success || !recentMoodEntries?.data) return [];

    return recentMoodEntries?.data?.map((item) => ({
      day: item.check_date,
      mood: item.emotion_key,
    }));
  }, [recentMoodEntries]);

  const aiRecommendation = useMemo(() => {
    const defaultMessage =
      '오늘 마음 체크를 아직 하지 않았어요.\n작은 시작으로 지금 마음을 기록해볼까요?';

    if (!recentMoodEntries?.success || !recentMoodEntries?.data?.length) {
      return defaultMessage;
    }

    const recentEntries = recentMoodEntries.data;
    const latestEntry = recentEntries[0];
    const latestEmotionKey = latestEntry.emotion_key.split(',')[0] as EmotionType;
    const latestEmotionInfo = EMOTION_OPTIONS.find((emotion) => emotion.key === latestEmotionKey);
    const latestEmotionLabel = latestEmotionInfo?.label ?? '지금 마음';

    const lowEnergyCount = recentEntries.filter((entry) => entry.energy_level === 'low').length;
    const negativeMoodCount = recentEntries.filter((entry) => {
      const emotionKey = entry.emotion_key.split(',')[0] as EmotionType;
      const emotionInfo = EMOTION_OPTIONS.find((emotion) => emotion.key === emotionKey);
      return emotionInfo?.valence === 'negative';
    }).length;

    const hasLowEnergyTrend = lowEnergyCount >= Math.ceil(recentEntries.length / 2);
    const hasNegativeMoodTrend = negativeMoodCount >= Math.ceil(recentEntries.length / 2);

    if (hasLowEnergyTrend && hasNegativeMoodTrend) {
      return `최근에는 ${latestEmotionLabel}이(가) 자주 느껴졌어요.\n오늘은 해야 할 일 하나만 정해서 천천히 시작해볼까요?`;
    }

    if (latestEntry.energy_level === 'high' && latestEmotionInfo?.valence === 'positive') {
      return `좋은 흐름이 이어지고 있어요.\n${latestEmotionLabel} 에너지를 살려 짧은 목표 하나에 도전해봐요!`;
    }

    if (latestEntry.energy_level === 'low') {
      return `오늘은 에너지가 조금 낮아 보여요.\n${latestEmotionLabel} 마음을 돌보는 10분 휴식을 먼저 가져봐요.`;
    }

    if (latestEmotionInfo?.valence === 'negative') {
      return `오늘 ${latestEmotionLabel} 감정이 올라왔네요.\n지금 가장 마음 쓰이는 생각을 한 줄로 적어보면 도움이 돼요.`;
    }

    return `최근의 ${latestEmotionLabel} 마음이 잘 기록되고 있어요.\n지금 이 컨디션으로 할 수 있는 작은 실천 하나를 골라볼까요?`;
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
            {aiRecommendation.split('\n').map((line, index, arr) => (
              <span key={`${line}-${index}`}>
                {line}
                {index < arr.length - 1 && <br />}
              </span>
            ))}
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
