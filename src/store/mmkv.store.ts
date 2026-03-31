import { createMMKV } from "react-native-mmkv";
import { StateStorage } from "zustand/middleware";

const mmkvStorage = createMMKV();

export const zustandStorage: StateStorage = {
  removeItem: (name) => {
    mmkvStorage.remove(name);
  },
  setItem: (name, value) => {
    mmkvStorage.set(name, value);
  },
  getItem: (name) => {
    const value = mmkvStorage.getString(name);
    return value ?? null;
  },
};
