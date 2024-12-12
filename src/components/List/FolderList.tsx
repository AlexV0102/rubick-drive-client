import React from "react";
import List from "./List";
import Folder from "./Folder";
import { FolderType } from "../../utils/types";

interface FolderListProps {
  folders: FolderType[];
  onFolderClick: (id: string) => void;
}

const FolderList: React.FC<FolderListProps> = ({ folders, onFolderClick }) => {
  return (
    <List
      items={folders}
      renderItem={(folder) => <Folder {...folder} />}
      title="Folders"
    />
  );
};

export default FolderList;
