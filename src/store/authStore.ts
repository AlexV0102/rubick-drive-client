import { create } from "zustand";
import {
  getItemLocalStorage,
  removeItemLocalStorage,
} from "../utils/localStorage";

type User = {
  id: string;
  name: string;
  email: string;
  files: string[];
  sharedFiles: string[];
  createdAt: Date;
  updatedAt: Date;
};

interface AuthState {
  getState(): unknown;
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  // authToken: string | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!getItemLocalStorage("accessToken"),
  user: null,
  loading: false,
  error: null,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  logout: () => {
    removeItemLocalStorage("accessToken");
    removeItemLocalStorage("refreshToken");
    set({ isAuthenticated: false, user: null, error: null });
  },
}));
