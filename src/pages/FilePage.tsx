import { useEffect, useState } from "react";
import { apiMethods } from "../api/apiMethods";
import { useParams } from "react-router-dom";
import FilePreview from "../components/FilePreview";
import { useFolderStore } from "../store/folderStore";
import { FileType } from "../utils/types";

export default function FilePage() {
  const { fileName } = useParams<{ fileName: string }>();
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [fileMetadata, setFileMetadata] = useState<FileType | null>(null);
  const findFileByName = useFolderStore((state) => state.findFileByName);

  useEffect(() => {
    const fetchFileData = async () => {
      const file = await apiMethods.getFileData({
        pathParams: fileName,
        queryParams: {},
        responseType: "blob",
      });
      const fileData = findFileByName(fileName!);
      setFileMetadata(fileData);
      setFileType(file.type);
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    };
    fetchFileData();

    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [fileName]);

  if (!fileUrl) {
    return <div>Loading...</div>;
  }

  if (fileType?.startsWith("image/") && fileMetadata) {
    return (
      <FilePreview file={fileMetadata.name} id={fileMetadata.id}>
        <img src={fileUrl} alt={fileName} style={{ maxWidth: "100%" }} />
      </FilePreview>
    );
  }

  if (fileType === "application/pdf" && fileMetadata) {
    return (
      <FilePreview id={fileMetadata?.id} file={fileMetadata?.name}>
        <iframe
          src={fileUrl}
          title={fileName}
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

  if (fileType?.startsWith("text/")) {
    return (
      <FilePreview>
        <iframe
          src={fileUrl}
          title={fileName}
          style={{ width: "100%", height: "600px" }}
        />
      </FilePreview>
    );
  }

  return (
    <div>
      <a href={fileUrl} download={fileName}>
        Download {fileName}
      </a>
    </div>
  );
}
