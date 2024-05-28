import { create } from "zustand";

const useSidebarToggle = create((set) => ({
  sidebarOpen: false,
  setSidebarOpen: (sidebarOpen) => set(() => ({ sidebarOpen })),
}));

export default useSidebarToggle;
