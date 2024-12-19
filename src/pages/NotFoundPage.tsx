import { Container, Row, Col } from "react-bootstrap";

function NotFoundPage() {
  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Row className="text-center">
        <Col>
          <i className="fas fa-exclamation-triangle fa-5x text-warning mb-3"></i>
          <h1 className="display-4">404</h1>
          <p className="lead">
            Oops! The page you're looking for doesn't exist.
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default NotFoundPage;
