import { useQuery } from '@tanstack/react-query';
import QUERY_KEYS from '@/shared/query/config/queryKeys';
import axios from 'axios';
import { useAuthStore } from '@/shared/store/useAuthStore';
import { MoodEntryType } from '@/shared/type/mood_entries';
import { ApiResponseType } from '@/shared/type/api';

/** 오늘의 기분 기록 조회 */
const useGetTodayQuery = () => {
  const profile = useAuthStore((state) => state.profile);

  return useQuery({
    queryKey: QUERY_KEYS.MOOD_ENTRIES.TODAY(),
    queryFn: async (): Promise<ApiResponseType<MoodEntryType | null>> => {
      const response = await axios.get(`/api/mood-entries/today?studentId=${profile?.id}`);
      return response.data;
    },
  });
};

export default useGetTodayQuery;
