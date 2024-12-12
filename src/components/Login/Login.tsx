import { GoogleLogin } from "@react-oauth/google";
import { Form, Button } from "react-bootstrap";
import { apiMethods } from "../../api/apiMethods";
import { useAuthStore } from "../../store/authStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleGoogleSuccess = async ({
    credential,
  }: {
    credential: string;
  }) => {
    try {
      const token = credential;
      const response = await apiMethods.googleValidateToken({
        body: { token },
      });
      console.log("User:", response);
      login(response);
      navigate("/");
    } catch (error) {
      console.error("Google Login Failed:", error);
    }
  };

  const handleGoogleError = () => {
    console.log("Google Login Failed");
  };

  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter password" />
        </Form.Group>

        <Button variant="primary" type="submit" className="mb-3">
          Submit
        </Button>
      </Form>

      <GoogleLogin
        onSuccess={handleGoogleSuccess}
        onError={handleGoogleError}
      />
    </>
  );
};

export default Login;
