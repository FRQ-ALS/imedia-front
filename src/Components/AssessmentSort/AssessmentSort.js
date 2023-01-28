import React, { useState, useEffect } from "react";

import "./AssessmentSort.css";

const subjects = ["All Subjects", "Maths", "Science", "English"];
const types = ["All Types", "Quiz", "Homework", "Exam"];
const users = ["You", "All Users"];
const status = ["Draft", "Published"]

export default function AssessmentSort(props) {
  const [defaultUser, setDefaultUser] = useState(0);
  const [defaultSubject, setDefaultSubject] = useState(0);
  const [defaultType, setDefaultType] = useState(0);

  const [assessmentParameters, setAssessmentParameters] = useState({
    user: "",
    subject: "",
    type: "",
  });

  useEffect(() => {
    props.setParameters(assessmentParameters);
  }, [assessmentParameters]);

  const handleUserClick = (tab, index) => {
    setDefaultUser(index);
    // setAssessmentParameters({ ...assessmentParameters, user: tab });
  };

  const handleSubjectClick = (tab, index) => {
    setDefaultSubject(index);
    if (index > 0) {
      setAssessmentParameters({ ...assessmentParameters, subject: tab });
      return;
    }
    setAssessmentParameters({ ...assessmentParameters, subject: "" });
  };

  const handleTypeClick = (tab, index) => {
    setDefaultType(index);
    if (index > 0) {
      setAssessmentParameters({ ...assessmentParameters, type: tab });
      return;
    }
    setAssessmentParameters({ ...assessmentParameters, type: "" });
  };

  const highlightCell = (tab, index) => {
    if (subjects.indexOf(tab) > -1 && index === defaultSubject) {
      return "optionHighlighted";
    }

    if (types.indexOf(tab) > -1 && index === defaultType) {
      return "optionHighlighted";
    }

    if (users.indexOf(tab) > -1 && index === defaultUser) {
      return "optionHighlighted";
    }

    return "";
  };

  return (
    <div id="optionsContainer">
      <div id="tabContainer">
        {status.map((tab, index) => (
          <div
            key={index}
            // onClick={(event) => handleUserClick(tab, index)}
            className={highlightCell(tab, index)}
            id="individualTab"
          >
            {tab}
          </div>
        ))}
      </div>
      <div id="tabContainer">
        {users.map((tab, index) => (
          <div
            key={index}
            onClick={(event) => handleUserClick(tab, index)}
            className={highlightCell(tab, index)}
            id="individualTab"
          >
            {tab}
          </div>
        ))}
      </div>
      <div id="tabContainer">
        {subjects.map((tab, index) => (
          <div
            key={index}
            onClick={(event) => handleSubjectClick(tab, index)}
            className={highlightCell(tab, index)}
            id="individualTab"
          >
            {tab}
          </div>
        ))}
      </div>
      <div id="tabContainer">
        {types.map((tab, index) => (
          <div
            key={tab}
            value={tab}
            onClick={(event) => handleTypeClick(tab, index)}
            className={highlightCell(tab, index)}
            id="individualTab"
          >
            {tab}
          </div>
        ))}
      </div>
    </div>
  );
}
