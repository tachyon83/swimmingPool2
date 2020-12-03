import React from "react";
import "../styles/AdminSingleBoard.css";

function AdminSingleBoard({ number }) {
  return (
    <div className="adminSingleBoard">
      {number.map((single, i) => (
        <p key={i}>
          <span className="adminNumber">{single[0]}</span> {single[1]}
        </p>
      ))}
    </div>
  );
}

export default AdminSingleBoard;
