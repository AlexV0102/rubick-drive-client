import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { editFolderName, deleteFolder } from "../api/apiMethods/folders";
import { useNavigate } from "react-router-dom";

const Actions = ({
  folderId,
  folderName,
  refetch,
}: {
  folderId: string;
  folderName: string;
  refetch: () => void;
}) => {
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newName, setNewName] = useState(folderName);
  const navigate = useNavigate();

  const handleRename = async () => {
    await editFolderName(folderId, newName);
    setShowRenameModal(false);
    refetch();
  };

  const handleFolderDelete = async () => {
    await deleteFolder(folderId);
    setShowDeleteModal(false);
    navigate("/");
  };

  return (
    <div className="d-flex mb-3">
      <div className="hstack gap-3 justify-content-center mb-3">
        <Button variant="primary" onClick={() => setShowRenameModal(true)}>
          <i className="fas fa-file-alt me-1"></i>
          Rename
        </Button>
        <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
          <i className="fas fa-trash me-1"></i>
          Delete folder
        </Button>
      </div>

      <Modal show={showRenameModal} onHide={() => setShowRenameModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Rename Folder</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="renameFolder">
              <Form.Label>New Folder Name</Form.Label>
              <Form.Control
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRenameModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleRename}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

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
            Are you sure you want to delete <strong>{folderName}</strong>? This
            action cannot be undone.
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleFolderDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Actions;
