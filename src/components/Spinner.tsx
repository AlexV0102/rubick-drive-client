import { Spinner as BootstrapSpinner } from "react-bootstrap";

const Spinner = () => {
  return (
    <BootstrapSpinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </BootstrapSpinner>
  );
};

export default Spinner;
