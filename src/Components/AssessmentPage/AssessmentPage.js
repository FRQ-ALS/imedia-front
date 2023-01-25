import React, { useState, useRef, useEffect } from "react";
import "./AssessmentPage.css";
import CustomTextField from "../TextField/CustomTextField";
import { useNavigate, useParams } from "react-router-dom";
import useAlert from "../../Hooks/AlertHook";
import CustomButton from "../CustomButton/CustomButton";
import CreatQuestion from "../CreateQuestionPage/CreateQuestion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Select from 'react-select'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import pdfdocument from "../../health.pdf"
// import Pdf from "@mikecousins/react-pdf";

import PdfViewer from "../PdfViewer/PdfViewer";
import { ClosedCaptionDisabledOutlined } from "@mui/icons-material";


const subjects = [
  {value:'Maths',label:'Maths'},
  {value:'Science', label:'Science'},
  {value:'English',label:'English'}
]


const examTypes = [
  {value:'Exam',label:'Exam'},
  {value:'Quiz', label:'Quiz'},
  {value:'Homework',label:'Homework'}
]

export default function AssessmentPage(props) {
  const { setAlert } = useAlert();
  const params = useParams()

  const [questionsArray, setQuestionsArray] = useState([]);
  const [name, setName] = useState("");
  const [typeSelect, setType] = useState({label:"Type", value:"Type"});
  const [subjectSelect, setSubject] = useState({label:"Subject", value:"Subject"});
  const [assessmentToken, setAssesmentToken] = useState()

  const jwt = document.cookie.split("=")[1]


  useEffect(()=>{
    getAssessment()
  },[])

  const getAssessment = () => {
    const token = params.token
    fetch(`/api/v1/account/getAssessment/${token}`,
    {
      credentials:"include",
      method:"GET",
      headers:{"Authorization":`Bearer ${jwt}`},
    }).then((response)=>{
      if(response.status!=200){
        return
      }
      response.json().then((responseJson)=>{
        setType({label:responseJson.type, value:responseJson.type})
        setSubject({label:responseJson.subject, value:responseJson.subject})
        setName(responseJson.name)
        setQuestionsArray(responseJson.questionsArray)
      })

    })
  }

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType({label:e.value, value:e.value});
  };

  const handleSubjectChange = (e) => {
    setSubject({label:e.value, value:e.value});
  };

  const handleCopyButton = (e) => {
    let copyText = document.getElementById("linkText").innerText;
    // copyText.select()
    // copyText.selectionRange(0,99999)
    navigator.clipboard.writeText(copyText);
    setAlert("Copied to clipboard!");
  };

  const handleGetQuestions = (questionsArray) => {
    const token = params.token
    const type = typeSelect.value
    const subject = subjectSelect.value
    var body = { name, type, subject, questionsArray, token};

    fetch("/api/v1/account/post", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(body),
    }).then((response)=>{
        if(response.ok){
          setAlert("Save successful!", "success")
        }
    })
  };


  return (
    <div id="pageContainer">
      <div id="fieldContainer">
        <CustomButton id="backToDashboardButton" onClick={event=>navigate("/dashboard")}>
          <ArrowBackIcon />
          Dashboard
        </CustomButton>
        <CustomTextField
          id="testName"
          className="textfield"
          placeholder="Test Name*"
          onChange={handleNameChange}
          value={name}
        />
        Subject: 
        <Select value={subjectSelect} onChange={handleSubjectChange} options={subjects} styles={{height:'100px'}} id="selector"/>
        Assessment Type: 
        <Select value={typeSelect} onChange={handleTypeChange} options={examTypes} styles={{height:'100px'}} id="selector"/>
      </div>
      {/* <PdfViewer/> */}
      <CreatQuestion setQuestionsArray={questionsArray} assessmentToken={params.token} getQuestions={handleGetQuestions} />
    </div>
  );
}
