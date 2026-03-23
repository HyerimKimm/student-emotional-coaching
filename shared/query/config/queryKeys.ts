const QUERY_KEYS = {
  MOOD_ENTRIES: {
    TODAY: (userId: string) => ['mood-entries', 'today', { userId }],
    RECENT: (userId: string) => ['mood-entries', 'recent', { userId }],
  },
};

export default QUERY_KEYS;
