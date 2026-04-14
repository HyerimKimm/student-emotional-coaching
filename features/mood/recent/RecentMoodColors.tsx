'use client';

import dayjs from 'dayjs';
import styles from './RecentMoodColors.module.scss';
import { EmotionType } from '@/shared/type/mood_entries';

type MoodHistoryItemType = {
  day: string;
  mood: string;
};

type RecentMoodColorsProps = {
  moodHistory: MoodHistoryItemType[];
};

const getDisplayDay = (dateText: string) => {
  const targetDate = dayjs(dateText);
  const today = dayjs().startOf('day');
  const dayDiff = today.diff(targetDate.startOf('day'), 'day');

  if (dayDiff === 0) return '오늘';
  if (dayDiff === 1) return '어제';

  return targetDate.format('M/D');
};

export function RecentMoodColors({ moodHistory }: RecentMoodColorsProps) {
  return (
    <div className={styles.mood_history_list}>
      {moodHistory.map((item, index) => {
        const emotionKey = item.mood.split(',')[0] as EmotionType;

        return (
          <div key={index} className={styles.mood_history_item}>
            <div
              className={`${styles.mood_history_circle} ${styles[`circle_${emotionKey}`] ?? ''}`}
            />
            <span className={styles.mood_history_day}>{getDisplayDay(item.day)}</span>
          </div>
        );
      })}
    </div>
  );
}
