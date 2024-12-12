import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { Form, Button, InputGroup } from "react-bootstrap";

const SignIn = () => {
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

        <Form.Group className="mb-3" controlId="formRepeatPassword">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control type="password" placeholder="Repeat password" />
        </Form.Group>

        <Button variant="primary" type="submit" className="mb-3">
          Submit
        </Button>
      </Form>

      <GoogleLogin
        onSuccess={(credentialResponse) => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </>
  );
};

export default SignIn;
