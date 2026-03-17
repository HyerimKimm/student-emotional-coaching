'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './Navigation.module.scss';

type Screen = 'home' | 'check' | 'chat';

export default function Navigation() {
  const router = useRouter();
  const pathname = usePathname();

  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  function handleScreenChange(screen: Screen) {
    setCurrentScreen(screen);

    if (screen === 'chat') {
      router.push('/chat');
      return;
    }

    if (screen === 'check') {
      router.push('/check');
      return;
    }

    router.push('/');
  }

  useEffect(() => {
    setCurrentScreen((pathname.split('/')[1] as Screen) || 'home');
  }, [pathname]);

  return (
    <nav className={styles.nav_tabs} role="tablist">
      <button
        className={`${styles.item} ${currentScreen === 'home' ? styles.active : ''}`}
        onClick={() => handleScreenChange('home')}
        role="tab"
        aria-selected={currentScreen === 'home'}
      >
        홈
      </button>
      <button
        className={`${styles.item} ${currentScreen === 'check' ? styles.active : ''}`}
        onClick={() => handleScreenChange('check')}
        role="tab"
        aria-selected={currentScreen === 'check'}
      >
        마음 체크
      </button>
      <button
        className={`${styles.item} ${currentScreen === 'chat' ? styles.active : ''}`}
        onClick={() => handleScreenChange('chat')}
        role="tab"
        aria-selected={currentScreen === 'chat'}
      >
        AI 코치
      </button>
    </nav>
  );
}
