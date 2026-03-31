import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { UserType } from "@/types";

import { zustandStorage } from "./mmkv.store";

type AuthState = {
  token: null | string;
  user: null | UserType;
  signOut: VoidFunction;
  language?: null | string;
  setUser: (user: null | UserType) => void;
  setToken: (token: null | string) => void;
  setLanguage: (lang: null | string) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      language: null,
      signOut: () => set({ user: null, token: null, language: null }),
      setUser: (user: null | UserType) => set((state) => ({ ...state, user })),
      setToken: (token: null | string) => set((state) => ({ ...state, token })),
      setLanguage: (lang: null | string) =>
        set((state) => ({ ...state, language: lang })),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        user: state.user,
        language: state.language,
      }),
    },
  ),
);
