import React, { useState, useEffect } from "react";
import axios from "axios";
import NavBar from "../components/NavBar";
import { Button } from "react-bootstrap";

function AdminSpecificPoolPage({ history, match }) {
  console.log("1번");
  const poolId = match.params.id;
  const [queryResults, setQueryResults] = useState({});

  // Detail Variables
  const [poolName, setPoolName] = useState("");

  const [poolPublic, setPoolPublic] = useState(false);
  const [poolPrivate, setPoolPrivate] = useState(false);
  const [poolHotel, setPoolHotel] = useState(false);

  // const [poolIndoor, setPoolIndoor] = useState(poolTypeMask[3] === "1");
  // const [poolOutdoor, setPoolOutdoor] = useState(poolTypeMask[4] === "1");

  // const [poolForChild, setPoolForChild] = useState(poolOptionMask[0] === "1");
  // const [poolForWoman, setPoolForWoman] = useState(poolOptionMask[1] === "1");
  // const [poolForDisabled, setPoolForDisabled] = useState(
  //   poolOptionMask[2] === "1"
  // );

  useEffect(() => {
    console.log("2번");
    const fetchData = async () => {
      const response = await axios(`http://localhost:3000/pool/${poolId}`);
      setQueryResults(response.data);
      setPoolName(response.data.poolName);

      let poolTypeMask = response.data.poolTypeMask.toString(2).split("");
      poolTypeMask = [
        ...Array(5 - poolTypeMask.length).fill("0"),
        ...poolTypeMask,
      ];
      setPoolPublic(poolTypeMask[0] === "1");
      setPoolPrivate(poolTypeMask[1] === "1");
      setPoolHotel(poolTypeMask[2] === "1");
    };
    fetchData();
    console.log("3번");
    // axios
    //   .get(`http://localhost:3000/pool/${poolId}`)
    //   .then((response) => {
    //     const result = response.data;
    //     setQueryResults(result);
    //   })
    //   .catch((response) => console.log("axios result error", response));
  }, []);

  if (queryResults.poolName) {
    // poolOptionMask
    let poolOptionMask = queryResults.poolOption.toString(2).split("");
    poolOptionMask = [
      ...Array(3 - poolOptionMask.length).fill("0"),
      ...poolOptionMask,
    ];
  }

  return (
    <>
      <NavBar page={2} />
      <div id="adminPageContent">
        <Button onClick={history.goBack}>돌아가기</Button>
      </div>
    </>
  );
}

export default AdminSpecificPoolPage;
