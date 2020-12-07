import React, { useState, useEffect } from "react";
import axios from "axios";
import queryString from "query-string";
import { useHistory } from "react-router-dom";
import NavBar from "../components/NavBar";
import AdminBoard from "../components/AdminBoard";
import AdminCreate from "../components/AdminCreate";
import AdminQuerySearch from "../components/AdminQuerySearch";
import ListPool from "../components/ListPool";
import Loading from "../components/Loading";
import Redirecting from "../components/Redirecting";
import Pagination from "react-bootstrap/Pagination";
import "../styles/AdminPage.css";
const host = require("../host");

function AdminPage({ location }) {
  let history = useHistory();

  // Query
  const query = queryString.parse(location.search);

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
    let active = parseInt(query.pageNumber);
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

  const addButtonClick = () => {
    setShowCreateForm(!showCreateForm);
    setShowSearchForm(false);
  };

  const searchButtonClick = () => {
    setShowCreateForm(false);
    setShowSearchForm(!showSearchForm);
  };

  const [isAdmin, setIsAdmin] = useState(undefined);

  useEffect(() => {
    if (query.searchWord) {
      axios
        .get(
          `${host.server}/admin/pool?searchWord=${query.searchWord}&poolPublic=${query.poolPublic}&poolPrivate=${query.poolPrivate}&poolHotel=${query.poolHotel}&poolIndoor=${query.poolIndoor}&poolOutdoor=${query.poolOutdoor}&poolOpentime=${query.poolOpentime}&poolForChild=${query.poolForChild}&poolForWoman=${query.poolForWoman}&poolForDisabled=${query.poolForDisabled}&pageNumber=${query.pageNumber}`
        )
        .then((response) => {
          const result = response.data;
          setQueryResults(result);
        });
    }

    async function checkAuthenticated() {
      const response = await axios.get(`${host.server}/isAuthenticated`);
      const data = await response.data.response;
      if (!data) {
        history.push("/login");
      }
      setIsAdmin(data);
    }
    checkAuthenticated();
  }, []);

  if (isAdmin === undefined) {
    return <Loading />;
  } else if (!isAdmin) {
    return <Redirecting />;
  } else {
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
}

export default AdminPage;
