import React, { useState } from "react";

import "./BehaviourView.css";

import StudentList from "../StudentList/StudentList";
import BehaviourCalendar from "../BehaviourCalendar/BehaviourCalendar";
import CalendarEntry from "../CalendarEntry/CalendarEntry";
import useAlert from "../../Hooks/AlertHook";


export default function BehaviourView(props) {
  const jwt = document.cookie.split("=")[1];

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [calendarEntryData, setCalendarEntryData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [lessonReports, setLessonReports] = useState(null)
  const [currentDay, setCurrentDay] = useState(null)


  const {setAlert} = useAlert()

  const handleSetDay = (data) => {
    setCurrentDay(data)
    if(selectedStudent===null){
        setAlert("You must select a student first", "error")
    }
    const date = data.split("T")[0];
    const student_id = selectedStudent.id;
    const body = { date, student_id };

    fetch(`/api/v1/behaviour/postDate/`, {
      credentials: "include",
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setCalendarEntryData(responseJson);
        setLessonReports(responseJson.lessonReports)
        setDialogOpen(true);
      });
  };


  const getEntryScores = () =>{
    const student_id = selectedStudent.id;
    const startDate = "2022-09-01"
    const endDate = "2022-09-10"

    fetch(`/api/v1/behaviour/getScoresByDate/student_id=${student_id}&startDate=${startDate}&endDate=${endDate}`,
    {credentials:"include",
    method:"GET",
    headers:{"Authorization":`Bearer ${jwt}`,
  "Content-Type":"application/json"}
    }).then((response)=>response.json()).then((responseJson)=>{
      console.log(responseJson)
    })
  }

  if(selectedStudent!=null){
    getEntryScores()
  }


  return (
    <div id="behaviourViewContainer">
      <StudentList
        setSelectedStudent={(student) => setSelectedStudent(student)}
        className="studentList"
      />
      <BehaviourCalendar setDay={handleSetDay} student={selectedStudent} />
      <CalendarEntry
        data={calendarEntryData}
        setDialogOpen={(boolean) => setDialogOpen(boolean)}
        lessonReports = {lessonReports}
        dialogOpen={dialogOpen}
        day={currentDay}
        student={selectedStudent}
      />
    </div>
  );
}
