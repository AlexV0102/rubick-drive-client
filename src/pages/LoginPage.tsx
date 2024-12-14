import React, { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login/Login";
import SignIn from "../components/Login/SignIn";
import { Container, Nav, Tab } from "react-bootstrap";
import { useAuthStore } from "../store/authStore";

function LoginPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Assume backend integration and navigation
        console.log("Google Access Token:", tokenResponse.access_token);
        navigate("/dashboard");
      } catch (error) {
        console.error("Login failed:", error);
        alert("Login failed. Please try again.");
      }
    },
    onError: (error) => {
      console.error("Google Login Error:", error);
      alert("Google Login failed. Please try again.");
    },
  });

  const handleTabChange = (tab: "login" | "signup") => {
    setActiveTab(tab);
  };

  if (isAuthenticated) {
    navigate("/");
  }

  return (
    <Container className="mt-5 d-flex justify-content-center align-items-center flex-column">
      <Tab.Container
        activeKey={activeTab}
        onSelect={(key) => handleTabChange(key as "login" | "signup")}
      >
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey="login">Login</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="signup">Sign Up</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="mt-4">
          <Tab.Pane eventKey="login">
            <Login />
          </Tab.Pane>
          <Tab.Pane eventKey="signup">
            <SignIn />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </Container>
  );
}

export default LoginPage;
