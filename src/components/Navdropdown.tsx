import { useRef, useState } from "react";
import { Button, Dropdown, Form, Modal } from "react-bootstrap";
import { useFolderStore } from "../store/folderStore";
import { useAuthStore } from "../store/authStore";
import { apiMethods } from "../api/apiMethods";

const Navdropdown = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const addFile = useFolderStore((state) => state.addFile);
  const user = useAuthStore((state) => state.user);

  const [showModal, setShowModal] = useState(false);
  const [folderName, setFolderName] = useState("");

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
        // TODO: to useFolderStore method
        await apiMethods.createFolder({
          body: { name: folderName, owner: user?.id },
        });
        setShowModal(false);
        setFolderName("");
      } catch (error) {
        console.error("Failed to create folder:", error);
      }
    }
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      if (file) {
        try {
          console.log(user);
          addFile(file, user!.id);
        } catch (error) {
          console.error("Failed to upload file:", error);
        }
      }
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
    </>
  );
};

export default Navdropdown;
