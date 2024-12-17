import { useState } from "react";
import { Button, Modal, Form, FormControl } from "react-bootstrap";
import {
  changeFolderVisibility,
  updateFolderPermissions,
} from "../api/apiMethods/folders";

export default function VisibilityAndPermissions({
  folderId,
  isPublic,
  refetch,
}: {
  folderId: string;
  isPublic: boolean;
  refetch: () => void;
}) {
  const [showModal, setShowModal] = useState(false);
  const [publicState, setPublicState] = useState(isPublic);
  const [permissions, setPermissions] = useState([{ email: "", role: "" }]);

  const handleChangeVisibility = async () => {
    await changeFolderVisibility(folderId, publicState);
    refetch();
    setShowModal(false);
  };

  const handlePermissionChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = permissions.map((p, i) =>
      i === index ? { ...p, [field]: value } : p
    );
    setPermissions(updated);
  };

  const addPermissionField = () =>
    setPermissions([...permissions, { email: "", role: "" }]);

  const savePermissions = async () => {
    await updateFolderPermissions(folderId, permissions);
    refetch();
    setShowModal(false);
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setShowModal(true)}>
        Manage Visibility and Permissions
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Manage Visibility and Permissions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Folder Visibility</Form.Label>
            <Form.Check
              type="switch"
              id="visibility-switch"
              label={publicState ? "Public" : "Private"}
              checked={publicState}
              onChange={() => setPublicState((prev) => !prev)}
            />
          </Form.Group>

          {!publicState && (
            <>
              <Form.Label>Permissions</Form.Label>
              {permissions.map((perm, index) => (
                <div key={index} className="d-flex gap-2 mb-2">
                  <FormControl
                    type="email"
                    placeholder="User Email"
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
                    <option value="">Select Role</option>
                    <option value="viewer">Viewer</option>
                    <option value="editor">Editor</option>
                  </Form.Select>
                </div>
              ))}
              <Button variant="link" onClick={addPermissionField}>
                + Add User
              </Button>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleChangeVisibility}>
            Save Visibility
          </Button>
          {!publicState && (
            <Button variant="primary" onClick={savePermissions}>
              Save Permissions
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
