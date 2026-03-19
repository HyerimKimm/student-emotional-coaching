import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '@/shared/store/useAuthStore';
import { useToast } from '@/shared/ui/toast';

/** 오늘의 기분 기록 수정 */
const useUpdateTodayMutation = () => {
  const profile = useAuthStore((state) => state.profile);
  const session = useAuthStore((state) => state.session);

  const showToast = useToast();

  return useMutation({
    mutationFn: async (variables: { emotions: string; energyLevel: string; thoughts: string }) => {
      const accessToken = session?.access_token;

      const response = await axios.put(
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
    onSuccess: () => {
      showToast('success', '오늘의 기분 기록이 수정되었습니다.');
    },
    onError: (e) => {
      showToast('error', '오늘의 기분 기록 수정에 실패했습니다.');
    },
  });
};

export default useUpdateTodayMutation;
