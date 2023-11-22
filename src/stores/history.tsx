import { create } from 'zustand';

interface HistoryStore {
  validHistory: { value: string; label: string }[];
  setValidHistory: (validHistory: { value: string; label: string }[]) => void;
}

const useHistoryStore = create<HistoryStore>((set) => ({
  validHistory: [],
  setValidHistory: (validHistory: { value: string; label: string }[]) =>
    set({ validHistory }),
}));

export default useHistoryStore;
