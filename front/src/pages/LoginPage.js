import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import NavBar from "../components/NavBar";
// import { useHistory } from "react-router-dom";
import "../styles/LoginPage.css";

function LoginPage() {
  // let history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // axios post request (/login/attempt)
    const information = {
      username: username,
      password: password,
    };

    axios
      .post(`http://localhost:3000/login/attempt`, information)
      .then((res) => {
        console.log("response!", res);
      })
      .catch((err) => {
        console.log("error!", err);
      });
  };

  return (
    <>
      <NavBar page={1} />
      <Form id="loginPageForm" onSubmit={handleSubmit}>
        {/* <h4>로그인</h4> */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>이메일 주소</Form.Label>
          <Form.Control
            type="email"
            placeholder="이메일 주소를 입력하세요."
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control
            type="password"
            placeholder="비밀번호를 입력하세요."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
