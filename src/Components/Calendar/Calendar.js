import React, { useState, useEffect } from "react";
import { format, startOfWeek, endOfWeek, addWeeks, subWeeks } from "date-fns";
import "./Calendar.css";


export default function () {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [publications, setPublications] = useState([])


  const daysDictionary = new Map()
  daysDictionary.set(0, "Mon");
  daysDictionary.set(1, "Tue");
  daysDictionary.set(2, "Wed");
  daysDictionary.set(3, "Thu");
  daysDictionary.set(4, "Fri");
  daysDictionary.set(5, "Sat");
  daysDictionary.set(6, "Sun");

  const start = startOfWeek(currentDate);
  const end = endOfWeek(currentDate);

  start.setDate(start.getDate() + 1);
  end.setDate(end.getDate() + 1);


  const days = [];
  let day = start;
  while (day <= end) {
    days.push(day);
    day = new Date(day.getTime() + 24 * 60 * 60 * 1000);
  }


  const jwt = document.cookie.split("=")[1]

  useEffect(()=>{
    getData()
  },[])

  // console.log(new Date(publications.expiry).toDateString().slice(0,3))


  const getData =() => {  
  fetch("/api/v1/publication/getAllPublications",
  {credentials:"include",
    method:"GET",
    headers:{"Authorization":`Bearer ${jwt}`, "Content-Type":"application/json"},
  }).then((response)=>response.json()).then((responseJson)=>{
    setPublications(responseJson)
    console.log(responseJson)
    // var date = new Date(responseJson.expiry)
  })
}



  function dayTimes(i,j){
    if(j===0){
      return (j)
    }

    return ""
  }

  let rows = [];
  let x = 0; let y=0;
  for (let i =0; i<168; i++){
    x++;
    if(i%7===0){
      x=0;
    } 
    if(i%7===0 && i!=0){
      y++;
    }
    let coordinates = [x,y]

    let value = (i/7+":00").padStart(5, "0");
    rows.push(<div key={coordinates} id="tableCell">
      {i%7===0 && i!=0 ? <div id="timeScale">{value}</div>: null}
      {publications.map((publication)=>(
        <div id="calendarEntry">
          {daysDictionary.get(coordinates[0]) == new Date(publication.expiry).toDateString().slice(0,3)
            && compareTwoDates(days[coordinates[0]], new Date(publication.expiry)) && coordinates[1]==
            new Date(publication.expiry).getHours()
            ? <div id="entry">Maths Exam 2023</div> : null}
            </div>
      ))}
    
    </div>)
  }


  function compareTwoDates(date1, date2){
    if(date1.getDate()!=date2.getDate()){
      return false;
    }

    if(date1.getFullYear() != date2.getFullYear()){
      return false;
    }

    if(date1.toDateString().slice(4,7) != date2.toDateString().slice(4,7)){
      return false;
    }

    return true

  }

  const handleNextWeek = () => {
    setCurrentDate(addWeeks(currentDate, 1));
  };

  const handlePrevWeek = () => {
    setCurrentDate(subWeeks(currentDate, 1));
  };



  return (
    <div id="calendarContainer">
      {/* <div id="calendarSubContainer"> */}
      <div id="daysContainer">
        {days.map((day) => (
          <div id="dayContainer" key={day}>
            <div id="dayHeading">
              <div id="dayText">{format(day, "dd")}</div>
              <div id="dayMonthContainer">
                {day.toDateString().slice(0, 3)},
                <div id="monthText">{day.toDateString().slice(4, 7)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {currentDate.getFullYear()}
      <div>
        <div className=".timeContainer" id="timeContainer">
          {rows}
        </div>
        <button id="calendarButton" onClick={handlePrevWeek}>
          Previous Week
        </button>
        <button id="calendarButton" onClick={handleNextWeek}>
          Next Week
        </button>
      </div>
  
    </div>
  );
}
