import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./AssessmentTable.css";

import SubjectIcon from '@mui/icons-material/Subject';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AttributionIcon from '@mui/icons-material/Attribution';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import Custombutton from "../CustomButton/CustomButton"
import EditIcon from '@mui/icons-material/Edit';
import PublishIcon from '@mui/icons-material/Publish';
import DeleteIcon from '@mui/icons-material/Delete';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import { Dialog } from "@mui/material";
import {DialogContent} from "@mui/material";
import {DialogActions} from "@mui/material";
import {DialogTitle} from "@mui/material";
import {Select} from "@mui/material";
import makeAnimated from 'react-select/animated';
export default function TableView(props) {
  const [assessmentData, setAssessmentData] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedToken, setSelectedToken] = useState("")
  const [selectedTitle, setSelectedTitle] = useState("")
  const navigate = useNavigate()

  const animatedComponents = makeAnimated();

  const handleEditButton= (e, token) => {
    navigate(`/assessment-builder/${token}`)
  }

  const jwt = document.cookie.split("=")[1]
  const publishAssessment = (event, token) =>{
    const todaysDate = new Date()
    const tomorrowDate = new Date()
    tomorrowDate.setDate(tomorrowDate.getDate() + 1)
    let start = todaysDate.toJSON()
    let expiry = tomorrowDate.toJSON()
    let lengthMinutes = 60;

    let assessmentToken = token

    let body = {assessmentToken, start, expiry, lengthMinutes}

    console.log(body)


    fetch("/api/v1/publication/create",
    {credentials:"include",
      method:"POST",
      headers:{"Authorization":`Bearer ${jwt}`, "Content-Type":"application/json"},
      body:JSON.stringify(body)
    }).then((response)=>response.json()).then((responseJson)=>{
      console.log(responseJson)
    })

  }

  // const handlePublishButton =(event) => {
  //   setDialogOpen(open)
    
  // }

  useEffect(() => {
    setAssessmentData(props.data);
    console.log(assessmentData);
  }, [props.data]);

  function renderAssessments() {
    return (
      <div>
        {assessmentData.map((item, index) => (
          <div key={index} id="assessmentContainer">
            <div id="assessmentHeading">{item.name}</div>
            <div id="infoContainer">
              <div id="parameterContainers"> <LibraryBooksIcon/>{item.subject}</div>
              <div id="parameterContainers"> <SubjectIcon/>{item.type}</div>
              <div id="parameterContainers"> <AttributionIcon/>{item.publisher}</div>
              <div id="parameterContainers"> <FormatListNumberedIcon/>{item.questionCount} question(s)</div>
            </div>
            <div id="actionsContainer">
                <Custombutton onClick={event=> handleEditButton(event, item.token)} id="editButton">
                <EditIcon/>
                Edit
                </Custombutton>
                <Custombutton onClick={event=>{
                  setSelectedToken(item.token)
                  setSelectedTitle(item.name)
                  setDialogOpen(true)
                }} id="editButton">
                <PublishIcon/>
                Publish
                </Custombutton>
                <Custombutton id="editButton">
                  <DeleteIcon/>
                Delete
                </Custombutton>
                <Custombutton onClick={event=>console.log("Hello")} id="editButton">
                  <ZoomInIcon/>
                Quick view
                </Custombutton>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div id="assessmentlist">
      {assessmentData.length === 0 ? "No data found..." : renderAssessments()}
      <Dialog open={dialogOpen}>
      <DialogTitle style={{textAlign: "center"}} >Publish {selectedTitle}?</DialogTitle>
        <DialogContent >
          <div id="publishDialogBody">
          <div id="publishDialogInput">
            <span>Start Date</span>
            <input type="datetime-local"></input>
          </div>

          <div id="publishDialogInput">
            <span>Expiry Date</span>
            <input type="datetime-local"></input>
          </div>

          <div id="publishDialogInput">
            <span>Length (minutes)</span>
            <input type="number"></input>
          </div>

          <div id="publishDialogInput">
            <span>Students:</span>
            <Select isMulti
            components={animatedComponents}/>
          </div>

          </div>
    
        </DialogContent>
        <DialogActions>
          <Custombutton>Submit</Custombutton>
          <Custombutton onClick={event=>setDialogOpen(false)}>Cancel</Custombutton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
