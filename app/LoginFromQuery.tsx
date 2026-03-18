'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ErrorPage from '@/screens/error-page/ErrorPage';
import { useAuthStore } from '@/shared/store/useAuthStore';

import styles from './LoginFromQuery.module.scss';

type Status = 'loading' | 'done' | 'fail';

export default function LoginFromQuery({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const session = useAuthStore((state) => state.session);
  const profile = useAuthStore((state) => state.profile);
  const setLoginData = useAuthStore((state) => state.setLoginData);
  const logout = useAuthStore((state) => state.logout);

  const [status, setStatus] = useState<Status>('loading');

  const id = searchParams.get('id');
  const password = searchParams.get('pw');

  const hasCredentials = Boolean(id && password);
  const isAlreadyLoggedIn = Boolean(user && session && profile);

  useEffect(() => {
    if (isAlreadyLoggedIn) {
      queueMicrotask(() => setStatus('done'));
      return;
    }

    if (!hasCredentials) {
      /* 쿼리파라미터에 id, pw 값이 없는 경우 */
      queueMicrotask(() => setStatus('fail'));
      return;
    }

    axios
      .post('/api/auth/login', { email: id, password })
      .then((res) => {
        setLoginData(res.data?.data?.user, res.data?.data?.session, res.data?.data?.profile);
        setStatus('done');
      })
      .catch((err) => {
        logout();
        setStatus('fail');
        router.replace('/error');
      });
  }, [id, password, hasCredentials, router, setLoginData, logout, isAlreadyLoggedIn]);

  if (status === 'loading') {
    return (
      <div className={styles.loading_wrap}>
        <p className={styles.loading_text}>로그인 중...</p>
      </div>
    );
  }

  if (status === 'fail') {
    return <ErrorPage />;
  }

  return <>{children}</>;
}
