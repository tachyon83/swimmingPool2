import React from "react";
import { Link } from "react-router-dom";
import "../styles/SinglePool.css";
import { FaBaby, FaFemale, FaWheelchair } from "react-icons/fa";

import randomImage from "../styles/random.png";

function SinglePool({ pool, page, id }) {
  // 전용 수영장
  let poolForChild, poolForWoman, poolForDisabled;
  let poolOptionMask = pool.poolOption.toString(2).split("");
  poolOptionMask = [
    ...Array(3 - poolOptionMask.length).fill("0"),
    ...poolOptionMask,
  ];
  [poolForChild, poolForWoman, poolForDisabled] = poolOptionMask;

  // 운영 방식
  let poolPublic, poolPrivate, poolHotel, poolIndoor, poolOutdoor;
  let poolTypeMask = pool.poolTypeMask.toString(2).split("");
  poolTypeMask = [...Array(5 - poolTypeMask.length).fill("0"), ...poolTypeMask];
  [poolPublic, poolPrivate, poolHotel, poolIndoor, poolOutdoor] = poolTypeMask;

  return (
    <div className="singlePool">
      <img src={randomImage} alt={`${id}-pool`} width="450" />
      <div>
        <Link
          to={page === 0 ? `/pool/${pool.poolId}` : `/admin/${pool.poolId}`}
        >
          <h2>{pool.poolName}</h2>
        </Link>
        <div className="singlePoolIcons">
          {poolForChild === "1" ? <FaBaby color="#F4B400" /> : <></>}
          {poolForWoman === "1" ? <FaFemale color="#0F9D58" /> : <></>}
          {poolForDisabled === "1" ? <FaWheelchair color="#4285F4" /> : <></>}
        </div>
        <ul className="singlePoolDescription">
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
            {pool.poolOpentime === 1 ? "가능" : "불가능"}
          </li>
          <li>
            <span className="bold">전화 번호: </span> {pool.poolPhone}
          </li>
          <li>
            <span className="bold">위치: </span> {pool.poolAddress}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SinglePool;
