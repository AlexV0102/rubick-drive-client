import { Col, Container, Row } from "react-bootstrap";
import Search from "../components/Search";
import FolderList from "../components/List/FolderList";
import FileList from "../components/List/FileList";
import { useGetFoldersByUser } from "../api/queries/folders";
import { useGetFiles } from "../api/queries/files";
import Spinner from "../components/Spinner";

export default function HomePage() {
  const { data: folders = [], isLoading } = useGetFoldersByUser();
  const { data: files = [], isLoading: isLoadingFiles } = useGetFiles();

  if (isLoading && isLoadingFiles) {
    return <Spinner />;
  }
  return (
    <Container>
      <Row>
        <Col className="offset-md-3" md="6">
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
