import React, { useEffect, useState } from "react";
import AdminSingleBoard from "./AdminSingleBoard";
import axios from "axios";
import "../styles/AdminBoard.css";
const host = require("../host");

function AdminBoard() {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    axios.get(`${host.server}/admin/board`).then((response) => {
      let data = response.data;
      setNumbers([
        [[data.poolCount, "수영장"]],
        [
          [data.publicCount, "공공"],
          [data.privateCount, "사설"],
          [data.hotelCount, "호텔"],
        ],
        [
          [data.childCount, "유아 전용"],
          [data.womanCount, "여성 전용"],
          [data.disabledCount, "장애인 전용"],
        ],
        [
          [data.indoorCount, "실내"],
          [data.outdoorCount, "야외"],
        ],
      ]);
    });
  }, []);

  return (
    <div className="adminBoard">
      {numbers.map((number, i) => (
        <AdminSingleBoard number={number} key={i} />
      ))}
    </div>
  );
}

export default AdminBoard;
