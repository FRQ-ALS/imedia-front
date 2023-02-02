import React, { useState, useEffect } from "react";
import "./CalendarEntry.css";
import { Dialog, dialogClasses } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogActions } from "@mui/material";
import { DialogTitle } from "@mui/material";
import CustomButton from "../CustomButton/CustomButton";
import { Accordion } from "@mui/material";
import { AccordionSummary } from "@mui/material";
import { AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CustomTextArea from "../CustomTextArea/CustomTextArea";
import Select from "react-select";
import useAlert from "../../Hooks/AlertHook";


const options = [
  { label: "Yes", value: true },
  { label: "No", value: false },
];

const lessonTargets = [
  "Was the student on time?",
  "Was the student....?",
  "Was the student....?",
  "Was the student....?",
  "Was the student....?",
];

const targetDictionary = new Map();
targetDictionary.set(0, "onTime");
targetDictionary.set(1, "propertyOne");
targetDictionary.set(2, "propertyTwo");
targetDictionary.set(3, "propertyThree");
targetDictionary.set(4, "propertyFour");

const jwt = document.cookie.split("=")[1];

export default function CalendarEntry(props) {
  const [data, setData] = useState(null);
  const [lessons, setLessons] = useState(null);
  const [expanded, setExpanded] = useState(null);

  const {setAlert} = useAlert()

  const handleDefaultSelectValue = (lessonIndex, targetIndex) => {
    var currentTarget = targetDictionary.get(targetIndex);
    switch (currentTarget) {
      case "onTime":
        return lessons[lessonIndex].onTime === true
          ? { label: "Yes", value: true }
          : { label: "No", value: false };
          break;

      case "propertyOne":
        return lessons[lessonIndex].propertyOne === true
          ? { label: "Yes", value: true }
          : { label: "No", value: false };

      case "propertyTwo":
        return lessons[lessonIndex].propertyTwo === true
          ? { label: "Yes", value: true }
          : { label: "No", value: false };
          break;


      case "propertyThree":
        return lessons[lessonIndex].propertyThree === true
          ? { label: "Yes", value: true }
          : { label: "No", value: false };
          break;


      case "propertyFour":
        return lessons[lessonIndex].propertyFour === true
          ? { label: "Yes", value: true }
          : { label: "No", value: false };
          break;
          
    }
  };

  const handleSelectChange = (e, lessonIndex, targetIndex) => {
    const tempLessons = [...lessons];
    var currentTarget = targetDictionary.get(targetIndex);

    switch (currentTarget) {
      case "onTime":
        tempLessons[lessonIndex].onTime = e.value;
        break;

      case "propertyOne":
        tempLessons[lessonIndex].propertyOne = e.value;
        break;

      case "propertyTwo":
        tempLessons[lessonIndex].propertyTwo = e.value;
        break;

      case "propertyThree":
        tempLessons[lessonIndex].propertyThree = e.value;
        break;

      case "propertyFour":
        tempLessons[lessonIndex].propertyFour = e.value;
        break;
    }
    setLessons(tempLessons);
  };

  const sendSaveRequest = () => {
    const token = data.token

    fetch(`/api/v1/behaviour/updatereports/entryToken=${token}`, {
      credentials: "include",
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lessons),
    })
      .then((response) => {
        if(!response.ok){
          setAlert("Save unsuccessful", "error")
          return
        }
        setAlert("Save successful!", "success")
      })
  };

  const handleCommentInput = (event, lessonIndex) => {
    const tempLessons = [...lessons];
    tempLessons[lessonIndex].comment = event.target.value;
    setLessons(tempLessons);
  };

  const handleAccordionChange = (id) => {
    if (id === expanded) {
      setExpanded(null);
      return;
    }
    setExpanded(id);
  };

  useEffect(() => {
    console.log(props.data);
    setData(props.data);
    setLessons(props.lessonReports);
  }, [props.data]);

  return (
    <div>
      {data === null && lessons === null ? null : (
        <Dialog open={props.dialogOpen}>
          <DialogTitle>
            Report for {props.student.firstName} {props.student.lastName},{" "}
            {new Date(props.day).toLocaleDateString()}
          </DialogTitle>
          <DialogContent>
            <div id="lessonContiner">
              {lessons.map((report, lessonIndex) => (
                <Accordion
                  key={lessonIndex}
                  //   className="darkAccordion"
                  onChange={(event) => handleAccordionChange(lessonIndex)}
                  expanded={expanded === lessonIndex}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <label>
                      Lesson {lessonIndex + 1}{" "}
                        <label
                          style={{
                            opacity: "0.5",
                            marginLeft: "20px",
                            fontStyle: "italic",
                          }}
                        >
                          {report.score}/5
                        </label>
                    </label>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div
                      className={report.published === true ? "darkClass" : ""}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "20px",
                      }}
                    >
                      {lessonTargets.map((target, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            flexDirecton: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                          }}
                        >
                          <div>
                            <label>{target}</label>
                          </div>
                          <Select
                            value={handleDefaultSelectValue(lessonIndex, index)}
                            onChange={(event) =>
                              handleSelectChange(event, lessonIndex, index)
                            }
                            options={options}
                          />
                        </div>
                      ))}
                      <CustomTextArea
                        id="lessonReportTextArea"
                        placeholder="General Comments"
                        onChange={(event) =>
                          handleCommentInput(event, lessonIndex)
                        }
                        value={report.comment}
                        style={{
                          color: "black",
                          outline: "1px solid black",
                          fontSize: "1em",
                          height: "70px",
                          width: "400px",
                          textAlign: "left",
                        }}
                      ></CustomTextArea>
                    </div>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </DialogContent>
          <DialogActions
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
          >
            <label style={{ fontWeight: "bold", fontSize: "0.8em" }}>
              Note: Lesson report cannot be changed after saving
            </label>
            <div style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
              <CustomButton
                style={{ outline: "1px solid black" }}
                onClick={(event) => props.setDialogOpen(false)}
              >
                Close
              </CustomButton>
              <CustomButton
                onClick={sendSaveRequest}
                id="behaviourDialogButton"
              >
                Save
              </CustomButton>
            </div>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
}
