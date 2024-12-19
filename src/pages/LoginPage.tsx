import { useNavigate } from "react-router-dom";
import { useHandleGoogleLogin } from "../hooks/useHandleGoogleLogin";
import { Container } from "react-bootstrap";
import { useAuthStore } from "../store/authStore";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";

function LoginPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const { login } = useHandleGoogleLogin();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleGoogleSuccess = (response: CredentialResponse) => {
    const { credential } = response;
    if (!credential) {
      console.error("Google Login Failed: No credential provided");
      return;
    }
    login(credential, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  const handleGoogleError = () => {
    console.error("Google Login Failed");
  };
  return (
    <Container className="mt-5 d-flex gap-3 justify-content-center align-items-center flex-column">
      <h1>Welcome to Rubick board</h1>
      <p>Login via google to continue</p>
      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
      />
    </Container>
  );
}

export default LoginPage;
