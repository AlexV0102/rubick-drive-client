import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axios";

import { useQueries } from "@tanstack/react-query";

export const useGetFileData = (id: string) => {
  const [metadataQuery, blobQuery] = useQueries({
    queries: [
      {
        queryKey: ["fileMetadata", id],
        queryFn: async () => {
          const response = await axiosInstance.get(`/files/${id}/metadata`);
          return response.data;
        },
        staleTime: 60000,
      },
      {
        queryKey: ["fileBlob", id],
        queryFn: async () => {
          const response = await axiosInstance.get(`/files/${id}/serve`, {
            responseType: "blob",
          });
          return response.data;
        },
        enabled: !!id,
        staleTime: Infinity,
      },
    ],
  });

  return {
    metadata: metadataQuery.data,
    blob: blobQuery.data,
    isLoading: metadataQuery.isLoading || blobQuery.isLoading,
    isError: metadataQuery.isError || blobQuery.isError,
    error: metadataQuery.error || blobQuery.error,
    refetch: () => {
      metadataQuery.refetch();
      blobQuery.refetch();
    },
  };
};

export const useGetFiles = () => {
  return useQuery({
    queryKey: ["files"],
    queryFn: async () => {
      const response = await axiosInstance.get("/files");
      return response.data;
    },
  });
};

export const useAddFileToFolder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      folderId,
      file,
    }: {
      folderId: string;
      file: FormData;
    }) => {
      const response = await axiosInstance.post(
        `/folders/${folderId}/files`,
        file,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["folder", variables.folderId],
      });
    },
  });
};
