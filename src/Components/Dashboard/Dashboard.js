import React, { useEffect, useState } from "react";
import "./Dashboard.css";

import AssessmentView from "../AssessmentView/AssessmentView";

export default function Dashboard() {


  return(
    <div id="dashboard-container">
      <AssessmentView id="projects"/>
    </div>
  )
}
