import { Col, Container, Row } from "react-bootstrap";
import Search from "../components/Search";
import FolderList from "../components/List/FolderList";
import FileList from "../components/List/FileList";
import { useFolderStore } from "../store/folderStore";

export default function HomePage() {
  const folders = useFolderStore((state) => state.folders);
  const files = useFolderStore((state) => state.files);

  console.log("folders", folders);

  return (
    <Container>
      <Row>
        <Col className="offset-3" md="6">
          <Search />
        </Col>
      </Row>
      <main>
        <FolderList folders={folders} />
        <hr />
        <FileList files={files} />
      </main>
    </Container>
  );
}
