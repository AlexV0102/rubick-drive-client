type ItemBase = {
  _id: string;
  name: string;
  createdAt: Date;
  parentId?: string | null;
  isPublic?: boolean;
};

type FolderType = ItemBase & {
  files: ItemBase[];
  subFolders: ItemBase[];
};

type FileType = ItemBase & {
  fileType: string;
  size: number;
  path?: string;
  data: Blob | string;
};

export type { FolderType, FileType };
