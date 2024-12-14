import { useEffect, useState } from "react";
import { apiMethods } from "../api/apiMethods";
import { useParams } from "react-router-dom";
import FilePreview from "../components/FilePreview";
import { useFolderStore } from "../store/folderStore";
import { FileType } from "../utils/types";

export default function FilePage() {
  const { fileId } = useParams<{ fileId: string }>(); // Updated to use `fileId`
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [fileMetadata, setFileMetadata] = useState<FileType | null>(null);

  const findFileById = useFolderStore((state) => state.findFileById); // Updated to find by `id`

  useEffect(() => {
    const fetchFileData = async () => {
      if (!fileId) return;

      try {
        const file = await apiMethods.getFileData({
          pathParams: fileId,
          queryParams: {},
          responseType: "blob",
        });

        const fileData = findFileById(fileId);
        setFileMetadata(fileData);

        setFileType(file.type);
        const url = URL.createObjectURL(file);
        setFileUrl(url);
      } catch (error) {
        console.error("Error fetching file data:", error);
      }
    };

    fetchFileData();

    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileId]);

  if (!fileUrl && fileMetadata) {
    return <div>Loading...</div>;
  }

  if (fileType?.startsWith("image/")) {
    return (
      <FilePreview file={fileMetadata.name} id={fileMetadata._id}>
        <img
          src={fileUrl}
          alt={fileMetadata.name}
          style={{ maxWidth: "100%" }}
        />
      </FilePreview>
    );
  }

  if (fileType === "application/pdf") {
    return (
      <FilePreview id={fileMetadata._id} file={fileMetadata.name}>
        <iframe
          src={fileUrl}
          title={fileMetadata.name}
          style={{ width: "100%", height: "600px" }}
        />
      </FilePreview>
    );
  }

  if (fileType?.startsWith("video/")) {
    return (
      <FilePreview>
        <video controls style={{ maxWidth: "100%" }}>
          <source src={fileUrl} type={fileType} />
          Your browser does not support the video tag.
        </video>
      </FilePreview>
    );
  }

  if (fileType?.startsWith("audio/")) {
    return (
      <FilePreview>
        <audio controls>
          <source src={fileUrl} type={fileType} />
          Your browser does not support the audio tag.
        </audio>
      </FilePreview>
    );
  }

  if (fileType?.startsWith("text/") && fileMetadata) {
    return (
      <FilePreview id={fileMetadata?._id} file={fileMetadata?.name}>
        <iframe
          src={fileUrl}
          title={fileMetadata?.name}
          style={{ width: "100%", height: "600px" }}
        />
      </FilePreview>
    );
  }

  return (
    <div>
      <a href={fileUrl} download={fileMetadata?.name}>
        Download {fileMetadata?.name}
      </a>
    </div>
  );
}
