import React from "react";
import "./MultiStage.css";

const stages = [1, 2, 3, 4];

export default function MultiStage(props) {
  //passing down class names so that CSS can be applied in parent clas
  const classes = "stage-item " + props.className;

  const activeStage = props.activeStage;

  function activeOrNot(stage) {
    if (stage == activeStage) {
      return "active";
    }
    return "";
  }


  function completedOrNot(stage){
    if(stage<activeStage){
      return "true";
    }
    return ""
  }

  return (
    <div container className="main-container">
      {stages.map((stage) => (
        <div id={activeOrNot(stage)} completed={completedOrNot(stage)} className={classes}>
        </div>
      ))}
    </div>
  );
}
