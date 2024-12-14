import { useState } from "react";
import { useParams } from "react-router-dom";
import { useFolderStore } from "../store/folderStore";
import FolderList from "../components/List/FolderList";
import FileList from "../components/List/FileList";
import { FileType, FolderType } from "../utils/types";
import { useAuthStore } from "../store/authStore";

export default function FolderPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const folder = useFolderStore((state) =>
    state.folders.find((f) => f._id === folderId)
  );
  const user = useAuthStore((state) => state.user);

  const addFileToFolder = useFolderStore((state) => state.addFileToFolder);
  const addSubfolder = useFolderStore((state) => state.addSubfolder);
  const [isDragging, setIsDragging] = useState(false);

  const [fileName, setFileName] = useState("");
  const [subfolderName, setSubfolderName] = useState("");

  const handleAddSubfolder = async () => {
    if (!subfolderName || !user) return;

    await addSubfolder(folderId!, {
      name: subfolderName,
      owner: user.id,
      parentFolderId: folderId,
    });
    setSubfolderName("");
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (!folderId || !user) return;

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      for (const file of files) {
        await addFileToFolder(folderId, file);
      }
    }
  };

  return (
    <div>
      <h1>{folder?.name}</h1>
      <p>{folderId}</p>
      <FolderList folders={(folder?.subFolders as FolderType[]) || []} />
      <FileList files={(folder?.files as FileType[]) || []} />

      <div>
        <h3>Add File</h3>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            border: isDragging ? "2px solid #007bff" : "2px dashed #ccc",
            borderRadius: "10px",
            padding: "20px",
            textAlign: "center",
            backgroundColor: isDragging ? "#f0f8ff" : "transparent",
          }}
        >
          {isDragging ? (
            <p>Release to upload files...</p>
          ) : (
            <p>Drag and drop files here, or click to select files</p>
          )}
        </div>
      </div>

      <div>
        <h3>Add Subfolder</h3>
        <input
          type="text"
          placeholder="Subfolder name"
          value={subfolderName}
          onChange={(e) => setSubfolderName(e.target.value)}
        />
        <button onClick={handleAddSubfolder}>Add Subfolder</button>
      </div>
    </div>
  );
}
