import { ReactNode, useState } from "react";
import { Button, Modal, Form, Container } from "react-bootstrap";
import { deleteFile, editFileName, cloneFile } from "../api/apiMethods/files";
import { useNavigate } from "react-router-dom";

const FilePreview = ({
  children,
  file,
  id,
}: {
  children: ReactNode;
  file: string;
  id: string;
}) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fileName, setFileName] = useState(file);
  const navigate = useNavigate();

  const handleEditName = () => {
    setShowEditModal(true);
  };

  const handleDeleteFile = async () => {
    try {
      await deleteFile(id);
      setShowDeleteModal(false);
      navigate("/");
    } catch (error) {
      console.error("Error deleting file:", error);
    }
  };

  const handleSaveName = async () => {
    setShowEditModal(false);
    await editFileName(id, fileName);
  };

  const handleCloneFile = async () => {
    await cloneFile(id);
  };

  return (
    <Container>
      <div className="hstack gap-3 justify-content-center mb-3">
        <Button variant="primary" onClick={handleCloneFile}>
          <i className="fas fa-clone me-1"></i>
          Clone file
        </Button>
        <Button variant="primary" onClick={handleEditName}>
          <i className="fas fa-file-alt me-1"></i>
          Rename
        </Button>
        <Button variant="primary" onClick={handleEditName}>
          <i className="fas fa-edit me-1"></i>
          Edit
        </Button>
        <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
          <i className="fas fa-trash me-1"></i>
          Delete File
        </Button>
      </div>

      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit File Name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFileName">
              <Form.Label>File Name</Form.Label>
              <Form.Control
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
              />
            </Form.Group>
          </Form>
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
          <p>
            Are you sure you want to delete <strong>{fileName}</strong>? This
            action cannot be undone.
          </p>
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

      {children}
    </Container>
  );
};

export default FilePreview;
