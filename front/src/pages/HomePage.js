import React from "react";
import NavBar from "../components/NavBar";
import HomeQuerySearch from "../components/HomeQuerySearch";

function HomePage() {
  return (
    <>
      <NavBar page={0} />
      <HomeQuerySearch />
    </>
  );
}

export default HomePage;
