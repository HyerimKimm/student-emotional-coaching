'use client';

import { AlertCircle } from 'lucide-react';

import styles from './ErrorPage.module.scss';

export default function ErrorPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.icon_wrap}>
          <AlertCircle className={styles.icon} size={40} />
        </div>

        <h1 className={styles.title}>접근할 수 없는 페이지예요</h1>

        <p className={styles.text}>
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
