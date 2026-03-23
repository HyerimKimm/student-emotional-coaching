import { useQuery, useQueryClient, type QueryClient } from '@tanstack/react-query';
import QUERY_KEYS from '@/shared/query/config/queryKeys';
import apiClient from '@/shared/api/config/apiClient';
import { useAuthStore } from '@/shared/store/useAuthStore';
import { ApiResponseType } from '@/shared/type/api';
import { MoodEntryType } from '@/shared/type/mood_entries';

const useGetRecentQuery = () => {
  const profile = useAuthStore((state) => state.profile);

  return useQuery({
    enabled: !!profile?.id,
    queryKey: QUERY_KEYS.MOOD_ENTRIES.RECENT(profile?.id ?? ''),
    queryFn: async (): Promise<ApiResponseType<MoodEntryType[] | null>> => {
      const response = await apiClient.get(`/api/mood-entries/recent?studentId=${profile?.id}`);
      return response.data;
    },
  });
};

export default useGetRecentQuery;
