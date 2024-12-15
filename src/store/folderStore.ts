import { create } from "zustand";
import { FolderType, FileType } from "../utils/types";

interface FolderState {
  folders: FolderType[];
  files: FileType[];
  currentFolderId: string | null;
  setCurrentFolderId: (id: string | null) => void;
  setFolders: (folders: FolderType[]) => void;
  setFiles: (files: FileType[]) => void;
  addFolder: (folder: FolderType) => void;
  updateFolder: (folderId: string, updatedFolder: Partial<FolderType>) => void;
  removeFolder: (folderId: string) => void;
  addFile: (file: FileType) => void;
  removeFile: (fileId: string) => void;
  findFileById: (fileId: string) => FileType | null;
}

export const useFolderStore = create<FolderState>((set, get) => ({
  folders: [],
  files: [],
  currentFolderId: null,

  setCurrentFolderId: (id) => set({ currentFolderId: id }),

  setFolders: (folders) => set({ folders }),
  setFiles: (files) => set({ files }),

  addFolder: (folder) =>
    set((state) => ({
      folders: [...state.folders, folder],
    })),

  updateFolder: (folderId, updatedFolder) =>
    set((state) => ({
      folders: state.folders.map((folder) =>
        folder._id === folderId ? { ...folder, ...updatedFolder } : folder
      ),
    })),

  removeFolder: (folderId) =>
    set((state) => ({
      folders: state.folders.filter((folder) => folder._id !== folderId),
    })),

  addFile: (file) =>
    set((state) => ({
      files: [...state.files, file],
    })),

  removeFile: (fileId) =>
    set((state) => ({
      files: state.files.filter((file) => file._id !== fileId),
    })),
  findFileById: (fileId) => {
    return get().files.find((file) => file._id === fileId) || null;
  },
}));
