import React from "react";
import NavBar from "../components/NavBar";
import logo from "../styles/otter.png";
import "../styles/NotFoundPage.css";

function NotFoundPage() {
  return (
    <>
      <NavBar page={0} />
      <div id="notFoundDiv">
        <img src={logo} alt="logo" width="350px" />
        <h3>Page Not Found</h3>
        <p>요청하신 페이지를 찾을 수 없습니다.</p>
      </div>
    </>
  );
}

export default NotFoundPage;
