'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ErrorPage from '@/screens/ErrorPage';

type Status = 'idle' | 'loading' | 'done' | 'fail';

export default function LoginFromQuery({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [status, setStatus] = useState<Status>('loading');

  const id = searchParams.get('id');
  const password = searchParams.get('pw');

  const hasCredentials = Boolean(id && password);

  useEffect(() => {
    if (!hasCredentials) {
      /* 쿼리파라미터에 id, pw 값이 없는 경우 */
      setStatus('fail');
      return;
    }
    const ctrl = new AbortController();

    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: id, password: password }),
      signal: ctrl.signal,
    })
      .then((res) => {
        if (res.ok) {
          setStatus('done');
        } else {
          setStatus('fail');
          router.replace('/error');
        }
      })
      .catch((err) => {
        if (err.name === 'AbortError') return;
        setStatus('fail');
        router.replace('/error');
      });
    return () => ctrl.abort();
  }, [id, password, hasCredentials, router]);

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
