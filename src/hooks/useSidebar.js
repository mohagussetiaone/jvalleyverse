import { create } from "zustand";

const useSidebar = create((set) => ({
  collapsed: null,
  setMenuCollapsed: (collapsed) => set(() => ({ collapsed })),
}));

export default useSidebar;
