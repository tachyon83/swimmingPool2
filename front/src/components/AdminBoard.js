import React, { useEffect, useState } from "react";
import AdminSingleBoard from "./AdminSingleBoard";
import axios from "axios";
import "../styles/AdminBoard.css";

function AdminBoard() {
  const [boardNumbers, setBoardNumbers] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:3000/admin/board`).then((response) => {
      console.log(response);
      setBoardNumbers(response.data);
    });
  }, []);

  let numbers = [
    [[123, "수영장"]],
    [
      [20, "공공 수영장"],
      [30, "사설 수영장"],
      [40, "호텔 수영장"],
    ],
    [
      [10, "유아 전용 수영장"],
      [30, "여성 전용 수영장"],
      [60, "장애인 전용 수영장"],
    ],
    [
      [20, "실내 수영장"],
      [30, "야외 수영장"],
    ],
  ];

  return (
    <div class="adminBoard">
      {numbers.map((number, i) => (
        <AdminSingleBoard number={number} key={i} />
      ))}
    </div>
  );
}

export default AdminBoard;
