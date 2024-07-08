import { create } from "zustand";

const useChapterProject = create((set) => ({
  dataChapters: [],
  setDataChapters: (data) => set({ dataChapters: data }),
}));

export default useChapterProject;
