import { create } from "zustand";

const useActiveMenu = create((set) => ({
  activeMenu: 0,
  setActiveMenu: (activeMenu) => set(() => ({ activeMenu })),
}));

export default useActiveMenu;
