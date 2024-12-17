import { Col } from "react-bootstrap";
import { FolderType } from "../../utils/types";
import { Link } from "react-router-dom";

const Folder = ({ _id, name }: FolderType) => {
  return (
    <Col xs="1" md="2" lg="3" xl="4" className="card-item mb-3">
      <Link
        to={`/folders/${_id}`}
        className="text-decoration-none text-primary"
      >
        <div className="p-3 border rounded shadow-sm bg-body d-flex align-items-center gap-3">
          <i className="fa-regular fa-folder fa-2x"></i>
          <div className="text-truncate">{name}</div>
        </div>
      </Link>
    </Col>
  );
};

export default Folder;
