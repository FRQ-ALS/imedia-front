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

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(true);
  const [alertMessage, setAlertMessage] = useState("");
  const [invitation, setInvitation] = useState("");
  const [pageToggle, setPageToggle] = useState(true);
  const [token, setToken] = useState("");
  const [questions, setQuestions] = useState([])
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setProjectName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSwitchToggle = (parameter) => {
    setIsPrivate(parameter);
  };

  const handleInvitation = (parameter) => {
    setInvitation(parameter);
  };

  const handleCopyButton = (e) => {
    let copyText = document.getElementById("linkText").innerText;
    // copyText.select()
    // copyText.selectionRange(0,99999)
    navigator.clipboard.writeText(copyText);
    setAlert("Copied to clipboard!");
  };

  const handleSubmit = (e) => {
    let inviteToggled = invitation.inviteToggled;
    let expiry = invitation.expiry;
    let maximumUses = invitation.maximumUses;

    var body = {
      projectName,
      projectDescription,
      isPrivate,
      inviteToggled,
      expiry,
      maximumUses,
    };

    fetch("/api/v1/projects/addproject", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (!response.ok) {
          response.text().then((text) => setAlert(text, "error"));
        }
        if (response.ok) {
          {
            inviteToggled
              ? response.json().then((responseJson) => {
                  setToken(responseJson.token);
                  setPageToggle(false);
                })
              : navigate("/dashboard");
          }
        }
      })
      .catch((error) => {
        setAlert(error.message);
      });
  };

  function renderLinkCard() {
    let link = `localhost:3000/joinProject=${token}`;

    return (
      <div id="linkCardContainer">
        <div id="linkCard">
          <p id="linkHeader">Your unique invite link: </p>
          <p id="linkText">{link}</p>
          <button onClick={handleCopyButton} id="linkButton">
            Copy
          </button>
        </div>
      </div>
    );
  }

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
            onChange={handleDescriptionChange}
          />
          <CustomButton onClick={handleSubmit} id="submit">
            Save
          </CustomButton>
        </div>
        <CreatQuestion/>
      </div>
  );
}
