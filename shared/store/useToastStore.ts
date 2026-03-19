import dayjs from 'dayjs';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ToastStateType = 'success' | 'error';

type ToastType = {
  id: string;
  state: ToastStateType;
  message: string;
};

type ToastStoreType = {
  toastList: ToastType[];
  show: (state: ToastStateType, message: string) => void;
  close: () => void;
};

const store: StateCreator<ToastStoreType> = (set, get) => ({
  toastList: [],

  show: (state: ToastStateType, message: string) => {
    const uniqueKey = `${dayjs().valueOf()}-${get().toastList.length}`;

    const newToast = {
      id: uniqueKey, // 고유한 ID 생성
      state: state,
      message: message,
    };

    set({ toastList: [...get().toastList, newToast] });

    setTimeout(() => {
      get().close();
    }, 3000);
  },

  close: () => {
    set({
      toastList: get().toastList.slice(1),
    });
  },
});

const useToastStore = create(devtools(store, { name: 'toastStore' }));

export default useToastStore;
