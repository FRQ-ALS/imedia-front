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
  "Did the student listen and follow instructions?",
  "Did the student show appropriate language and behaviour?",
  "Did the student show and earn respect?",
  "Did the student complete the tasks set?",
];

const targetDictionary = new Map();
targetDictionary.set(0, "onTime");
targetDictionary.set(1, "listened");
targetDictionary.set(2, "language");
targetDictionary.set(3, "respect");
targetDictionary.set(4, "completeTask");
targetDictionary.set(5, "present");
targetDictionary.set(6, "sentOut");
targetDictionary.set(7, "authorized");

const jwt = document.cookie.split("=")[1];

export default function CalendarEntry(props) {
  const [data, setData] = useState(null);
  const [lessons, setLessons] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [student, setStudent] = useState(null);

  const { setAlert } = useAlert();

  const handleDefaultSelectValue = (lessonIndex, targetIndex) => {
    var currentTarget = targetDictionary.get(targetIndex);
    switch (currentTarget) {
      case "onTime":
        return lessons[lessonIndex].onTime === true
          ? { label: "Yes", value: true }
          : { label: "No", value: false };
        break;

      case "listened":
        return lessons[lessonIndex].listened === true
          ? { label: "Yes", value: true }
          : { label: "No", value: false };

      case "language":
        return lessons[lessonIndex].language === true
          ? { label: "Yes", value: true }
          : { label: "No", value: false };
        break;

      case "respect":
        return lessons[lessonIndex].respect === true
          ? { label: "Yes", value: true }
          : { label: "No", value: false };
        break;

      case "completeTask":
        return lessons[lessonIndex].completeTask === true
          ? { label: "Yes", value: true }
          : { label: "No", value: false };
        break;

      case "present":
        return lessons[lessonIndex].present === true
          ? { label: "Yes", value: true }
          : { label: "No", value: false };
        break;

      case "sentOut":
        return lessons[lessonIndex].sentOut === true
          ? { label: "Yes", value: true }
          : { label: "No", value: false };
        break;

      case "authorized":
        return lessons[lessonIndex].sentOut === true
          ? { label: "Yes", value: true }
          : { label: "No", value: false };
    }
  };

  function renderLessonTargets(lessonIndex) {
    return (
      <>
        <div
          style={{
            display: "flex",
            flexDirecton: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <label>Was the student present?</label>
          </div>
          <Select
            value={handleDefaultSelectValue(lessonIndex, 5)}
            onChange={(event) => handleSelectChange(event, lessonIndex, 5)}
            options={options}
          />
        </div>

        {lessons[lessonIndex].present ? (
          <>
            <div
              style={{
                display: "flex",
                flexDirecton: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <label>Was the student sent out?</label>
              </div>
              <Select
                value={handleDefaultSelectValue(lessonIndex, 6)}
                onChange={(event) => handleSelectChange(event, lessonIndex, 6)}
                options={options}
              />
            </div>
          </>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                flexDirecton: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                <label>Was the absence authorized?</label>
              </div>
              <Select
                value={handleDefaultSelectValue(lessonIndex, 7)}
                onChange={(event) => handleSelectChange(event, lessonIndex, 7)}
                options={options}
              />
            </div>
          </>
        )}

        {lessons[lessonIndex].sentOut ||
        !lessons[lessonIndex].present ? null : (
          <>
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
          </>
        )}
      </>
    );
  }

  const handleSelectChange = (e, lessonIndex, targetIndex) => {
    const tempLessons = [...lessons];
    var currentTarget = targetDictionary.get(targetIndex);

    switch (currentTarget) {
      case "onTime":
        tempLessons[lessonIndex].onTime = e.value;
        break;

      case "listened":
        tempLessons[lessonIndex].listened = e.value;
        break;

      case "language":
        tempLessons[lessonIndex].language = e.value;
        break;

      case "respect":
        tempLessons[lessonIndex].respect = e.value;
        break;

      case "completeTask":
        tempLessons[lessonIndex].completeTask = e.value;
        break;

      case "present":
        tempLessons[lessonIndex].present = e.value;
        break;

      case "sentOut":
        tempLessons[lessonIndex].sentOut = e.value;
        break;

      case "authorized":
        tempLessons[lessonIndex].authorized = e.value;
        break;
    }

    setLessons(tempLessons);
  };

  const sendSaveRequest = () => {
    const token = data.token;

    fetch(`/api/v1/behaviour/updatereports/entryToken=${token}`, {
      credentials: "include",
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(lessons),
    }).then((response) => {
      if (!response.ok) {
        setAlert("Save unsuccessful", "error");
        return;
      }
      setAlert("Save successful!", "success");
    });
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
    setData(props.data);
    setLessons(props.lessonReports);
    setStudent(props.student);
  }, [props.data]);

  return (
    <div>
      {data === null && lessons === null && student === null ? null : (
        <Dialog open={props.dialogOpen}>
          <DialogTitle>
            Report for {student.firstName} {student.lastName},{" "}
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
                      {renderLessonTargets(lessonIndex)}  
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
                          // width: "500px",
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
