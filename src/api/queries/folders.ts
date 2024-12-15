import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios";
import { getFolderDetails } from "../apiMethods/folders";

export const useGetFoldersByUser = () =>
  useQuery({
    queryKey: ["folders"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/folders`);
      return response.data;
    },
  });

export const useGetFolderById = (folderId: string) =>
  useQuery({
    queryKey: ["folder", folderId],
    queryFn: () => getFolderDetails(folderId),
  });

export const useCreateFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (folderData: {
      name: string;
      parentFolderId?: string;
    }) => {
      const response = await axiosInstance.post(`/folders`, folderData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["folders"] });
    },
  });
};

export const useAddSubfolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      folderId,
      subfolderData,
    }: {
      folderId: string;
      subfolderData: { name: string };
    }) => {
      const response = await axiosInstance.post(
        `/folders/${folderId}/folders`,
        subfolderData
      );
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries(["folder", variables.folderId]);
    },
  });
};
