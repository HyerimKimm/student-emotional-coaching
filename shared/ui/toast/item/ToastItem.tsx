'use client';

import styles from './ToastItem.module.scss';

type ToastItemType = {
  id: string;
  state: 'success' | 'error';
  message: string;
  isClosing: boolean;
};

export default function ToastItem({ toastItem }: { toastItem: ToastItemType }) {
  return (
    <div
      className={`${styles.toast} ${styles[toastItem.state]} ${toastItem.isClosing ? styles.closing : ''}`}
    >
      <div className={styles.text}>
        <p>{toastItem.message}</p>
      </div>
    </div>
  );
}
