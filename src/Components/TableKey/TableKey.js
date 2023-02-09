import React from "react";
import "./TableKey.css";

export default function TableKey() {
  return (
    <div id="tableKeysContainer">
      <div id="individualContainer">
        <div id="authorizedAbsence"></div>
        <label>Authorized Absence</label>
      </div>

      <div id="individualContainer">
        <div id="Absent"></div>
        <label>Absent</label>
      </div>

      <div id="individualContainer">
        <div id="lowScore"></div>
        <label>Low score</label>
      </div>

      <div id="individualContainer">
        <div id="mediumScore"></div>
        <label>Medium score</label>
      </div>

      <div id="individualContainer">
        <div id="highScore"></div>
        <label>High score</label>
      </div>
    </div>
  );
}
