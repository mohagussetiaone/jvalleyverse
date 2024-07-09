import { create } from "zustand";
import Idn from "@/assets/flag/flagIdn.png";

export const useLanguageStore = create((set) => ({
  selectedLang: { code: "id", name: "ID", flag: Idn },
  setSelectedLang: (lang) => set({ selectedLang: lang }),
}));
