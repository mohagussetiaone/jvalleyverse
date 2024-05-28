import { create } from "zustand";

const useStudyActive = create((set) => ({
  studyActive: 0,
  setStudyActive: (studyActive) => set(() => ({ studyActive })),
}));

export default useStudyActive;
