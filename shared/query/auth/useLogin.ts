import { useMutation } from '@tanstack/react-query';
import apiClient from '@/shared/api/config/apiClient';

const useLogin = () => {
  return useMutation({
    mutationFn: async (variables: { email: string; password: string }) => {
      const response = await apiClient.post('/api/auth/login', variables);
      return response.data;
    },
  });
};

export default useLogin;
