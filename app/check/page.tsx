'use client';

import { EmotionCheck } from '@/screens/emotion-check/EmotionCheck';
import LoadingOveray from '@/widget/loading_overay/LoadingOveray';
import { useIsFetching, useIsMutating } from '@tanstack/react-query';

export default function CheckPage() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  return (
    <>
      {(isFetching > 0 || isMutating > 0) && <LoadingOveray />}
      <EmotionCheck />
    </>
  );
}
