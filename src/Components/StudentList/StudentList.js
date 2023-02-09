import React, { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";
import Person2RoundedIcon from '@mui/icons-material/Person2Rounded';
import DashboardIcon from '@mui/icons-material/Dashboard';
import "./StudentList.css";

export default function StudentList(props) {
  const className = "studentContainer " + props.className
  const [studentData, setStudentData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null)
  const [dashboardSelected, setDashboardSelected] = useState(true)

  const jwt = document.cookie.split("=")[1];

  const handleStudentClick =(event, student) =>{
    props.setSelectedStudent(student)
    setSelectedStudent(student)

    setDashboardSelected(false)

  }

  const handleSelectDashboard = () =>{
    setSelectedStudent(null)
    props.setSelectedStudent(null)
    setDashboardSelected(true)
  }

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    fetch("/api/v1/account/getstudents", {
      credentials: "include",
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setStudentData(responseJson);
      });
  };

  return (
    <div className={className}>
          <label id="studentHeading">Behaviour</label>
          <div onClick={handleSelectDashboard} id="dashBoardButton" className={dashboardSelected ?
          "selectedStudent" : ""}>
            <DashboardIcon/>
            Dashboard
          </div>
          <label id="studentHeading">Students</label>
          {studentData.map((student, index) => (
            <div className={selectedStudent==student ? "selectedStudent": ""} onClick={event => handleStudentClick(event, student)} key={index} id="studentNameRow">
              <Person2RoundedIcon/>
              <div id="studentItem" >
                {student.firstName} {student.lastName}
              </div>
              {/* <td id="activeInactiveLabel">{student.enabled ? "Active" : "Inactive"}</td> */}
            </div>
          ))}
    </div>
  );
}
