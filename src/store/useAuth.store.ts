import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import { UserType } from "@/types";

import { zustandStorage } from "./mmkv.store";

type AuthState = {
  token: null | string;
  user: null | UserType;
  hasBusiness?: boolean;
  signOut: VoidFunction;
  language?: null | string;
  businessId: null | string;
  setUser: (user: null | UserType) => void;
  setToken: (token: null | string) => void;
  setLanguage: (lang: null | string) => void;
  setHasBusiness: (hasBusiness: boolean) => void;
  setBusinessId: (businessId: null | string) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      language: null,
      businessId: null,
      hasBusiness: false,
      setUser: (user: null | UserType) => set((state) => ({ ...state, user })),
      setToken: (token: null | string) => set((state) => ({ ...state, token })),
      signOut: () =>
        set({ user: null, token: null, language: null, businessId: null }),
      setLanguage: (lang: null | string) =>
        set((state) => ({ ...state, language: lang })),
      setHasBusiness: (hasBusiness: boolean) =>
        set((state) => ({ ...state, hasBusiness })),
      setBusinessId: (businessId: null | string) =>
        set((state) => ({ ...state, businessId })),
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        user: state.user,
        language: state.language,
        businessId: state.businessId,
        hasBusiness: state.hasBusiness,
      }),
    },
  ),
);
