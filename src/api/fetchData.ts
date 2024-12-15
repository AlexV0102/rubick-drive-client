import axios, { AxiosInstance, AxiosResponse } from "axios";

export interface CustomError extends Error {
  status?: number;
}

const DEFAULT_ERROR = "Unknown error";

const createCustomError = (message: string, status?: number): CustomError => {
  const error = new Error(message) as CustomError;
  error.status = status;
  return error;
};

const axiosInstance: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

const get =
  <T>() =>
  async ({
    url,
    queryParams = {},
    errorMessage = DEFAULT_ERROR,
    responseType = "json",
  }: {
    url: string;
    queryParams?: Record<string, any>;
    errorMessage?: string;
    responseType?: "json" | "blob" | "arraybuffer";
  }): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axiosInstance.get(url, {
        params: queryParams,
        responseType,
      });
      return response.data;
    } catch (error: any) {
      console.error("Fetch Error:", error);
      throw createCustomError(errorMessage, error.response?.status);
    }
  };

const postOrPut =
  <T>(method: "POST" | "PUT") =>
  async ({
    url,
    body,
    queryParams = {},
    errorMessage = DEFAULT_ERROR,
  }: {
    url: string;
    body?: Record<string, any> | FormData;
    queryParams?: Record<string, any>;
    errorMessage?: string;
  }): Promise<T> => {
    try {
      let requestData: any = body;
      const headers: Record<string, string> = {};

      // Check if the body contains a file and metadata
      if (body && !(body instanceof FormData) && body.file) {
        const formData = new FormData();
        Object.entries(body).forEach(([key, value]) => {
          if (value !== undefined) {
            formData.append(key, value as any); // Attach metadata and file
          }
        });
        requestData = formData;
        headers["Content-Type"] = "multipart/form-data";
      }

      const response: AxiosResponse<T> = await axiosInstance({
        method,
        url,
        data: requestData,
        params: queryParams,
        headers,
      });

      return response.data;
    } catch (error: any) {
      console.error("Fetch Error:", error);
      throw createCustomError(errorMessage, error.response?.status);
    }
  };

const del =
  <T>() =>
  async ({
    url,
    queryParams = {},
    errorMessage = DEFAULT_ERROR,
  }: {
    url: string;
    queryParams?: Record<string, any>;
    errorMessage?: string;
  }): Promise<T> => {
    try {
      const response: AxiosResponse<T> = await axiosInstance.delete(url, {
        params: queryParams,
      });
      return response.data;
    } catch (error: any) {
      console.error("Fetch Error:", error);
      throw createCustomError(errorMessage, error.response?.status);
    }
  };

const getData = get();
const postData = postOrPut("POST");
const putData = postOrPut("PUT");
const deleteData = del();

export { getData, postData, putData, deleteData };
