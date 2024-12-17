import axiosInstance from "../axios";
import { wrapErrorHandling } from "../../utils/apiWrapper";

export const deleteFile = wrapErrorHandling(async (id: string) => {
  const response = await axiosInstance.delete(`/files/${id}`);
  return response.data;
});

export const uploadFile = wrapErrorHandling(
  async (file: File, isPublic?: boolean, folderId?: string) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("isPublic", String(isPublic));

    if (folderId) formData.append("folderId", folderId);

    const response = await axiosInstance.post(`/files/upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  }
);

export const updateFilePermissions = wrapErrorHandling(
  async (fileId: string, permissions: { email: string; role: string }[]) => {
    const response = await axiosInstance.put(`/files/${fileId}/permissions`, {
      permissions,
    });
    return response.data;
  }
);

export const editFileName = wrapErrorHandling(
  async (fileId: string, newName: string) => {
    const response = await axiosInstance.put(`/files/${fileId}/rename`, {
      name: newName,
    });
    return response.data;
  }
);

export const cloneFile = wrapErrorHandling(async (fileId: string) => {
  const response = await axiosInstance.post(`/files/${fileId}/clone`);
  return response.data;
});

export const changeFileVisibility = wrapErrorHandling(
  async (fileId, isPublic) => {
    const response = await axiosInstance.put(`/files/${fileId}/visibility`, {
      isPublic,
    });
    return response.data;
  }
);
