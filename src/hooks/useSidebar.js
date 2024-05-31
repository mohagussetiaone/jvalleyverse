import { create } from "zustand";

const useSidebar = create((set) => ({
  collapsed: true,
  setMenuCollapsed: (collapsed) => set(() => ({ collapsed })),
}));

export default useSidebar;
