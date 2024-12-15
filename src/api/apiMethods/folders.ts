import axiosInstance from "../axios";
import { wrapErrorHandling } from "../../utils/apiWrapper";

const createFolderMethod = async (name: string) => {
  const response = await axiosInstance.post("/folders", { name });
  return response.data;
};

export const addSubfolder = wrapErrorHandling(
  async (
    folderId: string,
    subfolderData: { name: string; owner: string; parentFolderId: string }
  ) => {
    const response = await axiosInstance.post(
      `/folders/${folderId}/subfolders`,
      subfolderData
    );
    return response.data;
  }
);

export const addFileToFolder = wrapErrorHandling(
  async (folderId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axiosInstance.post(
      `/folders/${folderId}/files`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  }
);

export const getFolderDetails = wrapErrorHandling(async (folderId: string) => {
  const response = await axiosInstance.get(`/folders/${folderId}`);
  return response.data;
});

export const createFolder = wrapErrorHandling(createFolderMethod);
