import { create } from "zustand";
import {
  getItemLocalStorage,
  removeItemLocalStorage,
} from "../utils/localStorage";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../helpers/constants";

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
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: !!getItemLocalStorage("accessToken"),
  user: null,
  loading: false,
  error: null,

  getState: () => get(),

  setUser: (user) =>
    set({
      user,
      isAuthenticated: !!user,
    }),

  setLoading: (loading) => set({ loading }),

  setError: (error) => set({ error }),

  logout: () => {
    removeItemLocalStorage(ACCESS_TOKEN_KEY);
    removeItemLocalStorage(REFRESH_TOKEN_KEY);
    set({ isAuthenticated: false, user: null, error: null });
  },
}));
