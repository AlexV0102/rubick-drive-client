import { useState } from "react";
import { Button, Modal, Form, FormControl } from "react-bootstrap";

interface Permission {
  email: string;
  role: string;
}

interface VisibilityPermissionsProps {
  resourceId: string;
  isPublic: boolean;
  resourceType: "File" | "Folder";
  onChangeVisibility: (id: string, visibility: boolean) => Promise<void>;
  onUpdatePermissions: (id: string, permissions: Permission[]) => Promise<void>;
  refetch: () => void;
}

export default function VisibilityPermissions({
  resourceId,
  isPublic,
  resourceType,
  onChangeVisibility,
  onUpdatePermissions,
  refetch,
}: VisibilityPermissionsProps) {
  const [showModal, setShowModal] = useState(false);
  const [publicState, setPublicState] = useState(isPublic);
  const [permissions, setPermissions] = useState<Permission[]>([
    { email: "", role: "" },
  ]);

  const handleChangeVisibility = async () => {
    await onChangeVisibility(resourceId, publicState);
    refetch();
    setShowModal(false);
  };

  const handlePermissionChange = (
    index: number,
    field: keyof Permission,
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
    await onUpdatePermissions(resourceId, permissions);
    refetch();
    setShowModal(false);
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setShowModal(true)}>
        Manage {resourceType} Visibility and Permissions
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            Manage {resourceType} Visibility and Permissions
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>{resourceType} Visibility</Form.Label>
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
