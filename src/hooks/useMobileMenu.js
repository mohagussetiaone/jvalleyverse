import { create } from "zustand";

const useMobileMenu = create((set) => ({
  mobileMenu: null,
  setMobileMenu: (mobileMenu) => set(() => ({ mobileMenu })),
}));

export default useMobileMenu;
