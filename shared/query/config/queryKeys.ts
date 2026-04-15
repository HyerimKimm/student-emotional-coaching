const QUERY_KEYS = {
  MOOD_ENTRIES: {
    TODAY: (userId: string) => ['mood-entries', 'today', { userId }],
    RECENT: (userId: string) => ['mood-entries', 'recent', { userId }],
  },
  SUMMARY: {
    RECOMMENDATION: (userId: string, recentMoodEntries: unknown) => [
      'summary',
      'recommendation',
      { userId, recentMoodEntries },
    ],
  },
};

export default QUERY_KEYS;
