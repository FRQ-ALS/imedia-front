import React, { useState, useEffect } from "react";
import "./AssessmentDirectory.css";
import TableView from "../AssessmentTable/AssessmentTable";
export default function AssessmentDirectory() {
  const jwt = document.cookie.split("=")[1];

  const [assessmentData, setAssessmentData] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("/api/v1/account/getAssessmentList/subject=Maths&type=Quiz&page=0&size=1", {
      credentials: "include",
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setAssessmentData(responseJson)
      });
  };

  return <div>
    <TableView data={assessmentData}/>
  </div>;
}
