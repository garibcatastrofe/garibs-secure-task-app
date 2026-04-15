import { create } from "zustand";

interface AuthState {
  user: { id: number } | null;
  setUser: (user: { user: { id: number } | null }) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  setUser: (user) => set(user),
}));
