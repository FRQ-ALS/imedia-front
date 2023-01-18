import React, { useState, useRef, useEffect } from "react";

import "./AddProjectPage.css";
import CustomTextField from "../TextField/CustomTextField";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
import OwnerTab from "../OwnerTab/OwnerTab";
import { useNavigate } from "react-router-dom";
import ProjectInvitation from "../ProjectInvitation/ProjectInvitation";
import useAlert from "../../Hooks/AlertHook";
import CustomButton from "../CustomButton/CustomButton";
import CreatQuestion from "../CreateQuestionPage/CreateQuestion";

const NAME_TAKEN_MESSAGE =
  "A project with this name already exists on this account, please enter another name.";
const FIELD_EMPTY_MESSAGE =
  "Project name cannot be empty! Please enter a project name";
const BELOW_ZERO_MESSAGE = "The maximum number of uses cannot be 0 or lower";
const INVALID_DATE_MESSAGE = "The selected date must be from tomorrow onwards";

export default function AddProjectPage(props) {
  const { setAlert } = useAlert();
  var jwt = localStorage.getItem("jwt");

  const [questionsArray, setQuestionsArray] = useState([]);
  const [name, setName] = useState()
  const [description, setDescription] = useState()
  const [subject, setSubject] = useState()

  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubjectChange = (e) =>{
    setSubject(e.target.value)
  }


  const handleCopyButton = (e) => {
    let copyText = document.getElementById("linkText").innerText;
    // copyText.select()
    // copyText.selectionRange(0,99999)
    navigator.clipboard.writeText(copyText);
    setAlert("Copied to clipboard!");
  };

  const handleGetQuestions = (data)=>{
    setQuestionsArray(data)
    var body = {name, description, subject, questionsArray}
    console.log(body)

    fetch("/api/v1/post", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(body),
    })
  }



  const handleSubmit = (e) => {

    var body = {name, description, subject, questionsArray}

    fetch("/api/v1/post", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(body),
    })

  };

  return (
      <div id="pageContainer">
        <div id="fieldContainer">
          <CustomTextField
            id="testName"
            className="textfield"
            placeholder="Test Name*"
            onChange={handleNameChange}
          />
          <CustomTextField
            id="projectDesc"
            className="textfield"
            placeholder="Test Description"
            onChange={handleDescriptionChange}
          />
          <CustomTextField
            id="testSubject"
            className="textfield"
            placeholder="Subject"
            onChange={handleSubjectChange}
          />
        </div>
        <CreatQuestion  getQuestions={handleGetQuestions}/>
      </div>
  );
}
