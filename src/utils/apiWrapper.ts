import type { AxiosError } from "axios";
import { toast } from "react-toastify";

export function wrapErrorHandling<T extends (...args: any[]) => Promise<any>>(
  fn: T
): T {
  return async function (...args: Parameters<T>): Promise<ReturnType<T>> {
    // eslint-disable-next-line no-useless-catch
    try {
      return await fn(...args);
    } catch (error) {
      const axiosError = error as AxiosError;
      const errorMessage =
        axiosError.response?.data?.message ||
        axiosError.message ||
        "An error occurred";
      toast.error(errorMessage);
      throw error;
    }
  } as T;
}
