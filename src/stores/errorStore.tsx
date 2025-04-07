import { create } from "zustand";

type ErrorMessage = {
  id: string;
  message: string;
};

type ErrorState = {
  errors: ErrorMessage[];
  addError: (message: string) => void;
  addErrors: (messages: string[]) => void;
  removeError: (id: string) => void;
  clearErrors: () => void;
};

export const useErrorStore = create<ErrorState>((set) => ({
  errors: [],

  addError: (message: string) => {
    const id = crypto.randomUUID();
    set((state) => ({
      errors: [...state.errors, { id, message }],
    }));
  },

  addErrors: (messages: string[]) => {
    const newErrors = messages.map((message) => ({
      id: crypto.randomUUID(),
      message,
    }));
    set((state) => ({
      errors: [...state.errors, ...newErrors],
    }));
  },

  removeError: (id: string) => {
    set((state) => ({
      errors: state.errors.filter((err) => err.id !== id),
    }));
  },

  clearErrors: () => set({ errors: [] }),
}));
