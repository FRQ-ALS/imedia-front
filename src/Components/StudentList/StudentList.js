import React, { useEffect, useState } from "react";
import { useFetcher } from "react-router-dom";

import "./StudentList.css";

export default function StudentList(props) {
  const className = "studentContainer " + props.className
  const [studentData, setStudentData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null)

  const jwt = document.cookie.split("=")[1];

  const handleStudentClick =(event, student) =>{
    props.setSelectedStudent(student)
    setSelectedStudent(student)
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
        console.log(responseJson);
        setStudentData(responseJson);
      });
  };

  return (
    <div className={className}>
      <table>
        <thead>
          <tr>
            <th id="studentHeading">Students</th>
          </tr>
        </thead>

        <tbody>
          {studentData.map((student, index) => (
            <tr onClick={event => handleStudentClick(event, student)} key={index} id="studentNameRow">
              <td id="studentItem" className={selectedStudent==student ? "selectedStudent": ""}>
                {student.firstName} {student.lastName}
              </td>
              <td>{student.enabled ? "Active" : "Inactive"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
