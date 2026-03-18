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
  setLoginData: (
    user: User,
    session: Session,
    profile: { id: string; name: string; role: string; createdAt: string } | null
  ) => void;
  logout: () => void;
};

const initialState = {
  user: null,
  session: null,
  profile: null,
};

const store: StateCreator<AuthStateType> = (set) => ({
  ...initialState,
  setLoginData: (user, session, profile) => set({ user, session, profile }),
  logout: () => set({ ...initialState }),
});

const persistStore = persist(store, {
  name: 'authStore',
  storage: createJSONStorage(() => sessionStorage),
});

export const useAuthStore = create(devtools(persistStore, { name: 'authStore' }));
