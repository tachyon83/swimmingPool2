import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import Redirecting from "../components/Redirecting";
import "../styles/LoginPage.css";
const host = require("../host");

// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.withCredentials = true;

function LoginPage() {
  let history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showErrorMsg, setShowErrorMsg] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === "") {
      alert("이메일 주소를 입력해주세요.");
    } else if (password === "") {
      alert("비밀번호를 입력해주세요. ");
    } else {
      axios
        .post(`${host.server}/login/attempt`, {
          username: username,
          password: password,
        })
        .then((res) => {
          if (res.data.response) {
            history.push("/admin");
          } else {
            setUsername("");
            setPassword("");
            setShowErrorMsg(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const [isAdmin, setIsAdmin] = useState(undefined);

  useEffect(() => {
    async function checkAuthenticated() {
      const response = await axios.get(`${host.server}/isAuthenticated`);
      const data = await response.data.response;
      if (data) {
        history.push("/admin");
      }
      setIsAdmin(data);
    }
    checkAuthenticated();
  }, []);

  if (isAdmin === undefined) {
    return <Loading />;
  } else if (isAdmin) {
    return <Redirecting />;
  } else {
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

          <p className={showErrorMsg ? "" : "hidden"} id="loginErrorMsg">
            아이디 혹은 비밀번호가 잘못되었습니다.
          </p>

          <br />

          <Button variant="primary" type="submit">
            로그인
          </Button>
        </Form>
      </>
    );
  }
}

export default LoginPage;
