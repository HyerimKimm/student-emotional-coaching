import { Session, User } from '@supabase/supabase-js';
import { StateCreator, create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

type AuthStateType = {
  user: User | null;
  session: Session | null;
  profile: {
    id: string;
    name: string;
    role: string;
    createdAt: string;
  } | null;
};

const initialState: AuthStateType = {
  user: null,
  session: null,
  profile: null,
};

const store: StateCreator<AuthStateType> = (set) => ({
  ...initialState,
});

const persistStore = persist(store, {
  name: 'authStore',
  storage: createJSONStorage(() => sessionStorage),
});

export const useAuthStore = create(devtools(persistStore, { name: 'authStore' }));
