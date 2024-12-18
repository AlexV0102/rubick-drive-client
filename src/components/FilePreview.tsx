import { ReactNode, useState } from "react";
import { Button, Modal, Form, Container, Col } from "react-bootstrap";
import {
  deleteFile,
  editFileName,
  cloneFile,
  updateFilePermissions,
  changeFileVisibility,
} from "../api/apiMethods/files";
import { useNavigate } from "react-router-dom";
import VisibilityPermissions from "./VisibilityModal";
import { useGetFileData } from "../api/queries/files";
import { useAuthStore } from "../store/authStore";

type sharedWithType = {
  email: string;
  role: "editor" | "viewer";
};

const FilePreview = ({
  children,
  metadata,
}: {
  children: ReactNode;
  metadata: {
    _id: string;
    file: string;
    owner: string;
    isPublic: boolean;
    sharedWith: sharedWithType[];
  };
}) => {
  const { file, _id, isPublic, owner, sharedWith } = metadata;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { refetch } = useGetFileData(_id);
  const [fileName, setFileName] = useState(file);
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);

  const userPermission = sharedWith.find((perm) => perm.email === user?.email);
  const canEdit = userPermission?.role === "editor" || owner === user?.id;

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

  return (
    <Container>
      {canEdit && (
        <Col className="d-flex flex-column flex-md-row gap-3 justify-content-center mb-3">
          <Button variant="primary" onClick={handleCloneFile}>
            <i className="fas fa-clone me-1"></i> Clone file
          </Button>
          <Button variant="primary" onClick={() => setShowEditModal(true)}>
            <i className="fas fa-file-alt me-1"></i> Rename
          </Button>

          {owner === user?.id && (
            <>
              <Button variant="danger" onClick={() => setShowDeleteModal(true)}>
                <i className="fas fa-trash me-1"></i> Delete File
              </Button>
              <VisibilityPermissions
                resourceId={_id}
                isPublic={isPublic}
                resourceType="File"
                onChangeVisibility={changeFileVisibility}
                onUpdatePermissions={updateFilePermissions}
                refetch={refetch}
              />
            </>
          )}
        </Col>
      )}

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

      {children}
    </Container>
  );
};

export default FilePreview;
