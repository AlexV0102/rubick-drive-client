import { wrapErrorHandling } from "../../utils/apiWrapper";
import axiosInstance from "../axios";

export const search = wrapErrorHandling(async (query: string) => {
  const response = await axiosInstance.get("http://localhost:3000/search", {
    params: { q: query },
  });
  return response.data;
});
