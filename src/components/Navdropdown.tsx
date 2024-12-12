import { useRef } from "react";
import { Dropdown } from "react-bootstrap";
import { useFolderStore } from "../store/folderStore";

const Navdropdown = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const addFile = useFolderStore((state) => state.addFile);

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

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const file = files[0];
      if (file) {
        console.log("Uploading file:", file.name);
        console.log("File type:", file);
        try {
          await addFile({
            id: "some-id",
            name: file.name,
            fileType: file.type,
            size: file.size,
            data: file,
            createdAt: new Date(),
            parentId: null,
          });
          console.log("File uploaded successfully");
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
          <Dropdown.Item>Create file</Dropdown.Item>
          <Dropdown.Item>Create folder</Dropdown.Item>
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
    </>
  );
};

export default Navdropdown;
