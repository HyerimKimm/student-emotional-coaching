'use client';

import LoadingIcon from '@/shared/asset/icons/LoadingIcon';

import styles from './LoadingOveray.module.scss';

export default function LoadingOveray() {
  return (
    <div className={styles.loading_wrap}>
      <LoadingIcon />
    </div>
  );
}
