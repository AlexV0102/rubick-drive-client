import { Spinner as BootstrapSpinner } from "react-bootstrap";

const Spinner = () => {
  return (
    <div className="vstack w-100 vh-100 justify-content-center align-items-center top-0 position-fixed">
      <BootstrapSpinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </BootstrapSpinner>
    </div>
  );
};

export default Spinner;
