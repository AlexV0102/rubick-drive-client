import { useAuthStore } from "../store/authStore";
import { useGoogleLogin } from "../api/queries/auth";
import { setItemLocalStorage } from "../utils/localStorage";
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "../helpers/constants";

export const useHandleGoogleLogin = () => {
  const { mutate, error, isPending } = useGoogleLogin();
  const setUser = useAuthStore((state) => state.setUser);
  const setError = useAuthStore((state) => state.setError);

  const handleLogin = (
    token: string,
    callbacks?: { onSuccess?: () => void }
  ) => {
    mutate(token, {
      onSuccess: (response) => {
        setItemLocalStorage(ACCESS_TOKEN_KEY, response.accessToken);
        setItemLocalStorage(REFRESH_TOKEN_KEY, response.refreshToken);
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

  return { login: handleLogin, error, isPending };
};
