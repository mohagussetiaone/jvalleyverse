import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useUser = create(
  persist(
    (set) => ({
      userData: null,
      setUserData: (userData) => {
        set(() => ({ userData }));
      },
    }),
    {
      name: "user-data",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
