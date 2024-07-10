import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useAuthData = create(
  persist(
    (set) => ({
      authData: {},
      setAuthData: (authData) => {
        set(() => ({ authData }));
      },
    }),
    {
      name: "auth-login-data",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
