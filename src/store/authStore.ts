import { create } from "zustand";

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
  isAuthenticated: boolean;
  user: User | null;
  loading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!sessionStorage.getItem("authToken"),
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
    localStorage.removeItem("authToken");
    set({ isAuthenticated: false, user: null, error: null });
  },
}));
