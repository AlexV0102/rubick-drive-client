import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import FilePreview from "../components/FilePreview";
import { useGetFileData } from "../api/queries/files";
import Spinner from "../components/Spinner";
import { Button, Card } from "react-bootstrap";

export default function FilePage() {
  const { fileId } = useParams<{ fileId: string }>();
  const { metadata, blob, isLoading, isError } = useGetFileData(fileId!);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  useEffect(() => {
    if (!blob) return;
    setFileType(blob.type);
    const url = URL.createObjectURL(blob);
    setFileUrl(url);
    return () => {
      if (fileUrl) {
        URL.revokeObjectURL(fileUrl);
      }
    };
  }, [blob, fileId]);

  if (isError) {
    return <div>Access denied </div>;
  }

  if (isLoading) {
    return <Spinner />;
  }

  const renderFileContent = () => {
    if (!fileUrl || !fileType) return null;

    switch (true) {
      case fileType.startsWith("image/"):
        return <img src={fileUrl} alt={metadata.name} className="img-fluid" />;
      case fileType === "application/pdf":
        return (
          <iframe
            src={fileUrl}
            title={metadata.name}
            style={{ width: "100%", height: "600px" }}
          />
        );
      case fileType.startsWith("video/"):
        return (
          <video controls className="w-100">
            <source src={fileUrl} type={fileType} />
          </video>
        );
      case fileType.startsWith("audio/"):
        return (
          <audio controls className="w-100">
            <source src={fileUrl} type={fileType} />
          </audio>
        );
      case fileType.startsWith("text/"):
        return (
          <iframe
            src={fileUrl}
            title={metadata.name}
            style={{ width: "100%", height: "600px" }}
          />
        );
      default:
        return <div>Something is wrong</div>;
    }
  };

  return (
    <FilePreview metadata={metadata}>
      <Card className="shadow-sm">
        <Card.Header className=" text-white text-center">
          <h5 className="mb-0">{metadata?.name || "File"}</h5>
        </Card.Header>
        <Card.Body className="text-center">{renderFileContent()}</Card.Body>
        <Card.Footer>
          <a href={fileUrl!} download={metadata.name}>
            Download {metadata.name}
          </a>
        </Card.Footer>
      </Card>
    </FilePreview>
  );
}
