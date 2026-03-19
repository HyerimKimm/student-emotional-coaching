'use client';

import styles from './ToastItem.module.scss';

type ToastItemType = {
  id: string;
  state: 'success' | 'error';
  message: string;
};

export default function ToastItem({ toastItem }: { toastItem: ToastItemType }) {
  return (
    <div className={`${styles.toast} ${styles[toastItem.state]}`}>
      <div className={styles.text}>
        <p>{toastItem.message}</p>
      </div>
    </div>
  );
}
