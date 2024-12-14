import { create } from "zustand";
import { apiMethods } from "../api/apiMethods";

type User = {
  id: string;
  name: string;
  email: string;
  files: string[];
  sharedFiles: string[];
  createdAt: Date;
  updatedAt: Date;
};
type TokenGoogleResponse = {
  token: string;
  user: User;
};

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (googleResponse: TokenGoogleResponse) => void;
  logout: () => void;
  refreshToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem("authToken"),
  user: null,
  login: (googleResponse: TokenGoogleResponse) => {
    localStorage.setItem("authToken", googleResponse.token);
    set({ isAuthenticated: true, user: googleResponse.user });
  },
  logout: () => {
    localStorage.removeItem("authToken");
    set({ isAuthenticated: false, user: null });
  },
  refreshToken: async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        set({ isAuthenticated: false, user: null });
        return;
      }
      const result = await apiMethods.refreshToken({ body: { token } });

      set({
        isAuthenticated: true,
        user: result.data.user,
      });
    } catch (error) {
      console.error("Failed to refresh token", error);
      set({ isAuthenticated: false, user: null });
    }
  },
}));
