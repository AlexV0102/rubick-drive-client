import { useState } from "react";
import { Form, useParams } from "react-router-dom";
import FolderList from "../components/List/FolderList";
import FileList from "../components/List/FileList";
import { FileType, FolderType } from "../utils/types";
import { useAuthStore } from "../store/authStore";
import { useGetFolderById } from "../api/queries/folders";
import { addSubfolder, addFileToFolder } from "../api/apiMethods/folders";
import {
  Button,
  Card,
  Col,
  Container,
  Row,
  FormGroup,
  FormLabel,
  FormControl,
} from "react-bootstrap";

export default function FolderPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const {
    data: folder,
    isLoading,
    isError,
    refetch,
  } = useGetFolderById(folderId || "");
  const user = useAuthStore((state) => state.user);

  const [isDragging, setIsDragging] = useState(false);
  const [subfolderName, setSubfolderName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);

  const handleAddSubfolder = async () => {
    console.log("subfolderName", subfolderName);
    console.log("user", user);
    if (!subfolderName || !user) return;

    await addSubfolder(folderId!, {
      name: subfolderName,
      owner: user.id,
      parentFolderId: folderId!,
    });
    setSubfolderName("");
    refetch();
  };

  const handleFileUpload = async (files: FileList) => {
    console.log("files", files);
    console.log("folderId", folderId);
    console.log("user", user);
    if (!folderId || !user || files.length === 0) return;

    for (const file of files) {
      await addFileToFolder(folderId, file);
    }

    refetch();
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

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      await handleFileUpload(files);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      await handleFileUpload(files);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error loading folder details</p>;

  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h2 className="text-primary">{folder?.name || "Folder"}</h2>
          <p className="text-muted">Folder ID: {folderId}</p>
        </Col>
      </Row>

      {/* File and Folder Lists */}
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>
              <strong>Subfolders</strong>
            </Card.Header>
            <Card.Body>
              <FolderList
                folders={(folder?.subFolders as FolderType[]) || []}
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>
              <strong>Files</strong>
            </Card.Header>
            <Card.Body>
              <FileList files={(folder?.files as FileType[]) || []} />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* File Upload Section */}
      <Row className="mt-4">
        <Col>
          <Card>
            <Card.Header>
              <strong>Upload Files</strong>
            </Card.Header>
            <Card.Body>
              <div
                className={`border p-4 text-center rounded ${
                  isDragging ? "bg-info" : ""
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput")?.click()}
                style={{ cursor: "pointer" }}
              >
                <p>
                  {isDragging
                    ? "Drop files to upload..."
                    : "Drag and drop files here, or click to select files"}
                </p>
              </div>
              <FormControl
                id="fileInput"
                type="file"
                multiple
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Add Subfolder */}
      <Row className="mt-4">
        <Col md={{ span: 6, offset: 3 }}>
          <Card>
            <Card.Header>
              <strong>Add Subfolder</strong>
            </Card.Header>
            <Card.Body>
              <Form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleAddSubfolder();
                }}
              >
                <FormGroup controlId="subfolderName">
                  <FormLabel>Subfolder Name</FormLabel>
                  <FormControl
                    type="text"
                    placeholder="Enter subfolder name"
                    value={subfolderName}
                    onChange={(e) => setSubfolderName(e.target.value)}
                  />
                </FormGroup>
                <div className="mt-3 text-end">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={!subfolderName}
                  >
                    Add Subfolder
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
