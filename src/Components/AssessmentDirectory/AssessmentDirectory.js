import React, { useState, useEffect } from "react";
import "./AssessmentDirectory.css";
import TableView from "../AssessmentTable/AssessmentTable";
import CustomButton from "../CustomButton/CustomButton";
import AssessmentTaskBar from "../AssessmentTaskBar/AssessmentTaskBar";


const subjects = ["All Subjects", "Maths", "Science", "English"];
const types = ["All Types", "Quiz", "Homework", "Exam"];
const users = ["You", "All Users"];

export default function AssessmentDirectory(props) {
  const jwt = document.cookie.split("=")[1];
  const [assessmentData, setAssessmentData] = useState([]);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const pageSizeIncrement = 5;

  // const [subject, setSubject] = useState("");
  // const [type, setType] = useState("");

  const [defaultUser, setDefaultUser] = useState(0);
  const [defaultSubject, setDefaultSubject] = useState(0);
  const [defaultType, setDefaultType] = useState(0);


  useEffect(() => {
    getData();
  }, [props.assessmentParameters]);

  const handleIncrementPage = (e) => {
    const newSize = size + pageSizeIncrement;
    setSize(newSize);
  };

  const getData = () => {

    let subject = props.assessmentParameters.subject
    let type = props.assessmentParameters.type
    fetch(
      `/api/v1/account/getAssessmentList/subject=${subject}&type=${type}&page=${page}&size=${size}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setAssessmentData(responseJson);
      });
  };

  return (
    <div id="directoryContainer">
      <div id="centralContainer">
        <AssessmentTaskBar />
        <TableView data={assessmentData} />
       {assessmentData.length > 5 ?  <CustomButton id="loadMoreButton" onClick={handleIncrementPage}>
          Load More...
        </CustomButton> : null}
      </div>
    </div>
  );
}
