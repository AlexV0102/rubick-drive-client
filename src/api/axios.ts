import axios from "axios";
import {
  getItemLocalStorage,
  setItemLocalStorage,
} from "../utils/localStorage";
import { refreshAccessToken } from "./apiMethods/methods";
import { useAuthStore } from "../store/authStore";
import { ACCESS_TOKEN_KEY } from "../helpers/constants";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (token) {
      prom.resolve(token);
    } else {
      prom.reject(error);
    }
  });
  failedQueue = [];
};

axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = getItemLocalStorage(ACCESS_TOKEN_KEY);
    const user = useAuthStore.getState().user;

    if (!user) return config;
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (originalRequest.url.includes("/refresh-token")) {
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { user, accessToken } = await refreshAccessToken();

        if (accessToken) {
          useAuthStore.getState().setUser(user);

          setItemLocalStorage(ACCESS_TOKEN_KEY, accessToken);
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          processQueue(null, accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        } else {
          console.error("No new access token received. Logging out.");
          useAuthStore.getState().logout();
        }
      } catch (refreshError) {
        console.error("Token refresh failed. Logging out:", refreshError);
        useAuthStore.getState().logout();
        processQueue(refreshError, null);
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
