import { create } from "zustand";

interface loginFormStore {
  email: string;
  password: string;
  showPassword: boolean;
  togglePassword: () => void;
  setField: (field: string, value: string) => void;
}

const useLoginFormStore = create<loginFormStore>((set) => ({
  email: "",
  password: "",
  showPassword: false,
  togglePassword: () => set((state) => ({ showPassword: !state.showPassword })),
  setField: (field, value) => set((state) => ({ [field]: value })),
}));

export default useLoginFormStore;
