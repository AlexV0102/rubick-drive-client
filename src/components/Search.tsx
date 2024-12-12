import React from "react";
import { Button, Form, InputGroup } from "react-bootstrap";

const Search = () => {
  return (
    <InputGroup className="mb-3">
      <Form.Control placeholder="Search input" aria-label="Search input" />
      <Button variant="primary">Search</Button>
    </InputGroup>
  );
};

export default Search;
