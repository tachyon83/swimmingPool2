import React, { useState, useEffect } from "react";
import queryString from "query-string";
import axios from "axios";
import NavBar from "../components/NavBar";
import PoolQuerySearch from "../components/PoolQuerySearch";
import ListPool from "../components/ListPool";
import Pagination from "react-bootstrap/Pagination";
import "../styles/PoolPage.css";
const host = require("../host");

function PoolPage({ location }) {
  const query = queryString.parse(location.search);
  // query = poolForChild, poolForDisabled, searchWord... information
  const [queryResults, setQueryResults] = useState({});

  useEffect(() => {
    console.log(
      `${host.server}/pool?searchWord=${query.searchWord}&poolPublic=${query.poolPublic}&poolPrivate=${query.poolPrivate}&poolHotel=${query.poolHotel}&poolIndoor=${query.poolIndoor}&poolOutdoor=${query.poolOutdoor}&poolOpentime=${query.poolOpentime}&poolForChild=${query.poolForChild}&poolForWoman=${query.poolForWoman}&poolForDisabled=${query.poolForDisabled}&pageNumber=${query.pageNumber}`
    );
    axios
      .get(
        `${host.server}/pool?searchWord=${query.searchWord}&poolPublic=${query.poolPublic}&poolPrivate=${query.poolPrivate}&poolHotel=${query.poolHotel}&poolIndoor=${query.poolIndoor}&poolOutdoor=${query.poolOutdoor}&poolOpentime=${query.poolOpentime}&poolForChild=${query.poolForChild}&poolForWoman=${query.poolForWoman}&poolForDisabled=${query.poolForDisabled}&pageNumber=${query.pageNumber}`
      )
      .then((response) => {
        const result = response.data;
        setQueryResults(result);
        // console.log("Axios result", result);
      })
      .catch((response) => console.log(response));
  }, []);

  // Pagination
  let active = parseInt(query.pageNumber);
  let items = [];
  let totalPages = Math.ceil(queryResults.totalCount / 4);

  if (totalPages) {
    // 첫 페이지로 이동, 전 페이지로 이동
    if (active !== 1) {
      items.push(
        <Pagination.First
          href={`?searchWord=${query.searchWord}&poolPublic=${query.poolPublic}&poolPrivate=${query.poolPrivate}&poolHotel=${query.poolHotel}&poolForChild=${query.poolForChild}&poolForWoman=${query.poolForWoman}&poolForDisabled=${query.poolForDisabled}&poolIndoor=${query.poolIndoor}&poolOutdoor=${query.poolOutdoor}&poolOpentime=${query.poolOpentime}&pageNumber=1`}
        />
      );
      items.push(
        <Pagination.Prev
          href={`?searchWord=${query.searchWord}&poolPublic=${
            query.poolPublic
          }&poolPrivate=${query.poolPrivate}&poolHotel=${
            query.poolHotel
          }&poolForChild=${query.poolForChild}&poolForWoman=${
            query.poolForWoman
          }&poolForDisabled=${query.poolForDisabled}&poolIndoor=${
            query.poolIndoor
          }&poolOutdoor=${query.poolOutdoor}&poolOpentime=${
            query.poolOpentime
          }&pageNumber=${active - 1}`}
        />
      );
    }

    // 나머지 페이지 (15 이하)
    if (totalPages <= 15) {
      for (let number = 1; number <= totalPages; number++) {
        items.push(
          <Pagination.Item
            key={number}
            active={number === active}
            href={`?searchWord=${query.searchWord}&poolPublic=${query.poolPublic}&poolPrivate=${query.poolPrivate}&poolHotel=${query.poolHotel}&poolForChild=${query.poolForChild}&poolForWoman=${query.poolForWoman}&poolForDisabled=${query.poolForDisabled}&poolIndoor=${query.poolIndoor}&poolOutdoor=${query.poolOutdoor}&poolOpentime=${query.poolOpentime}&pageNumber=${number}`}
          >
            {number}
          </Pagination.Item>
        );
      }
    } else {
      // 16 페이지 이상
      if (active <= 4) {
        // << < 1 2 3 4 5 6 7 > >>
        for (let number = 1; number <= 7; number++) {
          items.push(
            <Pagination.Item
              key={number}
              active={number === active}
              href={`?searchWord=${query.searchWord}&poolPublic=${query.poolPublic}&poolPrivate=${query.poolPrivate}&poolHotel=${query.poolHotel}&poolForChild=${query.poolForChild}&poolForWoman=${query.poolForWoman}&poolForDisabled=${query.poolForDisabled}&poolIndoor=${query.poolIndoor}&poolOutdoor=${query.poolOutdoor}&poolOpentime=${query.poolOpentime}&pageNumber=${number}`}
            >
              {number}
            </Pagination.Item>
          );
        }
        items.push(<Pagination.Ellipsis disabled />);
        items.push(
          <Pagination.Item
            href={`?searchWord=${query.searchWord}&poolPublic=${query.poolPublic}&poolPrivate=${query.poolPrivate}&poolHotel=${query.poolHotel}&poolForChild=${query.poolForChild}&poolForWoman=${query.poolForWoman}&poolForDisabled=${query.poolForDisabled}&poolIndoor=${query.poolIndoor}&poolOutdoor=${query.poolOutdoor}&poolOpentime=${query.poolOpentime}&pageNumber=${totalPages}`}
          >
            {totalPages}
          </Pagination.Item>
        );
      } else if (active >= totalPages - 3) {
        // << < 14 15 16 17 18 19 20 > >>
        items.push(
          <Pagination.Item
            href={`?searchWord=${query.searchWord}&poolPublic=${query.poolPublic}&poolPrivate=${query.poolPrivate}&poolHotel=${query.poolHotel}&poolForChild=${query.poolForChild}&poolForWoman=${query.poolForWoman}&poolForDisabled=${query.poolForDisabled}&poolIndoor=${query.poolIndoor}&poolOutdoor=${query.poolOutdoor}&poolOpentime=${query.poolOpentime}&pageNumber=1`}
          >
            1
          </Pagination.Item>
        );
        items.push(<Pagination.Ellipsis disabled />);

        for (let number = totalPages - 6; number <= totalPages; number++) {
          items.push(
            <Pagination.Item
              key={number}
              active={number === active}
              href={`?searchWord=${query.searchWord}&poolPublic=${query.poolPublic}&poolPrivate=${query.poolPrivate}&poolHotel=${query.poolHotel}&poolForChild=${query.poolForChild}&poolForWoman=${query.poolForWoman}&poolForDisabled=${query.poolForDisabled}&poolIndoor=${query.poolIndoor}&poolOutdoor=${query.poolOutdoor}&poolOpentime=${query.poolOpentime}&pageNumber=${number}`}
            >
              {number}
            </Pagination.Item>
          );
        }
      } else {
        // << < 2 3 4 5 6 7 8 > >>
        // << < 14 15 16 17 18 19 20 > >>
        items.push(
          <Pagination.Item
            href={`?searchWord=${query.searchWord}&poolPublic=${query.poolPublic}&poolPrivate=${query.poolPrivate}&poolHotel=${query.poolHotel}&poolForChild=${query.poolForChild}&poolForWoman=${query.poolForWoman}&poolForDisabled=${query.poolForDisabled}&poolIndoor=${query.poolIndoor}&poolOutdoor=${query.poolOutdoor}&poolOpentime=${query.poolOpentime}&pageNumber=1`}
          >
            1
          </Pagination.Item>
        );
        items.push(<Pagination.Ellipsis disabled />);

        for (let number = active - 3; number <= active + 3; number++) {
          items.push(
            <Pagination.Item
              key={number}
              active={number === active}
              href={`?searchWord=${query.searchWord}&poolPublic=${query.poolPublic}&poolPrivate=${query.poolPrivate}&poolHotel=${query.poolHotel}&poolForChild=${query.poolForChild}&poolForWoman=${query.poolForWoman}&poolForDisabled=${query.poolForDisabled}&poolIndoor=${query.poolIndoor}&poolOutdoor=${query.poolOutdoor}&poolOpentime=${query.poolOpentime}&pageNumber=${number}`}
            >
              {number}
            </Pagination.Item>
          );
        }

        items.push(<Pagination.Ellipsis disabled />);
        items.push(
          <Pagination.Item
            href={`?searchWord=${query.searchWord}&poolPublic=${query.poolPublic}&poolPrivate=${query.poolPrivate}&poolHotel=${query.poolHotel}&poolForChild=${query.poolForChild}&poolForWoman=${query.poolForWoman}&poolForDisabled=${query.poolForDisabled}&poolIndoor=${query.poolIndoor}&poolOutdoor=${query.poolOutdoor}&poolOpentime=${query.poolOpentime}&pageNumber=${totalPages}`}
          >
            {totalPages}
          </Pagination.Item>
        );
      }
    }

    // 마지막 페이지로 이동, 다음 페이지로 이동
    if (active !== totalPages) {
      items.push(
        <Pagination.Next
          href={`?searchWord=${query.searchWord}&poolPublic=${
            query.poolPublic
          }&poolPrivate=${query.poolPrivate}&poolHotel=${
            query.poolHotel
          }&poolForChild=${query.poolForChild}&poolForWoman=${
            query.poolForWoman
          }&poolForDisabled=${query.poolForDisabled}&poolIndoor=${
            query.poolIndoor
          }&poolOutdoor=${query.poolOutdoor}&poolOpentime=${
            query.poolOpentime
          }&pageNumber=${active + 1}`}
        />
      );
      items.push(
        <Pagination.Last
          href={`?searchWord=${query.searchWord}&poolPublic=${query.poolPublic}&poolPrivate=${query.poolPrivate}&poolHotel=${query.poolHotel}&poolForChild=${query.poolForChild}&poolForWoman=${query.poolForWoman}&poolForDisabled=${query.poolForDisabled}&poolIndoor=${query.poolIndoor}&poolOutdoor=${query.poolOutdoor}&poolOpentime=${query.poolOpentime}&pageNumber=${totalPages}`}
        />
      );
    }
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
          <ListPool show={true} queryResults={queryResults} page={0} />
        </div>
      </div>
      <div id="pagination-div">
        <Pagination>{items}</Pagination>
      </div>
    </>
  );
}

export default PoolPage;
