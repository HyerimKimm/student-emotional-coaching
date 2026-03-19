import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useAuthStore } from '@/shared/store/useAuthStore';

const useAddTodayMutation = () => {
  const profile = useAuthStore((state) => state.profile);

  return useMutation({
    mutationFn: async (variables: { emotions: string; energyLevel: string; thoughts: string }) => {
      const response = await axios.post(`/api/mood-entries/today`, {
        studentId: profile?.id,
        emotions: variables.emotions,
        energyLevel: variables.energyLevel,
        thoughts: variables.thoughts,
      });
      return response.data;
    },
  });
};

export default useAddTodayMutation;
