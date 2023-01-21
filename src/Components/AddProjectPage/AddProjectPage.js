import React, { useState, useRef, useEffect } from "react";

import "./AddProjectPage.css";
import CustomTextField from "../TextField/CustomTextField";
import { useNavigate } from "react-router-dom";
import useAlert from "../../Hooks/AlertHook";
import CustomButton from "../CustomButton/CustomButton";
import CreatQuestion from "../CreateQuestionPage/CreateQuestion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Select from 'react-select'
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack5';
import pdfdocument from "../../health.pdf"
// import Pdf from "@mikecousins/react-pdf";

import PdfViewer from "./PdfViewer/PdfViewer";

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
  standardFontDataUrl: 'standard_fonts/',
};


const subjects = [
  {value:'maths',label:'Maths'},
  {value:'science', label:'Science'},
  {value:'english',label:'English'}
]

const examTypes = [
  {value:'exam',label:'Exam'},
  {value:'quiz', label:'Quiz'},
  {value:'homework',label:'Homework'}
]

export default function AddProjectPage(props) {
  const { setAlert } = useAlert();
  var jwt = localStorage.getItem("jwt");

  const [questionsArray, setQuestionsArray] = useState([]);
  const [name, setName] = useState();
  const [type, setType] = useState();
  const [subject, setSubject] = useState();

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleTypeChange = (e) => {
    setType(e.value);
  };

  const handleSubjectChange = (e) => {
    setSubject(e.value);
  };

  const handleCopyButton = (e) => {
    let copyText = document.getElementById("linkText").innerText;
    // copyText.select()
    // copyText.selectionRange(0,99999)
    navigator.clipboard.writeText(copyText);
    setAlert("Copied to clipboard!");
  };

  const handleGetQuestions = (questionsArray) => {
    var body = { name, type, subject, questionsArray};
    
    // if()

    fetch("/api/v1/account/post", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(body),
    });
  };


  return (
    <div id="pageContainer">
      <div id="fieldContainer">
        <CustomButton id="backToDashboardButton" onClick={event=>navigate("/dashboard")}>
          <ArrowBackIcon />
          Dashboard
        </CustomButton>
        {/* Test Name: */}
        <CustomTextField
          id="testName"
          className="textfield"
          placeholder="Test Name*"
          onChange={handleNameChange}
        />
        Subject: 
        <Select onChange={handleSubjectChange} options={subjects} styles={{height:'100px'}} id="selector"/>
        Assessment Type: 
        <Select onChange={handleTypeChange} options={examTypes} styles={{height:'100px'}} id="selector"/>
      </div>
      <PdfViewer/>
      <CreatQuestion getQuestions={handleGetQuestions} />
    </div>
  );
}
