'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

type Status = 'idle' | 'loading' | 'done' | 'fail';

export default function LoginFromQuery({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState<Status>('loading');

  const Id = searchParams.get('Id');
  const pw = searchParams.get('pw');
  const hasCredentials = Boolean(Id && pw);

  useEffect(() => {
    if (!hasCredentials) return;
    const ctrl = new AbortController();

    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: Id, password: pw }),
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
  }, [Id, pw, hasCredentials, router]);

  const effectiveStatus = !hasCredentials ? 'done' : status;

  if (effectiveStatus === 'loading') {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-neutral-500">로그인 중...</p>
      </div>
    );
  }

  if (effectiveStatus === 'fail') {
    return null;
  }

  return <>{children}</>;
}
