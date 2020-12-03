import React, { useEffect, useState } from "react";
import AdminSingleBoard from "./AdminSingleBoard";
import axios from "axios";
import "../styles/AdminBoard.css";

function AdminBoard() {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3000/admin/board`).then((response) => {
      let data = response.data;
      setNumbers([
        [[data.poolCount, "수영장"]],
        [
          [data.publicCount, "공공 수영장"],
          [data.privateCount, "사설 수영장"],
          [data.hotelCount, "호텔 수영장"],
        ],
        [
          [data.childCount, "유아 전용 수영장"],
          [data.womanCount, "여성 전용 수영장"],
          [data.disabledCount, "장애인 전용 수영장"],
        ],
        [
          [data.indoorCount, "실내 수영장"],
          [data.outdoorCount, "야외 수영장"],
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
