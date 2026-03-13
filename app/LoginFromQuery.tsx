'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ErrorPage from '@/screens/ErrorPage';
import { useAuthStore } from '@/shared/stores/useAuthStore';

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
      setStatus('done');
      return;
    }

    if (!hasCredentials) {
      /* 쿼리파라미터에 id, pw 값이 없는 경우 */
      setStatus('fail');
      return;
    }

    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: id, password: password }),
    })
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            setLoginData(data.user, data.session, data.profile);
            setStatus('done');
          });
        } else {
          logout();
          setStatus('fail');
          router.replace('/error');
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        logout();
        setStatus('fail');
        router.replace('/error');
      });
  }, [id, password, hasCredentials, router, setLoginData, logout, isAlreadyLoggedIn]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-neutral-500">로그인 중...</p>
      </div>
    );
  }

  if (status === 'fail') {
    return <ErrorPage />;
  }

  return <>{children}</>;
}
