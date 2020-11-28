import React from "react";
import { Form, Col } from "react-bootstrap";

const FormCheckbox = ({ labelName, labels }) => {
  return (
    <Form.Group as={Col}>
      <Form.Label className="font-weight-bold">{labelName}</Form.Label>
      <div className="mb-3">
        {labels.map((label, i) => (
          <Form.Check label={label} type="checkbox" key={i} />
        ))}
      </div>
    </Form.Group>
  );
};

export default FormCheckbox;
