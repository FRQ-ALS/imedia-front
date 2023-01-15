import React from "react";
import "./TextField.css";

export default function CustomTextField(props) {
  const classes = "textfield " + props.className;

  return (
    <input
      id={props.variant}
      onChange={props.onChange}
      type={props.type}
      className={classes}
      name={props.name}
      placeholder={props.placeholder}
    ></input>
  );
}
