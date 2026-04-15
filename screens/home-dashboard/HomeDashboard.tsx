'use client';

import { useMemo } from 'react';
import { Sparkles, ArrowRight, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useAuthStore } from '@/shared/store/useAuthStore';

import useGetRecentQuery from '@/shared/query/mood-entries/useGetRecentQuery';
import useGetSummary from '@/shared/query/summary/useGetSummary';
import { RecentMoodColors } from '@/features/mood/recent/RecentMoodColors';

import styles from './HomeDashboard.module.scss';
import LoadingOveray from '@/widget/loading_overay/LoadingOveray';

const NO_ENTRY_RECOMMENDATION =
  '오늘 마음 체크를 아직 하지 않았어요.\n작은 시작으로 지금 마음을 기록해볼까요?';

const SUMMARY_FALLBACK = '최근 기록을 바탕으로 추천을 준비 중이에요.\n잠시 후 다시 확인해 주세요.';

export function HomeDashboard() {
  const router = useRouter();

  const profile = useAuthStore((state) => state.profile);

  const { data: recentMoodEntries, isLoading: isLoadingRecentMoodEntries } = useGetRecentQuery();

  const {
    data: summaryResult,
    isLoading: isLoadingSummary,
    isError: isSummaryError,
  } = useGetSummary({
    recentMoodEntries,
    isLoadingRecentMoodEntries,
  });

  const moodHistory = useMemo(() => {
    if (!recentMoodEntries?.success || !recentMoodEntries?.data) return [];

    return recentMoodEntries?.data?.map((item) => ({
      day: item.check_date,
      mood: item.emotion_key,
    }));
  }, [recentMoodEntries]);

  const hasRecentEntries =
    !!recentMoodEntries?.success &&
    Array.isArray(recentMoodEntries?.data) &&
    recentMoodEntries.data.length > 0;

  const aiRecommendation = useMemo(() => {
    if (isLoadingRecentMoodEntries || !hasRecentEntries) {
      return NO_ENTRY_RECOMMENDATION;
    }
    if (isSummaryError) {
      return SUMMARY_FALLBACK;
    }
    if (summaryResult?.success && summaryResult.recommendation) {
      return summaryResult.recommendation;
    }
    if (isLoadingSummary) {
      return SUMMARY_FALLBACK;
    }
    return SUMMARY_FALLBACK;
  }, [
    hasRecentEntries,
    isLoadingRecentMoodEntries,
    isLoadingSummary,
    isSummaryError,
    summaryResult?.recommendation,
    summaryResult?.success,
  ]);

  return (
    <>
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
      {(isLoadingRecentMoodEntries || isLoadingSummary) && <LoadingOveray />}
    </>
  );
}
