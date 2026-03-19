import dayjs from 'dayjs';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ToastStateType = 'success' | 'error';

type ToastType = {
  id: string;
  state: ToastStateType;
  message: string;
  isClosing: boolean;
};

type ToastStoreType = {
  toastList: ToastType[];
  show: (state: ToastStateType, message: string) => void;
  close: (id?: string) => void;
};

const TOAST_EXIT_DURATION_MS = 260;

const store: StateCreator<ToastStoreType> = (set, get) => ({
  toastList: [],

  show: (state: ToastStateType, message: string) => {
    const uniqueKey = `${dayjs().valueOf()}-${get().toastList.length}`;

    const newToast = {
      id: uniqueKey, // 고유한 ID 생성
      state: state,
      message: message,
      isClosing: false,
    };

    set({ toastList: [...get().toastList, newToast] });

    setTimeout(() => {
      get().close(uniqueKey);
    }, 3000);
  },

  close: (id) => {
    const targetId = id ?? get().toastList[0]?.id;
    if (!targetId) return;

    set({
      toastList: get().toastList.map((toast) =>
        toast.id === targetId ? { ...toast, isClosing: true } : toast
      ),
    });

    setTimeout(() => {
      set({
        toastList: get().toastList.filter((toast) => toast.id !== targetId),
      });
    }, TOAST_EXIT_DURATION_MS);
  },

});

const useToastStore = create(devtools(store, { name: 'toastStore' }));

export default useToastStore;
