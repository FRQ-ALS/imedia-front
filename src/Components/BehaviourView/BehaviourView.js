import React, { useState, useEffect } from "react";

import "./BehaviourView.css";

import StudentList from "../StudentList/StudentList";
import BehaviourCalendar from "../BehaviourCalendar/BehaviourCalendar";
import CalendarEntry from "../CalendarEntry/CalendarEntry";
import useAlert from "../../Hooks/AlertHook";
import BehaviourHome from "../BehaviourHome/BehaviourHome";

export default function BehaviourView(props) {
  const jwt = document.cookie.split("=")[1];

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [calendarEntryData, setCalendarEntryData] = useState(null);
  const [calendarData, setCalendarData] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [lessonReports, setLessonReports] = useState(null);
  const [currentDay, setCurrentDay] = useState(null);

  const { setAlert } = useAlert();


  const handleSetDay = (data) => {
    setCurrentDay(data);
    if (selectedStudent === null) {
      setAlert("You must select a student first", "error");
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
        setLessonReports(responseJson.lessonReports);
        setDialogOpen(true);
      });
  };


  return (
    <div id="behaviourViewContainer">
      <StudentList
        setSelectedStudent={(student) => setSelectedStudent(student)}
        className="studentList"
      />

      {selectedStudent != null ? (
        <BehaviourCalendar
          setDay={handleSetDay}
          calendarData={calendarData}
          student={selectedStudent}
        />
      ) : (
        <BehaviourHome />
      )}

      <CalendarEntry
        data={calendarEntryData}
        setDialogOpen={(boolean) => setDialogOpen(boolean)}
        lessonReports={lessonReports}
        dialogOpen={dialogOpen}
        day={currentDay}
        student={selectedStudent}
      />
    </div>
  );
}
