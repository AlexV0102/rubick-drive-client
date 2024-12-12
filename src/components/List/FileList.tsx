import React from "react";
import List from "./List";
import File from "./File";
import { FileType } from "../../types";

interface FileListProps {
  files: FileType[];
}

const FileList: React.FC<FileListProps> = ({ files }) => {
  return (
    <List
      items={files}
      renderItem={(file) => <File {...file} />}
      title="Files"
    />
  );
};

export default FileList;
