import dayjs from 'dayjs';
import { StateCreator, create } from 'zustand';
import { devtools } from 'zustand/middleware';

type ToastStateType = 'success' | 'error';

type ToastType = {
  id: string;
  state: ToastStateType;
  message: string;
};
