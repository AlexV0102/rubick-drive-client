import { useRef, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { useAuthStore } from "../store/authStore";
import { createFolder } from "../api/apiMethods/folders";
import { uploadFile, updateFilePermissions } from "../api/apiMethods/files";

const Navdropdown = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const user = useAuthStore((state) => state.user);

  const [showModal, setShowModal] = useState(false);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [permissions, setPermissions] = useState([{ email: "", role: "" }]);
  const [file, setFile] = useState<File | null>(null);

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
      setShowUploadModal(true); // Open upload modal
    }
  };

  const handlePermissionChange = (
    index: number,
    field: "email" | "role",
    value: string
  ) => {
    setPermissions((prev) =>
      prev.map((perm, i) => (i === index ? { ...perm, [field]: value } : perm))
    );
  };

  const addPermissionField = () => {
    setPermissions((prev) => [...prev, { email: "", role: "" }]);
  };

  const handleFileUpload = async () => {
    if (!file) return;

    try {
      const response = await uploadFile(file);
      const fileId = response.id;

      // Update permissions
      await updateFilePermissions(fileId, permissions);

      setShowUploadModal(false);
      setPermissions([{ email: "", role: "" }]); // Reset permissions
    } catch (error) {
      console.error("Failed to upload file:", error);
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
          <Dropdown.Item onClick={handleFileUploadClick}>
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

      {/* Create Folder Modal */}
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

      {/* Upload File and Permissions Modal */}
      <Modal show={showUploadModal} onHide={() => setShowUploadModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Upload File and Set Permissions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>File: {file?.name}</p>
          <h5>Set Permissions</h5>
          {permissions.map((perm, index) => (
            <div key={index} className="d-flex gap-2 mb-2">
              <Form.Control
                type="email"
                placeholder="Email"
                value={perm.email}
                onChange={(e) =>
                  handlePermissionChange(index, "email", e.target.value)
                }
              />
              <Form.Select
                value={perm.role}
                onChange={(e) =>
                  handlePermissionChange(index, "role", e.target.value)
                }
              >
                <option value="">Select role</option>
                <option value="viewer">Viewer</option>
                <option value="editor">Editor</option>
              </Form.Select>
            </div>
          ))}
          <Button
            variant="link"
            onClick={addPermissionField}
            className="p-0 mb-2"
          >
            + Add more
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              setShowUploadModal(false);
              setPermissions([{ email: "", role: "" }]);
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleFileUpload}>
            Upload File
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Navdropdown;
