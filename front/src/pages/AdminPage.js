import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import NavBar from "../components/NavBar";
import AdminBoard from "../components/AdminBoard";
import AdminCreate from "../components/AdminCreate";
import AdminQuerySearch from "../components/AdminQuerySearch";
import ListPool from "../components/ListPool";
import Pagination from "react-bootstrap/Pagination";
import "../styles/AdminPage.css";

function AdminPage({ location }) {
  // Query
  const query = queryString.parse(location.search);
  // console.log(query);

  // Query Results
  const [queryResults, setQueryResults] = useState({});

  // Show
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(
    query.searchWord ? true : false
  );

  // Pagination
  let items = [];
  if (query.searchWord) {
    let active = query.pageNumber;
    for (
      let number = 1;
      number <= Math.ceil(queryResults.totalCount / 4);
      number++
    ) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === parseInt(active)}
          href={`?searchWord=${query.searchWord}&poolPublic=${query.poolPublic}&poolPrivate=${query.poolPrivate}&poolHotel=${query.poolHotel}&poolForChild=${query.poolForChild}&poolForWoman=${query.poolForWoman}&poolForDisabled=${query.poolForDisabled}&poolIndoor=${query.poolIndoor}&poolOutdoor=${query.poolOutdoor}&poolOpentime=${query.poolOpentime}&pageNumber=${number}`}
        >
          {number}
        </Pagination.Item>
      );
    }
  }

  const addButtonClick = () => {
    setShowCreateForm(!showCreateForm);
    setShowSearchForm(false);
  };

  const searchButtonClick = () => {
    setShowCreateForm(false);
    setShowSearchForm(!showSearchForm);
  };

  useEffect(() => {
    if (query.searchWord) {
      axios
        .get(
          `http://localhost:3000/pool?searchWord=${query.searchWord}&poolPublic=${query.poolPublic}&poolPrivate=${query.poolPrivate}&poolHotel=${query.poolHotel}&poolIndoor=${query.poolIndoor}&poolOutdoor=${query.poolOutdoor}&poolOpentime=${query.poolOpentime}&poolForChild=${query.poolForChild}&poolForWoman=${query.poolForWoman}&poolForDisabled=${query.poolForDisabled}&pageNumber=${query.pageNumber}`
        )
        .then((response) => {
          const result = response.data;
          setQueryResults(result);
        });
    }
  }, []);

  return (
    <>
      <NavBar page={2} />
      <div id="adminPageContent">
        <AdminBoard />
        <div id="adminPageButton">
          <button onClick={addButtonClick}>수영장 추가</button>
          <button onClick={searchButtonClick}>수영장 검색</button>
        </div>
        <div>
          <AdminCreate show={showCreateForm} />
          <AdminQuerySearch show={showSearchForm} query={query} />
          <ListPool
            show={query.searchWord ? true : false}
            queryResults={queryResults}
            id="adminList"
            page={1}
          />
          <div id="pagination-div">
            <Pagination>{items}</Pagination>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
