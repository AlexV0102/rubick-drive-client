import { useAuthStore } from "../store/authStore";
import { useGoogleLogin } from "../api/queries/auth";

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
        sessionStorage.setItem("authToken", response.token);
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
