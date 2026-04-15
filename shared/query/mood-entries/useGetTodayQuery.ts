import { useQuery, useQueryClient, type QueryClient } from '@tanstack/react-query';
import QUERY_KEYS from '@/shared/query/config/queryKeys';
import apiClient from '@/shared/api/config/apiClient';
import { useAuthStore } from '@/shared/store/useAuthStore';
import { MoodEntryType } from '@/shared/type/mood_entries';
import { ApiResponseType } from '@/shared/type/api';

/** 오늘의 기분·최근 기록·AI 추천 쿼리 무효화 — 오늘 기분 추가/수정 mutation 등에서 사용 */
export const invalidateTodayMoodEntry = (queryClient: QueryClient, userId?: string) => {
  queryClient.invalidateQueries({
    queryKey: userId ? QUERY_KEYS.MOOD_ENTRIES.TODAY(userId) : ['mood-entries', 'today'],
  });
  queryClient.invalidateQueries({
    queryKey: userId ? QUERY_KEYS.MOOD_ENTRIES.RECENT(userId) : ['mood-entries', 'recent'],
  });
  queryClient.invalidateQueries({ queryKey: ['summary', 'recommendation'] });
};

/** useMutation onSettled/onSuccess 등에서 쓰는 훅 */
export const useInvalidateTodayMoodEntry = () => {
  const queryClient = useQueryClient();
  const profile = useAuthStore((state) => state.profile);

  return () => invalidateTodayMoodEntry(queryClient, profile?.id);
};

/** 오늘의 기분 기록 조회 */
const useGetTodayQuery = () => {
  const profile = useAuthStore((state) => state.profile);

  return useQuery({
    enabled: !!profile?.id,
    queryKey: QUERY_KEYS.MOOD_ENTRIES.TODAY(profile?.id ?? ''),
    queryFn: async (): Promise<ApiResponseType<MoodEntryType | null>> => {
      const response = await apiClient.get(`/api/mood-entries/today?studentId=${profile?.id}`);
      return response.data;
    },
  });
};

export default useGetTodayQuery;
