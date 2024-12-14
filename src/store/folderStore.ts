import { create } from "zustand";
import { FolderType, FileType } from "../utils/types";
import { apiMethods } from "../api/apiMethods";

interface FolderState {
  folders: FolderType[];
  files: FileType[];
  currentFolderId: string | null;
  setCurrentFolderId: (id: string | null) => void;
  addFolder: (folder: FolderType) => void;
  addFile: (
    data: Blob | string,
    userId: string,
    isPublic?: boolean,
    parentId?: string | null
  ) => void;
  removeFolder: (folderId: string) => void;
  removeFile: (fileId: string) => void;
  getFiles: (id: string) => void;
  findFileById: (fileId: string) => FileType | null;
  findFileByName: (fileName: string) => FileType | null;
  loadFolders: (id: string) => Promise<void>;
  createFolder: (folder: {
    name: string;
    parentFolderId?: string;
  }) => Promise<void>;
  addFileToFolder: (folderId: string, file: any) => Promise<void>;
  addSubfolder: (folderId: string, subfolder: any) => Promise<void>;
}

export const useFolderStore = create<FolderState>((set, get) => ({
  folders: [],
  files: [],
  currentFolderId: null,
  setCurrentFolderId: (id) => set({ currentFolderId: id }),
  addFolder: async (folder) => {},
  addFile: async (data, userId, isPublic = true, parentId = null) => {
    const response = await apiMethods.uploadFile({
      body: {
        file: data,
        folderId: parentId,
        isPublic,
        userId,
      },
    });

    set((state) => {
      if (parentId) {
        return {
          folders: state.folders.map((folder) =>
            folder._id === parentId
              ? { ...folder, files: [...(folder.children || []), response] }
              : folder
          ),
        };
      } else {
        return {
          files: [...state.files, response],
        };
      }
    });
  },
  removeFolder: async (folderId) => {},
  removeFile: async (fileId) => {},
  getFiles: async (id) => {
    console.log("id", id);
    const files = await apiMethods.getFilesByUser({ pathParams: id });
    set({ files });
  },
  findFileById: (fileId) => {
    return get().files.find((file) => file._id === fileId) || null;
  },
  findFileByName: (fileName) => {
    return get().files.find((file) => file.name === fileName) || null;
  },
  loadFolders: async (id) => {
    const response = await apiMethods.getFoldersByUser({
      pathParams: id,
    });
    set({ folders: response });
  },
  createFolder: async (folder) => {
    const response = await apiMethods.createFolder({
      body: folder,
    });
    set((state) => ({
      folders: [...state.folders, response.data],
    }));
  },
  addFileToFolder: async (folderId, file) => {
    console.log("folderId", folderId);
    console.log("file", file);
    const response = await apiMethods.addFileToFolder({
      pathParams: folderId,
      body: file,
    });
    set((state) => {
      const updatedFolders = state.folders.map((folder) =>
        folder._id === folderId
          ? { ...folder, files: [...folder.files, response.data] }
          : folder
      );
      return { folders: updatedFolders };
    });
  },
  addSubfolder: async (folderId, subfolder) => {
    const response = await apiMethods.addSubFolderToFolder({
      pathParams: folderId,
      body: subfolder,
    });
    set((state) => {
      const updatedFolders = state.folders.map((folder) =>
        folder._id === folderId
          ? { ...folder, subFolders: [...folder.subFolders, response.data] }
          : folder
      );
      return { folders: updatedFolders };
    });
  },
}));
