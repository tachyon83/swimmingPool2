import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import NavBar from "../components/NavBar";
import { useHistory } from "react-router-dom";
import Loading from "../components/Loading";
import Redirecting from "../components/Redirecting";
import "../styles/LoginPage.css";

// axios.defaults.baseURL = 'http://localhost:3000';
// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
axios.defaults.withCredentials = true;

function LoginPage() {
  let history = useHistory();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // axios post request (/login/attempt)
    // const information = {
    //   username: username,
    //   password: password,
    // };

    axios
      // .post(`http://localhost:3000/login/attempt`, information)
      .post(`http://localhost:3000/login/attempt`, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log(res);
        if (res.data.response) {
          history.push("/admin");
        } else {
          history.push("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [isAdmin, setIsAdmin] = useState(undefined);

  useEffect(() => {
    async function checkAuthenticated() {
      const response = await axios.get(`http://localhost:3000/isAuthenticated`);
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
