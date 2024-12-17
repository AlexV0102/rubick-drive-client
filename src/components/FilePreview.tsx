import { ReactNode, useState } from "react";
import { Button, Modal, Form, Container } from "react-bootstrap";
import {
  deleteFile,
  editFileName,
  cloneFile,
  updateFilePermissions,
  changeFileVisibility,
} from "../api/apiMethods/files";
import { useNavigate } from "react-router-dom";

const FilePreview = ({
  children,
  metadata,
}: {
  children: ReactNode;
  metadata: {
    _id: string;
    file: string;
    isPublic: boolean;
  };
}) => {
  const { file, _id, isPublic: initialIsPublic } = metadata;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  const [fileName, setFileName] = useState(file);
  const [isPublic, setIsPublic] = useState(initialIsPublic);
  const [permissions, setPermissions] = useState([
    { email: "", role: "viewer" },
  ]);

  const navigate = useNavigate();

  const handleSaveName = async () => {
    setShowEditModal(false);
    await editFileName(_id, fileName);
  };

  const handleDeleteFile = async () => {
    try {
      await deleteFile(_id);
      setShowDeleteModal(false);
      navigate("/");
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleCloneFile = async () => {
    await cloneFile(_id);
  };

  const handleToggleVisibility = async () => {
    const prev = !isPublic;
    setIsPublic((prev) => !prev);
    await changeFileVisibility(_id, prev);
  };

  // Add more permission fields
  const addPermissionField = () => {
    setPermissions([...permissions, { email: "", role: "viewer" }]);
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

  const handleSavePermissions = async () => {
    if (!isPublic) {
      await updateFilePermissions(_id, permissions);
    }
    setShowShareModal(false);
  };

  return (
    <Container>
      <div className="hstack gap-3 justify-content-center mb-3">
        <Button variant="primary" onClick={handleCloneFile}>
          <i className="fas fa-clone me-1"></i> Clone file
        </Button>
        <Button variant="primary" onClick={() => setShowEditModal(true)}>
          <i className="fas fa-file-alt me-1"></i> Rename
        </Button>
        <Button variant="primary" onClick={() => setShowShareModal(true)}>
          <i className="fas fa-share-alt me-1"></i> Share file
        </Button>
        <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
          <i className="fas fa-trash me-1"></i> Delete File
        </Button>
      </div>

      {/* Edit File Name Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit File Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFileName">
            <Form.Label>File Name</Form.Label>
            <Form.Control
              type="text"
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSaveName}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{fileName}</strong>? This
          action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteFile}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Share File Modal */}
      <Modal show={showShareModal} onHide={() => setShowShareModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Manage File Visibility & Permissions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Check
            type="switch"
            id="visibility-switch"
            label={`File Visibility: ${isPublic ? "Public" : "Private"}`}
            checked={isPublic}
            onChange={handleToggleVisibility}
          />

          {!isPublic && (
            <>
              <h5 className="mt-3">Set Permissions</h5>
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
                    <option value="viewer">Viewer</option>
                    <option value="editor">Editor</option>
                  </Form.Select>
                </div>
              ))}
              <Button variant="link" onClick={addPermissionField}>
                + Add More
              </Button>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowShareModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSavePermissions}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {children}
    </Container>
  );
};

export default FilePreview;
