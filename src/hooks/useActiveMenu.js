import { create } from "zustand";

const useActiveMenu = create((set) => ({
  activeMenu: 1,
  setActiveMenu: (activeMenu) => set(() => ({ activeMenu })),
}));

export default useActiveMenu;
