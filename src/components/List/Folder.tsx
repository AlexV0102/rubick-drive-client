import { Col } from "react-bootstrap";
import { FolderType } from "../../utils/types";

const Folder = ({ id, name }: FolderType) => {
  return (
    <Col xs="1" md="2" lg="3" xl="4" className="folder-item">
      <div className="p-3 border rounded shadow-sm bg-body d-flex align-items-center gap-3">
        <i className="fa-regular fa-folder fa-2x"></i>
        <div className="text-truncate">{name}</div>
      </div>
    </Col>
  );
};

export default Folder;
