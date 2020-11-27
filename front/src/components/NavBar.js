import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Button } from "react-bootstrap";
import "../styles/NavBar.css";
import logo from "../styles/otter.png";

function NavBar({ page }) {
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
          <Link to="/login">
            <Button variant="primary">로그인</Button>
          </Link>
        ) : page === 1 ? (
          <Link to="/">
            <Button variant="primary">돌아가기</Button>
          </Link>
        ) : (
          <></>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavBar;
