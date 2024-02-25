// formStore.ts
import { create } from "zustand";

interface FormStore {
  password: string;
  confirm: string;
  showPassword: boolean;
  showConfirmPassword: boolean;
  togglePassword: () => void;
  toggleConfirmPassword: () => void;
  setField: (field: string, value: string) => void;
}

const useForgotPassStore = create<FormStore>((set) => ({
  password: "",
  confirm: "",
  showPassword: false,
  showConfirmPassword: false,
  togglePassword: () => set((state) => ({ showPassword: !state.showPassword })),
  toggleConfirmPassword: () =>
    set((state) => ({ showConfirmPassword: !state.showConfirmPassword })),
  setField: (field, value) => set((state) => ({ [field]: value })),
}));

export default useForgotPassStore;
