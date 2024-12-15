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
      // handle error

      throw error;
    }
  } as T;
}
