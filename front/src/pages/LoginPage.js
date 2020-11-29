import React from "react";
import { Container, Form, Button } from "react-bootstrap";
import NavBar from "../components/NavBar";
import "../styles/LoginPage.css";

function LoginPage() {
  return (
    <>
      <NavBar page={1} />
      <Form class="mx-auto my-auto" id="loginPageForm">
        {/* <h4>로그인</h4> */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>이메일 주소</Form.Label>
          <Form.Control type="email" placeholder="이메일 주소를 입력하세요." />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" placeholder="비밀번호를 입력하세요." />
        </Form.Group>

        <br />

        <Button variant="primary" type="submit">
          로그인
        </Button>
      </Form>
    </>
  );
}

export default LoginPage;
