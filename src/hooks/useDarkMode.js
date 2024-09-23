import { create } from "zustand";

const useDarkMode = create((set) => {
  // Cek preferensi tema perangkat
  const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
  console.log("darkMode", prefersDarkMode);

  return {
    darkMode: prefersDarkMode, // Set default berdasarkan preferensi user
    toggleDarkMode: () =>
      set((state) => {
        const isDarkMode = !state.darkMode;
        if (isDarkMode) {
          document.body.classList.add("dark");
        } else {
          document.body.classList.remove("dark");
        }
        return { darkMode: isDarkMode };
      }),
  };
});

export default useDarkMode;
