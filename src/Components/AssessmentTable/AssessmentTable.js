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
export default function TableView(props) {
  const [assessmentData, setAssessmentData] = useState([]);
  const navigate = useNavigate()

  const handleEditButton= (e, token) => {
    navigate(`/assessment-builder/${token}`)
  }

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
                <Custombutton id="editButton">
                <PublishIcon/>
                Publish
                </Custombutton>
                <Custombutton id="editButton">
                  <DeleteIcon/>
                Delete
                </Custombutton>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div id="assessmentlist">
      {assessmentData.length === 0 ? "Loading..." : renderAssessments()}
    </div>
  );
}
