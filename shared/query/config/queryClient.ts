import { QueryClient } from '@tanstack/react-query';

const STALE_TIME_MS = 300 * 60 * 1000;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: STALE_TIME_MS,
      retry: 2,
    },
  },
});

export default queryClient;
