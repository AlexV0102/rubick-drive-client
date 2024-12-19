import { Container, Row, Col, Alert } from "react-bootstrap";

const AccessDenied = () => {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row>
        <Col>
          <Alert variant="danger" className="text-center">
            <i className="fas fa-lock fa-3x mb-3"></i>
            <h4>Access Denied</h4>
            <p>You do not have permission to view this</p>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default AccessDenied;
