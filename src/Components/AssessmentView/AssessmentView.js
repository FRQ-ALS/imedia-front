import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAlert from "../../Hooks/AlertHook";
import useAuth from "../../Hooks/AuthHook"
import "./AssessmentView.css";
import AssessmentTaskBar from "../AssessmentTaskBar/AssessmentTaskBar";
import AssessmentDirectory from "../AssessmentDirectory/AssessmentDirectory";


let jwt = localStorage.getItem("jwt");
export default function AssessmentView(props) {

  const {user} = useAuth()

  const navigate = useNavigate();
  const { setAlert } = useAlert();


  return (
    <div id={props.id} className="projectsContainer">
      <AssessmentDirectory/>
    </div>
  );
}
