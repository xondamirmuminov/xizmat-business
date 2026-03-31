import { create } from "zustand";
import { UnistylesRuntime } from "react-native-unistyles";
import { persist, createJSONStorage } from "zustand/middleware";

import { zustandStorage } from "./mmkv.store";

export type AppThemes = "dark" | "light" | "system-default";

type ThemeState = {
  currentTheme: AppThemes;
  setCurrentTheme: (theme: AppThemes) => void;
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      currentTheme: "system-default",
      setCurrentTheme: (theme: AppThemes) => {
        if (theme !== "system-default") {
          UnistylesRuntime.setAdaptiveThemes(false);
          UnistylesRuntime.setTheme(theme);
          return set((state) => ({ ...state, currentTheme: theme }));
        }

        UnistylesRuntime.setAdaptiveThemes(true);
        return set((state) => ({ ...state, currentTheme: "system-default" }));
      },
    }),
    {
      name: "theme-store",
      storage: createJSONStorage(() => zustandStorage),
      partialize: (state) => ({
        currentTheme: state.currentTheme,
      }),
    },
  ),
);
