'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import useToastStore from '@/shared/store/useToastStore';

import styles from './Toast.module.scss';
import ToastItem from './item/ToastItem';

export default function Toast() {
  const [mounted, setMounted] = useState(false);

  const toastList = useToastStore((state) => state.toastList);

  useEffect(() => {
    queueMicrotask(() => setMounted(true));
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className={styles.toast_wrap}>
      {toastList.map((toastItem) => {
        return <ToastItem key={toastItem.id} toastItem={toastItem} />;
      })}
    </div>,
    window.document.body
  );
}
