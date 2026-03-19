import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '@/shared/store/useAuthStore';

/** 오늘의 기분 기록 추가 */
const useAddTodayMutation = () => {
  const profile = useAuthStore((state) => state.profile);
  const session = useAuthStore((state) => state.session);

  return useMutation({
    mutationFn: async (variables: { emotions: string; energyLevel: string; thoughts: string }) => {
      const accessToken = session?.access_token;

      const response = await axios.post(
        `/api/mood-entries/today`,
        {
          studentId: profile?.id,
          emotions: variables.emotions,
          energyLevel: variables.energyLevel,
          thoughts: variables.thoughts,
        },
        accessToken
          ? {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          : undefined
      );
      return response.data;
    },
  });
};

export default useAddTodayMutation;
