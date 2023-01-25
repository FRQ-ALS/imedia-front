import React, { useState, useEffect } from "react";
import "./AssessmentDirectory.css";
import TableView from "../AssessmentTable/AssessmentTable";
import CustomButton from "../CustomButton/CustomButton";
import AssessmentTaskBar from "../AssessmentTaskBar/AssessmentTaskBar";


const subjects = ["All Subjects","Maths", "Science", "English"]
const types = ["All Types", "Quiz", "Homework", "Exam"]
const users = ["You", "All Users"]

export default function AssessmentDirectory() {
  const jwt = document.cookie.split("=")[1];
  const [assessmentData, setAssessmentData] = useState([]);
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)
  const pageSizeIncrement = 5;

  const [subject, setSubject] = useState("")
  const [type, setType] = useState("")

  const [defaultUser, setDefaultUser] = useState(0)
  const [defaultSubject, setDefaultSubject] = useState(0)
  const [defaultType, setDefaultType] = useState(0)



  useEffect(() => {
    getData();
  }, [size, subject, type]);

  const handleIncrementPage = (e) => {
    const newSize = size + pageSizeIncrement
    setSize(newSize)
  }

  const highlightCell = (tab, index) =>{
    if(subjects.indexOf(tab)>-1 && index===defaultSubject){
      return "optionHighlighted"
    }

    if(types.indexOf(tab)>-1 && index===defaultType){
      return "optionHighlighted"
    }

    if(users.indexOf(tab)>-1 && index===defaultUser){
      return "optionHighlighted"
    }

    return ""
  }

  const handleTypeClick = (tab, index) =>{
    setDefaultType(index)
    if(index>0){
      setType(tab)
      return
    }
    setType("")
  }

  const handleSubjectClick = (tab, index) =>{
    setDefaultSubject(index)
    if(index>0){
      setSubject(tab)
      return
    }
    setSubject("")
  } 

  const handleUserClick = (tab, index) =>{
    setDefaultUser(index)
  }




  const getData = () => {
    fetch(`/api/v1/account/getAssessmentList/subject=${subject}&type=${type}&page=${page}&size=${size}`, {
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

  return <div id="directoryContainer">
    <div id="optionsContainer">
    <div id="tabContainer">
      {users.map((tab, index)=>(
        <div key={index} onClick={event=>handleUserClick(tab, index)} className={highlightCell(tab, index)} id="individualTab">{tab}</div>
      ))}
    </div>
    <div id="tabContainer">
      {subjects.map((tab, index)=>(
        <div key={index} onClick={event=>handleSubjectClick(tab, index)} className={highlightCell(tab, index)} id="individualTab">{tab}</div>
      ))} 
    </div>
    <div id="tabContainer">
      {types.map((tab, index)=>(
        <div key={tab} value={tab} onClick={event=>handleTypeClick(tab, index)} className={highlightCell(tab, index)}id="individualTab">{tab}</div>
      ))}
    </div>
    </div>

    <div>
    <AssessmentTaskBar/>
    <TableView data={assessmentData}/>
    <CustomButton id="loadMoreButton" onClick={handleIncrementPage}>Load More...</CustomButton>
    </div>
  </div>;
}
