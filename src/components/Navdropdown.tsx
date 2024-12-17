import { useRef, useState } from "react";
import { Button, Container, Dropdown, Form, Modal } from "react-bootstrap";
import { createFolder } from "../api/apiMethods/folders";
import { uploadFile } from "../api/apiMethods/files";

const Navdropdown = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);

  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isPublic, setIsPublic] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFolderUploadClick = () => {
    if (folderInputRef.current) {
      folderInputRef.current.click();
    }
  };

  const handleCreateFolder = async () => {
    if (folderName.trim()) {
      try {
        await createFolder(folderName);
        setShowModal(false);
        setFolderName("");
      } catch (error) {
        console.error("Failed to create folder:", error);
      }
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
      setShowUploadModal(true);
    }
  };

  const handleFileUpload = async () => {
    if (!file) return;

    try {
      await uploadFile(file, isPublic);

      setShowUploadModal(false);
    } catch (error) {
      console.error("Failed to upload file:", error);
    }
  };

  const handleFileDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      setFile(files[0]);
      setShowUploadModal(true);
    }
  };

  return (
    <>
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          New file
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setShowModal(true)}>
            Create folder
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={() => setShowUploadModal(true)}>
            Upload file
          </Dropdown.Item>
          <Dropdown.Item onClick={handleFolderUploadClick}>
            Upload folder
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <input
        type="file"
        ref={folderInputRef}
        style={{ display: "none" }}
        data-webkitdirectory="true"
        onChange={handleFileChange}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Create Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="folderName">
              <Form.Label>Folder Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter folder name"
                value={folderName}
                onChange={(e) => setFolderName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleCreateFolder}>
            Create Folder
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload File</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container
            className={`p-3 mb-3 border rounded ${
              isDragging ? "bg-light border-primary" : "border-secondary"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleFileDrop}
            onClick={handleFileUploadClick}
          >
            {isDragging ? (
              <p className="text-primary">Release to upload file</p>
            ) : file ? (
              <p>Selected File: {file.name}</p>
            ) : (
              <p>Drag and drop file here or click to upload</p>
            )}
          </Container>

          <Form className="mb-3">
            <Form.Group>
              <Form.Check
                type="switch"
                id="public-switch"
                label={`File Visibility: ${isPublic ? "Public" : "Private"}`}
                checked={isPublic}
                onChange={() => setIsPublic((prev) => !prev)}
              />
            </Form.Group>
          </Form>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowUploadModal(false)}
            >
              Cancel
            </Button>
            <Button variant="primary" onClick={handleFileUpload}>
              Upload
            </Button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navdropdown;
