import axiosInstance from "../axios";
import { wrapErrorHandling } from "../../utils/apiWrapper";

export const createFolder = wrapErrorHandling(async (name: string) => {
  const response = await axiosInstance.post("/folders", { name });
  return response.data;
});

export const addSubfolder = wrapErrorHandling(
  async (
    folderId: string,
    subfolderData: { name: string; parentFolderId: string }
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

export const editFolderName = wrapErrorHandling(
  async (folderId: string, newName: string) => {
    const response = await axiosInstance.patch(`/folders/${folderId}/rename`, {
      name: newName,
    });
    return response.data;
  }
);

export const editFolder = wrapErrorHandling(
  async (folderId: string, data: any) => {
    const response = await axiosInstance.put(`/folders/${folderId}`, data);
    return response.data;
  }
);

export const deleteFolder = wrapErrorHandling(async (folderId: string) => {
  const response = await axiosInstance.delete(`/folders/${folderId}`);
  return response.data;
});

export const changeFolderVisibility = wrapErrorHandling(
  async (folderId, isPublic) => {
    const response = await axiosInstance.put(
      `/folders/${folderId}/visibility`,
      { isPublic }
    );
    return response.data;
  }
);

export const updateFolderPermissions = wrapErrorHandling(
  async (folderId, permissions) => {
    const response = await axiosInstance.put(
      `/folders/${folderId}/permissions`,
      { permissions }
    );
    return response.data;
  }
);
