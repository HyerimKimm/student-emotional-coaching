'use client';

import styles from './LoadingOveray.module.scss';
import LoadingIcon from '@/shared/asset/icons/LoadingIcon';

export default function LoadingOveray() {
  return (
    <div className={styles.loading_wrap}>
      <LoadingIcon />
    </div>
  );
}
