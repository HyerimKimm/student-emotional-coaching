import { useQuery } from '@tanstack/react-query';

import apiClient from '@/shared/api/config/apiClient';
import QUERY_KEYS from '@/shared/query/config/queryKeys';
import { useAuthStore } from '@/shared/store/useAuthStore';
import { ApiResponseType } from '@/shared/type/api';
import { MoodEntryType } from '@/shared/type/mood_entries';

export type SummaryApiResponse = {
  success: boolean;
  recommendation?: string;
  error?: string;
};

type UseGetSummaryParams = {
  recentMoodEntries: ApiResponseType<MoodEntryType[] | null> | undefined;
  isLoadingRecentMoodEntries: boolean;
};

const useGetSummary = ({ recentMoodEntries, isLoadingRecentMoodEntries }: UseGetSummaryParams) => {
  const profile = useAuthStore((state) => state.profile);

  const entries =
    recentMoodEntries?.success && Array.isArray(recentMoodEntries.data)
      ? recentMoodEntries.data
      : undefined;
  const hasEntries = !!entries?.length;

  return useQuery({
    enabled: !!profile?.id && !isLoadingRecentMoodEntries && hasEntries,
    queryKey: QUERY_KEYS.SUMMARY.RECOMMENDATION(profile?.id ?? '', entries),
    queryFn: async (): Promise<SummaryApiResponse> => {
      const response = await apiClient.post<SummaryApiResponse>('/api/summary', {
        recentMoodEntries: entries as MoodEntryType[],
      });

      return response.data;
    },
  });
};

export default useGetSummary;
