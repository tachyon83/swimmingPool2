import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import axios from "axios";
import { Button } from "react-bootstrap";
import "../styles/SpecificPoolPage.css";
import randomImage from "../styles/random.png";
import { FaBaby, FaFemale, FaWheelchair } from "react-icons/fa";
const host = require("../host");

function SpecificPoolPage({ history, match, location }) {
  const poolId = match.params.id;
  const [queryResults, setQueryResults] = useState({});

  useEffect(() => {
    axios
      .get(`${host.server}/pool/${poolId}`)
      .then((response) => {
        const result = response.data;
        setQueryResults(result);
      })
      .catch((response) => console.log(response));
  }, [poolId]);

  // 전용 수영장 / 운영 방식
  let poolForChild, poolForWoman, poolForDisabled;
  let poolPublic, poolPrivate, poolHotel, poolIndoor, poolOutdoor;

  if (queryResults.poolName) {
    // poolOptionMask
    let poolOptionMask = queryResults.poolOption.toString(2).split("");
    poolOptionMask = [
      ...Array(3 - poolOptionMask.length).fill("0"),
      ...poolOptionMask,
    ];
    [poolForChild, poolForWoman, poolForDisabled] = poolOptionMask;

    // poolTypeMask
    let poolTypeMask = queryResults.poolTypeMask.toString(2).split("");
    poolTypeMask = [
      ...Array(5 - poolTypeMask.length).fill("0"),
      ...poolTypeMask,
    ];
    [
      poolPublic,
      poolPrivate,
      poolHotel,
      poolIndoor,
      poolOutdoor,
    ] = poolTypeMask;
  }

  return (
    <>
      <NavBar page={0} />
      <div id="specificPoolPageContent">
        <Button onClick={history.goBack}>돌아가기</Button>
        <div id="specificPoolPageContent2">
          <h2 className="bold">{queryResults.poolName}</h2>
          <div>
            <img src={randomImage} alt="Random" />
            <ul>
              <li>
                {poolForChild === "1" ? <FaBaby color="#F4B400" /> : <></>}
                {poolForWoman === "1" ? <FaFemale color="#0F9D58" /> : <></>}
                {poolForDisabled === "1" ? (
                  <FaWheelchair color="#4285F4" />
                ) : (
                  <></>
                )}
              </li>
              <li>
                <span className="bold">운영 방식:</span>{" "}
                {poolPublic === "1" ? "공공 " : ""}
                {poolPrivate === "1" ? "사설" : ""}
                {poolHotel === "1" ? "호텔" : ""}
              </li>
              <li>
                <span className="bold">유형:</span>{" "}
                {poolIndoor === "1" ? "실내 " : ""}
                {poolOutdoor === "1" ? "야외" : ""}
              </li>
              <li>
                <span className="bold">자유 수영:</span>{" "}
                {queryResults.poolOpentime === 1 ? "가능" : "불가능"}
              </li>
              <li>
                <span className="bold">전화 번호: </span>{" "}
                {queryResults.poolPhone}
              </li>
              <li>
                <span className="bold">위치: </span> {queryResults.poolAddress}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpecificPoolPage;
