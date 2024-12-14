import React from "react";
import {
  Navbar as BootstrapNavbar,
  Nav,
  Button,
  Container,
} from "react-bootstrap";
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { handleThemeSwitch } from "../utils/themeSwitcher";
import Navdropdown from "./Navdropdown";

const Navbar: React.FC = () => {
  const logout = useAuthStore((state) => state.logout);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Container className="mb-3">
      <BootstrapNavbar expand="lg">
        <BootstrapNavbar.Brand href="/">
          <i className="fa-solid fa-cube me-1" />
          Rubick drive
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3">
            <Navdropdown />
            <Button variant="secondary" onClick={() => handleLogout()}>
              Logout
            </Button>
          </Nav>
          <button
            type="button"
            data-bs-theme-switch="data-bs-theme-switch"
            className="btn rounded-pill"
            onClick={handleThemeSwitch}
            aria-label="Theme Switch"
          >
            <i className="far fa-brightness" /> <i className="far fa-moon" />
          </button>
        </BootstrapNavbar.Collapse>
      </BootstrapNavbar>
    </Container>
  );
};

export default Navbar;
