import React, { useState } from "react";
import "./Sidebar.css";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PersonIcon from "@mui/icons-material/Person";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PsychologyIcon from "@mui/icons-material/Psychology";
export default function Sidebar(props) {
  const [sideBarExtended, setSideBarExtended] = useState(true);
  const [selectedButton, setSelectedButton] = useState("assessmentButton");


  const handleToggleExtension = (e) => {
    setSideBarExtended(!sideBarExtended);
  };

  const highlightButton = (e) =>{
    if(e.target.id==selectedButton){
      return "true"
    }

    return ""
  }


  return (
    <div
      id="left-sidebar"
      className={sideBarExtended ? "extended" : "retracted"}
    >
      <button
        className="sideBarButton"
        id="extendButton"
        onClick={handleToggleExtension}
      >
        {sideBarExtended ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />}
      </button>

      <button
        onClick={(event) => setSelectedButton(event.target.id)}
        className="sideBarButton"
        id="assessmentButton"
        highlighted={selectedButton=="assessmentButton" ? "yes": null}
      >
        <AssessmentIcon />
        {sideBarExtended ? "Assessments" : null}
      </button>

      <button className="sideBarButton" id="calendarIconButton">
        <CalendarMonthIcon />
        {sideBarExtended ? <div id="sideBarLabel">Calendar</div> : null}
      </button>

      <button className="sideBarButton" id="manageButton">
        <PersonIcon />
        {sideBarExtended ? <div id="sideBarLabel">Manage Students</div> : null}
      </button>

      <button className="sideBarButton" id="bahaviourButton">
        <PsychologyIcon />
        {sideBarExtended ? <div id="sideBarLabel">Behaviour</div> : null}
      </button>
    </div>
  );
}
