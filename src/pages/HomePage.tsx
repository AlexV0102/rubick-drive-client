import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Search from "../components/Search";
import FolderList from "../components/List/FolderList";
import FileList from "../components/List/FileList";
import { useFolderStore } from "../store/folderStore";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [folders] = useState([
    { id: "1", name: "Folder 1" },
    { id: "2", name: "Folder 2" },
    { id: "3", name: "Folder 3" },
  ]);

  const { files, getFiles } = useFolderStore((state) => state);

  const handleFolderClick = (id: string) => {
    console.log("Folder clicked:", id);
  };

  useEffect(() => {
    const test = async () => {
      getFiles();
      console.log("here");
      console.log(files);
    };
    test();

    return () => {};
  }, []);

  return (
    <Container>
      <Row>
        <Col className="offset-3" md="6">
          <Search />
        </Col>
      </Row>
      <main>
        <FolderList folders={folders} onFolderClick={handleFolderClick} />
        <hr />
        <FileList files={files} />
      </main>
    </Container>
  );
}
