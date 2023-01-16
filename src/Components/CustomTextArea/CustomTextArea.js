import React from "react";
import './CustomTextArea.css'

export default function CustomTextArea(props) {
  const classes = "textarea " + props.className;

  return (
    <textarea
      id={props.id}
      onChange={props.onChange}
      className={classes}
      placeholder={props.placeholder}
    ></textarea>
  );
}
