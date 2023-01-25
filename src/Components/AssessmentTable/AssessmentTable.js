import React, { useState, useEffect } from "react";

export default function TableView(props) {
  const [assessmentData, setAssessmentData] = useState([]);

  useEffect(() => {
    setAssessmentData(props.data);
    console.log(assessmentData);
  }, [props.data]);

  function renderAssessments() {
    return (
      <div>
        {assessmentData.map((assessment, index) => (
          <div key={index}>{assessment.name}</div>
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
