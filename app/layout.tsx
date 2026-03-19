import type { Metadata, Viewport } from 'next';
import { Noto_Sans_KR } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import { Suspense } from 'react';

import '@/shared/style/globals.scss';

import Navigation from '@/widget/navigation/Navigation';

import LoginFromQuery from './LoginFromQuery';
import Providers from './providers';

import styles from './layout.module.scss';
import { Toast } from '@/shared/ui/toast';

const notoSansKR = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-noto-sans-kr',
});

export const metadata: Metadata = {
  title: '마음 코치 - 학생 감정 케어 앱',
  description: '학생들의 감정과 학업 스트레스를 AI 챗봇과 함께 케어하는 앱',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
};

export const viewport: Viewport = {
  themeColor: '#3182F6',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={notoSansKR.variable}>
        <div className={styles.app_container}>
          <Suspense
            fallback={
              <div className={styles.loading}>
                <p className={styles.loading_text}>로그인 중...</p>
              </div>
            }
          >
            <Providers>
              <LoginFromQuery>
                <Navigation />
                {children}
              </LoginFromQuery>
              <Toast />
            </Providers>
          </Suspense>
        </div>
        <Analytics />
      </body>
    </html>
  );
}
