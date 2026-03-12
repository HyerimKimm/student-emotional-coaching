'use client';

import { AlertCircle } from 'lucide-react';

export default function ErrorPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-6">
      <div className="flex flex-col items-center text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-10 w-10 text-destructive" />
        </div>
        
        <h1 className="mb-3 text-2xl font-bold text-foreground">
          접근할 수 없는 페이지예요
        </h1>
        
        <p className="max-w-sm text-base leading-relaxed text-muted-foreground">
          로그인 정보가 올바르지 않거나,
          <br />
          접근 권한이 없는 페이지입니다.
          <br />
          올바른 링크로 다시 접속해 주세요.
        </p>
      </div>
    </div>
  );
}
