import React from "react";
import NavBar from "../components/NavBar";
import AdminCreate from "../components/AdminCreate";
import AdminQuerySearch from "../components/AdminQuerySearch";
import "../styles/AdminPage.css";

function AdminPage() {
  return (
    <>
      <NavBar page={2} />
      {/* <h2>Admin Page</h2> */}
      <div id="adminPageContent">
        <AdminCreate />
        <div id="adminPageSearch">
          <AdminQuerySearch />
          <div>
            <p>Results</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
