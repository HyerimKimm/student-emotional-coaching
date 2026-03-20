'use client';

import { useIsFetching, useIsMutating } from '@tanstack/react-query';
import styles from './LoadingOveray.module.scss';
import LoadingIcon from '@/shared/asset/icons/LoadingIcon';

export default function LoadingOveray() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  if (isFetching > 0 || isMutating > 0) {
    return (
      <div className={styles.loading_wrap}>
        <LoadingIcon />
      </div>
    );
  }

  return null;
}
