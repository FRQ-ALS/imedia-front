import React, { useEffect, useState } from "react";

import "./BehaviourCalendar.css";
import CustomButton from "../CustomButton/CustomButton";

export default function BehaviourCalendar(props) {
  const [weeks, setWeeks] = useState([]);
  const [selectedButton, setSelectedButton] = useState(1);
  const [absent, setAbsent] = useState(false);

  useEffect(() => {
    generateWeeks(new Date(2022, 8, 5), new Date(2022, 11, 16));
  }, []);


  const halfTermMap = new Map();

  halfTermMap.set("Mon Oct 24 2022", 1);
  halfTermMap.set("Mon Feb 20 2023", 1);
  halfTermMap.set("Mon May 29 2023", 1);

  function formatDate(day) {
    const date = day.toDateString().split(" ");
    return date[2] + " " + date[1];
  }

  const handleCalendarDayClick = (e, day) => {
    props.setDay(new Date(day).toISOString())
  }

  const generateWeeks = (date, date2) => {
    let currentWeek = [];
    let allWeeks = [];
    // let date = new Date(2022, 8, 5);
    while (date <= date2) {
      let dayOfWeek = date.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        date.setDate(date.getDate() + 1);
        continue;
      }
      currentWeek.push(new Date(date));
      if (currentWeek.length === 5) {
        allWeeks.push(currentWeek);
        currentWeek = [];
      }
      date.setDate(date.getDate() + 1);
    }
    setWeeks(allWeeks);
  };

  const renderWeeks = () => {
    return weeks.map((week, index) => (
      <tr id="calendarRow" key={index}>
        {halfTermMap.has(week[0].toDateString()) ? (
          <td colSpan="6" id="halfTermCell">
            HALF TERM
          </td>
        ) : (
          <>
            {week.map((day, index) => (
              <td onClick={event=>handleCalendarDayClick(event, day)} key={index}>
                <div id="calendarDayContainer">
                  <div id="calendarDay">{formatDate(day)}</div>
                  <div></div>
                </div>
              </td>
            ))}
            <td>25/150</td>
          </>
        )}
      </tr>
    ));
  };

  return (
    <>
    {props.student!=null ? 
    <div id="behaviourCalendarContainer">
      {props.student != null ? (
        <label id="studentLabel">
          Behaviour report for {props.student.firstName}{" "}
          {props.student.lastName}
        </label>
      ) : null}
      <div id="termButtonsContainer">
        <button
          className={selectedButton == 1 ? "selectedTermButton" : ""}
          onClick={(event) => {
            generateWeeks(new Date(2022, 8, 5), new Date(2022, 11, 16));
            setSelectedButton(1);
          }}
          id="termButton1"
        >
          Term 1
        </button>
        <button
          className={selectedButton == 2 ? "selectedTermButton" : ""}
          id="termButton2"
          onClick={(event) => {
            generateWeeks(new Date(2023, 0, 2), new Date(2023, 2, 31));
            setSelectedButton(2);
          }}
        >
          Term 2
        </button>
        <button
          className={selectedButton == 3 ? "selectedTermButton" : ""}
          id="termButton3"
          onClick={(event) => {
            generateWeeks(new Date(2023, 3, 17), new Date(2023, 6, 31));
            setSelectedButton(3);
          }}
        >
          Term 3
        </button>
      </div>
      <table>
        <thead>
          <tr id="calendarDayHeading">
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{renderWeeks()}</tbody>
      </table>
    </div>
    : null}
    </>
  );
}
