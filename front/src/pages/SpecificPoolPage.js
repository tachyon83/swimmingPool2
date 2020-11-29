import React from "react";
import NavBar from "../components/NavBar";
import { Button } from "react-bootstrap";
import "../styles/SpecificPoolPage.css";
import randomImage from "../styles/random.png";

function SpecificPoolPage({ history, match, location }) {
  console.log(history);
  console.log(match);
  console.log(location);
  const state = location.state;
  const pool = state.pool;

  return (
    <>
      <NavBar page={0} />
      <div id="specificPoolPageContent">
        <Button onClick={history.goBack}>돌아가기</Button>
        <h2>{pool.poolName}</h2>
        <div>
          <img src={randomImage} alt="Random Image" width="500" />
          <ul>
            <li>
              <span className="bold">운영 방식:</span>{" "}
              {state.poolPublic === "1" ? "공공 " : ""}
              {state.poolPrivate === "1" ? "사설" : ""}
              {state.poolHotel === "1" ? "호텔" : ""}
            </li>
            <li>
              <span className="bold">유형:</span>{" "}
              {state.poolIndoor === "1" ? "실내 " : ""}
              {state.poolOutdoor === "1" ? "야외" : ""}
            </li>
            <li>
              <span className="bold">자유 수영:</span>{" "}
              {pool.poolOpentime === 1 ? "가능" : "불가능"}
            </li>
            <li>
              <span className="bold">전화 번호: </span> {pool.poolPhone}
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default SpecificPoolPage;
