import { useAuthStore } from "../store/authStore";
import { useRefreshToken } from "../api/queries/auth";

export const useHandleTokenRefresh = () => {
  const { mutate, error } = useRefreshToken();
  const setUser = useAuthStore((state) => state.setUser);
  const setError = useAuthStore((state) => state.setError);

  const refreshToken = () => {
    const token = sessionStorage.getItem("authToken");
    if (!token) {
      console.info("No token found");
      return;
    }
    mutate(token, {
      onSuccess: (response) => {
        const { user, token } = response;
        sessionStorage.setItem("authToken", token);
        console.log("oncsuuces", user, token);
        setUser(user);
      },
      onError: (err) => {
        setError(err.message || "Failed to refresh token");
        // localStorage.removeItem("authToken");
      },
    });
  };

  return {
    refresh: refreshToken,
  };
};
