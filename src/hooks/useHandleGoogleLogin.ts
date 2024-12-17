import { useAuthStore } from "../store/authStore";
import { useGoogleLogin } from "../api/queries/auth";
import { setItemLocalStorage } from "../utils/localStorage";

export const useHandleGoogleLogin = () => {
  const { mutate, error } = useGoogleLogin();
  const setUser = useAuthStore((state) => state.setUser);
  const setError = useAuthStore((state) => state.setError);

  const handleLogin = (
    token: string,
    callbacks?: { onSuccess?: () => void }
  ) => {
    mutate(token, {
      onSuccess: (response) => {
        setItemLocalStorage("accessToken", response.accessToken);
        setItemLocalStorage("refreshToken", response.refreshToken);
        setUser(response.user);

        if (callbacks?.onSuccess) {
          callbacks.onSuccess();
        }
      },
      onError: (err) => {
        setError(err?.message || "Failed to login with Google");
      },
    });
  };

  return { login: handleLogin, error };
};
