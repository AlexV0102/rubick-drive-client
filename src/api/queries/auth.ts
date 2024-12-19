import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";

const API_BASE_URL = import.meta.env?.VITE_API_BASE_URL;

export const useGoogleAuthUrl = () =>
  useQuery({
    queryKey: ["googleAuthUrl"],
    queryFn: async () => {
      const response = await axios.get(`${API_BASE_URL}/auth/google-url`);
      return response.data;
    },
  });

export const useGoogleLogin = () =>
  useMutation<any, Error, string>({
    mutationFn: async (token: string) => {
      const response = await axios.post(`${API_BASE_URL}/auth/google-login`, {
        token,
      });
      return response.data;
    },
  });
