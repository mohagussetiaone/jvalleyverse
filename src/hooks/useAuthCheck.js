import { create } from "zustand";

export const useAuthCheck = create((set) => ({
  auth: [],
  setAuth: (auth) => set(() => ({ auth })),
}));
