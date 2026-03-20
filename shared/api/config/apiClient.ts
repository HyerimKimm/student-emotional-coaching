'use client';

import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/shared/store/useAuthStore';
import { supabase } from '@/shared/lib/supabase';

type RetryableRequestConfig = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

const apiClient = axios.create({
  baseURL: '/',
});

let refreshPromise: Promise<string | null> | null = null;

const refreshAccessToken = async (): Promise<string | null> => {
  const { session, user, profile, setLoginData, logout } = useAuthStore.getState();
  const refreshToken = session?.refresh_token;

  if (!refreshToken) {
    logout();
    return null;
  }

  const { data, error } = await supabase.auth.refreshSession({
    refresh_token: refreshToken,
  });

  if (error || !data.session || !data.user) {
    logout();
    return null;
  }

  setLoginData(data.user, data.session, profile);
  return data.session.access_token;
};

apiClient.interceptors.request.use((config) => {
  const accessToken = useAuthStore.getState().session?.access_token;

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const status = error.response?.status;
    const originalConfig = error.config as RetryableRequestConfig | undefined;

    if (!originalConfig || originalConfig._retry || status !== 401) {
      return Promise.reject(error);
    }

    // 로그인 호출 자체는 재시도 대상에서 제외
    if (originalConfig.url?.includes('/api/auth/login')) {
      useAuthStore.getState().logout();
      return Promise.reject(error);
    }

    originalConfig._retry = true;

    if (!refreshPromise) {
      refreshPromise = refreshAccessToken().finally(() => {
        refreshPromise = null;
      });
    }

    const newAccessToken = await refreshPromise;

    if (!newAccessToken) {
      return Promise.reject(error);
    }

    originalConfig.headers = originalConfig.headers ?? {};
    originalConfig.headers.Authorization = `Bearer ${newAccessToken}`;

    return apiClient(originalConfig);
  }
);

export default apiClient;
