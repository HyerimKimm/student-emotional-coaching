'use client';

import styles from './RecentMoodColors.module.scss';
import { EmotionType } from '@/shared/type/mood_entries';

type MoodHistoryItemType = {
  day: string;
  mood: string;
};

type RecentMoodColorsProps = {
  moodHistory: MoodHistoryItemType[];
};

export function RecentMoodColors({ moodHistory }: RecentMoodColorsProps) {
  return (
    <div className={styles.mood_history_list}>
      {moodHistory.map((item, index) => (
        <div key={index} className={styles.mood_history_item}>
          <div
            className={`${styles.mood_history_circle} ${styles[`circle_${item.mood as EmotionType}`] ?? ''}`}
          />
          <span className={styles.mood_history_day}>{item.day}</span>
        </div>
      ))}
    </div>
  );
}
