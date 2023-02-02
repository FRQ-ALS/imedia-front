import React from "react";
import "./CustomTextArea.css";

export default function CustomTextArea(props) {
  const classes = "textarea " + props.className;

  return (
    <textarea
      style={props.style}
      id={props.id}
      onChange={props.onChange}
      className={classes}
      value={props.value}
      placeholder={props.placeholder}
    ></textarea>
  );
}
