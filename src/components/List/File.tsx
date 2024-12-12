import { Col } from "react-bootstrap";
import { FileType } from "../../utils/types";
import { Link } from "react-router-dom";

const File = ({ id, name }: FileType) => {
  return (
    <Col xs="1" md="2" lg="3" xl="4" className="file-item mb-3">
      <Link to={`/files/${name}`} className="text-decoration-none ">
        <div className="p-3 border rounded shadow-sm d-flex bg-body align-items-center gap-3">
          <i className="fa-regular fa-file fa-2x"></i>
          <div className="text-truncate">{name}</div>
        </div>
      </Link>
    </Col>
  );
};

export default File;