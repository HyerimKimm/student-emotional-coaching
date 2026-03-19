import useToastStore from '@/shared/store/useToastStore';

const useToast = () => {
  const show = useToastStore((state) => state.show);

  return show;
};

export default useToast;
