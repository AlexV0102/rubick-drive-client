import { ReactNode, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { apiMethods } from "../api/apiMethods";

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
  const [fileName, setFileName] = useState(file);

  const handleEditName = () => {
    setShowEditModal(true);
  };

  const handleDeleteFile = async () => {
    alert(`File "${fileName}" deleted!`);
    await apiMethods.deleteFile({ pathParams: id });
  };

  const handleSaveName = () => {
    setShowEditModal(false);
  };
  return (
    <>
      <div className="hstack gap-3 justify-content-center mb-3">
        <Button variant="primary" onClick={handleEditName}>
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
        <Button variant="danger" onClick={handleDeleteFile}>
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
      {children}
    </>
  );
};

export default FilePreview;
