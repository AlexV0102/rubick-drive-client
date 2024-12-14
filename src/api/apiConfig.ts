import { deleteData, getData, postData } from "./fetchData.ts";

export interface ApiConfig {
  name: string;
  url: string | ((...args: any[]) => string);
  method: <T>(args: {
    url: string; // URL is required
    body?: Record<string, any> | FormData;
    queryParams?: Record<string, any>;
    pathParams?: string;
    errorMessage?: string;
    responseType?: "json" | "blob" | "arraybuffer";
  }) => Promise<T>;
  errorMessage: string;
}

const apiConfig = (baseURL: string): ApiConfig[] => [
  {
    name: "googleAuthUrl",
    url: `${baseURL}/auth/google-url`,
    method: getData,
    errorMessage: "Failed to get google auth url",
  },
  {
    name: "googleValidateToken",
    url: `${baseURL}/auth/google-login`,
    method: postData,
    errorMessage: "Failed to validate token",
  },
  {
    name: "refreshToken",
    url: `${baseURL}/auth/refresh-token`,
    method: postData,
    errorMessage: "Failed to refresh token",
  },
  {
    name: "getFoldersByUser",
    url: (id) => `${baseURL}/folders/${id}`,
    method: getData,
    errorMessage: "Failed to get folders",
  },
  {
    name: "getFolderById",
    url: `${baseURL}/folders/getFolderById`,
    method: postData,
    errorMessage: "Failed to get folder",
  },
  {
    name: "addFileToFolder",
    url: (folderId) => `${baseURL}/folders/${folderId}/files`,
    method: postData,
    errorMessage: "Failed to add file to folder",
  },
  {
    name: "addSubFolderToFolder",
    url: (folderId) => `${baseURL}/folders/${folderId}/folders`,
    method: postData,
    errorMessage: "Failed to add subfolder to folder",
  },
  {
    name: "getFilesByUser",
    url: (userId) => `${baseURL}/files/${userId}`,
    method: getData,
    errorMessage: "Failed to get files",
  },
  {
    name: "getFileData",
    url: (fileName: string) => `${baseURL}/files/serve/${fileName}`,
    method: getData,
    errorMessage: "Failed to get file data",
  },
  {
    name: "createFolder",
    url: `${baseURL}/folders`,
    method: postData,
    errorMessage: "Failed to create folder",
  },
  {
    name: "uploadFile",
    url: `${baseURL}/files/upload`,
    method: postData,
    errorMessage: "Failed to upload file",
  },
  {
    name: "createFile",
    url: `${baseURL}/files`,
    method: postData,
    errorMessage: "Failed to create file",
  },
  {
    name: "deleteFile",
    url: (fileId: string) => `${baseURL}/files/${fileId}`,
    method: deleteData,
    errorMessage: "Failed to delete file",
  },
  {
    name: "uploadFolder",
    url: `${baseURL}/files`,
    method: postData,
    errorMessage: "Failed to upload folder",
  },
];

export default apiConfig;
