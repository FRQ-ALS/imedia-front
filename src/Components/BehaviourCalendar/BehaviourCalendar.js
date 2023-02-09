import React, { useEffect, useState } from "react";

import "./BehaviourCalendar.css";
import CustomButton from "../CustomButton/CustomButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import TableKey from "../TableKey/TableKey";
import DropDownMenu from "../DropDownMenu/DropDownMenu";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";

const jwt = document.cookie.split("=")[1];

const halfTermMap = new Map();

halfTermMap.set("Mon Oct 24 2022", 1);
halfTermMap.set("Mon Feb 20 2023", 1);
halfTermMap.set("Mon May 29 2023", 1);

export default function BehaviourCalendar(props) {
  const [weeks, setWeeks] = useState([]);
  const [selectedButton, setSelectedButton] = useState(1);
  const [calendarData, setCalendarData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  useEffect(() => {
    loadTodaysTerm();
    loadCalendarData();
  }, [props.student]);

  function loadTodaysTerm() {
    const today = new Date();
    const term1Start = new Date(2022, 8, 5);
    const term2Start = new Date(2023, 0, 2);
    const term3Start = new Date(2023, 3, 17);

    if (today > term1Start && today < term2Start) {
      generateWeeks(new Date(2022, 8, 5), new Date(2022, 11, 16));
      setSelectedButton(1);
    }

    if (today > term2Start && today < term3Start) {
      generateWeeks(new Date(2023, 0, 2), new Date(2023, 2, 31));
      setSelectedButton(2);
    }

    if (today > term3Start) {
      generateWeeks(new Date(2023, 3, 17), new Date(2023, 6, 31));
      setSelectedButton(3);
    }
  }

  function formatDate(day) {
    const date = day.toDateString().split(" ");
    return date[2] + " " + date[1];
  }

  function loadCalendarData() {
    const student_id = props.student.id;
    const startDate = "2023-01-01";
    const endDate = "2023-09-10";
    fetch(
      `/api/v1/behaviour/getScoresByDate/student_id=${student_id}&startDate=${startDate}&endDate=${endDate}`,
      {
        credentials: "include",
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setCalendarData(responseJson);
      });
  }

  const handleTodayClick = (e) => {
    loadTodaysTerm();
  };

  const handleCalendarDayClick = (e, day, weekIndex, index) => {
    if(new Date()<day){
      return
    }
    
    e.stopPropagation();
    setSelectedDay(`${weekIndex},${index}`);
  };

  const generateWeeks = (date, date2) => {
    let currentWeek = [];
    let allWeeks = [];
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

  function buildClassNameForTd(day) {
    var stringBuiler = [];
    const today = new Date().toLocaleDateString();

    if (today == day.toLocaleDateString()) {
      stringBuiler.push("todaysDate");
    }

    stringBuiler.push(
      loopThroughCalendarArray(calendarData, day.toISOString().split("T")[0])
    );

    // stringBuiler.push(loopThroughCalendarArray(calendarData, day))
    var result = stringBuiler.join(" ");
    return result;
  }

  function loopThroughCalendarArray(arr, day) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].date == day && arr[i].attendance == "ABSENT_AUTHORIZED") {
        return "authAbsent";
      }

      if (arr[i].date == day && arr[i].attendance == "ABSENT") {
        return "absentUnAuth";
      }

      if (arr[i].date == day) {
        let x = arr[i].score;

        switch (true) {
          case x <= 10:
            return "lowScore";
          case x > 10 && x <= 20:
            return "midScore";
          case x > 20:
            return "highScore";
        }
      }
    }
    return "";
  }

  function returnDailyScore(day) {
    const formattedDay = day.toISOString().split("T")[0];
    for (let i = 0; i < calendarData.length; i++) {
      if (
        calendarData[i].date == formattedDay &&
        calendarData[i].attendance != "ABSENT_AUTHORIZED"
      ) {
        return calendarData[i].score;
      }
    }
  }

  function calculateTotal(week, index) {
    let count = 0;
    for (let i = 0; i < week.length; i++) {
      for (let j = 0; j < calendarData.length; j++) {
        let weeklyDate = week[i].toISOString().split("T")[0];
        let calendarDate = calendarData[j].date;
        if (
          weeklyDate === calendarDate &&
          calendarData[j].attendance != "ABSENT_AUTHORIZED"
        ) {
          count += calendarData[j].score;
          break;
        }
      }
    }
    return count;
  }

  function renderDropDownMenu(day) {
    return (
      <div
        style={{
          width: 150,
          maxWidth: "100%",
          outline: "1px solid black",
          position: "absolute",
          opacity: "1",
          backgroundColor: "white",
          zIndex: "1",
        }}
      >
        <MenuList>
          <MenuItem
            onClick={(event) => {
              props.setDay(new Date(day).toISOString());
            }}
          >
            <ListItemText>View Report</ListItemText>
          </MenuItem>
          <MenuItem onClick={(event) => handleMarkAbsent(event, day)}>
            <ListItemText>Mark absent</ListItemText>
          </MenuItem>

          <MenuItem onClick={(event) => handleCloseMenu(event)}>
            <ListItemText>Close</ListItemText>
          </MenuItem>
        </MenuList>
      </div>
    );
  }

  const handleMarkAbsent = (e, day) => {
    const date = day.toJSON().split("T")[0];
    const student_id = props.student.id;
    const attendance = "ABSENT";

    fetch(
      `/api/v1/behaviour/updateAttendance/date=${date}&student_id=${student_id}&attendance=${attendance}`,
      {
        credentials: "include",
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
      }
    ).then((response) => {
      console.log(response);
     if(response.ok){
      loadCalendarData();
      setSelectedDay(null);
     }
    });
  };

  const handleCloseMenu = (e) => {
    setSelectedDay(null);
    console.log(selectedDay);
  };

  const renderWeeks = () => {
    return weeks.map((week, weekIndex) => (
      <tr id="calendarRow" key={weekIndex}>
        {halfTermMap.has(week[0].toDateString()) ? (
          <td colSpan="6" id="halfTermCell">
            HALF TERM
          </td>
        ) : (
          <>
            {week.map((day, index) => (
              <td key={index}>
                {selectedDay === `${weekIndex},${index}`
                  ? renderDropDownMenu(day)
                  : null}
                {calendarData != null ? (
                  <div
                    id="calendarDayContainer"
                    className={buildClassNameForTd(day)}
                    onClick={(event) =>
                      handleCalendarDayClick(event, day, weekIndex, index)
                    }
                  >
                    <div id="calendarDay">{formatDate(day)}</div>
                    <div>{returnDailyScore(day)}</div>
                  </div>
                ) : null}
              </td>
            ))}
            <td
              style={{
                fontWeight: "bold",
                width: "100px",
                textAlign: "center",
              }}
            >
              {calculateTotal(week, weekIndex)} / 125
            </td>
          </>
        )}
      </tr>
    ));
  };

  return (
    <>
      {props.student != null ? (
        <div id="behaviourCalendarContainer">
          {props.student != null ? (
            <label id="studentLabel">
              Behaviour report for {props.student.firstName}{" "}
              {props.student.lastName}
            </label>
          ) : null}

          <div id="studentStatsContainer">
            <div></div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
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

            <CustomButton onClick={handleTodayClick} id="todayButton">
              Today
            </CustomButton>
          </div>
          <TableKey />
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
      ) : null}
    </>
  );
}
