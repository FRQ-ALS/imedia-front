import React, { useState } from "react";
import "./Sidebar.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export default function Sidebar(props) {
  const [sideBarExtended, setSideBarExtended] = useState(false);
  var className;

  const handleToggleExtension = (e) => {
    console.log(sideBarExtended);
    setSideBarExtended(!sideBarExtended);
  };

  return (
    <div id="left-sidebar" className={sideBarExtended ? "extended" : "retracted"}>
      <button id="extendButton" onClick={handleToggleExtension}>
      {sideBarExtended ? <ArrowBackIosNewIcon/> : <ArrowForwardIosIcon/>}

      </button>
    </div>
  );
}
