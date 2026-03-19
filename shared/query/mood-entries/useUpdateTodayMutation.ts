import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '@/shared/store/useAuthStore';

/** 오늘의 기분 기록 수정 */
const useUpdateTodayMutation = () => {
  const profile = useAuthStore((state) => state.profile);

  return useMutation({
    mutationFn: async (variables: { emotions: string; energyLevel: string; thoughts: string }) => {
      const response = await axios.put(`/api/mood-entries/today`, {
        studentId: profile?.id,
        emotions: variables.emotions,
        energyLevel: variables.energyLevel,
        thoughts: variables.thoughts,
      });
      return response.data;
    },
  });
};

export default useUpdateTodayMutation;
