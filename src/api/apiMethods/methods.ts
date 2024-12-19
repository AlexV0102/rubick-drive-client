import { REFRESH_TOKEN_KEY } from "../../helpers/constants";
import { wrapErrorHandling } from "../../utils/apiWrapper";
import { getItemLocalStorage } from "../../utils/localStorage";
import axiosInstance from "../axios";

export const search = wrapErrorHandling(async (query: string) => {
  const response = await axiosInstance.get("/search", {
    params: { q: query },
  });
  return response.data;
});

export const refreshAccessToken = wrapErrorHandling(async () => {
  const refreshToken = getItemLocalStorage(REFRESH_TOKEN_KEY);
  if (!refreshToken) {
    return null;
  }
  const response = await axiosInstance.post("/auth/refresh-token", {
    refreshToken,
  });
  return response.data;
});
