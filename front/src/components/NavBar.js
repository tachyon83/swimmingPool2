import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { Navbar, Button } from "react-bootstrap";
import "../styles/NavBar.css";
import logo from "../styles/otter.png";
const host = require("../host");

function NavBar({ page }) {
  let history = useHistory();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    async function checkAuthenticated() {
      const response = await axios.get(`${host.server}/isAuthenticated`);
      const data = await response.data.response;
      setIsAdmin(data);
    }
    checkAuthenticated();
  }, []);

  const onLogoutClick = () => {
    axios
      .get(`${host.server}/logout`)
      .then((res) => {
        if (res.data.response) {
          history.push("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Navbar>
      <Link to="/">
        <img src={logo} alt="logo" width="50px" />
        {/* <div>
          Icons made by{" "}
          <a href="https://www.flaticon.com/authors/freepik" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div> */}
        {/* <Navbar.Brand>수달</Navbar.Brand> */}
      </Link>
      <Navbar.Collapse className="justify-content-end">
        {page === 0 ? (
          // Home Page
          // Not Found Page
          // Pool Page
          // Specific Pool Page
          isAdmin ? (
            <Button variant="primary" onClick={onLogoutClick}>
              로그아웃
            </Button>
          ) : (
            <Link to="/login">
              <Button variant="primary">로그인</Button>
            </Link>
          )
        ) : page === 1 ? (
          // Login Page
          <Link to="/">
            <Button variant="primary">돌아가기</Button>
          </Link>
        ) : page === 2 ? (
          // Admin Page
          // Admin Specific Pool Page
          <Button variant="primary" onClick={onLogoutClick}>
            로그아웃
          </Button>
        ) : (
          <></>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
