import React, { useState, useEffect } from "react";
import queryString from "query-string";
import axios from "axios";
import NavBar from "../components/NavBar";
import PoolQuerySearch from "../components/PoolQuerySearch";
import ListPool from "../components/ListPool";
import Pagination from "react-bootstrap/Pagination";
import "../styles/PoolPage.css";

function PoolPage({ location }) {
  const query = queryString.parse(location.search);
  // query = poolForChild, poolForDisabled, searchWord... information
  console.log(query);
  const [queryResults, setQueryResults] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/pools/search?searchWord=${query.searchWord}&poolPublic=${query.poolPublic}&poolPrivate=${query.poolPrivate}&poolHotel=${query.poolHotel}&poolIndoor=${query.poolIndoor}&poolOutdoor=${query.poolOutdoor}&poolOpentime=${query.poolOpentime}&poolForChild=${query.poolForChild}&poolForWoman=${query.poolForWoman}&poolForDisabled=${query.poolForDisabled}&pageNumber=${query.pageNumber}`
      )
      .then((response) => {
        const result = response.data;
        setQueryResults(result);
        // console.log("Axios result", result);
      })
      .catch((response) => console.log("Axios result error", response));
  }, []);

  // Pagination
  let active = query.pageNumber;
  let items = [];
  for (
    let number = 1;
    number <= Math.ceil(queryResults.totalCount / 4);
    number++
  ) {
    items.push(
      <Pagination.Item
        key={number}
        active={number == active}
        href={`?searchWord=${query.searchWord}&poolPublic=${query.poolPublic}&poolPrivate=${query.poolPrivate}&poolHotel=${query.poolHotel}&poolForChild=${query.poolForChild}&poolForWoman=${query.poolForWoman}&poolForDisabled=${query.poolForDisabled}&poolIndoor=${query.poolIndoor}&poolOutdoor=${query.poolOutdoor}&poolOpentime=${query.poolOpentime}&pageNumber=${number}`}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <NavBar page={0} />
      <div id="poolPageContent">
        {/* <h1 className="bold">수영장 검색 결과</h1>
        <h3>(검색어: {query.searchWord})</h3> */}
        <h1>
          <span className="bold">수영장 검색 결과 </span>(검색어:{" "}
          {query.searchWord})
        </h1>
        <p>
          수영장 총 {queryResults.totalCount ? queryResults.totalCount : "0"}개
        </p>
        <div id="poolPageSearch">
          <PoolQuerySearch query={query} />
          <ListPool queryResults={queryResults} />
        </div>
      </div>
      <div id="pagination-div">
        <Pagination>{items}</Pagination>
      </div>
    </>
  );
}

export default PoolPage;
