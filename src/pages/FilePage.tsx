import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FilePreview from "../components/FilePreview";
import { useGetFileData } from "../api/queries/files";
import Spinner from "../components/Spinner";

export default function FilePage() {
  const { fileId } = useParams<{ fileId: string }>();
  const { metadata, blob, isLoading, isError, error } = useGetFileData(fileId!);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    const fetchFileData = async () => {
      if (!blob) return;
      try {
        setFileType(blob.type);
        const url = URL.createObjectURL(blob);
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
  }, [blob, fileId]);

  if (isLoading) {
    return <Spinner />;
  }

  const renderFileContent = () => {
    if (!fileUrl || !fileType) return null;
    if (fileType.startsWith("image/")) {
      return (
        <img src={fileUrl} alt={metadata.name} style={{ maxWidth: "100%" }} />
      );
    }

    if (fileType === "application/pdf") {
      return (
        <iframe
          src={fileUrl}
          title={metadata.name}
          style={{ width: "100%", height: "600px" }}
        />
      );
    }

    if (fileType.startsWith("video/")) {
      return (
        <video controls style={{ maxWidth: "100%" }}>
          <source src={fileUrl} type={fileType} />
          Your browser does not support the video tag.
        </video>
      );
    }

    if (fileType.startsWith("audio/")) {
      return (
        <audio controls>
          <source src={fileUrl} type={fileType} />
          Your browser does not support the audio tag.
        </audio>
      );
    }

    if (fileType.startsWith("text/")) {
      return (
        <iframe
          src={fileUrl}
          title={metadata.name}
          style={{ width: "100%", height: "600px" }}
        />
      );
    }

    return (
      <a href={fileUrl} download={metadata.name}>
        Download {metadata.name}
      </a>
    );
  };

  return (
    <FilePreview file={metadata.name} id={metadata._id}>
      {renderFileContent()}
    </FilePreview>
  );
}
