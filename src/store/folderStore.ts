import { create } from "zustand";
import { FolderType, FileType } from "../utils/types";
import { apiMethods } from "../api/apiMethods";

interface FolderState {
  folders: FolderType[];
  files: FileType[];
  currentFolderId: string | null;
  setCurrentFolderId: (id: string | null) => void;
  addFolder: (folder: FolderType) => void;
  addFile: (file: FileType) => void;
  removeFolder: (folderId: string) => void;
  removeFile: (fileId: string) => void;
  getFiles: () => void;
  findFileById: (fileId: string) => FileType | null;
  findFileByName: (fileName: string) => FileType | null;
}

export const useFolderStore = create<FolderState>((set, get) => ({
  folders: [],
  files: [],
  currentFolderId: null,
  setCurrentFolderId: (id) => set({ currentFolderId: id }),
  addFolder: async (folder) => {},
  addFile: async (file: FileType) => {
    const response = await apiMethods.uploadFile({
      body: {
        file: file.data,
        folderId: file.parentId,
      },
    });

    set((state) => {
      if (file.parentId) {
        return {
          folders: state.folders.map((folder) =>
            folder.id === file.parentId
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
  getFiles: async () => {
    const files = await apiMethods.getFiles();
    console.log("files", files);
    set({ files });
  },
  findFileById: (fileId) => {
    return get().files.find((file) => file.id === fileId) || null;
  },
  findFileByName: (fileName) => {
    return get().files.find((file) => file.name === fileName) || null;
  },
}));
