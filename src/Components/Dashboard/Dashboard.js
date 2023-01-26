import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Calendar from "../Calendar/Calendar";

import AssessmentView from "../AssessmentView/AssessmentView";

export default function Dashboard() {
  const [value, onChange] = useState(new Date());


  return(
    <div id="dashboard-container">
      <AssessmentView id="projects"/>
      <Calendar></Calendar>
    </div>
  )
}
