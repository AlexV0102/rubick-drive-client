type ItemBase = {
  id: string;
  name: string;
  createdAt: Date;
  parentId?: string;
};

type FolderType = ItemBase & {
  children?: FolderType[] | FileType[];
};

type FileType = ItemBase & {
  fileType: string;
  size: number;
  path?: string;
  data: Blob | string;
};

export type { FolderType, FileType };
