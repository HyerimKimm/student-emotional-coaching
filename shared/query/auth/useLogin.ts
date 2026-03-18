import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const useLogin = () => {
  return useMutation({
    mutationFn: async (variables: { email: string; password: string }) => {
      const response = await axios.post('/api/auth/login', variables);
      return response.data;
    },
  });
};

export default useLogin;
