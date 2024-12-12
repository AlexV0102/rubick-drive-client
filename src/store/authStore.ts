import { create } from "zustand";

type User = {
  email: string;
  name: string;
  id: string;
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
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem("authToken"),
  user: null,
  login: (googleResponse: TokenGoogleResponse) => {
    console.log("Login action triggered");
    localStorage.setItem("authToken", googleResponse.token);
    console.log("local", localStorage.getItem("authToken"));
    set({ isAuthenticated: true, user: googleResponse.user });
  },
  logout: () => {
    console.log("Loguntntntntntntntntn action triggered");
    localStorage.removeItem("authToken");
    set({ isAuthenticated: false, user: null });
  },
}));
