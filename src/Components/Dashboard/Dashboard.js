import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Calendar from "../Calendar/Calendar";
import Sidebar from "../Sidebar/Sidebar";
import { Routes, Route } from "react-router-dom";
import AssessmentView from "../AssessmentView/AssessmentView";
import AssessmentDirectory from "../AssessmentDirectory/AssessmentDirectory";
import AssessmentSort from "../AssessmentSort/AssessmentSort";

export default function Dashboard() {
  const [value, onChange] = useState(new Date());
  const [assessmentParameters, setAssessmentParameters] = useState({
    user: "",
    subject: "",
    type: "",
  });

  useEffect(() => {}, [assessmentParameters]);

  return (
    <div id="dashboard-container">
      <Sidebar id="sidebar" />
      <AssessmentDirectory
        assessmentParameters={assessmentParameters}
        id="projects"
      />
      <AssessmentSort
        setParameters={(data) => setAssessmentParameters(data)}
      />
      {/* <Calendar></Calendar> */}
    </div>
  );
}
