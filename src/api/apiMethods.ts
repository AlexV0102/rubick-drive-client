import apiConfig, { ApiConfig } from "./apiConfig.ts";

export const apiMethods: Record<
  string,
  (args?: {
    body?: Record<string, any> | FormData;
    queryParams?: Record<string, any>;
    pathParams?: string;
    errorMessage?: string;
    responseType?: "json" | "blob" | "arraybuffer";
  }) => Promise<any>
> = {};

const baseUrl = import.meta.env?.VITE_API_BASE_URL;

const endpointReducer = (
  accumulator: typeof apiMethods,
  endpoint: ApiConfig
): typeof apiMethods => {
  const { name, url, method, errorMessage } = endpoint;

  accumulator[name] = async ({
    body,
    queryParams,
    pathParams,
    errorMessage: customErrorMessage,
    responseType = "json", // Default to JSON
  } = {}) => {
    // Resolve the URL dynamically if it's a function
    const resolvedUrl = typeof url === "function" ? url(pathParams) : url;

    // Call the API method with the appropriate arguments
    return method({
      url: resolvedUrl,
      body,
      queryParams,
      responseType, // Pass response type to the method
      errorMessage: customErrorMessage || errorMessage,
    });
  };

  return accumulator;
};

apiConfig(baseUrl).reduce(endpointReducer, apiMethods);
