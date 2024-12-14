import React from "react";
import List from "./List";
import Folder from "./Folder";
import { FolderType } from "../../utils/types";

interface FolderListProps {
  folders: FolderType[];
}

const FolderList: React.FC<FolderListProps> = ({ folders }) => {
  return (
    <List
      items={folders}
      renderItem={(folder) => <Folder {...folder} />}
      title="Folders"
    />
  );
};

export default FolderList;
