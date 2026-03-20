'use client';

import { useIsFetching } from '@tanstack/react-query';
import styles from './LoadingOveray.module.scss';
import LoadingIcon from '@/shared/asset/icons/LoadingIcon';

export default function LoadingOveray() {
  const isFetching = useIsFetching();

  if (isFetching > 0) {
    return (
      <div className={styles.loading_wrap}>
        <LoadingIcon />
      </div>
    );
  }

  return null;
}
